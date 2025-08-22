import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/util/supabase/api';
import { BookGenerator } from '@/utils/bookGenerator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createClient(req, res);
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const generator = new BookGenerator();
    const collection = await generator.generateAllBooks();

    // Store the collection summary in the response
    const summary = {
      totalBooks: collection.totalBooks,
      totalPages: collection.totalPages,
      themes: collection.books.map(book => ({
        theme: book.theme,
        title: book.title,
        pages: book.totalPages,
        wordSearches: book.pages.filter(p => p.type === 'wordsearch').length,
        crosswords: book.pages.filter(p => p.type === 'crossword').length
      }))
    };

    res.status(200).json({
      message: 'Book collection generated successfully',
      collection: summary,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating book collection:', error);
    res.status(500).json({ error: 'Failed to generate book collection' });
  }
}