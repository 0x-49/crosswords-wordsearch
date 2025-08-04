import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/util/supabase/api';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createClient(req, res);
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid word search ID' });
    }

    const wordSearch = await prisma.wordSearch.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!wordSearch) {
      return res.status(404).json({ error: 'Word search not found' });
    }

    // Parse the stored JSON data
    const grid = JSON.parse(wordSearch.grid);
    const solution = JSON.parse(wordSearch.solution);

    res.status(200).json({
      id: wordSearch.id,
      title: wordSearch.title,
      theme: wordSearch.theme,
      difficulty: wordSearch.difficulty,
      gridSize: wordSearch.gridSize,
      words: wordSearch.words,
      grid,
      solution,
      createdAt: wordSearch.createdAt,
      updatedAt: wordSearch.updatedAt,
    });
  } catch (error) {
    console.error('Error fetching word search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}