import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();

/**
 * Setup graph database tables for puzzle relationships and thematic exploration
 * Uses PostgreSQL with custom tables to create a graph-like structure
 */
async function setupGraphDatabase() {
  console.log('🕸️ Setting up graph database for puzzle relationships...');
  
  try {
    // Create nodes table for entities (puzzles, themes, topics, words)
    console.log('📊 Creating graph_nodes table...');
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS graph_nodes (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        "nodeType" TEXT NOT NULL, -- 'puzzle', 'theme', 'topic', 'word', 'book', 'category'
        "entityId" TEXT NOT NULL, -- Reference to actual entity (puzzle ID, theme name, etc.)
        "entityType" TEXT NOT NULL, -- 'word_search', 'crossword', 'mixed', 'theme', 'topic'
        label TEXT NOT NULL, -- Display name
        properties JSONB DEFAULT '{}', -- Additional metadata
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE("nodeType", "entityId", "entityType")
      );
    `;
    
    // Create edges table for relationships
    console.log('🔗 Creating graph_edges table...');
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS graph_edges (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        "fromNodeId" TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
        "toNodeId" TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
        "relationshipType" TEXT NOT NULL, -- 'contains', 'similar_to', 'part_of', 'related_to', 'shares_theme'
        weight DECIMAL(5,4) DEFAULT 1.0, -- Relationship strength (0.0 to 1.0)
        properties JSONB DEFAULT '{}', -- Additional relationship metadata
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE("fromNodeId", "toNodeId", "relationshipType")
      );
    `;
    
    // Create indexes for performance
    console.log('📈 Creating graph indexes...');
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS graph_nodes_type_idx ON graph_nodes("nodeType");
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS graph_nodes_entity_idx ON graph_nodes("entityId", "entityType");
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS graph_edges_from_idx ON graph_edges("fromNodeId");
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS graph_edges_to_idx ON graph_edges("toNodeId");
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS graph_edges_type_idx ON graph_edges("relationshipType");
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS graph_edges_weight_idx ON graph_edges(weight DESC);
    `;
    
    // Test the setup
    console.log('🧪 Testing graph operations...');
    
    // Create test nodes
    const testNode1 = await prisma.$executeRaw`
      INSERT INTO graph_nodes (id, "nodeType", "entityId", "entityType", label, properties)
      VALUES (
        'test-node-1',
        'theme',
        'autumn',
        'theme',
        'Autumn Theme',
        '{"season": "fall", "keywords": ["pumpkin", "harvest", "leaves"]}'::jsonb
      )
      ON CONFLICT ("nodeType", "entityId", "entityType") DO NOTHING;
    `;
    
    const testNode2 = await prisma.$executeRaw`
      INSERT INTO graph_nodes (id, "nodeType", "entityId", "entityType", label, properties)
      VALUES (
        'test-node-2',
        'theme',
        'halloween',
        'theme',
        'Halloween Theme',
        '{"season": "fall", "keywords": ["pumpkin", "scary", "costume"]}'::jsonb
      )
      ON CONFLICT ("nodeType", "entityId", "entityType") DO NOTHING;
    `;
    
    // Create test relationship
    await prisma.$executeRaw`
      INSERT INTO graph_edges (id, "fromNodeId", "toNodeId", "relationshipType", weight, properties)
      VALUES (
        'test-edge-1',
        'test-node-1',
        'test-node-2',
        'related_to',
        0.8,
        '{"reason": "shared_keywords", "keywords": ["pumpkin"]}'::jsonb
      )
      ON CONFLICT ("fromNodeId", "toNodeId", "relationshipType") DO NOTHING;
    `;
    
    // Test graph traversal
    const traversalTest = await prisma.$queryRaw`
      SELECT 
        n1.label as from_label,
        e."relationshipType",
        e.weight,
        n2.label as to_label,
        e.properties as edge_properties
      FROM graph_edges e
      JOIN graph_nodes n1 ON e."fromNodeId" = n1.id
      JOIN graph_nodes n2 ON e."toNodeId" = n2.id
      WHERE n1.id = 'test-node-1'
      ORDER BY e.weight DESC;
    ` as any[];
    
    console.log('🎯 Graph traversal test result:', traversalTest);
    
    // Clean up test data
    await prisma.$executeRaw`DELETE FROM graph_edges WHERE id = 'test-edge-1';`;
    await prisma.$executeRaw`DELETE FROM graph_nodes WHERE id IN ('test-node-1', 'test-node-2');`;
    
    console.log('✅ Graph database setup completed successfully!');
    console.log('📋 Summary:');
    console.log('   - graph_nodes table created for entities');
    console.log('   - graph_edges table created for relationships');
    console.log('   - Performance indexes created');
    console.log('   - Graph traversal operations tested');
    
  } catch (error) {
    console.error('❌ Error setting up graph database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Check graph database status
 */
async function checkGraphStatus() {
  console.log('🔍 Checking graph database status...');
  
  try {
    // Check if tables exist
    const nodeTable = await prisma.$queryRaw`
      SELECT tablename FROM pg_tables WHERE tablename = 'graph_nodes';
    ` as any[];
    
    const edgeTable = await prisma.$queryRaw`
      SELECT tablename FROM pg_tables WHERE tablename = 'graph_edges';
    ` as any[];
    
    console.log('📊 graph_nodes table:', nodeTable.length > 0 ? '✅ Exists' : '❌ Not found');
    console.log('🔗 graph_edges table:', edgeTable.length > 0 ? '✅ Exists' : '❌ Not found');
    
    if (nodeTable.length > 0 && edgeTable.length > 0) {
      // Check record counts
      const nodeCount = await prisma.$queryRaw`
        SELECT COUNT(*) as count FROM graph_nodes;
      ` as any[];
      
      const edgeCount = await prisma.$queryRaw`
        SELECT COUNT(*) as count FROM graph_edges;
      ` as any[];
      
      console.log('📈 Nodes count:', nodeCount[0]?.count || 0);
      console.log('🔗 Edges count:', edgeCount[0]?.count || 0);
      
      // Show node types distribution
      const nodeTypes = await prisma.$queryRaw`
        SELECT "nodeType", COUNT(*) as count 
        FROM graph_nodes 
        GROUP BY "nodeType" 
        ORDER BY count DESC;
      ` as any[];
      
      console.log('📊 Node types:', nodeTypes);
      
      // Show relationship types distribution
      const relationshipTypes = await prisma.$queryRaw`
        SELECT "relationshipType", COUNT(*) as count 
        FROM graph_edges 
        GROUP BY "relationshipType" 
        ORDER BY count DESC;
      ` as any[];
      
      console.log('🔗 Relationship types:', relationshipTypes);
    }
    
  } catch (error) {
    console.error('❌ Error checking graph status:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--check')) {
    await checkGraphStatus();
  } else {
    await setupGraphDatabase();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { setupGraphDatabase, checkGraphStatus };
