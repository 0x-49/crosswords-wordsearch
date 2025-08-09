import { NextApiRequest, NextApiResponse } from 'next';
import FavoritesManager from '@/lib/favoritesManager';
import { getServerSession } from 'next-auth/next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get user session (you'll need to implement this based on your auth system)
    // For now, using a placeholder user ID
    const userId = req.headers['user-id'] as string || 'default-user-id';
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const favoritesManager = FavoritesManager.getInstance();

    switch (req.method) {
      case 'GET':
        // Get user's favorites
        const { type, limit, offset } = req.query;
        const favorites = await favoritesManager.getUserFavorites(userId, {
          type: type as any,
          limit: limit ? parseInt(limit as string) : undefined,
          offset: offset ? parseInt(offset as string) : undefined
        });
        
        const count = await favoritesManager.getFavoritesCount(userId);
        
        return res.status(200).json({
          favorites,
          count,
          total: favorites.length
        });

      case 'POST':
        // Add favorite
        const { puzzleId, puzzleType } = req.body;
        
        if (!puzzleId || !puzzleType) {
          return res.status(400).json({ message: 'puzzleId and puzzleType are required' });
        }

        const newFavorite = await favoritesManager.addFavorite(userId, puzzleId, puzzleType);
        return res.status(201).json(newFavorite);

      case 'DELETE':
        // Remove favorite
        const { puzzleId: removeId } = req.body;
        
        if (!removeId) {
          return res.status(400).json({ message: 'puzzleId is required' });
        }

        const removed = await favoritesManager.removeFavorite(userId, removeId);
        return res.status(200).json({ success: removed });

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Favorites API error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
