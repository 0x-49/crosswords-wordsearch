import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { 
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  Eye,
  Download,
  Heart,
  Star,
  Grid3X3,
  BookOpen,
  Users,
  Zap,
  Crown,
  Puzzle
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Templates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "animals", label: "Animals & Nature" },
    { value: "education", label: "Educational" },
    { value: "entertainment", label: "Entertainment" },
    { value: "food", label: "Food & Cooking" },
    { value: "history", label: "History & Culture" },
    { value: "hobbies", label: "Hobbies & Crafts" },
    { value: "holidays", label: "Holidays & Seasons" },
    { value: "kids", label: "Kids & Family" },
    { value: "science", label: "Science & Technology" },
    { value: "sports", label: "Sports & Recreation" },
    { value: "travel", label: "Travel & Places" }
  ];

  const difficulties = [
    { value: "all", label: "All Difficulties" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" }
  ];

  const templates = [
    {
      id: 1,
      title: "Ocean Animals Adventure",
      description: "Dive deep into the ocean with marine life word searches perfect for kids and adults.",
      category: "animals",
      difficulty: "easy",
      gridSize: "15x15",
      wordCount: 20,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center",
      isPremium: false,
      rating: 4.8,
      downloads: 1250,
      tags: ["Ocean", "Marine Life", "Educational", "Kids"]
    },
    {
      id: 2,
      title: "Space Exploration",
      description: "Journey through the cosmos with astronomy and space-themed puzzles.",
      category: "science",
      difficulty: "medium",
      gridSize: "18x18",
      wordCount: 25,
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop&crop=center",
      isPremium: true,
      rating: 4.9,
      downloads: 2100,
      tags: ["Space", "Astronomy", "Science", "Educational"]
    },
    {
      id: 3,
      title: "Classic Literature",
      description: "Explore famous books, authors, and literary terms in these challenging puzzles.",
      category: "education",
      difficulty: "hard",
      gridSize: "20x20",
      wordCount: 30,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
      isPremium: true,
      rating: 4.7,
      downloads: 890,
      tags: ["Literature", "Books", "Authors", "Advanced"]
    },
    {
      id: 4,
      title: "Holiday Celebrations",
      description: "Festive word searches for all major holidays and seasonal celebrations.",
      category: "holidays",
      difficulty: "easy",
      gridSize: "12x12",
      wordCount: 15,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center",
      isPremium: false,
      rating: 4.6,
      downloads: 3200,
      tags: ["Holidays", "Celebrations", "Seasonal", "Family"]
    },
    {
      id: 5,
      title: "World Cuisines",
      description: "Delicious word puzzles featuring foods and cooking terms from around the world.",
      category: "food",
      difficulty: "medium",
      gridSize: "16x16",
      wordCount: 22,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&crop=center",
      isPremium: false,
      rating: 4.5,
      downloads: 1800,
      tags: ["Food", "Cooking", "International", "Culture"]
    },
    {
      id: 6,
      title: "Ancient Civilizations",
      description: "Journey through history with puzzles about ancient cultures and civilizations.",
      category: "history",
      difficulty: "hard",
      gridSize: "22x22",
      wordCount: 35,
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop&crop=center",
      isPremium: true,
      rating: 4.8,
      downloads: 1100,
      tags: ["History", "Ancient", "Civilizations", "Educational"]
    },
    {
      id: 7,
      title: "Garden & Plants",
      description: "Bloom with knowledge using these nature-themed word search puzzles.",
      category: "animals",
      difficulty: "easy",
      gridSize: "14x14",
      wordCount: 18,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&crop=center",
      isPremium: false,
      rating: 4.4,
      downloads: 2500,
      tags: ["Plants", "Garden", "Nature", "Botany"]
    },
    {
      id: 8,
      title: "Musical Instruments",
      description: "Strike a chord with music-themed puzzles featuring instruments and musical terms.",
      category: "entertainment",
      difficulty: "medium",
      gridSize: "17x17",
      wordCount: 24,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
      isPremium: true,
      rating: 4.7,
      downloads: 1600,
      tags: ["Music", "Instruments", "Arts", "Culture"]
    },
    {
      id: 9,
      title: "Sports Champions",
      description: "Score big with sports-themed puzzles covering various games and activities.",
      category: "sports",
      difficulty: "medium",
      gridSize: "16x16",
      wordCount: 26,
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop&crop=center",
      isPremium: false,
      rating: 4.6,
      downloads: 2800,
      tags: ["Sports", "Games", "Athletics", "Competition"]
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || template.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-green-600 bg-green-50 dark:bg-green-950";
      case "medium": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950";
      case "hard": return "text-red-600 bg-red-50 dark:bg-red-950";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-950";
    }
  };

  return (
    <Layout
      title="Puzzle Templates - WordCraft"
      description="Browse our extensive collection of word search and crossword puzzle templates. Choose from hundreds of professionally designed themes for all ages and interests."
      keywords="word search templates, crossword templates, puzzle themes, educational puzzles, printable word games, puzzle book templates"
    >
      <div className="bg-background">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
          <div className="container-fluid">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Badge variant="secondary" className="mb-6 text-sm px-6 py-3 rounded-full shadow-soft">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Premium Templates
                </Badge>
                <h1 className="heading-xl text-gradient mb-8">
                  Puzzle Templates Library
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                  Discover hundreds of professionally designed puzzle templates across dozens of categories. 
                  Perfect for educators, publishers, and puzzle enthusiasts.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="section-padding">
          <div className="container-fluid">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="card-elevated mb-12">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search templates..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                        <SelectTrigger>
                          <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          {difficulties.map((difficulty) => (
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
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid md:grid-cols-4 gap-6 mb-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { number: "500+", label: "Templates", icon: <Puzzle className="h-6 w-6" />, color: "text-purple-600" },
                { number: "12", label: "Categories", icon: <Grid3X3 className="h-6 w-6" />, color: "text-blue-600" },
                { number: "50K+", label: "Downloads", icon: <Download className="h-6 w-6" />, color: "text-green-600" },
                { number: "4.7★", label: "Avg Rating", icon: <Star className="h-6 w-6" />, color: "text-yellow-600" }
              ].map((stat, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="text-center card-elevated">
                    <CardContent className="p-6">
                      <div className={`${stat.color} mb-3 flex justify-center`}>
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-gradient mb-1">{stat.number}</div>
                      <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Templates Grid */}
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {filteredTemplates.map((template, index) => (
                <motion.div key={template.id} variants={fadeInUp}>
                  <Card className="card-interactive h-full group overflow-hidden">
                    <div className="relative">
                      <img 
                        src={template.image}
                        alt={template.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      {/* Premium Badge */}
                      {template.isPremium && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        </div>
                      )}
                      
                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Stats Overlay */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-3 text-white text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{template.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          <span>{template.downloads.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <CardTitle className="text-lg leading-tight">{template.title}</CardTitle>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getDifficultyColor(template.difficulty)}`}
                        >
                          {template.difficulty}
                        </Badge>
                      </div>
                      
                      <CardDescription className="text-sm mb-4 leading-relaxed">
                        {template.description}
                      </CardDescription>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Grid3X3 className="h-3 w-3" />
                          <span>{template.gridSize}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          <span>{template.wordCount} words</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {template.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {template.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 group">
                          Use Template
                          <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button size="sm" variant="outline" className="px-3">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* No Results */}
            {filteredTemplates.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No templates found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search criteria or browse all templates.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedDifficulty("all");
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
          <div className="container-fluid">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="card-elevated p-12">
                <Badge variant="secondary" className="mb-6 px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  Create Your Own
                </Badge>
                <h2 className="heading-lg mb-6">
                  Need Something Custom?
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Can't find the perfect template? Create your own custom puzzles with our powerful generator tools.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/dashboard">
                    <Button size="xl" variant="gradient" className="group">
                      Start Creating
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="xl">
                      Request Template
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}