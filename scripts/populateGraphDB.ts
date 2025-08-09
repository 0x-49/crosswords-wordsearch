import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();

interface GraphNode {
  id: string;
  nodeType: string;
  entityId: string;
  entityType: string;
  label: string;
  properties: any;
}

interface GraphEdge {
  fromNodeId: string;
  toNodeId: string;
  relationshipType: string;
  weight: number;
  properties: any;
}

/**
 * Populate graph database with puzzle relationships and thematic connections
 */
async function populateGraphDatabase() {
  console.log('🕸️ Populating graph database with puzzle relationships...');
  
  try {
    let totalNodes = 0;
    let totalEdges = 0;
    
    // Step 1: Create theme nodes from all puzzles
    console.log('🎨 Creating theme nodes...');
    const themes = await prisma.$queryRaw`
      SELECT DISTINCT theme, COUNT(*) as puzzle_count
      FROM (
        SELECT theme FROM "WordSearch" WHERE theme IS NOT NULL
        UNION ALL
        SELECT theme FROM "Crossword" WHERE theme IS NOT NULL
      ) combined
      GROUP BY theme
      ORDER BY puzzle_count DESC;
    ` as any[];
    
    const themeNodes: GraphNode[] = [];
    for (const theme of themes) {
      if (!theme.theme) continue;
      
      const nodeId = `theme_${theme.theme.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
      themeNodes.push({
        id: nodeId,
        nodeType: 'theme',
        entityId: theme.theme,
        entityType: 'theme',
        label: theme.theme,
        properties: {
          puzzleCount: parseInt(theme.puzzle_count),
          keywords: extractKeywords(theme.theme)
        }
      });
    }
    
    // Insert theme nodes in batches
    console.log(`📊 Inserting ${themeNodes.length} theme nodes...`);
    for (let i = 0; i < themeNodes.length; i += 50) {
      const batch = themeNodes.slice(i, i + 50);
      for (const node of batch) {
        await prisma.$executeRaw`
          INSERT INTO graph_nodes (id, "nodeType", "entityId", "entityType", label, properties)
          VALUES (
            ${node.id},
            ${node.nodeType},
            ${node.entityId},
            ${node.entityType},
            ${node.label},
            ${JSON.stringify(node.properties)}::jsonb
          )
          ON CONFLICT ("nodeType", "entityId", "entityType") 
          DO UPDATE SET 
            label = EXCLUDED.label,
            properties = EXCLUDED.properties,
            "updatedAt" = CURRENT_TIMESTAMP;
        `;
      }
      totalNodes += batch.length;
      console.log(`✅ Processed ${Math.min(i + 50, themeNodes.length)}/${themeNodes.length} theme nodes`);
    }
    
    // Step 2: Create puzzle nodes (sample for performance)
    console.log('🧩 Creating puzzle nodes (sample)...');
    const samplePuzzles = await prisma.$queryRaw`
      (SELECT id, title, theme, difficulty, 'word_search' as type FROM "WordSearch" LIMIT 1000)
      UNION ALL
      (SELECT id, title, theme, difficulty, 'crossword' as type FROM "Crossword" LIMIT 1000)
      ORDER BY RANDOM();
    ` as any[];
    
    const puzzleNodes: GraphNode[] = [];
    for (const puzzle of samplePuzzles) {
      if (!puzzle.id) continue;
      
      puzzleNodes.push({
        id: `puzzle_${puzzle.id}`,
        nodeType: 'puzzle',
        entityId: puzzle.id,
        entityType: puzzle.type,
        label: puzzle.title || 'Untitled Puzzle',
        properties: {
          theme: puzzle.theme,
          difficulty: puzzle.difficulty,
          type: puzzle.type
        }
      });
    }
    
    // Insert puzzle nodes in batches
    console.log(`🧩 Inserting ${puzzleNodes.length} puzzle nodes...`);
    for (let i = 0; i < puzzleNodes.length; i += 50) {
      const batch = puzzleNodes.slice(i, i + 50);
      for (const node of batch) {
        await prisma.$executeRaw`
          INSERT INTO graph_nodes (id, "nodeType", "entityId", "entityType", label, properties)
          VALUES (
            ${node.id},
            ${node.nodeType},
            ${node.entityId},
            ${node.entityType},
            ${node.label},
            ${JSON.stringify(node.properties)}::jsonb
          )
          ON CONFLICT ("nodeType", "entityId", "entityType") 
          DO UPDATE SET 
            label = EXCLUDED.label,
            properties = EXCLUDED.properties,
            "updatedAt" = CURRENT_TIMESTAMP;
        `;
      }
      totalNodes += batch.length;
      console.log(`✅ Processed ${Math.min(i + 50, puzzleNodes.length)}/${puzzleNodes.length} puzzle nodes`);
    }
    
    // Step 3: Create theme-to-theme relationships
    console.log('🔗 Creating theme relationships...');
    const themeEdges: GraphEdge[] = [];
    
    for (let i = 0; i < themeNodes.length; i++) {
      for (let j = i + 1; j < themeNodes.length; j++) {
        const theme1 = themeNodes[i];
        const theme2 = themeNodes[j];
        
        const similarity = calculateThemeSimilarity(theme1.label, theme2.label);
        if (similarity > 0.3) { // Only create edges for similar themes
          themeEdges.push({
            fromNodeId: theme1.id,
            toNodeId: theme2.id,
            relationshipType: 'similar_to',
            weight: similarity,
            properties: {
              reason: 'theme_similarity',
              keywords: findCommonKeywords(theme1.properties.keywords, theme2.properties.keywords)
            }
          });
        }
      }
    }
    
    // Insert theme edges in batches
    console.log(`🔗 Inserting ${themeEdges.length} theme relationships...`);
    for (let i = 0; i < themeEdges.length; i += 50) {
      const batch = themeEdges.slice(i, i + 50);
      for (const edge of batch) {
        await prisma.$executeRaw`
          INSERT INTO graph_edges ("fromNodeId", "toNodeId", "relationshipType", weight, properties)
          VALUES (
            ${edge.fromNodeId},
            ${edge.toNodeId},
            ${edge.relationshipType},
            ${edge.weight},
            ${JSON.stringify(edge.properties)}::jsonb
          )
          ON CONFLICT ("fromNodeId", "toNodeId", "relationshipType") 
          DO UPDATE SET 
            weight = EXCLUDED.weight,
            properties = EXCLUDED.properties,
            "updatedAt" = CURRENT_TIMESTAMP;
        `;
      }
      totalEdges += batch.length;
      console.log(`✅ Processed ${Math.min(i + 50, themeEdges.length)}/${themeEdges.length} theme relationships`);
    }
    
    // Step 4: Create puzzle-to-theme relationships
    console.log('🎯 Creating puzzle-theme relationships...');
    const puzzleThemeEdges: GraphEdge[] = [];
    
    for (const puzzle of puzzleNodes) {
      const puzzleTheme = puzzle.properties.theme;
      if (!puzzleTheme) continue;
      
      const themeNode = themeNodes.find(t => t.entityId === puzzleTheme);
      if (themeNode) {
        puzzleThemeEdges.push({
          fromNodeId: puzzle.id,
          toNodeId: themeNode.id,
          relationshipType: 'belongs_to',
          weight: 1.0,
          properties: {
            reason: 'direct_theme_assignment'
          }
        });
      }
    }
    
    // Insert puzzle-theme edges in batches
    console.log(`🎯 Inserting ${puzzleThemeEdges.length} puzzle-theme relationships...`);
    for (let i = 0; i < puzzleThemeEdges.length; i += 50) {
      const batch = puzzleThemeEdges.slice(i, i + 50);
      for (const edge of batch) {
        await prisma.$executeRaw`
          INSERT INTO graph_edges ("fromNodeId", "toNodeId", "relationshipType", weight, properties)
          VALUES (
            ${edge.fromNodeId},
            ${edge.toNodeId},
            ${edge.relationshipType},
            ${edge.weight},
            ${JSON.stringify(edge.properties)}::jsonb
          )
          ON CONFLICT ("fromNodeId", "toNodeId", "relationshipType") 
          DO UPDATE SET 
            weight = EXCLUDED.weight,
            properties = EXCLUDED.properties,
            "updatedAt" = CURRENT_TIMESTAMP;
        `;
      }
      totalEdges += batch.length;
      console.log(`✅ Processed ${Math.min(i + 50, puzzleThemeEdges.length)}/${puzzleThemeEdges.length} puzzle-theme relationships`);
    }
    
    console.log('✅ Graph database population completed successfully!');
    console.log('📋 Summary:');
    console.log(`   - ${totalNodes} nodes created`);
    console.log(`   - ${totalEdges} relationships created`);
    console.log('   - Theme-to-theme similarity mapping');
    console.log('   - Puzzle-to-theme direct relationships');
    
  } catch (error) {
    console.error('❌ Error populating graph database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Extract keywords from theme name for similarity matching
 */
function extractKeywords(theme: string): string[] {
  if (!theme) return [];
  
  return theme
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(0, 5); // Limit to 5 keywords
}

/**
 * Calculate similarity between two themes based on keywords
 */
function calculateThemeSimilarity(theme1: string, theme2: string): number {
  const keywords1 = extractKeywords(theme1);
  const keywords2 = extractKeywords(theme2);
  
  if (keywords1.length === 0 || keywords2.length === 0) return 0;
  
  const commonKeywords = keywords1.filter(k => keywords2.includes(k));
  const totalKeywords = new Set([...keywords1, ...keywords2]).size;
  
  return commonKeywords.length / totalKeywords;
}

/**
 * Find common keywords between two keyword arrays
 */
function findCommonKeywords(keywords1: string[], keywords2: string[]): string[] {
  if (!keywords1 || !keywords2) return [];
  return keywords1.filter(k => keywords2.includes(k));
}

/**
 * Test graph traversal with sample queries
 */
async function testGraphTraversal() {
  console.log('🧪 Testing graph traversal...');
  
  try {
    // Find themes similar to "autumn"
    const autumnSimilar = await prisma.$queryRaw`
      SELECT 
        n2.label as similar_theme,
        e.weight,
        e.properties->>'keywords' as common_keywords
      FROM graph_nodes n1
      JOIN graph_edges e ON n1.id = e."fromNodeId"
      JOIN graph_nodes n2 ON e."toNodeId" = n2.id
      WHERE n1."entityId" ILIKE '%autumn%' 
        AND e."relationshipType" = 'similar_to'
      ORDER BY e.weight DESC
      LIMIT 5;
    ` as any[];
    
    console.log('🍂 Themes similar to autumn:', autumnSimilar);
    
    // Find puzzles in a specific theme
    const themePuzzles = await prisma.$queryRaw`
      SELECT 
        n1.label as puzzle_title,
        n1.properties->>'difficulty' as difficulty,
        n1.properties->>'type' as puzzle_type
      FROM graph_nodes n1
      JOIN graph_edges e ON n1.id = e."fromNodeId"
      JOIN graph_nodes n2 ON e."toNodeId" = n2.id
      WHERE n2."entityId" ILIKE '%animal%'
        AND e."relationshipType" = 'belongs_to'
      LIMIT 5;
    ` as any[];
    
    console.log('🐾 Puzzles in animal themes:', themePuzzles);
    
  } catch (error) {
    console.error('❌ Error testing graph traversal:', error);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--test')) {
    await testGraphTraversal();
  } else {
    await populateGraphDatabase();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { populateGraphDatabase, testGraphTraversal };
