import React, { useState } from 'react';
import { WordSearchResult, WordPlacement } from '@/utils/wordSearchGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface WordSearchDisplayProps {
  wordSearch: WordSearchResult;
  title: string;
  theme: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  showSolution?: boolean;
  className?: string;
}

export function WordSearchDisplay({ 
  wordSearch, 
  title, 
  theme, 
  difficulty, 
  showSolution = false,
  className = ""
}: WordSearchDisplayProps) {
  const [showSolutions, setShowSolutions] = useState(showSolution);
  const { settings } = useAccessibility();

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const gridSize = wordSearch.grid.length;

  // Function to check if a cell is part of a word placement
  const getCellHighlight = (row: number, col: number): string => {
    if (!showSolutions) return '';
    
    for (const placement of wordSearch.placements) {
      const { startRow, startCol, direction, word } = placement;
      
      let dr = 0, dc = 0;
      switch (direction) {
        case 'horizontal':
          dr = 0; dc = 1;
          break;
        case 'vertical':
          dr = 1; dc = 0;
          break;
        case 'diagonal':
          dr = 1; dc = 1;
          break;
        case 'horizontal-reverse':
          dr = 0; dc = -1;
          break;
        case 'vertical-reverse':
          dr = -1; dc = 0;
          break;
        case 'diagonal-reverse':
          dr = -1; dc = -1;
          break;
      }
      
      for (let i = 0; i < word.length; i++) {
        const currentRow = startRow + i * dr;
        const currentCol = startCol + i * dc;
        
        if (currentRow === row && currentCol === col) {
          // Generate a consistent color for each word
          const colorIndex = wordSearch.placements.indexOf(placement) % 6;
          const colors = [
            'bg-red-200 border-red-400',
            'bg-blue-200 border-blue-400',
            'bg-green-200 border-green-400',
            'bg-yellow-200 border-yellow-400',
            'bg-purple-200 border-purple-400',
            'bg-pink-200 border-pink-400'
          ];
          return colors[colorIndex];
        }
      }
    }
    
    return '';
  };

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Header with theme imagery */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-8 py-12 text-center text-white">
          <div className="mb-4">
            <Image
              src="https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/image-f095723.png"
              alt="Word search puzzle inspiration"
              width={80}
              height={80}
              className="mx-auto rounded-full border-4 border-white/30 shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <div className="flex items-center justify-center gap-4">
            <Badge className={`${getDifficultyColor(difficulty)} font-semibold px-4 py-2`}>
              {difficulty}
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-4 py-2">
              {theme}
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-4 py-2">
              {gridSize}×{gridSize}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Word Search Grid */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-center text-gray-800">
                Word Search Grid
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {/* Solution Toggle Button */}
              <div className="flex justify-center mb-6">
                <Button
                  onClick={() => setShowSolutions(!showSolutions)}
                  variant={showSolutions ? "default" : "outline"}
                  className="flex items-center gap-2"
                >
                  {showSolutions ? (
                    <>
                      <EyeOff className="h-4 w-4" />
                      Hide Solutions
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      Show Solutions
                    </>
                  )}
                </Button>
              </div>

              <div className="flex justify-center">
                <div 
                  className={`inline-grid p-6 bg-white rounded-xl shadow-inner border-2 border-gray-100 ${
                    settings.largePrintPuzzles ? 'large-print-puzzle' : ''
                  }`}
                  style={{ 
                    gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                    maxWidth: settings.largePrintPuzzles ? '600px' : '500px',
                    aspectRatio: '1',
                    gap: settings.largePrintPuzzles ? '3px' : '1px'
                  }}
                >
                  {wordSearch.grid.map((row, rowIndex) => 
                    row.map((letter, colIndex) => {
                      const highlight = getCellHighlight(rowIndex, colIndex);
                      const baseFontSize = settings.largePrintPuzzles ? 20 : 16;
                      const cellSize = settings.largePrintPuzzles ? 600 : 400;
                      
                      return (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`puzzle-cell aspect-square flex items-center justify-center border transition-colors duration-200 ${
                            settings.largePrintPuzzles ? 'font-black' : 'font-bold'
                          } ${
                            highlight 
                              ? `${highlight} border-2` 
                              : 'border-gray-300 bg-white hover:bg-blue-50'
                          }`}
                          style={{
                            minHeight: `${Math.max(settings.largePrintPuzzles ? 30 : 20, cellSize / gridSize)}px`,
                            fontSize: `${Math.max(settings.largePrintPuzzles ? 14 : 10, baseFontSize - gridSize * 0.2)}px`,
                            fontWeight: settings.largePrintPuzzles ? '900' : '700'
                          }}
                        >
                          {letter}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              
              {/* Instructions */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  {showSolutions 
                    ? "Solutions are highlighted in different colors. Each word has its own color."
                    : "Find all the words hidden in the grid. Words can be horizontal, vertical, or diagonal."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Words List */}
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
                {wordSearch.words.map((word, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-blue-200/50">
                    <span className="font-bold text-gray-800 font-mono">
                      {word}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {word.length} letters
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-600 rounded-full flex items-center justify-center">
                  <Image
                    src="https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/image-f095723.png"
                    alt="Puzzle stats"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-green-800 mb-2">Puzzle Stats</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Words:</span>
                      <span className="font-semibold text-green-700">{wordSearch.words.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Grid Size:</span>
                      <span className="font-semibold text-blue-600">{gridSize}×{gridSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Theme:</span>
                      <span className="font-semibold text-purple-700">{theme}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <Badge className={`text-xs ${getDifficultyColor(difficulty)}`}>
                        {difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Directions Card */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="font-bold text-purple-800 mb-2">How to Play</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    <span>Find words in any direction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Words can overlap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>Circle or highlight found words</span>
                  </div>
                  {difficulty === 'Hard' && (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                      <span>Words may be backwards</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          Professional word search puzzle • Designed for optimal solving experience
        </p>
      </div>
    </div>
  );
}

export default WordSearchDisplay;