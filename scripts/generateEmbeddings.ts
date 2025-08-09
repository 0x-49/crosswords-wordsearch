import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface PuzzleData {
  id: string;
  title: string | null;
  theme: string | null;
  difficulty: string | null;
  words?: string[];
  clues?: any[];
  content?: string;
}

/**
 * Generate embeddings for all puzzles in the database
 */
async function generateAllEmbeddings() {
  console.log('🚀 Starting vector embeddings generation for all puzzles...');
  
  try {
    // Get counts
    const wordSearchCount = await prisma.wordSearch.count();
    const crosswordCount = await prisma.crossword.count();
    
    console.log(`📊 Found ${wordSearchCount} word search puzzles and ${crosswordCount} crossword puzzles`);
    
    // Process word search puzzles
    console.log('\n📝 Processing word search puzzles...');
    await processWordSearchPuzzles();
    
    // Process crossword puzzles
    console.log('\n🔤 Processing crossword puzzles...');
    await processCrosswordPuzzles();
    
    console.log('\n✅ Vector embeddings generation completed successfully!');
    
  } catch (error) {
    console.error('❌ Error generating embeddings:', error);
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Process word search puzzles
 */
async function processWordSearchPuzzles() {
  const batchSize = 50; // Process in smaller batches to avoid API rate limits
  let processed = 0;
  let skip = 0;
  
  while (true) {
    const puzzles = await prisma.wordSearch.findMany({
      take: batchSize,
      skip: skip,
      select: {
        id: true,
        title: true,
        theme: true,
        difficulty: true,
        words: true,
      }
    });
    
    if (puzzles.length === 0) break;
    
    console.log(`Processing word search batch: ${skip + 1}-${skip + puzzles.length}`);
    
    for (const puzzle of puzzles) {
      try {
        const puzzleData: PuzzleData = {
          id: puzzle.id,
          title: puzzle.title || 'Untitled Puzzle',
          theme: puzzle.theme || 'General',
          difficulty: puzzle.difficulty || 'Medium',
          words: puzzle.words
        };
        
        await generatePuzzleEmbedding(puzzleData, 'word_search');
        
        processed++;
        
        if (processed % 10 === 0) {
          console.log(`✅ Processed ${processed} word search puzzles`);
        }
        
        // Small delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Error processing word search ${puzzle.id}:`, error);
      }
    }
    
    skip += batchSize;
  }
  
  console.log(`✅ Completed ${processed} word search puzzles`);
}

/**
 * Process crossword puzzles
 */
async function processCrosswordPuzzles() {
  const batchSize = 50;
  let processed = 0;
  let skip = 0;
  
  while (true) {
    const puzzles = await prisma.crossword.findMany({
      take: batchSize,
      skip: skip,
      select: {
        id: true,
        title: true,
        theme: true,
        difficulty: true,
        clues: true,
      }
    });
    
    if (puzzles.length === 0) break;
    
    console.log(`Processing crossword batch: ${skip + 1}-${skip + puzzles.length}`);
    
    for (const puzzle of puzzles) {
      try {
        const puzzleData: PuzzleData = {
          id: puzzle.id,
          title: puzzle.title || 'Untitled Puzzle',
          theme: puzzle.theme || 'General',
          difficulty: puzzle.difficulty || 'Medium',
          clues: puzzle.clues as any[] || []
        };
        
        await generatePuzzleEmbedding(puzzleData, 'crossword');
        
        processed++;
        
        if (processed % 10 === 0) {
          console.log(`✅ Processed ${processed} crossword puzzles`);
        }
        
        // Small delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Error processing crossword ${puzzle.id}:`, error);
      }
    }
    
    skip += batchSize;
  }
  
  console.log(`✅ Completed ${processed} crossword puzzles`);
}

/**
 * Generate embedding for a single puzzle
 */
async function generatePuzzleEmbedding(puzzle: PuzzleData, type: 'word_search' | 'crossword') {
  try {
    // Create content string for embedding
    let content = `${puzzle.title} ${puzzle.theme} ${puzzle.difficulty}`;
    
    if (type === 'word_search' && puzzle.words) {
      content += ` ${puzzle.words.join(' ')}`;
    } else if (type === 'crossword' && puzzle.clues) {
      const clueTexts = puzzle.clues.map((clue: any) => 
        typeof clue === 'object' ? clue.clue || clue.text || '' : clue
      ).join(' ');
      content += ` ${clueTexts}`;
    }
    
    // Limit content length for API
    content = content.substring(0, 8000);
    
    // Generate embedding
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: content,
      dimensions: 1536
    });
    
    const embedding = response.data[0].embedding;
    
    // Store in database using raw SQL since Prisma doesn't support vector type yet
    await prisma.$executeRaw`
      INSERT INTO puzzle_embeddings (id, "puzzleId", "puzzleType", embedding, content, metadata, "createdAt", "updatedAt")
      VALUES (
        gen_random_uuid()::text,
        ${puzzle.id},
        ${type},
        ${embedding}::vector,
        ${content},
        ${JSON.stringify({
          theme: puzzle.theme,
          difficulty: puzzle.difficulty,
          wordCount: puzzle.words?.length || 0,
          clueCount: puzzle.clues?.length || 0
        })}::jsonb,
        NOW(),
        NOW()
      )
      ON CONFLICT ("puzzleId", "puzzleType") 
      DO UPDATE SET 
        embedding = EXCLUDED.embedding,
        content = EXCLUDED.content,
        metadata = EXCLUDED.metadata,
        "updatedAt" = NOW()
    `;
    
  } catch (error) {
    console.error(`Error generating embedding for ${puzzle.id}:`, error);
    throw error;
  }
}

/**
 * Test vector similarity search
 */
async function testVectorSearch(query: string = "pumpkin autumn harvest") {
  console.log(`\n🔍 Testing vector search for: "${query}"`);
  
  try {
    // Generate query embedding
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
      dimensions: 1536
    });
    
    const queryEmbedding = response.data[0].embedding;
    
    // Search for similar puzzles using raw SQL
    const results = await prisma.$queryRaw`
      SELECT 
        pe."puzzleId",
        pe."puzzleType",
        pe.content,
        pe.metadata,
        (pe.embedding <=> ${queryEmbedding}::vector) as distance,
        (1 - (pe.embedding <=> ${queryEmbedding}::vector)) as similarity
      FROM puzzle_embeddings pe
      ORDER BY pe.embedding <=> ${queryEmbedding}::vector
      LIMIT 10
    `;
    
    console.log('🎯 Top 10 similar puzzles:');
    (results as any[]).forEach((result, index) => {
      console.log(`${index + 1}. ${result.puzzleType} - ${result.puzzleId}`);
      console.log(`   Similarity: ${(result.similarity * 100).toFixed(1)}%`);
      console.log(`   Content: ${result.content.substring(0, 100)}...`);
      console.log(`   Metadata: ${JSON.stringify(result.metadata)}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Error testing vector search:', error);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--test')) {
    await testVectorSearch(args[1] || "pumpkin autumn harvest");
  } else {
    await generateAllEmbeddings();
    
    // Run a test search after generation
    console.log('\n🧪 Running test search...');
    await testVectorSearch();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { generateAllEmbeddings, testVectorSearch };
