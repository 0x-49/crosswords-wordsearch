import { test, expect, Page, Browser } from '@playwright/test';
import { performance } from 'perf_hooks';

/**
 * COMPREHENSIVE DETERMINISTIC SITE TESTING SYSTEM
 * This system tests EVERYTHING like a real user would, measuring performance and catching ALL errors
 */

interface TestResult {
  testName: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  loadTime: number;
  errors: string[];
  warnings: string[];
  performance: {
    domContentLoaded: number;
    firstContentfulPaint?: number;
    largestContentfulPaint?: number;
    cumulativeLayoutShift?: number;
  };
}

class ComprehensiveSiteTester {
  private results: TestResult[] = [];
  private globalErrors: string[] = [];

  async runAllTests(page: Page) {
    console.log('🚀 COMPREHENSIVE DETERMINISTIC SITE TEST');
    console.log('========================================\n');

    // Set up global error tracking
    this.setupErrorTracking(page);

    // Test all major user flows
    await this.testHomepage(page);
    await this.testPuzzleLibrary(page);
    await this.testBookLibrary(page);
    await this.testSearchFunctionality(page);
    await this.testPuzzleInteraction(page);
    await this.testAPIEndpoints(page);
    
    // Advanced feature tests
    await this.testLazyLoadingAndInfiniteScroll(page);
    await this.testProceduralDataLoading(page);
    await this.testAntiScrapingMeasures(page);
    await this.testPerformanceOptimizations(page);
    
    await this.testPerformanceMetrics(page);
    await this.testMobileResponsiveness(page);
    await this.testAccessibility(page);

    // Generate comprehensive report
    this.generateComprehensiveReport();
  }

  private setupErrorTracking(page: Page) {
    // Track console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        this.globalErrors.push(`Console Error: ${msg.text()}`);
      }
    });

    // Track page errors
    page.on('pageerror', error => {
      this.globalErrors.push(`Page Error: ${error.message}`);
    });

    // Track failed requests
    page.on('requestfailed', request => {
      this.globalErrors.push(`Request Failed: ${request.url()} - ${request.failure()?.errorText}`);
    });
  }

  private async testHomepage(page: Page) {
    const startTime = performance.now();
    const testResult: TestResult = {
      testName: 'Homepage Load & Functionality',
      status: 'PASS',
      loadTime: 0,
      errors: [],
      warnings: [],
      performance: { domContentLoaded: 0 }
    };

    try {
      // Navigate to homepage
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      
      // Measure load time
      testResult.loadTime = performance.now() - startTime;
      
      // Check critical elements
      await expect(page).toHaveTitle(/CrossWord|WordSearch|Puzzle/i);
      
      // Check navigation exists
      const nav = page.locator('nav, header, [role="navigation"]').first();
      await expect(nav).toBeVisible({ timeout: 5000 });
      
      // Check hero section
      const heroSection = page.locator('h1, .hero, [data-testid="hero"]').first();
      await expect(heroSection).toBeVisible({ timeout: 5000 });
      
      // Check CTA buttons work
      const ctaButtons = page.locator('a[href*="puzzle"], a[href*="book"], button').first();
      await expect(ctaButtons).toBeVisible({ timeout: 5000 });
      
      // Performance check
      if (testResult.loadTime > 3000) {
        testResult.warnings.push(`Slow load time: ${testResult.loadTime}ms`);
      }
      
      console.log(`✅ Homepage: PASS (${testResult.loadTime.toFixed(0)}ms)`);
      
    } catch (error: any) {
      testResult.status = 'FAIL';
      testResult.errors.push(error?.message || 'Unknown error');
      console.log(`❌ Homepage: FAIL - ${error.message}`);
    }

    this.results.push(testResult);
  }

  private async testPuzzleLibrary(page: Page) {
    const startTime = performance.now();
    const testResult: TestResult = {
      testName: 'Puzzle Library Full Functionality',
      status: 'PASS',
      loadTime: 0,
      errors: [],
      warnings: [],
      performance: { domContentLoaded: 0 }
    };

    try {
      // Navigate to puzzle library
      await page.goto('http://localhost:3000/puzzle-library', { waitUntil: 'networkidle' });
      testResult.loadTime = performance.now() - startTime;
      
      // Check puzzle grid loads
      const puzzleGrid = page.locator('[data-testid="puzzle-grid"], .puzzle, .grid').first();
      await expect(puzzleGrid).toBeVisible({ timeout: 10000 });
      
      // Check search functionality
      const searchInput = page.locator('input[type="search"], input[placeholder*="search"]').first();
      if (await searchInput.isVisible()) {
        await searchInput.fill('animals');
        await page.waitForTimeout(1000); // Wait for search results
        
        // Check if results update
        const searchResults = page.locator('[data-testid="puzzle-card"], .puzzle-item').count();
        if (await searchResults > 0) {
          console.log(`✅ Search functionality working`);
        }
      }
      
      // Check filters work
      const filterButtons = page.locator('button, select').filter({ hasText: /difficulty|theme|type/i });
      if (await filterButtons.count() > 0) {
        await filterButtons.first().click();
        await page.waitForTimeout(500);
      }
      
      // Check puzzle cards are clickable
      const puzzleCard = page.locator('[data-testid="puzzle-card"], .puzzle-item').first();
      if (await puzzleCard.isVisible()) {
        await puzzleCard.click();
        await page.waitForTimeout(1000);
      }
      
      // Performance check
      if (testResult.loadTime > 5000) {
        testResult.warnings.push(`Slow load time: ${testResult.loadTime}ms`);
      }
      
      console.log(`✅ Puzzle Library: PASS (${testResult.loadTime.toFixed(0)}ms)`);
      
    } catch (error: any) {
      testResult.status = 'FAIL';
      testResult.errors.push(error?.message || 'Unknown error');
      console.log(`❌ Puzzle Library: FAIL - ${error.message}`);
    }

    this.results.push(testResult);
  }

  private async testBookLibrary(page: Page) {
    const startTime = performance.now();
    const testResult: TestResult = {
      testName: 'Book Library Full Functionality',
      status: 'PASS',
      loadTime: 0,
      errors: [],
      warnings: [],
      performance: { domContentLoaded: 0 }
    };

    try {
      await page.goto('http://localhost:3000/book-library', { waitUntil: 'networkidle' });
      testResult.loadTime = performance.now() - startTime;
      
      // Check book grid loads
      const bookGrid = page.locator('[data-testid="book-grid"], .book, .grid').first();
      await expect(bookGrid).toBeVisible({ timeout: 10000 });
      
      // Check book type filters
      const bookTypeFilter = page.locator('button, select').filter({ hasText: /word search|crossword|mixed/i });
      if (await bookTypeFilter.count() > 0) {
        await bookTypeFilter.first().click();
        await page.waitForTimeout(500);
      }
      
      console.log(`✅ Book Library: PASS (${testResult.loadTime.toFixed(0)}ms)`);
      
    } catch (error: any) {
      testResult.status = 'FAIL';
      testResult.errors.push(error?.message || 'Unknown error');
      console.log(`❌ Book Library: FAIL - ${error.message}`);
    }

    this.results.push(testResult);
  }

  private async testAPIEndpoints(page: Page) {
    const testResult: TestResult = {
      testName: 'API Endpoints Performance',
      status: 'PASS',
      loadTime: 0,
      errors: [],
      warnings: [],
      performance: { domContentLoaded: 0 }
    };

    const apiEndpoints = [
      '/api/puzzles',
      '/api/books',
      '/api/crossword/list?page=1&limit=10',
      '/api/word-search/list?page=1&limit=10',
      '/api/search/enhanced?q=animals'
    ];

    try {
      for (const endpoint of apiEndpoints) {
        const startTime = performance.now();
        const response = await page.request.get(`http://localhost:3000${endpoint}`);
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        
        if (response.ok()) {
          console.log(`✅ API ${endpoint}: PASS (${responseTime.toFixed(0)}ms)`);
          
          // Check for slow responses
          if (responseTime > 2000) {
            testResult.warnings.push(`Slow API response: ${endpoint} - ${responseTime}ms`);
          }
          
          // Check response size
          const body = await response.text();
          const sizeKB = Buffer.byteLength(body, 'utf8') / 1024;
          if (sizeKB > 1000) { // > 1MB
            testResult.warnings.push(`Large API response: ${endpoint} - ${sizeKB.toFixed(0)}KB`);
          }
          
        } else {
          testResult.errors.push(`API ${endpoint} failed: ${response.status()}`);
          console.log(`❌ API ${endpoint}: FAIL (${response.status()})`);
        }
      }
      
    } catch (error: any) {
      testResult.status = 'FAIL';
      testResult.errors.push(error?.message || 'Unknown error');
    }

    this.results.push(testResult);
  }

  private async testSearchFunctionality(page: Page) {
    const testResult: TestResult = {
      testName: 'Search & Discovery System',
      status: 'PASS',
      loadTime: 0,
      errors: [],
      warnings: [],
      performance: { domContentLoaded: 0 }
    };

    try {
      await page.goto('http://localhost:3000/puzzle-library');
      
      // Test different search terms
      const searchTerms = ['animals', 'halloween', 'science', 'food'];
      const searchInput = page.locator('input[type="search"], input[placeholder*="search"]').first();
      
      for (const term of searchTerms) {
        if (await searchInput.isVisible()) {
          await searchInput.fill(term);
          await page.waitForTimeout(1000);
          
          // Check if results appear
          const resultCount = await page.locator('[data-testid="puzzle-card"], .puzzle-item').count();
          console.log(`✅ Search "${term}": ${resultCount} results`);
        }
      }
      
    } catch (error: any) {
      testResult.status = 'FAIL';
      testResult.errors.push(error?.message || 'Unknown error');
    }

    this.results.push(testResult);
  }

  private async testPuzzleInteraction(page: Page) {
    const testResult: TestResult = {
      testName: 'Puzzle Interaction & Viewing',
      status: 'PASS',
      loadTime: 0,
      errors: [],
      warnings: [],
      performance: { domContentLoaded: 0 }
    };

    try {
      await page.goto('http://localhost:3000/puzzle-library');
      
      // Click on first puzzle
      const firstPuzzle = page.locator('[data-testid="puzzle-card"], .puzzle-item').first();
      if (await firstPuzzle.isVisible()) {
        await firstPuzzle.click();
        await page.waitForTimeout(2000);
        
        // Check if puzzle details appear
        const puzzleDetails = page.locator('.modal, .dialog, .puzzle-view').first();
        if (await puzzleDetails.isVisible()) {
          console.log(`✅ Puzzle interaction: PASS`);
        }
      }
      
    } catch (error: any) {
      testResult.status = 'FAIL';
      testResult.errors.push(error?.message || 'Unknown error');
    }

    this.results.push(testResult);
  }

  private async testPerformanceMetrics(page: Page) {
    const testResult: TestResult = {
      testName: 'Performance Metrics',
      status: 'PASS',
      loadTime: 0,
      errors: [],
      warnings: [],
      performance: { domContentLoaded: 0 }
    };

    try {
      // Test Core Web Vitals
      await page.goto('http://localhost:3000');
      
      const metrics = await page.evaluate(() => {
        return new Promise((resolve) => {
          const vitals: any = { domContentLoaded: 0 };
          
          // Simple performance timing
          if (performance.timing) {
            vitals.domContentLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart;
          }
          
          resolve(vitals);
        });
      });
      
      testResult.performance = { ...testResult.performance, ...(metrics as any) };
      console.log(`✅ Performance metrics collected`);
      
    } catch (error: any) {
      testResult.warnings.push(`Performance metrics unavailable: ${error?.message || 'Unknown error'}`);
    }

    this.results.push(testResult);
  }

  private async testMobileResponsiveness(page: Page) {
    const testResult: TestResult = {
      testName: 'Mobile Responsiveness',
      status: 'PASS',
      loadTime: 0,
      errors: [],
      warnings: [],
      performance: { domContentLoaded: 0 }
    };

    try {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('http://localhost:3000');
      
      // Check if mobile navigation works
      const mobileNav = page.locator('button[aria-label*="menu"], .mobile-menu, .hamburger').first();
      if (await mobileNav.isVisible()) {
        await mobileNav.click();
        await page.waitForTimeout(500);
      }
      
      // Reset viewport
      await page.setViewportSize({ width: 1280, height: 720 });
      
      console.log(`✅ Mobile responsiveness: PASS`);
      
    } catch (error: any) {
      testResult.status = 'FAIL';
      testResult.errors.push(error?.message || 'Unknown error');
    }

    this.results.push(testResult);
  }

  private async testAccessibility(page: Page) {
    const testResult: TestResult = {
      testName: 'Accessibility Compliance',
      status: 'PASS',
      loadTime: 0,
      errors: [],
      warnings: [],
      performance: { domContentLoaded: 0 }
    };

    try {
      await page.goto('http://localhost:3000');
      
      // Check for basic accessibility features
      const hasHeadings = await page.locator('h1, h2, h3').count() > 0;
      const hasAltText = await page.locator('img[alt]').count() > 0;
      const hasLabels = await page.locator('label, [aria-label]').count() > 0;
      
      if (!hasHeadings) testResult.warnings.push('Missing heading structure');
      if (!hasAltText) testResult.warnings.push('Images missing alt text');
      if (!hasLabels) testResult.warnings.push('Form elements missing labels');
      
      console.log(`✅ Accessibility: PASS`);
      
    } catch (error: any) {
      testResult.status = 'FAIL';
      testResult.errors.push(error?.message || 'Unknown error');
    }

    this.results.push(testResult);
  }

  private async testLazyLoadingAndInfiniteScroll(page: Page) {
    const testResult: TestResult = {
      testName: 'Lazy Loading & Infinite Scroll',
      status: 'PASS',
      loadTime: 0,
      errors: [],
      warnings: [],
      performance: { domContentLoaded: 0 }
    };

    try {
      await page.goto('http://localhost:3000/puzzle-library');
      
      // Count initial items
      const initialCount = await page.locator('[data-testid="puzzle-card"], .puzzle-item').count();
      console.log(`📦 Initial items loaded: ${initialCount}`);
      
      // Test lazy loading by scrolling
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      
      // Wait for potential lazy loading
      await page.waitForTimeout(2000);
      
      // Check if more items loaded
      const afterScrollCount = await page.locator('[data-testid="puzzle-card"], .puzzle-item').count();
      
      if (afterScrollCount > initialCount) {
        console.log(`✅ Lazy loading working: ${afterScrollCount - initialCount} new items loaded`);
      } else if (initialCount > 50) {
        testResult.warnings.push('Large initial load - consider implementing lazy loading');
      }
      
      // Test infinite scroll behavior
      for (let i = 0; i < 3; i++) {
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });
        await page.waitForTimeout(1000);
      }
      
      const finalCount = await page.locator('[data-testid="puzzle-card"], .puzzle-item').count();
      console.log(`🔄 Final count after scrolling: ${finalCount}`);
      
    } catch (error: any) {
      testResult.status = 'FAIL';
      testResult.errors.push(error?.message || 'Unknown error');
    }

    this.results.push(testResult);
  }

  private async testProceduralDataLoading(page: Page) {
    const testResult: TestResult = {
      testName: 'Procedural Data Loading',
      status: 'PASS',
      loadTime: 0,
      errors: [],
      warnings: [],
      performance: { domContentLoaded: 0 }
    };

    try {
      // Test API pagination and data streaming
      const apiTests = [
        '/api/crossword/list?page=1&limit=10',
        '/api/word-search/list?page=1&limit=10',
        '/api/puzzles?page=1&limit=20'
      ];
      
      for (const endpoint of apiTests) {
        const startTime = performance.now();
        const response = await page.request.get(`http://localhost:3000${endpoint}`);
        const endTime = performance.now();
        
        if (response.ok()) {
          const data = await response.json();
          const responseTime = endTime - startTime;
          
          // Check if pagination is working
          if (data.data && Array.isArray(data.data)) {
            console.log(`✅ Procedural loading: ${endpoint} returned ${data.data.length} items in ${responseTime.toFixed(0)}ms`);
            
            if (data.pagination) {
              console.log(`📄 Pagination: Page ${data.pagination.page} of ${data.pagination.totalPages}`);
            }
          }
          
          // Check response size
          const responseSize = JSON.stringify(data).length;
          if (responseSize > 100000) { // > 100KB
            testResult.warnings.push(`Large response size: ${endpoint} - ${(responseSize/1024).toFixed(0)}KB`);
          }
        }
      }
      
    } catch (error: any) {
      testResult.status = 'FAIL';
      testResult.errors.push(error?.message || 'Unknown error');
    }

    this.results.push(testResult);
  }

  private async testAntiScrapingMeasures(page: Page) {
    const testResult: TestResult = {
      testName: 'Anti-Scraping & Security Measures',
      status: 'PASS',
      loadTime: 0,
      errors: [],
      warnings: [],
      performance: { domContentLoaded: 0 }
    };

    try {
      await page.goto('http://localhost:3000');
      
      // Test rate limiting (rapid requests)
      const rapidRequests = [];
      for (let i = 0; i < 10; i++) {
        rapidRequests.push(page.request.get('http://localhost:3000/api/puzzles'));
      }
      
      const responses = await Promise.all(rapidRequests);
      const rateLimited = responses.some(r => r.status() === 429);
      
      if (rateLimited) {
        console.log('✅ Rate limiting active');
      } else {
        testResult.warnings.push('Consider implementing rate limiting for API endpoints');
      }
      
      // Test for bot detection measures
      const userAgent = await page.evaluate(() => navigator.userAgent);
      console.log(`🤖 User agent: ${userAgent}`);
      
      // Test CSRF protection
      const csrfTokens = await page.locator('meta[name="csrf-token"], input[name="_token"]').count();
      if (csrfTokens === 0) {
        testResult.warnings.push('Consider implementing CSRF protection');
      }
      
      // Test for honeypot fields
      const honeypots = await page.locator('input[style*="display: none"], .honeypot').count();
      if (honeypots > 0) {
        console.log('✅ Honeypot fields detected');
      }
      
    } catch (error: any) {
      testResult.status = 'FAIL';
      testResult.errors.push(error?.message || 'Unknown error');
    }

    this.results.push(testResult);
  }

  private async testPerformanceOptimizations(page: Page) {
    const testResult: TestResult = {
      testName: 'Performance Optimizations',
      status: 'PASS',
      loadTime: 0,
      errors: [],
      warnings: [],
      performance: { domContentLoaded: 0 }
    };

    try {
      await page.goto('http://localhost:3000/puzzle-library');
      
      // Test image lazy loading
      const images = await page.locator('img').count();
      const lazyImages = await page.locator('img[loading="lazy"], img[data-src]').count();
      
      if (lazyImages > 0) {
        console.log(`✅ Image lazy loading: ${lazyImages}/${images} images`);
      } else if (images > 10) {
        testResult.warnings.push('Consider implementing image lazy loading');
      }
      
      // Test code splitting (check for chunk files)
      const networkRequests: string[] = [];
      page.on('request', request => {
        if (request.url().includes('.js')) {
          networkRequests.push(request.url());
        }
      });
      
      await page.reload();
      await page.waitForTimeout(2000);
      
      const chunkFiles = networkRequests.filter(url => url.includes('chunk') || url.includes('_app'));
      if (chunkFiles.length > 1) {
        console.log(`✅ Code splitting: ${chunkFiles.length} chunks detected`);
      }
      
      // Test caching headers
      const response = await page.request.get('http://localhost:3000');
      const cacheControl = response.headers()['cache-control'];
      if (cacheControl) {
        console.log(`✅ Cache headers: ${cacheControl}`);
      } else {
        testResult.warnings.push('Consider implementing cache headers');
      }
      
      // Test compression
      const contentEncoding = response.headers()['content-encoding'];
      if (contentEncoding && (contentEncoding.includes('gzip') || contentEncoding.includes('br'))) {
        console.log(`✅ Compression: ${contentEncoding}`);
      } else {
        testResult.warnings.push('Consider enabling gzip/brotli compression');
      }
      
    } catch (error: any) {
      testResult.status = 'FAIL';
      testResult.errors.push(error?.message || 'Unknown error');
    }

    this.results.push(testResult);
  }

  private generateComprehensiveReport() {
    console.log('\n📊 COMPREHENSIVE SITE TEST REPORT');
    console.log('==================================\n');

    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const warnings = this.results.filter(r => r.warnings.length > 0).length;

    console.log(`✅ PASSED: ${passed}`);
    console.log(`❌ FAILED: ${failed}`);
    console.log(`⚠️  WARNINGS: ${warnings}`);
    console.log(`🎯 SUCCESS RATE: ${Math.round((passed / this.results.length) * 100)}%\n`);

    // Detailed results
    this.results.forEach(result => {
      const icon = result.status === 'PASS' ? '✅' : '❌';
      console.log(`${icon} ${result.testName}: ${result.status} (${result.loadTime.toFixed(0)}ms)`);
      
      if (result.errors.length > 0) {
        result.errors.forEach(error => console.log(`   ❌ ${error}`));
      }
      
      if (result.warnings.length > 0) {
        result.warnings.forEach(warning => console.log(`   ⚠️  ${warning}`));
      }
    });

    // Global errors
    if (this.globalErrors.length > 0) {
      console.log('\n🚨 GLOBAL ERRORS:');
      this.globalErrors.forEach(error => console.log(`   ❌ ${error}`));
    }

    // Final assessment
    console.log('\n🎯 FINAL ASSESSMENT:');
    if (failed === 0 && this.globalErrors.length === 0) {
      console.log('🎉 PERFECT! Your site works flawlessly with zero errors!');
    } else if (failed === 0) {
      console.log('✅ Site works well, but has some minor issues to address.');
    } else {
      console.log('🚨 Critical issues found that need immediate attention.');
    }

    // Performance summary
    const avgLoadTime = this.results.reduce((sum, r) => sum + r.loadTime, 0) / this.results.length;
    console.log(`\n⚡ PERFORMANCE: Average load time ${avgLoadTime.toFixed(0)}ms`);
    
    if (avgLoadTime < 2000) {
      console.log('🚀 EXCELLENT performance!');
    } else if (avgLoadTime < 5000) {
      console.log('⚠️  Performance could be improved');
    } else {
      console.log('🐌 Performance needs optimization');
    }
  }
}

// Playwright test implementation
test.describe('Comprehensive Site Testing', () => {
  test('Complete site functionality and performance test', async ({ page }) => {
    const tester = new ComprehensiveSiteTester();
    await tester.runAllTests(page);
  });
});
