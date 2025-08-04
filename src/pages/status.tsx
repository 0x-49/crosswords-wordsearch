import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Activity, 
  CheckCircle, 
  AlertCircle,
  XCircle,
  Clock,
  Server,
  Database,
  Globe,
  Zap,
  Shield,
  Cloud,
  Wifi,
  HardDrive,
  Cpu,
  BarChart3,
  Calendar,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: number;
  responseTime: number;
  icon: any;
  description: string;
}

interface Incident {
  id: string;
  title: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'low' | 'medium' | 'high' | 'critical';
  startTime: string;
  endTime?: string;
  description: string;
  updates: {
    time: string;
    message: string;
    status: string;
  }[];
}

const services: ServiceStatus[] = [
  {
    name: 'Web Application',
    status: 'operational',
    uptime: 99.98,
    responseTime: 245,
    icon: Globe,
    description: 'Main WordCraft web application and user interface'
  },
  {
    name: 'API Services',
    status: 'operational',
    uptime: 99.95,
    responseTime: 180,
    icon: Server,
    description: 'Core API endpoints for puzzle generation and user management'
  },
  {
    name: 'Database',
    status: 'operational',
    uptime: 99.99,
    responseTime: 12,
    icon: Database,
    description: 'Primary database cluster for user data and puzzle storage'
  },
  {
    name: 'File Storage',
    status: 'operational',
    uptime: 99.97,
    responseTime: 89,
    icon: HardDrive,
    description: 'Cloud storage for generated puzzle books and media assets'
  },
  {
    name: 'Authentication',
    status: 'operational',
    uptime: 99.96,
    responseTime: 156,
    icon: Shield,
    description: 'User authentication and authorization services'
  },
  {
    name: 'CDN',
    status: 'operational',
    uptime: 99.99,
    responseTime: 45,
    icon: Zap,
    description: 'Content delivery network for fast global access'
  }
];

const recentIncidents: Incident[] = [
  {
    id: 'inc-2024-001',
    title: 'Intermittent API Response Delays',
    status: 'resolved',
    severity: 'medium',
    startTime: '2024-01-28T14:30:00Z',
    endTime: '2024-01-28T16:45:00Z',
    description: 'Some users experienced slower than normal API response times during puzzle generation.',
    updates: [
      {
        time: '2024-01-28T16:45:00Z',
        message: 'Issue has been fully resolved. All services are operating normally.',
        status: 'resolved'
      },
      {
        time: '2024-01-28T15:30:00Z',
        message: 'We have identified the root cause and are implementing a fix. Response times are improving.',
        status: 'identified'
      },
      {
        time: '2024-01-28T14:45:00Z',
        message: 'We are investigating reports of slower API response times.',
        status: 'investigating'
      }
    ]
  },
  {
    id: 'inc-2024-002',
    title: 'Scheduled Database Maintenance',
    status: 'resolved',
    severity: 'low',
    startTime: '2024-01-25T02:00:00Z',
    endTime: '2024-01-25T04:30:00Z',
    description: 'Planned database maintenance to improve performance and reliability.',
    updates: [
      {
        time: '2024-01-25T04:30:00Z',
        message: 'Maintenance completed successfully. All services are fully operational.',
        status: 'resolved'
      },
      {
        time: '2024-01-25T02:00:00Z',
        message: 'Scheduled maintenance has begun. Some features may be temporarily unavailable.',
        status: 'monitoring'
      }
    ]
  }
];

const metrics = [
  { label: 'Overall Uptime', value: '99.97%', trend: '+0.02%', icon: Activity },
  { label: 'Avg Response Time', value: '156ms', trend: '-12ms', icon: Zap },
  { label: 'Active Users', value: '12,847', trend: '+1,234', icon: Globe },
  { label: 'Books Generated Today', value: '2,156', trend: '+345', icon: BarChart3 }
];

const StatusPage: NextPage = () => {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'outage':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4" />;
      case 'degraded':
        return <AlertCircle className="h-4 w-4" />;
      case 'outage':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const overallStatus = services.every(service => service.status === 'operational') 
    ? 'operational' 
    : services.some(service => service.status === 'outage') 
    ? 'outage' 
    : 'degraded';

  return (
    <>
      <Head>
        <title>System Status - WordCraft</title>
        <meta name="description" content="Real-time status of WordCraft services, uptime statistics, and incident reports. Monitor the health of our puzzle generation platform." />
        <meta name="keywords" content="system status, uptime, service health, WordCraft status, API status, server monitoring" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="System Status - WordCraft" />
        <meta property="og:description" content="Real-time status of WordCraft services, uptime statistics, and incident reports. Monitor the health of our puzzle generation platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordcraft.com/status" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="System Status - WordCraft" />
        <meta name="twitter:description" content="Real-time status of WordCraft services, uptime statistics, and incident reports. Monitor the health of our puzzle generation platform." />
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
                <Activity className="h-16 w-16 text-primary mx-auto mb-6" />
                <h1 className="heading-xl mb-6">
                  System Status
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Real-time monitoring of WordCraft services, performance metrics, and incident reports. 
                  Stay informed about the health of our platform.
                </p>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Badge className={`px-4 py-2 ${getStatusColor(overallStatus)}`}>
                    {getStatusIcon(overallStatus)}
                    <span className="ml-2 font-medium">
                      {overallStatus === 'operational' ? 'All Systems Operational' : 
                       overallStatus === 'degraded' ? 'Some Systems Degraded' : 
                       'Service Disruption'}
                    </span>
                  </Badge>
                </div>

                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <span>Last updated: {lastUpdated.toLocaleString()}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Key Metrics */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  const isPositive = metric.trend.startsWith('+');
                  return (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="text-center hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
                          <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                          <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
                          <div className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.trend} from last week
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Service Status */}
          <section className="py-12 px-4">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Service Status</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Current operational status of all WordCraft services and infrastructure components.
                </p>
              </div>

              <div className="space-y-4">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Icon className="h-8 w-8 text-primary" />
                              <div>
                                <h3 className="font-semibold text-lg">{service.name}</h3>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <div className="text-sm font-medium">{service.uptime}% uptime</div>
                                <div className="text-xs text-muted-foreground">{service.responseTime}ms avg</div>
                              </div>
                              
                              <Badge className={`px-3 py-1 ${getStatusColor(service.status)}`}>
                                {getStatusIcon(service.status)}
                                <span className="ml-2 capitalize">{service.status}</span>
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                              <span>Uptime (30 days)</span>
                              <span>{service.uptime}%</span>
                            </div>
                            <Progress value={service.uptime} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Recent Incidents */}
          <section className="py-12 px-4 bg-gradient-to-b from-secondary/20 to-background">
            <div className="container-fluid max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4">Recent Incidents</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Latest incident reports and their resolution status. We maintain full transparency 
                  about any service disruptions.
                </p>
              </div>

              {recentIncidents.length > 0 ? (
                <div className="space-y-6">
                  {recentIncidents.map((incident, index) => (
                    <motion.div
                      key={incident.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">{incident.title}</CardTitle>
                              <CardDescription className="mt-2">
                                {incident.description}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getSeverityColor(incident.severity)}>
                                {incident.severity.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className={
                                incident.status === 'resolved' ? 'text-green-600 border-green-600' :
                                incident.status === 'monitoring' ? 'text-blue-600 border-blue-600' :
                                'text-orange-600 border-orange-600'
                              }>
                                {incident.status.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Started: {new Date(incident.startTime).toLocaleString()}
                            </div>
                            {incident.endTime && (
                              <div className="flex items-center gap-1">
                                <CheckCircle className="h-4 w-4" />
                                Resolved: {new Date(incident.endTime).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="space-y-4">
                            <h4 className="font-medium">Updates:</h4>
                            {incident.updates.map((update, idx) => (
                              <div key={idx} className="border-l-2 border-muted pl-4">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium">{update.status.toUpperCase()}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(update.time).toLocaleString()}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{update.message}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Recent Incidents</h3>
                    <p className="text-muted-foreground">
                      All systems have been running smoothly. No incidents to report in the last 30 days.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          {/* Subscribe to Updates */}
          <section className="py-16 px-4">
            <div className="container-fluid max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <Activity className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="heading-md mb-4">Stay Informed</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Subscribe to status updates and get notified about incidents, maintenance windows, 
                    and service improvements via email or SMS.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg">
                      Subscribe to Updates
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <a href="https://status.wordcraft.com" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Status Page API
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Historical Data */}
          <section className="py-8 px-4 border-t">
            <div className="container-fluid max-w-4xl mx-auto text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Historical uptime data and detailed metrics are available for the past 90 days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/contact">
                    Contact Support
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://status.wordcraft.com/history" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Historical Data
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default StatusPage;