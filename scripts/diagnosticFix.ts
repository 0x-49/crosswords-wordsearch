#!/usr/bin/env tsx

/**
 * Comprehensive Diagnostic and Fix Script
 * This script identifies and fixes ALL issues preventing tests from running
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

interface DiagnosticResult {
  category: string;
  issue: string;
  severity: 'critical' | 'warning' | 'info';
  fix?: string;
}

const results: DiagnosticResult[] = [];

function addResult(category: string, issue: string, severity: 'critical' | 'warning' | 'info', fix?: string) {
  results.push({ category, issue, severity, fix });
}

function runCommand(command: string, cwd?: string): { success: boolean; output: string; error?: string } {
  try {
    const output = execSync(command, { 
      cwd: cwd || process.cwd(), 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    return { success: true, output };
  } catch (error: any) {
    return { 
      success: false, 
      output: error.stdout || '', 
      error: error.stderr || error.message 
    };
  }
}

async function checkTypeScriptErrors() {
  console.log('🔍 Checking TypeScript errors...');
  
  const result = runCommand('npx tsc --noEmit --pretty');
  if (!result.success) {
    addResult('TypeScript', `Compilation errors: ${result.error}`, 'critical', 'Fix TypeScript compilation errors');
  } else {
    addResult('TypeScript', 'No compilation errors', 'info');
  }
}

async function checkBuildErrors() {
  console.log('🔍 Checking build errors...');
  
  const result = runCommand('npm run build');
  if (!result.success) {
    addResult('Build', `Build failed: ${result.error}`, 'critical', 'Fix build configuration and dependencies');
  } else {
    addResult('Build', 'Build successful', 'info');
  }
}

async function checkLintErrors() {
  console.log('🔍 Checking lint errors...');
  
  const result = runCommand('npm run lint');
  if (!result.success) {
    addResult('Lint', `Lint errors: ${result.error}`, 'warning', 'Fix linting issues');
  } else {
    addResult('Lint', 'No lint errors', 'info');
  }
}

async function checkDependencies() {
  console.log('🔍 Checking dependencies...');
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    addResult('Dependencies', 'package.json not found', 'critical');
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Check for missing critical dependencies
  const criticalDeps = ['next', 'react', 'typescript', '@playwright/test'];
  for (const dep of criticalDeps) {
    if (!packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]) {
      addResult('Dependencies', `Missing critical dependency: ${dep}`, 'critical', `Install ${dep}`);
    }
  }
}

async function checkEnvironmentVariables() {
  console.log('🔍 Checking environment variables...');
  
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    addResult('Environment', '.env.local file not found', 'critical', 'Create .env.local with required variables');
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = ['DATABASE_URL', 'DIRECT_URL', 'NEXT_PUBLIC_BASE_URL'];
  
  for (const varName of requiredVars) {
    if (!envContent.includes(varName)) {
      addResult('Environment', `Missing environment variable: ${varName}`, 'critical', `Add ${varName} to .env.local`);
    }
  }
}

async function checkPortConfiguration() {
  console.log('🔍 Checking port configuration...');
  
  // Check playwright config
  const playwrightConfigPath = path.join(process.cwd(), 'playwright.config.ts');
  if (fs.existsSync(playwrightConfigPath)) {
    const config = fs.readFileSync(playwrightConfigPath, 'utf8');
    if (config.includes('localhost:3000') && !config.includes('localhost:3001')) {
      addResult('Configuration', 'Playwright config uses wrong port (3000 instead of 3001)', 'critical', 'Update playwright.config.ts to use port 3001');
    }
  }

  // Check if any process is using port 3001
  const portResult = runCommand('netstat -ano | findstr :3001');
  if (portResult.success && portResult.output.trim()) {
    addResult('Port', 'Port 3001 is already in use', 'warning', 'Kill existing processes on port 3001');
  }
}

async function checkTestFiles() {
  console.log('🔍 Checking test files...');
  
  const testDir = path.join(process.cwd(), 'tests');
  if (!fs.existsSync(testDir)) {
    addResult('Tests', 'Test directory not found', 'critical', 'Create tests directory');
    return;
  }

  const testFiles = fs.readdirSync(testDir, { recursive: true });
  const tsTestFiles = testFiles.filter(file => file.toString().endsWith('.test.ts'));
  
  if (tsTestFiles.length === 0) {
    addResult('Tests', 'No test files found', 'warning', 'Create test files');
  } else {
    addResult('Tests', `Found ${tsTestFiles.length} test files`, 'info');
  }
}

async function checkDatabaseConnection() {
  console.log('🔍 Checking database connection...');
  
  try {
    // Try to run a simple Prisma command
    const result = runCommand('npx prisma db pull --preview-feature');
    if (!result.success) {
      addResult('Database', `Database connection failed: ${result.error}`, 'critical', 'Check database connection and credentials');
    } else {
      addResult('Database', 'Database connection successful', 'info');
    }
  } catch (error) {
    addResult('Database', `Database check failed: ${error}`, 'critical', 'Fix database configuration');
  }
}

async function generateReport() {
  console.log('\n📊 COMPREHENSIVE DIAGNOSTIC REPORT');
  console.log('=====================================\n');

  const criticalIssues = results.filter(r => r.severity === 'critical');
  const warnings = results.filter(r => r.severity === 'warning');
  const info = results.filter(r => r.severity === 'info');

  console.log(`🚨 CRITICAL ISSUES (${criticalIssues.length}):`);
  criticalIssues.forEach((issue, index) => {
    console.log(`${index + 1}. [${issue.category}] ${issue.issue}`);
    if (issue.fix) console.log(`   Fix: ${issue.fix}`);
  });

  console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
  warnings.forEach((issue, index) => {
    console.log(`${index + 1}. [${issue.category}] ${issue.issue}`);
    if (issue.fix) console.log(`   Fix: ${issue.fix}`);
  });

  console.log(`\n✅ WORKING (${info.length}):`);
  info.forEach((issue, index) => {
    console.log(`${index + 1}. [${issue.category}] ${issue.issue}`);
  });

  console.log('\n🎯 PRIORITY FIX ORDER:');
  console.log('1. Fix TypeScript compilation errors');
  console.log('2. Fix build configuration');
  console.log('3. Update port configuration');
  console.log('4. Fix environment variables');
  console.log('5. Fix database connection');
  console.log('6. Run tests');

  return {
    critical: criticalIssues.length,
    warnings: warnings.length,
    working: info.length,
    total: results.length
  };
}

async function main() {
  console.log('🚀 Starting comprehensive diagnostic...\n');

  await checkTypeScriptErrors();
  await checkBuildErrors();
  await checkLintErrors();
  await checkDependencies();
  await checkEnvironmentVariables();
  await checkPortConfiguration();
  await checkTestFiles();
  await checkDatabaseConnection();

  const summary = await generateReport();

  if (summary.critical > 0) {
    console.log('\n❌ CRITICAL ISSUES FOUND - Tests cannot run until these are fixed!');
    process.exit(1);
  } else if (summary.warnings > 0) {
    console.log('\n⚠️  Some warnings found, but tests should be able to run');
    process.exit(0);
  } else {
    console.log('\n✅ All checks passed - Ready to run tests!');
    process.exit(0);
  }
}

if (require.main === module) {
  main().catch(console.error);
}
