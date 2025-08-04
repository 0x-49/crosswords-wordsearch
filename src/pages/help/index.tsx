import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  BookOpen, 
  Puzzle, 
  Download,
  CreditCard,
  Users,
  Settings,
  ArrowRight,
  Search,
  MessageCircle,
  FileText,
  Video,
  Lightbulb,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of creating your first puzzle book',
    icon: BookOpen,
    color: 'bg-blue-50 border-blue-200',
    href: '/help/getting-started',
    articles: 8,
    popular: true
  },
  {
    id: 'puzzle-creation',
    title: 'Puzzle Creation',
    description: 'Master the art of generating perfect puzzles',
    icon: Puzzle,
    color: 'bg-purple-50 border-purple-200',
    href: '/help/tutorials',
    articles: 12,
    popular: true
  },
  {
    id: 'downloads-publishing',
    title: 'Downloads & Publishing',
    description: 'Export and publish your puzzle books',
    icon: Download,
    color: 'bg-green-50 border-green-200',
    href: '/help/tutorials',
    articles: 6,
    popular: false
  },
  {
    id: 'account-billing',
    title: 'Account & Billing',
    description: 'Manage your account and subscription',
    icon: CreditCard,
    color: 'bg-orange-50 border-orange-200',
    href: '/help/tutorials',
    articles: 5,
    popular: false
  },
  {
    id: 'technical-support',
    title: 'Technical Support',
    description: 'Troubleshoot common issues',
    icon: Settings,
    color: 'bg-red-50 border-red-200',
    href: '/help/tutorials',
    articles: 10,
    popular: false
  },
  {
    id: 'features',
    title: 'Features & Tips',
    description: 'Discover advanced features and pro tips',
    icon: Lightbulb,
    color: 'bg-yellow-50 border-yellow-200',
    href: '/help/tutorials',
    articles: 15,
    popular: true
  }
];

const quickActions = [
  {
    title: 'Frequently Asked Questions',
    description: 'Find answers to the most common questions',
    icon: HelpCircle,
    href: '/help/faq',
    color: 'text-blue-600'
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step video guides',
    icon: Video,
    href: '/help/tutorials',
    color: 'text-purple-600'
  },
  {
    title: 'Contact Support',
    description: 'Get help from our support team',
    icon: MessageCircle,
    href: '/contact',
    color: 'text-green-600'
  },
  {
    title: 'Documentation',
    description: 'Browse our complete documentation',
    icon: FileText,
    href: '/help/tutorials',
    color: 'text-orange-600'
  }
];

const popularArticles = [
  {
    title: 'How to Create Your First Puzzle Book',
    description: 'Step-by-step guide to generating your first book',
    readTime: '5 min read',
    href: '/help/getting-started',
    category: 'Getting Started'
  },
  {
    title: 'Choosing the Right Theme for Your Audience',
    description: 'Tips for selecting themes that sell well',
    readTime: '8 min read',
    href: '/help/tutorials',
    category: 'Puzzle Creation'
  },
  {
    title: 'Publishing on Amazon KDP',
    description: 'Complete guide to KDP publishing',
    readTime: '12 min read',
    href: '/help/tutorials',
    category: 'Publishing'
  },
  {
    title: 'Troubleshooting Common Issues',
    description: 'Solutions to frequent problems',
    readTime: '6 min read',
    href: '/help/tutorials',
    category: 'Technical Support'
  },
  {
    title: 'Advanced Puzzle Customization',
    description: 'Make your puzzles stand out',
    readTime: '10 min read',
    href: '/help/tutorials',
    category: 'Features'
  }
];

const HelpCenterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Help Center - WordCraft</title>
        <meta name="description" content="Get help with WordCraft puzzle book generator. Find tutorials, FAQs, and support for creating, downloading, and publishing puzzle books." />
        <meta name="keywords" content="help, support, tutorials, FAQ, puzzle books, word search, crossword, documentation" />
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
                  How can we help you?
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Find answers, learn new skills, and get the most out of WordCraft with our comprehensive help center.
                </p>

                {/* Search Bar */}
                <div className="relative max-w-md mx-auto mb-8">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for help..."
                    className="pl-10"
                  />
                  <Button size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    Search
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link href={action.href}>
                        <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                          <CardContent className="p-6 text-center">
                            <Icon className={`h-12 w-12 mx-auto mb-4 ${action.color} group-hover:scale-110 transition-transform`} />
                            <h3 className="font-semibold mb-2">{action.title}</h3>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Help Categories */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Browse by Category</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore our organized help sections to find exactly what you're looking for.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {helpCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link href={category.href}>
                        <Card className={`h-full hover:shadow-lg transition-all duration-300 cursor-pointer group ${category.color}`}>
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Icon className="h-8 w-8 text-primary" />
                              <div className="flex items-center gap-2">
                                {category.popular && (
                                  <Badge variant="secondary" className="text-xs">
                                    Popular
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {category.articles} articles
                                </Badge>
                              </div>
                            </div>
                            <CardTitle className="group-hover:text-primary transition-colors">
                              {category.title}
                            </CardTitle>
                            <CardDescription>
                              {category.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform">
                              Browse articles
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Popular Articles */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Popular Articles</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Most helpful articles based on community feedback and usage.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {popularArticles.map((article, index) => (
                  <motion.div
                    key={article.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link href={article.href}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">
                              {article.category}
                            </Badge>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {article.readTime}
                            </div>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {article.title}
                          </CardTitle>
                          <CardDescription>
                            {article.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform">
                            Read article
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Support CTA */}
          <section className="py-16 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="heading-md mb-4">Still need help?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Can't find what you're looking for? Our friendly support team is here to help you succeed with WordCraft.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                      <Link href="/contact">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Support
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/help/faq">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Browse FAQ
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

export default HelpCenterPage;