import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Download, 
  ExternalLink, 
  Calendar,
  Users,
  Award,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Mail,
  Phone,
  Globe,
  Building,
  Newspaper,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const pressReleases = [
  {
    date: '2024-01-15',
    title: 'WordCraft Launches AI-Powered Puzzle Book Generator for KDP Publishers',
    description: 'Revolutionary platform enables creators to generate professional puzzle books in minutes, democratizing the $2.8B puzzle book market.',
    link: '#',
    featured: true
  },
  {
    date: '2023-12-10',
    title: 'WordCraft Raises $2.5M Seed Round to Expand Puzzle Creation Platform',
    description: 'Funding will accelerate product development and support growing community of 50,000+ puzzle creators worldwide.',
    link: '#',
    featured: false
  },
  {
    date: '2023-11-22',
    title: 'WordCraft Partners with Amazon KDP to Streamline Puzzle Book Publishing',
    description: 'New integration allows one-click publishing directly to Amazon marketplace, reducing time-to-market by 90%.',
    link: '#',
    featured: false
  },
  {
    date: '2023-10-05',
    title: 'WordCraft Wins "Best Publishing Tool" at TechCrunch Disrupt 2023',
    description: 'Recognition highlights platform\'s impact on democratizing content creation and empowering independent publishers.',
    link: '#',
    featured: false
  }
];

const mediaKit = [
  {
    title: 'Company Logo Pack',
    description: 'High-resolution logos in various formats (PNG, SVG, EPS)',
    size: '2.3 MB',
    type: 'ZIP',
    icon: ImageIcon
  },
  {
    title: 'Product Screenshots',
    description: 'Dashboard, puzzle creation, and book preview screenshots',
    size: '15.7 MB',
    type: 'ZIP',
    icon: Camera
  },
  {
    title: 'Company Fact Sheet',
    description: 'Key statistics, milestones, and company information',
    size: '245 KB',
    type: 'PDF',
    icon: FileText
  },
  {
    title: 'Executive Bios',
    description: 'Leadership team biographies and headshots',
    size: '1.8 MB',
    type: 'ZIP',
    icon: Users
  }
];

const keyStats = [
  { label: 'Active Users', value: '50,000+', icon: Users },
  { label: 'Puzzle Books Created', value: '125,000+', icon: FileText },
  { label: 'Countries Served', value: '45+', icon: Globe },
  { label: 'Customer Satisfaction', value: '4.9/5', icon: Award }
];

const awards = [
  {
    year: '2023',
    title: 'Best Publishing Tool',
    organization: 'TechCrunch Disrupt',
    description: 'Recognized for innovation in content creation technology'
  },
  {
    year: '2023',
    title: 'Top 50 EdTech Startups',
    organization: 'EdTech Breakthrough',
    description: 'Selected for impact on educational content creation'
  },
  {
    year: '2023',
    title: 'Rising Star Award',
    organization: 'Publishing Innovation Awards',
    description: 'Honored for disrupting traditional publishing workflows'
  }
];

const PressPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Press Kit & Media Resources - WordCraft</title>
        <meta name="description" content="Press kit, media resources, company information, and news about WordCraft - the leading AI-powered puzzle book generator for publishers." />
        <meta name="keywords" content="press kit, media, news, WordCraft, puzzle books, publishing, AI, KDP, Amazon" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Press Kit & Media Resources - WordCraft" />
        <meta property="og:description" content="Press kit, media resources, company information, and news about WordCraft - the leading AI-powered puzzle book generator for publishers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordcraft.com/press" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Press Kit & Media Resources - WordCraft" />
        <meta name="twitter:description" content="Press kit, media resources, company information, and news about WordCraft - the leading AI-powered puzzle book generator for publishers." />
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
                <Newspaper className="h-16 w-16 text-primary mx-auto mb-6" />
                <h1 className="heading-xl mb-6">
                  Press Kit & Media Resources
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Everything you need to know about WordCraft, including company information, 
                  press releases, media assets, and contact details for journalists and media professionals.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Key Statistics */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {keyStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="text-center">
                        <CardContent className="p-6">
                          <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
                          <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Company Overview */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="heading-lg mb-6">About WordCraft</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    WordCraft is the leading AI-powered puzzle book generator that empowers creators, 
                    educators, and publishers to create professional-quality word search and crossword 
                    puzzle books in minutes, not hours.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Founded in 2023, WordCraft has revolutionized the $2.8 billion puzzle book market 
                    by democratizing content creation through advanced AI algorithms and user-friendly design. 
                    Our platform serves over 50,000 active users across 45 countries, generating more than 
                    125,000 puzzle books to date.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Badge variant="secondary" className="px-3 py-1">
                      <Building className="h-3 w-3 mr-1" />
                      Founded 2023
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                      <Users className="h-3 w-3 mr-1" />
                      50,000+ Users
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                      <Globe className="h-3 w-3 mr-1" />
                      45+ Countries
                    </Badge>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Media Contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="font-medium">Sarah Johnson</div>
                        <div className="text-sm text-muted-foreground">Head of Communications</div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4" />
                          <a href="mailto:press@wordcraft.com" className="text-primary hover:underline">
                            press@wordcraft.com
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4" />
                          <a href="tel:+1-555-0199" className="text-primary hover:underline">
                            +1 (555) 019-9876
                          </a>
                        </div>
                      </div>
                      <Button className="w-full" asChild>
                        <a href="mailto:press@wordcraft.com">
                          Contact Media Team
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Media Kit Downloads */}
          <section className="py-12 px-4 bg-gradient-to-b from-secondary/20 to-background">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Media Kit Downloads</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  High-quality assets, logos, screenshots, and company information for media use.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {mediaKit.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Icon className="h-8 w-8 text-primary" />
                            <Badge variant="outline">{item.type}</Badge>
                          </div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{item.size}</span>
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center">
                <Button size="lg" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Complete Media Kit
                </Button>
              </div>
            </div>
          </section>

          {/* Press Releases */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Latest News & Press Releases</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Stay updated with WordCraft's latest announcements, partnerships, and milestones.
                </p>
              </div>

              <div className="space-y-6">
                {pressReleases.map((release, index) => (
                  <motion.div
                    key={release.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className={`hover:shadow-lg transition-all duration-300 ${release.featured ? 'border-primary/50 bg-primary/5' : ''}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(release.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          {release.featured && (
                            <Badge variant="default">Featured</Badge>
                          )}
                        </div>
                        <CardTitle className="hover:text-primary transition-colors">
                          {release.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {release.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={release.link}>
                            Read Full Release
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Awards & Recognition */}
          <section className="py-12 px-4 bg-gradient-to-b from-background to-secondary/20">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Awards & Recognition</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  WordCraft has been recognized by leading industry organizations for innovation and impact.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {awards.map((award, index) => (
                  <motion.div
                    key={award.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="text-center h-full">
                      <CardHeader>
                        <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                        <Badge variant="outline" className="mb-2">{award.year}</Badge>
                        <CardTitle className="text-lg">{award.title}</CardTitle>
                        <CardDescription className="font-medium text-primary">
                          {award.organization}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {award.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="py-16 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="heading-md mb-4">Need More Information?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Our media team is available to provide additional information, arrange interviews, 
                    or answer any questions about WordCraft and our mission.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                      <a href="mailto:press@wordcraft.com">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Press Team
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/about">
                        <Building className="h-4 w-4 mr-2" />
                        Learn More About Us
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

export default PressPage;