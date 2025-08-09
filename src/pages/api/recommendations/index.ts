import { NextApiRequest, NextApiResponse } from 'next';
import FavoritesManager from '@/lib/favoritesManager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get user ID from headers or session
    const userId = req.headers['user-id'] as string || 'default-user-id';
    const { limit = '10' } = req.query;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const favoritesManager = FavoritesManager.getInstance();
    const recommendations = await favoritesManager.getPersonalizedRecommendations(
      userId, 
      parseInt(limit as string)
    );

    res.status(200).json({
      recommendations,
      total: recommendations.length,
      userId
    });

  } catch (error) {
    console.error('Recommendations API error:', error);
    res.status(500).json({ 
      message: 'Failed to get recommendations',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
