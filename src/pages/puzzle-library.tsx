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
import { PrismaClient } from '@prisma/client';
import Head from 'next/head';
import Link from 'next/link';

import CrosswordDisplay from '@/components/CrosswordDisplay';
import WordSearchDisplay from '@/components/WordSearchDisplay';
import SimpleFavoritesManager from '@/lib/simpleFavorites';
import { 
  Search, 
  Grid3X3, 
  Puzzle, 
  Filter,
  Star,
  Clock,
  Target,
  Sparkles,
  BookOpen,
  Eye,
  Heart,
  TrendingUp,
  Zap,
  Brain,
  Gamepad2,
  Trophy,
  ChevronRight,
  RefreshCw,
  SortAsc,
  SortDesc,
  Calendar,
  Hash,
  Tag,
  Users
} from 'lucide-react';

interface PuzzleItem {
  id: string;
  title: string;
  type: 'wordsearch' | 'crossword';
  theme: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  wordCount?: number;
  gridSize?: string;
  createdAt: Date;
  updatedAt: Date;
  isFavorite?: boolean;
  playCount?: number;
  rating?: number;
  tags?: string[];
  description?: string;
}

interface FilterState {
  search: string;
  type: 'all' | 'wordsearch' | 'crossword';
  difficulty: 'all' | 'Easy' | 'Medium' | 'Hard';
  theme: string;
  sortBy: 'newest' | 'oldest' | 'difficulty' | 'popularity' | 'title';
  sortOrder: 'asc' | 'desc';
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

export default function PuzzleLibrary() {
  const { user } = useAuth();
  const [puzzles, setPuzzles] = useState<PuzzleItem[]>([]);
  const [filteredPuzzles, setFilteredPuzzles] = useState<PuzzleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPuzzle, setSelectedPuzzle] = useState<any>(null);
  const [puzzleViewOpen, setPuzzleViewOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState({
    total: 0,
    wordsearch: 0,
    crossword: 0,
    themes: 0,
    favorites: 0
  });

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: 'all',
    difficulty: 'all',
    theme: '',
    sortBy: 'newest',
    sortOrder: 'desc'
  });

  const [themes, setThemes] = useState<string[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<any>(null);
  const [favoritesManager] = useState(() => SimpleFavoritesManager.getInstance());
  const [currentUserId] = useState('default-user-id'); // In production, get from auth context

  // Load puzzles and stats
  useEffect(() => {
    loadPuzzles();
    loadUserFavorites();
  }, []);

  // Apply filters whenever filters or puzzles change
  useEffect(() => {
    if (filters.search) {
      performEnhancedSearch();
    } else {
      applyFilters();
    }
  }, [filters, puzzles]);

  const loadPuzzles = async () => {
    try {
      setLoading(true);
      
      // Fetch both word searches and crosswords
      const [wordSearchResponse, crosswordResponse] = await Promise.all([
        fetch('/api/word-search/list'),
        fetch('/api/crossword/list')
      ]);

      const wordSearches = wordSearchResponse.ok ? await wordSearchResponse.json() : [];
      const crosswords = crosswordResponse.ok ? await crosswordResponse.json() : [];

      // Transform data to unified format
      const allPuzzles: PuzzleItem[] = [
        ...wordSearches.map((ws: any) => ({
          id: ws.id,
          title: ws.title,
          type: 'wordsearch' as const,
          theme: ws.theme || 'General',
          difficulty: ws.difficulty || 'Medium',
          wordCount: ws.words?.length || 0,
          gridSize: ws.grid ? `${ws.grid.length}x${ws.grid[0]?.length || 0}` : '15x15',
          createdAt: new Date(ws.createdAt),
          updatedAt: new Date(ws.updatedAt),
          description: ws.description,
          tags: ws.theme ? [ws.theme, ws.difficulty] : [ws.difficulty]
        })),
        ...crosswords.map((cw: any) => ({
          id: cw.id,
          title: cw.title,
          type: 'crossword' as const,
          theme: cw.theme || 'General',
          difficulty: cw.difficulty || 'Medium',
          wordCount: cw.clues?.length || 0,
          gridSize: cw.grid ? `${cw.grid.length}x${cw.grid[0]?.length || 0}` : '15x15',
          createdAt: new Date(cw.createdAt),
          updatedAt: new Date(cw.updatedAt),
          description: cw.description,
          tags: cw.theme ? [cw.theme, cw.difficulty] : [cw.difficulty]
        }))
      ];

      setPuzzles(allPuzzles);

      // Extract unique themes
      const uniqueThemes = Array.from(new Set(allPuzzles.map(p => p.theme))).sort();
      setThemes(uniqueThemes);

      // Calculate stats
      setStats({
        total: allPuzzles.length,
        wordsearch: allPuzzles.filter(p => p.type === 'wordsearch').length,
        crossword: allPuzzles.filter(p => p.type === 'crossword').length,
        themes: uniqueThemes.length,
        favorites: 0 // TODO: Load from user preferences
      });

    } catch (error) {
      console.error('Error loading puzzles:', error);
      toast.error('Failed to load puzzle library');
    } finally {
      setLoading(false);
    }
  };

  const loadUserFavorites = async () => {
    try {
      // Initialize favorites from localStorage
      favoritesManager.initializeFromStorage(currentUserId);
      
      // Update favorites set
      const userFavorites = favoritesManager.getFavorites(currentUserId);
      setFavorites(new Set(userFavorites));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        favorites: userFavorites.length
      }));
    } catch (error) {
      console.error('Error loading user favorites:', error);
    }
  };

  const performEnhancedSearch = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/search/smart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: filters.search,
          type: filters.type,
          theme: filters.theme,
          difficulty: filters.difficulty,
          limit: 50
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Transform search results to match expected format
        const transformedResults = data.results.map((result: any) => ({
          ...result.puzzle,
          type: result.type,
          isFavorite: favorites.has(result.puzzle.id),
          tags: result.matchReasons
        }));
        
        setFilteredPuzzles(transformedResults);
        setSearchSuggestions(data.suggestions);
      } else {
        throw new Error('Search failed');
      }
    } catch (error) {
      console.error('Enhanced search error:', error);
      toast.error('Search failed. Using basic filtering.');
      applyFilters(); // Fallback to basic filtering
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...puzzles];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(puzzle =>
        puzzle.title.toLowerCase().includes(searchLower) ||
        puzzle.theme.toLowerCase().includes(searchLower) ||
        puzzle.description?.toLowerCase().includes(searchLower) ||
        puzzle.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(puzzle => puzzle.type === filters.type);
    }

    // Difficulty filter
    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(puzzle => puzzle.difficulty === filters.difficulty);
    }

    // Theme filter
    if (filters.theme) {
      filtered = filtered.filter(puzzle => puzzle.theme === filters.theme);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          break;
        case 'popularity':
          comparison = (b.playCount || 0) - (a.playCount || 0);
          break;
        case 'oldest':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'newest':
        default:
          comparison = b.createdAt.getTime() - a.createdAt.getTime();
          break;
      }

      return filters.sortOrder === 'desc' ? comparison : -comparison;
    });

    setFilteredPuzzles(filtered);
  };

  const toggleFavorite = (puzzleId: string) => {
    const newFavorites = new Set(favorites);
    let wasAdded = false;
    
    if (newFavorites.has(puzzleId)) {
      newFavorites.delete(puzzleId);
      favoritesManager.removeFavorite(currentUserId, puzzleId);
      toast.success('Removed from favorites');
    } else {
      newFavorites.add(puzzleId);
      wasAdded = favoritesManager.addFavorite(currentUserId, puzzleId);
      if (wasAdded) {
        toast.success('Added to favorites');
      }
    }
    
    setFavorites(newFavorites);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      favorites: newFavorites.size
    }));
  };

  const viewPuzzle = async (puzzle: PuzzleItem) => {
    try {
      // Fetch full puzzle data
      const response = await fetch(`/api/${puzzle.type === 'wordsearch' ? 'word-search' : 'crossword'}/${puzzle.id}`);
      if (response.ok) {
        const fullPuzzle = await response.json();
        setSelectedPuzzle(fullPuzzle);
        setPuzzleViewOpen(true);
      } else {
        throw new Error('Failed to fetch puzzle');
      }
    } catch (error) {
      console.error('Error loading puzzle:', error);
      toast.error('Failed to load puzzle');
    }
  };

  const playPuzzle = (puzzle: PuzzleItem) => {
    const slug = `${puzzle.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}-${puzzle.id}`;
    window.open(`/puzzle/${puzzle.type}/${slug}`, '_blank');
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      difficulty: 'all',
      theme: '',
      sortBy: 'newest',
      sortOrder: 'desc'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'wordsearch' ? Grid3X3 : Puzzle;
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-lg text-gray-600">Loading your puzzle library...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Head>
        <title>Puzzle Library - CrossWord & WordSearch</title>
        <meta name="description" content="Explore our massive collection of 77,555+ crossword and word search puzzles. Advanced search, filtering, and discovery features." />
        <meta name="keywords" content="puzzle library, crossword puzzles, word search puzzles, brain games, puzzle collection" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Brain className="h-10 w-10 text-blue-600" />
              Puzzle Library
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our massive collection of {stats.total.toLocaleString()}+ puzzles. 
              Advanced search, filtering, and discovery features to find your perfect challenge.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stats.total.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Puzzles</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Grid3X3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stats.wordsearch.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Word Searches</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Puzzle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stats.crossword.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Crosswords</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Tag className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stats.themes}</div>
                  <div className="text-sm text-gray-600">Themes</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{favorites.size}</div>
                  <div className="text-sm text-gray-600">Favorites</div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search puzzles, themes, or keywords..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <Select value={filters.type} onValueChange={(value: any) => setFilters(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="wordsearch">Word Search</SelectItem>
                  <SelectItem value="crossword">Crossword</SelectItem>
                </SelectContent>
              </Select>

              {/* Difficulty Filter */}
              <Select value={filters.difficulty} onValueChange={(value: any) => setFilters(prev => ({ ...prev, difficulty: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              {/* Theme Filter */}
              <Select value={filters.theme} onValueChange={(value) => setFilters(prev => ({ ...prev, theme: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Themes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Themes</SelectItem>
                  {themes.map(theme => (
                    <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <div className="flex gap-2">
                <Select value={filters.sortBy} onValueChange={(value: any) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="difficulty">Difficulty</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilters(prev => ({ 
                    ...prev, 
                    sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' 
                  }))}
                  className="px-3"
                >
                  {filters.sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                Showing {filteredPuzzles.length.toLocaleString()} of {stats.total.toLocaleString()} puzzles
                {filters.search && (
                  <span className="ml-2 text-blue-600">
                    • Enhanced search active
                  </span>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>

            {/* Search Suggestions */}
            {searchSuggestions && filters.search && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 Search Suggestions</h4>
                
                {searchSuggestions.relatedSearches.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-blue-700 mb-1">Related searches:</p>
                    <div className="flex flex-wrap gap-2">
                      {searchSuggestions.relatedSearches.map((term: string) => (
                        <button
                          key={term}
                          onClick={() => setFilters(prev => ({ ...prev, search: term }))}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {searchSuggestions.themes.length > 0 && (
                  <div>
                    <p className="text-sm text-blue-700 mb-1">Popular themes:</p>
                    <div className="flex flex-wrap gap-2">
                      {searchSuggestions.themes.slice(0, 5).map((theme: string) => (
                        <button
                          key={theme}
                          onClick={() => setFilters(prev => ({ ...prev, theme, search: '' }))}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Puzzle Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filteredPuzzles.map((puzzle, index) => {
              const TypeIcon = getTypeIcon(puzzle.type);
              return (
                <motion.div key={puzzle.id} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-200 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-5 w-5 text-blue-600" />
                          <Badge variant="outline" className={getDifficultyColor(puzzle.difficulty)}>
                            {puzzle.difficulty}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(puzzle.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart 
                            className={`h-4 w-4 ${favorites.has(puzzle.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                          />
                        </Button>
                      </div>
                      
                      <CardTitle className="text-lg leading-tight">{puzzle.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {puzzle.description || `A ${puzzle.difficulty.toLowerCase()} ${puzzle.type} puzzle about ${puzzle.theme.toLowerCase()}.`}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {/* Puzzle Info */}
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {puzzle.theme}
                          </span>
                          <span className="flex items-center gap-1">
                            <Hash className="h-3 w-3" />
                            {puzzle.wordCount} words
                          </span>
                        </div>

                        {/* Tags */}
                        {puzzle.tags && puzzle.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {puzzle.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {puzzle.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{puzzle.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            onClick={() => playPuzzle(puzzle)}
                            className="flex-1"
                          >
                            <Gamepad2 className="h-4 w-4 mr-2" />
                            Play
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => viewPuzzle(puzzle)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Empty State */}
          {filteredPuzzles.length === 0 && !loading && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No puzzles found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or clearing filters</p>
              <Button onClick={clearFilters}>
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </div>

        {/* Puzzle View Dialog */}
        <Dialog open={puzzleViewOpen} onOpenChange={setPuzzleViewOpen}>
          <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedPuzzle?.type === 'wordsearch' ? (
                  <Grid3X3 className="h-5 w-5" />
                ) : (
                  <Puzzle className="h-5 w-5" />
                )}
                {selectedPuzzle?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedPuzzle && (
              <div className="overflow-auto max-h-[80vh]">
                {selectedPuzzle.type === 'wordsearch' ? (
                  <WordSearchDisplay
                    wordSearch={selectedPuzzle}
                    title={selectedPuzzle.title}
                    theme={selectedPuzzle.theme}
                    difficulty={selectedPuzzle.difficulty}
                    showSolution={false}
                  />
                ) : (
                  <CrosswordDisplay
                    crossword={selectedPuzzle}
                    title={selectedPuzzle.title}
                    theme={selectedPuzzle.theme}
                    difficulty={selectedPuzzle.difficulty}
                    showSolution={false}
                  />
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
