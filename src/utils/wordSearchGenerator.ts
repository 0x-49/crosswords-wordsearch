export interface WordSearchConfig {
  gridSize: number;
  words: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  largePrint?: boolean;
}

export interface WordPlacement {
  word: string;
  startRow: number;
  startCol: number;
  direction: 'horizontal' | 'vertical' | 'diagonal' | 'horizontal-reverse' | 'vertical-reverse' | 'diagonal-reverse';
  endRow: number;
  endCol: number;
}

export interface WordSearchResult {
  grid: string[][];
  placements: WordPlacement[];
  words: string[];
}

const DIRECTIONS = [
  { name: 'horizontal', dr: 0, dc: 1 },
  { name: 'vertical', dr: 1, dc: 0 },
  { name: 'diagonal', dr: 1, dc: 1 },
  { name: 'horizontal-reverse', dr: 0, dc: -1 },
  { name: 'vertical-reverse', dr: -1, dc: 0 },
  { name: 'diagonal-reverse', dr: -1, dc: -1 }
] as const;

export class WordSearchGenerator {
  private grid: string[][];
  private size: number;
  private placements: WordPlacement[] = [];

  constructor(size: number) {
    this.size = size;
    this.grid = Array(size).fill(null).map(() => Array(size).fill(''));
  }

  private canPlaceWord(word: string, row: number, col: number, direction: typeof DIRECTIONS[number]): boolean {
    const { dr, dc } = direction;
    
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dr;
      const newCol = col + i * dc;
      
      // Check bounds
      if (newRow < 0 || newRow >= this.size || newCol < 0 || newCol >= this.size) {
        return false;
      }
      
      // Check if cell is empty or contains the same letter
      const currentCell = this.grid[newRow][newCol];
      if (currentCell !== '' && currentCell !== word[i]) {
        return false;
      }
    }
    
    return true;
  }

  private placeWord(word: string, row: number, col: number, direction: typeof DIRECTIONS[number]): void {
    const { dr, dc } = direction;
    
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dr;
      const newCol = col + i * dc;
      this.grid[newRow][newCol] = word[i];
    }
    
    const endRow = row + (word.length - 1) * dr;
    const endCol = col + (word.length - 1) * dc;
    
    this.placements.push({
      word,
      startRow: row,
      startCol: col,
      direction: direction.name as any,
      endRow,
      endCol
    });
  }

  private getAvailableDirections(difficulty: 'Easy' | 'Medium' | 'Hard'): (typeof DIRECTIONS[number])[] {
    switch (difficulty) {
      case 'Easy':
        return [...DIRECTIONS.slice(0, 2)]; // horizontal, vertical
      case 'Medium':
        return [...DIRECTIONS.slice(0, 4)]; // horizontal, vertical, diagonal, horizontal-reverse
      case 'Hard':
        return [...DIRECTIONS]; // all directions
      default:
        return [...DIRECTIONS.slice(0, 2)];
    }
  }

  private fillEmptyCells(): void {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.grid[row][col] === '') {
          this.grid[row][col] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
  }

  public generateWordSearch(config: WordSearchConfig): WordSearchResult {
    const { words, difficulty } = config;
    const availableDirections = this.getAvailableDirections(difficulty);
    const processedWords = words.map(word => word.toUpperCase().replace(/[^A-Z]/g, ''));
    
    // Sort words by length (longest first) for better placement
    const sortedWords = processedWords.sort((a, b) => b.length - a.length);
    
    for (const word of sortedWords) {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 100;
      
      while (!placed && attempts < maxAttempts) {
        const direction = availableDirections[Math.floor(Math.random() * availableDirections.length)];
        const row = Math.floor(Math.random() * this.size);
        const col = Math.floor(Math.random() * this.size);
        
        if (this.canPlaceWord(word, row, col, direction)) {
          this.placeWord(word, row, col, direction);
          placed = true;
        }
        
        attempts++;
      }
      
      if (!placed) {
        console.warn(`Could not place word: ${word}`);
      }
    }
    
    this.fillEmptyCells();
    
    return {
      grid: this.grid,
      placements: this.placements,
      words: processedWords
    };
  }
}

export const WORD_THEMES = {
  'Animals': [
    'CAT', 'DOG', 'ELEPHANT', 'LION', 'TIGER', 'BEAR', 'WOLF', 'FOX', 'RABBIT', 'DEER',
    'HORSE', 'COW', 'PIG', 'SHEEP', 'GOAT', 'CHICKEN', 'DUCK', 'GOOSE', 'TURKEY', 'EAGLE',
    'HAWK', 'OWL', 'PARROT', 'PENGUIN', 'DOLPHIN', 'WHALE', 'SHARK', 'FISH', 'OCTOPUS', 'CRAB'
  ],
  'Nature': [
    'TREE', 'FLOWER', 'GRASS', 'MOUNTAIN', 'RIVER', 'OCEAN', 'LAKE', 'FOREST', 'DESERT', 'BEACH',
    'CLOUD', 'RAIN', 'SNOW', 'WIND', 'STORM', 'RAINBOW', 'SUNSET', 'SUNRISE', 'MOON', 'STAR',
    'ROCK', 'STONE', 'SAND', 'LEAF', 'BRANCH', 'ROOT', 'SEED', 'FRUIT', 'BERRY', 'MUSHROOM'
  ],
  'Food': [
    'APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'STRAWBERRY', 'PIZZA', 'BURGER', 'SANDWICH', 'SALAD', 'SOUP',
    'BREAD', 'CHEESE', 'MILK', 'BUTTER', 'EGGS', 'CHICKEN', 'BEEF', 'FISH', 'RICE', 'PASTA',
    'COOKIE', 'CAKE', 'PIE', 'CHOCOLATE', 'CANDY', 'ICE CREAM', 'COFFEE', 'TEA', 'JUICE', 'WATER'
  ],
  'Sports': [
    'FOOTBALL', 'BASKETBALL', 'BASEBALL', 'SOCCER', 'TENNIS', 'GOLF', 'SWIMMING', 'RUNNING', 'CYCLING', 'BOXING',
    'HOCKEY', 'VOLLEYBALL', 'BADMINTON', 'CRICKET', 'RUGBY', 'SKIING', 'SNOWBOARDING', 'SURFING', 'DIVING', 'WRESTLING',
    'GYMNASTICS', 'TRACK', 'FIELD', 'MARATHON', 'SPRINT', 'JUMP', 'THROW', 'CATCH', 'KICK', 'SCORE'
  ],
  'Colors': [
    'RED', 'BLUE', 'GREEN', 'YELLOW', 'ORANGE', 'PURPLE', 'PINK', 'BROWN', 'BLACK', 'WHITE',
    'GRAY', 'SILVER', 'GOLD', 'BRONZE', 'MAROON', 'NAVY', 'TEAL', 'LIME', 'OLIVE', 'AQUA',
    'FUCHSIA', 'VIOLET', 'INDIGO', 'TURQUOISE', 'CORAL', 'SALMON', 'CRIMSON', 'SCARLET', 'AZURE', 'IVORY'
  ],
  'School': [
    'TEACHER', 'STUDENT', 'BOOK', 'PENCIL', 'PEN', 'PAPER', 'DESK', 'CHAIR', 'BOARD', 'CHALK',
    'ERASER', 'RULER', 'CALCULATOR', 'COMPUTER', 'LIBRARY', 'CLASSROOM', 'HOMEWORK', 'TEST', 'GRADE', 'STUDY',
    'LEARN', 'READ', 'WRITE', 'MATH', 'SCIENCE', 'HISTORY', 'ENGLISH', 'ART', 'MUSIC', 'GYM'
  ],
  'Holidays': [
    'CHRISTMAS', 'HALLOWEEN', 'THANKSGIVING', 'EASTER', 'VALENTINE', 'BIRTHDAY', 'PARTY', 'GIFT', 'CAKE', 'CANDLE',
    'DECORATION', 'CELEBRATION', 'FAMILY', 'FRIENDS', 'JOY', 'HAPPINESS', 'LOVE', 'PEACE', 'HOPE', 'TRADITION',
    'SANTA', 'REINDEER', 'SNOWMAN', 'PUMPKIN', 'TURKEY', 'BUNNY', 'EGGS', 'HEART', 'CUPID', 'FIREWORKS'
  ],
  'Transportation': [
    'CAR', 'TRUCK', 'BUS', 'TRAIN', 'PLANE', 'BOAT', 'SHIP', 'BICYCLE', 'MOTORCYCLE', 'HELICOPTER',
    'SUBWAY', 'TAXI', 'VAN', 'SCOOTER', 'SKATEBOARD', 'ROLLER SKATES', 'WAGON', 'SLED', 'CANOE', 'KAYAK',
    'ROCKET', 'SPACESHIP', 'HOT AIR BALLOON', 'FERRY', 'CRUISE', 'YACHT', 'SAILBOAT', 'SPEEDBOAT', 'JET', 'GLIDER'
  ]
};

export function getRandomWordsFromTheme(theme: keyof typeof WORD_THEMES, count: number): string[] {
  const words = WORD_THEMES[theme];
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, words.length));
}

export function generateWordSearchPuzzle(
  theme: keyof typeof WORD_THEMES,
  difficulty: 'Easy' | 'Medium' | 'Hard',
  gridSize: number = 15,
  wordCount: number = 15
): WordSearchResult {
  const words = getRandomWordsFromTheme(theme, wordCount);
  const generator = new WordSearchGenerator(gridSize);
  
  return generator.generateWordSearch({
    gridSize,
    words,
    difficulty
  });
}