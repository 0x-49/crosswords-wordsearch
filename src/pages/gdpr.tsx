import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Eye, 
  Download, 
  Trash2,
  Edit,
  UserCheck,
  FileText,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface GDPRRight {
  id: string;
  title: string;
  description: string;
  icon: any;
  howToExercise: string;
  timeframe: string;
  examples: string[];
}

const gdprRights: GDPRRight[] = [
  {
    id: 'access',
    title: 'Right of Access',
    description: 'You have the right to know what personal data we hold about you and how we use it.',
    icon: Eye,
    howToExercise: 'Submit a data access request through our contact form or email us directly.',
    timeframe: 'We will respond within 30 days',
    examples: [
      'Request a copy of all your personal data',
      'Ask about the purposes of data processing',
      'Learn about data retention periods',
      'Find out who we share your data with'
    ]
  },
  {
    id: 'rectification',
    title: 'Right to Rectification',
    description: 'You can ask us to correct or update inaccurate or incomplete personal data.',
    icon: Edit,
    howToExercise: 'Contact us with the correct information and we will update our records.',
    timeframe: 'We will make corrections within 30 days',
    examples: [
      'Update your email address',
      'Correct your name or contact details',
      'Fix errors in your account information',
      'Update your preferences'
    ]
  },
  {
    id: 'erasure',
    title: 'Right to Erasure (Right to be Forgotten)',
    description: 'You can request that we delete your personal data in certain circumstances.',
    icon: Trash2,
    howToExercise: 'Submit a deletion request explaining why you want your data erased.',
    timeframe: 'We will process deletions within 30 days',
    examples: [
      'Delete your account and all associated data',
      'Remove data that is no longer necessary',
      'Erase data processed unlawfully',
      'Withdraw consent for data processing'
    ]
  },
  {
    id: 'portability',
    title: 'Right to Data Portability',
    description: 'You can request a copy of your data in a structured, machine-readable format.',
    icon: Download,
    howToExercise: 'Request a data export through your account settings or contact us.',
    timeframe: 'We will provide exports within 30 days',
    examples: [
      'Export your puzzle books and preferences',
      'Download your account data in JSON format',
      'Transfer data to another service',
      'Get a backup of your created content'
    ]
  },
  {
    id: 'restrict',
    title: 'Right to Restrict Processing',
    description: 'You can ask us to limit how we use your personal data in certain situations.',
    icon: UserCheck,
    howToExercise: 'Contact us explaining why you want to restrict processing.',
    timeframe: 'We will implement restrictions within 30 days',
    examples: [
      'Pause processing while disputing data accuracy',
      'Limit use when processing is unlawful',
      'Restrict processing for legal claims',
      'Object to processing pending verification'
    ]
  },
  {
    id: 'object',
    title: 'Right to Object',
    description: 'You can object to certain types of data processing, including direct marketing.',
    icon: Shield,
    howToExercise: 'Opt out through your account settings or contact us directly.',
    timeframe: 'We will stop processing immediately for marketing',
    examples: [
      'Opt out of marketing emails',
      'Object to profiling for advertising',
      'Stop processing for legitimate interests',
      'Refuse automated decision-making'
    ]
  }
];

const dataCategories = [
  {
    category: 'Account Information',
    data: ['Email address', 'Name', 'Password (encrypted)', 'Account preferences'],
    purpose: 'Account management and authentication',
    retention: '3 years after account deletion'
  },
  {
    category: 'Usage Data',
    data: ['Puzzle books created', 'Themes selected', 'Download history', 'Login activity'],
    purpose: 'Service provision and improvement',
    retention: '2 years after last activity'
  },
  {
    category: 'Technical Data',
    data: ['IP address', 'Browser information', 'Device type', 'Session data'],
    purpose: 'Security and performance optimization',
    retention: '1 year'
  },
  {
    category: 'Communication Data',
    data: ['Support tickets', 'Email correspondence', 'Feedback submissions'],
    purpose: 'Customer support and service improvement',
    retention: '3 years after resolution'
  }
];

const GDPRPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>GDPR Rights - Your Data Protection Rights</title>
        <meta name="description" content="Learn about your GDPR rights with WordCraft. Understand how to access, correct, delete, or export your personal data under European data protection law." />
        <meta name="keywords" content="GDPR, data protection, privacy rights, data access, data deletion, data portability, EU privacy" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout noIndex>
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
                  Your GDPR Rights
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Under the General Data Protection Regulation (GDPR), you have important rights regarding 
                  your personal data. Learn how to exercise these rights with WordCraft.
                </p>
                <div className="text-sm text-muted-foreground">
                  Last updated: January 29, 2025
                </div>
              </motion.div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common requests you can make regarding your personal data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
                      <a href="mailto:privacy@wordcraft.com?subject=Data Access Request">
                        <Eye className="h-6 w-6" />
                        <span className="text-sm">Request My Data</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
                      <a href="mailto:privacy@wordcraft.com?subject=Data Correction Request">
                        <Edit className="h-6 w-6" />
                        <span className="text-sm">Correct My Data</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
                      <a href="mailto:privacy@wordcraft.com?subject=Data Export Request">
                        <Download className="h-6 w-6" />
                        <span className="text-sm">Export My Data</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
                      <a href="mailto:privacy@wordcraft.com?subject=Data Deletion Request">
                        <Trash2 className="h-6 w-6" />
                        <span className="text-sm">Delete My Data</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Your Rights */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Your Data Protection Rights</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The GDPR gives you specific rights over your personal data. Here's what you can do and how to exercise these rights.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {gdprRights.map((right, index) => {
                  const Icon = right.icon;
                  return (
                    <motion.div
                      key={right.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <Icon className="h-6 w-6 text-primary mt-1" />
                            <div className="flex-1">
                              <CardTitle className="text-lg">{right.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {right.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-sm mb-2">How to Exercise This Right:</h4>
                              <p className="text-sm text-muted-foreground">{right.howToExercise}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{right.timeframe}</span>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Examples:</h4>
                              <ul className="space-y-1">
                                {right.examples.slice(0, 2).map((example, exampleIndex) => (
                                  <li key={exampleIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                                    {example}
                                  </li>
                                ))}
                              </ul>
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

          {/* Data We Collect */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Data We Collect</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Understanding what data we collect helps you make informed decisions about your privacy rights.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dataCategories.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{category.category}</CardTitle>
                        <CardDescription>
                          Purpose: {category.purpose}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Data Types:</h4>
                            <div className="flex flex-wrap gap-2">
                              {category.data.map((item, itemIndex) => (
                                <Badge key={itemIndex} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Retained for: {category.retention}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How to Make a Request */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>How to Make a GDPR Request</CardTitle>
                  <CardDescription>
                    Follow these steps to exercise your data protection rights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                          1
                        </div>
                        <h3 className="font-semibold mb-2">Contact Us</h3>
                        <p className="text-sm text-muted-foreground">
                          Email us at privacy@wordcraft.com with your request
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                          2
                        </div>
                        <h3 className="font-semibold mb-2">Verify Identity</h3>
                        <p className="text-sm text-muted-foreground">
                          We'll verify your identity to protect your data
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                          3
                        </div>
                        <h3 className="font-semibold mb-2">Receive Response</h3>
                        <p className="text-sm text-muted-foreground">
                          We'll process your request within 30 days
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-4">What to Include in Your Request:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Your full name and email address associated with your account</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Clear description of what you want us to do</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Reason for your request (if applicable)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Preferred format for data exports (JSON, CSV, etc.)</span>
                        </li>
                      </ul>
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Response Time:</strong> We aim to respond to all GDPR requests within 30 days. 
                        For complex requests, we may extend this by up to 60 additional days and will inform you of any delays.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Legal Basis */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Legal Basis for Processing</CardTitle>
                  <CardDescription>
                    We process your personal data based on the following legal grounds under GDPR
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Contract Performance</h4>
                        <p className="text-sm text-muted-foreground">
                          Processing necessary to provide our puzzle generation services and fulfill our terms of service.
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Legitimate Interests</h4>
                        <p className="text-sm text-muted-foreground">
                          Improving our services, preventing fraud, and ensuring security of our platform.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Consent</h4>
                        <p className="text-sm text-muted-foreground">
                          Marketing communications, analytics cookies, and optional features you've agreed to.
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Legal Obligation</h4>
                        <p className="text-sm text-muted-foreground">
                          Compliance with applicable laws, regulations, and legal processes.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact and Complaints */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Contact Our DPO
                    </CardTitle>
                    <CardDescription>
                      Get in touch with our Data Protection Officer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        For any questions about your data rights or our privacy practices, 
                        contact our Data Protection Officer.
                      </p>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <strong>Email:</strong> privacy@wordcraft.com
                        </div>
                        <div className="text-sm">
                          <strong>Subject Line:</strong> GDPR Request - [Your Request Type]
                        </div>
                      </div>
                      <Button asChild className="w-full">
                        <a href="mailto:privacy@wordcraft.com?subject=GDPR Inquiry">
                          Contact DPO
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      File a Complaint
                    </CardTitle>
                    <CardDescription>
                      Your right to complain to supervisory authorities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        If you're not satisfied with how we handle your data rights, 
                        you can file a complaint with your local data protection authority.
                      </p>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <strong>EU Residents:</strong> Contact your national DPA
                        </div>
                        <div className="text-sm">
                          <strong>UK Residents:</strong> Information Commissioner's Office (ICO)
                        </div>
                      </div>
                      <Button variant="outline" asChild className="w-full">
                        <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer">
                          Find Your DPA
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Related Information</CardTitle>
                  <CardDescription>
                    Learn more about our privacy practices and policies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/privacy-policy" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <Shield className="h-6 w-6 text-primary mb-2" />
                      <h3 className="font-semibold mb-1">Privacy Policy</h3>
                      <p className="text-sm text-muted-foreground">
                        How we collect, use, and protect your personal information
                      </p>
                    </Link>
                    
                    <Link href="/cookies" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <FileText className="h-6 w-6 text-primary mb-2" />
                      <h3 className="font-semibold mb-1">Cookie Policy</h3>
                      <p className="text-sm text-muted-foreground">
                        How we use cookies and manage your preferences
                      </p>
                    </Link>
                    
                    <Link href="/terms" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <Eye className="h-6 w-6 text-primary mb-2" />
                      <h3 className="font-semibold mb-1">Terms of Service</h3>
                      <p className="text-sm text-muted-foreground">
                        The terms and conditions for using WordCraft
                      </p>
                    </Link>
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

export default GDPRPage;