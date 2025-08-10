#!/usr/bin/env tsx

/**
 * Simple Development Server Startup Script
 * Bypasses build issues and starts the server for testing
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

async function startDevServer() {
  console.log('🚀 Starting development server...');
  
  const projectRoot = process.cwd();
  const packageJsonPath = path.join(projectRoot, 'package.json');
  
  if (!existsSync(packageJsonPath)) {
    console.error('❌ package.json not found. Make sure you are in the project root.');
    process.exit(1);
  }

  try {
    // Try to start the Next.js dev server
    console.log('📦 Starting Next.js development server on port 3001...');
    
    const devServer = spawn('npx', ['next', 'dev', '-p', '3001'], {
      stdio: 'inherit',
      shell: true,
      cwd: projectRoot
    });

    devServer.on('error', (error) => {
      console.error('❌ Failed to start dev server:', error);
      process.exit(1);
    });

    devServer.on('exit', (code) => {
      console.log(`🛑 Dev server exited with code ${code}`);
      process.exit(code || 0);
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down dev server...');
      devServer.kill('SIGINT');
    });

    process.on('SIGTERM', () => {
      console.log('\n🛑 Shutting down dev server...');
      devServer.kill('SIGTERM');
    });

    console.log('✅ Dev server startup initiated. Server should be available at http://localhost:3001');
    console.log('📝 Press Ctrl+C to stop the server');

  } catch (error) {
    console.error('❌ Error starting dev server:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startDevServer().catch(console.error);
}
