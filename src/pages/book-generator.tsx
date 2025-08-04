import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { BookOpen, Download, FileText, Grid3X3, Puzzle, Loader2 } from 'lucide-react';

interface ThemeData {
  themes: string[];
  bookSummary: {
    theme: string;
    wordSearchCount: number;
    crosswordCount: number;
    totalPages: number;
  }[];
  totalThemes: number;
  totalBooks: number;
  totalPages: number;
}

interface BookGenerationResult {
  book: {
    id: string;
    title: string;
    theme: string;
    totalPages: number;
    wordSearchCount: number;
    crosswordCount: number;
  };
  content: string;
  generatedAt: string;
}

interface CollectionSummary {
  totalBooks: number;
  totalPages: number;
  themes: {
    theme: string;
    title: string;
    pages: number;
    wordSearches: number;
    crosswords: number;
  }[];
}

export default function BookGenerator() {
  const { user } = useAuth();
  const [themeData, setThemeData] = useState<ThemeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generatingAll, setGeneratingAll] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [bookType, setBookType] = useState<'WORD_SEARCH' | 'CROSSWORD' | 'MIXED'>('MIXED');
  const [generatedBook, setGeneratedBook] = useState<BookGenerationResult | null>(null);
  const [collectionSummary, setCollectionSummary] = useState<CollectionSummary | null>(null);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      const response = await fetch('/api/books/themes');
      if (response.ok) {
        const data = await response.json();
        setThemeData(data);
      } else {
        toast.error('Failed to fetch themes');
      }
    } catch (error) {
      console.error('Error fetching themes:', error);
      toast.error('Failed to fetch themes');
    } finally {
      setLoading(false);
    }
  };

  const generateBook = async (theme: string, type: typeof bookType) => {
    setGenerating(true);
    try {
      const response = await fetch('/api/books/generate-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme, bookType: type }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedBook(data);
        toast.success(`Generated ${theme} puzzle book successfully!`);
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to generate book');
      }
    } catch (error) {
      console.error('Error generating book:', error);
      toast.error('Failed to generate book');
    } finally {
      setGenerating(false);
    }
  };

  const generateAllBooks = async () => {
    setGeneratingAll(true);
    try {
      const response = await fetch('/api/books/generate-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCollectionSummary(data.collection);
        toast.success('Generated all puzzle books successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to generate all books');
      }
    } catch (error) {
      console.error('Error generating all books:', error);
      toast.error('Failed to generate all books');
    } finally {
      setGeneratingAll(false);
    }
  };

  const downloadBook = (book: BookGenerationResult) => {
    const blob = new Blob([book.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${book.book.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading book generator...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Puzzle Book Generator
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Generate comprehensive puzzle books with word searches and crosswords
            </p>
            
            {themeData && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">{themeData.totalBooks}</div>
                    <div className="text-sm text-gray-600">Total Books</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">{themeData.totalPages}</div>
                    <div className="text-sm text-gray-600">Total Pages</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Grid3X3 className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold">{themeData.totalBooks * 10}</div>
                    <div className="text-sm text-gray-600">Word Searches</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Puzzle className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-2xl font-bold">{themeData.totalBooks * 10}</div>
                    <div className="text-sm text-gray-600">Crosswords</div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <Tabs defaultValue="individual" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="individual">Generate Individual Book</TabsTrigger>
              <TabsTrigger value="collection">Generate All Books</TabsTrigger>
              <TabsTrigger value="summary">Collection Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Individual Puzzle Book</CardTitle>
                  <CardDescription>
                    Select a theme to generate a 20-page puzzle book with 10 word searches and 10 crosswords
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {themeData && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
                      {themeData.themes.map((theme) => (
                        <Button
                          key={theme}
                          variant={selectedTheme === theme ? "default" : "outline"}
                          onClick={() => setSelectedTheme(theme)}
                          className="h-auto p-3 text-left"
                          disabled={generating}
                        >
                          {theme}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <Label className="font-semibold mb-2 block">Book Type</Label>
                    <RadioGroup defaultValue="MIXED" onValueChange={(value) => setBookType(value as typeof bookType)} className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="MIXED" id="r-mixed" />
                        <Label htmlFor="r-mixed">Mixed</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="WORD_SEARCH" id="r-ws" />
                        <Label htmlFor="r-ws">Word Search</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="CROSSWORD" id="r-cw" />
                        <Label htmlFor="r-cw">Crossword</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => selectedTheme && generateBook(selectedTheme, bookType)}
                      disabled={!selectedTheme || generating}
                      className="flex items-center gap-2"
                    >
                      {generating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <BookOpen className="h-4 w-4" />
                      )}
                      {generating ? 'Generating...' : 'Generate Book'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {generatedBook && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{generatedBook.book.title}</span>
                      <Button
                        onClick={() => downloadBook(generatedBook)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Generated on {new Date(generatedBook.generatedAt).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{generatedBook.book.totalPages}</div>
                        <div className="text-sm text-gray-600">Pages</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{generatedBook.book.wordSearchCount}</div>
                        <div className="text-sm text-gray-600">Word Searches</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{generatedBook.book.crosswordCount}</div>
                        <div className="text-sm text-gray-600">Crosswords</div>
                      </div>
                      <div className="text-center">
                        <Badge variant="secondary">{generatedBook.book.theme}</Badge>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="text-xs whitespace-pre-wrap font-mono">
                        {generatedBook.content.substring(0, 2000)}
                        {generatedBook.content.length > 2000 && '...\n\n[Content truncated - download full book to see all puzzles]'}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="collection" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Complete Collection</CardTitle>
                  <CardDescription>
                    Generate all 20 puzzle books across all themes (400 total pages)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <Button
                      onClick={generateAllBooks}
                      disabled={generatingAll}
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      {generatingAll ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <BookOpen className="h-5 w-5" />
                      )}
                      {generatingAll ? 'Generating All Books...' : 'Generate All Books'}
                    </Button>
                  </div>

                  {generatingAll && (
                    <div className="mb-6">
                      <div className="text-center mb-2">
                        <span className="text-sm text-gray-600">Generating puzzle books...</span>
                      </div>
                      <Progress value={50} className="w-full" />
                    </div>
                  )}

                  {collectionSummary && (
                    <div className="space-y-4">
                      <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                        <h3 className="text-lg font-semibold text-green-800 mb-2">
                          Collection Generated Successfully!
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Total Books:</span> {collectionSummary.totalBooks}
                          </div>
                          <div>
                            <span className="font-medium">Total Pages:</span> {collectionSummary.totalPages}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {collectionSummary.themes.map((theme, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-2">{theme.title}</h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div>Pages: {theme.pages}</div>
                                <div>Word Searches: {theme.wordSearches}</div>
                                <div>Crosswords: {theme.crosswords}</div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Collection Overview</CardTitle>
                  <CardDescription>
                    Complete breakdown of all available puzzle book themes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {themeData && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {themeData.bookSummary.map((book, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">{book.theme} Puzzle Book</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div>Total Pages: {book.totalPages}</div>
                              <div>Word Searches: {book.wordSearchCount}</div>
                              <div>Crosswords: {book.crosswordCount}</div>
                            </div>
                            <Button
                              onClick={() => generateBook(book.theme, 'MIXED')}
                              disabled={generating}
                              size="sm"
                              className="mt-3 w-full"
                            >
                              Generate This Book
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}