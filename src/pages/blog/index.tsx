import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Filter,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Users,
  Target,
  Puzzle
} from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 'puzzle-industry-growth-2024',
    title: 'The Puzzle Industry Boom: How Word Games Are Reshaping Entertainment',
    excerpt: 'Explore the explosive growth of the puzzle industry and how digital platforms are revolutionizing traditional word games and crosswords.',
    content: '',
    author: 'Sarah Mitchell',
    publishDate: '2024-01-15',
    readTime: '8 min read',
    category: 'Industry Trends',
    tags: ['market-analysis', 'digital-transformation', 'growth-trends'],
    featured: true
  },
  {
    id: 'cognitive-benefits-puzzles',
    title: 'The Science Behind Puzzle Solving: Cognitive Benefits for All Ages',
    excerpt: 'Discover the research-backed cognitive benefits of regular puzzle solving, from improved memory to enhanced problem-solving skills.',
    content: '',
    author: 'Dr. Michael Chen',
    publishDate: '2024-01-12',
    readTime: '6 min read',
    category: 'Health & Wellness',
    tags: ['cognitive-health', 'brain-training', 'research'],
    featured: true
  },
  {
    id: 'senior-puzzle-market',
    title: 'Designing for Seniors: The Growing Market for Age-Friendly Puzzles',
    excerpt: 'How puzzle creators are adapting their designs to serve the rapidly growing senior market with large-print, accessible formats.',
    content: '',
    author: 'Jennifer Adams',
    publishDate: '2024-01-10',
    readTime: '7 min read',
    category: 'Market Analysis',
    tags: ['senior-market', 'accessibility', 'design-trends'],
    featured: false
  },
  {
    id: 'kdp-publishing-success',
    title: 'KDP Success Stories: How Independent Publishers Are Thriving in Puzzles',
    excerpt: 'Real success stories from independent puzzle book publishers who have built profitable businesses on Amazon KDP.',
    content: '',
    author: 'Robert Taylor',
    publishDate: '2024-01-08',
    readTime: '10 min read',
    category: 'Publishing',
    tags: ['kdp-publishing', 'success-stories', 'independent-publishing'],
    featured: false
  },
  {
    id: 'puzzle-difficulty-psychology',
    title: 'The Psychology of Puzzle Difficulty: Finding the Perfect Challenge',
    excerpt: 'Understanding how puzzle difficulty affects engagement and satisfaction, and how to create the perfect challenge curve.',
    content: '',
    author: 'Dr. Lisa Rodriguez',
    publishDate: '2024-01-05',
    readTime: '9 min read',
    category: 'Design & Psychology',
    tags: ['puzzle-design', 'psychology', 'user-experience'],
    featured: false
  },
  {
    id: 'crossword-construction-art',
    title: 'The Art of Crossword Construction: From Grid to Clue',
    excerpt: 'A deep dive into the creative process behind crossword construction, from grid design to crafting engaging clues.',
    content: '',
    author: 'Mark Williams',
    publishDate: '2024-01-03',
    readTime: '12 min read',
    category: 'Puzzle Creation',
    tags: ['crossword-construction', 'creative-process', 'puzzle-craft'],
    featured: false
  },
  {
    id: 'word-search-evolution',
    title: 'Evolution of Word Search: From Newspaper to Digital Interactive',
    excerpt: 'Tracing the evolution of word search puzzles from their newspaper origins to modern interactive digital formats.',
    content: '',
    author: 'Amanda Foster',
    publishDate: '2024-01-01',
    readTime: '8 min read',
    category: 'History',
    tags: ['word-search-history', 'puzzle-evolution', 'digital-puzzles'],
    featured: false
  },
  {
    id: 'therapeutic-puzzles',
    title: 'Puzzles as Therapy: Mental Health Benefits in Clinical Settings',
    excerpt: 'How healthcare professionals are incorporating puzzle-solving into therapeutic practices for various mental health conditions.',
    content: '',
    author: 'Dr. Patricia Green',
    publishDate: '2023-12-28',
    readTime: '11 min read',
    category: 'Health & Wellness',
    tags: ['mental-health', 'therapy', 'clinical-applications'],
    featured: false
  },
  {
    id: 'puzzle-community-building',
    title: 'Building Communities Around Puzzles: The Social Side of Solo Games',
    excerpt: 'Exploring how puzzle enthusiasts create communities, share strategies, and build connections around their shared passion.',
    content: '',
    author: 'David Kim',
    publishDate: '2023-12-25',
    readTime: '7 min read',
    category: 'Community',
    tags: ['community-building', 'social-puzzling', 'engagement'],
    featured: false
  },
  {
    id: 'ai-puzzle-generation',
    title: 'AI in Puzzle Creation: The Future of Automated Content Generation',
    excerpt: 'How artificial intelligence is revolutionizing puzzle creation, from automated grid generation to intelligent clue crafting.',
    content: '',
    author: 'Dr. Alex Thompson',
    publishDate: '2023-12-22',
    readTime: '9 min read',
    category: 'Technology',
    tags: ['artificial-intelligence', 'automation', 'future-trends'],
    featured: false
  }
];

const categories = [
  'All Categories',
  'Industry Trends',
  'Health & Wellness',
  'Market Analysis',
  'Publishing',
  'Design & Psychology',
  'Puzzle Creation',
  'History',
  'Community',
  'Technology'
];

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

export default function BlogIndex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  React.useEffect(() => {
    let filtered = blogPosts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'All Categories' || 
        post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort by featured first, then by date
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Industry Trends': return <TrendingUp className="h-4 w-4" />;
      case 'Health & Wellness': return <Target className="h-4 w-4" />;
      case 'Market Analysis': return <Users className="h-4 w-4" />;
      case 'Publishing': return <BookOpen className="h-4 w-4" />;
      case 'Design & Psychology': return <Lightbulb className="h-4 w-4" />;
      case 'Puzzle Creation': return <Puzzle className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Puzzle Industry <span className="text-blue-600">Insights</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Explore the latest trends, research, and insights from the world of puzzles, 
                word games, and cognitive entertainment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="#featured">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Read Featured Articles
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/glossary">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Browse Glossary
                  </Link>
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
                      placeholder="Search articles by title, content, or tags..."
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
                
                {filteredPosts.length > 0 && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    Showing {filteredPosts.length} of {blogPosts.length} articles
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Featured Articles */}
          <section id="featured" className="mb-12">
            <motion.h2 
              className="text-3xl font-bold mb-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              Featured Articles
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredPosts.filter(post => post.featured).map((post) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="mb-2">
                          Featured
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getCategoryIcon(post.category)}
                          <span>{post.category}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl leading-tight">
                        <Link 
                          href={`/blog/${post.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-base">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.publishDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.id}`}>
                          Read More
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* All Articles */}
          <section>
            <motion.h2 
              className="text-3xl font-bold mb-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              All Articles
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredPosts.filter(post => !post.featured).map((post) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        {getCategoryIcon(post.category)}
                        <span>{post.category}</span>
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        <Link 
                          href={`/blog/${post.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 2} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {formatDate(post.publishDate)}
                        </span>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/blog/${post.id}`}>
                            Read More
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
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