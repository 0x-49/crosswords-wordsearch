import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const prisma = new PrismaClient();

async function analyzePuzzleTitles() {
  try {
    console.log('🔍 ANALYZING PUZZLE TITLES AND THEMES FOR SEO URLS');
    console.log('==================================================');

    // Sample word search puzzles
    console.log('\n📊 Word Search Sample (first 10):');
    const wordSearchSample = await prisma.wordSearch.findMany({
      select: {
        id: true,
        title: true,
        theme: true,
        difficulty: true
      },
      take: 10,
      orderBy: { id: 'asc' }
    });

    wordSearchSample.forEach((puzzle, i) => {
      const slugTitle = puzzle.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      const seoUrl = `/puzzle/wordsearch/${slugTitle}-${puzzle.id}`;
      console.log(`   ${i + 1}. "${puzzle.title}" (${puzzle.theme}) -> ${seoUrl}`);
    });

    // Sample crossword puzzles
    console.log('\n📊 Crossword Sample (first 10):');
    const crosswordSample = await prisma.crossword.findMany({
      select: {
        id: true,
        title: true,
        theme: true,
        difficulty: true
      },
      take: 10,
      orderBy: { id: 'asc' }
    });

    crosswordSample.forEach((puzzle, i) => {
      const slugTitle = puzzle.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      const seoUrl = `/puzzle/crossword/${slugTitle}-${puzzle.id}`;
      console.log(`   ${i + 1}. "${puzzle.title}" (${puzzle.theme}) -> ${seoUrl}`);
    });

    // Analyze themes distribution
    console.log('\n📊 Theme Distribution:');
    const wsThemes = await prisma.wordSearch.groupBy({
      by: ['theme'],
      _count: { theme: true },
      orderBy: { _count: { theme: 'desc' } },
      take: 10
    });

    console.log('\nTop Word Search Themes:');
    wsThemes.forEach((theme, i) => {
      console.log(`   ${i + 1}. ${theme.theme}: ${theme._count.theme} puzzles`);
    });

    const csThemes = await prisma.crossword.groupBy({
      by: ['theme'],
      _count: { theme: true },
      orderBy: { _count: { theme: 'desc' } },
      take: 10
    });

    console.log('\nTop Crossword Themes:');
    csThemes.forEach((theme, i) => {
      console.log(`   ${i + 1}. ${theme.theme}: ${theme._count.theme} puzzles`);
    });

    // Total counts
    const wsTotal = await prisma.wordSearch.count();
    const csTotal = await prisma.crossword.count();
    
    console.log('\n📊 TOTALS:');
    console.log(`   Word Search: ${wsTotal.toLocaleString()} puzzles`);
    console.log(`   Crossword: ${csTotal.toLocaleString()} puzzles`);
    console.log(`   Total: ${(wsTotal + csTotal).toLocaleString()} puzzle pages to create`);

  } catch (error) {
    console.error('💥 Analysis failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

analyzePuzzleTitles();
