import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SearchResult {
  puzzle: any;
  score: number;
  matchReasons: string[];
  type: 'wordsearch' | 'crossword';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      query, 
      type = 'all', 
      theme, 
      difficulty, 
      limit = 20 
    } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Query is required' });
    }

    // Get puzzles based on type filter
    const [wordSearches, crosswords] = await Promise.all([
      type === 'crossword' ? [] : getWordSearches({ theme, difficulty }),
      type === 'wordsearch' ? [] : getCrosswords({ theme, difficulty })
    ]);

    const allPuzzles = [
      ...wordSearches.map(ws => ({ ...ws, type: 'wordsearch' as const })),
      ...crosswords.map(cw => ({ ...cw, type: 'crossword' as const }))
    ];

    // Enhanced search with semantic-like scoring
    const results = performSmartSearch(allPuzzles, query, limit);

    // Generate suggestions
    const suggestions = generateSuggestions(query, allPuzzles);

    res.status(200).json({
      query,
      results,
      suggestions,
      total: results.length,
      searchTime: Date.now()
    });

  } catch (error) {
    console.error('Smart search error:', error);
    res.status(500).json({ 
      message: 'Search failed', 
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error' 
    });
  }
}

async function getWordSearches(filters: { theme?: string; difficulty?: string }) {
  const where: any = {};
  if (filters.theme) where.theme = filters.theme;
  if (filters.difficulty) where.difficulty = filters.difficulty;

  return await prisma.wordSearch.findMany({
    where,
    take: 1000,
    orderBy: { createdAt: 'desc' }
  });
}

async function getCrosswords(filters: { theme?: string; difficulty?: string }) {
  const where: any = {};
  if (filters.theme) where.theme = filters.theme;
  if (filters.difficulty) where.difficulty = filters.difficulty;

  return await prisma.crossword.findMany({
    where,
    take: 1000,
    orderBy: { createdAt: 'desc' }
  });
}

function performSmartSearch(puzzles: any[], query: string, limit: number): SearchResult[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(word => word.length > 2);
  const results: SearchResult[] = [];

  for (const puzzle of puzzles) {
    const score = calculateRelevanceScore(puzzle, queryLower, queryWords);
    
    if (score > 0) {
      const matchReasons = getMatchReasons(puzzle, queryLower, queryWords);
      
      results.push({
        puzzle,
        score,
        matchReasons,
        type: puzzle.type
      });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function calculateRelevanceScore(puzzle: any, queryLower: string, queryWords: string[]): number {
  let score = 0;
  const title = (puzzle.title || '').toLowerCase();
  const theme = (puzzle.theme || '').toLowerCase();
  
  // Extract content based on puzzle type
  let puzzleWords: string[] = [];
  let hints: string[] = [];
  
  if (puzzle.type === 'wordsearch') {
    puzzleWords = puzzle.words || [];
  } else if (puzzle.type === 'crossword') {
    const clues = puzzle.clues || [];
    puzzleWords = clues.map((clue: any) => clue.answer || '');
    hints = clues.map((clue: any) => clue.clue || '');
  }

  const allText = [title, theme, ...puzzleWords, ...hints].join(' ').toLowerCase();

  // Exact phrase match (highest score)
  if (allText.includes(queryLower)) {
    score += 100;
  }

  // Title matches (high score)
  if (title.includes(queryLower)) {
    score += 80;
  }

  // Theme matches (high score)
  if (theme.includes(queryLower)) {
    score += 70;
  }

  // Individual word matches
  for (const queryWord of queryWords) {
    if (title.includes(queryWord)) score += 20;
    if (theme.includes(queryWord)) score += 15;
    
    // Check puzzle words
    for (const puzzleWord of puzzleWords) {
      if (puzzleWord.toLowerCase().includes(queryWord)) {
        score += 10;
      }
    }
    
    // Check hints
    for (const hint of hints) {
      if (hint.toLowerCase().includes(queryWord)) {
        score += 8;
      }
    }
  }

  // Semantic-like matching using related terms
  const relatedTerms = getRelatedTerms(queryLower);
  for (const term of relatedTerms) {
    if (allText.includes(term)) {
      score += 5;
    }
  }

  return score;
}

function getRelatedTerms(query: string): string[] {
  const relations: Record<string, string[]> = {
    'pumpkin': ['autumn', 'fall', 'halloween', 'harvest', 'orange', 'vegetable', 'gourd', 'october'],
    'christmas': ['winter', 'holiday', 'santa', 'gifts', 'snow', 'december', 'xmas', 'festive'],
    'ocean': ['sea', 'water', 'beach', 'marine', 'waves', 'fish', 'nautical', 'coastal'],
    'animals': ['pets', 'wildlife', 'zoo', 'farm', 'nature', 'creatures', 'mammals', 'birds'],
    'food': ['cooking', 'recipes', 'kitchen', 'meals', 'ingredients', 'dining', 'culinary'],
    'spring': ['flowers', 'bloom', 'garden', 'easter', 'april', 'may', 'fresh', 'green'],
    'summer': ['sun', 'beach', 'vacation', 'hot', 'june', 'july', 'august', 'outdoor'],
    'winter': ['snow', 'cold', 'ice', 'december', 'january', 'february', 'skiing', 'cozy'],
    'autumn': ['fall', 'leaves', 'harvest', 'pumpkin', 'october', 'november', 'thanksgiving'],
    'sports': ['games', 'athletic', 'competition', 'team', 'player', 'exercise', 'fitness'],
    'music': ['songs', 'instruments', 'melody', 'rhythm', 'concert', 'band', 'classical'],
    'travel': ['vacation', 'journey', 'adventure', 'explore', 'destination', 'tourism'],
    'science': ['research', 'experiment', 'discovery', 'laboratory', 'technology', 'innovation'],
    'history': ['past', 'ancient', 'historical', 'timeline', 'civilization', 'heritage'],
    'art': ['painting', 'drawing', 'creative', 'artistic', 'gallery', 'museum', 'design']
  };

  const related: string[] = [];
  for (const [key, terms] of Object.entries(relations)) {
    if (query.includes(key)) {
      related.push(...terms);
    }
  }
  return related;
}

function getMatchReasons(puzzle: any, queryLower: string, queryWords: string[]): string[] {
  const reasons: string[] = [];
  const title = (puzzle.title || '').toLowerCase();
  const theme = (puzzle.theme || '').toLowerCase();

  if (title.includes(queryLower)) reasons.push('title');
  if (theme.includes(queryLower)) reasons.push('theme');

  // Check for content matches
  let hasContentMatch = false;
  if (puzzle.type === 'wordsearch') {
    const words = puzzle.words || [];
    hasContentMatch = words.some((word: string) => 
      word.toLowerCase().includes(queryLower) || 
      queryWords.some(qw => word.toLowerCase().includes(qw))
    );
  } else if (puzzle.type === 'crossword') {
    const clues = puzzle.clues || [];
    hasContentMatch = clues.some((clue: any) => 
      (clue.answer || '').toLowerCase().includes(queryLower) ||
      (clue.clue || '').toLowerCase().includes(queryLower) ||
      queryWords.some(qw => 
        (clue.answer || '').toLowerCase().includes(qw) ||
        (clue.clue || '').toLowerCase().includes(qw)
      )
    );
  }

  if (hasContentMatch) reasons.push('content');

  // Check for semantic matches
  const relatedTerms = getRelatedTerms(queryLower);
  const allText = `${title} ${theme}`.toLowerCase();
  if (relatedTerms.some(term => allText.includes(term))) {
    reasons.push('semantic');
  }

  return reasons.length > 0 ? reasons : ['general'];
}

function generateSuggestions(query: string, puzzles: any[]) {
  // Extract popular themes
  const themeCount = new Map<string, number>();
  puzzles.forEach(puzzle => {
    const theme = puzzle.theme;
    if (theme) {
      themeCount.set(theme, (themeCount.get(theme) || 0) + 1);
    }
  });

  const popularThemes = Array.from(themeCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([theme]) => theme);

  // Generate related searches
  const relatedSearches = getRelatedTerms(query.toLowerCase()).slice(0, 5);

  return {
    themes: popularThemes,
    relatedSearches,
    popularPuzzles: puzzles.slice(0, 6)
  };
}
