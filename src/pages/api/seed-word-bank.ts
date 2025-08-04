import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { WORD_THEMES } from '@/utils/wordSearchGenerator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Clear existing word bank
    await prisma.wordBank.deleteMany();

    // Seed with themes
    const wordBankEntries = Object.entries(WORD_THEMES).map(([category, words]) => ({
      category,
      words,
    }));

    await prisma.wordBank.createMany({
      data: wordBankEntries,
    });

    res.status(200).json({ 
      message: 'Word bank seeded successfully',
      categories: Object.keys(WORD_THEMES).length,
      totalWords: Object.values(WORD_THEMES).flat().length
    });
  } catch (error) {
    console.error('Error seeding word bank:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}