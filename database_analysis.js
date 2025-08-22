const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function analyzeDatabaseSchema() {
  const client = await pool.connect();
  
  try {
    console.log('=== DATABASE SCHEMA ANALYSIS ===\n');
    
    // Get all tables
    const tablesQuery = `
      SELECT table_name, table_schema 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    
    const tables = await client.query(tablesQuery);
    console.log(`Found ${tables.rows.length} tables:\n`);
    
    for (const table of tables.rows) {
      console.log(`\n--- TABLE: ${table.table_name} ---`);
      
      // Get column information
      const columnsQuery = `
        SELECT 
          column_name, 
          data_type, 
          is_nullable, 
          column_default,
          character_maximum_length
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = $1
        ORDER BY ordinal_position;
      `;
      
      const columns = await client.query(columnsQuery, [table.table_name]);
      
      columns.rows.forEach(col => {
        const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
        const length = col.character_maximum_length ? `(${col.character_maximum_length})` : '';
        const defaultVal = col.column_default ? ` DEFAULT ${col.column_default}` : '';
        console.log(`  ${col.column_name}: ${col.data_type}${length} ${nullable}${defaultVal}`);
      });
      
      // Get row count
      const countQuery = `SELECT COUNT(*) as count FROM "${table.table_name}";`;
      try {
        const count = await client.query(countQuery);
        console.log(`  → Row count: ${count.rows[0].count}`);
      } catch (e) {
        console.log(`  → Row count: Unable to access`);
      }
      
      // Get foreign keys
      const fkQuery = `
        SELECT
          kcu.column_name,
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
          AND ccu.table_schema = tc.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_name = $1;
      `;
      
      const foreignKeys = await client.query(fkQuery, [table.table_name]);
      if (foreignKeys.rows.length > 0) {
        console.log(`  Foreign Keys:`);
        foreignKeys.rows.forEach(fk => {
          console.log(`    ${fk.column_name} → ${fk.foreign_table_name}.${fk.foreign_column_name}`);
        });
      }
    }
    
    // Get indexes
    console.log('\n=== INDEXES ===');
    const indexQuery = `
      SELECT 
        schemaname,
        tablename,
        indexname,
        indexdef
      FROM pg_indexes 
      WHERE schemaname = 'public'
      ORDER BY tablename, indexname;
    `;
    
    const indexes = await client.query(indexQuery);
    indexes.rows.forEach(idx => {
      console.log(`${idx.tablename}.${idx.indexname}: ${idx.indexdef}`);
    });
    
  } catch (error) {
    console.error('Error analyzing database:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

async function sampleData() {
  const client = await pool.connect();
  
  try {
    console.log('\n=== SAMPLE DATA ===\n');
    
    // Get table names first
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    
    const tables = await client.query(tablesQuery);
    
    for (const table of tables.rows) {
      console.log(`\n--- SAMPLE FROM: ${table.table_name} ---`);
      
      try {
        const sampleQuery = `SELECT * FROM "${table.table_name}" LIMIT 3;`;
        const sample = await client.query(sampleQuery);
        
        if (sample.rows.length > 0) {
          console.log(JSON.stringify(sample.rows, null, 2));
        } else {
          console.log('  (No data)');
        }
      } catch (e) {
        console.log(`  Error accessing table: ${e.message}`);
      }
    }
    
  } catch (error) {
    console.error('Error sampling data:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run analysis
if (process.argv[2] === 'sample') {
  sampleData();
} else {
  analyzeDatabaseSchema();
}
