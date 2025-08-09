// Simplified favorites system that works with current database
// This will be enhanced once we can apply the database migrations

interface FavoriteItem {
  puzzleId: string;
  puzzleType: 'wordsearch' | 'crossword';
  timestamp: number;
}

export class SimpleFavoritesManager {
  private static instance: SimpleFavoritesManager;
  private favorites: Map<string, Set<string>> = new Map(); // userId -> Set of puzzleIds
  
  public static getInstance(): SimpleFavoritesManager {
    if (!SimpleFavoritesManager.instance) {
      SimpleFavoritesManager.instance = new SimpleFavoritesManager();
    }
    return SimpleFavoritesManager.instance;
  }

  // For now, store in memory (in production, this would be in database)
  addFavorite(userId: string, puzzleId: string): boolean {
    if (!this.favorites.has(userId)) {
      this.favorites.set(userId, new Set());
    }
    
    const userFavorites = this.favorites.get(userId)!;
    const wasAdded = !userFavorites.has(puzzleId);
    userFavorites.add(puzzleId);
    
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem(`favorites_${userId}`) || '[]');
      if (!stored.includes(puzzleId)) {
        stored.push(puzzleId);
        localStorage.setItem(`favorites_${userId}`, JSON.stringify(stored));
      }
    }
    
    return wasAdded;
  }

  removeFavorite(userId: string, puzzleId: string): boolean {
    const userFavorites = this.favorites.get(userId);
    if (!userFavorites) return false;
    
    const wasRemoved = userFavorites.delete(puzzleId);
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem(`favorites_${userId}`) || '[]');
      const filtered = stored.filter((id: string) => id !== puzzleId);
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(filtered));
    }
    
    return wasRemoved;
  }

  isFavorited(userId: string, puzzleId: string): boolean {
    const userFavorites = this.favorites.get(userId);
    return userFavorites ? userFavorites.has(puzzleId) : false;
  }

  getFavorites(userId: string): string[] {
    // Load from localStorage if not in memory
    if (!this.favorites.has(userId) && typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem(`favorites_${userId}`) || '[]');
      this.favorites.set(userId, new Set(stored));
    }
    
    const userFavorites = this.favorites.get(userId);
    return userFavorites ? Array.from(userFavorites) : [];
  }

  getFavoritesCount(userId: string): number {
    return this.getFavorites(userId).length;
  }

  // Initialize favorites from localStorage
  initializeFromStorage(userId: string): void {
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem(`favorites_${userId}`) || '[]');
      this.favorites.set(userId, new Set(stored));
    }
  }
}

export default SimpleFavoritesManager;
