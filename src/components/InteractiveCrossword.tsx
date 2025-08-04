import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CrosswordResult, CrosswordCell, CrosswordClue } from '@/utils/crosswordGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Lightbulb,
  Trophy,
  Clock,
  Target,
  Zap,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';

interface InteractiveCrosswordProps {
  crossword: CrosswordResult;
  title: string;
  theme: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onComplete?: (stats: GameStats) => void;
}

interface GameStats {
  timeElapsed: number;
  correctAnswers: number;
  totalAnswers: number;
  hintsUsed: number;
  score: number;
}

interface CellInput {
  value: string;
  isCorrect: boolean;
  isRevealed: boolean;
}

interface SelectedCell {
  row: number;
  col: number;
  clue?: CrosswordClue;
  direction?: 'across' | 'down';
}

export function InteractiveCrossword({
  crossword,
  title,
  theme,
  difficulty,
  onComplete
}: InteractiveCrosswordProps) {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  // Grid state
  const [userInputs, setUserInputs] = useState<CellInput[][]>(() =>
    Array(crossword.size).fill(null).map(() =>
      Array(crossword.size).fill(null).map(() => ({
        value: '',
        isCorrect: false,
        isRevealed: false
      }))
    )
  );

  // Selection state
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [selectedClue, setSelectedClue] = useState<CrosswordClue | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(new Set());

  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gridRefs = useRef<(HTMLInputElement | null)[][]>(
    Array(crossword.size).fill(null).map(() => Array(crossword.size).fill(null))
  );

  // Timer effect
  useEffect(() => {
    if (gameStarted && !isPaused && !gameCompleted && startTime) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameStarted, isPaused, gameCompleted, startTime]);

  // Format time
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setStartTime(Date.now());
    setElapsedTime(0);
    toast.success('Game started! Good luck!');
  };

  // Pause/Resume game
  const togglePause = () => {
    if (isPaused) {
      setStartTime(Date.now() - elapsedTime);
    }
    setIsPaused(!isPaused);
  };

  // Reset game
  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setIsPaused(false);
    setStartTime(null);
    setElapsedTime(0);
    setHintsUsed(0);
    setSelectedCell(null);
    setSelectedClue(null);
    setHighlightedCells(new Set());
    setUserInputs(
      Array(crossword.size).fill(null).map(() =>
        Array(crossword.size).fill(null).map(() => ({
          value: '',
          isCorrect: false,
          isRevealed: false
        }))
      )
    );
    toast.info('Game reset!');
  };

  // Get clue for cell
  const getClueForCell = (row: number, col: number, direction: 'across' | 'down'): CrosswordClue | null => {
    return crossword.clues.find(clue => {
      if (clue.direction !== direction) return false;
      
      if (direction === 'across') {
        return clue.startRow === row && col >= clue.startCol && col < clue.startCol + clue.length;
      } else {
        return clue.startCol === col && row >= clue.startRow && row < clue.startRow + clue.length;
      }
    }) || null;
  };

  // Highlight cells for selected clue
  const highlightClue = (clue: CrosswordClue) => {
    const cells = new Set<string>();
    const dr = clue.direction === 'down' ? 1 : 0;
    const dc = clue.direction === 'across' ? 1 : 0;

    for (let i = 0; i < clue.length; i++) {
      const row = clue.startRow + i * dr;
      const col = clue.startCol + i * dc;
      cells.add(`${row}-${col}`);
    }

    setHighlightedCells(cells);
    setSelectedClue(clue);
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (!gameStarted || isPaused || crossword.grid[row][col].isBlack) return;

    const acrossClue = getClueForCell(row, col, 'across');
    const downClue = getClueForCell(row, col, 'down');

    // If clicking the same cell, toggle direction
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      if (selectedCell.direction === 'across' && downClue) {
        setSelectedCell({ row, col, clue: downClue, direction: 'down' });
        highlightClue(downClue);
      } else if (selectedCell.direction === 'down' && acrossClue) {
        setSelectedCell({ row, col, clue: acrossClue, direction: 'across' });
        highlightClue(acrossClue);
      }
    } else {
      // Select new cell, prefer across direction
      const clue = acrossClue || downClue;
      const direction = acrossClue ? 'across' : 'down';
      
      if (clue) {
        setSelectedCell({ row, col, clue, direction });
        highlightClue(clue);
        
        // Focus the input
        setTimeout(() => {
          gridRefs.current[row][col]?.focus();
        }, 0);
      }
    }
  };

  // Handle input change
  const handleInputChange = (row: number, col: number, value: string) => {
    if (!gameStarted || isPaused) return;

    const letter = value.toUpperCase().replace(/[^A-Z]/g, '');
    if (letter.length > 1) return;

    const newInputs = [...userInputs];
    const correctLetter = crossword.grid[row][col].letter;
    
    newInputs[row][col] = {
      value: letter,
      isCorrect: letter === correctLetter,
      isRevealed: false
    };

    setUserInputs(newInputs);

    // Auto-advance to next cell
    if (letter && selectedClue) {
      const dr = selectedClue.direction === 'down' ? 1 : 0;
      const dc = selectedClue.direction === 'across' ? 1 : 0;
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (
        nextRow >= 0 && nextRow < crossword.size &&
        nextCol >= 0 && nextCol < crossword.size &&
        !crossword.grid[nextRow][nextCol].isBlack &&
        highlightedCells.has(`${nextRow}-${nextCol}`)
      ) {
        setTimeout(() => {
          gridRefs.current[nextRow][nextCol]?.focus();
        }, 0);
      }
    }

    // Check for completion
    checkCompletion(newInputs);
  };

  // Handle key navigation
  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (!gameStarted || isPaused) return;

    let newRow = row;
    let newCol = col;

    switch (e.key) {
      case 'ArrowUp':
        newRow = Math.max(0, row - 1);
        break;
      case 'ArrowDown':
        newRow = Math.min(crossword.size - 1, row + 1);
        break;
      case 'ArrowLeft':
        newCol = Math.max(0, col - 1);
        break;
      case 'ArrowRight':
        newCol = Math.min(crossword.size - 1, col + 1);
        break;
      case 'Backspace':
        if (!userInputs[row][col].value && selectedClue) {
          // Move to previous cell in current word
          const dr = selectedClue.direction === 'down' ? -1 : 0;
          const dc = selectedClue.direction === 'across' ? -1 : 0;
          const prevRow = row + dr;
          const prevCol = col + dc;

          if (
            prevRow >= 0 && prevRow < crossword.size &&
            prevCol >= 0 && prevCol < crossword.size &&
            !crossword.grid[prevRow][prevCol].isBlack &&
            highlightedCells.has(`${prevRow}-${prevCol}`)
          ) {
            gridRefs.current[prevRow][prevCol]?.focus();
          }
        }
        return;
      default:
        return;
    }

    if (
      newRow !== row || newCol !== col &&
      !crossword.grid[newRow][newCol].isBlack
    ) {
      e.preventDefault();
      handleCellClick(newRow, newCol);
    }
  };

  // Check completion
  const checkCompletion = (inputs: CellInput[][]) => {
    let correctCount = 0;
    let totalCount = 0;

    for (let row = 0; row < crossword.size; row++) {
      for (let col = 0; col < crossword.size; col++) {
        if (!crossword.grid[row][col].isBlack) {
          totalCount++;
          if (inputs[row][col].isCorrect) {
            correctCount++;
          }
        }
      }
    }

    if (correctCount === totalCount && totalCount > 0) {
      setGameCompleted(true);
      const stats: GameStats = {
        timeElapsed: elapsedTime,
        correctAnswers: correctCount,
        totalAnswers: totalCount,
        hintsUsed,
        score: Math.max(0, 1000 - Math.floor(elapsedTime / 1000) - hintsUsed * 50)
      };
      
      toast.success('Congratulations! Puzzle completed!', {
        description: `Time: ${formatTime(elapsedTime)} | Score: ${stats.score}`
      });
      
      onComplete?.(stats);
    }
  };

  // Use hint
  const useHint = () => {
    if (!selectedClue || hintsUsed >= 3) return;

    const clue = selectedClue;
    const dr = clue.direction === 'down' ? 1 : 0;
    const dc = clue.direction === 'across' ? 1 : 0;

    // Find first empty cell in selected word
    for (let i = 0; i < clue.length; i++) {
      const row = clue.startRow + i * dr;
      const col = clue.startCol + i * dc;
      
      if (!userInputs[row][col].value) {
        const newInputs = [...userInputs];
        newInputs[row][col] = {
          value: crossword.grid[row][col].letter,
          isCorrect: true,
          isRevealed: true
        };
        setUserInputs(newInputs);
        setHintsUsed(hintsUsed + 1);
        toast.info(`Hint used! ${3 - hintsUsed - 1} hints remaining.`);
        checkCompletion(newInputs);
        return;
      }
    }

    toast.warning('No empty cells in selected word!');
  };

  // Get difficulty color
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const acrossClues = crossword.clues.filter(clue => clue.direction === 'across');
  const downClues = crossword.clues.filter(clue => clue.direction === 'down');

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 text-gradient">{title}</h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          <Badge className={`${getDifficultyColor(difficulty)} font-semibold px-4 py-2`}>
            {difficulty}
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            {theme}
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            {crossword.size}×{crossword.size}
          </Badge>
        </div>

        {/* Game Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {!gameStarted ? (
            <Button onClick={startGame} size="lg" className="btn-gradient">
              <Play className="h-5 w-5 mr-2" />
              Start Game
            </Button>
          ) : (
            <>
              <Button onClick={togglePause} variant="outline" size="lg">
                {isPaused ? <Play className="h-5 w-5 mr-2" /> : <Pause className="h-5 w-5 mr-2" />}
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button onClick={resetGame} variant="outline" size="lg">
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset
              </Button>
            </>
          )}
          
          <Button
            onClick={() => setShowSolution(!showSolution)}
            variant="outline"
            size="lg"
          >
            {showSolution ? <EyeOff className="h-5 w-5 mr-2" /> : <Eye className="h-5 w-5 mr-2" />}
            {showSolution ? 'Hide' : 'Show'} Solution
          </Button>
        </div>

        {/* Game Stats */}
        {gameStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-8 mb-6"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-mono text-lg font-bold">
                {formatTime(elapsedTime)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <span className="font-bold">
                {3 - hintsUsed} hints left
              </span>
            </div>
            {gameCompleted && (
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-gold" />
                <span className="font-bold text-gold">
                  Completed!
                </span>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Crossword Grid */}
        <div className="xl:col-span-3">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
                <Target className="h-6 w-6" />
                Interactive Crossword
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex justify-center">
                <div 
                  className="inline-grid gap-1 p-6 bg-white rounded-xl shadow-inner border-2 border-gray-100"
                  style={{ 
                    gridTemplateColumns: `repeat(${crossword.size}, 1fr)`,
                  }}
                >
                  {crossword.grid.map((row, rowIndex) =>
                    row.map((cell: CrosswordCell, colIndex: number) => {
                      const isBlack = cell.isBlack;
                      const hasNumber = cell.number && cell.number > 0;
                      const isHighlighted = highlightedCells.has(`${rowIndex}-${colIndex}`);
                      const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                      const userInput = userInputs[rowIndex][colIndex];
                      const showCorrectLetter = showSolution || userInput.isRevealed;
                      
                      return (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`
                            relative w-10 h-10 border border-gray-300 flex items-center justify-center text-sm font-bold
                            transition-all duration-200
                            ${isBlack 
                              ? 'bg-gray-900 border-gray-900' 
                              : `bg-white cursor-pointer
                                 ${isSelected ? 'ring-2 ring-blue-500 bg-blue-100' : ''}
                                 ${isHighlighted && !isSelected ? 'bg-blue-50' : ''}
                                 ${userInput.isCorrect && !showCorrectLetter ? 'bg-green-50' : ''}
                                 ${userInput.value && !userInput.isCorrect && !showCorrectLetter ? 'bg-red-50' : ''}
                                 ${userInput.isRevealed ? 'bg-yellow-50' : ''}
                                 hover:bg-blue-50`
                            }
                            ${hasNumber ? 'border-blue-400 border-2' : ''}
                          `}
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                          {/* Number in top-left corner */}
                          {hasNumber && (
                            <span className="absolute top-0 left-0 text-xs font-bold text-blue-600 leading-none p-0.5 z-10">
                              {cell.number}
                            </span>
                          )}
                          
                          {/* Input field or letter display */}
                          {!isBlack && (
                            <>
                              {showCorrectLetter ? (
                                <span className="text-gray-800 font-bold text-base">
                                  {cell.letter}
                                </span>
                              ) : (
                                <input
                                  ref={(el) => {
                                    if (!gridRefs.current[rowIndex]) {
                                      gridRefs.current[rowIndex] = [];
                                    }
                                    gridRefs.current[rowIndex][colIndex] = el;
                                  }}
                                  type="text"
                                  value={userInput.value}
                                  onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                  onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                                  className="w-full h-full text-center text-base font-bold bg-transparent border-none outline-none caret-blue-500"
                                  maxLength={1}
                                  disabled={!gameStarted || isPaused}
                                />
                              )}
                              
                              {/* Correct indicator */}
                              {userInput.isCorrect && !showCorrectLetter && (
                                <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
                              )}
                              
                              {/* Revealed indicator */}
                              {userInput.isRevealed && (
                                <div className="absolute bottom-0 right-0">
                                  <Sparkles className="w-3 h-3 text-yellow-500" />
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              
              {/* Game Actions */}
              {gameStarted && selectedClue && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-6"
                >
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-blue-100">
                        {selectedClue.number} {selectedClue.direction}
                      </Badge>
                      <Badge variant="outline">
                        {selectedClue.length} letters
                      </Badge>
                    </div>
                    <p className="font-medium text-blue-800">
                      {selectedClue.clue}
                    </p>
                  </div>
                  
                  <Button
                    onClick={useHint}
                    disabled={hintsUsed >= 3 || isPaused}
                    variant="outline"
                    className="mr-2"
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Use Hint ({3 - hintsUsed} left)
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Clues Panel */}
        <div className="space-y-6">
          {/* Across Clues */}
          {acrossClues.length > 0 && (
            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">→</span>
                  </div>
                  ACROSS
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 max-h-64 overflow-y-auto">
                <div className="space-y-2">
                  {acrossClues.map((clue: CrosswordClue) => (
                    <motion.div
                      key={`across-${clue.number}`}
                      className={`
                        flex gap-3 p-3 rounded-lg border cursor-pointer transition-all
                        ${selectedClue?.number === clue.number && selectedClue?.direction === 'across'
                          ? 'bg-green-200 border-green-400 shadow-md'
                          : 'bg-white/60 border-green-200/50 hover:bg-green-100'
                        }
                      `}
                      onClick={() => highlightClue(clue)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white text-sm font-bold rounded-full">
                          {clue.number}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium leading-relaxed text-sm">
                          {clue.clue}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          {clue.length} letters
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Down Clues */}
          {downClues.length > 0 && (
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">↓</span>
                  </div>
                  DOWN
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 max-h-64 overflow-y-auto">
                <div className="space-y-2">
                  {downClues.map((clue: CrosswordClue) => (
                    <motion.div
                      key={`down-${clue.number}`}
                      className={`
                        flex gap-3 p-3 rounded-lg border cursor-pointer transition-all
                        ${selectedClue?.number === clue.number && selectedClue?.direction === 'down'
                          ? 'bg-blue-200 border-blue-400 shadow-md'
                          : 'bg-white/60 border-blue-200/50 hover:bg-blue-100'
                        }
                      `}
                      onClick={() => highlightClue(clue)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white text-sm font-bold rounded-full">
                          {clue.number}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium leading-relaxed text-sm">
                          {clue.clue}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          {clue.length} letters
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Game Progress */}
          {gameStarted && (
            <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-purple-600 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-800 mb-2">Game Progress</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-mono font-semibold text-purple-700">
                          {formatTime(elapsedTime)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hints Used:</span>
                        <span className="font-semibold text-yellow-600">{hintsUsed}/3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-semibold ${gameCompleted ? 'text-green-600' : isPaused ? 'text-yellow-600' : 'text-blue-600'}`}>
                          {gameCompleted ? 'Complete!' : isPaused ? 'Paused' : 'Playing'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Completion Dialog */}
      <AnimatePresence>
        {gameCompleted && (
          <Dialog open={gameCompleted} onOpenChange={() => setGameCompleted(false)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-center">
                  <Trophy className="h-6 w-6 text-gold" />
                  Congratulations!
                </DialogTitle>
              </DialogHeader>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="text-6xl">🎉</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Puzzle Completed!</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-mono font-bold">{formatTime(elapsedTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hints Used:</span>
                      <span className="font-bold">{hintsUsed}/3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Score:</span>
                      <span className="font-bold text-gold">
                        {Math.max(0, 1000 - Math.floor(elapsedTime / 1000) - hintsUsed * 50)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={resetGame} className="flex-1">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Play Again
                  </Button>
                  <Button variant="outline" onClick={() => setGameCompleted(false)} className="flex-1">
                    Close
                  </Button>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

export default InteractiveCrossword;