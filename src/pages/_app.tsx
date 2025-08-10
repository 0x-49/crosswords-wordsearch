import React from 'react';
import type { AppProps } from 'next/app'
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import Head from 'next/head';

// Simplified AuthContext for immediate functionality
const AuthContext = React.createContext({
  user: null,
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  loading: false
});

export const useAuth = () => React.useContext(AuthContext);

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize theme
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(theme);
    
    // Performance monitoring
    if (typeof window !== 'undefined') {
      // Core Web Vitals monitoring
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            console.log('Page Load Time:', entry.duration);
          }
        }
      });
      observer.observe({ entryTypes: ['navigation'] });
    }
    
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const authValue = {
    user,
    signIn: async () => { setLoading(true); /* Placeholder */ setLoading(false); },
    signOut: async () => { setUser(null); },
    signUp: async () => { setLoading(true); /* Placeholder */ setLoading(false); },
    loading
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
      </Head>
      <AuthContext.Provider value={authValue}>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <Component {...pageProps} />
        </div>
      </AuthContext.Provider>
    </>
  )
}