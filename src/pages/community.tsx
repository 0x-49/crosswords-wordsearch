import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Heart,
  Star,
  Trophy,
  BookOpen,
  Lightbulb,
  Share2,
  Calendar,
  ArrowRight,
  ExternalLink,
  Github,
  Twitter,
  Facebook,
  Youtube,
  Zap,
  Award,
  TrendingUp,
  UserPlus,
  MessageSquare,
  ThumbsUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const communityStats = [
  { label: 'Active Members', value: '15,000+', icon: Users, color: 'text-blue-600' },
  { label: 'Books Shared', value: '8,500+', icon: BookOpen, color: 'text-green-600' },
  { label: 'Tips Exchanged', value: '25,000+', icon: Lightbulb, color: 'text-yellow-600' },
  { label: 'Success Stories', value: '1,200+', icon: Trophy, color: 'text-purple-600' }
];

const featuredMembers = [
  {
    name: 'Sarah Chen',
    role: 'Top Contributor',
    avatar: 'SC',
    books: 47,
    followers: 1200,
    specialty: 'Educational Puzzles',
    badge: 'Expert',
    description: 'Creates amazing educational puzzle books for K-12 students.'
  },
  {
    name: 'Mike Rodriguez',
    role: 'Community Moderator',
    avatar: 'MR',
    books: 32,
    followers: 890,
    specialty: 'Large Print Puzzles',
    badge: 'Moderator',
    description: 'Specializes in accessibility-focused puzzle design for seniors.'
  },
  {
    name: 'Emma Thompson',
    role: 'Rising Star',
    avatar: 'ET',
    books: 23,
    followers: 650,
    specialty: 'Themed Collections',
    badge: 'Rising Star',
    description: 'Known for creative themed puzzle collections and seasonal content.'
  }
];

const recentDiscussions = [
  {
    title: 'Best practices for KDP keyword optimization',
    author: 'Alex Johnson',
    replies: 24,
    likes: 67,
    category: 'Publishing Tips',
    timeAgo: '2 hours ago',
    trending: true
  },
  {
    title: 'How to create puzzles for different age groups',
    author: 'Maria Garcia',
    replies: 18,
    likes: 45,
    category: 'Design Tips',
    timeAgo: '4 hours ago',
    trending: false
  },
  {
    title: 'Seasonal puzzle themes that sell well',
    author: 'David Kim',
    replies: 31,
    likes: 89,
    category: 'Marketing',
    timeAgo: '6 hours ago',
    trending: true
  },
  {
    title: 'WordCraft feature request: Custom grid shapes',
    author: 'Lisa Brown',
    replies: 12,
    likes: 28,
    category: 'Feature Requests',
    timeAgo: '8 hours ago',
    trending: false
  }
];

const upcomingEvents = [
  {
    title: 'Monthly Community Showcase',
    date: '2024-02-15',
    time: '2:00 PM EST',
    type: 'Virtual Event',
    description: 'Share your latest puzzle books and get feedback from the community.',
    attendees: 156
  },
  {
    title: 'KDP Publishing Workshop',
    date: '2024-02-22',
    time: '7:00 PM EST',
    type: 'Workshop',
    description: 'Learn advanced KDP publishing strategies from successful creators.',
    attendees: 89
  },
  {
    title: 'Puzzle Design Challenge',
    date: '2024-03-01',
    time: 'All Day',
    type: 'Challenge',
    description: 'Monthly themed puzzle creation challenge with prizes for winners.',
    attendees: 234
  }
];

const socialChannels = [
  {
    name: 'Discord Server',
    description: 'Real-time chat, voice channels, and instant help',
    members: '8,500+',
    icon: MessageSquare,
    link: 'https://discord.gg/wordcraft',
    color: 'text-indigo-600'
  },
  {
    name: 'Facebook Group',
    description: 'Share your work and connect with fellow creators',
    members: '12,000+',
    icon: Facebook,
    link: 'https://facebook.com/groups/wordcraft',
    color: 'text-blue-600'
  },
  {
    name: 'YouTube Channel',
    description: 'Tutorials, tips, and community highlights',
    members: '25,000+',
    icon: Youtube,
    link: 'https://youtube.com/wordcraft',
    color: 'text-red-600'
  },
  {
    name: 'Twitter Community',
    description: 'Quick tips, updates, and daily inspiration',
    members: '18,000+',
    icon: Twitter,
    link: 'https://twitter.com/wordcraft',
    color: 'text-sky-600'
  }
];

const CommunityPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Community - WordCraft</title>
        <meta name="description" content="Join the WordCraft community of puzzle creators, publishers, and enthusiasts. Share tips, get feedback, and connect with fellow creators worldwide." />
        <meta name="keywords" content="WordCraft community, puzzle creators, KDP publishing, word search community, crossword makers, puzzle book creators" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Community - WordCraft" />
        <meta property="og:description" content="Join the WordCraft community of puzzle creators, publishers, and enthusiasts. Share tips, get feedback, and connect with fellow creators worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordcraft.com/community" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Community - WordCraft" />
        <meta name="twitter:description" content="Join the WordCraft community of puzzle creators, publishers, and enthusiasts. Share tips, get feedback, and connect with fellow creators worldwide." />
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
                <Users className="h-16 w-16 text-primary mx-auto mb-6" />
                <h1 className="heading-xl mb-6">
                  Join the WordCraft Community
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Connect with thousands of puzzle creators, share your work, learn from experts, 
                  and grow your publishing business together with fellow WordCraft enthusiasts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <a href="https://discord.gg/wordcraft" target="_blank" rel="noopener noreferrer">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Join Our Discord
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/signup">
                      <Zap className="h-4 w-4 mr-2" />
                      Start Creating
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Community Stats */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {communityStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="text-center hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <Icon className={`h-8 w-8 mx-auto mb-4 ${stat.color}`} />
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

          {/* Community Tabs */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <Tabs defaultValue="discussions" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  <TabsTrigger value="members">Featured Members</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="channels">Social Channels</TabsTrigger>
                </TabsList>

                {/* Discussions Tab */}
                <TabsContent value="discussions" className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="heading-lg mb-4">Recent Discussions</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Join the conversation and learn from fellow creators in our active community forums.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {recentDiscussions.map((discussion, index) => (
                      <motion.div
                        key={discussion.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline">{discussion.category}</Badge>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                {discussion.trending && (
                                  <Badge variant="secondary" className="text-xs">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Trending
                                  </Badge>
                                )}
                                <span>{discussion.timeAgo}</span>
                              </div>
                            </div>
                            <CardTitle className="hover:text-primary transition-colors">
                              {discussion.title}
                            </CardTitle>
                            <CardDescription>
                              Started by {discussion.author}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-4 w-4" />
                                  {discussion.replies} replies
                                </div>
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="h-4 w-4" />
                                  {discussion.likes} likes
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                Join Discussion
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button size="lg" asChild>
                      <a href="https://discord.gg/wordcraft" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        View All Discussions
                      </a>
                    </Button>
                  </div>
                </TabsContent>

                {/* Featured Members Tab */}
                <TabsContent value="members" className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="heading-lg mb-4">Featured Community Members</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Meet some of our most active and helpful community members who inspire and support fellow creators.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredMembers.map((member, index) => (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card className="text-center hover:shadow-lg transition-all duration-300">
                          <CardHeader>
                            <Avatar className="h-20 w-20 mx-auto mb-4">
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} />
                              <AvatarFallback>{member.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <CardTitle className="text-lg">{member.name}</CardTitle>
                              <Badge variant={member.badge === 'Expert' ? 'default' : member.badge === 'Moderator' ? 'secondary' : 'outline'}>
                                {member.badge}
                              </Badge>
                            </div>
                            <CardDescription className="text-primary font-medium">
                              {member.role}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                              {member.description}
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="font-semibold text-primary">{member.books}</div>
                                <div className="text-muted-foreground">Books Created</div>
                              </div>
                              <div>
                                <div className="font-semibold text-primary">{member.followers}</div>
                                <div className="text-muted-foreground">Followers</div>
                              </div>
                            </div>
                            <Badge variant="outline" className="mt-4">
                              {member.specialty}
                            </Badge>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Events Tab */}
                <TabsContent value="events" className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="heading-lg mb-4">Upcoming Community Events</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Join our regular events to learn, share, and connect with the WordCraft community.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {upcomingEvents.map((event, index) => (
                      <motion.div
                        key={event.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-all duration-300">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline">{event.type}</Badge>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-4 w-4" />
                                {event.attendees} attending
                              </div>
                            </div>
                            <CardTitle className="text-xl">{event.title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(event.date).toLocaleDateString('en-US', { 
                                  weekday: 'long',
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </div>
                              <span>{event.time}</span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">
                              {event.description}
                            </p>
                            <Button>
                              <Calendar className="h-4 w-4 mr-2" />
                              Register for Event
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Social Channels Tab */}
                <TabsContent value="channels" className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="heading-lg mb-4">Connect on Social Channels</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Follow us across different platforms to stay updated and engage with the community in your preferred way.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {socialChannels.map((channel, index) => {
                      const Icon = channel.icon;
                      return (
                        <motion.div
                          key={channel.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Card className="hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                              <div className="flex items-center gap-4">
                                <Icon className={`h-10 w-10 ${channel.color}`} />
                                <div>
                                  <CardTitle>{channel.name}</CardTitle>
                                  <CardDescription className="font-medium text-primary">
                                    {channel.members} members
                                  </CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground mb-4">
                                {channel.description}
                              </p>
                              <Button asChild className="w-full">
                                <a href={channel.link} target="_blank" rel="noopener noreferrer">
                                  Join Channel
                                  <ExternalLink className="h-4 w-4 ml-2" />
                                </a>
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* Community Guidelines CTA */}
          <section className="py-16 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="heading-md mb-4">Community Guidelines</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Our community thrives on respect, helpfulness, and creativity. Please read our 
                    community guidelines to ensure everyone has a positive experience.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                      <Link href="/help">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read Guidelines
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/contact">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Report an Issue
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

export default CommunityPage;