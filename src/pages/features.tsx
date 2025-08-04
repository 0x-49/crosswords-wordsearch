import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { 
  Rocket, 
  BookOpen, 
  Heart, 
  Puzzle,
  Globe,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Settings,
  Download,
  Palette,
  Users,
  BarChart3,
  FileText,
  Smartphone,
  Monitor,
  Tablet
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

export default function Features() {
  const mainFeatures = [
    {
      icon: <Rocket className="h-12 w-12" />,
      title: "AI-Powered Generation",
      description: "Advanced algorithms create perfectly balanced puzzles with optimal word placement and engaging difficulty curves.",
      benefits: [
        "Intelligent word placement optimization",
        "Automatic difficulty balancing",
        "Quality assurance algorithms",
        "Instant puzzle generation"
      ],
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950"
    },
    {
      icon: <BookOpen className="h-12 w-12" />,
      title: "KDP-Ready Export",
      description: "One-click export to print-ready PDFs with professional formatting that meets all Amazon KDP requirements.",
      benefits: [
        "Professional PDF formatting",
        "Amazon KDP compliance",
        "High-resolution output",
        "Batch export capabilities"
      ],
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Accessibility First",
      description: "Large print options, high contrast themes, and inclusive design features for all puzzle enthusiasts.",
      benefits: [
        "Large print formatting",
        "High contrast themes",
        "Screen reader compatibility",
        "Senior-friendly design"
      ],
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950"
    },
    {
      icon: <Puzzle className="h-12 w-12" />,
      title: "Smart Algorithms",
      description: "Intelligent word placement ensures every puzzle is solvable, engaging, and perfectly balanced for maximum enjoyment.",
      benefits: [
        "100% solvable puzzles",
        "Optimal word distribution",
        "Difficulty progression",
        "Pattern recognition"
      ],
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      icon: <Globe className="h-12 w-12" />,
      title: "100+ Themes",
      description: "From Animals to Science, Sports to History - comprehensive theme library with regular updates and seasonal content.",
      benefits: [
        "100+ unique themes",
        "Regular content updates",
        "Seasonal collections",
        "Custom theme creation"
      ],
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950"
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Quality Guaranteed",
      description: "Every puzzle undergoes automated quality checks to ensure professional standards and customer satisfaction.",
      benefits: [
        "Automated quality checks",
        "Professional standards",
        "Error detection",
        "Consistency validation"
      ],
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950"
    }
  ];

  const additionalFeatures = [
    {
      category: "Customization",
      icon: <Settings className="h-6 w-6" />,
      features: [
        "Grid size customization (10x10 to 25x25)",
        "Font selection and sizing",
        "Color scheme customization",
        "Layout template options",
        "Margin and spacing controls",
        "Header and footer customization"
      ]
    },
    {
      category: "Export Options",
      icon: <Download className="h-6 w-6" />,
      features: [
        "High-resolution PDF export",
        "Multiple format support",
        "Batch processing",
        "Print-ready formatting",
        "Digital-friendly layouts",
        "Solution sheet generation"
      ]
    },
    {
      category: "Design Tools",
      icon: <Palette className="h-6 w-6" />,
      features: [
        "Professional templates",
        "Brand customization",
        "Logo integration",
        "Color palette management",
        "Typography controls",
        "Visual style presets"
      ]
    },
    {
      category: "Analytics",
      icon: <BarChart3 className="h-6 w-6" />,
      features: [
        "Usage statistics",
        "Performance metrics",
        "Popular themes tracking",
        "Export analytics",
        "User engagement data",
        "Success rate monitoring"
      ]
    }
  ];

  const deviceFeatures = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Desktop Optimized",
      description: "Full-featured experience with advanced editing tools and batch processing capabilities.",
      color: "text-blue-600"
    },
    {
      icon: <Tablet className="h-8 w-8" />,
      title: "Tablet Friendly",
      description: "Touch-optimized interface perfect for on-the-go puzzle creation and editing.",
      color: "text-green-600"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Ready",
      description: "Create and manage puzzles anywhere with our responsive mobile interface.",
      color: "text-purple-600"
    }
  ];

  return (
    <Layout
      title="Features - WordCraft Puzzle Generator"
      description="Discover all the powerful features that make WordCraft the best puzzle book creation platform. AI-powered generation, KDP-ready exports, and more."
      keywords="word search features, crossword generator tools, puzzle book creation features, KDP publishing tools, AI puzzle generation"
    >
      <div className="bg-background">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
          <div className="container-fluid">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Badge variant="secondary" className="mb-6 text-sm px-6 py-3 rounded-full shadow-soft">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Powerful Features
                </Badge>
                <h1 className="heading-xl text-gradient mb-8">
                  Everything You Need to Create Amazing Puzzle Books
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                  Discover the comprehensive suite of tools and features that make WordCraft the most powerful puzzle book creation platform available.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/signup">
                    <Button size="xl" variant="gradient" className="group">
                      Try All Features Free
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/book-library">
                    <Button variant="outline" size="xl">
                      See Examples
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Main Features Grid */}
        <section className="section-padding">
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
                Core Features
              </Badge>
              <h2 className="heading-lg mb-6">
                Built for Professional Publishers
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every feature is designed with one goal in mind: helping you create puzzle books that readers love and that generate consistent income.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {mainFeatures.map((feature, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="card-interactive h-full group">
                    <CardContent className="p-8">
                      <div className={`${feature.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <div className={feature.color}>
                          {feature.icon}
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-4">{feature.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed mb-6">
                        {feature.description}
                      </CardDescription>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Feature Categories */}
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
                <Zap className="w-4 h-4 mr-2" />
                Advanced Capabilities
              </Badge>
              <h2 className="heading-lg mb-6">
                Comprehensive Tool Suite
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our extensive collection of tools and features organized by category.
              </p>
            </motion.div>

            <Tabs defaultValue="customization" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-4 mb-12">
                <TabsTrigger value="customization">Customization</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              {additionalFeatures.map((category) => (
                <TabsContent key={category.category.toLowerCase()} value={category.category.toLowerCase()}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="card-elevated">
                      <CardHeader className="text-center pb-8">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <div className="text-primary">
                            {category.icon}
                          </div>
                        </div>
                        <CardTitle className="text-2xl">{category.category} Features</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {category.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                              <span className="text-sm font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Device Compatibility */}
        <section className="section-padding">
          <div className="container-fluid">
            <motion.div 
              className="text-center mb-20"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Badge variant="outline" className="mb-6 px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Cross-Platform
              </Badge>
              <h2 className="heading-lg mb-6">
                Works Everywhere You Do
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Create puzzles on any device with our fully responsive platform that adapts to your workflow.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {deviceFeatures.map((device, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="card-interactive text-center group">
                    <CardContent className="p-8">
                      <div className={`${device.color} mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {device.icon}
                      </div>
                      <CardTitle className="text-xl mb-4">{device.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {device.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Feature Comparison */}
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
                <FileText className="w-4 h-4 mr-2" />
                Feature Comparison
              </Badge>
              <h2 className="heading-lg mb-6">
                See What Sets Us Apart
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Compare WordCraft with other puzzle creation tools and see why we're the preferred choice.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="card-elevated overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-6 font-semibold">Feature</th>
                        <th className="text-center p-6 font-semibold text-primary">WordCraft</th>
                        <th className="text-center p-6 font-semibold text-muted-foreground">Competitor A</th>
                        <th className="text-center p-6 font-semibold text-muted-foreground">Competitor B</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["AI-Powered Generation", true, false, false],
                        ["100+ Themes", true, true, false],
                        ["KDP-Ready Export", true, true, true],
                        ["Accessibility Features", true, false, false],
                        ["Batch Processing", true, false, true],
                        ["Custom Branding", true, true, false],
                        ["Mobile Responsive", true, false, true],
                        ["Quality Assurance", true, false, false],
                        ["24/7 Support", true, false, true],
                        ["Free Plan Available", true, false, false]
                      ].map(([feature, wordcraft, compA, compB], index) => (
                        <tr key={index} className="border-t border-border/50">
                          <td className="p-6 font-medium">{feature as string}</td>
                          <td className="p-6 text-center">
                            {wordcraft ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                          <td className="p-6 text-center">
                            {compA ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                          <td className="p-6 text-center">
                            {compB ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
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
              <Card className="card-elevated p-12">
                <Badge variant="secondary" className="mb-6 px-4 py-2">
                  <Rocket className="w-4 h-4 mr-2" />
                  Ready to Get Started?
                </Badge>
                <h2 className="heading-lg mb-6">
                  Experience All Features Free
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Try every feature risk-free with our generous free plan. No credit card required, no time limits.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
                  <Link href="/signup">
                    <Button size="xl" variant="gradient" className="group">
                      Start Creating Free
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline" size="xl">
                      View Pricing
                    </Button>
                  </Link>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>All features included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Instant access</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}