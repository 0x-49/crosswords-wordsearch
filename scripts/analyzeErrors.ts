import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

// Configure dotenv to load variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();
const USER_ID = 'e17047d6-b9a7-456c-ba5e-4acda9899edf';
const WORDSEARCH_PUZZLE_DIR = 'C:/personal/amazon kdp/output_wordSearchData';
const CROSSWORD_PUZZLE_DIR = 'C:/personal/amazon kdp/output_data_crossWord';

interface WordSearchPuzzleFile {
  title?: string;
  theme?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  gridSize?: number;
  words: string[];
  grid?: string[][];
  solution?: { [word: string]: { start: [number, number]; end: [number, number] } };
}

async function analyzeErrors() {
  try {
    console.log('🔍 ERROR ANALYSIS REPORT');
    console.log('========================');
    
    // Check current database state
    console.log('\n📊 Current Database State:');
    const wordSearchCount = await prisma.wordSearch.count();
    const crosswordCount = await prisma.crossword.count();
    console.log(`   Word Search puzzles in DB: ${wordSearchCount}`);
    console.log(`   Crossword puzzles in DB: ${crosswordCount}`);
    
    // Check file system
    console.log('\n📁 File System Analysis:');
    const wsFiles = await fs.readdir(WORDSEARCH_PUZZLE_DIR);
    const wsJsonFiles = wsFiles.filter(f => f.endsWith('.json'));
    const csFiles = await fs.readdir(CROSSWORD_PUZZLE_DIR);
    const csJsonFiles = csFiles.filter(f => f.endsWith('.json'));
    
    console.log(`   Word Search JSON files: ${wsJsonFiles.length}`);
    console.log(`   Crossword JSON files: ${csJsonFiles.length}`);
    console.log(`   Total files to process: ${wsJsonFiles.length + csJsonFiles.length}`);
    
    // Calculate ingestion success rate
    const totalFiles = wsJsonFiles.length + csJsonFiles.length;
    const totalInDB = wordSearchCount + crosswordCount;
    const successRate = Math.round((totalInDB / totalFiles) * 100);
    
    console.log(`\n📈 Ingestion Analysis:`);
    console.log(`   Files processed: ${totalInDB}/${totalFiles} (${successRate}%)`);
    console.log(`   Missing/Failed: ${totalFiles - totalInDB}`);
    
    // Test problematic files by trying to process a few manually
    console.log('\n🧪 Testing Problematic Files:');
    let testCount = 0;
    let testFailures = 0;
    
    // Test first 20 files that might have failed
    for (const filename of wsJsonFiles.slice(0, 20)) {
      const puzzleId = `puz_ws_${filename.replace(/[^0-9]/g, '').padStart(5, '0')}`;
      
      try {
        // Check if this puzzle exists in DB
        const existing = await prisma.wordSearch.findUnique({ where: { id: puzzleId } });
        if (existing) continue; // Skip if already exists
        
        // Try to read and parse the file
        const filePath = path.join(WORDSEARCH_PUZZLE_DIR, filename);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent) as WordSearchPuzzleFile;
        
        // Try to upsert it
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
        
        testCount++;
        
      } catch (error) {
        testFailures++;
        console.log(`   ❌ ${filename} -> ${puzzleId}: ${error}`);
        
        if (testFailures >= 5) break; // Stop after 5 failures to avoid spam
      }
    }
    
    console.log(`\n🎯 Test Results:`);
    console.log(`   Test attempts: ${testCount + testFailures}`);
    console.log(`   Test successes: ${testCount}`);
    console.log(`   Test failures: ${testFailures}`);
    
    if (testFailures === 0) {
      console.log(`\n✅ No errors found in test sample. The remaining files may just need more processing time.`);
    } else {
      console.log(`\n❌ Found ${testFailures} specific errors that need to be addressed.`);
    }
    
  } catch (error) {
    console.error('💥 Error analysis failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

analyzeErrors();
