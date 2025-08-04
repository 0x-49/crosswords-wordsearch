import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Cookie, 
  Shield, 
  Settings, 
  Eye,
  BarChart3,
  Target,
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  required: boolean;
  enabled: boolean;
  cookies: CookieDetail[];
}

interface CookieDetail {
  name: string;
  purpose: string;
  duration: string;
  provider: string;
  type: 'First-party' | 'Third-party';
}

const CookiePolicyPage: NextPage = () => {
  const [cookieSettings, setCookieSettings] = useState<Record<string, boolean>>({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false
  });

  const cookieCategories: CookieCategory[] = [
    {
      id: 'necessary',
      name: 'Strictly Necessary Cookies',
      description: 'These cookies are essential for the website to function properly and cannot be disabled.',
      icon: Shield,
      required: true,
      enabled: cookieSettings.necessary,
      cookies: [
        {
          name: 'wordcraft_session',
          purpose: 'Maintains user session and authentication state',
          duration: 'Session',
          provider: 'WordCraft',
          type: 'First-party'
        },
        {
          name: 'csrf_token',
          purpose: 'Prevents cross-site request forgery attacks',
          duration: 'Session',
          provider: 'WordCraft',
          type: 'First-party'
        },
        {
          name: 'cookie_consent',
          purpose: 'Stores your cookie preferences',
          duration: '1 year',
          provider: 'WordCraft',
          type: 'First-party'
        }
      ]
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization.',
      icon: Settings,
      required: false,
      enabled: cookieSettings.functional,
      cookies: [
        {
          name: 'user_preferences',
          purpose: 'Stores user interface preferences and settings',
          duration: '6 months',
          provider: 'WordCraft',
          type: 'First-party'
        },
        {
          name: 'theme_selection',
          purpose: 'Remembers your preferred theme and layout settings',
          duration: '1 year',
          provider: 'WordCraft',
          type: 'First-party'
        },
        {
          name: 'language_preference',
          purpose: 'Stores your language preference',
          duration: '1 year',
          provider: 'WordCraft',
          type: 'First-party'
        }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website.',
      icon: BarChart3,
      required: false,
      enabled: cookieSettings.analytics,
      cookies: [
        {
          name: '_ga',
          purpose: 'Distinguishes unique users and sessions',
          duration: '2 years',
          provider: 'Google Analytics',
          type: 'Third-party'
        },
        {
          name: '_ga_*',
          purpose: 'Stores session state for Google Analytics 4',
          duration: '2 years',
          provider: 'Google Analytics',
          type: 'Third-party'
        },
        {
          name: '_gid',
          purpose: 'Distinguishes users for 24 hours',
          duration: '24 hours',
          provider: 'Google Analytics',
          type: 'Third-party'
        }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'These cookies are used to deliver relevant advertisements and track campaign performance.',
      icon: Target,
      required: false,
      enabled: cookieSettings.marketing,
      cookies: [
        {
          name: '_fbp',
          purpose: 'Stores and tracks visits across websites for Facebook advertising',
          duration: '3 months',
          provider: 'Facebook',
          type: 'Third-party'
        },
        {
          name: 'ads_preferences',
          purpose: 'Stores advertising preferences and targeting information',
          duration: '1 year',
          provider: 'WordCraft',
          type: 'First-party'
        }
      ]
    }
  ];

  const handleCookieToggle = (categoryId: string, enabled: boolean) => {
    setCookieSettings(prev => ({
      ...prev,
      [categoryId]: enabled
    }));
  };

  const acceptAllCookies = () => {
    setCookieSettings({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    });
  };

  const rejectOptionalCookies = () => {
    setCookieSettings({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    });
  };

  return (
    <>
      <Head>
        <title>Cookie Policy - WordCraft</title>
        <meta name="description" content="Learn about how WordCraft uses cookies to improve your experience. Manage your cookie preferences and understand our data practices." />
        <meta name="keywords" content="cookies, privacy, data protection, tracking, preferences, GDPR" />
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
                <Cookie className="h-16 w-16 text-primary mx-auto mb-6" />
                <h1 className="heading-xl mb-6">
                  Cookie Policy
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  This policy explains how WordCraft uses cookies and similar technologies to provide, 
                  improve, and protect our services.
                </p>
                <div className="text-sm text-muted-foreground">
                  Last updated: January 29, 2025
                </div>
              </motion.div>
            </div>
          </section>

          {/* Cookie Settings */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Cookie Preferences
                  </CardTitle>
                  <CardDescription>
                    Manage your cookie settings below. Changes will take effect immediately.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Button onClick={acceptAllCookies} className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept All Cookies
                    </Button>
                    <Button onClick={rejectOptionalCookies} variant="outline" className="flex-1">
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Optional Cookies
                    </Button>
                  </div>
                  
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Your preferences are saved locally and will be remembered for future visits. 
                      You can change these settings at any time.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {cookieCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Icon className="h-6 w-6 text-primary" />
                              <div>
                                <CardTitle className="text-lg">{category.name}</CardTitle>
                                <CardDescription className="mt-1">
                                  {category.description}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {category.required && (
                                <Badge variant="secondary">Required</Badge>
                              )}
                              <Switch
                                checked={category.enabled}
                                onCheckedChange={(enabled) => handleCookieToggle(category.id, enabled)}
                                disabled={category.required}
                              />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {category.cookies.map((cookie, cookieIndex) => (
                              <div key={cookieIndex} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium">{cookie.name}</h4>
                                  <div className="flex items-center gap-2">
                                    <Badge variant={cookie.type === 'First-party' ? 'default' : 'outline'} className="text-xs">
                                      {cookie.type}
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                      {cookie.duration}
                                    </Badge>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{cookie.purpose}</p>
                                <div className="text-xs text-muted-foreground">
                                  Provider: {cookie.provider}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* What Are Cookies */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>What Are Cookies?</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>
                    Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
                    They are widely used to make websites work more efficiently and provide information to website owners.
                  </p>
                  
                  <h3>How We Use Cookies</h3>
                  <p>
                    WordCraft uses cookies for several purposes:
                  </p>
                  <ul>
                    <li><strong>Essential functionality:</strong> To enable core features like user authentication and security</li>
                    <li><strong>Performance:</strong> To understand how visitors use our site and improve user experience</li>
                    <li><strong>Personalization:</strong> To remember your preferences and provide customized content</li>
                    <li><strong>Analytics:</strong> To analyze site usage and optimize our services</li>
                  </ul>

                  <h3>Types of Cookies We Use</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Session Cookies</h4>
                      <p className="text-sm text-muted-foreground">
                        Temporary cookies that are deleted when you close your browser
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Persistent Cookies</h4>
                      <p className="text-sm text-muted-foreground">
                        Cookies that remain on your device for a specified period
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">First-Party Cookies</h4>
                      <p className="text-sm text-muted-foreground">
                        Cookies set directly by WordCraft
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Third-Party Cookies</h4>
                      <p className="text-sm text-muted-foreground">
                        Cookies set by external services we use
                      </p>
                    </div>
                  </div>

                  <h3>Managing Your Cookie Preferences</h3>
                  <p>
                    You can control cookies in several ways:
                  </p>
                  <ul>
                    <li><strong>Cookie Settings:</strong> Use the preference center above to enable or disable specific cookie categories</li>
                    <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies through their settings</li>
                    <li><strong>Third-Party Opt-Outs:</strong> Visit opt-out pages for services like Google Analytics</li>
                  </ul>

                  <Alert className="not-prose">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> Disabling certain cookies may affect the functionality of our website. 
                      Essential cookies cannot be disabled as they are necessary for the site to work properly.
                    </AlertDescription>
                  </Alert>

                  <h3>Updates to This Policy</h3>
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. 
                    We will notify you of any significant changes by posting the updated policy on our website.
                  </p>

                  <h3>Contact Us</h3>
                  <p>
                    If you have questions about our use of cookies or this policy, please contact us at{' '}
                    <a href="mailto:privacy@wordcraft.com" className="text-primary hover:underline">
                      privacy@wordcraft.com
                    </a>.
                  </p>
                </CardContent>
              </Card>
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
                    
                    <Link href="/terms" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <Eye className="h-6 w-6 text-primary mb-2" />
                      <h3 className="font-semibold mb-1">Terms of Service</h3>
                      <p className="text-sm text-muted-foreground">
                        The terms and conditions for using WordCraft
                      </p>
                    </Link>
                    
                    <Link href="/gdpr" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <Settings className="h-6 w-6 text-primary mb-2" />
                      <h3 className="font-semibold mb-1">GDPR Rights</h3>
                      <p className="text-sm text-muted-foreground">
                        Your rights under the General Data Protection Regulation
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

export default CookiePolicyPage;