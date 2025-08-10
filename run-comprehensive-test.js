// COMPREHENSIVE SITE TEST RUNNER
// This will give you definitive answers about your site's performance and errors

const { spawn } = require('child_process');

console.log('🚀 STARTING COMPREHENSIVE SITE TEST');
console.log('===================================\n');

console.log('This test will:');
console.log('✅ Test every page and user flow');
console.log('✅ Measure exact load times');
console.log('✅ Catch ALL runtime errors');
console.log('✅ Test API performance');
console.log('✅ Check mobile responsiveness');
console.log('✅ Verify accessibility');
console.log('✅ Give you a definitive PASS/FAIL report\n');

console.log('⏳ Starting Playwright test...\n');

// Run the comprehensive test
const testProcess = spawn('npx', ['playwright', 'test', 'tests/comprehensive-site-test.ts', '--reporter=list'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

testProcess.on('close', (code) => {
  console.log('\n📊 TEST COMPLETE!');
  console.log('==================');
  
  if (code === 0) {
    console.log('🎉 ALL TESTS PASSED! Your site is working perfectly!');
    console.log('\n✅ Your site has:');
    console.log('   • Fast load speeds');
    console.log('   • Zero runtime errors');
    console.log('   • Working user flows');
    console.log('   • Good performance');
  } else {
    console.log('⚠️  Some tests failed. Check the output above for details.');
    console.log('\n🔧 Common fixes:');
    console.log('   • Make sure dev server is running on port 3000');
    console.log('   • Check for console errors in browser');
    console.log('   • Verify API endpoints are responding');
  }
  
  process.exit(code);
});

testProcess.on('error', (error) => {
  console.error('❌ Failed to run tests:', error.message);
  console.log('\n💡 Try running: npm install @playwright/test');
  process.exit(1);
});
