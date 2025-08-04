import React, { useState } from 'react';
import { CrosswordResult, CrosswordCell, CrosswordClue } from '@/utils/crosswordGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface CrosswordDisplayProps {
  crossword: CrosswordResult;
  title: string;
  theme: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  showSolution?: boolean;
  className?: string;
}

export function CrosswordDisplay({ 
  crossword, 
  title, 
  theme, 
  difficulty, 
  showSolution = false,
  className = ""
}: CrosswordDisplayProps) {
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

  const acrossClues = crossword.clues.filter(clue => clue.direction === 'across');
  const downClues = crossword.clues.filter(clue => clue.direction === 'down');

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Header with theme imagery */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-8 py-12 text-center text-white">
          <div className="mb-4">
            <Image
              src="https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/image-8e8f1d4.png"
              alt="Crossword puzzle inspiration"
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
              {crossword.size}×{crossword.size}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Crossword Grid */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-center text-gray-800">
                Crossword Puzzle
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
                    gridTemplateColumns: `repeat(${crossword.size}, 1fr)`,
                    gap: settings.largePrintPuzzles ? '2px' : '1px'
                  }}
                >
                  {crossword.grid.flat().map((cell: CrosswordCell, index: number) => {
                    const isBlack = cell.isBlack;
                    const hasNumber = cell.number && cell.number > 0;
                    const hasLetter = cell.letter && cell.letter.trim() !== '';
                    const cellSize = settings.largePrintPuzzles ? 'w-12 h-12' : 'w-8 h-8';
                    const fontSize = settings.largePrintPuzzles ? 'text-lg' : 'text-sm';
                    const numberSize = settings.largePrintPuzzles ? 'text-sm' : 'text-xs';
                    
                    return (
                      <div
                        key={index}
                        className={`
                          puzzle-cell relative ${cellSize} border border-gray-300 flex items-center justify-center ${fontSize} transition-colors duration-200
                          ${settings.largePrintPuzzles ? 'font-black' : 'font-bold'}
                          ${isBlack 
                            ? 'bg-gray-900 border-gray-900' 
                            : 'bg-white hover:bg-blue-50'
                          }
                          ${hasNumber ? 'border-blue-400 border-2' : ''}
                        `}
                      >
                        {/* Number in top-left corner */}
                        {hasNumber && (
                          <span className={`absolute top-0 left-0 ${numberSize} font-bold text-blue-600 leading-none ${
                            settings.largePrintPuzzles ? 'p-1' : 'p-0.5'
                          }`}>
                            {cell.number}
                          </span>
                        )}
                        
                        {/* Letter in center (if showing solution) */}
                        {!isBlack && showSolutions && hasLetter && (
                          <span className={`text-gray-800 ${
                            settings.largePrintPuzzles ? 'font-black text-xl' : 'font-bold text-base'
                          }`}>
                            {cell.letter}
                          </span>
                        )}
                        
                        {/* Empty cell indicator */}
                        {!isBlack && !showSolutions && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className={`bg-gray-300 rounded-full opacity-30 ${
                              settings.largePrintPuzzles ? 'w-2 h-2' : 'w-1 h-1'
                            }`}></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Instructions */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  {showSolutions 
                    ? 'Solution shown - all letters are filled in the grid above'
                    : 'Fill in the crossword using the clues below'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clues Section */}
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
              <CardContent className="pt-0">
                <div className={`space-y-3 ${settings.largePrintPuzzles ? 'puzzle-clue' : ''}`}>
                  {acrossClues.map((clue: CrosswordClue, index: number) => (
                    <div key={index} className={`flex gap-3 bg-white/60 rounded-lg border border-green-200/50 ${
                      settings.largePrintPuzzles ? 'p-4' : 'p-3'
                    }`}>
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center justify-center bg-green-600 text-white font-bold rounded-full ${
                          settings.largePrintPuzzles ? 'w-10 h-10 text-base' : 'w-8 h-8 text-sm'
                        }`}>
                          {clue.number}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className={`text-gray-800 font-medium leading-relaxed ${
                          settings.largePrintPuzzles ? 'text-lg font-semibold' : ''
                        }`}>
                          {clue.clue}
                        </p>
                        <p className={`text-green-600 mt-1 ${
                          settings.largePrintPuzzles ? 'text-sm font-medium' : 'text-xs'
                        }`}>
                          {clue.length} letters
                        </p>
                      </div>
                    </div>
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
              <CardContent className="pt-0">
                <div className={`space-y-3 ${settings.largePrintPuzzles ? 'puzzle-clue' : ''}`}>
                  {downClues.map((clue: CrosswordClue, index: number) => (
                    <div key={index} className={`flex gap-3 bg-white/60 rounded-lg border border-blue-200/50 ${
                      settings.largePrintPuzzles ? 'p-4' : 'p-3'
                    }`}>
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center justify-center bg-blue-600 text-white font-bold rounded-full ${
                          settings.largePrintPuzzles ? 'w-10 h-10 text-base' : 'w-8 h-8 text-sm'
                        }`}>
                          {clue.number}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className={`text-gray-800 font-medium leading-relaxed ${
                          settings.largePrintPuzzles ? 'text-lg font-semibold' : ''
                        }`}>
                          {clue.clue}
                        </p>
                        <p className={`text-blue-600 mt-1 ${
                          settings.largePrintPuzzles ? 'text-sm font-medium' : 'text-xs'
                        }`}>
                          {clue.length} letters
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Card */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-purple-600 rounded-full flex items-center justify-center">
                  <Image
                    src="https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/whatsapp-image-2025-07-29-at-10.30.53-1-fe912ec.jpeg"
                    alt="Puzzle stats"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-purple-800 mb-2">Puzzle Stats</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Clues:</span>
                      <span className="font-semibold text-purple-700">{crossword.clues.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Across:</span>
                      <span className="font-semibold text-green-600">{acrossClues.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down:</span>
                      <span className="font-semibold text-blue-600">{downClues.length}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Grid Size:</span>
                      <span className="font-semibold text-purple-700">{crossword.size}×{crossword.size}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer with inspiration images */}
      <div className="mt-12 text-center">
        <div className="flex justify-center gap-4 mb-6">
          {[
            "https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/whatsapp-image-2025-07-29-at-10.30.53-2-2f17ab2.jpeg",
            "https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/whatsapp-image-2025-07-29-at-10.30.53-3-58fd42a.jpeg",
            "https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/whatsapp-image-2025-07-29-at-10.30.53-4-d59559d.jpeg"
          ].map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Crossword inspiration ${index + 1}`}
              width={60}
              height={60}
              className="rounded-lg shadow-md opacity-60 hover:opacity-100 transition-opacity duration-300"
            />
          ))}
        </div>
        <p className="text-gray-500 text-sm">
          Professional crossword puzzle • Designed for optimal solving experience
        </p>
      </div>
    </div>
  );
}

export default CrosswordDisplay;