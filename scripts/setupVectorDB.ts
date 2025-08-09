import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();

/**
 * Setup vector database with pgvector extension and create embeddings table
 */
async function setupVectorDatabase() {
  console.log('🚀 Setting up vector database...');
  
  try {
    // Enable pgvector extension
    console.log('📦 Enabling pgvector extension...');
    await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS vector;`;
    
    // Create puzzle_embeddings table if it doesn't exist
    console.log('🗃️ Creating puzzle_embeddings table...');
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS puzzle_embeddings (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        "puzzleId" TEXT NOT NULL,
        "puzzleType" TEXT NOT NULL,
        embedding vector(1536),
        content TEXT NOT NULL,
        metadata JSONB,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE("puzzleId", "puzzleType")
      );
    `;
    
    // Create indexes for better performance
    console.log('📊 Creating indexes...');
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS puzzle_embeddings_type_idx 
      ON puzzle_embeddings("puzzleType");
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS puzzle_embeddings_embedding_idx 
      ON puzzle_embeddings USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100);
    `;
    
    // Test the setup
    console.log('🧪 Testing vector operations...');
    const testVector = Array(1536).fill(0).map(() => Math.random());
    
    await prisma.$executeRaw`
      INSERT INTO puzzle_embeddings (id, "puzzleId", "puzzleType", embedding, content, metadata)
      VALUES (
        'test-vector',
        'test-puzzle',
        'test',
        ${testVector}::vector,
        'test content',
        '{}'::jsonb
      )
      ON CONFLICT ("puzzleId", "puzzleType") DO NOTHING;
    `;
    
    // Test similarity search
    const similarityTest = await prisma.$queryRaw`
      SELECT 
        "puzzleId",
        (embedding <=> ${testVector}::vector) as distance,
        (1 - (embedding <=> ${testVector}::vector)) as similarity
      FROM puzzle_embeddings 
      WHERE "puzzleId" = 'test-puzzle'
      LIMIT 1;
    `;
    
    console.log('🎯 Similarity test result:', similarityTest);
    
    // Clean up test data
    await prisma.$executeRaw`
      DELETE FROM puzzle_embeddings WHERE "puzzleId" = 'test-puzzle';
    `;
    
    console.log('✅ Vector database setup completed successfully!');
    console.log('📋 Summary:');
    console.log('   - pgvector extension enabled');
    console.log('   - puzzle_embeddings table created');
    console.log('   - Indexes created for performance');
    console.log('   - Vector operations tested');
    
  } catch (error) {
    console.error('❌ Error setting up vector database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Check vector database status
 */
async function checkVectorStatus() {
  console.log('🔍 Checking vector database status...');
  
  try {
    // Check if pgvector extension is installed
    const extensions = await prisma.$queryRaw`
      SELECT extname FROM pg_extension WHERE extname = 'vector';
    ` as any[];
    
    console.log('📦 pgvector extension:', extensions.length > 0 ? '✅ Installed' : '❌ Not installed');
    
    // Check if table exists
    const tables = await prisma.$queryRaw`
      SELECT tablename FROM pg_tables WHERE tablename = 'puzzle_embeddings';
    ` as any[];
    
    console.log('🗃️ puzzle_embeddings table:', tables.length > 0 ? '✅ Exists' : '❌ Not found');
    
    if (tables.length > 0) {
      // Check table structure
      const columns = await prisma.$queryRaw`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'puzzle_embeddings'
        ORDER BY ordinal_position;
      `;
      
      console.log('📊 Table structure:', columns);
      
      // Check record count
      const count = await prisma.$queryRaw`
        SELECT COUNT(*) as count FROM puzzle_embeddings;
      ` as any[];
      
      console.log('📈 Embeddings count:', count[0]?.count || 0);
    }
    
  } catch (error) {
    console.error('❌ Error checking vector status:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--check')) {
    await checkVectorStatus();
  } else {
    await setupVectorDatabase();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { setupVectorDatabase, checkVectorStatus };
