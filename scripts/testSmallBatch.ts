import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

// Configure dotenv to load variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();
const USER_ID = 'e17047d6-b9a7-456c-ba5e-4acda9899edf';
const WORDSEARCH_PUZZLE_DIR = 'C:/personal/amazon kdp/output_wordSearchData';

interface WordSearchPuzzleFile {
  title?: string;
  theme?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  gridSize?: number;
  words: string[];
  grid?: string[][];
  solution?: { [word: string]: { start: [number, number]; end: [number, number] } };
}

async function testSmallBatch() {
  try {
    console.log('🧪 Testing small batch ingestion (first 10 files)...');
    
    const filenames = await fs.readdir(WORDSEARCH_PUZZLE_DIR);
    const jsonFiles = filenames.filter(f => f.endsWith('.json')).slice(0, 10);
    
    console.log(`📁 Processing ${jsonFiles.length} files:`);
    jsonFiles.forEach((file, i) => console.log(`   ${i+1}. ${file}`));
    
    let successes = 0;
    let failures = 0;
    
    for (const filename of jsonFiles) {
      const puzzleId = `puz_ws_${filename.replace(/[^0-9]/g, '').padStart(5, '0')}`;
      
      try {
        const filePath = path.join(WORDSEARCH_PUZZLE_DIR, filename);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent) as WordSearchPuzzleFile;
        
        console.log(`\n🔄 Processing ${filename} -> ${puzzleId}`);
        console.log(`   Words: ${data.words?.length || 0}`);
        console.log(`   Title: ${data.title || 'undefined'}`);
        console.log(`   Theme: ${data.theme || 'undefined'}`);
        
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
        console.log(`   ✅ SUCCESS`);
        
      } catch (error) {
        failures++;
        console.log(`   ❌ FAILED: ${error}`);
      }
    }
    
    console.log(`\n📊 RESULTS:`);
    console.log(`   ✅ Successes: ${successes}`);
    console.log(`   ❌ Failures: ${failures}`);
    console.log(`   📈 Success Rate: ${Math.round(successes/(successes+failures)*100)}%`);
    
  } catch (error) {
    console.error('💥 Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSmallBatch();
