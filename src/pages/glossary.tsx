import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  Lightbulb,
  Grid3X3,
  Puzzle,
  Target,
  Users,
  TrendingUp,
  Zap,
  Brain,
  Eye,
  Palette
} from 'lucide-react';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  relatedTerms: string[];
  examples?: string[];
  etymology?: string;
}

const glossaryTerms: GlossaryTerm[] = [
  // Puzzle Construction Terms
  {
    id: 'anagram',
    term: 'Anagram',
    definition: 'A word or phrase formed by rearranging the letters of another word or phrase, using all the original letters exactly once.',
    category: 'Puzzle Construction',
    relatedTerms: ['Word Play', 'Letter Manipulation', 'Cryptogram'],
    examples: ['LISTEN → SILENT', 'ASTRONOMER → MOON STARER'],
    etymology: 'From Greek "anagrammatismos" meaning "transposition of letters"'
  },
  {
    id: 'grid-fill',
    term: 'Grid Fill',
    definition: 'The process of placing words into a crossword grid, ensuring all intersecting letters match and the grid is completely filled.',
    category: 'Puzzle Construction',
    relatedTerms: ['Crossword Construction', 'Word Placement', 'Grid Design'],
    examples: ['Automated grid fill algorithms', 'Manual grid filling techniques']
  },
  {
    id: 'theme-entry',
    term: 'Theme Entry',
    definition: 'In crossword puzzles, the main answers that relate to the puzzle\'s central theme, usually the longest answers in the grid.',
    category: 'Puzzle Construction',
    relatedTerms: ['Theme', 'Long Answers', 'Puzzle Theme'],
    examples: ['Movie titles in a cinema-themed puzzle', 'Famous scientists in a science-themed crossword']
  },
  {
    id: 'black-square',
    term: 'Black Square',
    definition: 'Empty squares in a crossword grid that separate words and create the puzzle\'s structure and difficulty.',
    category: 'Puzzle Construction',
    relatedTerms: ['Grid Design', 'Word Separation', 'Puzzle Structure'],
    examples: ['Strategic black square placement', 'Symmetrical black square patterns']
  },
  {
    id: 'word-list',
    term: 'Word List',
    definition: 'A curated collection of words used as the foundation for generating word search puzzles, organized by theme or difficulty.',
    category: 'Puzzle Construction',
    relatedTerms: ['Theme Words', 'Vocabulary', 'Word Bank'],
    examples: ['Animal-themed word list', 'Advanced vocabulary word list']
  },

  // Puzzle Types
  {
    id: 'cryptic-crossword',
    term: 'Cryptic Crossword',
    definition: 'A type of crossword puzzle where each clue is a word puzzle in itself, containing both a definition and wordplay elements.',
    category: 'Puzzle Types',
    relatedTerms: ['Wordplay', 'Double Definition', 'Anagram Clue'],
    examples: ['British-style cryptics', 'American cryptic crosswords']
  },
  {
    id: 'word-search',
    term: 'Word Search',
    definition: 'A puzzle consisting of letters arranged in a grid, where words are hidden horizontally, vertically, or diagonally.',
    category: 'Puzzle Types',
    relatedTerms: ['Letter Grid', 'Hidden Words', 'Pattern Recognition'],
    examples: ['15x15 standard grid', 'Themed word searches', 'Shape-based word searches']
  },
  {
    id: 'acrostic',
    term: 'Acrostic',
    definition: 'A puzzle where the first letters of each line or answer spell out a word, phrase, or message when read vertically.',
    category: 'Puzzle Types',
    relatedTerms: ['Letter Pattern', 'Hidden Message', 'Vertical Reading'],
    examples: ['Name acrostics', 'Quote acrostics', 'Double acrostics']
  },
  {
    id: 'sudoku',
    term: 'Sudoku',
    definition: 'A number puzzle where digits 1-9 must be placed in a 9x9 grid so that each row, column, and 3x3 box contains all digits.',
    category: 'Puzzle Types',
    relatedTerms: ['Number Puzzle', 'Logic Puzzle', 'Constraint Satisfaction'],
    examples: ['Classic 9x9 Sudoku', 'Mini 6x6 Sudoku', 'Irregular Sudoku variants']
  },

  // Industry Terms
  {
    id: 'kdp',
    term: 'KDP (Kindle Direct Publishing)',
    definition: 'Amazon\'s self-publishing platform that allows authors to publish and distribute puzzle books and other content worldwide.',
    category: 'Publishing Industry',
    relatedTerms: ['Self-Publishing', 'Print-on-Demand', 'Amazon Publishing'],
    examples: ['KDP puzzle book publishing', 'Print-on-demand puzzle books']
  },
  {
    id: 'print-on-demand',
    term: 'Print-on-Demand (POD)',
    definition: 'A publishing model where books are printed only when ordered, eliminating the need for large inventory investments.',
    category: 'Publishing Industry',
    relatedTerms: ['Self-Publishing', 'Digital Printing', 'Inventory Management'],
    examples: ['KDP Print-on-Demand', 'IngramSpark POD services']
  },
  {
    id: 'puzzle-book-market',
    term: 'Puzzle Book Market',
    definition: 'The commercial sector focused on creating, publishing, and selling puzzle books across various formats and demographics.',
    category: 'Publishing Industry',
    relatedTerms: ['Market Analysis', 'Target Demographics', 'Publishing Trends'],
    examples: ['Senior puzzle market', 'Children\'s puzzle books', 'Adult puzzle magazines']
  },
  {
    id: 'large-print',
    term: 'Large Print',
    definition: 'Text formatting with increased font size and spacing designed for readers with visual impairments or reading difficulties.',
    category: 'Publishing Industry',
    relatedTerms: ['Accessibility', 'Senior-Friendly Design', 'Visual Accessibility'],
    examples: ['16-point font puzzles', 'High-contrast puzzle designs']
  },

  // Cognitive & Educational Terms
  {
    id: 'cognitive-load',
    term: 'Cognitive Load',
    definition: 'The amount of mental effort and working memory required to solve a puzzle or complete a cognitive task.',
    category: 'Cognitive Science',
    relatedTerms: ['Mental Effort', 'Working Memory', 'Puzzle Difficulty'],
    examples: ['High cognitive load in complex crosswords', 'Low cognitive load in simple word searches']
  },
  {
    id: 'pattern-recognition',
    term: 'Pattern Recognition',
    definition: 'The cognitive ability to identify regularities, structures, or familiar arrangements in visual or conceptual information.',
    category: 'Cognitive Science',
    relatedTerms: ['Visual Processing', 'Cognitive Skills', 'Problem Solving'],
    examples: ['Recognizing word patterns in puzzles', 'Identifying letter sequences']
  },
  {
    id: 'neuroplasticity',
    term: 'Neuroplasticity',
    definition: 'The brain\'s ability to reorganize and form new neural connections, often enhanced through puzzle-solving activities.',
    category: 'Cognitive Science',
    relatedTerms: ['Brain Training', 'Cognitive Enhancement', 'Mental Flexibility'],
    examples: ['Puzzle-induced neuroplasticity', 'Cognitive training benefits']
  },
  {
    id: 'working-memory',
    term: 'Working Memory',
    definition: 'The cognitive system responsible for temporarily holding and manipulating information during complex cognitive tasks.',
    category: 'Cognitive Science',
    relatedTerms: ['Short-term Memory', 'Cognitive Processing', 'Mental Capacity'],
    examples: ['Holding clues while solving crosswords', 'Remembering word lists in word searches']
  },

  // Design & UX Terms
  {
    id: 'accessibility-design',
    term: 'Accessibility Design',
    definition: 'Design principles that ensure puzzles and games are usable by people with various abilities and disabilities.',
    category: 'Design & UX',
    relatedTerms: ['Universal Design', 'Inclusive Design', 'Barrier-Free Design'],
    examples: ['High contrast color schemes', 'Screen reader compatibility', 'Motor accessibility features']
  },
  {
    id: 'difficulty-curve',
    term: 'Difficulty Curve',
    definition: 'The progression of challenge level throughout a puzzle book or game, designed to maintain engagement without frustration.',
    category: 'Design & UX',
    relatedTerms: ['Progressive Difficulty', 'Challenge Scaling', 'User Engagement'],
    examples: ['Gradual difficulty increase', 'Adaptive difficulty systems']
  },
  {
    id: 'user-experience',
    term: 'User Experience (UX)',
    definition: 'The overall experience and satisfaction a person has when interacting with puzzle content, including ease of use and enjoyment.',
    category: 'Design & UX',
    relatedTerms: ['User Interface', 'Usability', 'User Satisfaction'],
    examples: ['Intuitive puzzle interfaces', 'Smooth solving experience']
  },
  {
    id: 'visual-hierarchy',
    term: 'Visual Hierarchy',
    definition: 'The arrangement of puzzle elements to guide the solver\'s attention and create a clear, organized solving experience.',
    category: 'Design & UX',
    relatedTerms: ['Layout Design', 'Information Architecture', 'Visual Organization'],
    examples: ['Clear clue numbering', 'Prominent grid placement', 'Logical information flow']
  },

  // Technology Terms
  {
    id: 'algorithm',
    term: 'Algorithm',
    definition: 'A set of rules or instructions used by computers to automatically generate puzzles, fill grids, or solve puzzle-related problems.',
    category: 'Technology',
    relatedTerms: ['Automated Generation', 'Computer Science', 'Puzzle Generation'],
    examples: ['Crossword generation algorithms', 'Word search creation algorithms']
  },
  {
    id: 'ai-generation',
    term: 'AI Generation',
    definition: 'The use of artificial intelligence to automatically create puzzle content, including grids, clues, and thematic elements.',
    category: 'Technology',
    relatedTerms: ['Machine Learning', 'Automated Content', 'Artificial Intelligence'],
    examples: ['AI-generated crossword clues', 'Machine learning puzzle optimization']
  },
  {
    id: 'digital-puzzle',
    term: 'Digital Puzzle',
    definition: 'Puzzles designed for and delivered through digital platforms, often featuring interactive elements and immediate feedback.',
    category: 'Technology',
    relatedTerms: ['Interactive Puzzles', 'Online Games', 'Digital Entertainment'],
    examples: ['Mobile puzzle apps', 'Web-based crosswords', 'Interactive word searches']
  },

  // Market & Demographics
  {
    id: 'target-demographic',
    term: 'Target Demographic',
    definition: 'The specific group of people that a puzzle book or game is designed to appeal to, based on age, interests, or skill level.',
    category: 'Market Analysis',
    relatedTerms: ['Market Segmentation', 'Audience Analysis', 'Consumer Targeting'],
    examples: ['Senior puzzle market', 'Children\'s educational puzzles', 'Adult brain training market']
  },
  {
    id: 'market-penetration',
    term: 'Market Penetration',
    definition: 'The extent to which puzzle products have been adopted within their target market, measured as a percentage of potential customers.',
    category: 'Market Analysis',
    relatedTerms: ['Market Share', 'Adoption Rate', 'Market Coverage'],
    examples: ['Digital puzzle app penetration', 'Print puzzle book market share']
  },
  {
    id: 'seasonal-trends',
    term: 'Seasonal Trends',
    definition: 'Patterns in puzzle consumption and sales that vary throughout the year, often influenced by holidays and leisure time.',
    category: 'Market Analysis',
    relatedTerms: ['Sales Patterns', 'Consumer Behavior', 'Market Timing'],
    examples: ['Holiday-themed puzzle sales spikes', 'Summer vacation puzzle demand']
  }
];

const categories = [
  'All Categories',
  'Puzzle Construction',
  'Puzzle Types',
  'Publishing Industry',
  'Cognitive Science',
  'Design & UX',
  'Technology',
  'Market Analysis'
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [filteredTerms, setFilteredTerms] = useState(glossaryTerms);

  React.useEffect(() => {
    let filtered = glossaryTerms.filter(term => {
      const matchesSearch = searchTerm === '' || 
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.relatedTerms.some(related => related.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'All Categories' || 
        term.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort alphabetically by term
    filtered.sort((a, b) => a.term.localeCompare(b.term));

    setFilteredTerms(filtered);
  }, [searchTerm, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Puzzle Construction': return <Grid3X3 className="h-4 w-4" />;
      case 'Puzzle Types': return <Puzzle className="h-4 w-4" />;
      case 'Publishing Industry': return <BookOpen className="h-4 w-4" />;
      case 'Cognitive Science': return <Brain className="h-4 w-4" />;
      case 'Design & UX': return <Palette className="h-4 w-4" />;
      case 'Technology': return <Zap className="h-4 w-4" />;
      case 'Market Analysis': return <TrendingUp className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Puzzle Construction': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Puzzle Types': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Publishing Industry': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Cognitive Science': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Design & UX': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'Technology': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Market Analysis': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Group terms by first letter for alphabet navigation
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const firstLetter = term.term[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);

  const alphabet = Object.keys(groupedTerms).sort();

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900 py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Puzzle Industry <span className="text-purple-600">Glossary</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Your comprehensive guide to puzzle terminology, industry concepts, 
                and cognitive science behind word games and brain training.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="#glossary">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Browse Terms
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/blog">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Read Blog Articles
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Search and Filter */}
          <motion.div 
            className="mb-12"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search terms, definitions, or related concepts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-64">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {filteredTerms.length > 0 && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    Showing {filteredTerms.length} of {glossaryTerms.length} terms
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Alphabet Navigation */}
          {alphabet.length > 0 && (
            <motion.div 
              className="mb-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {alphabet.map(letter => (
                      <Button
                        key={letter}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const element = document.getElementById(`letter-${letter}`);
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-10 h-10 p-0"
                      >
                        {letter}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Glossary Terms */}
          <section id="glossary">
            {alphabet.map(letter => (
              <motion.div 
                key={letter}
                id={`letter-${letter}`}
                className="mb-12"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <h2 className="text-3xl font-bold mb-6 text-center">
                  {letter}
                </h2>
                
                <motion.div 
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {groupedTerms[letter].map((term) => (
                    <motion.div key={term.id} variants={fadeInUp}>
                      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <CardTitle className="text-xl">
                              {term.term}
                            </CardTitle>
                            <Badge className={getCategoryColor(term.category)}>
                              <div className="flex items-center gap-1">
                                {getCategoryIcon(term.category)}
                                <span className="text-xs">{term.category}</span>
                              </div>
                            </Badge>
                          </div>
                          <CardDescription className="text-base leading-relaxed">
                            {term.definition}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {term.examples && term.examples.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-sm mb-2">Examples:</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {term.examples.map((example, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span>{example}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {term.etymology && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-sm mb-2">Etymology:</h4>
                              <p className="text-sm text-muted-foreground italic">
                                {term.etymology}
                              </p>
                            </div>
                          )}
                          
                          {term.relatedTerms.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Related Terms:</h4>
                              <div className="flex flex-wrap gap-1">
                                {term.relatedTerms.map((relatedTerm, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {relatedTerm}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </section>

          {filteredTerms.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No terms found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}