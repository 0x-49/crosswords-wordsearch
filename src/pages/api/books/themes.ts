import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/util/supabase/api';
import { BookGenerator } from '@/utils/bookGenerator';
import { getThemeNames } from '@/utils/expandedThemes';

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

    const generator = new BookGenerator();
    const themes = getThemeNames();
    const bookSummary = generator.getBookSummary();

    res.status(200).json({
      themes,
      bookSummary,
      totalThemes: themes.length,
      totalBooks: themes.length,
      totalPages: themes.length * 20,
      pagesPerBook: 20,
      wordSearchesPerBook: 10,
      crosswordsPerBook: 10
    });

  } catch (error) {
    console.error('Error fetching themes:', error);
    res.status(500).json({ error: 'Failed to fetch themes' });
  }
}