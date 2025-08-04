import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Shield, Eye, Lock, Users, Globe, FileText, Clock, Mail } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

export default function Privacy() {
  const lastUpdated = "January 15, 2024";

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: <Eye className="h-5 w-5" />,
      content: [
        {
          subtitle: "Personal Information",
          text: "When you create an account, we collect your name, email address, and payment information. This information is necessary to provide our services and process transactions."
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect information about how you use WordCraft, including pages visited, features used, and time spent on the platform. This helps us improve our services."
        },
        {
          subtitle: "Device Information",
          text: "We collect information about the device you use to access WordCraft, including IP address, browser type, operating system, and device identifiers."
        },
        {
          subtitle: "Puzzle Content",
          text: "We store the puzzles you create and any custom themes or word lists you upload to provide our services and enable collaboration features."
        }
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: <Users className="h-5 w-5" />,
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide, maintain, and improve WordCraft's features, including puzzle generation, account management, and customer support."
        },
        {
          subtitle: "Communication",
          text: "We may send you service-related emails, updates about new features, and promotional content (which you can opt out of at any time)."
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We analyze usage patterns to understand how our service is used and to identify areas for improvement and new feature development."
        },
        {
          subtitle: "Legal Compliance",
          text: "We may use your information to comply with legal obligations, resolve disputes, and enforce our terms of service."
        }
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: <Globe className="h-5 w-5" />,
      content: [
        {
          subtitle: "Service Providers",
          text: "We share information with trusted third-party service providers who help us operate WordCraft, including payment processors, hosting providers, and analytics services."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, court order, or government request, or to protect our rights and the safety of our users."
        },
        {
          subtitle: "Consent",
          text: "We will not sell, rent, or share your personal information with third parties for their marketing purposes without your explicit consent."
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: <Lock className="h-5 w-5" />,
      content: [
        {
          subtitle: "Encryption",
          text: "All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols."
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls to ensure that only authorized personnel can access your personal information."
        },
        {
          subtitle: "Regular Audits",
          text: "We conduct regular security audits and assessments to identify and address potential vulnerabilities."
        },
        {
          subtitle: "Data Backup",
          text: "Your data is regularly backed up to secure, geographically distributed servers to prevent data loss."
        }
      ]
    },
    {
      id: "your-rights",
      title: "Your Rights and Choices",
      icon: <Shield className="h-5 w-5" />,
      content: [
        {
          subtitle: "Access and Portability",
          text: "You can access, download, and export your personal information and puzzle data at any time through your account settings."
        },
        {
          subtitle: "Correction and Updates",
          text: "You can update your personal information directly in your account settings or by contacting our support team."
        },
        {
          subtitle: "Deletion",
          text: "You can delete your account and associated data at any time. Some information may be retained for legal or business purposes as outlined in this policy."
        },
        {
          subtitle: "Marketing Communications",
          text: "You can opt out of marketing emails by clicking the unsubscribe link in any email or updating your preferences in your account settings."
        }
      ]
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      icon: <FileText className="h-5 w-5" />,
      content: [
        {
          subtitle: "Essential Cookies",
          text: "We use essential cookies to provide basic functionality, including user authentication and session management."
        },
        {
          subtitle: "Analytics Cookies",
          text: "We use analytics cookies to understand how users interact with WordCraft and to improve our services."
        },
        {
          subtitle: "Preference Cookies",
          text: "We store your preferences and settings to provide a personalized experience across sessions."
        },
        {
          subtitle: "Cookie Management",
          text: "You can control cookie settings through your browser preferences, though disabling certain cookies may affect functionality."
        }
      ]
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      icon: <Globe className="h-5 w-5" />,
      content: [
        {
          subtitle: "Global Operations",
          text: "WordCraft operates globally, and your information may be transferred to and processed in countries other than your own."
        },
        {
          subtitle: "Adequate Protection",
          text: "We ensure that international transfers are protected by appropriate safeguards, including standard contractual clauses and adequacy decisions."
        },
        {
          subtitle: "EU-US Privacy Framework",
          text: "For transfers from the EU to the US, we comply with applicable privacy frameworks and regulations."
        }
      ]
    },
    {
      id: "children-privacy",
      title: "Children's Privacy",
      icon: <Users className="h-5 w-5" />,
      content: [
        {
          subtitle: "Age Restrictions",
          text: "WordCraft is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13."
        },
        {
          subtitle: "Parental Consent",
          text: "If we become aware that we have collected information from a child under 13, we will take steps to delete such information promptly."
        },
        {
          subtitle: "Educational Use",
          text: "For educational institutions using WordCraft with students, additional privacy protections and parental consent procedures may apply."
        }
      ]
    }
  ];

  return (
    <Layout
      title="Privacy Policy - WordCraft"
      description="Learn how WordCraft protects your privacy and handles your personal information. Our comprehensive privacy policy explains our data practices."
      keywords="wordcraft privacy policy, data protection, privacy rights, GDPR compliance, data security"
      noIndex={true}
    >
      <div className="bg-background">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
          <div className="container-fluid">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <Badge variant="secondary" className="mb-6 text-sm px-6 py-3 rounded-full shadow-soft">
                <Shield className="w-4 h-4 mr-2" />
                Privacy Policy
              </Badge>
              <h1 className="heading-xl text-gradient mb-8">
                Your Privacy Matters
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                We're committed to protecting your privacy and being transparent about how we collect, use, and protect your information.
              </p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="section-padding">
          <div className="container-fluid">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="card-elevated mb-16">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-center">Privacy at a Glance</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center mx-auto mb-3">
                        <Lock className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Secure by Design</h3>
                      <p className="text-sm text-muted-foreground">Your data is encrypted and protected with industry-standard security measures.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center mx-auto mb-3">
                        <Eye className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Transparent</h3>
                      <p className="text-sm text-muted-foreground">We clearly explain what data we collect and how we use it.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-950 flex items-center justify-center mx-auto mb-3">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Your Control</h3>
                      <p className="text-sm text-muted-foreground">You have full control over your data and can delete it at any time.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-950 flex items-center justify-center mx-auto mb-3">
                        <Shield className="h-6 w-6 text-orange-600" />
                      </div>
                      <h3 className="font-semibold mb-2">GDPR Compliant</h3>
                      <p className="text-sm text-muted-foreground">We comply with GDPR, CCPA, and other privacy regulations.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Detailed Sections */}
        <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
          <div className="container-fluid">
            <div className="max-w-4xl mx-auto space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="card-elevated">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <div className="text-primary">
                            {section.icon}
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold">{section.title}</h2>
                      </div>
                      
                      <div className="space-y-6">
                        {section.content.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            <h3 className="text-lg font-semibold mb-3">{item.subtitle}</h3>
                            <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding">
          <div className="container-fluid">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="card-elevated">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    If you have any questions about this Privacy Policy or how we handle your data, 
                    please don't hesitate to contact our privacy team.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium">Privacy Officer</p>
                    <p className="text-muted-foreground">
                      <a href="mailto:privacy@wordcraft.com" className="text-primary hover:underline">
                        privacy@wordcraft.com
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                      WordCraft Privacy Team<br />
                      123 Privacy Street<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
          <div className="container-fluid">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="card-elevated">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-center">Quick Navigation</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {sections.map((section, index) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="text-primary">
                          {section.icon}
                        </div>
                        <span className="font-medium">{section.title}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}