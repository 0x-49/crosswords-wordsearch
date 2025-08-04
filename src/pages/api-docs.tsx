import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Code, 
  Book, 
  Key,
  Zap,
  Shield,
  Globe,
  Database,
  Settings,
  Copy,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  Terminal,
  FileText,
  Puzzle,
  Download,
  Play,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

const apiEndpoints = [
  {
    method: 'POST',
    endpoint: '/api/books/generate-book',
    description: 'Generate a complete puzzle book with specified theme and settings',
    category: 'Books',
    parameters: [
      { name: 'theme', type: 'string', required: true, description: 'Theme name for the puzzle book' },
      { name: 'puzzleCount', type: 'number', required: false, description: 'Number of puzzles (default: 150)' },
      { name: 'difficulty', type: 'string', required: false, description: 'Difficulty level: easy, medium, hard' },
      { name: 'format', type: 'string', required: false, description: 'Output format: pdf, json' }
    ],
    response: {
      bookId: 'string',
      title: 'string',
      puzzles: 'array',
      downloadUrl: 'string'
    }
  },
  {
    method: 'GET',
    endpoint: '/api/books/themes',
    description: 'Retrieve all available puzzle themes',
    category: 'Books',
    parameters: [],
    response: {
      themes: 'array',
      categories: 'array',
      total: 'number'
    }
  },
  {
    method: 'POST',
    endpoint: '/api/word-search/create',
    description: 'Create a single word search puzzle',
    category: 'Puzzles',
    parameters: [
      { name: 'words', type: 'array', required: true, description: 'Array of words to include' },
      { name: 'gridSize', type: 'number', required: false, description: 'Grid size (default: 15)' },
      { name: 'difficulty', type: 'string', required: false, description: 'Difficulty level' }
    ],
    response: {
      puzzleId: 'string',
      grid: 'array',
      words: 'array',
      solution: 'array'
    }
  },
  {
    method: 'GET',
    endpoint: '/api/word-search/list',
    description: 'List all word search puzzles for authenticated user',
    category: 'Puzzles',
    parameters: [
      { name: 'page', type: 'number', required: false, description: 'Page number for pagination' },
      { name: 'limit', type: 'number', required: false, description: 'Items per page (max 100)' }
    ],
    response: {
      puzzles: 'array',
      pagination: 'object',
      total: 'number'
    }
  }
];

const codeExamples = {
  javascript: `// Generate a puzzle book
const response = await fetch('/api/books/generate-book', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    theme: 'animals',
    puzzleCount: 50,
    difficulty: 'medium',
    format: 'pdf'
  })
});

const book = await response.json();
console.log('Book generated:', book.bookId);`,

  python: `import requests

# Generate a puzzle book
url = 'https://api.wordcraft.com/books/generate-book'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
}
data = {
    'theme': 'animals',
    'puzzleCount': 50,
    'difficulty': 'medium',
    'format': 'pdf'
}

response = requests.post(url, json=data, headers=headers)
book = response.json()
print(f"Book generated: {book['bookId']}")`,

  curl: `curl -X POST https://api.wordcraft.com/books/generate-book \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "theme": "animals",
    "puzzleCount": 50,
    "difficulty": "medium",
    "format": "pdf"
  }'`
};

const quickStartSteps = [
  {
    title: 'Get Your API Key',
    description: 'Sign up for a WordCraft account and generate your API key from the dashboard.',
    icon: Key,
    action: 'Get API Key'
  },
  {
    title: 'Make Your First Request',
    description: 'Use our REST API to generate your first puzzle book or individual puzzle.',
    icon: Zap,
    action: 'Try API'
  },
  {
    title: 'Integrate & Build',
    description: 'Integrate WordCraft API into your application and start building amazing puzzle experiences.',
    icon: Code,
    action: 'View Examples'
  }
];

const ApiDocsPage: NextPage = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(language);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const groupedEndpoints = apiEndpoints.reduce((acc, endpoint) => {
    if (!acc[endpoint.category]) {
      acc[endpoint.category] = [];
    }
    acc[endpoint.category].push(endpoint);
    return acc;
  }, {} as Record<string, typeof apiEndpoints>);

  return (
    <>
      <Head>
        <title>API Documentation - WordCraft</title>
        <meta name="description" content="Complete API documentation for WordCraft puzzle generation platform. Learn how to integrate puzzle creation into your applications with our REST API." />
        <meta name="keywords" content="API documentation, REST API, puzzle generation API, WordCraft API, developer docs, integration guide" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="API Documentation - WordCraft" />
        <meta property="og:description" content="Complete API documentation for WordCraft puzzle generation platform. Learn how to integrate puzzle creation into your applications with our REST API." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordcraft.com/api-docs" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="API Documentation - WordCraft" />
        <meta name="twitter:description" content="Complete API documentation for WordCraft puzzle generation platform. Learn how to integrate puzzle creation into your applications with our REST API." />
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
                <Code className="h-16 w-16 text-primary mx-auto mb-6" />
                <h1 className="heading-xl mb-6">
                  API Documentation
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Integrate WordCraft's powerful puzzle generation capabilities into your applications. 
                  Create word searches, crosswords, and complete puzzle books programmatically.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/signup">
                      <Key className="h-4 w-4 mr-2" />
                      Get API Key
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Try Interactive Demo
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Quick Start */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Quick Start Guide</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Get up and running with the WordCraft API in just a few minutes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {quickStartSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="text-center h-full hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <div className="relative">
                            <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                            <Badge variant="secondary" className="absolute -top-2 -right-2">
                              {index + 1}
                            </Badge>
                          </div>
                          <CardTitle>{step.title}</CardTitle>
                          <CardDescription>{step.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full">
                            {step.action}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* API Overview */}
          <section className="py-12 px-4 bg-gradient-to-b from-secondary/20 to-background">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">API Overview</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  RESTful API with JSON responses, comprehensive error handling, and rate limiting.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Globe, title: 'REST API', description: 'Standard HTTP methods and JSON responses' },
                  { icon: Shield, title: 'Secure', description: 'API key authentication and HTTPS encryption' },
                  { icon: Zap, title: 'Fast', description: 'Optimized for speed with global CDN' },
                  { icon: Database, title: 'Reliable', description: '99.9% uptime SLA with redundancy' }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="text-center h-full">
                        <CardContent className="p-6">
                          <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
                          <h3 className="font-semibold mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Authentication */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Authentication</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Secure your API requests with API key authentication.
                </p>
              </div>

              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    API Key Authentication
                  </CardTitle>
                  <CardDescription>
                    Include your API key in the Authorization header of every request.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Keep your API key secure and never expose it in client-side code. 
                      Use environment variables or secure configuration management.
                    </AlertDescription>
                  </Alert>

                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-muted-foreground">Authorization Header</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY', 'auth')}
                      >
                        {copiedCode === 'auth' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <code>Authorization: Bearer YOUR_API_KEY</code>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Code Examples */}
          <section className="py-12 px-4 bg-gradient-to-b from-background to-secondary/20">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Code Examples</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Get started quickly with examples in popular programming languages.
                </p>
              </div>

              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle>Generate a Puzzle Book</CardTitle>
                  <CardDescription>
                    Example showing how to create a complete puzzle book using the API.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="javascript" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                    </TabsList>
                    
                    {Object.entries(codeExamples).map(([language, code]) => (
                      <TabsContent key={language} value={language}>
                        <div className="relative">
                          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                            <div className="flex items-center justify-between mb-4">
                              <Badge variant="outline">{language}</Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(code, language)}
                              >
                                {copiedCode === language ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <pre className="whitespace-pre-wrap">{code}</pre>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* API Endpoints */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">API Endpoints</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Complete reference for all available API endpoints and their parameters.
                </p>
              </div>

              <div className="space-y-8">
                {Object.entries(groupedEndpoints).map(([category, endpoints]) => (
                  <div key={category}>
                    <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                      {category === 'Books' ? <Book className="h-6 w-6" /> : <Puzzle className="h-6 w-6" />}
                      {category}
                    </h3>
                    
                    <div className="space-y-4">
                      {endpoints.map((endpoint, index) => (
                        <motion.div
                          key={endpoint.endpoint}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Card>
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                                    {endpoint.method}
                                  </Badge>
                                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                                    {endpoint.endpoint}
                                  </code>
                                </div>
                              </div>
                              <CardDescription className="mt-2">
                                {endpoint.description}
                              </CardDescription>
                            </CardHeader>
                            
                            <CardContent>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-medium mb-3">Parameters</h4>
                                  {endpoint.parameters.length > 0 ? (
                                    <div className="space-y-2">
                                      {endpoint.parameters.map((param) => (
                                        <div key={param.name} className="text-sm">
                                          <div className="flex items-center gap-2">
                                            <code className="font-mono bg-muted px-1 rounded">
                                              {param.name}
                                            </code>
                                            <Badge variant="outline" className="text-xs">
                                              {param.type}
                                            </Badge>
                                            {param.required && (
                                              <Badge variant="destructive" className="text-xs">
                                                required
                                              </Badge>
                                            )}
                                          </div>
                                          <p className="text-muted-foreground mt-1 ml-2">
                                            {param.description}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-muted-foreground">No parameters required</p>
                                  )}
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-3">Response</h4>
                                  <div className="bg-muted rounded p-3 text-sm font-mono">
                                    <pre>{JSON.stringify(endpoint.response, null, 2)}</pre>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Rate Limits & Support */}
          <section className="py-16 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Rate Limits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Free Plan</span>
                        <span className="font-mono">100 requests/hour</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pro Plan</span>
                        <span className="font-mono">1,000 requests/hour</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Enterprise</span>
                        <span className="font-mono">Custom limits</span>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <p className="text-sm text-muted-foreground">
                      Rate limits are enforced per API key. Contact support for higher limits.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Terminal className="h-5 w-5" />
                      Developer Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button asChild className="w-full">
                        <Link href="/contact">
                          Get Technical Support
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <a href="https://github.com/wordcraft/api-examples" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Code Examples
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/community">
                          Join Developer Community
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default ApiDocsPage;