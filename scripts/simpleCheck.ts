import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const prisma = new PrismaClient();

async function simpleCheck() {
  try {
    // Count what's in the database
    const wsCount = await prisma.wordSearch.count();
    const csCount = await prisma.crossword.count();
    
    // Count what's in the file system
    const wsFiles = await fs.readdir('C:/personal/amazon kdp/output_wordSearchData');
    const wsJsonCount = wsFiles.filter(f => f.endsWith('.json')).length;
    
    const csFiles = await fs.readdir('C:/personal/amazon kdp/output_data_crossWord');
    const csJsonCount = csFiles.filter(f => f.endsWith('.json')).length;
    
    console.log('SIMPLE STATUS CHECK');
    console.log('==================');
    console.log(`Word Search - DB: ${wsCount}, Files: ${wsJsonCount}, Missing: ${wsJsonCount - wsCount}`);
    console.log(`Crossword - DB: ${csCount}, Files: ${csJsonCount}, Missing: ${csJsonCount - csCount}`);
    console.log(`Total - DB: ${wsCount + csCount}, Files: ${wsJsonCount + csJsonCount}, Missing: ${(wsJsonCount + csJsonCount) - (wsCount + csCount)}`);
    
    const totalFiles = wsJsonCount + csJsonCount;
    const totalInDB = wsCount + csCount;
    const successRate = Math.round((totalInDB / totalFiles) * 100);
    
    console.log(`Success Rate: ${successRate}%`);
    
    if (totalInDB < totalFiles) {
      console.log(`\nERRORS STILL EXIST: ${totalFiles - totalInDB} files failed to ingest`);
    } else {
      console.log('\nAll files successfully ingested!');
    }
    
  } catch (error) {
    console.error('Check failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

simpleCheck();
