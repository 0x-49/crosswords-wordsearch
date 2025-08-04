import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Video, 
  Play, 
  Clock, 
  BookOpen, 
  Puzzle, 
  Download,
  Settings,
  Users,
  Star,
  Filter,
  Search,
  Eye,
  ThumbsUp,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  views: number;
  likes: number;
  publishDate: string;
  thumbnail: string;
  videoUrl: string;
  popular: boolean;
  new: boolean;
}

const tutorials: Tutorial[] = [
  {
    id: 'getting-started-basics',
    title: 'WordCraft Basics: Creating Your First Puzzle Book',
    description: 'Complete walkthrough of creating your first puzzle book from account setup to download',
    duration: '8:45',
    difficulty: 'Beginner',
    category: 'Getting Started',
    views: 15420,
    likes: 892,
    publishDate: '2024-01-15',
    thumbnail: 'https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/image-1f8755b.png',
    videoUrl: '#',
    popular: true,
    new: false
  },
  {
    id: 'theme-selection-guide',
    title: 'Choosing the Perfect Theme for Your Audience',
    description: 'Learn how to select themes that resonate with your target market and drive sales',
    duration: '12:30',
    difficulty: 'Intermediate',
    category: 'Puzzle Creation',
    views: 8750,
    likes: 654,
    publishDate: '2024-01-20',
    thumbnail: 'https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/image-1f8755b.png',
    videoUrl: '#',
    popular: true,
    new: false
  },
  {
    id: 'kdp-publishing-guide',
    title: 'Publishing Your Puzzle Book on Amazon KDP',
    description: 'Step-by-step guide to uploading and optimizing your puzzle book for Amazon KDP',
    duration: '15:20',
    difficulty: 'Intermediate',
    category: 'Publishing',
    views: 12340,
    likes: 789,
    publishDate: '2024-01-25',
    thumbnail: 'https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/image-1f8755b.png',
    videoUrl: '#',
    popular: true,
    new: false
  },
  {
    id: 'preview-features',
    title: 'Using Preview and Online Play Features',
    description: 'Master the preview system and online game mode to ensure puzzle quality',
    duration: '6:15',
    difficulty: 'Beginner',
    category: 'Features',
    views: 5670,
    likes: 423,
    publishDate: '2024-02-01',
    thumbnail: 'https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/image-1f8755b.png',
    videoUrl: '#',
    popular: false,
    new: true
  },
  {
    id: 'advanced-customization',
    title: 'Advanced Puzzle Customization Techniques',
    description: 'Pro tips for creating unique, high-quality puzzle books that stand out',
    duration: '18:45',
    difficulty: 'Advanced',
    category: 'Advanced',
    views: 3420,
    likes: 298,
    publishDate: '2024-02-05',
    thumbnail: 'https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/image-1f8755b.png',
    videoUrl: '#',
    popular: false,
    new: true
  },
  {
    id: 'troubleshooting-common-issues',
    title: 'Troubleshooting Common Issues',
    description: 'Solutions to the most frequently encountered problems and error messages',
    duration: '10:30',
    difficulty: 'Beginner',
    category: 'Technical Support',
    views: 7890,
    likes: 567,
    publishDate: '2024-02-10',
    thumbnail: 'https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/image-1f8755b.png',
    videoUrl: '#',
    popular: false,
    new: false
  },
  {
    id: 'marketing-your-books',
    title: 'Marketing Your Puzzle Books for Maximum Sales',
    description: 'Strategies for promoting your puzzle books and increasing visibility',
    duration: '14:20',
    difficulty: 'Intermediate',
    category: 'Marketing',
    views: 6540,
    likes: 445,
    publishDate: '2024-02-15',
    thumbnail: 'https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/image-1f8755b.png',
    videoUrl: '#',
    popular: false,
    new: false
  },
  {
    id: 'batch-generation',
    title: 'Efficient Batch Generation Workflows',
    description: 'Learn how to efficiently create multiple puzzle books and manage your library',
    duration: '11:15',
    difficulty: 'Advanced',
    category: 'Advanced',
    views: 4320,
    likes: 321,
    publishDate: '2024-02-20',
    thumbnail: 'https://assets.co.dev/69a5da10-9c4d-4bbe-b6b9-113dbfa9d192/image-1f8755b.png',
    videoUrl: '#',
    popular: false,
    new: false
  }
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'Getting Started', label: 'Getting Started' },
  { value: 'Puzzle Creation', label: 'Puzzle Creation' },
  { value: 'Publishing', label: 'Publishing' },
  { value: 'Features', label: 'Features' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Technical Support', label: 'Technical Support' },
  { value: 'Marketing', label: 'Marketing' }
];

const difficulties = [
  { value: 'all', label: 'All Levels' },
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' }
];

const TutorialsPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const popularTutorials = tutorials.filter(t => t.popular);
  const newTutorials = tutorials.filter(t => t.new);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <>
      <Head>
        <title>Video Tutorials - WordCraft</title>
        <meta name="description" content="Learn WordCraft with our comprehensive video tutorials. Step-by-step guides for creating, customizing, and publishing puzzle books." />
        <meta name="keywords" content="tutorials, videos, guides, puzzle book creation, WordCraft, learning, how-to" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="container-fluid max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Video className="h-16 w-16 text-primary mx-auto mb-6" />
                <h1 className="heading-xl mb-6">
                  Video Tutorials
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Master WordCraft with our comprehensive video tutorials. From beginner basics to advanced techniques, 
                  learn everything you need to create successful puzzle books.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Search and Filters */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Search tutorials..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          {difficulties.map(difficulty => (
                            <SelectItem key={difficulty.value} value={difficulty.value}>
                              {difficulty.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Popular Tutorials */}
          {searchTerm === '' && selectedCategory === 'all' && selectedDifficulty === 'all' && (
            <section className="py-12 px-4">
              <div className="container-fluid max-w-6xl mx-auto">
                <div className="flex items-center gap-2 mb-8">
                  <Star className="h-6 w-6 text-primary" />
                  <h2 className="heading-lg">Popular Tutorials</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {popularTutorials.map((tutorial, index) => (
                    <motion.div
                      key={tutorial.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="relative">
                          <img 
                            src={tutorial.thumbnail} 
                            alt={tutorial.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                            <Play className="h-12 w-12 text-white" />
                          </div>
                          <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                            {tutorial.duration}
                          </Badge>
                          {tutorial.popular && (
                            <Badge className="absolute top-2 left-2 bg-primary">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">
                              {tutorial.category}
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyColor(tutorial.difficulty)}`}>
                              {tutorial.difficulty}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {tutorial.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {tutorial.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {formatViews(tutorial.views)}
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-3 w-3" />
                                {tutorial.likes}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(tutorial.publishDate).toLocaleDateString()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* New Tutorials */}
          {searchTerm === '' && selectedCategory === 'all' && selectedDifficulty === 'all' && (
            <section className="py-12 px-4">
              <div className="container-fluid max-w-6xl mx-auto">
                <div className="flex items-center gap-2 mb-8">
                  <Video className="h-6 w-6 text-primary" />
                  <h2 className="heading-lg">New Tutorials</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {newTutorials.map((tutorial, index) => (
                    <motion.div
                      key={tutorial.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="flex">
                          <div className="relative w-48 flex-shrink-0">
                            <img 
                              src={tutorial.thumbnail} 
                              alt={tutorial.title}
                              className="w-full h-32 object-cover rounded-l-lg"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-lg flex items-center justify-center">
                              <Play className="h-8 w-8 text-white" />
                            </div>
                            <Badge className="absolute top-2 right-2 bg-black/70 text-white text-xs">
                              {tutorial.duration}
                            </Badge>
                            {tutorial.new && (
                              <Badge className="absolute top-2 left-2 bg-green-500 text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {tutorial.category}
                              </Badge>
                              <Badge className={`text-xs ${getDifficultyColor(tutorial.difficulty)}`}>
                                {tutorial.difficulty}
                              </Badge>
                            </div>
                            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                              {tutorial.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {tutorial.description}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {formatViews(tutorial.views)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="h-3 w-3" />
                                  {tutorial.likes}
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(tutorial.publishDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All Tutorials */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="heading-lg">
                  {searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all' 
                    ? 'Search Results' 
                    : 'All Tutorials'
                  }
                </h2>
                <div className="text-sm text-muted-foreground">
                  {filteredTutorials.length} tutorial{filteredTutorials.length !== 1 ? 's' : ''} found
                </div>
              </div>

              {filteredTutorials.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No tutorials found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTutorials.map((tutorial, index) => (
                    <motion.div
                      key={tutorial.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                        <div className="relative">
                          <img 
                            src={tutorial.thumbnail} 
                            alt={tutorial.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                            <Play className="h-12 w-12 text-white" />
                          </div>
                          <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                            {tutorial.duration}
                          </Badge>
                          {tutorial.popular && (
                            <Badge className="absolute top-2 left-2 bg-primary">
                              Popular
                            </Badge>
                          )}
                          {tutorial.new && (
                            <Badge className="absolute top-2 left-2 bg-green-500">
                              New
                            </Badge>
                          )}
                        </div>
                        <CardHeader className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">
                              {tutorial.category}
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyColor(tutorial.difficulty)}`}>
                              {tutorial.difficulty}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {tutorial.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {tutorial.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {formatViews(tutorial.views)}
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-3 w-3" />
                                {tutorial.likes}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(tutorial.publishDate).toLocaleDateString()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="heading-md mb-4">Ready to Start Creating?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Now that you've learned the basics, it's time to put your knowledge into practice. 
                    Create your first puzzle book and start your publishing journey!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                      <Link href="/book-generator">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Create Your First Book
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/help/getting-started">
                        <Play className="h-4 w-4 mr-2" />
                        Getting Started Guide
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default TutorialsPage;