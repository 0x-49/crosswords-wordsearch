import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ArrowRight, 
  CheckCircle, 
  Play,
  Download,
  Eye,
  Settings,
  Users,
  Clock,
  Star,
  Lightbulb,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

const steps = [
  {
    number: 1,
    title: 'Create Your Account',
    description: 'Sign up for a free WordCraft account to get started',
    details: [
      'Click "Sign Up" in the top navigation',
      'Enter your email and create a password',
      'Verify your email address',
      'Complete your profile setup'
    ],
    time: '2 minutes',
    difficulty: 'Easy'
  },
  {
    number: 2,
    title: 'Choose Your Theme',
    description: 'Select from 100+ professionally curated themes',
    details: [
      'Browse themes by category (Seniors, Kids, Travel, etc.)',
      'Preview theme content and sample words',
      'Consider your target audience',
      'Select themes that match your publishing goals'
    ],
    time: '5 minutes',
    difficulty: 'Easy'
  },
  {
    number: 3,
    title: 'Generate Your Book',
    description: 'Create a complete puzzle book with 150 puzzles',
    details: [
      'Navigate to the Book Generator',
      'Select your chosen theme',
      'Click "Generate Book" and wait for processing',
      'Your book will include 75 word searches + 75 crosswords'
    ],
    time: '1-2 minutes',
    difficulty: 'Easy'
  },
  {
    number: 4,
    title: 'Preview & Customize',
    description: 'Review your puzzles and make any adjustments',
    details: [
      'Use the Book Library to view your generated book',
      'Preview individual puzzles before downloading',
      'Play puzzles online to test quality',
      'Regenerate if needed with different themes'
    ],
    time: '10 minutes',
    difficulty: 'Medium'
  },
  {
    number: 5,
    title: 'Download & Publish',
    description: 'Export your book and publish on your preferred platform',
    details: [
      'Download as high-quality PDF',
      'Files are pre-formatted for Amazon KDP',
      'Upload directly to your publishing platform',
      'Start earning from your puzzle book!'
    ],
    time: '5 minutes',
    difficulty: 'Easy'
  }
];

const tips = [
  {
    icon: Users,
    title: 'Know Your Audience',
    description: 'Choose themes that resonate with your target demographic. Senior-friendly themes like "Classic Movies" and "Vintage Music" are very popular.'
  },
  {
    icon: Star,
    title: 'Quality Over Quantity',
    description: 'Focus on creating high-quality books with well-chosen themes rather than generating many books quickly.'
  },
  {
    icon: Eye,
    title: 'Always Preview',
    description: 'Use the preview feature to check puzzle quality and ensure all words are appropriate for your audience.'
  },
  {
    icon: Download,
    title: 'Optimize for Print',
    description: 'Our PDFs are pre-optimized for printing, but always check the final output before publishing.'
  }
];

const commonMistakes = [
  {
    mistake: 'Not previewing puzzles before publishing',
    solution: 'Always use the preview feature to check puzzle quality and difficulty'
  },
  {
    mistake: 'Choosing themes without considering target audience',
    solution: 'Research your audience and select themes that appeal to them specifically'
  },
  {
    mistake: 'Publishing without testing the PDF format',
    solution: 'Download and review the PDF to ensure proper formatting before uploading to KDP'
  },
  {
    mistake: 'Generating too many books at once',
    solution: 'Start with 1-2 high-quality books and learn the process before scaling up'
  }
];

const GettingStartedPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Getting Started Guide - WordCraft</title>
        <meta name="description" content="Complete beginner's guide to creating your first puzzle book with WordCraft. Step-by-step instructions for generating, previewing, and publishing puzzle books." />
        <meta name="keywords" content="getting started, tutorial, puzzle book creation, beginner guide, WordCraft, step by step" />
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
                <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
                <h1 className="heading-xl mb-6">
                  Getting Started with WordCraft
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Learn how to create your first professional puzzle book in just a few simple steps. 
                  From account setup to publishing, we'll guide you through the entire process.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      <Play className="h-4 w-4 mr-2" />
                      Start Creating Now
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/help/tutorials">
                      Watch Video Tutorial
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Quick Overview */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">15 Minutes</h3>
                    <p className="text-sm text-muted-foreground">
                      Total time to create your first puzzle book
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">150 Puzzles</h3>
                    <p className="text-sm text-muted-foreground">
                      75 word searches + 75 crosswords per book
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Download className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">KDP Ready</h3>
                    <p className="text-sm text-muted-foreground">
                      Pre-formatted PDFs ready for publishing
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Step-by-Step Guide */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Step-by-Step Guide</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Follow these simple steps to create your first professional puzzle book.
                </p>
              </div>

              <div className="space-y-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                            {step.number}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl">{step.title}</CardTitle>
                            <CardDescription className="text-base mt-1">
                              {step.description}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {step.time}
                            </Badge>
                            <Badge variant={step.difficulty === 'Easy' ? 'default' : 'secondary'}>
                              {step.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <ul className="space-y-3">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Pro Tips for Success</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Learn from experienced puzzle book creators to maximize your success.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tips.map((tip, index) => {
                  const Icon = tip.icon;
                  return (
                    <motion.div
                      key={tip.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <Icon className="h-8 w-8 text-primary" />
                            <CardTitle className="text-lg">{tip.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{tip.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Common Mistakes to Avoid</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Learn from others' experiences and avoid these common pitfalls.
                </p>
              </div>

              <div className="space-y-4">
                {commonMistakes.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <div>
                            <strong>Mistake:</strong> {item.mistake}
                          </div>
                          <div>
                            <strong>Solution:</strong> {item.solution}
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="py-16 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="heading-md mb-4">Ready to Create Your First Book?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    You now have all the knowledge you need to create professional puzzle books. 
                    Start with a theme you're passionate about and begin your publishing journey!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                      <Link href="/book-generator">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Create Your First Book
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/help/tutorials">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Tutorials
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

export default GettingStartedPage;