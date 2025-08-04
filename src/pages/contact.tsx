import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Building,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Globe,
  Headphones,
  BookOpen,
  Zap
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Get help from our support team",
      contact: "support@wordcraft.com",
      action: "mailto:support@wordcraft.com",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+1 (555) 012-3456",
      action: "tel:+1-555-012-3456",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available 24/7",
      action: "#",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office Location",
      description: "Visit us in person",
      contact: "San Francisco, CA",
      action: "#",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950"
    }
  ];

  const supportOptions = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Help Center",
      description: "Browse our comprehensive knowledge base with tutorials, guides, and FAQs.",
      link: "/help",
      color: "text-blue-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Forum",
      description: "Connect with other users, share tips, and get answers from the community.",
      link: "/community",
      color: "text-green-600"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Feature Requests",
      description: "Suggest new features or improvements to help us build a better product.",
      link: "/feedback",
      color: "text-purple-600"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM PST" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM PST" },
    { day: "Sunday", hours: "Closed" }
  ];

  return (
    <Layout
      title="Contact WordCraft - Get Support & Sales Help"
      description="Get in touch with WordCraft support team. Contact us for sales inquiries, technical support, or general questions about our puzzle book generator."
      keywords="contact wordcraft, puzzle generator support, KDP publishing help, word search creator contact, customer service"
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
                  Get in Touch
                </Badge>
                <h1 className="heading-xl text-gradient mb-8">
                  Contact Our Team
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                  Have questions about WordCraft? Need help getting started? Our friendly team is here to help you succeed.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="section-padding">
          <div className="container-fluid">
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {contactMethods.map((method, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="card-interactive h-full text-center group">
                    <CardContent className="p-8">
                      <div className={`${method.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <div className={method.color}>
                          {method.icon}
                        </div>
                      </div>
                      <CardTitle className="text-lg mb-2">{method.title}</CardTitle>
                      <CardDescription className="text-sm mb-4">
                        {method.description}
                      </CardDescription>
                      <a 
                        href={method.action}
                        className="text-primary font-medium hover:underline"
                      >
                        {method.contact}
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Main Contact Form */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-2xl mb-2">Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium mb-2">
                            Company (Optional)
                          </label>
                          <Input
                            id="company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Your company name"
                          />
                        </div>
                        <div>
                          <label htmlFor="inquiryType" className="block text-sm font-medium mb-2">
                            Inquiry Type *
                          </label>
                          <Select onValueChange={handleSelectChange} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sales">Sales Inquiry</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                              <SelectItem value="billing">Billing Question</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Brief description of your inquiry"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Please provide details about your inquiry..."
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full group">
                        Send Message
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Office Hours */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Office Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {officeHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                          <span className="font-medium">{schedule.day}</span>
                          <span className="text-muted-foreground">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Headphones className="h-4 w-4 text-primary" />
                        <span className="font-medium">24/7 Live Chat Available</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Get instant help anytime with our live chat support.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Response Time */}
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Quick Response</h3>
                        <p className="text-sm text-muted-foreground">We typically respond within 2-4 hours</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>Available in multiple languages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Dedicated support team</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span>Enterprise support available</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card className="card-elevated border-orange-200 dark:border-orange-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-950 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-orange-900 dark:text-orange-100">
                          Enterprise Emergency
                        </h3>
                        <p className="text-sm text-orange-700 dark:text-orange-300">
                          For critical issues affecting your business
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                      +1 (555) 999-HELP
                    </p>
                    <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                      Available 24/7 for Enterprise customers
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Support Options */}
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
                <Headphones className="w-4 h-4 mr-2" />
                Self-Service Options
              </Badge>
              <h2 className="heading-lg mb-6">
                Find Answers Instantly
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Sometimes you need answers right away. Check out these resources for immediate help.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {supportOptions.map((option, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="card-interactive h-full text-center group">
                    <CardContent className="p-8">
                      <div className={`${option.color} mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {option.icon}
                      </div>
                      <CardTitle className="text-xl mb-4">{option.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed mb-6">
                        {option.description}
                      </CardDescription>
                      <Button variant="outline" className="group" asChild>
                        <a href={option.link}>
                          Visit {option.title}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="section-padding">
          <div className="container-fluid">
            <motion.div 
              className="text-center mb-20"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="heading-lg mb-6">
                Common Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Quick answers to the most frequently asked questions.
              </p>
            </motion.div>
            
            <motion.div 
              className="max-w-4xl mx-auto space-y-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                {
                  question: "How quickly can I get started with WordCraft?",
                  answer: "You can start creating puzzles immediately after signing up. Our free plan gives you instant access to basic features, and you can upgrade anytime for more advanced capabilities."
                },
                {
                  question: "Do you offer training or onboarding?",
                  answer: "Yes! We provide comprehensive tutorials, video guides, and personalized onboarding for Enterprise customers. Our support team is also available to help you get started."
                },
                {
                  question: "Can I get a demo before purchasing?",
                  answer: "Absolutely! You can try our free plan or schedule a personalized demo with our sales team to see how WordCraft can meet your specific needs."
                }
              ].map((faq, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="card-elevated">
                    <CardContent className="p-8">
                      <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}