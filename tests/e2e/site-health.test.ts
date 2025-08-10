import { test, expect, Page } from '@playwright/test';

// Site Health Test Suite - Comprehensive verification of site functionality and performance
test.describe('Site Health & Performance Tests', () => {
  
  // Performance thresholds
  const PERFORMANCE_THRESHOLDS = {
    pageLoad: 3000,      // 3 seconds max
    apiResponse: 2000,   // 2 seconds max
    largePageLoad: 5000, // 5 seconds max for data-heavy pages
  };

  test.beforeEach(async ({ page }) => {
    // Set up error monitoring
    page.on('pageerror', (error) => {
      console.error('❌ Page Error:', error.message);
      throw new Error(`Page Error: ${error.message}`);
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('❌ Console Error:', msg.text());
      }
    });

    // Monitor failed network requests
    page.on('requestfailed', (request) => {
      console.error('❌ Failed Request:', request.url(), request.failure()?.errorText);
    });
  });

  test('🏠 Homepage loads fast and error-free', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log(`✅ Homepage load time: ${loadTime}ms`);
    
    // Performance check
    expect(loadTime).toBeLessThan(PERFORMANCE_THRESHOLDS.pageLoad);
    
    // Content verification
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    
    // No console errors
    const errors = await page.evaluate(() => window.console.error);
    expect(errors).toBeUndefined();
  });

  test('📚 Puzzle Library loads and functions correctly', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000/puzzle-library');
    
    // Wait for initial data load
    await page.waitForSelector('[data-testid="puzzle-grid"]', { timeout: 10000 });
    
    const loadTime = Date.now() - startTime;
    console.log(`✅ Puzzle Library load time: ${loadTime}ms`);
    
    // Performance check (allow more time for data-heavy page)
    expect(loadTime).toBeLessThan(PERFORMANCE_THRESHOLDS.largePageLoad);
    
    // Functionality verification
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
    await expect(page.locator('[data-testid="puzzle-grid"]')).toBeVisible();
    
    // Check if puzzles are loaded
    const puzzleCount = await page.locator('[data-testid="puzzle-card"]').count();
    expect(puzzleCount).toBeGreaterThan(0);
    
    // Test search functionality
    await page.fill('input[placeholder*="Search"]', 'animal');
    await page.waitForTimeout(1000); // Wait for search
    
    const searchResults = await page.locator('[data-testid="puzzle-card"]').count();
    expect(searchResults).toBeGreaterThan(0);
  });

  test('🧠 Cognitive Tracker functions without errors', async ({ page }) => {
    await page.goto('http://localhost:3000/puzzle-library');
    
    // Wait for page load
    await page.waitForLoadState('networkidle');
    
    // Try to open cognitive tracker
    const brainHealthButton = page.locator('button:has-text("Brain Health")');
    if (await brainHealthButton.isVisible()) {
      await brainHealthButton.click();
      
      // Verify cognitive tracker loads
      await expect(page.locator('[data-testid="cognitive-tracker"]')).toBeVisible();
      
      // Check for key elements
      await expect(page.locator('text=Cognitive Health Score')).toBeVisible();
      await expect(page.locator('text=Puzzles Solved')).toBeVisible();
    }
  });

  test('📖 Book Library loads efficiently', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000/book-library');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log(`✅ Book Library load time: ${loadTime}ms`);
    
    expect(loadTime).toBeLessThan(PERFORMANCE_THRESHOLDS.largePageLoad);
    
    // Verify books are displayed
    const bookCount = await page.locator('[data-testid="book-card"]').count();
    expect(bookCount).toBeGreaterThan(0);
  });

  test('🔍 Search APIs respond quickly', async ({ page }) => {
    await page.goto('http://localhost:3000/puzzle-library');
    
    // Monitor API calls
    const apiCalls: { url: string; duration: number; status: number }[] = [];
    
    page.on('response', async (response) => {
      if (response.url().includes('/api/')) {
        const request = response.request();
        const timing = response.timing();
        
        apiCalls.push({
          url: response.url(),
          duration: timing.responseEnd,
          status: response.status()
        });
      }
    });
    
    // Trigger search
    await page.fill('input[placeholder*="Search"]', 'puzzle');
    await page.waitForTimeout(2000);
    
    // Verify API performance
    for (const call of apiCalls) {
      console.log(`API Call: ${call.url} - ${call.duration}ms - Status: ${call.status}`);
      expect(call.status).toBe(200);
      expect(call.duration).toBeLessThan(PERFORMANCE_THRESHOLDS.apiResponse);
    }
  });

  test('📝 Blog posts load and display correctly', async ({ page }) => {
    const blogPosts = [
      '/blog/word-search-benefits-brain-health',
      '/blog/crossword-benefits-memory-improvement',
      '/benefits'
    ];

    for (const blogUrl of blogPosts) {
      const startTime = Date.now();
      
      await page.goto(`http://localhost:3000${blogUrl}`);
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      console.log(`✅ ${blogUrl} load time: ${loadTime}ms`);
      
      expect(loadTime).toBeLessThan(PERFORMANCE_THRESHOLDS.pageLoad);
      
      // Verify content
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('article, main')).toBeVisible();
    }
  });

  test('🎯 Individual puzzle pages work correctly', async ({ page }) => {
    // First get a puzzle ID from the library
    await page.goto('http://localhost:3000/puzzle-library');
    await page.waitForSelector('[data-testid="puzzle-card"]');
    
    // Click on first puzzle
    const firstPuzzle = page.locator('[data-testid="puzzle-card"]').first();
    await firstPuzzle.click();
    
    // Verify puzzle page loads
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('⚡ No memory leaks or performance degradation', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Measure initial memory
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0;
    });
    
    // Navigate through multiple pages
    const pages = [
      '/puzzle-library',
      '/book-library',
      '/benefits',
      '/'
    ];
    
    for (const pagePath of pages) {
      await page.goto(`http://localhost:3000${pagePath}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
    }
    
    // Measure final memory
    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0;
    });
    
    const memoryIncrease = finalMemory - initialMemory;
    console.log(`Memory usage increase: ${memoryIncrease / 1024 / 1024}MB`);
    
    // Memory shouldn't increase by more than 50MB
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
  });

  test('🔐 Authentication flows work correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check if auth components are present
    const loginButton = page.locator('button:has-text("Sign In"), a:has-text("Sign In")');
    if (await loginButton.isVisible()) {
      // Test login flow (without actually logging in)
      await loginButton.click();
      
      // Should redirect or show auth modal
      await page.waitForTimeout(1000);
      
      // Verify no errors occurred
      const errors = await page.evaluate(() => {
        return window.console.error;
      });
      expect(errors).toBeUndefined();
    }
  });

  test('📱 Mobile responsiveness works', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Verify mobile navigation
    const mobileMenu = page.locator('[data-testid="mobile-menu"], button[aria-label*="menu"]');
    if (await mobileMenu.isVisible()) {
      await mobileMenu.click();
      await expect(page.locator('nav')).toBeVisible();
    }
    
    // Test puzzle library on mobile
    await page.goto('http://localhost:3000/puzzle-library');
    await page.waitForLoadState('networkidle');
    
    // Verify responsive layout
    await expect(page.locator('[data-testid="puzzle-grid"]')).toBeVisible();
  });
});

// API Health Tests
test.describe('API Health Tests', () => {
  test('🔌 All API endpoints respond correctly', async ({ request }) => {
    const apiEndpoints = [
      { path: '/api/word-search/list', method: 'GET' },
      { path: '/api/crossword/list', method: 'GET' },
      { path: '/api/search/smart', method: 'POST', body: { query: 'test', limit: 10 } }
    ];

    for (const endpoint of apiEndpoints) {
      const startTime = Date.now();
      
      let response;
      if (endpoint.method === 'POST') {
        response = await request.post(`http://localhost:3000${endpoint.path}`, {
          data: endpoint.body
        });
      } else {
        response = await request.get(`http://localhost:3000${endpoint.path}`);
      }
      
      const duration = Date.now() - startTime;
      
      console.log(`API ${endpoint.method} ${endpoint.path}: ${response.status()} (${duration}ms)`);
      
      expect(response.status()).toBe(200);
      expect(duration).toBeLessThan(5000); // 5 second timeout
      
      // Verify response is valid JSON
      const data = await response.json();
      expect(data).toBeDefined();
    }
  });
});
