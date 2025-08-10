import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/util/supabase/api';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('[API /word-search/list] Received request.');
  if (req.method !== 'GET') {
    console.log('[API /word-search/list] Method not allowed.');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[API /word-search/list] Initializing Supabase client.');
    const supabase = createClient(req, res);
    console.log('[API /word-search/list] Attempting to get user from Supabase.');
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log('[API /word-search/list] Supabase getUser call complete.');

    if (authError) {
      console.error('[API /word-search/list] Supabase auth error:', authError.message);
    }
    if (!user) {
      console.log('[API /word-search/list] No user found.');
    }

    if (authError || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log(`[API /word-search/list] User authenticated: ${user.id}`);

    // Add pagination to prevent 4MB+ responses
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    console.log(`[API /word-search/list] Fetching puzzles from Prisma for user ${user.id}. Page: ${page}, Limit: ${limit}`);
    const wordSearches = await prisma.wordSearch.findMany({
      where: {
        userId: user.id,
      },
      take: limit,
      skip: skip,
      orderBy: { createdAt: 'desc' },
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
    console.log(`[API /word-search/list] Prisma query complete. Found ${wordSearches.length} puzzles.`);

    res.status(200).json(wordSearches);
    console.log('[API /word-search/list] Request successfully processed.');

  } catch (error) {
    console.error('[API /word-search/list] A critical error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}