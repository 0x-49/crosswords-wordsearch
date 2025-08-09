import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

import CrosswordDisplay from '@/components/CrosswordDisplay';
import CrosswordPreview from '@/components/CrosswordPreview';
import WordSearchDisplay from '@/components/WordSearchDisplay';
import { 
  BookOpen, 
  Download, 
  Eye, 
  Search, 
  Grid3X3, 
  Puzzle, 
  FileText,
  ArrowLeft,
  Star,
  Clock,
  Users,
  Filter,
  Tag,
  Target,
  Sparkles
} from 'lucide-react';
import { 
  bookCategories, 
  bookTags, 
  getThemeMetadata, 
  generateMetadataForAllThemes,
  getThemesByCategory,
  getThemesByTag,
  getThemesByAudience,
  getThemesByDifficulty
} from '@/utils/bookCategories';

interface BookPreview {
  id: string;
  title: string;
  theme: string;
  description: string;
  totalPages: number;
  wordSearchCount: number;
  crosswordCount: number;
  difficulty: string;
  estimatedTime: string;
  popularity: number;
  tags: string[];
  categories: string[];
  subcategories: string[];
  targetAudience: string;
}

interface PuzzlePreview {
  id: string;
  type: 'wordsearch' | 'crossword';
  title: string;
  difficulty: string;
  grid?: string[][];
  words?: string[];
  clues?: { number: number; clue: string; answer: string; direction: 'across' | 'down' }[];
}

interface BookDetails {
  book: BookPreview;
  puzzles: PuzzlePreview[];
  content: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Generate book library from actual themes with enhanced metadata
const generateBookLibrary = async (): Promise<BookPreview[]> => {
  try {
    // Dynamically import the themes to avoid blocking initial load
    const { getAllThemeNamesComplete } = await import('@/utils/elderlyFriendlyThemes');
    const themes = getAllThemeNamesComplete();
    
    // Generate metadata for all themes
    const allMetadata = generateMetadataForAllThemes(themes);
    
    const descriptions: Record<string, string> = {
      "Classic Movies": "Explore the fascinating world of classic cinema with word searches and crosswords featuring legendary films, actors, and directors from Hollywood's golden age.",
      "Vintage Music": "Journey through the golden age of music with puzzles about legendary artists, songs, and musical terms from the era of crooners and big bands.",
      "Golden Age TV": "Relive the magic of television's golden era with puzzles featuring classic shows, beloved characters, and memorable moments from TV history.",
      "Gardening Wisdom": "Cultivate your love for gardening with puzzles about flowers, plants, tools, and time-tested gardening techniques and wisdom.",
      "Traditional Cooking": "Savor the flavors of traditional cooking with puzzles about classic recipes, ingredients, and beloved dishes passed down through generations.",
      "Family Memories": "Celebrate family bonds with puzzles about traditions, celebrations, milestones, and precious family moments that create lasting memories.",
      "Health & Wellness": "Focus on well-being with puzzles about healthy living, exercise, nutrition, mindfulness, and self-care practices for a balanced life.",
      "Hobbies & Crafts": "Explore creative pursuits with puzzles about various hobbies, crafts, artistic endeavors, and the joy of creating with your hands.",
      "Fairy Tales": "Enter the magical world of fairy tales with puzzles about beloved stories, enchanting characters, and timeless adventures that spark imagination.",
      "Zoo Animals": "Discover the animal kingdom with puzzles featuring creatures from around the world, their habitats, and fascinating wildlife facts.",
      "School Days": "Revisit childhood memories with puzzles about school subjects, classroom items, educational experiences, and the joy of learning.",
      "Beach Vacation": "Escape to paradise with puzzles about ocean life, beach activities, tropical getaways, and the relaxing rhythm of seaside living.",
      "Mountain Retreat": "Find peace in nature with puzzles about mountains, forests, wildlife, outdoor adventures, and the serenity of natural landscapes.",
      "Spa & Wellness": "Relax and rejuvenate with puzzles about spa treatments, wellness practices, self-care rituals, and the art of relaxation.",
      "Vintage Cars": "Rev up your engines with puzzles about classic automobiles, vintage car models, automotive history, and the golden age of motoring.",
      "Classic Literature": "Dive into the world of great books with puzzles about famous authors, literary works, characters, and the timeless art of storytelling."
    };
    
    return themes.map((theme, index) => {
      const metadata = allMetadata[theme];
      const description = descriptions[theme] || `Enjoy a comprehensive collection of puzzles themed around ${theme.toLowerCase()}, featuring carefully curated content for hours of engaging entertainment.`;
      
      return {
        id: theme.toLowerCase().replace(/\s+/g, '-'),
        title: `${theme} Puzzle Book`,
        theme,
        description,
        totalPages: 150,
        wordSearchCount: 75,
        crosswordCount: 75,
        difficulty: metadata?.difficulty || 'Mixed',
        estimatedTime: metadata?.estimatedTime || '8-12 hours',
        popularity: metadata?.popularity || Math.floor(Math.random() * 20) + 80,
        tags: metadata?.tags || ['engaging', 'fun', 'challenging'],
        categories: metadata?.categories || ['seniors-lifestyle'],
        subcategories: metadata?.subcategories || ['golden-memories'],
        targetAudience: metadata?.targetAudience || 'Seniors'
      };
    });
  } catch (error) {
    console.error('Error generating book library:', error);
    // Return a fallback empty array if there's an error
    return [];
  }
};

export default function BookLibrary() {
  const { user } = useAuth();
  const [books, setBooks] = useState<BookPreview[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BookPreview[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedBook, setSelectedBook] = useState<BookDetails | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [selectedCrossword, setSelectedCrossword] = useState<any>(null);
  const [crosswordViewOpen, setCrosswordViewOpen] = useState(false);
  const [selectedWordSearch, setSelectedWordSearch] = useState<any>(null);
  const [wordSearchViewOpen, setWordSearchViewOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load books asynchronously on component mount
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setInitialLoading(true);
        const bookLibrary = await generateBookLibrary();
        setBooks(bookLibrary);
        setFilteredBooks(bookLibrary);
      } catch (error) {
        console.error('Failed to load book library:', error);
        // Set empty arrays as fallback
        setBooks([]);
        setFilteredBooks([]);
      } finally {
        setInitialLoading(false);
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    let filtered = books.filter(book => {
      // Text search
      const matchesSearch = searchTerm === '' || 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === 'all' || 
        book.categories.includes(selectedCategory);

      // Tag filter
      const matchesTag = selectedTag === 'all' || 
        book.tags.includes(selectedTag);

      // Difficulty filter
      const matchesDifficulty = selectedDifficulty === 'all' || 
        book.difficulty.toLowerCase().includes(selectedDifficulty.toLowerCase());

      // Audience filter
      const matchesAudience = selectedAudience === 'all' || 
        book.targetAudience === selectedAudience;

      return matchesSearch && matchesCategory && matchesTag && matchesDifficulty && matchesAudience;
    });

    // Sort books
    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'theme':
        filtered.sort((a, b) => a.theme.localeCompare(b.theme));
        break;
      case 'difficulty':
        filtered.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
        break;
      default:
        break;
    }

    setFilteredBooks(filtered);
  }, [searchTerm, selectedCategory, selectedTag, selectedDifficulty, selectedAudience, sortBy, books]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTag('all');
    setSelectedDifficulty('all');
    setSelectedAudience('all');
    setSortBy('popularity');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory !== 'all') count++;
    if (selectedTag !== 'all') count++;
    if (selectedDifficulty !== 'all') count++;
    if (selectedAudience !== 'all') count++;
    return count;
  };

  const previewBook = async (book: BookPreview) => {
    toast.info('This functionality is deprecated. Please use the "Book Generator" page to create book collections.');
  };

  const downloadPDF = async (book: BookPreview) => {
    toast.info('This functionality is deprecated. Please use the "Book Generator" page to create book collections.');
  };

  const viewCrossword = async (puzzle: PuzzlePreview) => {
    try {
      // Generate a real crossword for the selected puzzle
      const { generateCrosswordPuzzle } = await import('@/utils/crosswordGenerator');
      const { getExpandedThemeDataComplete } = await import('@/utils/elderlyFriendlyThemes');
      
      // Get the theme from the selected book
      const theme = selectedBook?.book.theme || 'Classic Movies';
      const clueCount = puzzle.difficulty === 'Easy' ? 8 : puzzle.difficulty === 'Medium' ? 12 : 15;
      
      // Get clues from the elderly friendly themes
      const themeData = getExpandedThemeDataComplete(theme);
      let clues: { word: string; clue: string }[] = [];
      
      if (themeData && themeData.crosswordData) {
        const shuffled = [...themeData.crosswordData].sort(() => Math.random() - 0.5);
        clues = shuffled.slice(0, clueCount);
      } else {
        // Fallback to sample clues if theme not found
        clues = Array.from({ length: clueCount }, (_, i) => ({
          word: `WORD${i + 1}`,
          clue: `Sample clue ${i + 1} for ${theme}`
        }));
      }
      
      const crossword = generateCrosswordPuzzle(clues, puzzle.difficulty as 'Easy' | 'Medium' | 'Hard', 15);
      
      setSelectedCrossword({
        ...crossword,
        title: puzzle.title,
        theme: theme,
        difficulty: puzzle.difficulty
      });
      setCrosswordViewOpen(true);
    } catch (error) {
      console.error('Error generating crossword:', error);
      toast.error('Failed to load crossword');
    }
  };

  const viewWordSearch = async (puzzle: PuzzlePreview) => {
    try {
      // Generate a real word search for the selected puzzle
      const { WordSearchGenerator } = await import('@/utils/wordSearchGenerator');
      const { getExpandedThemeDataComplete } = await import('@/utils/elderlyFriendlyThemes');
      
      // Get the theme from the selected book
      const theme = selectedBook?.book.theme || 'Classic Movies';
      const wordCount = puzzle.difficulty === 'Easy' ? 10 : puzzle.difficulty === 'Medium' ? 15 : 20;
      
      // Get words from the elderly friendly themes
      const themeData = getExpandedThemeDataComplete(theme);
      let words: string[] = [];
      
      if (themeData && themeData.words) {
        const shuffled = [...themeData.words].sort(() => Math.random() - 0.5);
        words = shuffled.slice(0, wordCount);
      } else {
        // Fallback to sample words if theme not found
        words = Array.from({ length: wordCount }, (_, i) => `SAMPLE${i + 1}`);
      }
      
      // Generate word search using the generator directly
      const generator = new WordSearchGenerator(15);
      const wordSearch = generator.generateWordSearch({
        gridSize: 15,
        words,
        difficulty: puzzle.difficulty as 'Easy' | 'Medium' | 'Hard'
      });
      
      setSelectedWordSearch({
        ...wordSearch,
        title: puzzle.title,
        theme: theme,
        difficulty: puzzle.difficulty
      });
      setWordSearchViewOpen(true);
    } catch (error) {
      console.error('Error generating word search:', error);
      toast.error('Failed to load word search');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Puzzle Book Library</h1>
                <p className="text-muted-foreground mt-2">
                  Browse and download professional puzzle books ready for printing
                </p>
              </div>
              <Button
                onClick={() => window.history.back()}
                variant="outline"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">{books.length}</div>
                  <div className="text-sm text-muted-foreground">Available Books</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">{books.length * 150}</div>
                  <div className="text-sm text-muted-foreground">Total Pages</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card>
                <CardContent className="p-6 text-center">
                  <Grid3X3 className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold">{books.length * 75}</div>
                  <div className="text-sm text-muted-foreground">Word Searches</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card>
                <CardContent className="p-6 text-center">
                  <Puzzle className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-2xl font-bold">{books.length * 75}</div>
                  <div className="text-sm text-muted-foreground">Crosswords</div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={fadeInUp} className="mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search books by title, theme, or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Filter Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    {/* Category Filter */}
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {Object.entries(bookCategories).map(([key, category]) => (
                          <SelectItem key={key} value={key}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Tag Filter */}
                    <Select value={selectedTag} onValueChange={setSelectedTag}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tag" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tags</SelectItem>
                        {bookTags.slice(0, 20).map(tag => (
                          <SelectItem key={tag} value={tag}>
                            {tag.charAt(0).toUpperCase() + tag.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Difficulty Filter */}
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Audience Filter */}
                    <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                      <SelectTrigger>
                        <SelectValue placeholder="Audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Audiences</SelectItem>
                        <SelectItem value="Seniors">Seniors</SelectItem>
                        <SelectItem value="Adults">Adults</SelectItem>
                        <SelectItem value="All Ages">All Ages</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Sort By */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="title">Title A-Z</SelectItem>
                        <SelectItem value="theme">Theme</SelectItem>
                        <SelectItem value="difficulty">Difficulty</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Clear Filters */}
                    <Button 
                      variant="outline" 
                      onClick={clearAllFilters}
                      className="flex items-center gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      Clear {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
                    </Button>
                  </div>

                  {/* Active Filters Display */}
                  {getActiveFilterCount() > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-muted-foreground">Active filters:</span>
                      {searchTerm && (
                        <Badge variant="secondary" className="text-xs">
                          Search: "{searchTerm}"
                        </Badge>
                      )}
                      {selectedCategory !== 'all' && (
                        <Badge variant="secondary" className="text-xs">
                          Category: {bookCategories[selectedCategory as keyof typeof bookCategories]?.name}
                        </Badge>
                      )}
                      {selectedTag !== 'all' && (
                        <Badge variant="secondary" className="text-xs">
                          Tag: {selectedTag}
                        </Badge>
                      )}
                      {selectedDifficulty !== 'all' && (
                        <Badge variant="secondary" className="text-xs">
                          Difficulty: {selectedDifficulty}
                        </Badge>
                      )}
                      {selectedAudience !== 'all' && (
                        <Badge variant="secondary" className="text-xs">
                          Audience: {selectedAudience}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Results Count */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      Showing {filteredBooks.length} of {books.length} books
                    </span>
                    {filteredBooks.length > 0 && (
                      <span>
                        Sorted by {sortBy === 'popularity' ? 'popularity' : sortBy}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Loading State */}
          {initialLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Loading Book Library</h3>
              <p className="text-muted-foreground">
                Please wait while we load the puzzle books...
              </p>
            </div>
          ) : (
            <>
              {/* Book Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {filteredBooks.map((book) => (
                  <motion.div key={book.id} variants={fadeInUp}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg leading-tight mb-2">
                              {book.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary" className="text-xs">
                                {book.theme}
                              </Badge>
                              <Badge className={`text-xs ${getDifficultyColor(book.difficulty)}`}>
                                {book.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{book.popularity}</span>
                          </div>
                        </div>
                        <CardDescription className="text-sm line-clamp-3">
                          {book.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-2 text-center text-sm">
                            <div>
                              <div className="font-semibold text-blue-600">{book.totalPages}</div>
                              <div className="text-xs text-muted-foreground">Pages</div>
                            </div>
                            <div>
                              <div className="font-semibold text-green-600">{book.wordSearchCount}</div>
                              <div className="text-xs text-muted-foreground">Word Search</div>
                            </div>
                            <div>
                              <div className="font-semibold text-purple-600">{book.crosswordCount}</div>
                              <div className="text-xs text-muted-foreground">Crossword</div>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1">
                            {book.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Time estimate */}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{book.estimatedTime}</span>
                          </div>

                          {/* Actions */}
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  // Quick play - open a random puzzle from this theme
                                  const puzzleTypes = ['wordsearch', 'crossword'];
                                  const randomType = puzzleTypes[Math.floor(Math.random() * puzzleTypes.length)];
                                  const puzzleId = `${book.theme.replace(/\s+/g, '_')}_${randomType === 'wordsearch' ? 'ws' : 'cw'}_1`;
                                  window.open(`/puzzle/${randomType}/${puzzleId}`, '_blank');
                                }}
                                className="flex-1"
                              >
                                <Puzzle className="h-4 w-4 mr-1" />
                                Play
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => previewBook(book)}
                                disabled={loading}
                                className="flex-1"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => downloadPDF(book)}
                              disabled={generating}
                              className="w-full"
                            >
                              {generating ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                              ) : (
                                <Download className="h-4 w-4 mr-1" />
                              )}
                              Download PDF
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {filteredBooks.length === 0 && !initialLoading && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No books found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or browse all available books.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Preview Dialog */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {selectedBook?.book.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedBook && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
                {/* Book Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Book Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Theme:</span>
                        <Badge variant="secondary">{selectedBook.book.theme}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Pages:</span>
                        <span>{selectedBook.book.totalPages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Word Searches:</span>
                        <span>{selectedBook.book.wordSearchCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Crosswords:</span>
                        <span>{selectedBook.book.crosswordCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Difficulty:</span>
                        <Badge className={getDifficultyColor(selectedBook.book.difficulty)}>
                          {selectedBook.book.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedBook.book.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={() => downloadPDF(selectedBook.book)}
                      disabled={generating}
                    >
                      {generating ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      Download PDF
                    </Button>
                  </div>
                </div>

                {/* Puzzle List */}
                <div className="lg:col-span-2">
                  <h3 className="font-semibold mb-4">Puzzle Contents</h3>
                  <ScrollArea className="h-96">
                    <div className="space-y-2">
                      {selectedBook.puzzles.map((puzzle, index) => (
                        <div key={puzzle.id} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="text-sm font-medium">
                              {index + 1}.
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{puzzle.title}</div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                {puzzle.type === 'wordsearch' ? (
                                  <Grid3X3 className="h-3 w-3" />
                                ) : (
                                  <Puzzle className="h-3 w-3" />
                                )}
                                <span className="capitalize">{puzzle.type}</span>
                                <span>•</span>
                                <span>{puzzle.difficulty}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              Page {index + 1}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const puzzleId = `${selectedBook.book.theme.replace(/\s+/g, '_')}_${puzzle.type === 'wordsearch' ? 'ws' : 'cw'}_${puzzle.type === 'wordsearch' ? Math.ceil((index + 1) / 2) : Math.ceil((index - 74) / 2)}`;
                                window.open(`/puzzle/${puzzle.type}/${puzzleId}`, '_blank');
                              }}
                              className="text-xs px-2 py-1 h-auto"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Play
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={async () => {
                                // Quick view - show the puzzle directly in modal
                                try {
                                  if (puzzle.type === 'wordsearch') {
                                    await viewWordSearch(puzzle);
                                  } else {
                                    await viewCrossword(puzzle);
                                  }
                                } catch (error) {
                                  console.error('Error loading quick view:', error);
                                  toast.error('Failed to load puzzle preview');
                                }
                              }}
                              className="text-xs px-2 py-1 h-auto"
                            >
                              <Sparkles className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Crossword View Dialog */}
        <Dialog open={crosswordViewOpen} onOpenChange={setCrosswordViewOpen}>
          <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Puzzle className="h-5 w-5" />
                {selectedCrossword?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedCrossword && (
              <div className="overflow-auto max-h-[80vh]">
                <CrosswordDisplay
                  crossword={selectedCrossword}
                  title={selectedCrossword.title}
                  theme={selectedCrossword.theme}
                  difficulty={selectedCrossword.difficulty}
                  showSolution={false}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Word Search View Dialog */}
        <Dialog open={wordSearchViewOpen} onOpenChange={setWordSearchViewOpen}>
          <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Grid3X3 className="h-5 w-5" />
                {selectedWordSearch?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedWordSearch && (
              <div className="overflow-auto max-h-[80vh]">
                <WordSearchDisplay
                  wordSearch={selectedWordSearch}
                  title={selectedWordSearch.title}
                  theme={selectedWordSearch.theme}
                  difficulty={selectedWordSearch.difficulty}
                  showSolution={false}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}