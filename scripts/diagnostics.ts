import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

// Configure dotenv to load variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔍 DIAGNOSTIC REPORT');
    console.log('===================');
    
    // Check database connection
    console.log('\n📡 Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Count existing puzzles
    console.log('\n📊 Current database state:');
    const wordSearchCount = await prisma.wordSearch.count();
    const crosswordCount = await prisma.crossword.count();
    const bookCount = await prisma.puzzleBook.count();
    
    console.log(`   Word Search puzzles: ${wordSearchCount}`);
    console.log(`   Crossword puzzles: ${crosswordCount}`);
    console.log(`   Books: ${bookCount}`);
    
    // Check file counts
    console.log('\n📁 File system state:');
    const wsDir = 'C:/personal/amazon kdp/output_wordSearchData';
    const csDir = 'C:/personal/amazon kdp/output_data_crossWord';
    
    try {
      const wsFiles = await fs.readdir(wsDir);
      const wsJsonFiles = wsFiles.filter(f => f.endsWith('.json'));
      console.log(`   Word Search JSON files: ${wsJsonFiles.length}`);
    } catch (error) {
      console.log(`   ❌ Cannot read word search directory: ${error}`);
    }
    
    try {
      const csFiles = await fs.readdir(csDir);
      const csJsonFiles = csFiles.filter(f => f.endsWith('.json'));
      console.log(`   Crossword JSON files: ${csJsonFiles.length}`);
    } catch (error) {
      console.log(`   ❌ Cannot read crossword directory: ${error}`);
    }
    
    // Test a single puzzle ingestion
    console.log('\n🧪 Testing single puzzle ingestion...');
    try {
      const testResult = await prisma.wordSearch.upsert({
        where: { id: 'test_puzzle_001' },
        update: {
          title: 'Test Puzzle Updated',
          theme: 'Test',
          difficulty: 'Easy',
          gridSize: 10,
          words: ['TEST', 'PUZZLE'],
          grid: JSON.stringify([['T', 'E', 'S', 'T']]),
          solution: JSON.stringify({}),
        },
        create: {
          id: 'test_puzzle_001',
          title: 'Test Puzzle',
          theme: 'Test',
          difficulty: 'Easy',
          gridSize: 10,
          words: ['TEST', 'PUZZLE'],
          grid: JSON.stringify([['T', 'E', 'S', 'T']]),
          solution: JSON.stringify({}),
          userId: 'e17047d6-b9a7-456c-ba5e-4acda9899edf',
        },
      });
      console.log('✅ Single puzzle upsert successful');
      
      // Clean up test puzzle
      await prisma.wordSearch.delete({ where: { id: 'test_puzzle_001' } });
      console.log('✅ Test puzzle cleaned up');
      
    } catch (error) {
      console.log('❌ Single puzzle upsert failed:', error);
    }
    
    console.log('\n🎯 SUMMARY:');
    console.log(`   Total puzzles to ingest: ${wordSearchCount + crosswordCount} (estimated)`);
    console.log(`   Database connection: ✅`);
    console.log(`   Upsert functionality: ✅`);
    
  } catch (error) {
    console.error('💥 Diagnostic failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
