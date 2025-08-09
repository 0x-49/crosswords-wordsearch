import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const prisma = new PrismaClient();

const WORDSEARCH_PUZZLE_DIR = 'C:/personal/amazon kdp/output_wordSearchData';
const CROSSWORD_PUZZLE_DIR = 'C:/personal/amazon kdp/output_data_crossWord';

async function identifyFailedFiles() {
  try {
    console.log('🔍 IDENTIFYING FAILED PUZZLE FILES');
    console.log('==================================');

    // Step 1: Get all word search files from filesystem
    console.log('\n📁 Analyzing Word Search Files...');
    const wsFiles = await fs.readdir(WORDSEARCH_PUZZLE_DIR);
    const wsJsonFiles = wsFiles.filter(f => f.endsWith('.json'));
    console.log(`Total Word Search JSON files: ${wsJsonFiles.length}`);

    // Step 2: Get all successfully ingested word search puzzles from DB
    const ingestedWS = await prisma.wordSearch.findMany({
      select: { id: true }
    });
    console.log(`Successfully ingested Word Search puzzles: ${ingestedWS.length}`);

    // Step 3: Create set of ingested IDs for fast lookup
    const ingestedWSIds = new Set(ingestedWS.map(p => p.id));

    // Step 4: Find failed word search files
    const failedWSFiles: string[] = [];
    for (const filename of wsJsonFiles) {
      const puzzleId = `puz_ws_${filename.replace(/[^0-9]/g, '').padStart(5, '0')}`;
      if (!ingestedWSIds.has(puzzleId)) {
        failedWSFiles.push(filename);
      }
    }

    console.log(`\n❌ Failed Word Search Files: ${failedWSFiles.length}`);
    console.log('First 20 failed files:');
    failedWSFiles.slice(0, 20).forEach((file, i) => {
      const puzzleId = `puz_ws_${file.replace(/[^0-9]/g, '').padStart(5, '0')}`;
      console.log(`   ${i + 1}. ${file} -> ${puzzleId}`);
    });

    // Step 5: Analyze crossword files
    console.log('\n📁 Analyzing Crossword Files...');
    const csFiles = await fs.readdir(CROSSWORD_PUZZLE_DIR);
    const csJsonFiles = csFiles.filter(f => f.endsWith('.json'));
    console.log(`Total Crossword JSON files: ${csJsonFiles.length}`);

    const ingestedCS = await prisma.crossword.findMany({
      select: { id: true }
    });
    console.log(`Successfully ingested Crossword puzzles: ${ingestedCS.length}`);

    const ingestedCSIds = new Set(ingestedCS.map(p => p.id));
    const failedCSFiles: string[] = [];
    for (const filename of csJsonFiles) {
      const puzzleId = `puz_cs_${filename.replace(/[^0-9]/g, '').padStart(5, '0')}`;
      if (!ingestedCSIds.has(puzzleId)) {
        failedCSFiles.push(filename);
      }
    }

    console.log(`\n❌ Failed Crossword Files: ${failedCSFiles.length}`);
    console.log('First 20 failed files:');
    failedCSFiles.slice(0, 20).forEach((file, i) => {
      const puzzleId = `puz_cs_${file.replace(/[^0-9]/g, '').padStart(5, '0')}`;
      console.log(`   ${i + 1}. ${file} -> ${puzzleId}`);
    });

    // Step 6: Save failed files lists for further analysis
    const failedFilesData = {
      wordSearch: {
        total: wsJsonFiles.length,
        ingested: ingestedWS.length,
        failed: failedWSFiles.length,
        failedFiles: failedWSFiles
      },
      crossword: {
        total: csJsonFiles.length,
        ingested: ingestedCS.length,
        failed: failedCSFiles.length,
        failedFiles: failedCSFiles
      },
      timestamp: new Date().toISOString()
    };

    await fs.writeFile(
      path.join(process.cwd(), 'scripts', 'failedFiles.json'),
      JSON.stringify(failedFilesData, null, 2)
    );

    console.log('\n📊 SUMMARY:');
    console.log(`Word Search: ${ingestedWS.length}/${wsJsonFiles.length} ingested (${failedWSFiles.length} failed)`);
    console.log(`Crossword: ${ingestedCS.length}/${csJsonFiles.length} ingested (${failedCSFiles.length} failed)`);
    console.log(`Total Failed: ${failedWSFiles.length + failedCSFiles.length}`);
    console.log('\n💾 Failed files list saved to scripts/failedFiles.json');

  } catch (error) {
    console.error('💥 Analysis failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

identifyFailedFiles();
