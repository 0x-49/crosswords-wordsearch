import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  Heart,
  Zap,
  Globe,
  Coffee,
  Laptop,
  ArrowRight,
  CheckCircle,
  Star,
  Target,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  posted: string;
  urgent: boolean;
}

const jobListings: JobListing[] = [
  {
    id: 'senior-fullstack-dev',
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    salary: '$120k - $160k',
    description: 'Join our engineering team to build and scale WordCraft\'s puzzle generation platform. You\'ll work on both frontend React applications and backend Node.js services.',
    requirements: [
      '5+ years of full-stack development experience',
      'Expert knowledge of React, TypeScript, and Node.js',
      'Experience with PostgreSQL and cloud platforms (AWS/GCP)',
      'Strong understanding of puzzle algorithms and game mechanics',
      'Experience with PDF generation and print optimization'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Flexible work arrangements and unlimited PTO',
      'Professional development budget',
      'Top-tier equipment and home office setup'
    ],
    posted: '2024-01-15',
    urgent: true
  },
  {
    id: 'product-designer',
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    salary: '$100k - $140k',
    description: 'Lead the design of intuitive puzzle creation tools and user experiences. You\'ll shape how millions of puzzle enthusiasts interact with our platform.',
    requirements: [
      '4+ years of product design experience',
      'Proficiency in Figma, Sketch, or similar design tools',
      'Experience designing complex web applications',
      'Understanding of accessibility and inclusive design',
      'Portfolio demonstrating user-centered design process'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Flexible work arrangements and unlimited PTO',
      'Design conference and workshop budget',
      'Latest design tools and equipment'
    ],
    posted: '2024-01-20',
    urgent: false
  },
  {
    id: 'content-strategist',
    title: 'Content Strategist',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    salary: '$70k - $95k',
    description: 'Develop content strategies to engage puzzle creators and publishers. You\'ll create educational content, manage our blog, and build community.',
    requirements: [
      '3+ years of content marketing experience',
      'Excellent writing and communication skills',
      'Experience with SEO and content optimization',
      'Understanding of publishing and creator economy',
      'Social media and community management experience'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Flexible work arrangements and unlimited PTO',
      'Marketing conference and training budget',
      'Content creation tools and resources'
    ],
    posted: '2024-01-25',
    urgent: false
  },
  {
    id: 'customer-success',
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote',
    type: 'Full-time',
    salary: '$60k - $80k',
    description: 'Help our users succeed with WordCraft by providing exceptional support, creating educational resources, and gathering product feedback.',
    requirements: [
      '2+ years of customer success or support experience',
      'Strong problem-solving and communication skills',
      'Experience with help desk software and CRM tools',
      'Understanding of SaaS products and user onboarding',
      'Passion for helping creators and publishers succeed'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Flexible work arrangements and unlimited PTO',
      'Customer success training and certification',
      'Direct impact on user satisfaction and retention'
    ],
    posted: '2024-02-01',
    urgent: false
  }
];

const benefits = [
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health, dental, and vision insurance plus wellness stipend'
  },
  {
    icon: Laptop,
    title: 'Remote-First',
    description: 'Work from anywhere with flexible hours and home office setup budget'
  },
  {
    icon: Zap,
    title: 'Growth & Learning',
    description: 'Professional development budget and conference attendance support'
  },
  {
    icon: Coffee,
    title: 'Work-Life Balance',
    description: 'Unlimited PTO, mental health days, and flexible scheduling'
  },
  {
    icon: DollarSign,
    title: 'Competitive Package',
    description: 'Market-rate salaries, equity participation, and performance bonuses'
  },
  {
    icon: Users,
    title: 'Amazing Team',
    description: 'Collaborative culture with talented, passionate, and supportive colleagues'
  }
];

const values = [
  {
    icon: Target,
    title: 'User-Centric',
    description: 'We put our users first in every decision we make'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We constantly push boundaries to create better solutions'
  },
  {
    icon: Heart,
    title: 'Empathy',
    description: 'We understand and care about our users\' needs and challenges'
  },
  {
    icon: Star,
    title: 'Excellence',
    description: 'We strive for quality in everything we build and deliver'
  }
];

const CareersPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Careers - Join the WordCraft Team</title>
        <meta name="description" content="Join WordCraft and help build the future of puzzle book creation. Explore open positions in engineering, design, marketing, and customer success." />
        <meta name="keywords" content="careers, jobs, WordCraft, engineering, design, marketing, remote work, puzzle technology" />
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
                <Briefcase className="h-16 w-16 text-primary mx-auto mb-6" />
                <h1 className="heading-xl mb-6">
                  Join the WordCraft Team
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Help us revolutionize puzzle book creation and empower publishers worldwide. 
                  Build meaningful products that bring joy to millions of puzzle enthusiasts.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <a href="#open-positions">
                      View Open Positions
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/about">
                      Learn About Us
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Company Stats */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                    <p className="text-sm text-muted-foreground">Books Created</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">15+</div>
                    <p className="text-sm text-muted-foreground">Team Members</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">100%</div>
                    <p className="text-sm text-muted-foreground">Remote-First</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
                    <p className="text-sm text-muted-foreground">Employee Rating</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="py-16 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Our Values</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  These core values guide everything we do and shape our company culture.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="text-center h-full">
                        <CardContent className="p-6">
                          <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                          <h3 className="font-semibold mb-2">{value.title}</h3>
                          <p className="text-sm text-muted-foreground">{value.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-16 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Why Work at WordCraft?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We offer competitive benefits and a supportive environment where you can do your best work.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                            <div>
                              <h3 className="font-semibold mb-2">{benefit.title}</h3>
                              <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section id="open-positions" className="py-16 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Open Positions</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join our growing team and help shape the future of puzzle book creation.
                </p>
              </div>

              <div className="space-y-6">
                {jobListings.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-xl">{job.title}</CardTitle>
                              {job.urgent && (
                                <Badge variant="destructive" className="text-xs">
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {job.department}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {job.type}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {job.salary}
                              </div>
                            </div>
                          </div>
                          <Button>
                            Apply Now
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-6">{job.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">Requirements</h4>
                            <ul className="space-y-2">
                              {job.requirements.map((req, reqIndex) => (
                                <li key={reqIndex} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-muted-foreground">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Benefits</h4>
                            <ul className="space-y-2">
                              {job.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="flex items-start gap-2 text-sm">
                                  <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span className="text-muted-foreground">{benefit}</span>
                                </li>
                              ))}
                              {job.benefits.length > 3 && (
                                <li className="text-sm text-muted-foreground">
                                  + {job.benefits.length - 3} more benefits
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Application Process */}
          <section className="py-16 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Our Hiring Process</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We've designed a straightforward process to help us get to know each other better.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Application</h3>
                  <p className="text-sm text-muted-foreground">
                    Submit your application with resume and cover letter
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Phone Screen</h3>
                  <p className="text-sm text-muted-foreground">
                    Brief call to discuss your background and interests
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Technical Interview</h3>
                  <p className="text-sm text-muted-foreground">
                    Role-specific interview to assess skills and fit
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    4
                  </div>
                  <h3 className="font-semibold mb-2">Final Interview</h3>
                  <p className="text-sm text-muted-foreground">
                    Meet the team and discuss culture fit
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="heading-md mb-4">Don't See the Right Role?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    We're always looking for talented people to join our team. 
                    Send us your resume and tell us how you'd like to contribute to WordCraft.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                      <a href="mailto:careers@wordcraft.com">
                        Send Us Your Resume
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/contact">
                        Get in Touch
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

export default CareersPage;