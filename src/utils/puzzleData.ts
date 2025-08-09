import fs from 'fs/promises';
import path from 'path';
import { EOL } from 'os';

// Define the paths to the data directories
const WORDSEARCH_DATA_PATH = 'C:/personal/amazon kdp/output_wordSearchData';
const CROSSWORD_DATA_PATH = 'C:/personal/amazon kdp/output_data_crossWord';
const BOOK_STRUCTURE_PATH = 'c:/personal/amazon kdp/finalBooks_Structure_01.csv';

// Types based on the JSON structure
export interface WordSearchData {
  metadata: {
    id: string;
    title: string;
    description: string;
  };
  words: string[];
}

export interface CrosswordData {
  metadata: {
    id: string;
    title: string;
    description: string;
  };
  dimensions: {
    rows: number;
    cols: number;
  };
  grid: string[][];
  clues: {
    across: { number: number; word: string; clue: string; start: { row: number; col: number } }[];
    down: { number: number; word: string; clue: string; start: { row: number; col: number } }[];
  };
}

export interface BookMetadata {
  title: string;
  id: string;
}

/**
 * Gets a list of all puzzle file names from a directory.
 * @param directoryPath The path to the directory.
 * @returns A promise that resolves to an array of file names.
 */
const getPuzzleFiles = async (directoryPath: string): Promise<string[]> => {
  try {
    const files = await fs.readdir(directoryPath);
    return files.filter(file => file.endsWith('.json'));
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}:`, error);
    return [];
  }
};

/**
 * Selects a random subset of items from an array.
 * @param array The array to select from.
 * @param count The number of items to select.
 * @returns A new array with the randomly selected items.
 */
const getRandomSubset = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Gets a list of random puzzle file paths.
 * @param type The type of puzzle ('wordsearch' or 'crossword').
 * @param count The number of files to get.
 * @returns A promise that resolves to an array of full file paths.
 */
export const getRandomPuzzleFilePaths = async (type: 'wordsearch' | 'crossword', count: number): Promise<string[]> => {
  const directoryPath = type === 'wordsearch' ? WORDSEARCH_DATA_PATH : CROSSWORD_DATA_PATH;
  const allFiles = await getPuzzleFiles(directoryPath);
  if (allFiles.length === 0) {
    return [];
  }
  const randomFiles = getRandomSubset(allFiles, count);
  return randomFiles.map(file => path.join(directoryPath, file));
};

/**
 * Reads and parses a JSON puzzle file.
 * @param filePath The full path to the JSON file.
 * @returns A promise that resolves to the parsed puzzle data.
 */
export const readPuzzleFile = async <T>(filePath: string): Promise<T | null> => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error reading or parsing file ${filePath}:`, error);
    return null;
  }
};

/**
 * Reads and parses the book structure CSV file.
 * @returns A promise that resolves to an array of BookMetadata objects.
 */
export const getBookMetadata = async (): Promise<BookMetadata[]> => {
  try {
    const fileContent = await fs.readFile(BOOK_STRUCTURE_PATH, 'utf-8');
    const lines = fileContent.split(EOL).slice(1); // Skip header row
    return lines
      .map(line => {
        const parts = line.split(',');
        if (parts.length < 2) return null;
        // Handles cases where the title is quoted and contains a comma
        const id = parts.pop()?.trim();
        const title = parts.join(',').replace(/"/g, '').trim();
        if (!id || !title) return null;
        return { title, id };
      })
      .filter((item): item is BookMetadata => item !== null);
  } catch (error) {
    console.error(`Error reading or parsing book structure file ${BOOK_STRUCTURE_PATH}:`, error);
    return [];
  }
};

/**
 * Gets all puzzle file paths for a specific book ID.
 * @param bookId The ID of the book.
 * @param type The type of puzzle ('wordsearch' or 'crossword').
 * @returns A promise that resolves to an array of full file paths.
 */
export const getPuzzleFilePathsForBook = async (bookId: string, type: 'wordsearch' | 'crossword'): Promise<string[]> => {
  const directoryPath = type === 'wordsearch' ? WORDSEARCH_DATA_PATH : CROSSWORD_DATA_PATH;
  try {
    const allFiles = await fs.readdir(directoryPath);
    const bookFiles = allFiles.filter(file => file.startsWith(`${bookId}_`) && file.endsWith('.json'));
    return bookFiles.map(file => path.join(directoryPath, file));
  } catch (error) {
    console.error(`Error reading directory ${directoryPath} for book ID ${bookId}:`, error);
    return [];
  }
};
