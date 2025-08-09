import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface VectorSearchResult {
  puzzle: any;
  similarity: number;
  type: 'word_search' | 'crossword';
  matchReasons: string[];
}

interface VectorSearchResponse {
  results: VectorSearchResult[];
  suggestions: {
    relatedSearches: string[];
    themes: string[];
  };
  metadata: {
    totalResults: number;
    searchTime: number;
    queryEmbedding?: number[];
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VectorSearchResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const startTime = Date.now();

  try {
    const {
      query,
      type = 'all',
      theme,
      difficulty,
      limit = 20,
      threshold = 0.7
    } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required' });
    }

    console.log(`🔍 Vector search for: "${query}" (type: ${type})`);

    // Generate query embedding
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query.substring(0, 8000),
      dimensions: 1536
    });

    const queryEmbedding = embeddingResponse.data[0].embedding;

    // Build where clause for additional filters
    let typeFilter = '';
    if (type !== 'all') {
      typeFilter = `AND pe."puzzleType" = '${type}'`;
    }

    // Perform vector similarity search using raw SQL
    const vectorResults = await prisma.$queryRaw`
      SELECT 
        pe."puzzleId",
        pe."puzzleType",
        pe.content,
        pe.metadata,
        (1 - (pe.embedding <=> ${queryEmbedding}::vector)) as similarity
      FROM puzzle_embeddings pe
      WHERE (1 - (pe.embedding <=> ${queryEmbedding}::vector)) >= ${threshold}
      ${typeFilter ? prisma.$queryRawUnsafe(typeFilter) : prisma.$queryRawUnsafe('')}
      ORDER BY pe.embedding <=> ${queryEmbedding}::vector
      LIMIT ${limit * 2}
    ` as any[];

    console.log(`📊 Found ${vectorResults.length} vector matches`);

    // Get full puzzle data and apply additional filters
    const results: VectorSearchResult[] = [];
    
    for (const vectorResult of vectorResults) {
      try {
        let puzzle = null;
        
        // Get full puzzle data
        if (vectorResult.puzzleType === 'word_search') {
          puzzle = await prisma.wordSearch.findUnique({
            where: { id: vectorResult.puzzleId }
          });
        } else if (vectorResult.puzzleType === 'crossword') {
          puzzle = await prisma.crossword.findUnique({
            where: { id: vectorResult.puzzleId }
          });
        }

        if (!puzzle) continue;

        // Apply additional filters
        if (theme && puzzle.theme !== theme) continue;
        if (difficulty && puzzle.difficulty !== difficulty) continue;

        // Determine match reasons
        const matchReasons = getMatchReasons(query, puzzle, vectorResult.similarity);

        results.push({
          puzzle: {
            ...puzzle,
            id: puzzle.id,
            type: vectorResult.puzzleType
          },
          similarity: vectorResult.similarity,
          type: vectorResult.puzzleType as 'word_search' | 'crossword',
          matchReasons
        });

        if (results.length >= limit) break;

      } catch (error) {
        console.error(`Error processing puzzle ${vectorResult.puzzleId}:`, error);
      }
    }

    // Generate suggestions based on results
    const suggestions = generateSuggestions(results, query);

    const searchTime = Date.now() - startTime;

    console.log(`✅ Vector search completed in ${searchTime}ms, returning ${results.length} results`);

    res.status(200).json({
      results,
      suggestions,
      metadata: {
        totalResults: results.length,
        searchTime,
        queryEmbedding: process.env.NODE_ENV === 'development' ? queryEmbedding.slice(0, 5) : undefined
      }
    });

  } catch (error) {
    console.error('❌ Vector search error:', error);
    
    // Fallback to enhanced search if vector search fails
    try {
      console.log('🔄 Falling back to enhanced search...');
      
      const fallbackResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/search/smart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        return res.status(200).json({
          ...fallbackData,
          metadata: {
            ...fallbackData.metadata,
            fallbackUsed: true,
            searchTime: Date.now() - startTime
          }
        });
      }
    } catch (fallbackError) {
      console.error('❌ Fallback search also failed:', fallbackError);
    }

    res.status(500).json({ 
      error: 'Vector search failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

/**
 * Determine why a puzzle matches the query
 */
function getMatchReasons(query: string, puzzle: any, similarity: number): string[] {
  const reasons: string[] = [];
  const queryLower = query.toLowerCase();
  
  // High similarity indicates semantic match
  if (similarity > 0.85) {
    reasons.push('high_semantic_similarity');
  } else if (similarity > 0.75) {
    reasons.push('semantic_similarity');
  }
  
  // Check for direct matches
  if (puzzle.title?.toLowerCase().includes(queryLower)) {
    reasons.push('title_match');
  }
  
  if (puzzle.theme?.toLowerCase().includes(queryLower)) {
    reasons.push('theme_match');
  }
  
  // Check content matches
  if (puzzle.words) {
    const hasWordMatch = puzzle.words.some((word: string) => 
      word.toLowerCase().includes(queryLower) || queryLower.includes(word.toLowerCase())
    );
    if (hasWordMatch) {
      reasons.push('word_match');
    }
  }
  
  if (puzzle.clues) {
    const clueText = puzzle.clues.map((clue: any) => 
      typeof clue === 'object' ? clue.clue || clue.text || '' : clue
    ).join(' ').toLowerCase();
    
    if (clueText.includes(queryLower)) {
      reasons.push('clue_match');
    }
  }
  
  return reasons.length > 0 ? reasons : ['semantic_match'];
}

/**
 * Generate search suggestions based on results
 */
function generateSuggestions(results: VectorSearchResult[], query: string) {
  const themes = new Set<string>();
  const relatedTerms = new Set<string>();
  
  // Extract themes from results
  results.forEach(result => {
    if (result.puzzle.theme) {
      themes.add(result.puzzle.theme);
    }
    
    // Extract related terms from high-similarity matches
    if (result.similarity > 0.8) {
      if (result.puzzle.words) {
        result.puzzle.words.slice(0, 3).forEach((word: string) => {
          if (word.length > 3 && !query.toLowerCase().includes(word.toLowerCase())) {
            relatedTerms.add(word.toLowerCase());
          }
        });
      }
    }
  });
  
  return {
    relatedSearches: Array.from(relatedTerms).slice(0, 5),
    themes: Array.from(themes).slice(0, 8)
  };
}
