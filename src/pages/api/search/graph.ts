import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface GraphSearchResult {
  node: {
    id: string;
    nodeType: string;
    entityId: string;
    entityType: string;
    label: string;
    properties: any;
  };
  relationships: Array<{
    relationshipType: string;
    weight: number;
    relatedNode: {
      id: string;
      label: string;
      nodeType: string;
      properties: any;
    };
    properties: any;
  }>;
  puzzles?: Array<{
    id: string;
    title: string;
    theme: string;
    difficulty: string;
    type: string;
  }>;
}

interface GraphSearchResponse {
  results: GraphSearchResult[];
  suggestions: string[];
  metadata: {
    totalResults: number;
    searchTime: number;
    queryType: string;
  };
}

/**
 * Graph-based search API for thematic exploration and puzzle relationships
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GraphSearchResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const startTime = Date.now();

  try {
    const {
      query,
      searchType = 'theme', // 'theme', 'puzzle', 'explore'
      maxDepth = 2,
      limit = 10
    } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    let results: GraphSearchResult[] = [];

    switch (searchType) {
      case 'theme':
        results = await searchByTheme(query, maxDepth, limit);
        break;
      case 'puzzle':
        results = await searchByPuzzle(query, maxDepth, limit);
        break;
      case 'explore':
        results = await exploreRelationships(query, maxDepth, limit);
        break;
      default:
        results = await searchByTheme(query, maxDepth, limit);
    }

    const suggestions = generateGraphSuggestions(results, query);
    const searchTime = Date.now() - startTime;

    res.status(200).json({
      results,
      suggestions,
      metadata: {
        totalResults: results.length,
        searchTime,
        queryType: searchType
      }
    });

  } catch (error) {
    console.error('Graph search error:', error);
    res.status(500).json({ error: 'Graph search failed' });
  }
}

/**
 * Search for themes and their related themes/puzzles
 */
async function searchByTheme(query: string, maxDepth: number, limit: number): Promise<GraphSearchResult[]> {
  // Find matching theme nodes
  const themeNodes = await prisma.$queryRaw`
    SELECT id, "nodeType", "entityId", "entityType", label, properties
    FROM graph_nodes
    WHERE "nodeType" = 'theme' 
      AND (label ILIKE ${'%' + query + '%'} OR "entityId" ILIKE ${'%' + query + '%'})
    ORDER BY 
      CASE WHEN label ILIKE ${query + '%'} THEN 1 ELSE 2 END,
      (properties->>'puzzleCount')::int DESC
    LIMIT ${limit};
  ` as any[];

  const results: GraphSearchResult[] = [];

  for (const node of themeNodes) {
    // Get related themes
    const relationships = await prisma.$queryRaw`
      SELECT 
        e."relationshipType",
        e.weight,
        e.properties as edge_properties,
        n2.id as related_id,
        n2.label as related_label,
        n2."nodeType" as related_type,
        n2.properties as related_properties
      FROM graph_edges e
      JOIN graph_nodes n2 ON e."toNodeId" = n2.id
      WHERE e."fromNodeId" = ${node.id}
        AND e."relationshipType" IN ('similar_to', 'related_to')
      ORDER BY e.weight DESC
      LIMIT 5;
    ` as any[];

    // Get puzzles in this theme
    const puzzles = await prisma.$queryRaw`
      SELECT 
        n1."entityId" as id,
        n1.label as title,
        n1.properties->>'theme' as theme,
        n1.properties->>'difficulty' as difficulty,
        n1.properties->>'type' as type
      FROM graph_nodes n1
      JOIN graph_edges e ON n1.id = e."fromNodeId"
      WHERE e."toNodeId" = ${node.id}
        AND e."relationshipType" = 'belongs_to'
        AND n1."nodeType" = 'puzzle'
      LIMIT 10;
    ` as any[];

    results.push({
      node: {
        id: node.id,
        nodeType: node.nodeType,
        entityId: node.entityId,
        entityType: node.entityType,
        label: node.label,
        properties: node.properties
      },
      relationships: relationships.map((rel: any) => ({
        relationshipType: rel.relationshipType,
        weight: parseFloat(rel.weight),
        relatedNode: {
          id: rel.related_id,
          label: rel.related_label,
          nodeType: rel.related_type,
          properties: rel.related_properties
        },
        properties: rel.edge_properties
      })),
      puzzles: puzzles.map((puzzle: any) => ({
        id: puzzle.id,
        title: puzzle.title || 'Untitled Puzzle',
        theme: puzzle.theme || 'General',
        difficulty: puzzle.difficulty || 'Medium',
        type: puzzle.type || 'unknown'
      }))
    });
  }

  return results;
}

/**
 * Search for specific puzzles and their thematic connections
 */
async function searchByPuzzle(query: string, maxDepth: number, limit: number): Promise<GraphSearchResult[]> {
  // Find matching puzzle nodes
  const puzzleNodes = await prisma.$queryRaw`
    SELECT id, "nodeType", "entityId", "entityType", label, properties
    FROM graph_nodes
    WHERE "nodeType" = 'puzzle' 
      AND (label ILIKE ${'%' + query + '%'} OR "entityId" ILIKE ${'%' + query + '%'})
    ORDER BY 
      CASE WHEN label ILIKE ${query + '%'} THEN 1 ELSE 2 END
    LIMIT ${limit};
  ` as any[];

  const results: GraphSearchResult[] = [];

  for (const node of puzzleNodes) {
    // Get theme relationships
    const relationships = await prisma.$queryRaw`
      SELECT 
        e."relationshipType",
        e.weight,
        e.properties as edge_properties,
        n2.id as related_id,
        n2.label as related_label,
        n2."nodeType" as related_type,
        n2.properties as related_properties
      FROM graph_edges e
      JOIN graph_nodes n2 ON e."toNodeId" = n2.id
      WHERE e."fromNodeId" = ${node.id}
      ORDER BY e.weight DESC
      LIMIT 5;
    ` as any[];

    results.push({
      node: {
        id: node.id,
        nodeType: node.nodeType,
        entityId: node.entityId,
        entityType: node.entityType,
        label: node.label,
        properties: node.properties
      },
      relationships: relationships.map((rel: any) => ({
        relationshipType: rel.relationshipType,
        weight: parseFloat(rel.weight),
        relatedNode: {
          id: rel.related_id,
          label: rel.related_label,
          nodeType: rel.related_type,
          properties: rel.related_properties
        },
        properties: rel.edge_properties
      }))
    });
  }

  return results;
}

/**
 * Explore relationships starting from a query and traversing the graph
 */
async function exploreRelationships(query: string, maxDepth: number, limit: number): Promise<GraphSearchResult[]> {
  // Start with any matching nodes
  const startNodes = await prisma.$queryRaw`
    SELECT id, "nodeType", "entityId", "entityType", label, properties
    FROM graph_nodes
    WHERE label ILIKE ${'%' + query + '%'} OR "entityId" ILIKE ${'%' + query + '%'}
    ORDER BY 
      CASE WHEN label ILIKE ${query + '%'} THEN 1 ELSE 2 END,
      CASE WHEN "nodeType" = 'theme' THEN 1 ELSE 2 END
    LIMIT ${Math.min(limit, 5)};
  ` as any[];

  const results: GraphSearchResult[] = [];
  const visitedNodes = new Set<string>();

  for (const startNode of startNodes) {
    if (visitedNodes.has(startNode.id)) continue;
    
    const explorationResult = await exploreFromNode(startNode, maxDepth, visitedNodes);
    results.push(explorationResult);
  }

  return results.slice(0, limit);
}

/**
 * Explore relationships from a specific node
 */
async function exploreFromNode(startNode: any, maxDepth: number, visitedNodes: Set<string>): Promise<GraphSearchResult> {
  visitedNodes.add(startNode.id);

  // Get immediate relationships
  const relationships = await prisma.$queryRaw`
    SELECT 
      e."relationshipType",
      e.weight,
      e.properties as edge_properties,
      n2.id as related_id,
      n2.label as related_label,
      n2."nodeType" as related_type,
      n2.properties as related_properties
    FROM graph_edges e
    JOIN graph_nodes n2 ON e."toNodeId" = n2.id
    WHERE e."fromNodeId" = ${startNode.id}
      AND NOT EXISTS (SELECT 1 FROM unnest(${Array.from(visitedNodes)}) AS visited WHERE visited = n2.id)
    ORDER BY e.weight DESC
    LIMIT 8;
  ` as any[];

  return {
    node: {
      id: startNode.id,
      nodeType: startNode.nodeType,
      entityId: startNode.entityId,
      entityType: startNode.entityType,
      label: startNode.label,
      properties: startNode.properties
    },
    relationships: relationships.map((rel: any) => ({
      relationshipType: rel.relationshipType,
      weight: parseFloat(rel.weight),
      relatedNode: {
        id: rel.related_id,
        label: rel.related_label,
        nodeType: rel.related_type,
        properties: rel.related_properties
      },
      properties: rel.edge_properties
    }))
  };
}

/**
 * Generate search suggestions based on graph results
 */
function generateGraphSuggestions(results: GraphSearchResult[], originalQuery: string): string[] {
  const suggestions = new Set<string>();

  // Add related themes from relationships
  results.forEach(result => {
    result.relationships.forEach(rel => {
      if (rel.relatedNode.nodeType === 'theme' && rel.weight > 0.5) {
        suggestions.add(rel.relatedNode.label);
      }
    });
  });

  // Add common keywords from properties
  results.forEach(result => {
    const keywords = result.node.properties?.keywords;
    if (Array.isArray(keywords)) {
      keywords.forEach((keyword: string) => {
        if (keyword.toLowerCase() !== originalQuery.toLowerCase()) {
          suggestions.add(keyword);
        }
      });
    }
  });

  return Array.from(suggestions).slice(0, 8);
}
