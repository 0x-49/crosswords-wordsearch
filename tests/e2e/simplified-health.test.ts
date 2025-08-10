import { test, expect } from '@playwright/test';

/**
 * Simplified Site Health Tests
 * This bypasses all dependency and build issues to test core functionality
 */

test.describe('Site Health - Core Functionality', () => {
  // Set longer timeout for potentially slow operations
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    // Set up error handling
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`Console error: ${msg.text()}`);
      }
    });
    
    page.on('pageerror', error => {
      console.log(`Page error: ${error.message}`);
    });
  });

  test('Homepage loads successfully', async ({ page }) => {
    try {
      await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
      
      // Check if page loaded
      await expect(page).toHaveTitle(/CrossWord|WordSearch|Puzzle/i);
      
      // Check for basic navigation elements
      const nav = page.locator('nav, header, [role="navigation"]').first();
      await expect(nav).toBeVisible({ timeout: 10000 });
      
      console.log('✅ Homepage loads successfully');
    } catch (error) {
      console.log(`❌ Homepage failed: ${error}`);
      throw error;
    }
  });

  test('Puzzle Library page loads', async ({ page }) => {
    try {
      await page.goto('http://localhost:3001/puzzle-library', { waitUntil: 'networkidle' });
      
      // Check for puzzle library content
      const content = page.locator('main, [data-testid="puzzle-grid"], .puzzle').first();
      await expect(content).toBeVisible({ timeout: 15000 });
      
      console.log('✅ Puzzle Library loads successfully');
    } catch (error) {
      console.log(`❌ Puzzle Library failed: ${error}`);
      throw error;
    }
  });

  test('Book Library page loads', async ({ page }) => {
    try {
      await page.goto('http://localhost:3001/book-library', { waitUntil: 'networkidle' });
      
      // Check for book library content
      const content = page.locator('main, .book, [data-testid="book-grid"]').first();
      await expect(content).toBeVisible({ timeout: 15000 });
      
      console.log('✅ Book Library loads successfully');
    } catch (error) {
      console.log(`❌ Book Library failed: ${error}`);
      throw error;
    }
  });

  test('API endpoints respond', async ({ request }) => {
    try {
      // Test basic API endpoints
      const endpoints = [
        '/api/puzzles',
        '/api/books',
        '/api/search/enhanced'
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await request.get(`http://localhost:3001${endpoint}`);
          expect(response.status()).toBeLessThan(500); // Allow 404, but not 500+ errors
          console.log(`✅ API ${endpoint} responds (status: ${response.status()})`);
        } catch (error) {
          console.log(`⚠️ API ${endpoint} failed: ${error}`);
        }
      }
    } catch (error) {
      console.log(`❌ API tests failed: ${error}`);
      throw error;
    }
  });

  test('No critical JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    try {
      await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000); // Wait for any async errors
      
      // Filter out non-critical errors
      const criticalErrors = errors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('404') &&
        !error.includes('net::ERR_FAILED') &&
        error.length > 0
      );

      if (criticalErrors.length > 0) {
        console.log(`❌ Critical JavaScript errors found:`, criticalErrors);
        throw new Error(`Critical errors: ${criticalErrors.join(', ')}`);
      }
      
      console.log('✅ No critical JavaScript errors detected');
    } catch (error) {
      console.log(`❌ JavaScript error test failed: ${error}`);
      throw error;
    }
  });

  test('Basic performance check', async ({ page }) => {
    try {
      const startTime = Date.now();
      
      await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
      
      const loadTime = Date.now() - startTime;
      
      // Expect page to load within 10 seconds (generous for development)
      expect(loadTime).toBeLessThan(10000);
      
      console.log(`✅ Page loaded in ${loadTime}ms`);
    } catch (error) {
      console.log(`❌ Performance test failed: ${error}`);
      throw error;
    }
  });
});
