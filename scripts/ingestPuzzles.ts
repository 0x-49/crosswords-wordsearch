import { PrismaClient, BookType } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

// Configure dotenv to load variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

// --- CONFIGURATION ---
const USER_ID = 'e17047d6-b9a7-456c-ba5e-4acda9899edf';
const WORDSEARCH_PUZZLE_DIR = 'C:/personal/amazon kdp/output_wordSearchData';
const CROSSWORD_PUZZLE_DIR = 'C:/personal/amazon kdp/output_data_crossWord';
const BATCH_SIZE = 350; // Number of concurrent workers
const PROGRESS_INTERVAL = 100; // Log progress every N puzzles

// --- TYPE DEFINITIONS ---
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

// --- PARALLEL PROCESSING FUNCTIONS ---

/**
 * Process a single word search puzzle with bulletproof data validation
 */
async function processWordSearch(filename: string, data: WordSearchPuzzleFile): Promise<{ success: boolean; id: string; error?: string }> {
  const puzzleId = `puz_ws_${filename.replace(/[^0-9]/g, '').padStart(5, '0')}`;
  
  try {
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
    return { success: true, id: puzzleId };
  } catch (error) {
    console.error(`🔥 DETAILED WORD SEARCH ERROR for ${puzzleId}:`, error);
    return { success: false, id: puzzleId, error: String(error) };
  }
}

/**
 * Process a single crossword puzzle with bulletproof data validation
 */
async function processCrossword(filename: string, data: CrosswordPuzzleFile): Promise<{ success: boolean; id: string; error?: string }> {
  const puzzleId = `puz_cs_${filename.replace(/[^0-9]/g, '').padStart(5, '0')}`;
  
  try {
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
    return { success: true, id: puzzleId };
  } catch (error) {
    console.error(`🔥 DETAILED CROSSWORD ERROR for ${puzzleId}:`, error);
    return { success: false, id: puzzleId, error: String(error) };
  }
}

/**
 * Process puzzles in parallel batches
 */
async function processBatch<T>(items: { filename: string; data: T }[], processor: (filename: string, data: T) => Promise<{ success: boolean; id: string; error?: string }>): Promise<{ successes: number; failures: number; errors: string[] }> {
  const promises = items.map(({ filename, data }) => processor(filename, data));
  const results = await Promise.all(promises);
  
  const successes = results.filter(r => r.success).length;
  const failures = results.filter(r => !r.success);
  const errors = failures.map(f => `${f.id}: ${f.error}`);
  
  return { successes, failures: failures.length, errors };
}

/**
 * Read and process all files in parallel batches
 */
async function ingestWordSearches() {
  console.log(`\n🚀 Starting PARALLEL Word Search Ingestion from ${WORDSEARCH_PUZZLE_DIR}`);
  console.log(`⚡ Using ${BATCH_SIZE} concurrent workers`);
  
  const filenames = await fs.readdir(WORDSEARCH_PUZZLE_DIR);
  const jsonFiles = filenames.filter(f => f.endsWith('.json'));
  
  console.log(`📊 Found ${jsonFiles.length} word search files to process`);
  
  let totalSuccesses = 0;
  let totalFailures = 0;
  const allErrors: string[] = [];
  
  // Process files in batches
  for (let i = 0; i < jsonFiles.length; i += BATCH_SIZE) {
    const batch = jsonFiles.slice(i, i + BATCH_SIZE);
    const batchData: { filename: string; data: WordSearchPuzzleFile }[] = [];
    
    // Read all files in the batch
    for (const filename of batch) {
      try {
        const filePath = path.join(WORDSEARCH_PUZZLE_DIR, filename);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent) as WordSearchPuzzleFile;
        batchData.push({ filename, data });
      } catch (error) {
        console.error(`❌ Failed to read ${filename}: ${error}`);
        totalFailures++;
      }
    }
    
    // Process the batch in parallel
    const { successes, failures, errors } = await processBatch(batchData, processWordSearch);
    totalSuccesses += successes;
    totalFailures += failures;
    allErrors.push(...errors);
    
    // Progress update
    const processed = Math.min(i + BATCH_SIZE, jsonFiles.length);
    console.log(`📈 Progress: ${processed}/${jsonFiles.length} (${Math.round(processed/jsonFiles.length*100)}%) | ✅ ${totalSuccesses} | ❌ ${totalFailures}`);
  }
  
  console.log(`\n🎉 Word Search Ingestion Complete!`);
  console.log(`✅ Successfully ingested: ${totalSuccesses}`);
  console.log(`❌ Failed: ${totalFailures}`);
  if (allErrors.length > 0 && allErrors.length <= 10) {
    console.log(`\n🔍 Sample errors:`);
    allErrors.slice(0, 10).forEach(error => console.log(`   ${error}`));
  }
}

async function ingestCrosswords() {
  console.log(`\n🚀 Starting PARALLEL Crossword Ingestion from ${CROSSWORD_PUZZLE_DIR}`);
  console.log(`⚡ Using ${BATCH_SIZE} concurrent workers`);
  
  const filenames = await fs.readdir(CROSSWORD_PUZZLE_DIR);
  const jsonFiles = filenames.filter(f => f.endsWith('.json'));
  
  console.log(`📊 Found ${jsonFiles.length} crossword files to process`);
  
  let totalSuccesses = 0;
  let totalFailures = 0;
  const allErrors: string[] = [];
  
  // Process files in batches
  for (let i = 0; i < jsonFiles.length; i += BATCH_SIZE) {
    const batch = jsonFiles.slice(i, i + BATCH_SIZE);
    const batchData: { filename: string; data: CrosswordPuzzleFile }[] = [];
    
    // Read all files in the batch
    for (const filename of batch) {
      try {
        const filePath = path.join(CROSSWORD_PUZZLE_DIR, filename);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent) as CrosswordPuzzleFile;
        batchData.push({ filename, data });
      } catch (error) {
        console.error(`❌ Failed to read ${filename}: ${error}`);
        totalFailures++;
      }
    }
    
    // Process the batch in parallel
    const { successes, failures, errors } = await processBatch(batchData, processCrossword);
    totalSuccesses += successes;
    totalFailures += failures;
    allErrors.push(...errors);
    
    // Progress update
    const processed = Math.min(i + BATCH_SIZE, jsonFiles.length);
    console.log(`📈 Progress: ${processed}/${jsonFiles.length} (${Math.round(processed/jsonFiles.length*100)}%) | ✅ ${totalSuccesses} | ❌ ${totalFailures}`);
  }
  
  console.log(`\n🎉 Crossword Ingestion Complete!`);
  console.log(`✅ Successfully ingested: ${totalSuccesses}`);
  console.log(`❌ Failed: ${totalFailures}`);
  if (allErrors.length > 0 && allErrors.length <= 10) {
    console.log(`\n🔍 Sample errors:`);
    allErrors.slice(0, 10).forEach(error => console.log(`   ${error}`));
  }
}

// --- MAIN EXECUTION ---
async function main() {
  const startTime = Date.now();
  
  try {
    console.log('🚀 Starting ULTRA-FAST puzzle ingestion with 150 parallel workers!');
    await ingestWordSearches();
    await ingestCrosswords();
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    console.log(`\n🏁 MISSION COMPLETE! Total time: ${duration.toFixed(2)} seconds`);
  } catch (error) {
    console.error('\n💥 Critical error during puzzle ingestion:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
