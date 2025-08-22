import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { createClient } from '@/util/supabase/api';
import { rateLimit } from '@/lib/rateLimit';

function getIp(req: NextApiRequest): string {
  const xf = req.headers['x-forwarded-for'];
  const ip = Array.isArray(xf) ? xf[0] : (xf?.split(',')[0] ?? '');
  return ip || (req.socket as any)?.remoteAddress || 'unknown';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Best-effort rate limit with Upstash (if configured) or in-memory fallback
    const supabase = createClient(req, res);
    const { data: { user } } = await supabase.auth.getUser();
    const ip = getIp(req);
    const isAuthed = Boolean(user?.id);
    const tokensPerMinute = isAuthed ? 120 : 30;
    const key = `cw:list:${isAuthed ? `u:${user!.id}` : `ip:${ip}`}`;
    const rl = await rateLimit({ key, tokensPerWindow: tokensPerMinute, windowMs: 60_000 });
    if (!rl.ok) {
      if (typeof rl.remaining === 'number') res.setHeader('X-RateLimit-Remaining', String(rl.remaining));
      if (typeof rl.reset === 'number') res.setHeader('X-RateLimit-Reset', String(rl.reset));
      return res.status(429).json({ message: 'Too many requests' });
    }
    if (typeof rl.remaining === 'number') res.setHeader('X-RateLimit-Remaining', String(rl.remaining));
    if (typeof rl.reset === 'number') res.setHeader('X-RateLimit-Reset', String(rl.reset));

    const { page = '1', limit = '20', search, theme, difficulty } = req.query;

    // Sanitize pagination
    const rawPage = parseInt(page as string, 10);
    const rawLimit = parseInt(limit as string, 10);
    const MAX_LIMIT = 50;
    const MIN_LIMIT = 1;
    const pageNum = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
    const limitNum = Number.isFinite(rawLimit)
      ? Math.max(MIN_LIMIT, Math.min(MAX_LIMIT, rawLimit))
      : 20;
    const skip = (pageNum - 1) * limitNum;

    // Build where clause for filtering
    const where: any = {};
    
    if (search && typeof search === 'string' && search.trim().length >= 2) {
      const s = search.trim();
      where.OR = [
        { title: { contains: s, mode: 'insensitive' } },
        { theme: { contains: s, mode: 'insensitive' } },
        { description: { contains: s, mode: 'insensitive' } }
      ];
    }
    
    if (theme) {
      where.theme = theme as string;
    }
    
    if (difficulty) {
      where.difficulty = difficulty as string;
    }

    // Get crosswords with pagination
    const [crosswords, total] = await Promise.all([
      prisma.crossword.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          theme: true,
          difficulty: true,
          grid: true,
          clues: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.crossword.count({ where })
    ]);

    res.status(200).json({
      crosswords,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });

  } catch (error) {
    console.error('Error fetching crosswords:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
