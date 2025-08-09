import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

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

interface CrosswordPuzzleFile {
  title?: string;
  theme?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  gridSize?: number;
  grid?: string[][];
  clues?: { across: { [num: string]: string }; down: { [num: string]: string } };
  answers?: { across: string[]; down: string[] };
}

interface ErrorAnalysis {
  errorType: string;
  count: number;
  examples: string[];
  description: string;
}

async function analyzeErrorTypes() {
  try {
    console.log('🔍 ANALYZING ERROR TYPES FOR FAILED FILES');
    console.log('==========================================');

    // Load failed files list
    const failedFilesData = JSON.parse(
      await fs.readFile(path.join(process.cwd(), 'scripts', 'failedFiles.json'), 'utf-8')
    );

    const errorAnalysis: ErrorAnalysis[] = [];
    let totalAnalyzed = 0;

    console.log('\n📊 Analyzing Word Search Failures...');
    console.log(`Analyzing ${failedFilesData.wordSearch.failed} failed word search files`);

    const wsErrors = {
      fileNotFound: 0,
      jsonParseError: 0,
      missingWords: 0,
      emptyWords: 0,
      invalidData: 0,
      databaseError: 0,
      unknown: 0
    };

    // Analyze first 50 failed word search files to identify patterns
    const wsFilesToAnalyze = failedFilesData.wordSearch.failedFiles.slice(0, 50);
    
    for (const filename of wsFilesToAnalyze) {
      const puzzleId = `puz_ws_${filename.replace(/[^0-9]/g, '').padStart(5, '0')}`;
      totalAnalyzed++;

      try {
        // Try to read the file
        const filePath = path.join(WORDSEARCH_PUZZLE_DIR, filename);
        let fileContent: string;
        
        try {
          fileContent = await fs.readFile(filePath, 'utf-8');
        } catch (error) {
          wsErrors.fileNotFound++;
          console.log(`   ❌ ${filename}: File not found or unreadable`);
          continue;
        }

        // Try to parse JSON
        let data: WordSearchPuzzleFile;
        try {
          data = JSON.parse(fileContent);
        } catch (error) {
          wsErrors.jsonParseError++;
          console.log(`   ❌ ${filename}: JSON parse error - ${error}`);
          continue;
        }

        // Check for missing or empty words array
        if (!data.words) {
          wsErrors.missingWords++;
          console.log(`   ❌ ${filename}: Missing words array`);
          continue;
        }

        if (!Array.isArray(data.words) || data.words.length === 0) {
          wsErrors.emptyWords++;
          console.log(`   ❌ ${filename}: Empty or invalid words array`);
          continue;
        }

        // Check for other data issues
        if (data.words.some(word => !word || typeof word !== 'string')) {
          wsErrors.invalidData++;
          console.log(`   ❌ ${filename}: Invalid word data (null/non-string words)`);
          continue;
        }

        // If we get here, try the database operation to see if it's a DB error
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
          
          console.log(`   ✅ ${filename}: Successfully processed on retry!`);
          
        } catch (dbError) {
          wsErrors.databaseError++;
          console.log(`   ❌ ${filename}: Database error - ${dbError}`);
        }

      } catch (error) {
        wsErrors.unknown++;
        console.log(`   ❌ ${filename}: Unknown error - ${error}`);
      }
    }

    console.log('\n📊 Word Search Error Analysis:');
    console.log(`   File Not Found: ${wsErrors.fileNotFound}`);
    console.log(`   JSON Parse Error: ${wsErrors.jsonParseError}`);
    console.log(`   Missing Words: ${wsErrors.missingWords}`);
    console.log(`   Empty Words: ${wsErrors.emptyWords}`);
    console.log(`   Invalid Data: ${wsErrors.invalidData}`);
    console.log(`   Database Error: ${wsErrors.databaseError}`);
    console.log(`   Unknown: ${wsErrors.unknown}`);

    // Analyze crossword failures (first 20)
    console.log('\n📊 Analyzing Crossword Failures...');
    console.log(`Analyzing ${Math.min(20, failedFilesData.crossword.failed)} failed crossword files`);

    const csErrors = {
      fileNotFound: 0,
      jsonParseError: 0,
      missingClues: 0,
      invalidGrid: 0,
      databaseError: 0,
      unknown: 0
    };

    const csFilesToAnalyze = failedFilesData.crossword.failedFiles.slice(0, 20);
    
    for (const filename of csFilesToAnalyze) {
      const puzzleId = `puz_cs_${filename.replace(/[^0-9]/g, '').padStart(5, '0')}`;
      totalAnalyzed++;

      try {
        const filePath = path.join(CROSSWORD_PUZZLE_DIR, filename);
        let fileContent: string;
        
        try {
          fileContent = await fs.readFile(filePath, 'utf-8');
        } catch (error) {
          csErrors.fileNotFound++;
          console.log(`   ❌ ${filename}: File not found or unreadable`);
          continue;
        }

        let data: CrosswordPuzzleFile;
        try {
          data = JSON.parse(fileContent);
        } catch (error) {
          csErrors.jsonParseError++;
          console.log(`   ❌ ${filename}: JSON parse error`);
          continue;
        }

        // Try database operation
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
          
          console.log(`   ✅ ${filename}: Successfully processed on retry!`);
          
        } catch (dbError) {
          csErrors.databaseError++;
          console.log(`   ❌ ${filename}: Database error - ${dbError}`);
        }

      } catch (error) {
        csErrors.unknown++;
        console.log(`   ❌ ${filename}: Unknown error`);
      }
    }

    console.log('\n📊 Crossword Error Analysis:');
    console.log(`   File Not Found: ${csErrors.fileNotFound}`);
    console.log(`   JSON Parse Error: ${csErrors.jsonParseError}`);
    console.log(`   Missing Clues: ${csErrors.missingClues}`);
    console.log(`   Invalid Grid: ${csErrors.invalidGrid}`);
    console.log(`   Database Error: ${csErrors.databaseError}`);
    console.log(`   Unknown: ${csErrors.unknown}`);

    // Save error analysis
    const errorReport = {
      totalAnalyzed,
      wordSearchErrors: wsErrors,
      crosswordErrors: csErrors,
      recommendations: [
        'Re-run ingestion for files that succeeded on retry',
        'Fix or skip files with JSON parse errors',
        'Handle missing/invalid data with better defaults',
        'Investigate database timeout/connection issues',
        'Check file system permissions for unreadable files'
      ],
      timestamp: new Date().toISOString()
    };

    await fs.writeFile(
      path.join(process.cwd(), 'scripts', 'errorAnalysis.json'),
      JSON.stringify(errorReport, null, 2)
    );

    console.log('\n📋 RECOMMENDATIONS:');
    errorReport.recommendations.forEach((rec, i) => {
      console.log(`   ${i + 1}. ${rec}`);
    });

    console.log('\n💾 Error analysis saved to scripts/errorAnalysis.json');

  } catch (error) {
    console.error('💥 Error analysis failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

analyzeErrorTypes();
