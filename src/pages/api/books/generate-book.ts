import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/util/supabase/api';
import { BookGenerator, PuzzleTemplate, BookType, BookCollection } from '@/utils/bookGenerator';

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

    const { bookType, largePrint } = req.body;

    if (bookType && !['WORD_SEARCH', 'CROSSWORD', 'MIXED'].includes(bookType)) {
      return res.status(400).json({ error: 'Invalid bookType specified' });
    }

    console.log(`Generating all books for bookType: ${bookType || 'MIXED'}`);

    const generator = new BookGenerator();
    const collection: BookCollection = await generator.generateAllBooks(bookType as BookType || 'MIXED', largePrint || false);

    if (!collection || collection.books.length === 0) {
      console.error('No books could be generated.');
      return res.status(404).json({ error: 'No books could be generated from the provided data.' });
    }

    // Map the collection to a summary format for the response
    const booksSummary = collection.books.map(book => ({
      id: book.id,
      title: book.title,
      theme: book.theme,
      totalPages: book.totalPages,
      wordSearchCount: book.pages.filter((p: PuzzleTemplate) => p.type === 'wordsearch').length,
      crosswordCount: book.pages.filter((p: PuzzleTemplate) => p.type === 'crossword').length
    }));

    res.status(200).json({
      message: 'Book collection generated successfully',
      collection: {
        totalBooks: collection.totalBooks,
        totalPages: collection.totalPages,
        books: booksSummary
      },
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating book collection:', error);
    res.status(500).json({ error: 'Failed to generate book collection' });
  }
}