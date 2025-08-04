import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { FileText, Scale, Shield, AlertTriangle, Clock, Mail, Users, Globe } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

export default function Terms() {
  const lastUpdated = "January 15, 2024";

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: <Scale className="h-5 w-5" />,
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing and using WordCraft, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
        },
        {
          subtitle: "Modifications",
          text: "We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the platform. Continued use of the service after changes constitutes acceptance of the new terms."
        },
        {
          subtitle: "Eligibility",
          text: "You must be at least 13 years old to use WordCraft. If you are under 18, you must have parental consent to use our services."
        }
      ]
    },
    {
      id: "service-description",
      title: "Service Description",
      icon: <FileText className="h-5 w-5" />,
      content: [
        {
          subtitle: "WordCraft Platform",
          text: "WordCraft is a web-based platform that enables users to create word search puzzles, crosswords, and puzzle books for personal and commercial use."
        },
        {
          subtitle: "Features and Functionality",
          text: "Our service includes puzzle generation tools, templates, themes, export capabilities, and related features as described on our website and in our documentation."
        },
        {
          subtitle: "Service Availability",
          text: "We strive to maintain high availability but do not guarantee uninterrupted access. We may temporarily suspend service for maintenance, updates, or other operational reasons."
        }
      ]
    },
    {
      id: "user-accounts",
      title: "User Accounts and Registration",
      icon: <Users className="h-5 w-5" />,
      content: [
        {
          subtitle: "Account Creation",
          text: "To access certain features, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials."
        },
        {
          subtitle: "Account Security",
          text: "You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use of your account or any other breach of security."
        },
        {
          subtitle: "Account Termination",
          text: "We reserve the right to terminate or suspend accounts that violate these terms, engage in fraudulent activity, or for any other reason at our sole discretion."
        }
      ]
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use Policy",
      icon: <Shield className="h-5 w-5" />,
      content: [
        {
          subtitle: "Permitted Uses",
          text: "You may use WordCraft to create puzzles for personal, educational, and commercial purposes in accordance with your subscription plan and applicable laws."
        },
        {
          subtitle: "Prohibited Activities",
          text: "You may not use WordCraft to create content that is illegal, harmful, threatening, abusive, defamatory, or infringes on intellectual property rights of others."
        },
        {
          subtitle: "Content Standards",
          text: "All puzzles and content created must comply with applicable laws and regulations. We reserve the right to remove content that violates these standards."
        },
        {
          subtitle: "System Integrity",
          text: "You may not attempt to interfere with, compromise, or disrupt the security or functionality of WordCraft or its related systems."
        }
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      icon: <FileText className="h-5 w-5" />,
      content: [
        {
          subtitle: "WordCraft Ownership",
          text: "WordCraft and all related software, technology, and content are owned by us and protected by intellectual property laws. You receive a limited license to use the service."
        },
        {
          subtitle: "User Content",
          text: "You retain ownership of puzzles and content you create using WordCraft. By using our service, you grant us a license to store, process, and display your content as necessary to provide the service."
        },
        {
          subtitle: "Third-Party Content",
          text: "Some themes, templates, or word lists may be licensed from third parties. Use of such content is subject to the applicable third-party licenses."
        },
        {
          subtitle: "Trademark Rights",
          text: "WordCraft trademarks and logos are our property. You may not use them without our express written permission."
        }
      ]
    },
    {
      id: "payment-terms",
      title: "Payment and Subscription Terms",
      icon: <Scale className="h-5 w-5" />,
      content: [
        {
          subtitle: "Subscription Plans",
          text: "WordCraft offers various subscription plans with different features and usage limits. Current pricing and plan details are available on our website."
        },
        {
          subtitle: "Payment Processing",
          text: "Payments are processed by third-party payment processors. By providing payment information, you authorize us to charge the applicable fees."
        },
        {
          subtitle: "Billing and Renewals",
          text: "Subscriptions automatically renew unless cancelled. You will be charged the then-current rate for your plan. We will provide notice of any price changes."
        },
        {
          subtitle: "Refunds and Cancellations",
          text: "You may cancel your subscription at any time. Refunds are provided in accordance with our refund policy as stated on our website."
        }
      ]
    },
    {
      id: "privacy-data",
      title: "Privacy and Data Protection",
      icon: <Shield className="h-5 w-5" />,
      content: [
        {
          subtitle: "Privacy Policy",
          text: "Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these terms by reference."
        },
        {
          subtitle: "Data Security",
          text: "We implement appropriate technical and organizational measures to protect your personal information and puzzle content."
        },
        {
          subtitle: "Data Retention",
          text: "We retain your data as necessary to provide services and as required by law. You may request deletion of your data subject to certain limitations."
        }
      ]
    },
    {
      id: "disclaimers",
      title: "Disclaimers and Limitations",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: [
        {
          subtitle: "Service Warranty",
          text: "WordCraft is provided 'as is' without warranties of any kind. We do not guarantee that the service will be error-free, secure, or continuously available."
        },
        {
          subtitle: "Limitation of Liability",
          text: "Our liability is limited to the maximum extent permitted by law. We are not liable for indirect, incidental, or consequential damages arising from your use of WordCraft."
        },
        {
          subtitle: "User Responsibility",
          text: "You are responsible for your use of WordCraft and any content you create. We are not responsible for the accuracy, quality, or legality of user-generated content."
        }
      ]
    },
    {
      id: "termination",
      title: "Termination",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: [
        {
          subtitle: "Termination by User",
          text: "You may terminate your account at any time by following the cancellation process in your account settings or contacting support."
        },
        {
          subtitle: "Termination by WordCraft",
          text: "We may terminate or suspend your access immediately, without prior notice, for conduct that we believe violates these terms or is harmful to other users."
        },
        {
          subtitle: "Effect of Termination",
          text: "Upon termination, your right to use WordCraft ceases immediately. We may delete your account and data, though some information may be retained as required by law."
        }
      ]
    },
    {
      id: "governing-law",
      title: "Governing Law and Disputes",
      icon: <Globe className="h-5 w-5" />,
      content: [
        {
          subtitle: "Applicable Law",
          text: "These terms are governed by the laws of the State of California, United States, without regard to conflict of law principles."
        },
        {
          subtitle: "Dispute Resolution",
          text: "Any disputes arising from these terms or your use of WordCraft will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association."
        },
        {
          subtitle: "Jurisdiction",
          text: "Any legal proceedings that cannot be resolved through arbitration will be conducted in the state and federal courts located in San Francisco, California."
        }
      ]
    }
  ];

  return (
    <Layout
      title="Terms of Service - WordCraft"
      description="Read WordCraft's Terms of Service to understand your rights and responsibilities when using our puzzle book generator platform."
      keywords="wordcraft terms of service, user agreement, terms and conditions, legal terms, service agreement"
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
                <FileText className="w-4 h-4 mr-2" />
                Terms of Service
              </Badge>
              <h1 className="heading-xl text-gradient mb-8">
                Terms of Service
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                These terms govern your use of WordCraft and outline the rights and responsibilities of both parties.
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
                  <h2 className="text-2xl font-bold mb-6 text-center">Terms Summary</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center mx-auto mb-3">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Fair Usage</h3>
                      <p className="text-sm text-muted-foreground">Use WordCraft responsibly and in accordance with our acceptable use policy.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center mx-auto mb-3">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Your Content</h3>
                      <p className="text-sm text-muted-foreground">You own the puzzles you create and can use them commercially per your plan.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-950 flex items-center justify-center mx-auto mb-3">
                        <Scale className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Clear Terms</h3>
                      <p className="text-sm text-muted-foreground">Transparent terms with no hidden clauses or unexpected restrictions.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-950 flex items-center justify-center mx-auto mb-3">
                        <Shield className="h-6 w-6 text-orange-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Protected Rights</h3>
                      <p className="text-sm text-muted-foreground">Your rights are protected while ensuring fair use for all users.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="section-padding">
          <div className="container-fluid">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="card-elevated border-orange-200 dark:border-orange-800 mb-16">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-950 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-orange-900 dark:text-orange-100">
                        Important Legal Notice
                      </h3>
                      <p className="text-orange-800 dark:text-orange-200 leading-relaxed">
                        These Terms of Service constitute a legally binding agreement between you and WordCraft. 
                        Please read them carefully before using our service. By using WordCraft, you agree to be 
                        bound by these terms. If you do not agree with any part of these terms, you may not use our service.
                      </p>
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
                  <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    If you have any questions about these Terms of Service or need clarification 
                    on any provisions, please contact our legal team.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium">Legal Department</p>
                    <p className="text-muted-foreground">
                      <a href="mailto:legal@wordcraft.com" className="text-primary hover:underline">
                        legal@wordcraft.com
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                      WordCraft Legal Team<br />
                      123 Legal Street<br />
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

        {/* Effective Date */}
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
                  <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Effective Date</h3>
                  <p className="text-muted-foreground mb-4">
                    These Terms of Service are effective as of {lastUpdated} and will remain in effect 
                    until modified or terminated in accordance with the terms herein.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We will notify users of any material changes to these terms via email or through 
                    prominent notices on our platform at least 30 days before the changes take effect.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}