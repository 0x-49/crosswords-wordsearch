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

    const wordSearches = await prisma.wordSearch.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        theme: true,
        difficulty: true,
        gridSize: true,
        words: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json(wordSearches);
  } catch (error) {
    console.error('Error fetching word searches:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}