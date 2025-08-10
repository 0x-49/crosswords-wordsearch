const { spawn } = require('child_process');
const http = require('http');

console.log('🚀 SIMPLE DIRECT TEST - NO BUFFERING');
console.log('===================================\n');

// Step 1: Start Next.js server on a different port
console.log('1. Starting Next.js server on port 3002...');

const server = spawn('npx', ['next', 'dev', '-p', '3002'], {
  stdio: 'inherit',
  shell: true
});

// Step 2: Wait and test
setTimeout(async () => {
  console.log('\n2. Testing server response...');
  
  try {
    const response = await fetch('http://localhost:3002');
    console.log(`✅ Server responds with status: ${response.status}`);
    
    if (response.status === 200) {
      console.log('🎉 SUCCESS: Your site is working!');
    } else {
      console.log(`⚠️  Server running but returning status ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ Server test failed: ${error.message}`);
  }
  
  // Step 3: Kill server
  console.log('\n3. Stopping server...');
  server.kill();
  process.exit(0);
  
}, 15000); // Wait 15 seconds

// Handle errors
server.on('error', (error) => {
  console.log(`❌ Server failed to start: ${error.message}`);
  process.exit(1);
});

console.log('⏳ Waiting 15 seconds for server to start...');
