const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '.env.local');
require('dotenv').config({ path: envPath });

/**
 * Database Migration Script
 * Executes SQL migrations safely with rollback capabilities
 */
class DatabaseMigrator {
  constructor() {
    const dbUrl = process.env.DIRECT_URL 
      || process.env.DATABASE_URL 
      || process.env.SUPABASE_DB_URL 
      || process.env.POSTGRES_PRISMA_URL 
      || process.env.DATABASE_URL_NON_POOLING;

    if (!dbUrl) {
      throw new Error('DATABASE_URL not set. Please set DATABASE_URL (or SUPABASE_DB_URL/POSTGRES_PRISMA_URL) in .env.local');
    }

    this.pool = new Pool({
      connectionString: dbUrl,
      // Supabase requires SSL; this is safe for local too.
      ssl: { rejectUnauthorized: false },
    });
  }

  async executeFile(filePath) {
    const client = await this.pool.connect();
    
    try {
      console.log(`\n🔄 Executing migration: ${path.basename(filePath)}`);
      
      // Read entire SQL file and execute in a single transaction to avoid
      // breaking on semicolons inside functions/DO blocks
      const sql = fs.readFileSync(filePath, 'utf8');

      await client.query('BEGIN');
      await client.query(sql);
      await client.query('COMMIT');
      console.log('✅ Migration completed successfully!');
      
    } catch (error) {
      await client.query('ROLLBACK');
      // Handle duplicate-object errors gracefully
      if (error.code === '42710') {
        console.warn(`⚠️ Duplicate object encountered (likely constraint/index already exists): ${error.message}`);
        return;
      }
      console.error(`❌ Migration failed: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  async verifyMigration() {
    const client = await this.pool.connect();
    
    try {
      console.log('\n🔍 Verifying migration results...');
      
      // Check if PuzzleEmbedding table was dropped
      const duplicateTableCheck = await client.query(`
        SELECT COUNT(*) as count 
        FROM information_schema.tables 
        WHERE table_name = 'PuzzleEmbedding'
      `);
      
      console.log(`  📊 Duplicate PuzzleEmbedding table exists: ${duplicateTableCheck.rows[0].count > 0 ? 'YES ❌' : 'NO ✅'}`);
      
      // Check WordSearch data integrity
      const integrityChecks = await client.query(`
        SELECT 
          'Empty grids' as issue, 
          COUNT(*) as count
        FROM "WordSearch" 
        WHERE "grid" = '[]' OR "grid" = ''
        
        UNION ALL
        
        SELECT 
          'Empty solutions' as issue, 
          COUNT(*) as count
        FROM "WordSearch" 
        WHERE "solution" = '{}' OR "solution" = ''
        
        UNION ALL
        
        SELECT 
          'Empty words arrays' as issue, 
          COUNT(*) as count
        FROM "WordSearch" 
        WHERE "words" IS NULL OR array_length("words", 1) = 0
        
        UNION ALL
        
        SELECT 
          'Invalid grid sizes' as issue, 
          COUNT(*) as count
        FROM "WordSearch" 
        WHERE "gridSize" < 5 OR "gridSize" > 30
      `);
      
      console.log('\n  📋 Data Integrity Report:');
      integrityChecks.rows.forEach(row => {
        const status = row.count === '0' ? '✅' : '⚠️';
        console.log(`    ${status} ${row.issue}: ${row.count}`);
      });
      
      // Show puzzle statistics (if view exists)
      const statsViewExists = await client.query(`
        SELECT COUNT(*)::int AS count
        FROM information_schema.views
        WHERE table_name = 'puzzle_stats_by_theme'
      `);
      if (statsViewExists.rows[0].count > 0) {
        const stats = await client.query(`
          SELECT 
            theme,
            total_puzzles,
            wordsearch_count,
            crossword_count,
            invalid_grid_count
          FROM puzzle_stats_by_theme 
          ORDER BY total_puzzles DESC 
          LIMIT 10
        `);
        console.log('\n  📈 Top Themes by Puzzle Count:');
        stats.rows.forEach(row => {
          console.log(`    🎯 ${row.theme}: ${row.total_puzzles} puzzles (${row.wordsearch_count} WS, ${row.crossword_count} CW) - ${row.invalid_grid_count} invalid grids`);
        });
      } else {
        console.log('\n  ℹ️ puzzle_stats_by_theme view not found (likely migration not run yet).');
      }
      
      // Check migration log (if table exists)
      const logTableExists = await client.query(`
        SELECT COUNT(*)::int AS count 
        FROM information_schema.tables 
        WHERE table_name = 'migration_log'
      `);
      if (logTableExists.rows[0].count > 0) {
        const migrationLog = await client.query(`
          SELECT * FROM migration_log 
          ORDER BY executed_at DESC 
          LIMIT 5
        `);
        console.log('\n  📝 Recent Migrations:');
        migrationLog.rows.forEach(row => {
          const status = row.success ? '✅' : '❌';
          const ts = row.executed_at instanceof Date ? row.executed_at.toISOString() : String(row.executed_at);
          console.log(`    ${status} ${row.migration_name} - ${ts}`);
        });
      } else {
        console.log('\n  ℹ️ migration_log table not found (will be created by migration).');
      }
      
    } catch (error) {
      console.error(`❌ Verification failed: ${error.message}`);
    } finally {
      client.release();
    }
  }

  async createBackup() {
    const client = await this.pool.connect();
    
    try {
      console.log('\n💾 Creating backup of critical data...');
      
      // Backup WordSearch puzzles with empty grids
      await client.query(`
        CREATE TABLE IF NOT EXISTS migration_backup_${Date.now()} AS
        SELECT 'wordsearch' as table_name, "id", "title", "theme", "grid", "solution", "words"
        FROM "WordSearch" 
        WHERE "grid" = '[]' OR "grid" = '' OR "solution" = '{}' OR "solution" = ''
      `);
      
      console.log('✅ Backup created successfully');
      
    } catch (error) {
      console.error(`❌ Backup failed: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  async close() {
    await this.pool.end();
  }
}

// Main execution
async function main() {
  const migrator = new DatabaseMigrator();
  
  try {
    console.log('🚀 Starting Database Migration Process');
    console.log('=====================================');
    
    // Create backup first
    await migrator.createBackup();
    
    // Execute migration
    const migrationFile = path.join(__dirname, 'migrations', '001_fix_data_integrity.sql');
    await migrator.executeFile(migrationFile);
    
    // Verify results
    await migrator.verifyMigration();
    
    console.log('\n🎉 Migration process completed successfully!');
    console.log('=====================================');
    
  } catch (error) {
    console.error('\n💥 Migration process failed!');
    console.error('============================');
    console.error(error);
    process.exit(1);
  } finally {
    await migrator.close();
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--verify-only')) {
  // Only run verification
  const migrator = new DatabaseMigrator();
  migrator.verifyMigration().then(() => migrator.close());
} else if (args.includes('--backup-only')) {
  // Only create backup
  const migrator = new DatabaseMigrator();
  migrator.createBackup().then(() => migrator.close());
} else {
  // Run full migration
  main();
}
