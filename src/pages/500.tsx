import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Home, 
  RefreshCw,
  MessageCircle,
  Bug,
  ArrowLeft,
  Shield,
  Wrench,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const troubleshootingSteps = [
  {
    title: 'Refresh the Page',
    description: 'Sometimes a simple refresh can resolve temporary issues',
    icon: RefreshCw,
    action: () => window.location.reload()
  },
  {
    title: 'Go Back',
    description: 'Return to the previous page and try again',
    icon: ArrowLeft,
    action: () => window.history.back()
  },
  {
    title: 'Visit Homepage',
    description: 'Start fresh from our main page',
    icon: Home,
    href: '/'
  },
  {
    title: 'Contact Support',
    description: 'Get help from our technical team',
    icon: MessageCircle,
    href: '/contact'
  }
];

const Custom500: NextPage = () => {
  const [errorId] = React.useState(() => 
    Math.random().toString(36).substr(2, 9).toUpperCase()
  );

  return (
    <>
      <Head>
        <title>Server Error - WordCraft</title>
        <meta name="description" content="We're experiencing technical difficulties. Our team has been notified and is working to resolve the issue." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center px-4">
          <div className="container-fluid max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* 500 Illustration */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-9xl font-bold text-red-500/20 mb-4"
                >
                  500
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, rotate: -10 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <AlertTriangle className="h-24 w-24 text-red-500 animate-pulse" />
                </motion.div>
              </div>

              {/* Error Message */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Server Error
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  We're experiencing some technical difficulties on our end. 
                  Our team has been automatically notified and is working to fix this issue.
                </p>
              </div>

              {/* Error Details */}
              <Alert className="max-w-2xl mx-auto bg-red-50 border-red-200">
                <Bug className="h-4 w-4" />
                <AlertDescription className="text-left">
                  <strong>What happened?</strong> Our server encountered an unexpected error while processing your request. 
                  This is likely a temporary issue that we're actively working to resolve.
                </AlertDescription>
              </Alert>

              {/* Status Information */}
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Error Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Error ID:</span>
                      <code className="font-mono bg-muted px-2 py-1 rounded">{errorId}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span>{new Date().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-red-600 font-medium">Server Error</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Code:</span>
                      <span className="font-mono">HTTP 500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Troubleshooting Steps */}
              <div className="mt-16">
                <h2 className="text-2xl font-semibold mb-8 text-foreground flex items-center justify-center gap-2">
                  <Wrench className="h-6 w-6" />
                  What You Can Do
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {troubleshootingSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                          <CardHeader className="text-center">
                            <Icon className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <CardTitle className="text-lg">{step.title}</CardTitle>
                            <CardDescription>{step.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            {step.href ? (
                              <Button asChild variant="outline" className="w-full">
                                <Link href={step.href}>
                                  Try This
                                </Link>
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={step.action}
                              >
                                Try This
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Status Updates */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-16 p-8 bg-blue-50 rounded-lg border border-blue-200"
              >
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-blue-900">System Status</h3>
                <p className="text-blue-800 mb-6 max-w-2xl mx-auto">
                  Our engineering team has been automatically notified of this issue. 
                  You can check our status page for real-time updates on system health and ongoing incidents.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    <Link href="/status">
                      Check System Status
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    <Link href="/contact">
                      Report This Issue
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Additional Help */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-12 p-6 bg-muted/50 rounded-lg"
              >
                <h3 className="text-lg font-semibold mb-4">Need Immediate Help?</h3>
                <p className="text-muted-foreground mb-6">
                  If this error is preventing you from completing important work, 
                  please contact our support team with the error ID above.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/contact">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Support
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/help">
                      Browse Help Center
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Footer Note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="text-sm text-muted-foreground mt-8"
              >
                Error ID: {errorId} | Time: {new Date().toISOString()} |{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  Report this error
                </Link>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Custom500;