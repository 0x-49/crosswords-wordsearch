import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const prisma = new PrismaClient();

async function checkBookResults() {
  try {
    console.log('📚 CHECKING BOOK GENERATION RESULTS');
    console.log('===================================');

    // Get book counts by type
    const books = await prisma.puzzleBook.groupBy({
      by: ['bookType'],
      _count: { bookType: true },
      orderBy: { _count: { bookType: 'desc' } }
    });

    console.log('\n📊 Books by Type:');
    books.forEach(book => {
      console.log(`   ${book.bookType}: ${book._count.bookType} books`);
    });

    // Get total counts
    const totalBooks = await prisma.puzzleBook.count();
    const totalWSLinks = await prisma.puzzleBookWordSearch.count();
    const totalCSLinks = await prisma.puzzleBookCrossword.count();
    const totalPuzzles = await prisma.wordSearch.count() + await prisma.crossword.count();

    console.log('\n📈 FINAL TOTALS:');
    console.log(`   📚 Total Books: ${totalBooks}`);
    console.log(`   🧩 Total Puzzles: ${totalPuzzles}`);
    console.log(`   🔗 Word Search Links: ${totalWSLinks}`);
    console.log(`   🔗 Crossword Links: ${totalCSLinks}`);
    console.log(`   🔗 Total Relationships: ${totalWSLinks + totalCSLinks}`);

    console.log('\n🎯 DYNAMIC PAGES AVAILABLE:');
    console.log(`   📄 Puzzle Pages: ${totalPuzzles} (each puzzle has its own page)`);
    console.log(`   📖 Book Pages: ${totalBooks} (each book has its own page)`);
    console.log(`   📊 Total Dynamic Pages: ${totalPuzzles + totalBooks}`);

    // Sample book data
    console.log('\n📖 Sample Books:');
    const sampleBooks = await prisma.puzzleBook.findMany({
      take: 5,
      select: {
        id: true,
        title: true,
        bookType: true,
        difficulty: true,
        theme: true,
        _count: {
          select: {
            wordSearches: true,
            crosswords: true
          }
        }
      }
    });

    sampleBooks.forEach((book, i) => {
      const totalPuzzlesInBook = book._count.wordSearches + book._count.crosswords;
      console.log(`   ${i + 1}. "${book.title}" (${book.bookType}, ${book.difficulty})`);
      console.log(`      Theme: ${book.theme}, Puzzles: ${totalPuzzlesInBook}`);
      console.log(`      URL: /book/${book.bookType.toLowerCase()}/${book.id}`);
    });

  } catch (error) {
    console.error('💥 Check failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBookResults();
