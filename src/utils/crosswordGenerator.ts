export interface CrosswordClue {
  number: number;
  clue: string;
  answer: string;
  direction: 'across' | 'down';
  startRow: number;
  startCol: number;
  length: number;
}

export interface CrosswordCell {
  letter: string;
  number?: number;
  isBlack: boolean;
  isStart: boolean;
}

export interface CrosswordResult {
  grid: CrosswordCell[][];
  clues: CrosswordClue[];
  size: number;
}

export interface CrosswordConfig {
  size: number;
  words: { word: string; clue: string }[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  largePrint?: boolean;
}

export class CrosswordGenerator {
  private grid: CrosswordCell[][];
  private size: number;
  private clues: CrosswordClue[] = [];
  private clueNumber = 1;

  constructor(size: number) {
    this.size = size;
    this.grid = Array(size).fill(null).map(() =>
      Array(size).fill(null).map(() => ({
        letter: '',
        isBlack: false,
        isStart: false
      }))
    );
  }

  private canPlaceWord(word: string, row: number, col: number, direction: 'across' | 'down'): boolean {
    const dr = direction === 'down' ? 1 : 0;
    const dc = direction === 'across' ? 1 : 0;

    // Check if word fits in grid
    if (direction === 'across' && col + word.length > this.size) return false;
    if (direction === 'down' && row + word.length > this.size) return false;

    // Check for conflicts with existing letters
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dr;
      const newCol = col + i * dc;
      const cell = this.grid[newRow][newCol];

      if (cell.isBlack) return false;
      if (cell.letter !== '' && cell.letter !== word[i]) return false;
    }

    // Check boundaries (no adjacent words)
    const beforeRow = row - dr;
    const beforeCol = col - dc;
    const afterRow = row + word.length * dr;
    const afterCol = col + word.length * dc;

    if (beforeRow >= 0 && beforeCol >= 0 && beforeRow < this.size && beforeCol < this.size) {
      if (this.grid[beforeRow][beforeCol].letter !== '' && !this.grid[beforeRow][beforeCol].isBlack) {
        return false;
      }
    }

    if (afterRow >= 0 && afterCol >= 0 && afterRow < this.size && afterCol < this.size) {
      if (this.grid[afterRow][afterCol].letter !== '' && !this.grid[afterRow][afterCol].isBlack) {
        return false;
      }
    }

    return true;
  }

  private placeWord(word: string, clue: string, row: number, col: number, direction: 'across' | 'down'): void {
    const dr = direction === 'down' ? 1 : 0;
    const dc = direction === 'across' ? 1 : 0;

    // Mark start cell
    this.grid[row][col].isStart = true;
    this.grid[row][col].number = this.clueNumber;

    // Place letters
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dr;
      const newCol = col + i * dc;
      this.grid[newRow][newCol].letter = word[i];
    }

    // Add clue
    this.clues.push({
      number: this.clueNumber,
      clue,
      answer: word,
      direction,
      startRow: row,
      startCol: col,
      length: word.length
    });

    this.clueNumber++;
  }

  private findIntersections(word: string, existingWords: { word: string; row: number; col: number; direction: 'across' | 'down' }[]): { row: number; col: number; direction: 'across' | 'down' }[] {
    const intersections: { row: number; col: number; direction: 'across' | 'down' }[] = [];

    for (const existing of existingWords) {
      for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < existing.word.length; j++) {
          if (word[i] === existing.word[j]) {
            let newRow: number, newCol: number, newDirection: 'across' | 'down';

            if (existing.direction === 'across') {
              newDirection = 'down';
              newRow = existing.row - i;
              newCol = existing.col + j;
            } else {
              newDirection = 'across';
              newRow = existing.row + j;
              newCol = existing.col - i;
            }

            if (newRow >= 0 && newCol >= 0 && this.canPlaceWord(word, newRow, newCol, newDirection)) {
              intersections.push({ row: newRow, col: newCol, direction: newDirection });
            }
          }
        }
      }
    }

    return intersections;
  }

  public generateCrossword(config: CrosswordConfig): CrosswordResult {
    const { words, difficulty } = config;
    const processedWords = words.map(w => ({
      word: w.word.toUpperCase().replace(/[^A-Z]/g, ''),
      clue: w.clue
    }));

    // Sort words by length (longest first)
    const sortedWords = processedWords.sort((a, b) => b.word.length - a.word.length);
    const placedWords: { word: string; row: number; col: number; direction: 'across' | 'down' }[] = [];

    // Place first word in center
    if (sortedWords.length > 0) {
      const firstWord = sortedWords[0];
      const centerRow = Math.floor(this.size / 2);
      const centerCol = Math.floor((this.size - firstWord.word.length) / 2);
      
      this.placeWord(firstWord.word, firstWord.clue, centerRow, centerCol, 'across');
      placedWords.push({
        word: firstWord.word,
        row: centerRow,
        col: centerCol,
        direction: 'across'
      });
    }

    // Place remaining words
    for (let i = 1; i < sortedWords.length; i++) {
      const { word, clue } = sortedWords[i];
      const intersections = this.findIntersections(word, placedWords);

      if (intersections.length > 0) {
        const intersection = intersections[Math.floor(Math.random() * intersections.length)];
        this.placeWord(word, clue, intersection.row, intersection.col, intersection.direction);
        placedWords.push({
          word,
          row: intersection.row,
          col: intersection.col,
          direction: intersection.direction
        });
      }
    }

    // Fill unused cells as black
    this.fillBlackCells();

    return {
      grid: this.grid,
      clues: this.clues.sort((a, b) => {
        if (a.direction !== b.direction) {
          return a.direction === 'across' ? -1 : 1;
        }
        return a.number - b.number;
      }),
      size: this.size
    };
  }

  private fillBlackCells(): void {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.grid[row][col].letter === '') {
          this.grid[row][col].isBlack = true;
        }
      }
    }
  }
}

export function generateCrosswordPuzzle(
  words: { word: string; clue: string }[],
  difficulty: 'Easy' | 'Medium' | 'Hard',
  size: number = 15
): CrosswordResult {
  const generator = new CrosswordGenerator(size);
  return generator.generateCrossword({
    size,
    words,
    difficulty
  });
}