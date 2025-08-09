import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const prisma = new PrismaClient();

const SITE_URL = 'https://crossword-wordsearch.com';

// Generate SEO-friendly slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function generateSitemap() {
  try {
    console.log('🗺️ GENERATING COMPREHENSIVE SITEMAP');
    console.log('===================================');

    // Static pages
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/features', priority: '0.9', changefreq: 'monthly' },
      { url: '/pricing', priority: '0.9', changefreq: 'monthly' },
      { url: '/about', priority: '0.8', changefreq: 'monthly' },
      { url: '/contact', priority: '0.8', changefreq: 'monthly' },
      { url: '/dashboard', priority: '0.9', changefreq: 'weekly' },
      { url: '/book-library', priority: '0.9', changefreq: 'daily' },
      { url: '/book-generator', priority: '0.8', changefreq: 'weekly' },
      { url: '/templates', priority: '0.7', changefreq: 'weekly' },
      { url: '/help', priority: '0.7', changefreq: 'monthly' },
      { url: '/help/getting-started', priority: '0.8', changefreq: 'monthly' },
      { url: '/help/tutorials', priority: '0.7', changefreq: 'monthly' },
      { url: '/help/faq', priority: '0.7', changefreq: 'monthly' },
      { url: '/community', priority: '0.6', changefreq: 'weekly' },
      { url: '/blog', priority: '0.7', changefreq: 'weekly' },
      { url: '/glossary', priority: '0.6', changefreq: 'monthly' },
      { url: '/press', priority: '0.5', changefreq: 'monthly' },
      { url: '/careers', priority: '0.5', changefreq: 'monthly' },
      { url: '/status', priority: '0.4', changefreq: 'weekly' },
      { url: '/api-docs', priority: '0.5', changefreq: 'monthly' },
      { url: '/feedback', priority: '0.5', changefreq: 'monthly' },
      { url: '/sitemap', priority: '0.3', changefreq: 'weekly' },
      { url: '/login', priority: '0.6', changefreq: 'monthly' },
      { url: '/signup', priority: '0.6', changefreq: 'monthly' },
      { url: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
      { url: '/terms', priority: '0.4', changefreq: 'yearly' },
      { url: '/cookies', priority: '0.3', changefreq: 'yearly' },
      { url: '/gdpr', priority: '0.3', changefreq: 'yearly' },
      { url: '/accessibility', priority: '0.3', changefreq: 'yearly' },
    ];

    console.log(`📄 Static pages: ${staticPages.length}`);

    // Get all puzzles for dynamic pages
    console.log('\n🧩 Fetching puzzle data...');
    const wordSearches = await prisma.wordSearch.findMany({
      select: {
        id: true,
        title: true,
        theme: true,
        difficulty: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'asc' }
    });

    const crosswords = await prisma.crossword.findMany({
      select: {
        id: true,
        title: true,
        theme: true,
        difficulty: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'asc' }
    });

    console.log(`🔤 Word Search puzzles: ${wordSearches.length}`);
    console.log(`🔲 Crossword puzzles: ${crosswords.length}`);

    // Get all books for dynamic pages
    console.log('\n📚 Fetching book data...');
    const books = await prisma.puzzleBook.findMany({
      select: {
        id: true,
        title: true,
        bookType: true,
        theme: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'asc' }
    });

    console.log(`📖 Books: ${books.length}`);

    // Generate XML sitemap
    console.log('\n🔨 Generating XML sitemap...');
    
    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static pages
    for (const page of staticPages) {
      sitemapXml += `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`;
    }

    // Add word search puzzle pages
    for (const puzzle of wordSearches) {
      const slug = `${generateSlug(puzzle.title)}-${puzzle.id}`;
      sitemapXml += `
  <url>
    <loc>${SITE_URL}/puzzle/wordsearch/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>${puzzle.updatedAt.toISOString().split('T')[0]}</lastmod>
  </url>`;
    }

    // Add crossword puzzle pages
    for (const puzzle of crosswords) {
      const slug = `${generateSlug(puzzle.title)}-${puzzle.id}`;
      sitemapXml += `
  <url>
    <loc>${SITE_URL}/puzzle/crossword/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>${puzzle.updatedAt.toISOString().split('T')[0]}</lastmod>
  </url>`;
    }

    // Add book pages
    for (const book of books) {
      const slug = `${generateSlug(book.title)}-${book.id}`;
      const bookType = book.bookType.toLowerCase().replace('_', '-');
      sitemapXml += `
  <url>
    <loc>${SITE_URL}/book/${bookType}/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${book.updatedAt.toISOString().split('T')[0]}</lastmod>
  </url>`;
    }

    sitemapXml += `
</urlset>`;

    // Save XML sitemap
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    await fs.writeFile(sitemapPath, sitemapXml);

    // Generate robots.txt
    const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin and API routes
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /auth/callback

# Allow puzzle and book pages
Allow: /puzzle/
Allow: /book/`;

    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    await fs.writeFile(robotsPath, robotsTxt);

    // Update the sitemap page component with current stats
    const totalPages = staticPages.length + wordSearches.length + crosswords.length + books.length;
    
    console.log('\n🎉 SITEMAP GENERATION COMPLETE!');
    console.log('===============================');
    console.log(`📄 Static pages: ${staticPages.length}`);
    console.log(`🧩 Puzzle pages: ${wordSearches.length + crosswords.length}`);
    console.log(`📚 Book pages: ${books.length}`);
    console.log(`📊 Total pages: ${totalPages.toLocaleString()}`);
    console.log(`💾 XML sitemap saved to: ${sitemapPath}`);
    console.log(`🤖 Robots.txt saved to: ${robotsPath}`);

    return {
      totalPages,
      staticPages: staticPages.length,
      puzzlePages: wordSearches.length + crosswords.length,
      bookPages: books.length,
      wordSearchPages: wordSearches.length,
      crosswordPages: crosswords.length
    };

  } catch (error) {
    console.error('💥 Sitemap generation failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

generateSitemap();
