import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { BookOpen, Download, FileText, Grid3X3, Puzzle, Loader2 } from 'lucide-react';

// Matches the structure of a single book in the API response's collection
interface BookSummary {
  id: string;
  title: string;
  theme: string;
  totalPages: number;
  wordSearchCount: number;
  crosswordCount: number;
}

// Matches the structure of the 'collection' object in the API response
interface CollectionResult {
  totalBooks: number;
  totalPages: number;
  books: BookSummary[];
}

export default function BookGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [bookType, setBookType] = useState<'WORD_SEARCH' | 'CROSSWORD' | 'MIXED'>('MIXED');
  const [largePrint, setLargePrint] = useState(false);
  const [generatedCollection, setGeneratedCollection] = useState<CollectionResult | null>(null);

  const handleGenerateCollection = async () => {
    setIsGenerating(true);
    setGeneratedCollection(null);
    try {
      const response = await fetch('/api/books/generate-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookType, largePrint }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedCollection(data.collection);
        toast.success(`Generated ${data.collection.totalBooks} puzzle books successfully!`);
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to generate book collection');
      }
    } catch (error) {
      console.error('Error generating book collection:', error);
      toast.error('Failed to generate book collection');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Puzzle Book Generator</h1>
            <p className="text-lg text-gray-600 mt-2">
              Generate a complete puzzle book collection from your structured data files.
            </p>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Generate Book Collection</CardTitle>
              <CardDescription>
                Select your desired options and click the button to generate all puzzle books.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Select Book Type</Label>
                <RadioGroup
                  value={bookType}
                  onValueChange={(value) => setBookType(value as typeof bookType)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MIXED" id="r1" />
                    <Label htmlFor="r1">Mixed (Word Search & Crossword)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="WORD_SEARCH" id="r2" />
                    <Label htmlFor="r2">Word Search Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="CROSSWORD" id="r3" />
                    <Label htmlFor="r3">Crossword Only</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="largePrint" checked={largePrint} onCheckedChange={(checked) => setLargePrint(Boolean(checked))} />
                <Label htmlFor="largePrint" className="text-base font-medium">
                  Use Large Print
                </Label>
              </div>

              <Button
                onClick={handleGenerateCollection}
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Collection...</>
                ) : (
                  'Generate Full Book Collection'
                )}
              </Button>

              {generatedCollection && (
                <div className="space-y-4 pt-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      Collection Generated Successfully!
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Total Books:</span> {generatedCollection.totalBooks}
                      </div>
                      <div>
                        <span className="font-medium">Total Pages:</span> {generatedCollection.totalPages}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {generatedCollection.books.map((book) => (
                      <Card key={book.id}>
                        <CardHeader>
                           <CardTitle className="text-base">{book.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-600">
                          <p>Total Pages: {book.totalPages}</p>
                          <p>Word Searches: {book.wordSearchCount}</p>
                          <p>Crosswords: {book.crosswordCount}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}