import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Star,
  Heart,
  Lightbulb,
  Bug,
  Zap,
  ThumbsUp,
  ThumbsDown,
  Send,
  CheckCircle,
  AlertCircle,
  Smile,
  Frown,
  Meh,
  Users,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const feedbackCategories = [
  {
    id: 'feature-request',
    title: 'Feature Request',
    description: 'Suggest new features or improvements',
    icon: Lightbulb,
    color: 'text-yellow-600'
  },
  {
    id: 'bug-report',
    title: 'Bug Report',
    description: 'Report issues or problems you encountered',
    icon: Bug,
    color: 'text-red-600'
  },
  {
    id: 'general-feedback',
    title: 'General Feedback',
    description: 'Share your thoughts and experiences',
    icon: MessageSquare,
    color: 'text-blue-600'
  },
  {
    id: 'praise',
    title: 'Praise & Compliments',
    description: 'Tell us what you love about WordCraft',
    icon: Heart,
    color: 'text-pink-600'
  }
];

const recentFeedback = [
  {
    id: 1,
    type: 'feature-request',
    title: 'Add custom grid shapes for word searches',
    author: 'Sarah M.',
    votes: 47,
    status: 'under-review',
    timeAgo: '2 days ago'
  },
  {
    id: 2,
    type: 'praise',
    title: 'Amazing puzzle generation quality!',
    author: 'Mike R.',
    votes: 23,
    status: 'acknowledged',
    timeAgo: '1 week ago'
  },
  {
    id: 3,
    type: 'bug-report',
    title: 'PDF export sometimes fails on large books',
    author: 'Emma T.',
    votes: 15,
    status: 'in-progress',
    timeAgo: '3 days ago'
  },
  {
    id: 4,
    type: 'feature-request',
    title: 'Bulk theme selection for book generation',
    author: 'David K.',
    votes: 31,
    status: 'planned',
    timeAgo: '5 days ago'
  }
];

const satisfactionStats = [
  { label: 'Overall Satisfaction', value: '4.8/5', icon: Star, trend: '+0.2' },
  { label: 'Feature Requests', value: '156', icon: Lightbulb, trend: '+12' },
  { label: 'Issues Resolved', value: '89%', icon: CheckCircle, trend: '+5%' },
  { label: 'Response Time', value: '< 24h', icon: Zap, trend: '-2h' }
];

const FeedbackPage: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [satisfaction, setSatisfaction] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    email: '',
    priority: '',
    anonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'under-review':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'acknowledged':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (type: string) => {
    const category = feedbackCategories.find(cat => cat.id === type);
    return category ? category.icon : MessageSquare;
  };

  return (
    <>
      <Head>
        <title>Feedback & Suggestions - WordCraft</title>
        <meta name="description" content="Share your feedback, suggestions, and ideas to help us improve WordCraft. Report bugs, request features, or tell us what you love about our puzzle platform." />
        <meta name="keywords" content="feedback, suggestions, feature requests, bug reports, WordCraft feedback, user feedback, product improvement" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Feedback & Suggestions - WordCraft" />
        <meta property="og:description" content="Share your feedback, suggestions, and ideas to help us improve WordCraft. Report bugs, request features, or tell us what you love about our puzzle platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordcraft.com/feedback" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Feedback & Suggestions - WordCraft" />
        <meta name="twitter:description" content="Share your feedback, suggestions, and ideas to help us improve WordCraft. Report bugs, request features, or tell us what you love about our puzzle platform." />
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
                <MessageSquare className="h-16 w-16 text-primary mx-auto mb-6" />
                <h1 className="heading-xl mb-6">
                  Your Feedback Matters
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Help us make WordCraft better! Share your ideas, report issues, request features, 
                  or simply tell us what you love about our puzzle creation platform.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Satisfaction Stats */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {satisfactionStats.map((stat, index) => {
                  const Icon = stat.icon;
                  const isPositive = stat.trend.startsWith('+') || stat.trend.startsWith('-') && stat.label === 'Response Time';
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="text-center hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
                          <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                          <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                          <div className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.trend} this month
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <Tabs defaultValue="submit" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
                  <TabsTrigger value="browse">Browse Feedback</TabsTrigger>
                </TabsList>

                {/* Submit Feedback Tab */}
                <TabsContent value="submit" className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="heading-lg mb-4">Share Your Thoughts</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Choose a category below and tell us what's on your mind. Every piece of feedback helps us improve.
                    </p>
                  </div>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="max-w-2xl mx-auto bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                        <CardContent className="p-8 text-center">
                          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                          <h3 className="text-2xl font-semibold mb-4 text-green-800">Thank You!</h3>
                          <p className="text-green-700 mb-6">
                            Your feedback has been submitted successfully. We'll review it and get back to you within 24 hours.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button onClick={() => {
                              setIsSubmitted(false);
                              setFormData({ title: '', description: '', email: '', priority: '', anonymous: false });
                              setSelectedCategory('');
                            }}>
                              Submit More Feedback
                            </Button>
                            <Button variant="outline" asChild>
                              <Link href="/dashboard">
                                Back to Dashboard
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ) : (
                    <>
                      {/* Category Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {feedbackCategories.map((category, index) => {
                          const Icon = category.icon;
                          return (
                            <motion.div
                              key={category.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                              <Card 
                                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                  selectedCategory === category.id 
                                    ? 'ring-2 ring-primary bg-primary/5' 
                                    : 'hover:bg-secondary/50'
                                }`}
                                onClick={() => setSelectedCategory(category.id)}
                              >
                                <CardContent className="p-6 text-center">
                                  <Icon className={`h-8 w-8 mx-auto mb-3 ${category.color}`} />
                                  <h3 className="font-semibold mb-2">{category.title}</h3>
                                  <p className="text-sm text-muted-foreground">{category.description}</p>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Feedback Form */}
                      {selectedCategory && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Card className="max-w-4xl mx-auto">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                {React.createElement(
                                  feedbackCategories.find(cat => cat.id === selectedCategory)?.icon || MessageSquare,
                                  { className: "h-5 w-5" }
                                )}
                                {feedbackCategories.find(cat => cat.id === selectedCategory)?.title}
                              </CardTitle>
                              <CardDescription>
                                Please provide as much detail as possible to help us understand your feedback.
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                      id="title"
                                      placeholder="Brief summary of your feedback"
                                      value={formData.title}
                                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                      required
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label htmlFor="priority">Priority</Label>
                                    <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select priority level" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="critical">Critical</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="description">Description *</Label>
                                  <Textarea
                                    id="description"
                                    placeholder="Please provide detailed information about your feedback..."
                                    rows={6}
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    required
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="email">Email Address</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    placeholder="your.email@example.com (optional)"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    We'll use this to follow up on your feedback if needed.
                                  </p>
                                </div>

                                {/* Satisfaction Rating */}
                                <div className="space-y-4">
                                  <Label>How satisfied are you with WordCraft overall?</Label>
                                  <RadioGroup value={satisfaction} onValueChange={setSatisfaction} className="flex gap-6">
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="very-satisfied" id="very-satisfied" />
                                      <Label htmlFor="very-satisfied" className="flex items-center gap-2 cursor-pointer">
                                        <Smile className="h-4 w-4 text-green-600" />
                                        Very Satisfied
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="satisfied" id="satisfied" />
                                      <Label htmlFor="satisfied" className="flex items-center gap-2 cursor-pointer">
                                        <Meh className="h-4 w-4 text-yellow-600" />
                                        Satisfied
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="unsatisfied" id="unsatisfied" />
                                      <Label htmlFor="unsatisfied" className="flex items-center gap-2 cursor-pointer">
                                        <Frown className="h-4 w-4 text-red-600" />
                                        Unsatisfied
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="anonymous"
                                    checked={formData.anonymous}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, anonymous: checked as boolean }))}
                                  />
                                  <Label htmlFor="anonymous" className="text-sm">
                                    Submit this feedback anonymously
                                  </Label>
                                </div>

                                <div className="flex gap-4">
                                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                                    {isSubmitting ? (
                                      <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                        Submitting...
                                      </>
                                    ) : (
                                      <>
                                        <Send className="h-4 w-4 mr-2" />
                                        Submit Feedback
                                      </>
                                    )}
                                  </Button>
                                  <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={() => setSelectedCategory('')}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </form>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}
                    </>
                  )}
                </TabsContent>

                {/* Browse Feedback Tab */}
                <TabsContent value="browse" className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="heading-lg mb-4">Community Feedback</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      See what other users are saying and vote on feedback that matters to you.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {recentFeedback.map((feedback, index) => {
                      const Icon = getCategoryIcon(feedback.type);
                      return (
                        <motion.div
                          key={feedback.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Card className="hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4 flex-1">
                                  <Icon className="h-6 w-6 text-primary mt-1" />
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-2">{feedback.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                      <span>by {feedback.author}</span>
                                      <span>{feedback.timeAgo}</span>
                                      <Badge className={getStatusColor(feedback.status)}>
                                        {feedback.status.replace('-', ' ')}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    {feedback.votes}
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="text-center">
                    <Button variant="outline" size="lg">
                      Load More Feedback
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="py-16 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="heading-md mb-4">Need Direct Support?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    For urgent issues or detailed discussions, reach out to our support team directly. 
                    We're here to help you succeed with WordCraft.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                      <Link href="/contact">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact Support
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/community">
                        <Users className="h-4 w-4 mr-2" />
                        Join Community
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

export default FeedbackPage;