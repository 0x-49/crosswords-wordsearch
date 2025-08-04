import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  HelpCircle, 
  BookOpen, 
  Puzzle, 
  Download,
  CreditCard,
  Users,
  Settings,
  Mail
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    id: 'getting-started-1',
    question: 'How do I create my first puzzle book?',
    answer: 'Getting started is easy! First, sign up for a free account, then navigate to the Book Generator. Choose from our 100+ themes, select your preferences, and click "Generate Book". Your puzzle book will be created instantly with 150 puzzles (75 word searches and 75 crosswords).',
    category: 'Getting Started',
    tags: ['beginner', 'book-creation', 'themes']
  },
  {
    id: 'getting-started-2',
    question: 'What themes are available for puzzle books?',
    answer: 'We offer over 100 carefully curated themes including Classic Movies, Vintage Music, Golden Age TV, Gardening Wisdom, Traditional Cooking, Family Memories, Health & Wellness, Fairy Tales, Zoo Animals, Beach Vacation, and many more. Each theme is designed with specific audiences in mind, from seniors to kids to families.',
    category: 'Getting Started',
    tags: ['themes', 'content', 'variety']
  },
  {
    id: 'getting-started-3',
    question: 'Do I need any special software to use WordCraft?',
    answer: 'No special software required! WordCraft runs entirely in your web browser. You can access it from any device - computer, tablet, or smartphone. For the best experience, we recommend using a modern browser like Chrome, Firefox, Safari, or Edge.',
    category: 'Getting Started',
    tags: ['requirements', 'browser', 'compatibility']
  },

  // Puzzle Creation
  {
    id: 'puzzles-1',
    question: 'How many puzzles are included in each book?',
    answer: 'Each puzzle book contains exactly 150 puzzles: 75 word search puzzles and 75 crossword puzzles. This provides hours of entertainment and is perfect for publishing on platforms like Amazon KDP.',
    category: 'Puzzle Creation',
    tags: ['quantity', 'word-search', 'crossword']
  },
  {
    id: 'puzzles-2',
    question: 'Can I customize the difficulty level of puzzles?',
    answer: 'Yes! Each book automatically includes puzzles of varying difficulty levels (Easy, Medium, Hard) to provide a balanced challenge. The difficulty is carefully calibrated based on word complexity, grid size, and clue difficulty.',
    category: 'Puzzle Creation',
    tags: ['difficulty', 'customization', 'balance']
  },
  {
    id: 'puzzles-3',
    question: 'Are the puzzles suitable for seniors?',
    answer: 'Absolutely! Many of our themes are specifically designed with seniors in mind, featuring nostalgic content, larger fonts, and familiar topics. Themes like "Classic Movies," "Vintage Music," and "Golden Age TV" are particularly popular with older adults.',
    category: 'Puzzle Creation',
    tags: ['seniors', 'accessibility', 'themes']
  },
  {
    id: 'puzzles-4',
    question: 'Can I preview puzzles before downloading?',
    answer: 'Yes! You can preview every single puzzle in your book before downloading. Use the "View" button in the Book Library to see individual puzzles, and you can even play them online with our interactive game mode.',
    category: 'Puzzle Creation',
    tags: ['preview', 'online-play', 'quality-check']
  },

  // Downloads & Publishing
  {
    id: 'downloads-1',
    question: 'What file formats are available for download?',
    answer: 'All puzzle books are generated as high-quality PDF files optimized for printing and publishing. The PDFs are formatted to meet Amazon KDP requirements and other print-on-demand platforms.',
    category: 'Downloads & Publishing',
    tags: ['pdf', 'format', 'kdp', 'printing']
  },
  {
    id: 'downloads-2',
    question: 'Can I use these puzzles for commercial purposes?',
    answer: 'Yes! All puzzles generated through WordCraft come with full commercial rights. You can publish them on Amazon KDP, sell them in your store, or use them for any commercial purpose without additional licensing fees.',
    category: 'Downloads & Publishing',
    tags: ['commercial-use', 'rights', 'licensing', 'kdp']
  },
  {
    id: 'downloads-3',
    question: 'Are the PDFs ready for Amazon KDP publishing?',
    answer: 'Absolutely! Our PDFs are specifically formatted for Amazon KDP with proper margins, bleeds, and print specifications. You can upload them directly to KDP without any additional formatting.',
    category: 'Downloads & Publishing',
    tags: ['kdp', 'formatting', 'publishing', 'ready-to-use']
  },

  // Account & Billing
  {
    id: 'account-1',
    question: 'Is WordCraft free to use?',
    answer: 'Yes! WordCraft is currently free to use. You can create unlimited puzzle books, download them as PDFs, and use them commercially without any cost. We may introduce premium features in the future, but the core functionality will remain free.',
    category: 'Account & Billing',
    tags: ['free', 'pricing', 'unlimited']
  },
  {
    id: 'account-2',
    question: 'Do I need to create an account?',
    answer: 'Yes, you need a free account to generate and download puzzle books. This allows us to save your books in your personal library and provide you with a better experience. Sign up takes less than a minute!',
    category: 'Account & Billing',
    tags: ['account', 'registration', 'library']
  },
  {
    id: 'account-3',
    question: 'How do I reset my password?',
    answer: 'Click on "Forgot Password" on the login page, enter your email address, and we\'ll send you a reset link. Follow the instructions in the email to create a new password.',
    category: 'Account & Billing',
    tags: ['password', 'reset', 'login']
  },

  // Technical Support
  {
    id: 'technical-1',
    question: 'The puzzle generation is taking a long time. Is this normal?',
    answer: 'Generating a complete puzzle book with 150 high-quality puzzles can take 30-60 seconds. This is normal as we\'re creating unique, solvable puzzles with proper word placement and clue generation. Please be patient and don\'t refresh the page.',
    category: 'Technical Support',
    tags: ['generation-time', 'performance', 'patience']
  },
  {
    id: 'technical-2',
    question: 'I\'m getting a "Theme not found" error. What should I do?',
    answer: 'This error typically occurs due to a temporary server issue. Try refreshing the page and generating the book again. If the problem persists, try selecting a different theme or contact our support team.',
    category: 'Technical Support',
    tags: ['error', 'theme-not-found', 'troubleshooting']
  },
  {
    id: 'technical-3',
    question: 'The PDF download isn\'t working. How can I fix this?',
    answer: 'First, ensure your browser allows pop-ups from WordCraft. Try right-clicking the download button and selecting "Save link as". If issues persist, try a different browser or clear your browser cache.',
    category: 'Technical Support',
    tags: ['download', 'pdf', 'browser-issues']
  },

  // Features & Functionality
  {
    id: 'features-1',
    question: 'Can I play puzzles online instead of printing them?',
    answer: 'Yes! We offer an interactive online game mode. Click on any puzzle in your book library to play it directly in your browser with features like timer, hints, and solution checking.',
    category: 'Features & Functionality',
    tags: ['online-play', 'interactive', 'game-mode']
  },
  {
    id: 'features-2',
    question: 'Are solutions included with the puzzles?',
    answer: 'Yes! Every puzzle comes with a complete solution. In the PDF downloads, solutions are included at the end of the book. In online play mode, you can toggle solutions on/off at any time.',
    category: 'Features & Functionality',
    tags: ['solutions', 'answers', 'toggle']
  },
  {
    id: 'features-3',
    question: 'Can I share puzzles with friends and family?',
    answer: 'Absolutely! Each puzzle has a unique URL that you can share. Recipients can play the puzzle online without needing an account. You can also share entire books or specific themes.',
    category: 'Features & Functionality',
    tags: ['sharing', 'social', 'family']
  }
];

const categories = [
  { id: 'all', name: 'All Questions', icon: HelpCircle, count: faqData.length },
  { id: 'Getting Started', name: 'Getting Started', icon: BookOpen, count: faqData.filter(f => f.category === 'Getting Started').length },
  { id: 'Puzzle Creation', name: 'Puzzle Creation', icon: Puzzle, count: faqData.filter(f => f.category === 'Puzzle Creation').length },
  { id: 'Downloads & Publishing', name: 'Downloads & Publishing', icon: Download, count: faqData.filter(f => f.category === 'Downloads & Publishing').length },
  { id: 'Account & Billing', name: 'Account & Billing', icon: CreditCard, count: faqData.filter(f => f.category === 'Account & Billing').length },
  { id: 'Technical Support', name: 'Technical Support', icon: Settings, count: faqData.filter(f => f.category === 'Technical Support').length },
  { id: 'Features & Functionality', name: 'Features & Functionality', icon: Users, count: faqData.filter(f => f.category === 'Features & Functionality').length }
];

const FAQPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <Head>
        <title>Frequently Asked Questions - WordCraft</title>
        <meta name="description" content="Find answers to common questions about WordCraft puzzle book generator. Get help with creating, downloading, and publishing puzzle books." />
        <meta name="keywords" content="FAQ, help, support, puzzle books, word search, crossword, questions, answers" />
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
                <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
                <h1 className="heading-xl mb-6">
                  Frequently Asked Questions
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Find quick answers to common questions about WordCraft. Can't find what you're looking for? 
                  <a href="/contact" className="text-primary hover:underline ml-1">Contact our support team</a>.
                </p>

                {/* Search Bar */}
                <div className="relative max-w-md mx-auto mb-8">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Main Content */}
          <section className="pb-20 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Category Sidebar */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Categories</CardTitle>
                      <CardDescription>Browse by topic</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <Icon className="h-4 w-4 mr-2" />
                            <span className="flex-1 text-left">{category.name}</span>
                            <Badge variant="secondary" className="ml-2">
                              {category.count}
                            </Badge>
                          </Button>
                        );
                      })}
                    </CardContent>
                  </Card>

                  {/* Contact Support */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Mail className="h-5 w-5 mr-2" />
                        Need More Help?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Can't find the answer you're looking for? Our support team is here to help.
                      </p>
                      <Button asChild className="w-full">
                        <a href="/contact">Contact Support</a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* FAQ Content */}
                <div className="lg:col-span-3">
                  <div className="space-y-4">
                    {filteredFAQs.length === 0 ? (
                      <Card>
                        <CardContent className="py-12 text-center">
                          <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No questions found</h3>
                          <p className="text-muted-foreground">
                            Try adjusting your search terms or browse a different category.
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      filteredFAQs.map((faq, index) => (
                        <motion.div
                          key={faq.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Card>
                            <CardHeader 
                              className="cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() => toggleExpanded(faq.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-lg text-left">
                                    {faq.question}
                                  </CardTitle>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline" className="text-xs">
                                      {faq.category}
                                    </Badge>
                                    {faq.tags.slice(0, 2).map(tag => (
                                      <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                {expandedItems.includes(faq.id) ? (
                                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                            </CardHeader>
                            {expandedItems.includes(faq.id) && (
                              <CardContent>
                                <Separator className="mb-4" />
                                <p className="text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </CardContent>
                            )}
                          </Card>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default FAQPage;