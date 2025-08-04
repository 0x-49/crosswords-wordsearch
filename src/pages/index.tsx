import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { 
  BookOpen, 
  Puzzle, 
  Users, 
  Star, 
  CheckCircle, 
  Zap,
  Target,
  Heart,
  Award,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Play,
  Shield,
  Globe,
  Rocket
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleOnHover = {
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
  whileTap: { scale: 0.95 }
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Home() {
  return (
    <Layout
      title="WordCraft - Professional Word Search Book Generator"
      description="Create stunning, personalized word search puzzle books for KDP publishing. Modern design, AI-powered generation, and professional results."
      keywords="word search generator, crossword puzzle maker, KDP publishing, Amazon book publishing, puzzle book creator, word games, elderly puzzles"
    >
      <div className="bg-background overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 animated-gradient opacity-5" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-info/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Hero Section */}
        <section className="relative section-padding">
          <div className="container-fluid">
            <motion.div 
              className="text-center max-w-6xl mx-auto"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-8">
                <Badge variant="secondary" className="mb-6 text-sm px-6 py-3 rounded-full shadow-soft">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Professional KDP Publishing Platform
                </Badge>
                <h1 className="heading-xl text-gradient mb-8">
                  WordCraft
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto">
                  Transform your publishing dreams into reality with our AI-powered word search generator. 
                  Create stunning, professional puzzle books that captivate readers and drive sales.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link href="/signup">
                  <motion.div {...scaleOnHover}>
                    <Button size="xl" variant="gradient" className="group">
                      Start Creating Free
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/login">
                  <motion.div {...scaleOnHover}>
                    <Button variant="glass" size="xl" className="group">
                      <Play className="mr-2 h-5 w-5" />
                      Watch Demo
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-intense">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center"
                    alt="WordCraft Dashboard Preview - AI-Powered Puzzle Generation"
                    className="w-full h-auto max-w-5xl mx-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                </div>
                <motion.div 
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-strong"
                  variants={floatingAnimation}
                  animate="animate"
                >
                  ✨ AI-Powered
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
          <div className="container-fluid">
            <motion.div 
              className="text-center mb-20"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Badge variant="outline" className="mb-6 px-4 py-2">
                <Target className="w-4 h-4 mr-2" />
                Why Choose WordCraft
              </Badge>
              <h2 className="heading-lg mb-6">
                Everything You Need for Publishing Success
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Built by publishers, for publishers. Every feature is designed to maximize your book's appeal and profitability.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                {
                  icon: <Rocket className="h-10 w-10" />,
                  title: "AI-Powered Generation",
                  description: "Advanced algorithms create perfectly balanced puzzles with optimal word placement and engaging difficulty curves.",
                  color: "text-purple-600"
                },
                {
                  icon: <BookOpen className="h-10 w-10" />,
                  title: "KDP-Ready Export",
                  description: "One-click export to print-ready PDFs with professional formatting that meets all Amazon KDP requirements.",
                  color: "text-blue-600"
                },
                {
                  icon: <Heart className="h-10 w-10" />,
                  title: "Accessibility First",
                  description: "Large print options, high contrast themes, and inclusive design features for all puzzle enthusiasts.",
                  color: "text-red-600"
                },
                {
                  icon: <Puzzle className="h-10 w-10" />,
                  title: "Smart Algorithms",
                  description: "Intelligent word placement ensures every puzzle is solvable, engaging, and perfectly balanced for maximum enjoyment.",
                  color: "text-green-600"
                },
                {
                  icon: <Globe className="h-10 w-10" />,
                  title: "50+ Themes",
                  description: "From Animals to Science, Sports to History - comprehensive theme library with regular updates and seasonal content.",
                  color: "text-orange-600"
                },
                {
                  icon: <Shield className="h-10 w-10" />,
                  title: "Quality Guaranteed",
                  description: "Every puzzle undergoes automated quality checks to ensure professional standards and customer satisfaction.",
                  color: "text-indigo-600"
                }
              ].map((feature, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="card-interactive h-full group">
                    <CardHeader>
                      <div className={`${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding">
          <div className="container-fluid">
            <motion.div 
              className="grid md:grid-cols-4 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { number: "50,000+", label: "Puzzles Generated", icon: <Puzzle className="h-8 w-8" />, color: "text-purple-600" },
                { number: "25+", label: "Theme Categories", icon: <BookOpen className="h-8 w-8" />, color: "text-blue-600" },
                { number: "4.9★", label: "User Rating", icon: <Star className="h-8 w-8" />, color: "text-yellow-600" },
                { number: "89%", label: "Success Rate", icon: <TrendingUp className="h-8 w-8" />, color: "text-green-600" }
              ].map((stat, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="text-center card-elevated group">
                    <CardContent className="p-8">
                      <div className={`${stat.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {stat.icon}
                      </div>
                      <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                      <div className="text-muted-foreground font-medium">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
          <div className="container-fluid">
            <motion.div 
              className="text-center mb-20"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Badge variant="outline" className="mb-6 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Simple Process
              </Badge>
              <h2 className="heading-lg mb-6">
                From Idea to Published Book in Minutes
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our streamlined workflow gets you from concept to cash flow faster than ever before.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                {
                  step: "01",
                  title: "Choose Your Theme",
                  description: "Select from our extensive library of themes or upload your custom word lists. Set difficulty levels and customize grid sizes to match your target audience.",
                  image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop&crop=center",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  step: "02",
                  title: "AI Generation",
                  description: "Our advanced AI algorithms create professional-quality puzzles with perfect word placement, optimal difficulty curves, and beautiful layouts in seconds.",
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=center",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  step: "03",
                  title: "Publish & Profit",
                  description: "Download your KDP-ready PDF files and publish directly to Amazon. Start earning royalties from day one with our proven publishing strategies.",
                  image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop&crop=center",
                  color: "from-green-500 to-green-600"
                }
              ].map((step, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="card-interactive overflow-hidden">
                    <div className="relative">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-56 object-cover"
                      />
                      <div className={`absolute -top-4 -left-4 bg-gradient-to-r ${step.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold shadow-strong`}>
                        {step.step}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl mb-3">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container-fluid">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="relative">
                <div className="absolute inset-0 gradient-accent opacity-10 rounded-3xl blur-3xl" />
                <Card className="relative card-elevated p-12">
                  <Badge variant="secondary" className="mb-6 px-4 py-2">
                    <Rocket className="w-4 h-4 mr-2" />
                    Ready to Start?
                  </Badge>
                  <h2 className="heading-lg mb-6">
                    Join Thousands of Successful Publishers
                  </h2>
                  <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                    Start creating professional puzzle books today. No experience required, no credit card needed.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
                    <Link href="/signup">
                      <motion.div {...scaleOnHover}>
                        <Button size="xl" variant="gradient" className="group">
                          Start Free Trial
                          <CheckCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                        </Button>
                      </motion.div>
                    </Link>
                    <Link href="/book-library">
                      <motion.div {...scaleOnHover}>
                        <Button variant="outline" size="xl" className="group">
                          Browse Examples
                          <BookOpen className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Free forever plan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>KDP-ready exports</span>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
