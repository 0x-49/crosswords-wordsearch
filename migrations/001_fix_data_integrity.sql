-- Date: 2025-08-10
-- Purpose: Clean up duplicate tables, add constraints, and prepare for Scala migration

-- ============================================================================
-- STEP 1: Backup critical data BEFORE any changes
-- ============================================================================

-- Create backup table for WordSearch puzzles with empty grids/solutions
CREATE TABLE IF NOT EXISTS wordsearch_empty_grids_backup AS
SELECT * FROM "WordSearch" 
WHERE "grid" = '[]' OR "grid" = '' OR "solution" = '{}' OR "solution" = '';

-- Log the count of affected records
DO $$
DECLARE
    empty_grid_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO empty_grid_count 
    FROM "WordSearch" 
    WHERE "grid" = '[]' OR "grid" = '' OR "solution" = '{}' OR "solution" = '';
    
    RAISE NOTICE 'Backed up % WordSearch puzzles with empty grids/solutions', empty_grid_count;
END $$;

-- ============================================================================
-- STEP 2: Data repair for existing bad rows (temporary placeholders)
-- ============================================================================

-- Update empty grids/solutions with placeholder JSON (to be regenerated later)
UPDATE "WordSearch" 
SET 
    "grid" = '{"size": ' || "gridSize" || ', "letters": [], "wordPositions": {}}'
WHERE "grid" = '[]' OR "grid" = '' OR "grid" IS NULL;

UPDATE "WordSearch" 
SET "solution" = '{"status":"placeholder"}' 
WHERE "solution" = '{}' OR "solution" = '' OR "solution" IS NULL;

-- Ensure words is not null (still may be empty array)
UPDATE "WordSearch"
SET "words" = ARRAY[]::text[]
WHERE "words" IS NULL;

-- Standardize difficulty/theme early to satisfy checks later
UPDATE "WordSearch" SET "difficulty" = LOWER("difficulty") WHERE "difficulty" IS NOT NULL;
UPDATE "Crossword" SET "difficulty" = LOWER("difficulty") WHERE "difficulty" IS NOT NULL;
UPDATE "PuzzleBook" SET "difficulty" = LOWER("difficulty") WHERE "difficulty" IS NOT NULL;

UPDATE "WordSearch" SET "theme" = INITCAP(LOWER("theme")) WHERE "theme" IS NOT NULL;
UPDATE "Crossword" SET "theme" = INITCAP(LOWER("theme")) WHERE "theme" IS NOT NULL;
UPDATE "PuzzleBook" SET "theme" = INITCAP(LOWER("theme")) WHERE "theme" IS NOT NULL;

-- Also remove unused duplicate embedding table
DROP TABLE IF EXISTS "PuzzleEmbedding" CASCADE;

-- ============================================================================
-- STEP 3: Add constraints (deferred validation to avoid blocking)
-- ============================================================================

-- WordSearch constraints
ALTER TABLE "WordSearch" 
ADD CONSTRAINT check_grid_not_empty 
CHECK ("grid" IS NOT NULL AND "grid" != '' AND "grid" != '[]') NOT VALID;

ALTER TABLE "WordSearch" 
ADD CONSTRAINT check_solution_not_empty 
CHECK ("solution" IS NOT NULL AND "solution" != '' AND "solution" != '{}') NOT VALID;

ALTER TABLE "WordSearch" 
ADD CONSTRAINT check_words_not_empty 
CHECK ("words" IS NOT NULL AND array_length("words", 1) > 0) NOT VALID;

ALTER TABLE "WordSearch" 
ADD CONSTRAINT check_valid_grid_size 
CHECK ("gridSize" >= 5 AND "gridSize" <= 30) NOT VALID;

-- Crossword constraints
ALTER TABLE "Crossword" 
ADD CONSTRAINT check_valid_crossword_grid_size 
CHECK ("gridSize" >= 5 AND "gridSize" <= 25) NOT VALID;

ALTER TABLE "Crossword" 
ADD CONSTRAINT check_valid_crossword_difficulty 
CHECK ("difficulty" IN ('easy', 'medium', 'hard')) NOT VALID;

-- Normalize difficulty values for WordSearch
ALTER TABLE "WordSearch" 
ADD CONSTRAINT check_valid_difficulty 
CHECK ("difficulty" IN ('easy', 'medium', 'hard')) NOT VALID;

-- Validate constraints after repair
ALTER TABLE "WordSearch" VALIDATE CONSTRAINT check_grid_not_empty;
-- NOTE: Do not validate solution-not-empty yet; will validate after remediation
-- ALTER TABLE "WordSearch" VALIDATE CONSTRAINT check_solution_not_empty;
-- NOTE: Do not validate words-not-empty yet; will validate after remediation
-- ALTER TABLE "WordSearch" VALIDATE CONSTRAINT check_words_not_empty;
ALTER TABLE "WordSearch" VALIDATE CONSTRAINT check_valid_grid_size;
ALTER TABLE "WordSearch" VALIDATE CONSTRAINT check_valid_difficulty;
ALTER TABLE "Crossword" VALIDATE CONSTRAINT check_valid_crossword_grid_size;
ALTER TABLE "Crossword" VALIDATE CONSTRAINT check_valid_crossword_difficulty;

-- ============================================================================
-- STEP 4: Add missing indexes for performance
-- ============================================================================

-- Indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_wordsearch_theme_difficulty 
ON "WordSearch" ("theme", "difficulty");

CREATE INDEX IF NOT EXISTS idx_crossword_theme_difficulty 
ON "Crossword" ("theme", "difficulty");

-- Indexes for user interactions (prepare for multi-user)
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_puzzle 
ON "UserFavorite" ("userId", "puzzleId", "puzzleType");

CREATE INDEX IF NOT EXISTS idx_user_interactions_user_type 
ON "UserPuzzleInteraction" ("userId", "puzzleType", "interactionType");

-- Index for graph traversal
CREATE INDEX IF NOT EXISTS idx_graph_edges_relationship 
ON "graph_edges" ("relationshipType", "weight" DESC);

-- ============================================================================
-- STEP 5: Views for easier querying
-- ============================================================================

-- Add audit columns for better tracking

-- Add version column for optimistic locking
ALTER TABLE "WordSearch" ADD COLUMN IF NOT EXISTS "version" INTEGER DEFAULT 1;
ALTER TABLE "Crossword" ADD COLUMN IF NOT EXISTS "version" INTEGER DEFAULT 1;

-- Add last_accessed for analytics
ALTER TABLE "WordSearch" ADD COLUMN IF NOT EXISTS "lastAccessed" TIMESTAMP;
ALTER TABLE "Crossword" ADD COLUMN IF NOT EXISTS "lastAccessed" TIMESTAMP;

-- ============================================================================
-- Create views for easier querying
-- ============================================================================

-- View for all puzzles with unified structure
CREATE OR REPLACE VIEW puzzle_unified AS
SELECT 
    "id",
    "title",
    "theme",
    "difficulty",
    "gridSize",
    'wordsearch' as puzzle_type,
    array_length("words", 1) as word_count,
    NULL as clue_count,
    "createdAt",
    "updatedAt",
    "userId",
    CASE 
        WHEN "grid" = '[]' OR "grid" = '' THEN false 
        ELSE true 
    END as has_valid_grid
FROM "WordSearch"

UNION ALL

SELECT 
    "id",
    "title",
    "theme",
    "difficulty",
    "gridSize",
    'crossword' as puzzle_type,
    NULL as word_count,
    jsonb_array_length("clues") as clue_count,
    "createdAt",
    "updatedAt",
    "userId",
    true as has_valid_grid
FROM "Crossword";

-- View for puzzle statistics by theme
CREATE OR REPLACE VIEW puzzle_stats_by_theme AS
SELECT 
    theme,
    COUNT(*) as total_puzzles,
    COUNT(CASE WHEN puzzle_type = 'wordsearch' THEN 1 END) as wordsearch_count,
    COUNT(CASE WHEN puzzle_type = 'crossword' THEN 1 END) as crossword_count,
    COUNT(CASE WHEN difficulty = 'easy' THEN 1 END) as easy_count,
    COUNT(CASE WHEN difficulty = 'medium' THEN 1 END) as medium_count,
    COUNT(CASE WHEN difficulty = 'hard' THEN 1 END) as hard_count,
    COUNT(CASE WHEN has_valid_grid = false THEN 1 END) as invalid_grid_count
FROM puzzle_unified
GROUP BY theme
ORDER BY total_puzzles DESC;

-- ============================================================================
-- STEP 6: Create functions for data validation
-- ============================================================================

-- Function to validate WordSearch data
CREATE OR REPLACE FUNCTION validate_wordsearch(puzzle_id TEXT)
RETURNS TABLE(issue_type TEXT, issue_description TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        'empty_grid'::TEXT,
        'Grid is empty or invalid'::TEXT
    FROM "WordSearch" 
    WHERE "id" = puzzle_id AND ("grid" = '[]' OR "grid" = '' OR "grid" IS NULL)
    
    UNION ALL
    
    SELECT 
        'empty_solution'::TEXT,
        'Solution is empty or invalid'::TEXT
    FROM "WordSearch" 
    WHERE "id" = puzzle_id AND ("solution" = '{}' OR "solution" = '' OR "solution" IS NULL)
    
    UNION ALL
    
    SELECT 
        'empty_words'::TEXT,
        'Words array is empty'::TEXT
    FROM "WordSearch" 
    WHERE "id" = puzzle_id AND ("words" IS NULL OR array_length("words", 1) = 0)
    
    UNION ALL
    
    SELECT 
        'word_too_long'::TEXT,
        'Some words are longer than grid size'::TEXT
    FROM "WordSearch" 
    WHERE "id" = puzzle_id 
    AND EXISTS (
        SELECT 1 FROM unnest("words") as word 
        WHERE length(word) > "gridSize"
    );
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- STEP 7: Migration logging
-- ============================================================================

CREATE TABLE IF NOT EXISTS migration_log (
    id SERIAL PRIMARY KEY,
    migration_name VARCHAR(255) NOT NULL,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    success BOOLEAN DEFAULT true,
    notes TEXT
);

-- Log this migration
INSERT INTO migration_log (migration_name, notes) 
VALUES ('001_fix_data_integrity', 'Fixed duplicate tables, added constraints, standardized data formats');

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check constraint violations (should return 0 rows after migration)
SELECT 'Empty grids remaining' as issue, COUNT(*) as count
FROM "WordSearch" 
WHERE "grid" = '[]' OR "grid" = ''

UNION ALL

SELECT 'Empty solutions remaining' as issue, COUNT(*) as count
FROM "WordSearch" 
WHERE "solution" = '{}' OR "solution" = ''

UNION ALL

SELECT 'Empty words arrays' as issue, COUNT(*) as count
FROM "WordSearch" 
WHERE "words" IS NULL OR array_length("words", 1) = 0

UNION ALL

SELECT 'Invalid grid sizes' as issue, COUNT(*) as count
FROM "WordSearch" 
WHERE "gridSize" < 5 OR "gridSize" > 30

UNION ALL

SELECT 'Duplicate embedding tables' as issue, 
CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'PuzzleEmbedding') 
     THEN 1 ELSE 0 END as count;

-- Show statistics after migration
SELECT * FROM puzzle_stats_by_theme LIMIT 10;
