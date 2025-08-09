import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import CrosswordDisplay from '@/components/CrosswordDisplay';
import WordSearchDisplay from '@/components/WordSearchDisplay';
import InteractiveCrossword from '@/components/InteractiveCrossword';
import InteractiveWordSearch from '@/components/InteractiveWordSearch';
import { PrismaClient } from '@prisma/client';
import { 
  ArrowLeft, 
  Eye, 
  Play, 
  RotateCcw, 
  Check, 
  Lightbulb,
  Timer,
  Trophy,
  Share2,
  Calendar,
  User,
  Tag
} from 'lucide-react';

interface PuzzleData {
  id: string;
  type: 'wordsearch' | 'crossword';
  title: string;
  theme: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  gridSize: number;
  words?: string[];
  grid: any;
  solution?: any;
  clues?: any;
  createdAt: string;
  updatedAt: string;
  estimatedTime: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

interface PuzzlePageProps {
  puzzle: PuzzleData | null;
  error?: string;
}

export default function PuzzlePage({ puzzle: initialPuzzle, error }: PuzzlePageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { type, id } = router.query;
  
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(initialPuzzle);
  const [loading, setLoading] = useState(!initialPuzzle);
  const [gameMode, setGameMode] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // If puzzle failed to load on server side, show error
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Puzzle Not Found</h1>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={() => router.push('/dashboard')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!puzzle) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Loading Puzzle...</h1>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const handleGameModeToggle = (enabled: boolean) => {
    setGameMode(enabled);
    if (enabled && !startTime) {
      setStartTime(new Date());
    }
  };

  const handlePuzzleComplete = () => {
    if (!endTime) {
      setEndTime(new Date());
      setIsCompleted(true);
      toast.success('Congratulations! Puzzle completed!');
    }
  };

  const resetPuzzle = () => {
    setStartTime(null);
    setEndTime(null);
    setIsCompleted(false);
    setShowSolution(false);
    if (gameMode) {
      setStartTime(new Date());
    }
  };

  const getElapsedTime = () => {
    if (!startTime) return '00:00';
    const end = endTime || new Date();
    const elapsed = Math.floor((end.getTime() - startTime.getTime()) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const sharePuzzle = async () => {
    try {
      await navigator.share({
        title: puzzle?.title,
        text: `Check out this ${puzzle?.type} puzzle: ${puzzle?.title}`,
        url: window.location.href
      });
    } catch (error) {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast.success('Puzzle URL copied to clipboard!');
    }
  };

  return (
    <Layout>
      <Head>
        <title>{puzzle.seoTitle}</title>
        <meta name="description" content={puzzle.seoDescription} />
        <meta name="keywords" content={puzzle.keywords.join(', ')} />
        <meta property="og:title" content={puzzle.seoTitle} />
        <meta property="og:description" content={puzzle.seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="article:section" content={puzzle.type === 'wordsearch' ? 'Word Search Puzzles' : 'Crossword Puzzles'} />
        <meta property="article:tag" content={puzzle.theme} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={puzzle.seoTitle} />
        <meta name="twitter:description" content={puzzle.seoDescription} />
        <link rel="canonical" href={`https://crossword-wordsearch.com/puzzle/${puzzle.type}/${puzzle.id}`} />
      </Head>
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <header className="border-b bg-card">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold">{puzzle.title}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{puzzle.theme}</Badge>
                      <Badge className={getDifficultyColor(puzzle.difficulty)}>
                        {puzzle.difficulty}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Est. {puzzle.estimatedTime}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {startTime && (
                    <div className="flex items-center gap-2 text-sm">
                      <Timer className="h-4 w-4" />
                      <span className="font-mono">{getElapsedTime()}</span>
                    </div>
                  )}
                  
                  {isCompleted && (
                    <div className="flex items-center gap-2 text-green-600">
                      <Trophy className="h-4 w-4" />
                      <span className="text-sm font-medium">Completed!</span>
                    </div>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={sharePuzzle}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Controls Sidebar */}
              <motion.div 
                className="lg:col-span-1"
                initial="initial"
                animate="animate"
                variants={fadeInUp}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Puzzle Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Game Mode Toggle */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="game-mode" className="text-sm font-medium">
                          Interactive Mode
                        </Label>
                        <Switch
                          id="game-mode"
                          checked={gameMode}
                          onCheckedChange={handleGameModeToggle}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {gameMode ? 'Play interactively with timer and progress tracking' : 'View puzzle in preview mode'}
                      </p>
                    </div>

                    {/* Solution Toggle */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-solution" className="text-sm font-medium">
                          Show Solution
                        </Label>
                        <Switch
                          id="show-solution"
                          checked={showSolution}
                          onCheckedChange={setShowSolution}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {showSolution ? 'Solution is visible' : 'Solution is hidden'}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      {gameMode && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetPuzzle}
                          className="w-full"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSolution(!showSolution)}
                        className="w-full"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {showSolution ? 'Hide' : 'Show'} Solution
                      </Button>
                    </div>

                    {/* Puzzle Info */}
                    <div className="pt-4 border-t space-y-2">
                      <h4 className="font-medium text-sm">Puzzle Info</h4>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div>Type: {puzzle.type === 'wordsearch' ? 'Word Search' : 'Crossword'}</div>
                        <div>Theme: {puzzle.theme}</div>
                        <div>Difficulty: {puzzle.difficulty}</div>
                        <div>Est. Time: {puzzle.estimatedTime}</div>
                      </div>
                    </div>

                    {/* Game Stats */}
                    {gameMode && startTime && (
                      <div className="pt-4 border-t space-y-2">
                        <h4 className="font-medium text-sm">Game Stats</h4>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div>Time: {getElapsedTime()}</div>
                          <div>Status: {isCompleted ? 'Completed' : 'In Progress'}</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Puzzle Content */}
              <motion.div 
                className="lg:col-span-3"
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{puzzle.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {puzzle.description}
                        </p>
                      </div>
                      {gameMode && (
                        <div className="flex items-center gap-2">
                          <Play className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium text-green-600">
                            Interactive Mode
                          </span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {puzzle.type === 'wordsearch' ? (
                      gameMode ? (
                        <InteractiveWordSearch
                          wordSearch={{
                            grid: JSON.parse(puzzle.grid),
                            words: puzzle.words || [],
                            placements: puzzle.solution ? JSON.parse(puzzle.solution) : {}
                          }}
                          title={puzzle.title}
                          theme={puzzle.theme}
                          difficulty={puzzle.difficulty}
                          onComplete={handlePuzzleComplete}
                        />
                      ) : (
                        <WordSearchDisplay
                          wordSearch={{
                            grid: JSON.parse(puzzle.grid),
                            words: puzzle.words || [],
                            placements: puzzle.solution ? JSON.parse(puzzle.solution) : {}
                          }}
                          title={puzzle.title}
                          theme={puzzle.theme}
                          difficulty={puzzle.difficulty}
                          showSolution={showSolution}
                        />
                      )
                    ) : (
                      gameMode ? (
                        <InteractiveCrossword
                          crossword={{
                            grid: puzzle.grid,
                            clues: puzzle.clues || { across: {}, down: {} },
                            size: puzzle.gridSize
                          }}
                          title={puzzle.title}
                          theme={puzzle.theme}
                          difficulty={puzzle.difficulty}
                          onComplete={handlePuzzleComplete}
                        />
                      ) : (
                        <CrosswordDisplay
                          crossword={{
                            grid: puzzle.grid,
                            clues: puzzle.clues || { across: {}, down: {} },
                            size: puzzle.gridSize
                          }}
                          title={puzzle.title}
                          theme={puzzle.theme}
                          difficulty={puzzle.difficulty}
                          showSolution={showSolution}
                        />
                      )
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

// Extract puzzle ID from SEO-friendly URL
function extractPuzzleId(id: string): string {
  // Handle both old format (puz_ws_00001) and new format (animals-in-the-zoo-puz_ws_00001)
  const parts = id.split('-');
  const lastPart = parts[parts.length - 1];
  
  // If it's already in the correct format, return it
  if (lastPart.startsWith('puz_')) {
    return lastPart;
  }
  
  // Otherwise, assume it's the old format
  return id;
}

export const getServerSideProps: GetServerSideProps<PuzzlePageProps> = async (context) => {
  const { type, id } = context.params!;
  
  if (!type || !id || typeof type !== 'string' || typeof id !== 'string') {
    return {
      notFound: true,
    };
  }

  // Validate puzzle type
  if (type !== 'wordsearch' && type !== 'crossword') {
    return {
      notFound: true,
    };
  }

  try {
    const prisma = new PrismaClient();
    const puzzleId = extractPuzzleId(id);
    
    let puzzle: any = null;
    
    if (type === 'wordsearch') {
      puzzle = await prisma.wordSearch.findUnique({
        where: { id: puzzleId },
        select: {
          id: true,
          title: true,
          theme: true,
          difficulty: true,
          gridSize: true,
          words: true,
          grid: true,
          solution: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } else {
      puzzle = await prisma.crossword.findUnique({
        where: { id: puzzleId },
        select: {
          id: true,
          title: true,
          theme: true,
          difficulty: true,
          gridSize: true,
          grid: true,
          clues: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

    await prisma.$disconnect();

    if (!puzzle) {
      return {
        notFound: true,
      };
    }

    // Generate estimated time based on difficulty and type
    const getEstimatedTime = (difficulty: string, puzzleType: string) => {
      if (puzzleType === 'wordsearch') {
        return difficulty === 'Easy' ? '5-10 min' : difficulty === 'Medium' ? '10-15 min' : '15-25 min';
      } else {
        return difficulty === 'Easy' ? '8-15 min' : difficulty === 'Medium' ? '15-25 min' : '25-40 min';
      }
    };

    // Generate SEO metadata
    const seoTitle = `${puzzle.title} - ${puzzle.difficulty} ${puzzle.theme} ${type === 'wordsearch' ? 'Word Search' : 'Crossword'} Puzzle`;
    const seoDescription = `Solve this ${puzzle.difficulty.toLowerCase()} ${puzzle.theme.toLowerCase()} ${type === 'wordsearch' ? 'word search' : 'crossword'} puzzle. ${type === 'wordsearch' ? `Find all ${puzzle.words?.length || 15} hidden words` : 'Complete the crossword using the provided clues'}. Perfect for puzzle enthusiasts!`;
    const keywords = [
      type === 'wordsearch' ? 'word search' : 'crossword',
      'puzzle',
      puzzle.theme.toLowerCase(),
      puzzle.difficulty.toLowerCase(),
      'brain game',
      'word game',
      'online puzzle',
      'free puzzle'
    ];

    // Check if the current URL matches the SEO-friendly format
    const expectedSlug = `${generateSlug(puzzle.title)}-${puzzle.id}`;
    if (id !== puzzle.id && id !== expectedSlug) {
      // Redirect to SEO-friendly URL
      return {
        redirect: {
          destination: `/puzzle/${type}/${expectedSlug}`,
          permanent: true,
        },
      };
    }

    const puzzleData: PuzzleData = {
      id: puzzle.id,
      type: type as 'wordsearch' | 'crossword',
      title: puzzle.title,
      theme: puzzle.theme,
      difficulty: puzzle.difficulty as 'Easy' | 'Medium' | 'Hard',
      gridSize: puzzle.gridSize,
      words: puzzle.words,
      grid: puzzle.grid,
      solution: puzzle.solution,
      clues: puzzle.clues,
      createdAt: puzzle.createdAt.toISOString(),
      updatedAt: puzzle.updatedAt.toISOString(),
      estimatedTime: getEstimatedTime(puzzle.difficulty, type),
      description: seoDescription,
      seoTitle,
      seoDescription,
      keywords,
    };

    return {
      props: {
        puzzle: puzzleData,
      },
    };
  } catch (error) {
    console.error('Error fetching puzzle:', error);
    return {
      props: {
        puzzle: null,
        error: 'Failed to load puzzle. Please try again later.',
      },
    };
  }
};