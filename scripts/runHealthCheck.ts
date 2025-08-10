#!/usr/bin/env node

import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

// Comprehensive site health check runner
class SiteHealthChecker {
  private results: {
    buildCheck: boolean;
    typeCheck: boolean;
    lintCheck: boolean;
    testResults: any;
    performanceResults: any;
    errors: string[];
  } = {
    buildCheck: false,
    typeCheck: false,
    lintCheck: false,
    testResults: null,
    performanceResults: null,
    errors: []
  };

  async runCommand(command: string, args: string[] = []): Promise<{ success: boolean; output: string }> {
    return new Promise((resolve) => {
      const process = spawn(command, args, { 
        stdio: 'pipe',
        shell: true,
        cwd: process.cwd()
      });

      let output = '';
      let errorOutput = '';

      process.stdout?.on('data', (data) => {
        output += data.toString();
      });

      process.stderr?.on('data', (data) => {
        errorOutput += data.toString();
      });

      process.on('close', (code) => {
        resolve({
          success: code === 0,
          output: output + errorOutput
        });
      });

      // Timeout after 5 minutes
      setTimeout(() => {
        process.kill();
        resolve({
          success: false,
          output: 'Command timed out after 5 minutes'
        });
      }, 5 * 60 * 1000);
    });
  }

  async checkBuild(): Promise<void> {
    console.log('🔨 Running build check...');
    const result = await this.runCommand('npm', ['run', 'build']);
    
    this.results.buildCheck = result.success;
    
    if (!result.success) {
      this.results.errors.push(`Build failed: ${result.output}`);
      console.error('❌ Build check failed');
    } else {
      console.log('✅ Build check passed');
    }
  }

  async checkTypes(): Promise<void> {
    console.log('🔍 Running TypeScript check...');
    const result = await this.runCommand('npx', ['tsc', '--noEmit']);
    
    this.results.typeCheck = result.success;
    
    if (!result.success) {
      this.results.errors.push(`TypeScript errors: ${result.output}`);
      console.error('❌ TypeScript check failed');
    } else {
      console.log('✅ TypeScript check passed');
    }
  }

  async checkLinting(): Promise<void> {
    console.log('📏 Running lint check...');
    const result = await this.runCommand('npx', ['eslint', 'src/', '--ext', '.ts,.tsx,.js,.jsx']);
    
    this.results.lintCheck = result.success;
    
    if (!result.success) {
      this.results.errors.push(`Linting errors: ${result.output}`);
      console.error('❌ Lint check failed');
    } else {
      console.log('✅ Lint check passed');
    }
  }

  async installPlaywright(): Promise<void> {
    console.log('🎭 Installing Playwright...');
    
    // Check if playwright is already installed
    try {
      await this.runCommand('npx', ['playwright', '--version']);
      console.log('✅ Playwright already installed');
      return;
    } catch (error) {
      // Not installed, proceed with installation
    }

    const installResult = await this.runCommand('npm', ['install', '@playwright/test', '--save-dev']);
    if (!installResult.success) {
      this.results.errors.push(`Playwright installation failed: ${installResult.output}`);
      return;
    }

    const browsersResult = await this.runCommand('npx', ['playwright', 'install']);
    if (!browsersResult.success) {
      this.results.errors.push(`Playwright browsers installation failed: ${browsersResult.output}`);
    } else {
      console.log('✅ Playwright installed successfully');
    }
  }

  async runE2ETests(): Promise<void> {
    console.log('🧪 Running E2E tests...');
    
    // First ensure the dev server is running
    console.log('🚀 Starting dev server...');
    const devServer = spawn('npm', ['run', 'dev'], { 
      stdio: 'pipe',
      shell: true,
      detached: true
    });

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 10000));

    try {
      const result = await this.runCommand('npx', ['playwright', 'test', '--reporter=json']);
      
      if (result.success) {
        console.log('✅ E2E tests passed');
        this.results.testResults = { success: true, output: result.output };
      } else {
        console.error('❌ E2E tests failed');
        this.results.testResults = { success: false, output: result.output };
        this.results.errors.push(`E2E tests failed: ${result.output}`);
      }
    } catch (error) {
      this.results.errors.push(`E2E test execution failed: ${error}`);
    } finally {
      // Clean up dev server
      try {
        process.kill(-devServer.pid!);
      } catch (error) {
        // Server might already be stopped
      }
    }
  }

  async checkDatabaseConnectivity(): Promise<void> {
    console.log('🗄️ Checking database connectivity...');
    
    try {
      const result = await this.runCommand('npx', ['tsx', '-e', `
        import { PrismaClient } from '@prisma/client';
        const prisma = new PrismaClient();
        
        async function testConnection() {
          try {
            await prisma.\$connect();
            const wsCount = await prisma.wordSearch.count();
            const cwCount = await prisma.crossword.count();
            console.log('Database connected successfully');
            console.log('Word searches:', wsCount);
            console.log('Crosswords:', cwCount);
            await prisma.\$disconnect();
            process.exit(0);
          } catch (error) {
            console.error('Database connection failed:', error.message);
            await prisma.\$disconnect();
            process.exit(1);
          }
        }
        
        testConnection();
      `]);

      if (result.success) {
        console.log('✅ Database connectivity check passed');
      } else {
        console.error('❌ Database connectivity check failed');
        this.results.errors.push(`Database connectivity failed: ${result.output}`);
      }
    } catch (error) {
      this.results.errors.push(`Database check failed: ${error}`);
    }
  }

  async generateReport(): Promise<void> {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        buildPassed: this.results.buildCheck,
        typeCheckPassed: this.results.typeCheck,
        lintCheckPassed: this.results.lintCheck,
        testsRunSuccessfully: this.results.testResults?.success || false,
        totalErrors: this.results.errors.length,
        overallHealth: this.results.errors.length === 0 ? 'HEALTHY' : 'ISSUES_DETECTED'
      },
      details: this.results,
      recommendations: this.generateRecommendations()
    };

    // Save report
    const reportPath = path.join(process.cwd(), 'site-health-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    // Display summary
    console.log('\n' + '='.repeat(60));
    console.log('🏥 SITE HEALTH REPORT');
    console.log('='.repeat(60));
    console.log(`Overall Health: ${report.summary.overallHealth}`);
    console.log(`Build Status: ${report.summary.buildPassed ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`TypeScript: ${report.summary.typeCheckPassed ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Linting: ${report.summary.lintCheckPassed ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`E2E Tests: ${report.summary.testsRunSuccessfully ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Total Errors: ${report.summary.totalErrors}`);
    console.log('='.repeat(60));

    if (this.results.errors.length > 0) {
      console.log('\n🚨 ERRORS DETECTED:');
      this.results.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.substring(0, 200)}...`);
      });
    }

    if (report.recommendations.length > 0) {
      console.log('\n💡 RECOMMENDATIONS:');
      report.recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. ${rec}`);
      });
    }

    console.log(`\n📄 Full report saved to: ${reportPath}`);
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];

    if (!this.results.buildCheck) {
      recommendations.push('Fix build errors before deployment');
    }

    if (!this.results.typeCheck) {
      recommendations.push('Resolve TypeScript type errors for better code quality');
    }

    if (!this.results.lintCheck) {
      recommendations.push('Fix linting issues to maintain code standards');
    }

    if (!this.results.testResults?.success) {
      recommendations.push('Address E2E test failures to ensure user experience quality');
    }

    if (this.results.errors.length > 5) {
      recommendations.push('High number of errors detected - prioritize fixing critical issues');
    }

    if (recommendations.length === 0) {
      recommendations.push('Site appears healthy! Consider adding more comprehensive tests.');
    }

    return recommendations;
  }

  async run(): Promise<void> {
    console.log('🚀 Starting comprehensive site health check...\n');

    try {
      // Run checks in sequence
      await this.checkBuild();
      await this.checkTypes();
      await this.checkLinting();
      await this.checkDatabaseConnectivity();
      await this.installPlaywright();
      await this.runE2ETests();
      
      await this.generateReport();
    } catch (error) {
      console.error('❌ Health check failed:', error);
      this.results.errors.push(`Health check execution failed: ${error}`);
      await this.generateReport();
    }
  }
}

// Run the health check
if (require.main === module) {
  const checker = new SiteHealthChecker();
  checker.run().catch(console.error);
}

export default SiteHealthChecker;
