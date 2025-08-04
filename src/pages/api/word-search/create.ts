import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/util/supabase/api';
import prisma from '@/lib/prisma';
import { generateWordSearchPuzzle, WORD_THEMES } from '@/utils/wordSearchGenerator';

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

    const { title, theme, difficulty, gridSize, wordCount, customWords } = req.body;

    // Validate input
    if (!title || !theme || !difficulty) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      return res.status(400).json({ error: 'Invalid difficulty level' });
    }

    const finalGridSize = gridSize || 15;
    const finalWordCount = wordCount || 15;

    let words: string[];
    
    if (customWords && customWords.length > 0) {
      words = customWords.map((word: string) => word.toUpperCase().trim()).filter((word: string) => word.length > 0);
    } else if (theme in WORD_THEMES) {
      const puzzle = generateWordSearchPuzzle(theme as keyof typeof WORD_THEMES, difficulty, finalGridSize, finalWordCount);
      words = puzzle.words;
    } else {
      return res.status(400).json({ error: 'Invalid theme or no words provided' });
    }

    // Generate the word search puzzle
    const puzzle = generateWordSearchPuzzle(theme as keyof typeof WORD_THEMES, difficulty, finalGridSize, Math.min(words.length, finalWordCount));

    // Save to database
    const wordSearch = await prisma.wordSearch.create({
      data: {
        title,
        theme,
        difficulty,
        gridSize: finalGridSize,
        words: puzzle.words,
        grid: JSON.stringify(puzzle.grid),
        solution: JSON.stringify(puzzle.placements),
        userId: user.id,
      },
    });

    res.status(201).json({
      id: wordSearch.id,
      title: wordSearch.title,
      theme: wordSearch.theme,
      difficulty: wordSearch.difficulty,
      gridSize: wordSearch.gridSize,
      words: wordSearch.words,
      grid: puzzle.grid,
      solution: puzzle.placements,
      createdAt: wordSearch.createdAt,
    });
  } catch (error) {
    console.error('Error creating word search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}