import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface UserFavoriteData {
  id: string;
  userId: string;
  puzzleId: string;
  puzzleType: 'wordsearch' | 'crossword';
  createdAt: Date;
  puzzle?: any; // Full puzzle data when populated
}

export class FavoritesManager {
  private static instance: FavoritesManager;
  
  public static getInstance(): FavoritesManager {
    if (!FavoritesManager.instance) {
      FavoritesManager.instance = new FavoritesManager();
    }
    return FavoritesManager.instance;
  }

  /**
   * Add puzzle to user's favorites
   */
  async addFavorite(userId: string, puzzleId: string, puzzleType: 'wordsearch' | 'crossword'): Promise<UserFavoriteData> {
    try {
      // Check if already favorited
      const existing = await prisma.userFavorite.findUnique({
        where: {
          userId_puzzleId: {
            userId,
            puzzleId
          }
        }
      });

      if (existing) {
        return {
          id: existing.id,
          userId: existing.userId,
          puzzleId: existing.puzzleId,
          puzzleType: existing.puzzleType as 'wordsearch' | 'crossword',
          createdAt: existing.createdAt
        };
      }

      // Create new favorite
      const favorite = await prisma.userFavorite.create({
        data: {
          userId,
          puzzleId,
          puzzleType
        }
      });

      // Track interaction
      await this.trackInteraction(userId, puzzleId, puzzleType, 'favorited');

      return {
        id: favorite.id,
        userId: favorite.userId,
        puzzleId: favorite.puzzleId,
        puzzleType: favorite.puzzleType as 'wordsearch' | 'crossword',
        createdAt: favorite.createdAt
      };
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  }

  /**
   * Remove puzzle from user's favorites
   */
  async removeFavorite(userId: string, puzzleId: string): Promise<boolean> {
    try {
      const deleted = await prisma.userFavorite.deleteMany({
        where: {
          userId,
          puzzleId
        }
      });

      return deleted.count > 0;
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }

  /**
   * Check if puzzle is favorited by user
   */
  async isFavorited(userId: string, puzzleId: string): Promise<boolean> {
    try {
      const favorite = await prisma.userFavorite.findUnique({
        where: {
          userId_puzzleId: {
            userId,
            puzzleId
          }
        }
      });

      return !!favorite;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  /**
   * Get user's favorites with full puzzle data
   */
  async getUserFavorites(userId: string, options: {
    type?: 'wordsearch' | 'crossword' | 'all';
    limit?: number;
    offset?: number;
  } = {}): Promise<UserFavoriteData[]> {
    const { type = 'all', limit = 50, offset = 0 } = options;

    try {
      const whereClause: any = { userId };
      if (type !== 'all') {
        whereClause.puzzleType = type;
      }

      const favorites = await prisma.userFavorite.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset
      });

      // Populate with full puzzle data
      const favoritesWithPuzzles: UserFavoriteData[] = [];
      
      for (const favorite of favorites) {
        let puzzle = null;
        
        try {
          if (favorite.puzzleType === 'wordsearch') {
            puzzle = await prisma.wordSearch.findUnique({
              where: { id: favorite.puzzleId }
            });
          } else {
            puzzle = await prisma.crossword.findUnique({
              where: { id: favorite.puzzleId }
            });
          }
        } catch (puzzleError) {
          console.error(`Error fetching puzzle ${favorite.puzzleId}:`, puzzleError);
        }

        favoritesWithPuzzles.push({
          id: favorite.id,
          userId: favorite.userId,
          puzzleId: favorite.puzzleId,
          puzzleType: favorite.puzzleType as 'wordsearch' | 'crossword',
          createdAt: favorite.createdAt,
          puzzle
        });
      }

      return favoritesWithPuzzles;
    } catch (error) {
      console.error('Error getting user favorites:', error);
      throw error;
    }
  }

  /**
   * Get user's favorite puzzle IDs (for quick lookup)
   */
  async getUserFavoriteIds(userId: string): Promise<Set<string>> {
    try {
      const favorites = await prisma.userFavorite.findMany({
        where: { userId },
        select: { puzzleId: true }
      });

      return new Set(favorites.map(f => f.puzzleId));
    } catch (error) {
      console.error('Error getting user favorite IDs:', error);
      return new Set();
    }
  }

  /**
   * Get favorites count for user
   */
  async getFavoritesCount(userId: string): Promise<{
    total: number;
    wordsearch: number;
    crossword: number;
  }> {
    try {
      const [total, wordsearch, crossword] = await Promise.all([
        prisma.userFavorite.count({ where: { userId } }),
        prisma.userFavorite.count({ where: { userId, puzzleType: 'wordsearch' } }),
        prisma.userFavorite.count({ where: { userId, puzzleType: 'crossword' } })
      ]);

      return { total, wordsearch, crossword };
    } catch (error) {
      console.error('Error getting favorites count:', error);
      return { total: 0, wordsearch: 0, crossword: 0 };
    }
  }

  /**
   * Track user interaction with puzzle
   */
  async trackInteraction(
    userId: string, 
    puzzleId: string, 
    puzzleType: 'wordsearch' | 'crossword',
    interactionType: 'viewed' | 'played' | 'completed' | 'favorited' | 'shared',
    metadata?: any
  ): Promise<void> {
    try {
      await prisma.userPuzzleInteraction.create({
        data: {
          userId,
          puzzleId,
          puzzleType,
          interactionType,
          metadata: metadata || {},
          durationSeconds: metadata?.duration || null
        }
      });
    } catch (error) {
      console.error('Error tracking interaction:', error);
      // Don't throw - interaction tracking shouldn't break the main flow
    }
  }

  /**
   * Get user's interaction history
   */
  async getUserInteractions(userId: string, options: {
    type?: 'viewed' | 'played' | 'completed' | 'favorited' | 'shared';
    puzzleType?: 'wordsearch' | 'crossword';
    limit?: number;
  } = {}): Promise<any[]> {
    const { type, puzzleType, limit = 50 } = options;

    try {
      const whereClause: any = { userId };
      if (type) whereClause.interactionType = type;
      if (puzzleType) whereClause.puzzleType = puzzleType;

      return await prisma.userPuzzleInteraction.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        take: limit
      });
    } catch (error) {
      console.error('Error getting user interactions:', error);
      return [];
    }
  }

  /**
   * Get personalized recommendations based on user's favorites and interactions
   */
  async getPersonalizedRecommendations(userId: string, limit: number = 10): Promise<any[]> {
    try {
      // Get user's favorite themes and difficulties
      const favorites = await this.getUserFavorites(userId, { limit: 100 });
      
      if (favorites.length === 0) {
        // Return popular puzzles for new users
        return await this.getPopularPuzzles(limit);
      }

      // Analyze user preferences
      const themePreferences = new Map<string, number>();
      const difficultyPreferences = new Map<string, number>();
      const typePreferences = new Map<string, number>();

      favorites.forEach(fav => {
        if (fav.puzzle) {
          const theme = fav.puzzle.theme;
          const difficulty = fav.puzzle.difficulty;
          const type = fav.puzzleType;

          themePreferences.set(theme, (themePreferences.get(theme) || 0) + 1);
          difficultyPreferences.set(difficulty, (difficultyPreferences.get(difficulty) || 0) + 1);
          typePreferences.set(type, (typePreferences.get(type) || 0) + 1);
        }
      });

      // Get top preferences
      const topThemes = Array.from(themePreferences.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([theme]) => theme);

      const topDifficulties = Array.from(difficultyPreferences.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([difficulty]) => difficulty);

      // Get user's favorited puzzle IDs to exclude
      const favoritedIds = new Set(favorites.map(f => f.puzzleId));

      // Find recommendations based on preferences
      const recommendations: any[] = [];

      for (const theme of topThemes) {
        for (const difficulty of topDifficulties) {
          // Get word searches
          const wordSearches = await prisma.wordSearch.findMany({
            where: {
              theme,
              difficulty,
              NOT: { id: { in: Array.from(favoritedIds) } }
            },
            take: 3,
            orderBy: { createdAt: 'desc' }
          });

          // Get crosswords
          const crosswords = await prisma.crossword.findMany({
            where: {
              theme,
              difficulty,
              NOT: { id: { in: Array.from(favoritedIds) } }
            },
            take: 3,
            orderBy: { createdAt: 'desc' }
          });

          recommendations.push(
            ...wordSearches.map(ws => ({ ...ws, type: 'wordsearch', reason: `Similar to your ${theme} favorites` })),
            ...crosswords.map(cw => ({ ...cw, type: 'crossword', reason: `Similar to your ${theme} favorites` }))
          );
        }
      }

      // Remove duplicates and limit
      const uniqueRecommendations = recommendations.filter((rec, index, arr) => 
        arr.findIndex(item => item.id === rec.id) === index
      );

      return uniqueRecommendations.slice(0, limit);
    } catch (error) {
      console.error('Error getting personalized recommendations:', error);
      return await this.getPopularPuzzles(limit);
    }
  }

  /**
   * Get popular puzzles as fallback
   */
  private async getPopularPuzzles(limit: number): Promise<any[]> {
    try {
      const [wordSearches, crosswords] = await Promise.all([
        prisma.wordSearch.findMany({
          take: Math.ceil(limit / 2),
          orderBy: { createdAt: 'desc' }
        }),
        prisma.crossword.findMany({
          take: Math.ceil(limit / 2),
          orderBy: { createdAt: 'desc' }
        })
      ]);

      return [
        ...wordSearches.map(ws => ({ ...ws, type: 'wordsearch', reason: 'Popular puzzle' })),
        ...crosswords.map(cw => ({ ...cw, type: 'crossword', reason: 'Popular puzzle' }))
      ].slice(0, limit);
    } catch (error) {
      console.error('Error getting popular puzzles:', error);
      return [];
    }
  }
}

export default FavoritesManager;
