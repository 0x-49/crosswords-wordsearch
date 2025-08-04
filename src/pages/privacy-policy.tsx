import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  Database, 
  Mail, 
  Cookie,
  FileText,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/router';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function PrivacyPolicy() {
  const router = useRouter();

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: [
        {
          subtitle: 'Personal Information',
          items: [
            'Email address (for account creation and communication)',
            'Name (optional, for personalization)',
            'Profile information (optional)',
            'Payment information (processed securely through third-party providers)'
          ]
        },
        {
          subtitle: 'Usage Information',
          items: [
            'Puzzle completion statistics and progress',
            'Time spent on puzzles and difficulty preferences',
            'Device information and browser type',
            'IP address and general location data'
          ]
        },
        {
          subtitle: 'Automatically Collected Data',
          items: [
            'Cookies and similar tracking technologies',
            'Log files and server data',
            'Analytics data for service improvement',
            'Error reports and performance metrics'
          ]
        }
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        {
          subtitle: 'Service Provision',
          items: [
            'Create and manage your user account',
            'Provide personalized puzzle recommendations',
            'Track your progress and achievements',
            'Generate custom puzzle books based on your preferences'
          ]
        },
        {
          subtitle: 'Communication',
          items: [
            'Send account-related notifications',
            'Provide customer support and respond to inquiries',
            'Send optional newsletters and updates (with your consent)',
            'Notify you about new features and puzzle collections'
          ]
        },
        {
          subtitle: 'Service Improvement',
          items: [
            'Analyze usage patterns to improve our puzzles',
            'Conduct research and analytics',
            'Develop new features and functionality',
            'Ensure security and prevent fraud'
          ]
        }
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      icon: Users,
      content: [
        {
          subtitle: 'We Do Not Sell Your Data',
          items: [
            'We never sell, rent, or trade your personal information',
            'Your puzzle progress and preferences remain private',
            'We do not share data with advertisers for targeting',
            'Your email address is never shared with third parties for marketing'
          ]
        },
        {
          subtitle: 'Limited Sharing Scenarios',
          items: [
            'Service providers (hosting, payment processing, analytics)',
            'Legal compliance when required by law',
            'Protection of our rights and safety of users',
            'Business transfers (with continued privacy protection)'
          ]
        },
        {
          subtitle: 'Third-Party Services',
          items: [
            'Authentication providers (Google, etc.) - only basic profile info',
            'Payment processors - transaction data only',
            'Analytics services - anonymized usage data',
            'Cloud storage providers - encrypted data only'
          ]
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security and Protection',
      icon: Lock,
      content: [
        {
          subtitle: 'Security Measures',
          items: [
            'Industry-standard encryption for data transmission (SSL/TLS)',
            'Secure database storage with encryption at rest',
            'Regular security audits and vulnerability assessments',
            'Access controls and authentication requirements'
          ]
        },
        {
          subtitle: 'Data Retention',
          items: [
            'Account data retained while your account is active',
            'Puzzle progress saved for service continuity',
            'Inactive accounts may be deleted after 2 years of inactivity',
            'You can request data deletion at any time'
          ]
        },
        {
          subtitle: 'Breach Notification',
          items: [
            'Immediate investigation of any suspected breaches',
            'Notification to affected users within 72 hours',
            'Cooperation with authorities when required',
            'Transparent communication about any incidents'
          ]
        }
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Rights and Choices',
      icon: Shield,
      content: [
        {
          subtitle: 'Access and Control',
          items: [
            'View and download your personal data',
            'Update or correct your account information',
            'Delete your account and associated data',
            'Export your puzzle progress and statistics'
          ]
        },
        {
          subtitle: 'Communication Preferences',
          items: [
            'Opt out of marketing emails at any time',
            'Choose notification preferences in your account settings',
            'Unsubscribe from newsletters with one click',
            'Control frequency of service-related communications'
          ]
        },
        {
          subtitle: 'Privacy Controls',
          items: [
            'Manage cookie preferences in your browser',
            'Control data sharing with third-party services',
            'Request data portability to another service',
            'Object to certain types of data processing'
          ]
        }
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: Cookie,
      content: [
        {
          subtitle: 'Essential Cookies',
          items: [
            'Authentication and session management',
            'Security and fraud prevention',
            'Basic site functionality and preferences',
            'Load balancing and performance optimization'
          ]
        },
        {
          subtitle: 'Analytics Cookies',
          items: [
            'Usage statistics and performance metrics',
            'Feature usage and user behavior analysis',
            'Error tracking and debugging information',
            'A/B testing for service improvements'
          ]
        },
        {
          subtitle: 'Cookie Management',
          items: [
            'Browser settings to control cookie acceptance',
            'Opt-out options for non-essential cookies',
            'Regular cookie cleanup and expiration',
            'Clear information about cookie purposes'
          ]
        }
      ]
    },
    {
      id: 'children-privacy',
      title: 'Children\'s Privacy',
      icon: Users,
      content: [
        {
          subtitle: 'Age Requirements',
          items: [
            'Service intended for users 13 years and older',
            'Parental consent required for users under 13',
            'Special protections for children\'s data',
            'Limited data collection from minors'
          ]
        },
        {
          subtitle: 'Parental Rights',
          items: [
            'Parents can review their child\'s information',
            'Request deletion of child\'s account and data',
            'Control communication with children',
            'Receive notifications about data practices'
          ]
        }
      ]
    },
    {
      id: 'international',
      title: 'International Data Transfers',
      icon: FileText,
      content: [
        {
          subtitle: 'Data Processing Locations',
          items: [
            'Primary data processing in secure data centers',
            'Compliance with international privacy laws',
            'Adequate protection measures for cross-border transfers',
            'Regular review of data processing locations'
          ]
        },
        {
          subtitle: 'Legal Frameworks',
          items: [
            'GDPR compliance for European users',
            'CCPA compliance for California residents',
            'Standard contractual clauses for data transfers',
            'Privacy Shield principles where applicable'
          ]
        }
      ]
    }
  ];

  return (
    <Layout
      title="Privacy Policy - Puzzle Book Generator"
      description="Learn how we protect your privacy and handle your personal information when using our puzzle book generation service."
      noIndex={true}
    >
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <h1 className="text-4xl font-bold">Privacy Policy</h1>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  We are committed to protecting your privacy and being transparent about how we collect, 
                  use, and protect your personal information.
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <Badge variant="secondary" className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    Last Updated: January 2024
                  </Badge>
                  <Badge variant="outline">GDPR Compliant</Badge>
                  <Badge variant="outline">CCPA Compliant</Badge>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          {/* Quick Summary */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="mb-12"
          >
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Eye className="h-5 w-5" />
                  Privacy at a Glance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="text-center">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold mb-1">We Protect Your Data</h3>
                    <p className="text-muted-foreground">
                      Industry-standard encryption and security measures protect your information.
                    </p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold mb-1">We Don't Sell Your Data</h3>
                    <p className="text-muted-foreground">
                      Your personal information is never sold, rented, or traded to third parties.
                    </p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold mb-1">You Have Control</h3>
                    <p className="text-muted-foreground">
                      Access, update, or delete your data at any time through your account settings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="mb-12"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Privacy Questions?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Email:</strong> privacy@puzzlebookgenerator.com
                  </div>
                  <div>
                    <strong>Response Time:</strong> Within 48 hours
                  </div>
                  <div>
                    <strong>Data Protection Officer:</strong> Available upon request
                  </div>
                  <div>
                    <strong>Mailing Address:</strong> Available in our Terms of Service
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Detailed Sections */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-8"
          >
            {sections.map((section, index) => (
              <motion.div key={section.id} variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <section.icon className="h-6 w-6 text-blue-600" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {section.content.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h3 className="font-semibold text-lg mb-3">{subsection.subtitle}</h3>
                        <ul className="space-y-2">
                          {subsection.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {subIndex < section.content.length - 1 && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Updates and Changes */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="mt-12"
          >
            <Card className="bg-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Calendar className="h-5 w-5" />
                  Policy Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices, 
                    technology, legal requirements, or other factors.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">How We Notify You:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Email notification for significant changes</li>
                        <li>• In-app notifications when you log in</li>
                        <li>• Updated "Last Modified" date at the top</li>
                        <li>• Prominent notice on our website</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Your Options:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Review changes before they take effect</li>
                        <li>• Contact us with questions or concerns</li>
                        <li>• Delete your account if you disagree</li>
                        <li>• Continue using the service means acceptance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Actions */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={() => router.push('/contact')}>
                <Mail className="h-4 w-4 mr-2" />
                Contact Us About Privacy
              </Button>
              <Button variant="outline" onClick={() => router.push('/terms')}>
                <FileText className="h-4 w-4 mr-2" />
                View Terms of Service
              </Button>
              <Button variant="outline" onClick={() => router.push('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              This Privacy Policy is effective as of January 1, 2024, and was last updated on January 1, 2024.
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}