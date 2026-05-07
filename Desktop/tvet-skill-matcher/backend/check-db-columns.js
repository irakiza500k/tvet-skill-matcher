const { query } = require('./config/database');

async function checkDatabaseColumns() {
  try {
    console.log('🔍 Checking database columns...');
    
    // Check users table structure
    const usersTable = await query('DESCRIBE users');
    console.log('📋 Users table columns:', usersTable);
    
    // Check if the tables exist and have the expected columns
    const tablesExist = await query(`
      SELECT TABLE_NAME FROM information_schema.tables 
      WHERE TABLE_SCHEMA = 'tvet_db'
    `);
    
    console.log('📋 Tables in database:', tablesExist);
    
    if (tablesExist.length > 0) {
      console.log('✅ Database tables exist');
      
      // Check specific columns in users table
      const usersColumns = await query('SHOW COLUMNS FROM users');
      console.log('📋 Users table columns:', usersColumns);
      
      const hasCreatedAt = usersColumns.some(col => 
        col.Field.toLowerCase().includes('created_at')
      );
      
      const hasUpdatedAt = usersColumns.some(col => 
        col.Field.toLowerCase().includes('updated_at')
      );
      
      console.log('✅ Has created_at column:', hasCreatedAt);
      console.log('✅ Has updated_at column:', hasUpdatedAt);
      
      if (!hasCreatedAt || !hasUpdatedAt) {
        console.log('❌ ISSUE: Missing timestamp columns in users table');
        console.log('🔧 SOLUTION: The database schema might be different than expected');
        console.log('🔧 SOLUTION: Update User model to use available columns only');
      } else {
        console.log('✅ Users table has required columns');
      }
    }
    
  } catch (error) {
    console.error('❌ Database check failed:', error);
  }
}

// Run if called directly
if (require.main === module) {
  checkDatabaseColumns();
}

module.exports = { checkDatabaseColumns };
