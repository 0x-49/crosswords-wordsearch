import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface PuzzleEmbedding {
  puzzleId: string;
  puzzleType: 'wordsearch' | 'crossword';
  titleEmbedding: number[];
  contentEmbedding: number[];
  themeEmbedding: number[];
  wordsEmbedding: number[];
  hintsEmbedding?: number[];
  combinedEmbedding: number[];
  metadata: {
    title: string;
    theme: string;
    difficulty: string;
    wordCount: number;
    words: string[];
    hints?: string[];
  };
}

export interface SemanticSearchResult {
  puzzle: any;
  similarity: number;
  matchReasons: string[];
  relatedPuzzles?: any[];
}

export class VectorDatabase {
  private static instance: VectorDatabase;
  
  public static getInstance(): VectorDatabase {
    if (!VectorDatabase.instance) {
      VectorDatabase.instance = new VectorDatabase();
    }
    return VectorDatabase.instance;
  }

  /**
   * Generate embeddings for a single puzzle
   */
  async generatePuzzleEmbeddings(puzzle: any): Promise<PuzzleEmbedding> {
    try {
      const { id, title, theme, difficulty, type } = puzzle;
      
      // Extract content based on puzzle type
      let words: string[] = [];
      let hints: string[] = [];
      
      if (type === 'wordsearch') {
        words = puzzle.words || [];
      } else if (type === 'crossword') {
        words = puzzle.clues?.map((clue: any) => clue.answer) || [];
        hints = puzzle.clues?.map((clue: any) => clue.clue) || [];
      }

      // Prepare text for embeddings
      const titleText = title || '';
      const themeText = theme || '';
      const wordsText = words.join(' ');
      const hintsText = hints.join(' ');
      const combinedText = `${titleText} ${themeText} ${wordsText} ${hintsText}`.trim();

      // Generate embeddings in parallel
      const [
        titleEmbedding,
        themeEmbedding,
        wordsEmbedding,
        hintsEmbedding,
        combinedEmbedding
      ] = await Promise.all([
        this.generateEmbedding(titleText),
        this.generateEmbedding(themeText),
        this.generateEmbedding(wordsText),
        hints.length > 0 ? this.generateEmbedding(hintsText) : Promise.resolve([]),
        this.generateEmbedding(combinedText)
      ]);

      // Create content embedding (words + hints)
      const contentText = `${wordsText} ${hintsText}`.trim();
      const contentEmbedding = await this.generateEmbedding(contentText);

      return {
        puzzleId: id,
        puzzleType: type,
        titleEmbedding,
        contentEmbedding,
        themeEmbedding,
        wordsEmbedding,
        hintsEmbedding: hints.length > 0 ? hintsEmbedding : undefined,
        combinedEmbedding,
        metadata: {
          title,
          theme,
          difficulty,
          wordCount: words.length,
          words,
          hints: hints.length > 0 ? hints : undefined
        }
      };
    } catch (error) {
      console.error(`Error generating embeddings for puzzle ${puzzle.id}:`, error);
      throw error;
    }
  }

  /**
   * Generate embedding using OpenAI
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text.substring(0, 8000), // Limit input length
        dimensions: 1536
      });
      
      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      // Fallback to zero vector if API fails
      return new Array(1536).fill(0);
    }
  }

  /**
   * Store embeddings in database
   */
  async storeEmbeddings(embeddings: PuzzleEmbedding[]): Promise<void> {
    try {
      // Use upsert to handle duplicates
      for (const embedding of embeddings) {
        const result = await prisma.puzzleEmbeddings.upsert({
          where: { puzzleId: embedding.puzzleId },
          update: {
            puzzleType: embedding.puzzleType,
            titleEmbedding: embedding.titleEmbedding,
            contentEmbedding: embedding.contentEmbedding,
            themeEmbedding: embedding.themeEmbedding,
            wordsEmbedding: embedding.wordsEmbedding,
            hintsEmbedding: embedding.hintsEmbedding,
            combinedEmbedding: embedding.combinedEmbedding,
            metadata: embedding.metadata as any,
            updatedAt: new Date()
          },
          create: {
            puzzleId: embedding.puzzleId,
            puzzleType: embedding.puzzleType,
            titleEmbedding: embedding.titleEmbedding,
            contentEmbedding: embedding.contentEmbedding,
            themeEmbedding: embedding.themeEmbedding,
            wordsEmbedding: embedding.wordsEmbedding,
            hintsEmbedding: embedding.hintsEmbedding,
            combinedEmbedding: embedding.combinedEmbedding,
            metadata: embedding.metadata as any
          }
        });
      }
    } catch (error) {
      console.error('Error storing embeddings:', error);
      throw error;
    }
  }

  /**
   * Perform semantic search
   */
  async semanticSearch(
    query: string, 
    options: {
      limit?: number;
      type?: 'wordsearch' | 'crossword' | 'all';
      threshold?: number;
      includeRelated?: boolean;
    } = {}
  ): Promise<SemanticSearchResult[]> {
    const { limit = 20, type = 'all', threshold = 0.7, includeRelated = false } = options;

    try {
      // Generate query embedding
      const queryEmbedding = await this.generateEmbedding(query);
      
      // Get all embeddings from database
      const whereClause = type !== 'all' ? { puzzleType: type } : {};
      const existingEmbedding = await prisma.puzzleEmbeddings.findUnique({
        where: whereClause,
        take: 1000 // Limit for performance
      });

      // Calculate similarities
      const results: SemanticSearchResult[] = [];
      
      if (existingEmbedding) {
        // Calculate similarity with combined embedding
        const similarity = this.cosineSimilarity(queryEmbedding, existingEmbedding.combinedEmbedding as number[]);
        
        if (similarity >= threshold) {
          // Determine match reasons
          const matchReasons = await this.getMatchReasons(query, existingEmbedding, queryEmbedding);
          
          // Get full puzzle data
          const puzzle = await this.getPuzzleData(existingEmbedding.puzzleId, existingEmbedding.puzzleType);
          
          if (puzzle) {
            results.push({
              puzzle,
              similarity,
              matchReasons,
              relatedPuzzles: includeRelated ? await this.getRelatedPuzzles(existingEmbedding.puzzleId) : undefined
            });
          }
        }
      }

      // Sort by similarity and limit results
      return results
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit);

    } catch (error) {
      console.error('Error performing semantic search:', error);
      throw error;
    }
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  /**
   * Determine why a puzzle matches the query
   */
  private async getMatchReasons(query: string, embedding: any, queryEmbedding: number[]): Promise<string[]> {
    const reasons: string[] = [];
    const queryLower = query.toLowerCase();
    const metadata = embedding.metadata;

    // Direct keyword matches
    if (metadata.title?.toLowerCase().includes(queryLower)) {
      reasons.push('title');
    }
    if (metadata.theme?.toLowerCase().includes(queryLower)) {
      reasons.push('theme');
    }
    if (metadata.words?.some((word: string) => word.toLowerCase().includes(queryLower))) {
      reasons.push('content');
    }
    if (metadata.hints?.some((hint: string) => hint.toLowerCase().includes(queryLower))) {
      reasons.push('hints');
    }

    // Semantic matches
    const titleSimilarity = this.cosineSimilarity(queryEmbedding, embedding.titleEmbedding);
    const themeSimilarity = this.cosineSimilarity(queryEmbedding, embedding.themeEmbedding);
    const contentSimilarity = this.cosineSimilarity(queryEmbedding, embedding.contentEmbedding);

    if (titleSimilarity > 0.8) reasons.push('semantic_title');
    if (themeSimilarity > 0.8) reasons.push('semantic_theme');
    if (contentSimilarity > 0.8) reasons.push('semantic_content');

    return reasons.length > 0 ? reasons : ['semantic'];
  }

  /**
   * Get full puzzle data
   */
  private async getPuzzleData(puzzleId: string, puzzleType: string): Promise<any> {
    try {
      if (puzzleType === 'wordsearch') {
        return await prisma.wordSearch.findUnique({
          where: { id: puzzleId }
        });
      } else {
        return await prisma.crossword.findUnique({
          where: { id: puzzleId }
        });
      }
    } catch (error) {
      console.error(`Error fetching puzzle data for ${puzzleId}:`, error);
      return null;
    }
  }

  /**
   * Get related puzzles (placeholder for graph implementation)
   */
  private async getRelatedPuzzles(puzzleId: string): Promise<any[]> {
    // This will be implemented with graph database
    return [];
  }

  /**
   * Generate suggestions based on query
   */
  async generateSearchSuggestions(query: string): Promise<{
    themes: string[];
    relatedSearches: string[];
    corrections?: string[];
  }> {
    try {
      const queryEmbedding = await this.generateEmbedding(query);
      
      // Get theme embeddings and find similar ones
      const themeEmbeddings = await prisma.puzzleEmbedding.findMany({
        select: {
          metadata: true,
          themeEmbedding: true
        },
        take: 100
      });

      const themeSimilarities = themeEmbeddings.map(embedding => ({
        theme: (embedding.metadata as any).theme,
        similarity: this.cosineSimilarity(queryEmbedding, embedding.themeEmbedding as number[])
      }));

      const topThemes = themeSimilarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5)
        .map(item => item.theme)
        .filter((theme, index, arr) => arr.indexOf(theme) === index); // Remove duplicates

      return {
        themes: topThemes,
        relatedSearches: await this.generateRelatedSearches(query),
        corrections: await this.generateSpellingCorrections(query)
      };
    } catch (error) {
      console.error('Error generating search suggestions:', error);
      return { themes: [], relatedSearches: [] };
    }
  }

  /**
   * Generate related search terms
   */
  private async generateRelatedSearches(query: string): Promise<string[]> {
    // Use semantic similarity to find related terms
    const commonRelations: Record<string, string[]> = {
      'pumpkin': ['autumn', 'fall', 'halloween', 'harvest', 'orange', 'vegetables'],
      'christmas': ['winter', 'holiday', 'santa', 'gifts', 'snow', 'december'],
      'ocean': ['sea', 'water', 'beach', 'marine', 'waves', 'fish'],
      'animals': ['pets', 'wildlife', 'zoo', 'farm', 'nature', 'creatures'],
      'food': ['cooking', 'recipes', 'kitchen', 'meals', 'ingredients', 'dining']
    };

    const queryLower = query.toLowerCase();
    for (const [key, relations] of Object.entries(commonRelations)) {
      if (queryLower.includes(key)) {
        return relations.slice(0, 3);
      }
    }

    return [];
  }

  /**
   * Generate spelling corrections
   */
  private async generateSpellingCorrections(query: string): Promise<string[]> {
    // Simple spelling correction logic
    // In production, you might use a more sophisticated spell checker
    return [];
  }
}

export default VectorDatabase;
