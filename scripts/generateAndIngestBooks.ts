import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import csv from 'csv-parser';
import { createReadStream } from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const prisma = new PrismaClient();

const USER_ID = 'e17047d6-b9a7-456c-ba5e-4acda9899edf';

interface BookMetadata {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  bookType: 'WORD_SEARCH' | 'CROSSWORD' | 'MIXED';
  tags: string[];
  category: string;
  subcategory?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  targetPuzzleCount: number;
  isbn?: string;
  price?: number;
}



// Removed unused CSV parsing function
    
    createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on('data', (row: CSVRow) => {
        try {
          // Parse CSV row into BookMetadata
          // Adjust field names based on your actual CSV structure
          const book: BookMetadata = {
            id: `book_${row.ID || row.id || books.length.toString().padStart(3, '0')}`,
            title: row.Title || row.title || `Puzzle Book ${books.length + 1}`,
            subtitle: row.Subtitle || row.subtitle || undefined,
            description: row.Description || row.description || `A collection of engaging puzzles.`,
            bookType: determineBookType(row.Type || row.type || row.BookType || 'MIXED'),
            tags: parseTagsFromRow(row),
            category: row.Category || row.category || 'Puzzles',
            subcategory: row.Subcategory || row.subcategory || undefined,
            difficulty: determineDifficulty(row.Difficulty || row.difficulty || 'Medium'),
            targetPuzzleCount: parseInt(row.PuzzleCount || row.puzzleCount || '50'),
            isbn: row.ISBN || row.isbn || undefined,
            price: parseFloat(row.Price || row.price || '0'),
          };
          
          books.push(book);
        } catch (error) {
          console.warn(`Skipping malformed CSV row:`, error);
        }
      })
      .on('end', () => {
        console.log(`📊 Parsed ${books.length} books from CSV`);
        resolve(books);
      })
      .on('error', reject);
  });
}

function determineBookType(type: string): 'WORD_SEARCH' | 'CROSSWORD' | 'MIXED' {
  const normalizedType = type.toUpperCase().replace(/[^A-Z]/g, '');
  
  if (normalizedType.includes('WORDSEARCH') || normalizedType.includes('WS')) {
    return 'WORD_SEARCH';
  } else if (normalizedType.includes('CROSSWORD') || normalizedType.includes('CW')) {
    return 'CROSSWORD';
  } else {
    return 'MIXED';
  }
}

function determineDifficulty(difficulty: string): 'Easy' | 'Medium' | 'Hard' {
  const normalized = difficulty.toLowerCase();
  if (normalized.includes('easy') || normalized.includes('beginner')) {
    return 'Easy';
  } else if (normalized.includes('hard') || normalized.includes('expert') || normalized.includes('difficult')) {
    return 'Hard';
  } else {
    return 'Medium';
  }
}

// Removed unused parseTagsFromRow function

async function selectPuzzlesForBook(bookMetadata: BookMetadata): Promise<{
  wordSearchIds: string[];
  crosswordIds: string[];
}> {
  const { bookType, targetPuzzleCount, difficulty, tags } = bookMetadata;
  
  let wordSearchIds: string[] = [];
  let crosswordIds: string[] = [];
  
  if (bookType === 'WORD_SEARCH' || bookType === 'MIXED') {
    const wsCount = bookType === 'MIXED' ? Math.floor(targetPuzzleCount / 2) : targetPuzzleCount;
    
    // Select word search puzzles based on criteria
    const wordSearches = await prisma.wordSearch.findMany({
      where: {
        difficulty: difficulty,
        // Add theme-based filtering if tags match themes
        ...(tags.length > 0 && {
          OR: tags.map(tag => ({
            theme: {
              contains: tag,
              mode: 'insensitive'
            }
          }))
        })
      },
      select: { id: true },
      take: wsCount,
      orderBy: { createdAt: 'asc' }
    });
    
    wordSearchIds = wordSearches.map(ws => ws.id);
  }
  
  if (bookType === 'CROSSWORD' || bookType === 'MIXED') {
    const csCount = bookType === 'MIXED' ? Math.ceil(targetPuzzleCount / 2) : targetPuzzleCount;
    
    // Select crossword puzzles based on criteria
    const crosswords = await prisma.crossword.findMany({
      where: {
        difficulty: difficulty,
        // Add theme-based filtering if tags match themes
        ...(tags.length > 0 && {
          OR: tags.map(tag => ({
            theme: {
              contains: tag,
              mode: 'insensitive'
            }
          }))
        })
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
    
    // Step 1: Parse book metadata from CSV
    console.log('\n📊 Step 1: Parsing book metadata from CSV...');
    let bookMetadataList: BookMetadata[];
    
    try {
      bookMetadataList = await parseBookMetadataCSV();
    } catch (error) {
      console.warn('CSV parsing failed, generating sample books instead:', error);
      // Fallback: Generate sample books if CSV parsing fails
      bookMetadataList = generateSampleBooks();
    }
    
    console.log(`Found ${bookMetadataList.length} books to generate`);
    
    // Step 2: Generate books in batches
    console.log('\n📖 Step 2: Generating and ingesting books...');
    
    let successCount = 0;
    let failureCount = 0;
    const batchSize = 5;
    
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
              theme: bookMeta.subcategory || 'General',
              bookType: bookMeta.bookType,
              difficulty: bookMeta.difficulty,
            },
            create: {
              id: bookMeta.id,
              title: bookMeta.title,
              description: bookMeta.description,
              theme: bookMeta.subcategory || 'General',
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
      await new Promise(resolve => setTimeout(resolve, 500));
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

function generateSampleBooks(): BookMetadata[] {
  const themes = ['Animals', 'Nature', 'Food', 'Travel', 'Sports', 'Science', 'History', 'Art'];
  const difficulties: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium', 'Hard'];
  const bookTypes: ('WORD_SEARCH' | 'CROSSWORD' | 'MIXED')[] = ['WORD_SEARCH', 'CROSSWORD', 'MIXED'];
  
  const sampleBooks: BookMetadata[] = [];
  
  // Generate 50 sample books
  for (let i = 0; i < 50; i++) {
    const theme = themes[i % themes.length];
    const difficulty = difficulties[i % difficulties.length];
    const bookType = bookTypes[i % bookTypes.length];
    
    sampleBooks.push({
      id: `book_sample_${i.toString().padStart(3, '0')}`,
      title: `${theme} ${bookType.replace('_', ' ').toLowerCase()} Book`,
      subtitle: `${difficulty} Level Puzzles`,
      description: `A collection of ${difficulty.toLowerCase()} ${theme.toLowerCase()} themed ${bookType.toLowerCase().replace('_', ' ')} puzzles.`,
      bookType,
      tags: [theme.toLowerCase(), difficulty.toLowerCase(), bookType.toLowerCase().replace('_', ' ')],
      category: 'Puzzles',
      subcategory: theme,
      difficulty,
      targetPuzzleCount: 25 + (i % 25), // 25-50 puzzles per book
      isbn: undefined,
      price: 9.99,
    });
  }
  
  return sampleBooks;
}

generateAndIngestBooks();
