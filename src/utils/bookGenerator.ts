import { WordSearchGenerator, WordSearchResult } from './wordSearchGenerator';
import { CrosswordGenerator, CrosswordResult, CrosswordCell, CrosswordClue } from './crosswordGenerator';
import { getPuzzleFilePathsForBook, readPuzzleFile, WordSearchData, CrosswordData, getBookMetadata } from './puzzleData';

export interface PuzzleTemplate {
  id: string;
  type: 'wordsearch' | 'crossword';
  theme: string;
  title: string;
  difficulty: Difficulty;
  data: WordSearchResult | CrosswordResult;
}

export interface PuzzleBook {
  id: string;
  title: string;
  theme: string;
  bookType: BookType;
  pages: PuzzleTemplate[];
  totalPages: number;
}

export interface BookCollection {
  books: PuzzleBook[];
  totalBooks: number;
  totalPages: number;
}

export type BookType = 'WORD_SEARCH' | 'CROSSWORD' | 'MIXED';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export class BookGenerator {
  private transformCrosswordData(data: CrosswordData): CrosswordResult {
    const grid: CrosswordCell[][] = data.grid.map(row =>
      row.map(cell => ({
        isBlack: cell === '',
        letter: cell,
        isStart: false, // Will be updated later
      }))
    );

    const clues: CrosswordClue[] = [];
    data.clues.across.forEach(clue => {
      clues.push({
        number: clue.number,
        direction: 'across',
        clue: clue.clue,
        answer: clue.word,
        startRow: clue.start.row,
        startCol: clue.start.col,
        length: clue.word.length
      });
    });
    data.clues.down.forEach(clue => {
      clues.push({
        number: clue.number,
        direction: 'down',
        clue: clue.clue,
        answer: clue.word,
        startRow: clue.start.row,
        startCol: clue.start.col,
        length: clue.word.length
      });
    });

    // Assign numbers and start positions to the grid cells
    clues.forEach(clue => {
      const { startRow, startCol } = clue;
      if (grid[startRow] && grid[startRow][startCol]) {
        grid[startRow][startCol].number = clue.number;
        grid[startRow][startCol].isStart = true;
      }
    });

    return {
      size: data.dimensions.cols,
      grid,
      clues
    };
  }

  public async generateBookById(bookId: string, bookTitle: string, bookType: BookType = 'MIXED', largePrint: boolean = false): Promise<PuzzleBook> {
    const pages: PuzzleTemplate[] = [];
    let templateCounter = 1;

    if (bookType === 'WORD_SEARCH' || bookType === 'MIXED') {
      const filePaths = await getPuzzleFilePathsForBook(bookId, 'wordsearch');
      for (const filePath of filePaths) {
        const puzzleData = await readPuzzleFile<WordSearchData>(filePath);
        if (puzzleData) {
          const difficulty = DIFFICULTIES[templateCounter % 3];
          const templateId = `${bookId}_ws_${templateCounter++}`;
          const generator = new WordSearchGenerator(15);
          const wordSearchResult = generator.generateWordSearch({
            gridSize: 15,
            words: puzzleData.words,
            difficulty,
            largePrint
          });
          pages.push({
            id: templateId,
            type: 'wordsearch',
            theme: puzzleData.metadata.title || bookTitle,
            title: `${puzzleData.metadata.title || bookTitle} Word Search - ${difficulty}`,
            difficulty,
            data: wordSearchResult
          });
        }
      }
    }

    if (bookType === 'CROSSWORD' || bookType === 'MIXED') {
      const filePaths = await getPuzzleFilePathsForBook(bookId, 'crossword');
      for (const filePath of filePaths) {
        const puzzleData = await readPuzzleFile<CrosswordData>(filePath);
        if (puzzleData) {
          const difficulty = DIFFICULTIES[templateCounter % 3];
          const templateId = `${bookId}_cw_${templateCounter++}`;
          const crosswordResult = this.transformCrosswordData(puzzleData);
          pages.push({
            id: templateId,
            type: 'crossword',
            theme: puzzleData.metadata.title || bookTitle,
            title: `${puzzleData.metadata.title || bookTitle} Crossword - ${difficulty}`,
            difficulty,
            data: crosswordResult
          });
        }
      }
    }

    return {
      id: bookId,
      title: bookTitle,
      theme: bookTitle, // Using title as theme for now
      bookType,
      pages,
      totalPages: pages.length
    };
  }

  public async generateAllBooks(bookType: BookType = 'MIXED', largePrint: boolean = false): Promise<BookCollection> {
    const bookMetadata = await getBookMetadata();
    const books: PuzzleBook[] = [];

    for (const { id, title } of bookMetadata) {
      const book = await this.generateBookById(id, title, bookType, largePrint);
      if (book.pages.length > 0) {
        books.push(book);
      }
    }

    return {
      books,
      totalBooks: books.length,
      totalPages: books.reduce((total, book) => total + book.totalPages, 0)
    };
  }

  /**
   * Returns a lightweight summary of available books and page counts
   */
  public async getBookSummary(): Promise<{
    totalBooks: number;
    totalPages: number;
    books: Array<{
      id: string;
      title: string;
      wordSearches: number;
      crosswords: number;
      totalPages: number;
    }>;
  }> {
    const bookMetadata = await getBookMetadata();
    const books: Array<{
      id: string;
      title: string;
      wordSearches: number;
      crosswords: number;
      totalPages: number;
    }> = [];

    for (const { id, title } of bookMetadata) {
      const wsPaths = await getPuzzleFilePathsForBook(id, 'wordsearch');
      const cwPaths = await getPuzzleFilePathsForBook(id, 'crossword');
      const wordSearches = wsPaths.length;
      const crosswords = cwPaths.length;
      books.push({
        id,
        title,
        wordSearches,
        crosswords,
        totalPages: wordSearches + crosswords,
      });
    }

    return {
      totalBooks: books.length,
      totalPages: books.reduce((sum, b) => sum + b.totalPages, 0),
      books,
    };
  }
}

/**
 * Formats a puzzle book into a string for printing or saving to a file.
 * @param book The puzzle book to format.
 * @returns A string representation of the book.
 */
export function formatBookForPrint(book: PuzzleBook): string {
  let output = `Book Title: ${book.title}\n`;
  output += `Theme: ${book.theme}\n`;
  output += `Total Pages: ${book.totalPages}\n\n`;

  book.pages.forEach((page, index) => {
    output += `Page ${index + 1}: ${page.title}\n`;
    output += `Type: ${page.type}\n`;
    output += `Difficulty: ${page.difficulty}\n\n`;

    if (page.type === 'wordsearch') {
      const wsData = page.data as WordSearchResult;
      // Add word search grid and word list to output
      wsData.grid.forEach(row => {
        output += row.join(' ') + '\n';
      });
      output += '\nWords to find:\n';
      output += wsData.words.join(', ') + '\n';
    } else if (page.type === 'crossword') {
      const cwData = page.data as CrosswordResult;
      // Add crossword grid and clues to output
      cwData.grid.forEach(row => {
        output += row.map(cell => (cell.isBlack ? '#' : cell.letter)).join(' ') + '\n';
      });
      output += '\nAcross Clues:\n';
      cwData.clues.filter(c => c.direction === 'across').forEach(clue => {
        output += `${clue.number}. ${clue.clue}\n`;
      });
      output += '\nDown Clues:\n';
      cwData.clues.filter(c => c.direction === 'down').forEach(clue => {
        output += `${clue.number}. ${clue.clue}\n`;
      });
    }
    output += '\n---\n\n';
  });

  return output;
}