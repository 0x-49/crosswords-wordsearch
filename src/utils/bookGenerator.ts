import { WordSearchGenerator, WordSearchResult } from './wordSearchGenerator';
import { CrosswordGenerator, CrosswordResult } from './crosswordGenerator';
import { getThemeNames, getRandomWordsFromExpandedTheme, getRandomCrosswordClues } from './expandedThemes';
import { getAllThemeNamesComplete, getExpandedThemeDataComplete, completeThemeCollection } from './elderlyFriendlyThemes';

export interface PuzzleTemplate {
  id: string;
  type: 'wordsearch' | 'crossword';
  theme: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  data: WordSearchResult | CrosswordResult;
}

export interface PuzzleBook {
  id: string;
  title: string;
  theme: string;
  pages: PuzzleTemplate[];
  totalPages: number;
}

export interface BookCollection {
  books: PuzzleBook[];
  totalBooks: number;
  totalPages: number;
}

const DIFFICULTIES: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium', 'Hard'];

export class BookGenerator {
  private generateWordSearchTemplate(
    theme: string,
    difficulty: 'Easy' | 'Medium' | 'Hard',
    templateId: string,
    largePrint: boolean = false
  ): PuzzleTemplate {
    // Try complete theme collection first, then fall back to expanded themes
    const expandedThemeData = getExpandedThemeDataComplete(theme);
    let words: string[];
    
    if (expandedThemeData) {
      const shuffled = [...expandedThemeData.words].sort(() => Math.random() - 0.5);
      words = shuffled.slice(0, 15);
    } else {
      words = getRandomWordsFromExpandedTheme(theme, 15);
    }
    
    const generator = new WordSearchGenerator(15);
    
    const wordSearchResult = generator.generateWordSearch({
      gridSize: 15,
      words,
      difficulty,
      largePrint
    });

    return {
      id: templateId,
      type: 'wordsearch',
      theme,
      title: `${theme} Word Search - ${difficulty}${largePrint ? ' (Large Print)' : ''}`,
      difficulty,
      data: wordSearchResult
    };
  }

  private generateCrosswordTemplate(
    theme: string,
    difficulty: 'Easy' | 'Medium' | 'Hard',
    templateId: string,
    largePrint: boolean = false
  ): PuzzleTemplate {
    const clueCount = difficulty === 'Easy' ? 10 : difficulty === 'Medium' ? 12 : 15;
    
    // Try complete theme collection first, then fall back to expanded themes
    const expandedThemeData = getExpandedThemeDataComplete(theme);
    let clues: { word: string; clue: string }[];
    
    if (expandedThemeData) {
      const shuffled = [...expandedThemeData.crosswordData].sort(() => Math.random() - 0.5);
      clues = shuffled.slice(0, clueCount);
    } else {
      clues = getRandomCrosswordClues(theme, clueCount);
    }
    
    const generator = new CrosswordGenerator(15);
    
    const crosswordResult = generator.generateCrossword({
      size: 15,
      words: clues,
      difficulty,
      largePrint
    });

    return {
      id: templateId,
      type: 'crossword',
      theme,
      title: `${theme} Crossword - ${difficulty}${largePrint ? ' (Large Print)' : ''}`,
      difficulty,
      data: crosswordResult
    };
  }

  private generateBookForTheme(theme: string, bookId: string, largePrint: boolean = false): PuzzleBook {
    const pages: PuzzleTemplate[] = [];
    let templateCounter = 1;

    // Generate 75 word search templates (mix of difficulties)
    for (let i = 0; i < 75; i++) {
      const difficulty = DIFFICULTIES[i % 3]; // Cycle through difficulties
      const templateId = `${bookId}_ws_${templateCounter++}`;
      pages.push(this.generateWordSearchTemplate(theme, difficulty, templateId, largePrint));
    }

    // Generate 75 crossword templates (mix of difficulties)
    for (let i = 0; i < 75; i++) {
      const difficulty = DIFFICULTIES[i % 3]; // Cycle through difficulties
      const templateId = `${bookId}_cw_${templateCounter++}`;
      pages.push(this.generateCrosswordTemplate(theme, difficulty, templateId, largePrint));
    }

    return {
      id: bookId,
      title: `${theme} Puzzle Book${largePrint ? ' (Large Print)' : ''}`,
      theme,
      pages,
      totalPages: 150
    };
  }

  public generateAllBooks(): BookCollection {
    const themes = getAllThemeNamesComplete();
    const books: PuzzleBook[] = [];

    themes.forEach((theme, index) => {
      const bookId = `book_${index + 1}_${theme.toLowerCase().replace(/\s+/g, '_')}`;
      const book = this.generateBookForTheme(theme, bookId);
      books.push(book);
    });

    return {
      books,
      totalBooks: books.length,
      totalPages: books.reduce((total, book) => total + book.totalPages, 0)
    };
  }

  public generateBookByTheme(theme: string, largePrint: boolean = false): PuzzleBook | null {
    const themes = getAllThemeNamesComplete();
    if (!themes.includes(theme)) {
      console.error('Theme not found in complete collection:', theme);
      console.log('Available themes:', themes.slice(0, 10), '... and', themes.length - 10, 'more');
      return null;
    }

    const bookId = `book_${theme.toLowerCase().replace(/\s+/g, '_')}${largePrint ? '_large_print' : ''}`;
    return this.generateBookForTheme(theme, bookId, largePrint);
  }

  public generateAllBooksWithLargePrint(): BookCollection {
    const themes = getAllThemeNamesComplete();
    const books: PuzzleBook[] = [];

    themes.forEach((theme, index) => {
      // Generate regular version
      const regularBookId = `book_${index + 1}_${theme.toLowerCase().replace(/\s+/g, '_')}`;
      const regularBook = this.generateBookForTheme(theme, regularBookId, false);
      books.push(regularBook);

      // Generate large print version
      const largePrintBookId = `book_${index + 1}_${theme.toLowerCase().replace(/\s+/g, '_')}_large_print`;
      const largePrintBook = this.generateBookForTheme(theme, largePrintBookId, true);
      books.push(largePrintBook);
    });

    return {
      books,
      totalBooks: books.length,
      totalPages: books.reduce((total, book) => total + book.totalPages, 0)
    };
  }

  public getBookSummary(): { theme: string; wordSearchCount: number; crosswordCount: number; totalPages: number }[] {
    const themes = getAllThemeNamesComplete();
    return themes.map(theme => ({
      theme,
      wordSearchCount: 75,
      crosswordCount: 75,
      totalPages: 150
    }));
  }
}

// Utility functions for formatting and exporting
export function formatPuzzleForPrint(puzzle: PuzzleTemplate): string {
  let output = `\n╔${'═'.repeat(58)}╗\n`;
  output += `║${puzzle.title.toUpperCase().padStart(30 + puzzle.title.length / 2).padEnd(58)}║\n`;
  output += `║${'Theme: ' + puzzle.theme + ' • Difficulty: ' + puzzle.difficulty}${' '.repeat(58 - ('Theme: ' + puzzle.theme + ' • Difficulty: ' + puzzle.difficulty).length)}║\n`;
  output += `╚${'═'.repeat(58)}╝\n\n`;
  
  if (puzzle.type === 'wordsearch') {
    const data = puzzle.data as WordSearchResult;
    
    // Add decorative header
    output += '┌─ WORD SEARCH GRID ─────────────────────────────────────┐\n';
    
    // Add the grid with better formatting
    data.grid.forEach((row, index) => {
      output += '│ ' + row.join(' ') + ' │\n';
    });
    output += '└────────────────────────────────────────────────────────┘\n\n';
    
    // Add word list with better formatting
    output += '┌─ WORDS TO FIND ────────────────────────────────────────┐\n';
    const wordsPerRow = 3;
    for (let i = 0; i < data.words.length; i += wordsPerRow) {
      const rowWords = data.words.slice(i, i + wordsPerRow);
      output += '│ ';
      rowWords.forEach(word => {
        output += word.padEnd(18);
      });
      output += '│\n';
    }
    output += '└────────────────────────────────────────────────────────┘\n';
    
  } else if (puzzle.type === 'crossword') {
    const data = puzzle.data as CrosswordResult;
    
    // Add decorative crossword grid header
    output += '┌─ CROSSWORD PUZZLE ─────────────────────────────────────┐\n';
    
    // Add the grid with enhanced formatting
    data.grid.forEach((row, rowIndex) => {
      output += '│ ';
      const rowStr = row.map(cell => {
        if (cell.isBlack) return '██';
        if (cell.number && cell.number > 0) {
          return cell.number.toString().padStart(2, ' ');
        }
        return '░░';
      }).join(' ');
      output += rowStr.padEnd(56) + ' │\n';
    });
    output += '└────────────────────────────────────────────────────────┘\n\n';
    
    // Add clues with better formatting
    const acrossClues = data.clues.filter(clue => clue.direction === 'across');
    const downClues = data.clues.filter(clue => clue.direction === 'down');
    
    if (acrossClues.length > 0) {
      output += '┌─ ACROSS CLUES ─────────────────────────────────────────┐\n';
      acrossClues.forEach(clue => {
        const clueText = `${clue.number}. ${clue.clue}`;
        const lines: string[] = [];
        let currentLine = '';
        const words = clueText.split(' ');
        
        for (const word of words) {
          if ((currentLine + word).length <= 54) {
            currentLine += (currentLine ? ' ' : '') + word;
          } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
          }
        }
        if (currentLine) lines.push(currentLine);
        
        lines.forEach((line: string, index: number) => {
          output += `│ ${line.padEnd(56)} │\n`;
        });
      });
      output += '└────────────────────────────────────────────────────────┘\n\n';
    }
    
    if (downClues.length > 0) {
      output += '┌─ DOWN CLUES ───────────────────────────────────────────┐\n';
      downClues.forEach(clue => {
        const clueText = `${clue.number}. ${clue.clue}`;
        const lines: string[] = [];
        let currentLine = '';
        const words = clueText.split(' ');
        
        for (const word of words) {
          if ((currentLine + word).length <= 54) {
            currentLine += (currentLine ? ' ' : '') + word;
          } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
          }
        }
        if (currentLine) lines.push(currentLine);
        
        lines.forEach((line: string, index: number) => {
          output += `│ ${line.padEnd(56)} │\n`;
        });
      });
      output += '└────────────────────────────────────────────────────────┘\n';
    }
  }
  
  return output + '\n';
}

export function formatBookForPrint(book: PuzzleBook): string {
  let output = `\n${'='.repeat(60)}\n`;
  output += `${book.title.toUpperCase()}\n`;
  output += `Theme: ${book.theme}\n`;
  output += `Total Pages: ${book.totalPages}\n`;
  output += `${'='.repeat(60)}\n`;
  
  book.pages.forEach((puzzle, index) => {
    output += `\nPAGE ${index + 1}\n`;
    output += formatPuzzleForPrint(puzzle);
  });
  
  return output;
}

export function generateCollectionSummary(collection: BookCollection): string {
  let summary = `\n${'='.repeat(80)}\n`;
  summary += `PUZZLE BOOK COLLECTION SUMMARY\n`;
  summary += `${'='.repeat(80)}\n`;
  summary += `Total Books: ${collection.totalBooks}\n`;
  summary += `Total Pages: ${collection.totalPages}\n`;
  summary += `Books per Theme: 1\n`;
  summary += `Pages per Book: 150\n`;
  summary += `Word Searches per Book: 75\n`;
  summary += `Crosswords per Book: 75\n`;
  summary += `${'='.repeat(80)}\n\n`;
  
  summary += `BOOK LIST:\n`;
  collection.books.forEach((book, index) => {
    summary += `${(index + 1).toString().padStart(3)}. ${book.title}\n`;
  });
  
  return summary;
}