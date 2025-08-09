import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { PrismaClient } from '@prisma/client';
import { 
  ArrowLeft, 
  BookOpen,
  Download,
  Eye,
  Calendar,
  User,
  Tag,
  Grid,
  Clock,
  Star,
  Share2
} from 'lucide-react';

interface BookData {
  id: string;
  type: 'WORD_SEARCH' | 'CROSSWORD' | 'MIXED';
  title: string;
  subtitle?: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  totalPuzzles: number;
  estimatedTime: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  puzzles: Array<{
    id: string;
    title: string;
    theme: string;
    difficulty: string;
    type: 'wordsearch' | 'crossword';
  }>;
}

interface BookPageProps {
  book: BookData | null;
  error?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

export default function BookPage({ book: initialBook, error }: BookPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { type, id } = router.query;
  
  const [book, setBook] = useState<BookData | null>(initialBook);
  const [showPreview, setShowPreview] = useState(false);

  // If book failed to load on server side, show error
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Book Not Found</h1>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={() => router.push('/book-library')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Book Library
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!book) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Loading Book...</h1>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const getBookTypeLabel = (bookType: string) => {
    switch (bookType) {
      case 'WORD_SEARCH': return 'Word Search Book';
      case 'CROSSWORD': return 'Crossword Book';
      case 'MIXED': return 'Mixed Puzzle Book';
      default: return 'Puzzle Book';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const shareBook = async () => {
    try {
      await navigator.share({
        title: book.seoTitle,
        text: book.seoDescription,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Book link copied to clipboard!');
    }
  };

  const downloadBook = () => {
    // This would trigger book download/generation
    toast.info('Book download feature coming soon!');
  };

  return (
    <Layout>
      <Head>
        <title>{book.seoTitle}</title>
        <meta name="description" content={book.seoDescription} />
        <meta name="keywords" content={book.keywords.join(', ')} />
        <meta property="og:title" content={book.seoTitle} />
        <meta property="og:description" content={book.seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="article:section" content={getBookTypeLabel(book.type)} />
        <meta property="article:tag" content={book.tags.join(', ')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={book.seoTitle} />
        <meta name="twitter:description" content={book.seoDescription} />
        <link rel="canonical" href={`https://crossword-wordsearch.com/book/${book.type.toLowerCase()}/${book.id}`} />
      </Head>
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="container mx-auto px-4 py-8">
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInUp}
              >
                <div className="flex items-center gap-4 mb-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="h-8 w-8 text-primary" />
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {getBookTypeLabel(book.type)}
                        </Badge>
                        <h1 className="text-3xl font-bold text-foreground">
                          {book.title}
                        </h1>
                        {book.subtitle && (
                          <p className="text-lg text-muted-foreground mt-1">
                            {book.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-muted-foreground text-lg mb-6">
                      {book.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {book.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={() => setShowPreview(!showPreview)} variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      {showPreview ? 'Hide Preview' : 'Preview Puzzles'}
                    </Button>
                    <Button onClick={downloadBook}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Book
                    </Button>
                    <Button onClick={shareBook} variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <motion.div 
                className="lg:col-span-1"
                initial="initial"
                animate="animate"
                variants={fadeInUp}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Book Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Difficulty</span>
                        <Badge className={getDifficultyColor(book.difficulty)}>
                          {book.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Puzzles</span>
                        <div className="flex items-center gap-1">
                          <Grid className="h-4 w-4" />
                          <span className="font-medium">{book.totalPuzzles}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Est. Time</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{book.estimatedTime}</span>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div>Type: {getBookTypeLabel(book.type)}</div>
                        <div>Created: {new Date(book.createdAt).toLocaleDateString()}</div>
                        <div>Updated: {new Date(book.updatedAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Main Content */}
              <motion.div 
                className="lg:col-span-3"
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Puzzles in this Book ({book.totalPuzzles})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {showPreview ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {book.puzzles.map((puzzle, index) => (
                          <Card key={puzzle.id} className="hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => router.push(`/puzzle/${puzzle.type}/${puzzle.id}`)}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm">{puzzle.title}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {puzzle.type === 'wordsearch' ? 'WS' : 'CW'}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{puzzle.theme}</p>
                              <div className="flex items-center justify-between">
                                <Badge className={getDifficultyColor(puzzle.difficulty)} variant="outline">
                                  {puzzle.difficulty}
                                </Badge>
                                <span className="text-xs text-muted-foreground">#{index + 1}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Ready to Start Solving?</h3>
                        <p className="text-muted-foreground mb-6">
                          This book contains {book.totalPuzzles} carefully curated {book.type.toLowerCase().replace('_', ' ')} puzzles.
                        </p>
                        <Button onClick={() => setShowPreview(true)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview All Puzzles
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
}

// Generate SEO-friendly slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Extract book ID from SEO-friendly URL
function extractBookId(id: string): string {
  // Handle both old format (book_ws_001) and new format (animals-word-search-book-book_ws_001)
  const parts = id.split('-');
  const lastPart = parts[parts.length - 1];
  
  // If it's already in the correct format, return it
  if (lastPart.startsWith('book_')) {
    return lastPart;
  }
  
  // Otherwise, assume it's the old format
  return id;
}

export const getServerSideProps: GetServerSideProps<BookPageProps> = async (context) => {
  const { type, id } = context.params!;
  
  if (!type || !id || typeof type !== 'string' || typeof id !== 'string') {
    return {
      notFound: true,
    };
  }

  // Validate book type
  const validTypes = ['word_search', 'crossword', 'mixed'];
  if (!validTypes.includes(type.toLowerCase())) {
    return {
      notFound: true,
    };
  }

  try {
    const prisma = new PrismaClient();
    const bookId = extractBookId(id);
    
    // For now, return a placeholder since we haven't generated books yet
    // This will be updated once we implement Step C
    const book = await prisma.puzzleBook.findUnique({
      where: { id: bookId },
      include: {
        wordSearches: {
          select: {
            wordSearch: {
              select: {
                id: true,
                title: true,
                theme: true,
                difficulty: true,
              }
            }
          }
        },
        crosswords: {
          select: {
            crossword: {
              select: {
                id: true,
                title: true,
                theme: true,
                difficulty: true,
              }
            }
          }
        }
      }
    });

    await prisma.$disconnect();

    if (!book) {
      return {
        notFound: true,
      };
    }

    // Transform the data for the component
    const puzzles = [
      ...book.wordSearches.map(ws => ({
        ...ws.wordSearch,
        type: 'wordsearch' as const
      })),
      ...book.crosswords.map(cs => ({
        ...cs.crossword,
        type: 'crossword' as const
      }))
    ];

    const bookData: BookData = {
      id: book.id,
      type: book.bookType as 'WORD_SEARCH' | 'CROSSWORD' | 'MIXED',
      title: book.title,
      subtitle: book.subtitle || undefined,
      description: book.description,
      difficulty: 'Medium', // Default for now
      totalPuzzles: puzzles.length,
      estimatedTime: `${Math.ceil(puzzles.length * 15)} min`, // Rough estimate
      tags: [book.bookType.replace('_', ' ').toLowerCase()],
      createdAt: book.createdAt.toISOString(),
      updatedAt: book.updatedAt.toISOString(),
      seoTitle: `${book.title} - ${getBookTypeLabel(book.bookType)} | CrossWord-WordSearch`,
      seoDescription: `${book.description} Contains ${puzzles.length} puzzles perfect for puzzle enthusiasts.`,
      keywords: [
        book.bookType.toLowerCase().replace('_', ' '),
        'puzzle book',
        'brain games',
        'word games',
        'printable puzzles'
      ],
      puzzles
    };

    return {
      props: {
        book: bookData,
      },
    };
  } catch (error) {
    console.error('Error fetching book:', error);
    return {
      props: {
        book: null,
        error: 'Failed to load book. Please try again later.',
      },
    };
  }
};

function getBookTypeLabel(bookType: string): string {
  switch (bookType) {
    case 'WORD_SEARCH': return 'Word Search Book';
    case 'CROSSWORD': return 'Crossword Book';
    case 'MIXED': return 'Mixed Puzzle Book';
    default: return 'Puzzle Book';
  }
}
