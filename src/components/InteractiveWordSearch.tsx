import React, { useState, useCallback, useEffect } from 'react';
import { WordSearchResult, WordPlacement } from '@/utils/wordSearchGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, RotateCcw, Trophy, Clock } from 'lucide-react';
import Image from 'next/image';

interface InteractiveWordSearchProps {
  wordSearch: WordSearchResult;
  title: string;
  theme: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onComplete?: (timeElapsed: number, wordsFound: number) => void;
  className?: string;
}

interface CellState {
  letter: string;
  isSelected: boolean;
  isPartOfFoundWord: boolean;
  foundWordIndex: number;
  row: number;
  col: number;
}

interface FoundWord {
  word: string;
  color: string;
  cells: { row: number; col: number }[];
}

const WORD_COLORS = [
  'bg-red-200 border-red-400 text-red-800',
  'bg-blue-200 border-blue-400 text-blue-800',
  'bg-green-200 border-green-400 text-green-800',
  'bg-yellow-200 border-yellow-400 text-yellow-800',
  'bg-purple-200 border-purple-400 text-purple-800',
  'bg-pink-200 border-pink-400 text-pink-800',
  'bg-indigo-200 border-indigo-400 text-indigo-800',
  'bg-orange-200 border-orange-400 text-orange-800',
  'bg-teal-200 border-teal-400 text-teal-800',
  'bg-cyan-200 border-cyan-400 text-cyan-800',
];

export function InteractiveWordSearch({ 
  wordSearch, 
  title, 
  theme, 
  difficulty, 
  onComplete,
  className = ""
}: InteractiveWordSearchProps) {
  const [cells, setCells] = useState<CellState[][]>([]);
  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Initialize cells
  useEffect(() => {
    const initialCells: CellState[][] = wordSearch.grid.map((row, rowIndex) =>
      row.map((letter, colIndex) => ({
        letter,
        isSelected: false,
        isPartOfFoundWord: false,
        foundWordIndex: -1,
        row: rowIndex,
        col: colIndex,
      }))
    );
    setCells(initialCells);
    setStartTime(new Date());
  }, [wordSearch]);

  // Timer
  useEffect(() => {
    if (!startTime || gameCompleted) return;
    
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, gameCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCellsInLine = (start: { row: number; col: number }, end: { row: number; col: number }) => {
    const cells: { row: number; col: number }[] = [];
    const rowDiff = end.row - start.row;
    const colDiff = end.col - start.col;
    
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    const rowStep = steps === 0 ? 0 : rowDiff / steps;
    const colStep = steps === 0 ? 0 : colDiff / steps;
    
    for (let i = 0; i <= steps; i++) {
      const row = Math.round(start.row + rowStep * i);
      const col = Math.round(start.col + colStep * i);
      cells.push({ row, col });
    }
    
    return cells;
  };

  const checkForWord = useCallback((selectedCells: { row: number; col: number }[]) => {
    if (selectedCells.length < 2) return null;

    const selectedWord = selectedCells
      .map(cell => wordSearch.grid[cell.row][cell.col])
      .join('');
    
    const reversedWord = selectedWord.split('').reverse().join('');
    
    // Check if the selected word matches any target word
    const matchedWord = wordSearch.words.find(word => 
      word === selectedWord || word === reversedWord
    );
    
    if (matchedWord && !foundWords.some(fw => fw.word === matchedWord)) {
      return {
        word: matchedWord,
        cells: selectedCells,
        color: WORD_COLORS[foundWords.length % WORD_COLORS.length]
      };
    }
    
    return null;
  }, [wordSearch.words, foundWords]);

  const handleCellMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
    
    setCells(prev => prev.map((cellRow, r) =>
      cellRow.map((cell, c) => ({
        ...cell,
        isSelected: r === row && c === col
      }))
    ));
  };

  const handleCellMouseEnter = (row: number, col: number) => {
    if (!isSelecting || selectedCells.length === 0) return;
    
    const startCell = selectedCells[0];
    const newSelectedCells = getCellsInLine(startCell, { row, col });
    
    setSelectedCells(newSelectedCells);
    
    setCells(prev => prev.map((cellRow, r) =>
      cellRow.map((cell, c) => ({
        ...cell,
        isSelected: newSelectedCells.some(sc => sc.row === r && sc.col === c)
      }))
    ));
  };

  const handleCellMouseUp = () => {
    if (!isSelecting) return;
    
    const foundWord = checkForWord(selectedCells);
    
    if (foundWord) {
      const newFoundWords = [...foundWords, foundWord];
      setFoundWords(newFoundWords);
      
      setCells(prev => prev.map((cellRow, r) =>
        cellRow.map((cell, c) => {
          const isPartOfNewWord = foundWord.cells.some(fc => fc.row === r && fc.col === c);
          return {
            ...cell,
            isSelected: false,
            isPartOfFoundWord: cell.isPartOfFoundWord || isPartOfNewWord,
            foundWordIndex: isPartOfNewWord ? newFoundWords.length - 1 : cell.foundWordIndex
          };
        })
      ));
      
      // Check if game is completed
      if (newFoundWords.length === wordSearch.words.length) {
        setGameCompleted(true);
        onComplete?.(elapsedTime, newFoundWords.length);
      }
    } else {
      // Clear selection if no word found
      setCells(prev => prev.map(cellRow =>
        cellRow.map(cell => ({
          ...cell,
          isSelected: false
        }))
      ));
    }
    
    setIsSelecting(false);
    setSelectedCells([]);
  };

  const resetGame = () => {
    setCells(wordSearch.grid.map((row, rowIndex) =>
      row.map((letter, colIndex) => ({
        letter,
        isSelected: false,
        isPartOfFoundWord: false,
        foundWordIndex: -1,
        row: rowIndex,
        col: colIndex,
      }))
    ));
    setFoundWords([]);
    setSelectedCells([]);
    setIsSelecting(false);
    setStartTime(new Date());
    setElapsedTime(0);
    setGameCompleted(false);
  };

  const getCellClassName = (cell: CellState) => {
    let className = "aspect-square flex items-center justify-center font-bold border-2 transition-all duration-200 cursor-pointer select-none ";
    
    if (cell.isPartOfFoundWord) {
      const foundWord = foundWords[cell.foundWordIndex];
      className += foundWord?.color || 'bg-gray-200 border-gray-400';
    } else if (cell.isSelected) {
      className += "bg-blue-300 border-blue-500 text-blue-900";
    } else {
      className += "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300";
    }
    
    return className;
  };

  const gridSize = wordSearch.grid.length;

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Header */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-8 py-12 text-center text-white">
          <div className="mb-4">
            <Image
              src="https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/image-f095723.png"
              alt="Interactive word search"
              width={80}
              height={80}
              className="mx-auto rounded-full border-4 border-white/30 shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge className={`${getDifficultyColor(difficulty)} font-semibold px-4 py-2`}>
              {difficulty}
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-4 py-2">
              {theme}
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-4 py-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {formatTime(elapsedTime)}
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-4 py-2">
              {foundWords.length}/{wordSearch.words.length} Found
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Word Search Grid */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Interactive Word Search
                </CardTitle>
                <Button
                  onClick={resetGame}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex justify-center">
                <div 
                  className="inline-grid gap-1 p-6 bg-white rounded-xl shadow-inner border-2 border-gray-100"
                  style={{ 
                    gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                    maxWidth: '500px',
                    aspectRatio: '1'
                  }}
                  onMouseLeave={() => {
                    if (isSelecting) {
                      handleCellMouseUp();
                    }
                  }}
                >
                  {cells.map((row, rowIndex) => 
                    row.map((cell, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={getCellClassName(cell)}
                        style={{
                          minHeight: `${Math.max(20, 400 / gridSize)}px`,
                          fontSize: `${Math.max(10, 16 - gridSize * 0.2)}px`
                        }}
                        onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                        onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                        onMouseUp={handleCellMouseUp}
                      >
                        {cell.letter}
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* Instructions */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600 mb-2">
                  Click and drag to select words. Words can be horizontal, vertical, or diagonal.
                </p>
                {gameCompleted && (
                  <div className="flex items-center justify-center gap-2 text-green-600 font-bold">
                    <Trophy className="w-5 h-5" />
                    Congratulations! You found all words in {formatTime(elapsedTime)}!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Words List and Stats */}
        <div className="space-y-6">
          {/* Words to Find */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">📝</span>
                </div>
                WORDS TO FIND
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 gap-2">
                {wordSearch.words.map((word, index) => {
                  const isFound = foundWords.some(fw => fw.word === word);
                  const foundWord = foundWords.find(fw => fw.word === word);
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                        isFound 
                          ? `${foundWord?.color} opacity-90` 
                          : 'bg-white/60 border-blue-200/50'
                      }`}
                    >
                      <span className={`font-bold font-mono ${isFound ? 'line-through' : 'text-gray-800'}`}>
                        {word}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {word.length} letters
                        </Badge>
                        {isFound && <CheckCircle className="w-4 h-4 text-green-600" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Game Stats */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-600 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-green-800 mb-2">Game Progress</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Words Found:</span>
                      <span className="font-semibold text-green-700">
                        {foundWords.length}/{wordSearch.words.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Elapsed:</span>
                      <span className="font-semibold text-blue-600">{formatTime(elapsedTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <Badge className={`text-xs ${getDifficultyColor(difficulty)}`}>
                        {difficulty}
                      </Badge>
                    </div>
                    <Separator className="my-2" />
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(foundWords.length / wordSearch.words.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Play */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="font-bold text-purple-800 mb-2">How to Play</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    <span>Click and drag to select words</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Words can be in any direction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>Found words will be highlighted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                    <span>Find all words to complete!</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default InteractiveWordSearch;