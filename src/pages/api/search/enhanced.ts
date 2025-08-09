import { NextApiRequest, NextApiResponse } from 'next';
import PuzzleSearchEngine from '@/lib/puzzleSearch';

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
      limit = 20, 
      includeRelated = false 
    } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Query is required' });
    }

    const searchEngine = PuzzleSearchEngine.getInstance();
    
    // Perform enhanced search
    const results = await searchEngine.enhancedSearch({
      query,
      type,
      theme,
      difficulty,
      limit,
      includeRelated
    });

    // Generate suggestions
    const suggestions = await searchEngine.generateSuggestions(query);

    res.status(200).json({
      query,
      results,
      suggestions,
      total: results.length,
      searchTime: Date.now() // Simple timestamp for debugging
    });

  } catch (error) {
    console.error('Enhanced search error:', error);
    res.status(500).json({ 
      message: 'Search failed', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error' 
    });
  }
}
