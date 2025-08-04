import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
import { 
  ArrowLeft, 
  Eye, 
  Play, 
  RotateCcw, 
  Check, 
  Lightbulb,
  Timer,
  Trophy,
  Share2
} from 'lucide-react';

interface PuzzleData {
  id: string;
  type: 'wordsearch' | 'crossword';
  title: string;
  theme: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  data: any;
  estimatedTime: string;
  description: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

export default function PuzzlePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { type, id } = router.query;
  
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [gameMode, setGameMode] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (type && id) {
      loadPuzzle();
    }
  }, [type, id]);

  const loadPuzzle = async () => {
    setLoading(true);
    try {
      // Parse the puzzle ID to extract theme and puzzle number
      const puzzleId = id as string;
      const parts = puzzleId.split('_');
      
      if (parts.length < 3) {
        toast.error('Invalid puzzle ID');
        return;
      }

      const theme = parts.slice(0, -2).join(' '); // Everything except last 2 parts
      const puzzleType = parts[parts.length - 2]; // 'ws' or 'cw'
      const puzzleNumber = parseInt(parts[parts.length - 1]); // puzzle number

      // Generate the puzzle based on theme and type
      const { getExpandedThemeDataComplete } = await import('@/utils/elderlyFriendlyThemes');
      const { generateWordSearchNames, generateCrosswordNames } = await import('@/utils/puzzleNameGenerator');
      
      const themeData = getExpandedThemeDataComplete(theme);
      if (!themeData) {
        toast.error('Theme not found');
        return;
      }

      let puzzleData: PuzzleData;
      const difficulties = ['Easy', 'Medium', 'Hard'];
      const difficulty = difficulties[(puzzleNumber - 1) % 3] as 'Easy' | 'Medium' | 'Hard';

      if (type === 'wordsearch') {
        const { WordSearchGenerator } = await import('@/utils/wordSearchGenerator');
        const wordSearchNames = generateWordSearchNames(theme);
        const wordCount = difficulty === 'Easy' ? 10 : difficulty === 'Medium' ? 15 : 20;
        
        const shuffled = [...themeData.words].sort(() => Math.random() - 0.5);
        const words = shuffled.slice(0, wordCount);
        
        const generator = new WordSearchGenerator(15);
        const wordSearch = generator.generateWordSearch({
          gridSize: 15,
          words,
          difficulty
        });

        puzzleData = {
          id: puzzleId,
          type: 'wordsearch',
          title: wordSearchNames[puzzleNumber - 1] || `${theme} Word Search ${puzzleNumber}`,
          theme,
          difficulty,
          data: wordSearch,
          estimatedTime: difficulty === 'Easy' ? '5-10 min' : difficulty === 'Medium' ? '10-15 min' : '15-25 min',
          description: `Find all the hidden words in this ${difficulty.toLowerCase()} ${theme.toLowerCase()} themed word search puzzle.`
        };
      } else {
        const { CrosswordGenerator } = await import('@/utils/crosswordGenerator');
        const crosswordNames = generateCrosswordNames(theme);
        const clueCount = difficulty === 'Easy' ? 8 : difficulty === 'Medium' ? 12 : 15;
        
        const shuffled = [...themeData.crosswordData].sort(() => Math.random() - 0.5);
        const clues = shuffled.slice(0, clueCount);
        
        const generator = new CrosswordGenerator(15);
        const crossword = generator.generateCrossword({
          size: 15,
          words: clues,
          difficulty
        });

        puzzleData = {
          id: puzzleId,
          type: 'crossword',
          title: crosswordNames[puzzleNumber - 1] || `${theme} Crossword ${puzzleNumber}`,
          theme,
          difficulty,
          data: crossword,
          estimatedTime: difficulty === 'Easy' ? '8-12 min' : difficulty === 'Medium' ? '12-18 min' : '18-30 min',
          description: `Solve this ${difficulty.toLowerCase()} ${theme.toLowerCase()} themed crossword puzzle using the provided clues.`
        };
      }

      setPuzzle(puzzleData);
    } catch (error) {
      console.error('Error loading puzzle:', error);
      toast.error('Failed to load puzzle');
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <Layout
        title="Loading Puzzle..."
        description="Loading puzzle content"
      >
        <ProtectedRoute>
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading puzzle...</p>
            </div>
          </div>
        </ProtectedRoute>
      </Layout>
    );
  }

  if (!puzzle) {
    return (
      <Layout
        title="Puzzle Not Found"
        description="The requested puzzle could not be found"
      >
        <ProtectedRoute>
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Puzzle Not Found</h1>
              <p className="text-muted-foreground mb-6">The requested puzzle could not be loaded.</p>
              <Button onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </ProtectedRoute>
      </Layout>
    );
  }

  return (
    <Layout
      title={puzzle.title}
      description={puzzle.description}
    >
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
                          wordSearch={puzzle.data}
                          title={puzzle.title}
                          theme={puzzle.theme}
                          difficulty={puzzle.difficulty}
                          showSolution={showSolution}
                          onComplete={handlePuzzleComplete}
                        />
                      ) : (
                        <WordSearchDisplay
                          wordSearch={puzzle.data}
                          title={puzzle.title}
                          theme={puzzle.theme}
                          difficulty={puzzle.difficulty}
                          showSolution={showSolution}
                        />
                      )
                    ) : (
                      gameMode ? (
                        <InteractiveCrossword
                          crossword={puzzle.data}
                          title={puzzle.title}
                          theme={puzzle.theme}
                          difficulty={puzzle.difficulty}
                          showSolution={showSolution}
                          onComplete={handlePuzzleComplete}
                        />
                      ) : (
                        <CrosswordDisplay
                          crossword={puzzle.data}
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