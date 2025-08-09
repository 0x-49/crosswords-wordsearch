import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const prisma = new PrismaClient();

const USER_ID = 'e17047d6-b9a7-456c-ba5e-4acda9899edf';

interface BookMetadata {
  id: string;
  title: string;
  description: string;
  theme: string;
  bookType: 'WORD_SEARCH' | 'CROSSWORD' | 'MIXED';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  targetPuzzleCount: number;
}

async function generateBookMetadataFromThemes(): Promise<BookMetadata[]> {
  // Get available themes from the database
  const wsThemes = await prisma.wordSearch.groupBy({
    by: ['theme'],
    _count: { theme: true },
    orderBy: { _count: { theme: 'desc' } },
    take: 10
  });
  
  const csThemes = await prisma.crossword.groupBy({
    by: ['theme'],
    _count: { theme: true },
    orderBy: { _count: { theme: 'desc' } },
    take: 10
  });
  
  const allThemes = Array.from(new Set([...wsThemes.map(t => t.theme), ...csThemes.map(t => t.theme)]));
  const difficulties: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium', 'Hard'];
  const bookTypes: ('WORD_SEARCH' | 'CROSSWORD' | 'MIXED')[] = ['WORD_SEARCH', 'CROSSWORD', 'MIXED'];
  
  const books: BookMetadata[] = [];
  let bookCounter = 1;
  
  // Generate books for each theme and type combination
  for (const theme of allThemes.slice(0, 8)) { // Limit to top 8 themes
    for (const bookType of bookTypes) {
      for (const difficulty of difficulties) {
        const cleanTheme = theme.toLowerCase().replace(/[^a-z0-9]/g, '');
        const bookId = `book_${bookType.toLowerCase()}_${cleanTheme}_${difficulty.toLowerCase()}_${bookCounter.toString().padStart(3, '0')}`;
        
        books.push({
          id: bookId,
          title: `${theme} ${bookType.replace('_', ' ')} Collection`,
          description: `A comprehensive collection of ${difficulty.toLowerCase()} ${theme.toLowerCase()} themed ${bookType.toLowerCase().replace('_', ' ')} puzzles. Perfect for puzzle enthusiasts who love ${theme.toLowerCase()} topics.`,
          theme: theme,
          bookType,
          difficulty,
          targetPuzzleCount: difficulty === 'Easy' ? 25 : difficulty === 'Medium' ? 35 : 45,
        });
        
        bookCounter++;
      }
    }
  }
  
  console.log(`📊 Generated ${books.length} book metadata entries from ${allThemes.length} themes`);
  return books;
}

async function selectPuzzlesForBook(bookMetadata: BookMetadata): Promise<{
  wordSearchIds: string[];
  crosswordIds: string[];
}> {
  const { bookType, targetPuzzleCount, difficulty, theme } = bookMetadata;
  
  let wordSearchIds: string[] = [];
  let crosswordIds: string[] = [];
  
  if (bookType === 'WORD_SEARCH' || bookType === 'MIXED') {
    const wsCount = bookType === 'MIXED' ? Math.floor(targetPuzzleCount / 2) : targetPuzzleCount;
    
    const wordSearches = await prisma.wordSearch.findMany({
      where: {
        difficulty: difficulty,
        theme: {
          contains: theme,
          mode: 'insensitive'
        }
      },
      select: { id: true },
      take: wsCount,
      orderBy: { createdAt: 'asc' }
    });
    
    wordSearchIds = wordSearches.map(ws => ws.id);
  }
  
  if (bookType === 'CROSSWORD' || bookType === 'MIXED') {
    const csCount = bookType === 'MIXED' ? Math.ceil(targetPuzzleCount / 2) : targetPuzzleCount;
    
    const crosswords = await prisma.crossword.findMany({
      where: {
        difficulty: difficulty,
        theme: {
          contains: theme,
          mode: 'insensitive'
        }
      },
      select: { id: true },
      take: csCount,
      orderBy: { createdAt: 'asc' }
    });
    
    crosswordIds = crosswords.map(cs => cs.id);
  }
  
  return { wordSearchIds, crosswordIds };
}

async function generateAndIngestBooks() {
  try {
    console.log('📚 GENERATING AND INGESTING PUZZLE BOOKS');
    console.log('========================================');
    
    // Step 1: Generate book metadata from existing puzzle themes
    console.log('\n📊 Step 1: Generating book metadata from puzzle themes...');
    const bookMetadataList = await generateBookMetadataFromThemes();
    
    console.log(`Found ${bookMetadataList.length} books to generate`);
    
    // Step 2: Generate books in batches
    console.log('\n📖 Step 2: Generating and ingesting books...');
    
    let successCount = 0;
    let failureCount = 0;
    const batchSize = 3;
    
    for (let i = 0; i < bookMetadataList.length; i += batchSize) {
      const batch = bookMetadataList.slice(i, i + batchSize);
      const batchNum = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(bookMetadataList.length / batchSize);
      
      console.log(`\n📦 Processing batch ${batchNum}/${totalBatches} (${batch.length} books):`);
      
      for (const bookMeta of batch) {
        try {
          console.log(`   📚 Generating "${bookMeta.title}"...`);
          
          // Select puzzles for this book
          const { wordSearchIds, crosswordIds } = await selectPuzzlesForBook(bookMeta);
          const totalSelected = wordSearchIds.length + crosswordIds.length;
          
          if (totalSelected === 0) {
            console.log(`   ⚠️  No puzzles found for "${bookMeta.title}", skipping...`);
            failureCount++;
            continue;
          }
          
          // Create the book in database
          const book = await prisma.puzzleBook.upsert({
            where: { id: bookMeta.id },
            update: {
              title: bookMeta.title,
              description: bookMeta.description,
              theme: bookMeta.theme,
              bookType: bookMeta.bookType,
              difficulty: bookMeta.difficulty,
            },
            create: {
              id: bookMeta.id,
              title: bookMeta.title,
              description: bookMeta.description,
              theme: bookMeta.theme,
              bookType: bookMeta.bookType,
              difficulty: bookMeta.difficulty,
              userId: USER_ID,
            },
          });
          
          // Link word search puzzles
          if (wordSearchIds.length > 0) {
            await prisma.puzzleBookWordSearch.deleteMany({
              where: { puzzleBookId: book.id }
            });
            
            await prisma.puzzleBookWordSearch.createMany({
              data: wordSearchIds.map((wsId, index) => ({
                puzzleBookId: book.id,
                wordSearchId: wsId,
                order: index + 1,
              })),
            });
          }
          
          // Link crossword puzzles
          if (crosswordIds.length > 0) {
            await prisma.puzzleBookCrossword.deleteMany({
              where: { puzzleBookId: book.id }
            });
            
            await prisma.puzzleBookCrossword.createMany({
              data: crosswordIds.map((csId, index) => ({
                puzzleBookId: book.id,
                crosswordId: csId,
                order: index + 1,
              })),
            });
          }
          
          console.log(`   ✅ "${bookMeta.title}" created with ${totalSelected} puzzles (${wordSearchIds.length} WS, ${crosswordIds.length} CS)`);
          successCount++;
          
        } catch (error) {
          console.log(`   ❌ Failed to create "${bookMeta.title}": ${error}`);
          failureCount++;
        }
      }
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    // Step 3: Final summary
    console.log('\n🎉 BOOK GENERATION COMPLETE!');
    console.log('============================');
    console.log(`✅ Successfully created: ${successCount} books`);
    console.log(`❌ Failed to create: ${failureCount} books`);
    console.log(`📊 Success rate: ${Math.round((successCount / bookMetadataList.length) * 100)}%`);
    
    // Get final counts
    const totalBooks = await prisma.puzzleBook.count();
    const totalWSLinks = await prisma.puzzleBookWordSearch.count();
    const totalCSLinks = await prisma.puzzleBookCrossword.count();
    
    console.log(`\n📚 FINAL DATABASE STATE:`);
    console.log(`   Total books: ${totalBooks}`);
    console.log(`   Word search links: ${totalWSLinks}`);
    console.log(`   Crossword links: ${totalCSLinks}`);
    console.log(`   Total puzzle-book relationships: ${totalWSLinks + totalCSLinks}`);
    
  } catch (error) {
    console.error('💥 Book generation failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

generateAndIngestBooks();
