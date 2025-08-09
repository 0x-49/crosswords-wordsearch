import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SearchResult {
  puzzle: any;
  score: number;
  matchReasons: string[];
  relatedPuzzles?: any[];
}

export interface SearchOptions {
  query: string;
  type?: 'wordsearch' | 'crossword' | 'all';
  theme?: string;
  difficulty?: string;
  limit?: number;
  includeRelated?: boolean;
}

export class PuzzleSearchEngine {
  private static instance: PuzzleSearchEngine;
  
  public static getInstance(): PuzzleSearchEngine {
    if (!PuzzleSearchEngine.instance) {
      PuzzleSearchEngine.instance = new PuzzleSearchEngine();
    }
    return PuzzleSearchEngine.instance;
  }

  /**
   * Enhanced search with semantic-like capabilities using keyword matching and scoring
   */
  async enhancedSearch(options: SearchOptions): Promise<SearchResult[]> {
    const { query, type = 'all', theme, difficulty, limit = 20, includeRelated = false } = options;
    
    try {
      // Get all puzzles based on type filter
      const [wordSearches, crosswords] = await Promise.all([
        type === 'crossword' ? [] : this.getWordSearches({ theme, difficulty }),
        type === 'wordsearch' ? [] : this.getCrosswords({ theme, difficulty })
      ]);

      const allPuzzles = [
        ...wordSearches.map(ws => ({ ...ws, type: 'wordsearch' })),
        ...crosswords.map(cw => ({ ...cw, type: 'crossword' }))
      ];

      // Score and rank puzzles
      const scoredResults: SearchResult[] = [];
      const queryLower = query.toLowerCase();
      const queryWords = queryLower.split(/\s+/).filter(word => word.length > 2);

      for (const puzzle of allPuzzles) {
        const score = this.calculateRelevanceScore(puzzle, queryLower, queryWords);
        
        if (score > 0) {
          const matchReasons = this.getMatchReasons(puzzle, queryLower, queryWords);
          
          scoredResults.push({
            puzzle,
            score,
            matchReasons,
            relatedPuzzles: includeRelated ? await this.findRelatedPuzzles(puzzle) : undefined
          });
        }
      }

      // Sort by score and limit results
      return scoredResults
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

    } catch (error) {
      console.error('Error in enhanced search:', error);
      throw error;
    }
  }

  /**
   * Calculate relevance score for a puzzle
   */
  private calculateRelevanceScore(puzzle: any, queryLower: string, queryWords: string[]): number {
    let score = 0;
    const title = (puzzle.title || '').toLowerCase();
    const theme = (puzzle.theme || '').toLowerCase();
    
    // Extract words based on puzzle type
    let puzzleWords: string[] = [];
    let hints: string[] = [];
    
    if (puzzle.type === 'wordsearch') {
      puzzleWords = puzzle.words || [];
    } else if (puzzle.type === 'crossword') {
      const clues = puzzle.clues || [];
      puzzleWords = clues.map((clue: any) => clue.answer || '');
      hints = clues.map((clue: any) => clue.clue || '');
    }

    const allPuzzleText = [title, theme, ...puzzleWords, ...hints].join(' ').toLowerCase();

    // Exact phrase match (highest score)
    if (allPuzzleText.includes(queryLower)) {
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
      
      // Check hints (for crosswords)
      for (const hint of hints) {
        if (hint.toLowerCase().includes(queryWord)) {
          score += 8;
        }
      }
    }

    // Semantic-like matching using related terms
    const relatedTerms = this.getRelatedTerms(queryLower);
    for (const term of relatedTerms) {
      if (allPuzzleText.includes(term)) {
        score += 5;
      }
    }

    // Boost score based on difficulty preference (if query suggests difficulty)
    if (queryLower.includes('easy') && puzzle.difficulty === 'Easy') score += 10;
    if (queryLower.includes('hard') && puzzle.difficulty === 'Hard') score += 10;
    if (queryLower.includes('medium') && puzzle.difficulty === 'Medium') score += 10;

    return score;
  }

  /**
   * Get related terms for semantic-like matching
   */
  private getRelatedTerms(query: string): string[] {
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

  /**
   * Determine match reasons
   */
  private getMatchReasons(puzzle: any, queryLower: string, queryWords: string[]): string[] {
    const reasons: string[] = [];
    const title = (puzzle.title || '').toLowerCase();
    const theme = (puzzle.theme || '').toLowerCase();

    if (title.includes(queryLower)) reasons.push('title');
    if (theme.includes(queryLower)) reasons.push('theme');

    // Check for word matches
    let hasWordMatch = false;
    if (puzzle.type === 'wordsearch') {
      const words = puzzle.words || [];
      hasWordMatch = words.some((word: string) => 
        word.toLowerCase().includes(queryLower) || 
        queryWords.some(qw => word.toLowerCase().includes(qw))
      );
    } else if (puzzle.type === 'crossword') {
      const clues = puzzle.clues || [];
      hasWordMatch = clues.some((clue: any) => 
        (clue.answer || '').toLowerCase().includes(queryLower) ||
        (clue.clue || '').toLowerCase().includes(queryLower) ||
        queryWords.some(qw => 
          (clue.answer || '').toLowerCase().includes(qw) ||
          (clue.clue || '').toLowerCase().includes(qw)
        )
      );
    }

    if (hasWordMatch) reasons.push('content');

    // Check for semantic matches
    const relatedTerms = this.getRelatedTerms(queryLower);
    const allText = `${title} ${theme}`.toLowerCase();
    if (relatedTerms.some(term => allText.includes(term))) {
      reasons.push('semantic');
    }

    return reasons.length > 0 ? reasons : ['general'];
  }

  /**
   * Find related puzzles based on theme and content similarity
   */
  private async findRelatedPuzzles(puzzle: any): Promise<any[]> {
    try {
      const related: any[] = [];
      
      // Find puzzles with same theme
      if (puzzle.theme) {
        const sameTheme = await this.getPuzzlesByTheme(puzzle.theme, puzzle.id);
        related.push(...sameTheme.slice(0, 3));
      }

      // Find puzzles with similar difficulty
      const sameDifficulty = await this.getPuzzlesByDifficulty(puzzle.difficulty, puzzle.id);
      related.push(...sameDifficulty.slice(0, 2));

      // Remove duplicates and limit
      const uniqueRelated = related.filter((p, index, arr) => 
        arr.findIndex(item => item.id === p.id) === index
      );

      return uniqueRelated.slice(0, 5);
    } catch (error) {
      console.error('Error finding related puzzles:', error);
      return [];
    }
  }

  /**
   * Get word searches with filters
   */
  private async getWordSearches(filters: { theme?: string; difficulty?: string }) {
    const where: any = {};
    if (filters.theme) where.theme = filters.theme;
    if (filters.difficulty) where.difficulty = filters.difficulty;

    return await prisma.wordSearch.findMany({
      where,
      take: 1000, // Limit for performance
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Get crosswords with filters
   */
  private async getCrosswords(filters: { theme?: string; difficulty?: string }) {
    const where: any = {};
    if (filters.theme) where.theme = filters.theme;
    if (filters.difficulty) where.difficulty = filters.difficulty;

    return await prisma.crossword.findMany({
      where,
      take: 1000, // Limit for performance
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Get puzzles by theme
   */
  private async getPuzzlesByTheme(theme: string, excludeId: string): Promise<any[]> {
    const [wordSearches, crosswords] = await Promise.all([
      prisma.wordSearch.findMany({
        where: { theme, NOT: { id: excludeId } },
        take: 5
      }),
      prisma.crossword.findMany({
        where: { theme, NOT: { id: excludeId } },
        take: 5
      })
    ]);

    return [
      ...wordSearches.map(ws => ({ ...ws, type: 'wordsearch' })),
      ...crosswords.map(cw => ({ ...cw, type: 'crossword' }))
    ];
  }

  /**
   * Get puzzles by difficulty
   */
  private async getPuzzlesByDifficulty(difficulty: string, excludeId: string): Promise<any[]> {
    const [wordSearches, crosswords] = await Promise.all([
      prisma.wordSearch.findMany({
        where: { difficulty, NOT: { id: excludeId } },
        take: 3
      }),
      prisma.crossword.findMany({
        where: { difficulty, NOT: { id: excludeId } },
        take: 3
      })
    ]);

    return [
      ...wordSearches.map(ws => ({ ...ws, type: 'wordsearch' })),
      ...crosswords.map(cw => ({ ...cw, type: 'crossword' }))
    ];
  }

  /**
   * Generate search suggestions
   */
  async generateSuggestions(query: string): Promise<{
    themes: string[];
    relatedSearches: string[];
    popularPuzzles: any[];
  }> {
    try {
      // Get popular themes
      const themes = await this.getPopularThemes();
      
      // Generate related searches
      const relatedSearches = this.getRelatedTerms(query.toLowerCase()).slice(0, 5);
      
      // Get popular puzzles
      const popularPuzzles = await this.getPopularPuzzles();

      return {
        themes: themes.slice(0, 8),
        relatedSearches,
        popularPuzzles: popularPuzzles.slice(0, 6)
      };
    } catch (error) {
      console.error('Error generating suggestions:', error);
      return { themes: [], relatedSearches: [], popularPuzzles: [] };
    }
  }

  /**
   * Get popular themes
   */
  private async getPopularThemes(): Promise<string[]> {
    const [wsThemes, cwThemes] = await Promise.all([
      prisma.wordSearch.groupBy({
        by: ['theme'],
        _count: { theme: true },
        orderBy: { _count: { theme: 'desc' } },
        take: 10
      }),
      prisma.crossword.groupBy({
        by: ['theme'],
        _count: { theme: true },
        orderBy: { _count: { theme: 'desc' } },
        take: 10
      })
    ]);

    const allThemes = [...wsThemes, ...cwThemes];
    const themeMap = new Map<string, number>();
    
    allThemes.forEach(item => {
      const current = themeMap.get(item.theme) || 0;
      themeMap.set(item.theme, current + item._count.theme);
    });

    return Array.from(themeMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([theme]) => theme);
  }

  /**
   * Get popular puzzles
   */
  private async getPopularPuzzles(): Promise<any[]> {
    const [wordSearches, crosswords] = await Promise.all([
      prisma.wordSearch.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.crossword.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    return [
      ...wordSearches.map(ws => ({ ...ws, type: 'wordsearch' })),
      ...crosswords.map(cw => ({ ...cw, type: 'crossword' }))
    ].slice(0, 6);
  }
}

export default PuzzleSearchEngine;
