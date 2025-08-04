import { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
  structuredData?: object;
}

const Layout = ({ 
  children, 
  title = "WordCraft - Professional Word Search Book Generator",
  description = "Create stunning, personalized word search puzzle books for KDP publishing. Modern design, AI-powered generation, and professional results.",
  keywords = "word search, crossword, puzzle book, KDP publishing, Amazon publishing, puzzle generator, word games",
  ogImage = "https://wordcraft.com/og-image.jpg",
  ogType = "website",
  noIndex = false,
  canonicalUrl,
  structuredData
}: LayoutProps) => {
  const router = useRouter();
  const fullTitle = title.includes('WordCraft') ? title : `${title} | WordCraft`;
  const currentUrl = `https://wordcraft.com${router.asPath}`;
  const canonical = canonicalUrl || currentUrl;

  // Default structured data
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WordCraft",
    "description": description,
    "url": "https://wordcraft.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1250"
    },
    "creator": {
      "@type": "Organization",
      "name": "WordCraft",
      "url": "https://wordcraft.com"
    }
  };
  
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="WordCraft" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonical} />
        
        {/* Enhanced Robots Meta */}
        <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"} />
        
        {/* Open Graph Enhanced */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="WordCraft" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Enhanced */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@wordcraft" />
        <meta name="twitter:creator" content="@wordcraft" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WordCraft" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://api.wordcraft.com" />
        <link rel="dns-prefetch" href="https://cdn.wordcraft.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData || defaultStructuredData)
          }}
        />
        
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "WordCraft",
              "description": "Professional word search and crossword puzzle book generator for KDP publishing",
              "url": "https://wordcraft.com",
              "logo": "https://wordcraft.com/images/logo.png",
              "sameAs": [
                "https://twitter.com/wordcraft",
                "https://facebook.com/wordcraft",
                "https://linkedin.com/company/wordcraft"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-012-3456",
                "contactType": "customer service",
                "email": "support@wordcraft.com",
                "availableLanguage": "English"
              }
            })
          }}
        />
        
        {/* Website Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "WordCraft",
              "url": "https://wordcraft.com",
              "description": "Professional word search and crossword puzzle book generator for KDP publishing",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://wordcraft.com/help?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        {/* Skip Links for Accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <a 
          href="#navigation" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
        >
          Skip to navigation
        </a>
        
        <Header />
        <main id="main-content" className="flex-1" role="main" aria-label="Main content">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;