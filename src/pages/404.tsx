import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Search, 
  Home, 
  ArrowLeft,
  BookOpen,
  Puzzle,
  HelpCircle,
  Compass,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const popularPages = [
  {
    title: 'Dashboard',
    description: 'Create and manage your puzzle books',
    href: '/dashboard',
    icon: Home
  },
  {
    title: 'Book Library',
    description: 'Browse our collection of puzzle books',
    href: '/book-library',
    icon: BookOpen
  },
  {
    title: 'Features',
    description: 'Discover WordCraft capabilities',
    href: '/features',
    icon: Puzzle
  },
  {
    title: 'Help Center',
    description: 'Get support and find answers',
    href: '/help',
    icon: HelpCircle
  }
];

const Custom404: NextPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to search or help page with query
      window.location.href = `/help?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <Head>
        <title>Page Not Found - WordCraft</title>
        <meta name="description" content="The page you're looking for doesn't exist. Find what you need with our helpful navigation and search." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center px-4">
          <div className="container-fluid max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* 404 Illustration */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-9xl font-bold text-primary/20 mb-4"
                >
                  404
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Compass className="h-24 w-24 text-primary animate-pulse" />
                </motion.div>
              </div>

              {/* Error Message */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Page Not Found
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Oops! The page you're looking for seems to have wandered off. 
                  Don't worry, we'll help you find your way back to creating amazing puzzles.
                </p>
              </div>

              {/* Search Bar */}
              <Card className="max-w-md mx-auto">
                <CardContent className="p-6">
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search for help or features..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/dashboard">
                    <Puzzle className="h-4 w-4 mr-2" />
                    Create Puzzles
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </div>

              {/* Popular Pages */}
              <div className="mt-16">
                <h2 className="text-2xl font-semibold mb-8 text-foreground">
                  Popular Pages
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {popularPages.map((page, index) => {
                    const Icon = page.icon;
                    return (
                      <motion.div
                        key={page.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      >
                        <Link href={page.href}>
                          <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                            <CardHeader className="text-center">
                              <Icon className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                              <CardTitle className="text-lg">{page.title}</CardTitle>
                              <CardDescription>{page.description}</CardDescription>
                            </CardHeader>
                          </Card>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Help Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-16 p-8 bg-muted/50 rounded-lg"
              >
                <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Still Lost?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  If you can't find what you're looking for, our support team is here to help. 
                  We'll get you back on track in no time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="outline">
                    <Link href="/contact">
                      Contact Support
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/help">
                      Browse Help Center
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/community">
                      Join Community
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Footer Note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="text-sm text-muted-foreground mt-8"
              >
                Error Code: 404 | If this page should exist, please{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  let us know
                </Link>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Custom404;