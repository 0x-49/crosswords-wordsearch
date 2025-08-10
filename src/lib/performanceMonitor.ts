// Performance monitoring and error tracking utility
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private errors: Array<{ timestamp: Date; error: string; page: string }> = [];
  private performanceMetrics: Array<{ timestamp: Date; metric: string; value: number; page: string }> = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Track page load performance
  trackPageLoad(pageName: string): void {
    if (typeof window === 'undefined') return;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      const firstPaint = performance.getEntriesByName('first-paint')[0]?.startTime || 0;
      const firstContentfulPaint = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;

      this.recordMetric('page_load_time', loadTime, pageName);
      this.recordMetric('dom_content_loaded', domContentLoaded, pageName);
      this.recordMetric('first_paint', firstPaint, pageName);
      this.recordMetric('first_contentful_paint', firstContentfulPaint, pageName);

      // Log performance warnings
      if (loadTime > 3000) {
        console.warn(`⚠️ Slow page load detected: ${pageName} took ${loadTime}ms`);
        this.recordError(`Slow page load: ${loadTime}ms`, pageName);
      }
    }
  }

  // Track API call performance
  trackApiCall(endpoint: string, duration: number, status: number): void {
    this.recordMetric('api_response_time', duration, endpoint);
    
    if (duration > 2000) {
      console.warn(`⚠️ Slow API response: ${endpoint} took ${duration}ms`);
      this.recordError(`Slow API response: ${duration}ms`, endpoint);
    }

    if (status >= 400) {
      console.error(`❌ API error: ${endpoint} returned ${status}`);
      this.recordError(`API error: ${status}`, endpoint);
    }
  }

  // Track JavaScript errors
  trackError(error: Error, page: string): void {
    console.error('❌ JavaScript Error:', error.message, error.stack);
    this.recordError(error.message, page);
  }

  // Track memory usage
  trackMemoryUsage(pageName: string): void {
    if (typeof window === 'undefined') return;

    const memory = (performance as any).memory;
    if (memory) {
      const usedMemory = memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
      this.recordMetric('memory_usage_mb', usedMemory, pageName);

      if (usedMemory > 100) {
        console.warn(`⚠️ High memory usage detected: ${usedMemory.toFixed(2)}MB on ${pageName}`);
        this.recordError(`High memory usage: ${usedMemory.toFixed(2)}MB`, pageName);
      }
    }
  }

  // Track Core Web Vitals
  trackWebVitals(pageName: string): void {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.recordMetric('lcp', lastEntry.startTime, pageName);
      
      if (lastEntry.startTime > 2500) {
        console.warn(`⚠️ Poor LCP: ${lastEntry.startTime}ms on ${pageName}`);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        this.recordMetric('fid', entry.processingStart - entry.startTime, pageName);
        
        if (entry.processingStart - entry.startTime > 100) {
          console.warn(`⚠️ Poor FID: ${entry.processingStart - entry.startTime}ms on ${pageName}`);
        }
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      this.recordMetric('cls', clsValue, pageName);
      
      if (clsValue > 0.1) {
        console.warn(`⚠️ Poor CLS: ${clsValue} on ${pageName}`);
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Record a performance metric
  private recordMetric(metric: string, value: number, page: string): void {
    this.performanceMetrics.push({
      timestamp: new Date(),
      metric,
      value,
      page
    });

    // Keep only last 100 metrics to prevent memory bloat
    if (this.performanceMetrics.length > 100) {
      this.performanceMetrics = this.performanceMetrics.slice(-100);
    }
  }

  // Record an error
  private recordError(error: string, page: string): void {
    this.errors.push({
      timestamp: new Date(),
      error,
      page
    });

    // Keep only last 50 errors
    if (this.errors.length > 50) {
      this.errors = this.errors.slice(-50);
    }
  }

  // Get performance report
  getPerformanceReport(): {
    errors: Array<{ timestamp: Date; error: string; page: string }>;
    metrics: Array<{ timestamp: Date; metric: string; value: number; page: string }>;
    summary: {
      totalErrors: number;
      avgPageLoadTime: number;
      avgApiResponseTime: number;
      slowestPages: string[];
      errorPages: string[];
    };
  } {
    const pageLoadMetrics = this.performanceMetrics.filter(m => m.metric === 'page_load_time');
    const apiMetrics = this.performanceMetrics.filter(m => m.metric === 'api_response_time');

    const avgPageLoadTime = pageLoadMetrics.length > 0 
      ? pageLoadMetrics.reduce((sum, m) => sum + m.value, 0) / pageLoadMetrics.length 
      : 0;

    const avgApiResponseTime = apiMetrics.length > 0
      ? apiMetrics.reduce((sum, m) => sum + m.value, 0) / apiMetrics.length
      : 0;

    // Find slowest pages
    const pageLoadTimes = new Map<string, number[]>();
    pageLoadMetrics.forEach(m => {
      if (!pageLoadTimes.has(m.page)) {
        pageLoadTimes.set(m.page, []);
      }
      pageLoadTimes.get(m.page)!.push(m.value);
    });

    const slowestPages = Array.from(pageLoadTimes.entries())
      .map(([page, times]) => ({
        page,
        avgTime: times.reduce((sum, time) => sum + time, 0) / times.length
      }))
      .sort((a, b) => b.avgTime - a.avgTime)
      .slice(0, 5)
      .map(p => p.page);

    // Find pages with most errors
    const errorCounts = new Map<string, number>();
    this.errors.forEach(e => {
      errorCounts.set(e.page, (errorCounts.get(e.page) || 0) + 1);
    });

    const errorPages = Array.from(errorCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(p => p[0]);

    return {
      errors: this.errors,
      metrics: this.performanceMetrics,
      summary: {
        totalErrors: this.errors.length,
        avgPageLoadTime,
        avgApiResponseTime,
        slowestPages,
        errorPages
      }
    };
  }

  // Clear all data
  clear(): void {
    this.errors = [];
    this.performanceMetrics = [];
  }
}

// Global error handler
export function setupGlobalErrorHandling(): void {
  if (typeof window === 'undefined') return;

  const monitor = PerformanceMonitor.getInstance();

  // Catch unhandled JavaScript errors
  window.addEventListener('error', (event) => {
    monitor.trackError(event.error || new Error(event.message), window.location.pathname);
  });

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    monitor.trackError(new Error(event.reason), window.location.pathname);
  });

  // Track page visibility changes (detect when user leaves/returns)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      monitor.trackMemoryUsage(window.location.pathname);
    }
  });
}

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const monitor = PerformanceMonitor.getInstance();

  const trackPageLoad = (pageName: string) => {
    monitor.trackPageLoad(pageName);
    monitor.trackWebVitals(pageName);
    monitor.trackMemoryUsage(pageName);
  };

  const trackApiCall = (endpoint: string, duration: number, status: number) => {
    monitor.trackApiCall(endpoint, duration, status);
  };

  const getReport = () => monitor.getPerformanceReport();

  return {
    trackPageLoad,
    trackApiCall,
    getReport
  };
}
