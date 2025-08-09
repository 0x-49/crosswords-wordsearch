import { generateAllBooks } from '../src/utils/bookGenerator';
import dotenv from 'dotenv';
import path from 'path';

// Configure dotenv to load variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const USER_ID = 'e17047d6-b9a7-456c-ba5e-4acda9899edf';

async function generateCollections() {
  console.log('Starting generation of all book collections...');
  console.log(`Using User ID: ${USER_ID}`);

  const bookTypes: ('WORD_SEARCH' | 'CROSSWORD' | 'MIXED')[] = ['WORD_SEARCH', 'CROSSWORD', 'MIXED'];

  for (const bookType of bookTypes) {
    try {
      console.log(`\n--- Generating collection for book type: ${bookType} ---`);
      // Generate standard print version
      const generatedBooks = await generateAllBooks(USER_ID, bookType, false);
      console.log(`Successfully generated ${generatedBooks.length} books for type: ${bookType}`);

      // Generate large print version
      console.log(`--- Generating LARGE PRINT collection for book type: ${bookType} ---`);
      const generatedLargePrintBooks = await generateAllBooks(USER_ID, bookType, true);
      console.log(`Successfully generated ${generatedLargePrintBooks.length} large print books for type: ${bookType}`);

    } catch (error) {
      console.error(`Failed to generate books for type ${bookType}:`, error);
    }
  }

  console.log('\n--- All book generation tasks complete. ---');
}

generateCollections();
