import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/util/supabase/api';
import { BookGenerator, formatBookForPrint } from '@/utils/bookGenerator';

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

    const { theme, bookType } = req.body;

    if (!theme) {
      return res.status(400).json({ error: 'Theme is required' });
    }

    if (bookType && !['WORD_SEARCH', 'CROSSWORD', 'MIXED'].includes(bookType)) {
      return res.status(400).json({ error: 'Invalid bookType specified' });
    }

    console.log('Generating book for theme:', theme);

    const generator = new BookGenerator();
    const book = generator.generateBookByTheme(theme, bookType);

    if (!book) {
      console.error('Theme not found:', theme);
      return res.status(404).json({ error: 'Theme not found' });
    }

    // Format the book for text output
    const formattedBook = formatBookForPrint(book);

    res.status(200).json({
      message: 'Book generated successfully',
      book: {
        id: book.id,
        title: book.title,
        theme: book.theme,
        totalPages: book.totalPages,
        wordSearchCount: book.pages.filter(p => p.type === 'wordsearch').length,
        crosswordCount: book.pages.filter(p => p.type === 'crossword').length
      },
      content: formattedBook,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating book:', error);
    res.status(500).json({ error: 'Failed to generate book' });
  }
}