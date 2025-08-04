import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Map, 
  Home,
  User,
  BookOpen,
  Puzzle,
  HelpCircle,
  MessageCircle,
  Users,
  FileText,
  Settings,
  Shield,
  ExternalLink,
  Search,
  Rss
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SitemapSection {
  title: string;
  description: string;
  icon: any;
  pages: {
    title: string;
    href: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }[];
}

const sitemapSections: SitemapSection[] = [
  {
    title: 'Main Pages',
    description: 'Core pages and primary navigation',
    icon: Home,
    pages: [
      { title: 'Home', href: '/', description: 'WordCraft homepage and overview', priority: 'high' },
      { title: 'Features', href: '/features', description: 'Platform features and capabilities', priority: 'high' },
      { title: 'Pricing', href: '/pricing', description: 'Subscription plans and pricing', priority: 'high' },
      { title: 'About Us', href: '/about', description: 'Company information and mission', priority: 'medium' },
      { title: 'Contact', href: '/contact', description: 'Get in touch with our team', priority: 'medium' }
    ]
  },
  {
    title: 'Product & Tools',
    description: 'Puzzle creation tools and resources',
    icon: Puzzle,
    pages: [
      { title: 'Dashboard', href: '/dashboard', description: 'User dashboard and puzzle creation', priority: 'high' },
      { title: 'Book Library', href: '/book-library', description: 'Browse puzzle book examples', priority: 'high' },
      { title: 'Templates', href: '/templates', description: 'Puzzle book templates', priority: 'medium' },
      { title: 'Book Generator', href: '/book-generator', description: 'Generate custom puzzle books', priority: 'medium' }
    ]
  },
  {
    title: 'Account & Authentication',
    description: 'User account management',
    icon: User,
    pages: [
      { title: 'Sign Up', href: '/signup', description: 'Create a new account', priority: 'high' },
      { title: 'Login', href: '/login', description: 'Sign in to your account', priority: 'high' },
      { title: 'Forgot Password', href: '/forgot-password', description: 'Reset your password', priority: 'low' },
      { title: 'Reset Password', href: '/reset-password', description: 'Set a new password', priority: 'low' }
    ]
  },
  {
    title: 'Support & Help',
    description: 'Documentation and customer support',
    icon: HelpCircle,
    pages: [
      { title: 'Help Center', href: '/help', description: 'Support documentation and guides', priority: 'high' },
      { title: 'Getting Started', href: '/help/getting-started', description: 'Quick start guide', priority: 'medium' },
      { title: 'Tutorials', href: '/help/tutorials', description: 'Step-by-step tutorials', priority: 'medium' },
      { title: 'FAQ', href: '/help/faq', description: 'Frequently asked questions', priority: 'medium' }
    ]
  },
  {
    title: 'Community & Resources',
    description: 'Community features and additional resources',
    icon: Users,
    pages: [
      { title: 'Community', href: '/community', description: 'Join our creator community', priority: 'medium' },
      { title: 'Blog', href: '/blog', description: 'Industry insights and tips', priority: 'medium' },
      { title: 'Glossary', href: '/glossary', description: 'Puzzle terminology guide', priority: 'low' },
      { title: 'Press Kit', href: '/press', description: 'Media resources and company info', priority: 'low' }
    ]
  },
  {
    title: 'Company & Legal',
    description: 'Corporate information and legal documents',
    icon: FileText,
    pages: [
      { title: 'Careers', href: '/careers', description: 'Join our team', priority: 'medium' },
      { title: 'Privacy Policy', href: '/privacy-policy', description: 'Privacy and data protection', priority: 'medium' },
      { title: 'Terms of Service', href: '/terms', description: 'Terms and conditions', priority: 'medium' },
      { title: 'Cookie Policy', href: '/cookies', description: 'Cookie usage information', priority: 'low' },
      { title: 'GDPR Rights', href: '/gdpr', description: 'GDPR compliance and user rights', priority: 'low' },
      { title: 'Accessibility', href: '/accessibility', description: 'Accessibility statement', priority: 'low' }
    ]
  },
  {
    title: 'Developer & Technical',
    description: 'Technical resources and system information',
    icon: Settings,
    pages: [
      { title: 'API Documentation', href: '/api-docs', description: 'Developer API reference', priority: 'medium' },
      { title: 'System Status', href: '/status', description: 'Service health and uptime', priority: 'low' },
      { title: 'Feedback', href: '/feedback', description: 'Submit feedback and suggestions', priority: 'medium' }
    ]
  }
];

const SitemapPage: NextPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredSections, setFilteredSections] = React.useState(sitemapSections);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredSections(sitemapSections);
      return;
    }

    const filtered = sitemapSections.map(section => ({
      ...section,
      pages: section.pages.filter(page => 
        page.title.toLowerCase().includes(query.toLowerCase()) ||
        page.description.toLowerCase().includes(query.toLowerCase())
      )
    })).filter(section => section.pages.length > 0);

    setFilteredSections(filtered);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalPages = sitemapSections.reduce((total, section) => total + section.pages.length, 0);

  return (
    <>
      <Head>
        <title>Sitemap - WordCraft</title>
        <meta name="description" content="Complete sitemap of WordCraft website. Find all pages, features, documentation, and resources in one organized location." />
        <meta name="keywords" content="sitemap, website map, navigation, WordCraft pages, site structure" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Sitemap - WordCraft" />
        <meta property="og:description" content="Complete sitemap of WordCraft website. Find all pages, features, documentation, and resources in one organized location." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordcraft.com/sitemap" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sitemap - WordCraft" />
        <meta name="twitter:description" content="Complete sitemap of WordCraft website. Find all pages, features, documentation, and resources in one organized location." />
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
                <Map className="h-16 w-16 text-primary mx-auto mb-6" />
                <h1 className="heading-xl mb-6">
                  Website Sitemap
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Navigate through all {totalPages} pages of WordCraft. Find exactly what you're looking for 
                  with our organized site structure and search functionality.
                </p>
                
                {/* Search Bar */}
                <div className="max-w-md mx-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search pages..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Quick Links */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-4">Quick Access</h2>
                <p className="text-muted-foreground">Jump to the most important sections</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button asChild variant="outline">
                  <Link href="/sitemap.xml" target="_blank">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    XML Sitemap
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/blog">
                    <Rss className="h-4 w-4 mr-2" />
                    Blog
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/help">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help Center
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/api-docs">
                    <FileText className="h-4 w-4 mr-2" />
                    API Docs
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Sitemap Sections */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="space-y-12">
                {filteredSections.map((section, sectionIndex) => {
                  const Icon = section.icon;
                  return (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3 text-2xl">
                            <Icon className="h-8 w-8 text-primary" />
                            {section.title}
                            <Badge variant="outline" className="ml-auto">
                              {section.pages.length} pages
                            </Badge>
                          </CardTitle>
                          <CardDescription className="text-base">
                            {section.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.pages.map((page, pageIndex) => (
                              <motion.div
                                key={page.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: pageIndex * 0.05 }}
                              >
                                <Link href={page.href}>
                                  <Card className="h-full hover:shadow-md transition-all duration-300 cursor-pointer group border-l-4 border-l-primary/20 hover:border-l-primary">
                                    <CardContent className="p-4">
                                      <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                                          {page.title}
                                        </h3>
                                        <Badge className={`text-xs ${getPriorityColor(page.priority)}`}>
                                          {page.priority}
                                        </Badge>
                                      </div>
                                      <p className="text-sm text-muted-foreground mb-2">
                                        {page.description}
                                      </p>
                                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                                        {page.href}
                                      </code>
                                    </CardContent>
                                  </Card>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* No Results */}
              {filteredSections.length === 0 && searchQuery && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No pages found</h3>
                  <p className="text-muted-foreground mb-6">
                    No pages match your search for "{searchQuery}". Try a different search term.
                  </p>
                  <Button onClick={() => handleSearch('')} variant="outline">
                    Clear Search
                  </Button>
                </motion.div>
              )}
            </div>
          </section>

          {/* Additional Resources */}
          <section className="py-16 px-4 bg-gradient-to-b from-secondary/20 to-background">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="heading-md mb-4">Need Help Finding Something?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Can't find what you're looking for? Our support team is here to help you 
                    navigate WordCraft and find the resources you need.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                      <Link href="/contact">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Support
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/help">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Browse Help Center
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Footer Info */}
          <section className="py-8 px-4 border-t">
            <div className="container-fluid max-w-4xl mx-auto text-center">
              <p className="text-sm text-muted-foreground mb-4">
                This sitemap was last updated on {new Date().toLocaleDateString()}. 
                For technical sitemaps, visit our{' '}
                <Link href="/sitemap.xml" className="text-primary hover:underline" target="_blank">
                  XML sitemap
                </Link>
                .
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                <span>Total Pages: {totalPages}</span>
                <span>•</span>
                <span>Sections: {sitemapSections.length}</span>
                <span>•</span>
                <span>Last Updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default SitemapPage;