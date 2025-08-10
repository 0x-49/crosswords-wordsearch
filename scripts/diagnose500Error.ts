#!/usr/bin/env tsx

/**
 * Final Diagnostic Script - Identify 500 Error Root Cause
 * This script will help identify the exact cause of the persistent 500 errors
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

async function diagnose500Error() {
  console.log('🔍 DIAGNOSING 500 ERROR ROOT CAUSE');
  console.log('==================================\n');

  // Step 1: Check for common Next.js issues
  console.log('1. Checking Next.js configuration...');
  await checkNextConfig();

  // Step 2: Check environment variables
  console.log('2. Checking environment variables...');
  await checkEnvironmentVariables();

  // Step 3: Check database connection
  console.log('3. Checking database connection...');
  await checkDatabaseConnection();

  // Step 4: Check for missing dependencies
  console.log('4. Checking critical dependencies...');
  await checkDependencies();

  // Step 5: Start server with detailed error logging
  console.log('5. Starting server with detailed error logging...');
  await startServerWithLogging();
}

async function checkNextConfig() {
  const nextConfigPath = path.join(process.cwd(), 'next.config.js');
  const nextConfigTsPath = path.join(process.cwd(), 'next.config.ts');
  
  if (fs.existsSync(nextConfigPath)) {
    console.log('   ✅ next.config.js found');
  } else if (fs.existsSync(nextConfigTsPath)) {
    console.log('   ✅ next.config.ts found');
  } else {
    console.log('   ⚠️  No Next.js config file found');
  }
}

async function checkEnvironmentVariables() {
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.log('   ❌ .env.local file not found');
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = ['DATABASE_URL', 'DIRECT_URL'];
  
  for (const varName of requiredVars) {
    if (envContent.includes(varName)) {
      console.log(`   ✅ ${varName} found`);
    } else {
      console.log(`   ❌ ${varName} missing`);
    }
  }
}

async function checkDatabaseConnection() {
  try {
    // Try to import Prisma client
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    // Test connection
    await prisma.$connect();
    console.log('   ✅ Database connection successful');
    await prisma.$disconnect();
  } catch (error) {
    console.log(`   ❌ Database connection failed: ${error.message}`);
  }
}

async function checkDependencies() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log('   ❌ package.json not found');
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const criticalDeps = ['next', 'react', '@prisma/client', 'framer-motion'];
  
  for (const dep of criticalDeps) {
    if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
      console.log(`   ✅ ${dep} found`);
    } else {
      console.log(`   ❌ ${dep} missing`);
    }
  }
}

async function startServerWithLogging() {
  console.log('   Starting Next.js server with detailed logging...');
  
  return new Promise((resolve) => {
    const server = spawn('npx', ['next', 'dev', '-p', '3002'], {
      stdio: 'pipe',
      shell: true,
      cwd: process.cwd()
    });

    let errorFound = false;

    server.stdout?.on('data', (data: Buffer) => {
      const output = data.toString();
      console.log(`   [STDOUT] ${output.trim()}`);
      
      if (output.includes('Ready') || output.includes('started server')) {
        console.log('   ✅ Server started successfully on port 3002');
        setTimeout(() => {
          server.kill('SIGTERM');
          resolve(undefined);
        }, 5000);
      }
    });

    server.stderr?.on('data', (data: Buffer) => {
      const error = data.toString();
      console.log(`   [STDERR] ${error.trim()}`);
      errorFound = true;
    });

    server.on('error', (error) => {
      console.log(`   ❌ Server error: ${error.message}`);
      errorFound = true;
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      if (!errorFound) {
        console.log('   ⚠️  No obvious errors detected, but 500 errors may be runtime-specific');
      }
      server.kill('SIGTERM');
      resolve(undefined);
    }, 30000);
  });
}

if (require.main === module) {
  diagnose500Error().catch(console.error);
}
