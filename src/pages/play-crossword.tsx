import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import Link from 'next/link';
import InteractiveCrossword from '@/components/InteractiveCrossword';
import { generateCrosswordPuzzle, CrosswordResult } from '@/utils/crosswordGenerator';
import { WORD_THEMES } from '@/utils/wordSearchGenerator';
import {
  Play,
  ArrowLeft,
  Shuffle,
  Settings,
  Trophy,
  Clock,
  Target,
  Zap,
  Crown,
  Gamepad2,
  Sparkles
} from 'lucide-react';

interface GameStats {
  timeElapsed: number;
  correctAnswers: number;
  totalAnswers: number;
  hintsUsed: number;
  score: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

export default function PlayCrossword() {
  const { user } = useAuth();
  const [currentCrossword, setCurrentCrossword] = useState<CrosswordResult | null>(null);
  const [gameConfig, setGameConfig] = useState({
    theme: 'Animals',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    size: 15
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats[]>([]);
  const [showConfig, setShowConfig] = useState(true);

  // Generate a new crossword
  const generateNewCrossword = async () => {
    setIsGenerating(true);
    try {
      // Get words for the selected theme
      const themeWords = WORD_THEMES[gameConfig.theme as keyof typeof WORD_THEMES] || WORD_THEMES.Animals;
      
      // Create word-clue pairs (using word as clue for demo)
      const wordClues = themeWords.slice(0, 15).map(word => ({
        word: word.toUpperCase(),
        clue: `A word related to ${gameConfig.theme.toLowerCase()}: ${word.toLowerCase()}`
      }));

      // Generate crossword
      const crossword = generateCrosswordPuzzle(wordClues, gameConfig.difficulty, gameConfig.size);
      
      setCurrentCrossword(crossword);
      setShowConfig(false);
      toast.success('New crossword generated!');
    } catch (error) {
      console.error('Error generating crossword:', error);
      toast.error('Failed to generate crossword. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle game completion
  const handleGameComplete = (stats: GameStats) => {
    setGameStats(prev => [...prev, stats]);
    
    // Save to localStorage for persistence
    const savedStats = localStorage.getItem('crossword-stats');
    const allStats = savedStats ? JSON.parse(savedStats) : [];
    allStats.push({
      ...stats,
      theme: gameConfig.theme,
      difficulty: gameConfig.difficulty,
      completedAt: new Date().toISOString()
    });
    localStorage.setItem('crossword-stats', JSON.stringify(allStats));
  };

  // Load saved stats on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('crossword-stats');
    if (savedStats) {
      try {
        const stats = JSON.parse(savedStats);
        setGameStats(stats);
      } catch (error) {
        console.error('Error loading saved stats:', error);
      }
    }
  }, []);

  // Calculate best stats
  const bestTime = gameStats.length > 0 ? Math.min(...gameStats.map(s => s.timeElapsed)) : 0;
  const bestScore = gameStats.length > 0 ? Math.max(...gameStats.map(s => s.score)) : 0;
  const totalGames = gameStats.length;
  const avgScore = totalGames > 0 ? Math.round(gameStats.reduce((sum, s) => sum + s.score, 0) / totalGames) : 0;

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!showConfig && currentCrossword) {
    return (
      <div className="min-h-screen bg-background">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 animated-gradient opacity-3" />
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-info/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Header */}
        <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="container-fluid py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setShowConfig(true)}
                  variant="outline"
                  size="sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Menu
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">Interactive Crossword</h1>
                  <p className="text-sm text-muted-foreground">
                    {gameConfig.theme} • {gameConfig.difficulty} • {gameConfig.size}×{gameConfig.size}
                  </p>
                </div>
              </div>
              <Button
                onClick={generateNewCrossword}
                disabled={isGenerating}
                variant="outline"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                New Puzzle
              </Button>
            </div>
          </div>
        </header>

        <InteractiveCrossword
          crossword={currentCrossword}
          title={`${gameConfig.theme} Crossword`}
          theme={gameConfig.theme}
          difficulty={gameConfig.difficulty}
          onComplete={handleGameComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 animated-gradient opacity-3" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-info/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container-fluid py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gradient">Interactive Crossword</h1>
                <p className="text-sm text-muted-foreground">Play crosswords online with full interactivity</p>
              </div>
              <Badge variant="secondary" className="px-4 py-2 rounded-full shadow-soft">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Play Mode
              </Badge>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" size="lg">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container-fluid py-12">
        {/* Welcome Section */}
        <motion.div 
          className="text-center mb-12"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="heading-md mb-4">
              Welcome to Interactive Crossword Gaming
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience crosswords like never before with our fully interactive online game mode. 
              Click, type, and solve with hints, timers, and scoring!
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Configuration */}
          <div className="lg:col-span-2">
            <motion.div variants={fadeInUp}>
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Game Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Theme</label>
                      <Select
                        value={gameConfig.theme}
                        onValueChange={(value) => setGameConfig({ ...gameConfig, theme: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(WORD_THEMES).map(theme => (
                            <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Difficulty</label>
                      <Select
                        value={gameConfig.difficulty}
                        onValueChange={(value: 'Easy' | 'Medium' | 'Hard') => 
                          setGameConfig({ ...gameConfig, difficulty: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Grid Size</label>
                      <Select
                        value={gameConfig.size.toString()}
                        onValueChange={(value) => 
                          setGameConfig({ ...gameConfig, size: parseInt(value) })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10×10 (Small)</SelectItem>
                          <SelectItem value="15">15×15 (Standard)</SelectItem>
                          <SelectItem value="20">20×20 (Large)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* Game Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800">Live Timer</h4>
                        <p className="text-sm text-blue-600">Track your solving time</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-800">Smart Hints</h4>
                        <p className="text-sm text-yellow-600">Get help when stuck</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800">Auto-Check</h4>
                        <p className="text-sm text-green-600">Instant feedback on answers</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-800">Scoring</h4>
                        <p className="text-sm text-purple-600">Compete for high scores</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={generateNewCrossword}
                      disabled={isGenerating}
                      size="lg"
                      className="btn-gradient px-8"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5 mr-2" />
                          Start Playing
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Stats Panel */}
          <div className="space-y-6">
            {/* Personal Stats */}
            <motion.div variants={fadeInUp}>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <Crown className="h-5 w-5" />
                    Your Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Games Played:</span>
                      <span className="font-bold text-purple-700">{totalGames}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Best Time:</span>
                      <span className="font-mono font-bold text-green-600">
                        {bestTime > 0 ? formatTime(bestTime) : '--:--'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Best Score:</span>
                      <span className="font-bold text-gold">{bestScore}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg Score:</span>
                      <span className="font-bold text-blue-600">{avgScore}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* How to Play */}
            <motion.div variants={fadeInUp}>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Zap className="h-5 w-5" />
                    How to Play
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                      <p>Click on any cell to select it and see the clue</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                      <p>Type letters to fill in your answers</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                      <p>Use arrow keys to navigate between cells</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</div>
                      <p>Click clues to jump to specific words</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">5</div>
                      <p>Use hints sparingly - they affect your score!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Games */}
            {gameStats.length > 0 && (
              <motion.div variants={fadeInUp}>
                <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Trophy className="h-5 w-5" />
                      Recent Games
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {gameStats.slice(-5).reverse().map((stat, index) => (
                        <div key={index} className="flex justify-between items-center text-sm p-2 bg-white/60 rounded">
                          <span className="font-mono">{formatTime(stat.timeElapsed)}</span>
                          <span className="font-bold text-gold">{stat.score}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}