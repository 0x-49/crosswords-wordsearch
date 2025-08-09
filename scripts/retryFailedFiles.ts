import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const prisma = new PrismaClient();

const USER_ID = 'e17047d6-b9a7-456c-ba5e-4acda9899edf';
const WORDSEARCH_PUZZLE_DIR = 'C:/personal/amazon kdp/output_wordSearchData';
const CROSSWORD_PUZZLE_DIR = 'C:/personal/amazon kdp/output_data_crossWord';

// Reduced batch size for more reliable processing
const BATCH_SIZE = 10; // Much smaller batches to avoid timeouts
const RETRY_DELAY = 1000; // 1 second delay between batches

interface WordSearchPuzzleFile {
  title?: string;
  theme?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  gridSize?: number;
  words: string[];
  grid?: string[][];
  solution?: { [word: string]: { start: [number, number]; end: [number, number] } };
}

interface CrosswordPuzzleFile {
  title?: string;
  theme?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  gridSize?: number;
  grid?: string[][];
  clues?: { across: { [num: string]: string }; down: { [num: string]: string } };
  answers?: { across: string[]; down: string[] };
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processWordSearchBatch(filenames: string[]): Promise<{ successes: number; failures: string[] }> {
  let successes = 0;
  const failures: string[] = [];

  for (const filename of filenames) {
    const puzzleId = `puz_ws_${filename.replace(/[^0-9]/g, '').padStart(5, '0')}`;
    
    try {
      const filePath = path.join(WORDSEARCH_PUZZLE_DIR, filename);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileContent) as WordSearchPuzzleFile;

      await prisma.wordSearch.upsert({
        where: { id: puzzleId },
        update: {
          title: data.title || `Word Search ${puzzleId}`,
          theme: data.theme || 'General',
          difficulty: data.difficulty || 'Medium',
          gridSize: data.gridSize || 15,
          words: data.words || [],
          grid: JSON.stringify(data.grid || []),
          solution: JSON.stringify(data.solution || {}),
        },
        create: {
          id: puzzleId,
          title: data.title || `Word Search ${puzzleId}`,
          theme: data.theme || 'General',
          difficulty: data.difficulty || 'Medium',
          gridSize: data.gridSize || 15,
          words: data.words || [],
          grid: JSON.stringify(data.grid || []),
          solution: JSON.stringify(data.solution || {}),
          userId: USER_ID,
        },
      });

      successes++;
      console.log(`   ✅ ${filename} -> ${puzzleId}`);
      
    } catch (error) {
      failures.push(filename);
      console.log(`   ❌ ${filename} -> ${puzzleId}: ${error}`);
    }
  }

  return { successes, failures };
}

async function processCrosswordBatch(filenames: string[]): Promise<{ successes: number; failures: string[] }> {
  let successes = 0;
  const failures: string[] = [];

  for (const filename of filenames) {
    const puzzleId = `puz_cs_${filename.replace(/[^0-9]/g, '').padStart(5, '0')}`;
    
    try {
      const filePath = path.join(CROSSWORD_PUZZLE_DIR, filename);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileContent) as CrosswordPuzzleFile;

      await prisma.crossword.upsert({
        where: { id: puzzleId },
        update: {
          title: data.title || `Crossword ${puzzleId}`,
          theme: data.theme || 'General',
          difficulty: data.difficulty || 'Medium',
          gridSize: data.gridSize || 15,
          grid: data.grid || [],
          clues: data.clues || { across: {}, down: {} },
        },
        create: {
          id: puzzleId,
          title: data.title || `Crossword ${puzzleId}`,
          theme: data.theme || 'General',
          difficulty: data.difficulty || 'Medium',
          gridSize: data.gridSize || 15,
          grid: data.grid || [],
          clues: data.clues || { across: {}, down: {} },
          userId: USER_ID,
        },
      });

      successes++;
      console.log(`   ✅ ${filename} -> ${puzzleId}`);
      
    } catch (error) {
      failures.push(filename);
      console.log(`   ❌ ${filename} -> ${puzzleId}: ${error}`);
    }
  }

  return { successes, failures };
}

async function retryFailedFiles() {
  try {
    console.log('🔄 RETRYING FAILED PUZZLE FILES');
    console.log('===============================');
    console.log('Using smaller batches and delays to avoid timeouts...\n');

    // Load failed files list
    const failedFilesData = JSON.parse(
      await fs.readFile(path.join(process.cwd(), 'scripts', 'failedFiles.json'), 'utf-8')
    );

    let totalWSSuccesses = 0;
    let totalWSFailures: string[] = [];
    let totalCSSuccesses = 0;
    let totalCSFailures: string[] = [];

    // Process Word Search failures in small batches
    console.log(`🔄 Processing ${failedFilesData.wordSearch.failed} failed Word Search files...`);
    const wsFailedFiles = failedFilesData.wordSearch.failedFiles;
    
    for (let i = 0; i < wsFailedFiles.length; i += BATCH_SIZE) {
      const batch = wsFailedFiles.slice(i, i + BATCH_SIZE);
      const batchNum = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(wsFailedFiles.length / BATCH_SIZE);
      
      console.log(`\n📦 Word Search Batch ${batchNum}/${totalBatches} (${batch.length} files):`);
      
      const { successes, failures } = await processWordSearchBatch(batch);
      totalWSSuccesses += successes;
      totalWSFailures.push(...failures);
      
      console.log(`   Batch result: ${successes}/${batch.length} successful`);
      
      // Delay between batches to avoid overwhelming the database
      if (i + BATCH_SIZE < wsFailedFiles.length) {
        console.log(`   ⏳ Waiting ${RETRY_DELAY}ms before next batch...`);
        await sleep(RETRY_DELAY);
      }
    }

    // Process Crossword failures in small batches
    console.log(`\n🔄 Processing ${failedFilesData.crossword.failed} failed Crossword files...`);
    const csFailedFiles = failedFilesData.crossword.failedFiles;
    
    for (let i = 0; i < csFailedFiles.length; i += BATCH_SIZE) {
      const batch = csFailedFiles.slice(i, i + BATCH_SIZE);
      const batchNum = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(csFailedFiles.length / BATCH_SIZE);
      
      console.log(`\n📦 Crossword Batch ${batchNum}/${totalBatches} (${batch.length} files):`);
      
      const { successes, failures } = await processCrosswordBatch(batch);
      totalCSSuccesses += successes;
      totalCSFailures.push(...failures);
      
      console.log(`   Batch result: ${successes}/${batch.length} successful`);
      
      // Delay between batches
      if (i + BATCH_SIZE < csFailedFiles.length) {
        console.log(`   ⏳ Waiting ${RETRY_DELAY}ms before next batch...`);
        await sleep(RETRY_DELAY);
      }
    }

    // Final summary
    console.log('\n🎉 RETRY RESULTS:');
    console.log('================');
    console.log(`Word Search:`);
    console.log(`   Original failures: ${failedFilesData.wordSearch.failed}`);
    console.log(`   Retry successes: ${totalWSSuccesses}`);
    console.log(`   Still failing: ${totalWSFailures.length}`);
    console.log(`   Success rate: ${Math.round((totalWSSuccesses / failedFilesData.wordSearch.failed) * 100)}%`);
    
    console.log(`\nCrossword:`);
    console.log(`   Original failures: ${failedFilesData.crossword.failed}`);
    console.log(`   Retry successes: ${totalCSSuccesses}`);
    console.log(`   Still failing: ${totalCSFailures.length}`);
    console.log(`   Success rate: ${Math.round((totalCSSuccesses / failedFilesData.crossword.failed) * 100)}%`);

    console.log(`\nOverall:`);
    console.log(`   Total retry successes: ${totalWSSuccesses + totalCSSuccesses}`);
    console.log(`   Total still failing: ${totalWSFailures.length + totalCSFailures.length}`);

    // Save remaining failures for further analysis if needed
    if (totalWSFailures.length > 0 || totalCSFailures.length > 0) {
      const remainingFailures = {
        wordSearch: totalWSFailures,
        crossword: totalCSFailures,
        timestamp: new Date().toISOString()
      };

      await fs.writeFile(
        path.join(process.cwd(), 'scripts', 'remainingFailures.json'),
        JSON.stringify(remainingFailures, null, 2)
      );

      console.log(`\n💾 Remaining failures saved to scripts/remainingFailures.json`);
    }

    // Get final database counts
    const finalWSCount = await prisma.wordSearch.count();
    const finalCSCount = await prisma.crossword.count();
    
    console.log(`\n📊 FINAL DATABASE STATE:`);
    console.log(`   Word Search puzzles: ${finalWSCount}`);
    console.log(`   Crossword puzzles: ${finalCSCount}`);
    console.log(`   Total puzzles: ${finalWSCount + finalCSCount}`);

  } catch (error) {
    console.error('💥 Retry process failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

retryFailedFiles();
