import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Ear, 
  Hand,
  Brain,
  Heart,
  Shield,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  ExternalLink,
  Keyboard,
  MousePointer,
  Volume2,
  Type,
  Contrast,
  Zap,
  Users,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const accessibilityFeatures = [
  {
    title: 'Visual Accessibility',
    description: 'High contrast themes, large print options, and screen reader compatibility',
    icon: Eye,
    color: 'text-blue-600',
    features: [
      'High contrast color schemes',
      'Scalable fonts and UI elements',
      'Large print puzzle options',
      'Screen reader compatible markup',
      'Alternative text for all images',
      'Focus indicators for keyboard navigation'
    ]
  },
  {
    title: 'Motor Accessibility',
    description: 'Keyboard navigation, large click targets, and customizable controls',
    icon: Hand,
    color: 'text-green-600',
    features: [
      'Full keyboard navigation support',
      'Large, easy-to-click buttons',
      'Customizable interface layouts',
      'Voice control compatibility',
      'Reduced motion options',
      'Sticky drag and drop functionality'
    ]
  },
  {
    title: 'Cognitive Accessibility',
    description: 'Clear navigation, consistent layouts, and simplified interfaces',
    icon: Brain,
    color: 'text-purple-600',
    features: [
      'Clear, consistent navigation',
      'Simple, intuitive interfaces',
      'Progress indicators and feedback',
      'Error prevention and recovery',
      'Customizable difficulty levels',
      'Step-by-step tutorials'
    ]
  },
  {
    title: 'Hearing Accessibility',
    description: 'Visual feedback, captions, and alternative audio representations',
    icon: Ear,
    color: 'text-orange-600',
    features: [
      'Visual feedback for audio cues',
      'Closed captions for video content',
      'Text alternatives for audio',
      'Vibration feedback options',
      'Visual notification systems',
      'Sign language interpretation support'
    ]
  }
];

const wcagCompliance = [
  {
    level: 'WCAG 2.1 AA',
    status: 'Compliant',
    description: 'Meets international accessibility standards for web content',
    details: [
      'Perceivable content with alternative formats',
      'Operable interface with keyboard support',
      'Understandable information and UI operation',
      'Robust content compatible with assistive technologies'
    ]
  }
];

const assistiveTechnologies = [
  {
    name: 'Screen Readers',
    description: 'JAWS, NVDA, VoiceOver, TalkBack',
    compatibility: 'Full Support',
    icon: Volume2
  },
  {
    name: 'Keyboard Navigation',
    description: 'Tab, arrow keys, and custom shortcuts',
    compatibility: 'Full Support',
    icon: Keyboard
  },
  {
    name: 'Voice Control',
    description: 'Dragon NaturallySpeaking, Voice Control',
    compatibility: 'Compatible',
    icon: MousePointer
  },
  {
    name: 'High Contrast',
    description: 'Windows High Contrast, custom themes',
    compatibility: 'Full Support',
    icon: Contrast
  }
];

const AccessibilityPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Accessibility Statement - WordCraft</title>
        <meta name="description" content="WordCraft's commitment to accessibility. Learn about our features, compliance standards, and ongoing efforts to make puzzle creation accessible to everyone." />
        <meta name="keywords" content="accessibility, WCAG, screen reader, keyboard navigation, inclusive design, disability support, WordCraft" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Accessibility Statement - WordCraft" />
        <meta property="og:description" content="WordCraft's commitment to accessibility. Learn about our features, compliance standards, and ongoing efforts to make puzzle creation accessible to everyone." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordcraft.com/accessibility" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accessibility Statement - WordCraft" />
        <meta name="twitter:description" content="WordCraft's commitment to accessibility. Learn about our features, compliance standards, and ongoing efforts to make puzzle creation accessible to everyone." />
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
                <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
                <h1 className="heading-xl mb-6">
                  Accessibility Statement
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  WordCraft is committed to ensuring digital accessibility for people with disabilities. 
                  We continually improve the user experience for everyone and apply relevant accessibility standards.
                </p>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  WCAG 2.1 AA Compliant
                </Badge>
              </motion.div>
            </div>
          </section>

          {/* Our Commitment */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Our Commitment to Accessibility</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  We believe that puzzle creation should be accessible to everyone, regardless of ability. 
                  Our platform is designed with inclusive principles from the ground up.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {accessibilityFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300">
                        <CardHeader className="text-center">
                          <Icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {feature.features.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* WCAG Compliance */}
          <section className="py-12 px-4 bg-gradient-to-b from-secondary/20 to-background">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Standards Compliance</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  WordCraft conforms to the Web Content Accessibility Guidelines (WCAG) 2.1 at the AA level, 
                  ensuring our platform meets international accessibility standards.
                </p>
              </div>

              {wcagCompliance.map((standard, index) => (
                <motion.div
                  key={standard.level}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="mb-6">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{standard.level}</CardTitle>
                          <CardDescription>{standard.description}</CardDescription>
                        </div>
                        <Badge variant="default" className="bg-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {standard.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {standard.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Assistive Technology Support */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Assistive Technology Support</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  WordCraft is compatible with a wide range of assistive technologies to ensure 
                  everyone can create and enjoy puzzles.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assistiveTechnologies.map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <Icon className="h-8 w-8 text-primary" />
                            <div className="flex-1">
                              <CardTitle>{tech.name}</CardTitle>
                              <CardDescription>{tech.description}</CardDescription>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              {tech.compatibility}
                            </Badge>
                          </div>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Accessibility Features FAQ */}
          <section className="py-12 px-4 bg-gradient-to-b from-background to-secondary/20">
            <div className="container-fluid max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Accessibility Features</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Learn more about specific accessibility features and how to use them effectively.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="keyboard-navigation">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <Keyboard className="h-5 w-5 text-primary" />
                      How do I navigate WordCraft using only a keyboard?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="mb-4">
                      WordCraft supports full keyboard navigation. Use the following keys:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li>• <strong>Tab</strong> - Move forward through interactive elements</li>
                      <li>• <strong>Shift + Tab</strong> - Move backward through interactive elements</li>
                      <li>• <strong>Enter/Space</strong> - Activate buttons and links</li>
                      <li>• <strong>Arrow keys</strong> - Navigate within puzzle grids and menus</li>
                      <li>• <strong>Escape</strong> - Close dialogs and menus</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="screen-readers">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <Volume2 className="h-5 w-5 text-primary" />
                      How well does WordCraft work with screen readers?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="mb-4">
                      WordCraft is fully compatible with popular screen readers including JAWS, NVDA, VoiceOver, and TalkBack. Features include:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li>• Semantic HTML markup for proper content structure</li>
                      <li>• ARIA labels and descriptions for complex UI elements</li>
                      <li>• Alternative text for all images and visual content</li>
                      <li>• Live regions for dynamic content updates</li>
                      <li>• Descriptive puzzle content for word searches and crosswords</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="visual-customization">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <Contrast className="h-5 w-5 text-primary" />
                      Can I customize the visual appearance for better visibility?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="mb-4">
                      Yes! WordCraft offers several visual customization options:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li>• High contrast themes for better visibility</li>
                      <li>• Adjustable font sizes throughout the interface</li>
                      <li>• Large print options for generated puzzles</li>
                      <li>• Color customization for puzzle elements</li>
                      <li>• Reduced motion settings for users sensitive to animations</li>
                      <li>• Dark and light mode options</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="puzzle-accessibility">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <Type className="h-5 w-5 text-primary" />
                      Are the generated puzzles themselves accessible?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="mb-4">
                      Absolutely! Our puzzle generation includes accessibility features:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li>• Large print versions with increased font sizes</li>
                      <li>• High contrast puzzle layouts</li>
                      <li>• Alternative text descriptions of puzzle content</li>
                      <li>• Braille-friendly formatting options</li>
                      <li>• Audio descriptions for complex visual puzzles</li>
                      <li>• Simplified layouts for cognitive accessibility</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Feedback and Contact */}
          <section className="py-16 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="heading-md mb-4">Help Us Improve</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      We're committed to continuous improvement. If you encounter any accessibility barriers 
                      or have suggestions for improvement, please let us know.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Mail className="h-5 w-5" />
                          Email Support
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Send us detailed feedback about accessibility issues or suggestions.
                        </p>
                        <Button asChild className="w-full">
                          <a href="mailto:accessibility@wordcraft.com">
                            Contact Accessibility Team
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Phone className="h-5 w-5" />
                          Phone Support
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Speak directly with our accessibility specialists.
                        </p>
                        <Button asChild variant="outline" className="w-full">
                          <a href="tel:+1-555-0123">
                            Call +1 (555) 012-3456
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator className="my-8" />

                  <div className="text-center">
                    <h4 className="font-semibold mb-4">Additional Resources</h4>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild variant="outline">
                        <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          WCAG Guidelines
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/help">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Accessibility Help
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Last Updated */}
          <section className="py-8 px-4 border-t">
            <div className="container-fluid max-w-4xl mx-auto text-center">
              <p className="text-sm text-muted-foreground">
                This accessibility statement was last updated on January 15, 2024. 
                We review and update our accessibility practices regularly.
              </p>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default AccessibilityPage;