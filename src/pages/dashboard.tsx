import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import Link from "next/link";
import {
  Plus,
  BookOpen,
  Puzzle,
  Settings,
  Download,
  Eye,
  Trash2,
  LogOut,
  Grid3X3,
  Target,
  Clock,
  Star,
  Users,
  TrendingUp,
  Search,
  Filter,
  Calendar,
  FileText,
  Zap,
  Library,
  Sparkles,
  Award,
  BarChart3,
  Rocket,
  Crown,
  Wand2,
  Play
} from "lucide-react";
import { WORD_THEMES } from "@/utils/wordSearchGenerator";
import InteractiveWordSearch from "@/components/InteractiveWordSearch";

interface WordSearch {
  id: string;
  title: string;
  theme: string;
  difficulty: string;
  gridSize: number;
  words: string[];
  createdAt: string;
  updatedAt: string;
}

interface WordSearchWithGrid extends WordSearch {
  grid: string[][];
  solution: any[];
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

export default function Dashboard() {
  const { signOut, user } = useAuth();
  const [wordSearches, setWordSearches] = useState<WordSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [selectedWordSearch, setSelectedWordSearch] = useState<WordSearchWithGrid | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [gameDialogOpen, setGameDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTheme, setFilterTheme] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    theme: "",
    difficulty: "Medium",
    gridSize: 15,
    wordCount: 15,
    customWords: ""
  });

  useEffect(() => {
    fetchWordSearches();
  }, []);

  const fetchWordSearches = async () => {
    console.log('Fetching word searches...');
    try {
      const response = await fetch('/api/word-search/list');
      console.log('API Response Status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched word searches data:', data);
        setWordSearches(data);
      } else {
        console.error('Failed to fetch word searches. Status:', response.status);
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        toast.error('Failed to fetch word searches');
      }
    } catch (error) {
      console.error('Error fetching word searches:', error);
      toast.error('An error occurred while fetching word searches.');
    } finally {
      setLoading(false);
    }
  };

  const createWordSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const customWordsArray = formData.customWords
        ? formData.customWords.split('\n').map(word => word.trim()).filter(word => word.length > 0)
        : [];

      const response = await fetch('/api/word-search/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          customWords: customWordsArray.length > 0 ? customWordsArray : undefined,
        }),
      });

      if (response.ok) {
        toast.success('Word search created successfully!');
        setFormData({
          title: "",
          theme: "",
          difficulty: "Medium",
          gridSize: 15,
          wordCount: 15,
          customWords: ""
        });
        fetchWordSearches();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to create word search');
      }
    } catch (error) {
      console.error('Error creating word search:', error);
      toast.error('Failed to create word search');
    } finally {
      setCreating(false);
    }
  };

  const viewWordSearch = async (id: string) => {
    console.log(`Fetching details for word search: ${id}`);
    try {
      const response = await fetch(`/api/word-search/view/${id}`);
      console.log('View API Response Status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched word search details:', data);
        setSelectedWordSearch(data);
        setViewDialogOpen(true);
      } else {
        console.error('Failed to fetch word search details. Status:', response.status);
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        toast.error('Failed to fetch word search details');
      }
    } catch (error) {
      console.error('Error fetching word search details:', error);
      toast.error('An error occurred while fetching word search details.');
    }
  };

  const playWordSearchGame = async (id: string) => {
    try {
      const response = await fetch(`/api/word-search/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedWordSearch(data);
        setGameDialogOpen(true);
      } else {
        toast.error('Failed to load word search game');
      }
    } catch (error) {
      console.error('Error loading word search game:', error);
      toast.error('Failed to load word search game');
    }
  };

  const filteredWordSearches = wordSearches.filter(ws => {
    const matchesSearch = ws.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ws.theme.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTheme = filterTheme === "all" || ws.theme === filterTheme;
    const matchesDifficulty = filterDifficulty === "all" || ws.difficulty === filterDifficulty;
    
    return matchesSearch && matchesTheme && matchesDifficulty;
  });

  const stats = {
    totalPuzzles: wordSearches.length,
    themes: new Set(wordSearches.map(ws => ws.theme)).size,
    avgGridSize: wordSearches.length > 0 ? Math.round(wordSearches.reduce((sum, ws) => sum + ws.gridSize, 0) / wordSearches.length) : 0,
    recentPuzzles: wordSearches.filter(ws => {
      const created = new Date(ws.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return created > weekAgo;
    }).length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 animated-gradient opacity-3" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-info/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container-fluid py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gradient">WordCraft</h1>
                <p className="text-sm text-muted-foreground">Professional Dashboard</p>
              </div>
              <Badge variant="secondary" className="px-4 py-2 rounded-full shadow-soft">
                <Crown className="w-4 h-4 mr-2" />
                Welcome, {user?.email?.split('@')[0]}
              </Badge>
            </div>
            <Button
              onClick={() => signOut()}
              variant="outline"
              size="lg"
              className="group"
            >
              <LogOut className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container-fluid py-12">
        {/* Welcome Section */}
        <motion.div 
          className="mb-12"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="text-center mb-8">
            <h2 className="heading-md mb-4">
              Welcome back to your creative workspace
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Continue building amazing puzzle books that captivate readers and drive sales.
            </p>
          </div>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {[
            { 
              icon: <Puzzle className="h-8 w-8" />, 
              label: "Total Puzzles", 
              value: stats.totalPuzzles, 
              color: "text-purple-600",
              bgColor: "bg-purple-50",
              borderColor: "border-purple-200",
              description: "Puzzles created"
            },
            { 
              icon: <BarChart3 className="h-8 w-8" />, 
              label: "Themes Used", 
              value: stats.themes, 
              color: "text-green-600",
              bgColor: "bg-green-50",
              borderColor: "border-green-200",
              description: "Different categories"
            },
            { 
              icon: <Target className="h-8 w-8" />, 
              label: "Avg Grid Size", 
              value: `${stats.avgGridSize}x${stats.avgGridSize}`, 
              color: "text-blue-600",
              bgColor: "bg-blue-50",
              borderColor: "border-blue-200",
              description: "Standard dimensions"
            },
            { 
              icon: <Rocket className="h-8 w-8" />, 
              label: "This Week", 
              value: stats.recentPuzzles, 
              color: "text-orange-600",
              bgColor: "bg-orange-50",
              borderColor: "border-orange-200",
              description: "Recent creations"
            }
          ].map((stat, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className={`card-interactive group ${stat.bgColor} ${stat.borderColor}`}>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${stat.color} p-3 rounded-2xl bg-white/50 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {stat.description}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Tabs defaultValue="puzzles" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3 h-14 p-1 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="puzzles" className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-soft">
                <Puzzle className="w-4 h-4 mr-2" />
                My Puzzles
              </TabsTrigger>
              <TabsTrigger value="create" className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-soft">
                <Wand2 className="w-4 h-4 mr-2" />
                Create New
              </TabsTrigger>
              <TabsTrigger value="books" className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-soft">
                <Library className="w-4 h-4 mr-2" />
                Book Library
              </TabsTrigger>
            </TabsList>
          </div>

          {/* My Puzzles Tab */}
          <TabsContent value="puzzles" className="space-y-6">
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Puzzle className="h-5 w-5" />
                        My Word Search Puzzles
                      </CardTitle>
                      <CardDescription>
                        Manage and view your created word search puzzles
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search puzzles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={filterTheme} onValueChange={setFilterTheme}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Themes</SelectItem>
                        {Object.keys(WORD_THEMES).map(theme => (
                          <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Puzzles Grid */}
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(6)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                          <CardContent className="p-4">
                            <div className="h-4 bg-muted rounded mb-2"></div>
                            <div className="h-3 bg-muted rounded mb-4 w-2/3"></div>
                            <div className="flex gap-2 mb-4">
                              <div className="h-6 bg-muted rounded w-16"></div>
                              <div className="h-6 bg-muted rounded w-16"></div>
                            </div>
                            <div className="h-8 bg-muted rounded"></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : filteredWordSearches.length === 0 ? (
                    <div className="text-center py-12">
                      <Puzzle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No puzzles found</h3>
                      <p className="text-muted-foreground mb-4">
                        {wordSearches.length === 0 
                          ? "Create your first word search puzzle to get started!"
                          : "Try adjusting your search or filter criteria."
                        }
                      </p>
                      {wordSearches.length === 0 && (
                        <Button onClick={() => {
                          const createTab = document.querySelector('[value="create"]') as HTMLElement;
                          createTab?.click();
                        }}>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Puzzle
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredWordSearches.map((puzzle) => (
                        <motion.div
                          key={puzzle.id}
                          variants={fadeInUp}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Card className="h-full hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="font-semibold text-lg leading-tight">{puzzle.title}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {puzzle.gridSize}x{puzzle.gridSize}
                                </Badge>
                              </div>
                              
                              <div className="flex gap-2 mb-4">
                                <Badge variant="secondary" className="text-xs">
                                  {puzzle.theme}
                                </Badge>
                                <Badge 
                                  variant={puzzle.difficulty === 'Easy' ? 'default' : puzzle.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                                  className="text-xs"
                                >
                                  {puzzle.difficulty}
                                </Badge>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-4">
                                {puzzle.words.length} words • Created {new Date(puzzle.createdAt).toLocaleDateString()}
                              </p>
                              
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => viewWordSearch(puzzle.id)}
                                  className="flex-1"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Export
                                </Button>
                              </div>
                              <Button
                                size="sm"
                                className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                onClick={() => playWordSearchGame(puzzle.id)}
                              >
                                <Play className="h-4 w-4 mr-1" />
                                Play Game
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Create New Tab */}
          <TabsContent value="create" className="space-y-6">
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create New Word Search
                  </CardTitle>
                  <CardDescription>
                    Generate a professional word search puzzle for your collection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={createWordSearch} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Puzzle Title *</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., Animal Kingdom Adventure"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="theme">Theme *</Label>
                          <Select
                            value={formData.theme}
                            onValueChange={(value) => setFormData({ ...formData, theme: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a theme" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(WORD_THEMES).map(theme => (
                                <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="difficulty">Difficulty Level</Label>
                          <Select
                            value={formData.difficulty}
                            onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Easy">Easy (Horizontal & Vertical)</SelectItem>
                              <SelectItem value="Medium">Medium (+ Diagonal & Reverse)</SelectItem>
                              <SelectItem value="Hard">Hard (All Directions)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="gridSize">Grid Size</Label>
                          <Select
                            value={formData.gridSize.toString()}
                            onValueChange={(value) => setFormData({ ...formData, gridSize: parseInt(value) })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">10x10 (Beginner)</SelectItem>
                              <SelectItem value="15">15x15 (Standard)</SelectItem>
                              <SelectItem value="20">20x20 (Expert)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="wordCount">Number of Words</Label>
                          <Select
                            value={formData.wordCount.toString()}
                            onValueChange={(value) => setFormData({ ...formData, wordCount: parseInt(value) })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">10 words</SelectItem>
                              <SelectItem value="15">15 words</SelectItem>
                              <SelectItem value="20">20 words</SelectItem>
                              <SelectItem value="25">25 words</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="customWords">Custom Words (Optional)</Label>
                      <Textarea
                        id="customWords"
                        value={formData.customWords}
                        onChange={(e) => setFormData({ ...formData, customWords: e.target.value })}
                        placeholder="Enter custom words, one per line. Leave empty to use theme words."
                        rows={6}
                        className="resize-none"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        If provided, these words will be used instead of the theme words.
                      </p>
                    </div>

                    <Button type="submit" disabled={creating} className="w-full" size="lg">
                      {creating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating Puzzle...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Create Word Search
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Puzzle Books Tab */}
          <TabsContent value="books" className="space-y-6">
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Puzzle Book Library
                  </CardTitle>
                  <CardDescription>
                    Browse and download professional puzzle books ready for printing and publishing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Main Book Library Feature */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <Library className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">Massive Book Library - 100 Books!</h3>
                          <p className="text-gray-600 mb-4">
                            Access our complete collection of 100 professionally designed puzzle books. Each book contains 150 pages 
                            with 75 word searches and 75 crosswords, perfectly formatted for KDP publishing. Focused on elderly-friendly topics, 
                            kids themes, and relaxation niches.
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                            <div className="text-center">
                              <div className="font-bold text-green-600">100</div>
                              <div className="text-gray-600">Ready Books</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-blue-600">15,000</div>
                              <div className="text-gray-600">Total Pages</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-purple-600">7,500</div>
                              <div className="text-gray-600">Word Searches</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-orange-600">7,500</div>
                              <div className="text-gray-600">Crosswords</div>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <Link href="/book-library">
                              <Button className="flex-1 sm:flex-none">
                                <Library className="h-4 w-4 mr-2" />
                                Browse Book Library
                              </Button>
                            </Link>
                            <Link href="/book-generator">
                              <Button variant="outline" className="flex-1 sm:flex-none">
                                <Settings className="h-4 w-4 mr-2" />
                                Advanced Generator
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Access Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 text-center">
                          <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <h4 className="font-semibold mb-1">Preview Books</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            View complete book contents before downloading
                          </p>
                          <Link href="/book-library">
                            <Button size="sm" variant="outline" className="w-full">
                              Preview Now
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 text-center">
                          <Download className="h-8 w-8 mx-auto mb-2 text-green-600" />
                          <h4 className="font-semibold mb-1">Download PDFs</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Get print-ready PDFs for immediate use
                          </p>
                          <Link href="/book-library">
                            <Button size="sm" variant="outline" className="w-full">
                              Download
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 text-center">
                          <Star className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                          <h4 className="font-semibold mb-1">Popular Themes</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Animals, Nature, Food, Sports, and more
                          </p>
                          <Link href="/book-library">
                            <Button size="sm" variant="outline" className="w-full">
                              Explore
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Interactive Crossword Game */}
                    <div className="text-center py-6 border-t">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200 mb-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <Puzzle className="h-10 w-10 text-purple-600" />
                          <div className="text-left">
                            <h3 className="text-lg font-semibold text-purple-800">Interactive Crossword Game</h3>
                            <p className="text-sm text-purple-600">Play crosswords online with full interactivity, hints, and scoring</p>
                          </div>
                        </div>
                        <div className="flex gap-3 justify-center">
                          <Link href="/play-crossword">
                            <Button className="bg-purple-600 hover:bg-purple-700">
                              <Play className="h-4 w-4 mr-2" />
                              Play Interactive Game
                            </Button>
                          </Link>
                          <Link href="/crossword-demo">
                            <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                              <Eye className="h-4 w-4 mr-2" />
                              View Demo
                            </Button>
                          </Link>
                        </div>
                      </div>
                      
                      <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-lg font-semibold mb-2">Custom Book Creation</h3>
                      <p className="text-muted-foreground mb-4">
                        Create personalized books from your individual puzzles (coming soon)
                      </p>
                      <Button variant="outline" disabled>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Custom Book
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* View Word Search Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              {selectedWordSearch?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedWordSearch && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
              {/* Grid Display */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">{selectedWordSearch.theme}</Badge>
                    <Badge variant={selectedWordSearch.difficulty === 'Easy' ? 'default' : selectedWordSearch.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                      {selectedWordSearch.difficulty}
                    </Badge>
                    <Badge variant="outline">{selectedWordSearch.gridSize}x{selectedWordSearch.gridSize}</Badge>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-card">
                    <div 
                      className="grid gap-1 mx-auto"
                      style={{ 
                        gridTemplateColumns: `repeat(${selectedWordSearch.gridSize}, minmax(0, 1fr))`,
                        maxWidth: '500px',
                        aspectRatio: '1'
                      }}
                    >
                      {selectedWordSearch.grid.map((row, rowIndex) => 
                        row.map((letter, colIndex) => (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            className="aspect-square flex items-center justify-center text-sm font-bold border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                            style={{
                              minHeight: `${Math.max(20, 400 / selectedWordSearch.gridSize)}px`,
                              fontSize: `${Math.max(10, 16 - selectedWordSearch.gridSize * 0.2)}px`
                            }}
                          >
                            {letter}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
=======
                </div>
              </div>

              {/* Word List */}
              <div className="space-y-4">
                <h3 className="font-semibold">Words to Find ({selectedWordSearch.words.length})</h3>
                <ScrollArea className="h-64 border rounded-lg p-4">
                  <div className="space-y-2">
                    {selectedWordSearch.words.map((word, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                        <span className="font-mono">{word}</span>
                        <Badge variant="outline" className="text-xs">
                          {word.length}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Solution
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Interactive Word Search Game Dialog */}
      <Dialog open={gameDialogOpen} onOpenChange={setGameDialogOpen}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Interactive Game: {selectedWordSearch?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedWordSearch && (
            <div className="p-6 pt-0 overflow-auto max-h-[85vh]">
              <InteractiveWordSearch
                wordSearch={{
                  grid: selectedWordSearch.grid,
                  words: selectedWordSearch.words,
                  placements: selectedWordSearch.solution || []
                }}
                title={selectedWordSearch.title}
                theme={selectedWordSearch.theme}
                difficulty={selectedWordSearch.difficulty as 'Easy' | 'Medium' | 'Hard'}
                onComplete={(timeElapsed, wordsFound) => {
                  toast.success(`Congratulations! You found ${wordsFound} words in ${Math.floor(timeElapsed / 60)}:${(timeElapsed % 60).toString().padStart(2, '0')}!`);
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}