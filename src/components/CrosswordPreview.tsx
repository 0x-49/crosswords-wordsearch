import React from 'react';
import { CrosswordResult, CrosswordCell } from '@/utils/crosswordGenerator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface CrosswordPreviewProps {
  crossword: CrosswordResult;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  theme: string;
  className?: string;
}

export function CrosswordPreview({ 
  crossword, 
  title, 
  difficulty, 
  theme,
  className = ""
}: CrosswordPreviewProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const acrossCount = crossword.clues.filter(clue => clue.direction === 'across').length;
  const downCount = crossword.clues.filter(clue => clue.direction === 'down').length;

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="relative">
        {/* Header with gradient and theme image */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Image
                src="https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/whatsapp-image-2025-07-29-at-10.26.19-1-eaafe89.jpeg"
                alt="Crossword icon"
                width={24}
                height={24}
                className="rounded-full border-2 border-white/30"
              />
              <span className="text-sm font-medium opacity-90">CROSSWORD</span>
            </div>
            <div className={`w-3 h-3 rounded-full ${getDifficultyColor(difficulty)}`}></div>
          </div>
          <h3 className="font-bold text-lg leading-tight">{title}</h3>
          <p className="text-sm opacity-80">{theme}</p>
        </div>

        {/* Mini crossword grid preview */}
        <CardContent className="p-4">
          <div className="flex justify-center mb-4">
            <div 
              className="inline-grid gap-0.5 p-3 bg-gray-50 rounded-lg border"
              style={{ 
                gridTemplateColumns: `repeat(${Math.min(crossword.size, 8)}, 1fr)`,
              }}
            >
              {crossword.grid.slice(0, 8).map((row, rowIndex) => 
                row.slice(0, 8).map((cell: CrosswordCell, colIndex) => {
                  const isBlack = cell.isBlack;
                  const hasNumber = cell.number && cell.number > 0;
                  
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        relative w-4 h-4 border border-gray-300 flex items-center justify-center
                        ${isBlack 
                          ? 'bg-gray-800' 
                          : 'bg-white'
                        }
                      `}
                    >
                      {hasNumber && (
                        <span className="absolute top-0 left-0 text-xs font-bold text-blue-600 leading-none" style={{ fontSize: '6px' }}>
                          {cell.number}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <div className="font-bold text-green-600">{acrossCount}</div>
              <div className="text-gray-500">Across</div>
            </div>
            <div>
              <div className="font-bold text-blue-600">{downCount}</div>
              <div className="text-gray-500">Down</div>
            </div>
            <div>
              <div className="font-bold text-purple-600">{crossword.size}×{crossword.size}</div>
              <div className="text-gray-500">Grid</div>
            </div>
          </div>

          {/* Difficulty badge */}
          <div className="flex justify-center mt-3">
            <Badge 
              variant="outline" 
              className={`text-xs ${
                difficulty === 'Easy' ? 'border-green-300 text-green-700' :
                difficulty === 'Medium' ? 'border-yellow-300 text-yellow-700' :
                'border-red-300 text-red-700'
              }`}
            >
              {difficulty}
            </Badge>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default CrosswordPreview;