// QUICK TEST - Run this immediately to verify your site is working
// Usage: node quick-test.js

console.log('🚀 QUICK SITE TEST - IMMEDIATE RESULTS');
console.log('=====================================\n');

async function testSite() {
  const tests = [
    { name: 'Homepage', url: 'http://localhost:3000' },
    { name: 'Puzzle Library', url: 'http://localhost:3000/puzzle-library' },
    { name: 'Book Library', url: 'http://localhost:3000/book-library' },
    { name: 'Crossword API (paginated)', url: 'http://localhost:3000/api/crossword/list?page=1&limit=10' },
    { name: 'Word Search API (paginated)', url: 'http://localhost:3000/api/word-search/list?page=1&limit=10' }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`Testing ${test.name}...`);
      const start = Date.now();
      const response = await fetch(test.url);
      const duration = Date.now() - start;
      
      if (response.ok) {
        console.log(`✅ ${test.name}: PASS (${response.status}) - ${duration}ms`);
        passed++;
      } else {
        console.log(`❌ ${test.name}: FAIL (${response.status}) - ${duration}ms`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ERROR - ${error.message}`);
      failed++;
    }
  }

  console.log('\n📊 RESULTS:');
  console.log(`✅ PASSED: ${passed}`);
  console.log(`❌ FAILED: ${failed}`);
  console.log(`🎯 SUCCESS RATE: ${Math.round((passed / (passed + failed)) * 100)}%`);

  if (passed > failed) {
    console.log('\n🎉 GREAT! Your site is mostly working!');
    console.log('💡 Next steps:');
    console.log('   1. Run Playwright tests: npx playwright test');
    console.log('   2. Check performance: npm run build');
    console.log('   3. Monitor API response times');
  } else {
    console.log('\n⚠️  Some issues found. Check your dev server is running on port 3000');
  }
}

// Check if running as main module
if (require.main === module) {
  testSite().catch(console.error);
}
