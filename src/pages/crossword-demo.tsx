import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import CrosswordDisplay from '@/components/CrosswordDisplay';
import CrosswordPreview from '@/components/CrosswordPreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Shuffle, Eye, EyeOff } from 'lucide-react';
import { generateCrosswordPuzzle, CrosswordResult } from '@/utils/crosswordGenerator';
import { getRandomCrosswordClues } from '@/utils/expandedThemes';
import { motion } from 'framer-motion';

const DEMO_THEMES = ['Animals', 'Nature', 'Food', 'Sports', 'Colors'];
const DIFFICULTIES: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium', 'Hard'];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

export default function CrosswordDemo() {
  const { user } = useAuth();
  const [crossword, setCrossword] = useState<CrosswordResult | null>(null);
  const [currentTheme, setCurrentTheme] = useState('Animals');
  const [currentDifficulty, setCurrentDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [showSolution, setShowSolution] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateNewCrossword = async () => {
    setLoading(true);
    try {
      const clueCount = currentDifficulty === 'Easy' ? 8 : currentDifficulty === 'Medium' ? 12 : 15;
      const clues = getRandomCrosswordClues(currentTheme, clueCount);
      
      const newCrossword = generateCrosswordPuzzle(clues, currentDifficulty, 15);
      setCrossword(newCrossword);
      setShowSolution(false);
    } catch (error) {
      console.error('Error generating crossword:', error);
    } finally {
      setLoading(false);
    }
  };

  const randomizeSettings = () => {
    const randomTheme = DEMO_THEMES[Math.floor(Math.random() * DEMO_THEMES.length)];
    const randomDifficulty = DIFFICULTIES[Math.floor(Math.random() * DIFFICULTIES.length)];
    
    setCurrentTheme(randomTheme);
    setCurrentDifficulty(randomDifficulty);
  };

  useEffect(() => {
    generateNewCrossword();
  }, [currentTheme, currentDifficulty]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Enhanced Crossword Display</h1>
                <p className="text-muted-foreground mt-2">
                  Experience the new beautiful crossword design inspired by professional puzzle books
                </p>
              </div>
              <Button
                onClick={() => window.history.back()}
                variant="outline"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Controls */}
          <motion.div 
            className="mb-8 space-y-6"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <Card>
              <CardHeader>
                <CardTitle>Crossword Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Theme Selection */}
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {DEMO_THEMES.map((theme) => (
                        <Button
                          key={theme}
                          variant={currentTheme === theme ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentTheme(theme)}
                          disabled={loading}
                        >
                          {theme}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty Selection */}
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {DIFFICULTIES.map((difficulty) => (
                        <Button
                          key={difficulty}
                          variant={currentDifficulty === difficulty ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentDifficulty(difficulty)}
                          disabled={loading}
                        >
                          {difficulty}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Label>Actions</Label>
                    <div className="space-y-2">
                      <Button
                        onClick={generateNewCrossword}
                        disabled={loading}
                        className="w-full"
                        size="sm"
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ) : (
                          <Shuffle className="h-4 w-4 mr-2" />
                        )}
                        Generate New
                      </Button>
                      <Button
                        onClick={randomizeSettings}
                        variant="outline"
                        className="w-full"
                        size="sm"
                        disabled={loading}
                      >
                        <Shuffle className="h-4 w-4 mr-2" />
                        Random Settings
                      </Button>
                    </div>
                  </div>

                  {/* Display Options */}
                  <div className="space-y-2">
                    <Label>Display Options</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-solution"
                        checked={showSolution}
                        onCheckedChange={setShowSolution}
                      />
                      <Label htmlFor="show-solution" className="text-sm">
                        {showSolution ? (
                          <>
                            <EyeOff className="h-4 w-4 inline mr-1" />
                            Hide Solution
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 inline mr-1" />
                            Show Solution
                          </>
                        )}
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Current Settings Display */}
          <motion.div 
            className="mb-8"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-4 justify-center">
              <Badge variant="secondary" className="px-4 py-2">
                Theme: {currentTheme}
              </Badge>
              <Badge 
                className={`px-4 py-2 ${
                  currentDifficulty === 'Easy' ? 'bg-green-500' :
                  currentDifficulty === 'Medium' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
              >
                Difficulty: {currentDifficulty}
              </Badge>
              {crossword && (
                <Badge variant="outline" className="px-4 py-2">
                  {crossword.clues.length} Clues
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Crossword Display */}
          {crossword && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CrosswordDisplay
                crossword={crossword}
                title={`${currentTheme} Crossword Puzzle`}
                theme={currentTheme}
                difficulty={currentDifficulty}
                showSolution={showSolution}
                className="mb-12"
              />
            </motion.div>
          )}

          {/* Preview Component Demo */}
          {crossword && (
            <motion.div
              className="mt-12"
              variants={fadeInUp}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Preview Component Demo</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    This is how crosswords appear in the book library grid
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="max-w-sm mx-auto">
                    <CrosswordPreview
                      crossword={crossword}
                      title={`${currentTheme} Crossword`}
                      difficulty={currentDifficulty}
                      theme={currentTheme}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Generating beautiful crossword...</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}