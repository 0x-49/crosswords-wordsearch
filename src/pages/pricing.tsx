import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import Layout from "@/components/Layout";
import { 
  CheckCircle,
  X,
  Sparkles,
  ArrowRight,
  Zap,
  Crown,
  Rocket,
  Star,
  Users,
  Building,
  HelpCircle
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

export default function Pricing() {
  const [isAnnual, setIsAnnual] = React.useState(false);

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started with puzzle creation",
      monthlyPrice: 0,
      annualPrice: 0,
      icon: <Sparkles className="h-6 w-6" />,
      color: "text-gray-600",
      bgColor: "bg-gray-50 dark:bg-gray-950",
      features: [
        "5 puzzles per month",
        "Basic themes (10 available)",
        "Standard PDF export",
        "Community support",
        "Basic customization",
        "Personal use license"
      ],
      limitations: [
        "Limited themes",
        "Basic export options",
        "Community support only",
        "WordCraft watermark"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      description: "Ideal for serious publishers and content creators",
      monthlyPrice: 19,
      annualPrice: 15,
      icon: <Zap className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      features: [
        "Unlimited puzzles",
        "All 100+ themes",
        "HD PDF export",
        "Priority email support",
        "Advanced customization",
        "Commercial use license",
        "Batch processing",
        "Custom branding",
        "Analytics dashboard",
        "API access"
      ],
      limitations: [],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For teams and large-scale publishing operations",
      monthlyPrice: 99,
      annualPrice: 79,
      icon: <Crown className="h-6 w-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "White-label solution",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "Advanced analytics",
        "Bulk licensing",
        "Custom themes",
        "Priority feature requests"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Can I change plans at any time?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
    },
    {
      question: "What's included in the free plan?",
      answer: "The free plan includes 5 puzzles per month, access to 10 basic themes, standard PDF export, and community support. Perfect for trying out WordCraft!"
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund."
    },
    {
      question: "Can I use puzzles commercially?",
      answer: "Yes! Pro and Enterprise plans include commercial use licenses. You can sell books created with WordCraft on platforms like Amazon KDP."
    },
    {
      question: "Is there a limit on team members?",
      answer: "The Pro plan is for individual use. Enterprise plans support unlimited team members with collaboration features."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers. All payments are processed securely."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "KDP Publisher",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content: "WordCraft transformed my publishing business. I've created over 50 puzzle books and they're all bestsellers on Amazon!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Content Creator",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: "The AI-powered generation is incredible. What used to take me hours now takes minutes, and the quality is even better.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Educational Publisher",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "Perfect for creating educational materials. The accessibility features make our puzzles inclusive for all students.",
      rating: 5
    }
  ];

  return (
    <Layout
      title="Pricing - WordCraft Puzzle Generator"
      description="Choose the perfect WordCraft plan for your puzzle book publishing needs. Free plan available with Pro and Enterprise options for serious publishers."
      keywords="wordcraft pricing, puzzle generator cost, KDP publishing plans, word search creator pricing, crossword generator subscription"
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
                  Simple Pricing
                </Badge>
                <h1 className="heading-xl text-gradient mb-8">
                  Choose Your Perfect Plan
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                  Start free and scale as you grow. All plans include our core features with no hidden fees or surprise charges.
                </p>
                
                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 mb-12">
                  <span className={`text-lg font-medium ${!isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
                    Monthly
                  </span>
                  <Switch
                    checked={isAnnual}
                    onCheckedChange={setIsAnnual}
                    className="data-[state=checked]:bg-primary"
                  />
                  <span className={`text-lg font-medium ${isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
                    Annual
                  </span>
                  <Badge variant="secondary" className="ml-2">
                    Save 20%
                  </Badge>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="section-padding">
          <div className="container-fluid">
            <motion.div 
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {plans.map((plan, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className={`card-interactive h-full relative ${plan.popular ? 'ring-2 ring-primary shadow-xl scale-105' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground px-4 py-1">
                          <Star className="w-4 h-4 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-8">
                      <div className={`${plan.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <div className={plan.color}>
                          {plan.icon}
                        </div>
                      </div>
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <CardDescription className="text-base mb-6">
                        {plan.description}
                      </CardDescription>
                      
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold">
                            ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                          </span>
                          <span className="text-muted-foreground">
                            /{isAnnual ? 'month' : 'month'}
                          </span>
                        </div>
                        {isAnnual && plan.monthlyPrice > 0 && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Billed annually (${plan.annualPrice * 12}/year)
                          </p>
                        )}
                      </div>
                      
                      <Link href={plan.name === 'Enterprise' ? '/contact' : '/signup'}>
                        <Button 
                          className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                          variant={plan.popular ? 'default' : 'outline'}
                          size="lg"
                        >
                          {plan.cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            What's included:
                          </h4>
                          <ul className="space-y-2">
                            {plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {plan.limitations.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2 text-muted-foreground">
                              <X className="h-4 w-4" />
                              Limitations:
                            </h4>
                            <ul className="space-y-2">
                              {plan.limitations.map((limitation, limitIndex) => (
                                <li key={limitIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <X className="h-4 w-4 flex-shrink-0" />
                                  {limitation}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
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
                <Users className="w-4 h-4 mr-2" />
                Plan Comparison
              </Badge>
              <h2 className="heading-lg mb-6">
                Compare All Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See exactly what's included in each plan to make the best choice for your needs.
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
                        <th className="text-center p-6 font-semibold">Free</th>
                        <th className="text-center p-6 font-semibold text-primary">Pro</th>
                        <th className="text-center p-6 font-semibold">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Puzzles per month", "5", "Unlimited", "Unlimited"],
                        ["Available themes", "10", "100+", "100+ + Custom"],
                        ["PDF export quality", "Standard", "HD", "HD + White-label"],
                        ["Support", "Community", "Priority Email", "Dedicated Manager"],
                        ["Commercial license", "❌", "✅", "✅"],
                        ["Custom branding", "❌", "✅", "✅"],
                        ["Team collaboration", "❌", "❌", "✅"],
                        ["API access", "❌", "✅", "✅"],
                        ["Analytics", "Basic", "Advanced", "Enterprise"],
                        ["SLA guarantee", "❌", "❌", "✅"]
                      ].map(([feature, free, pro, enterprise], index) => (
                        <tr key={index} className="border-t border-border/50">
                          <td className="p-6 font-medium">{feature}</td>
                          <td className="p-6 text-center text-sm">{free}</td>
                          <td className="p-6 text-center text-sm font-medium text-primary">{pro}</td>
                          <td className="p-6 text-center text-sm">{enterprise}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
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
                <Star className="w-4 h-4 mr-2" />
                Customer Stories
              </Badge>
              <h2 className="heading-lg mb-6">
                Loved by Publishers Worldwide
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See what our customers are saying about WordCraft and how it's transformed their publishing business.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="card-interactive h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-3">
                        <img 
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-sm">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
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
                <HelpCircle className="w-4 h-4 mr-2" />
                FAQ
              </Badge>
              <h2 className="heading-lg mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Got questions? We've got answers. Can't find what you're looking for? Contact our support team.
              </p>
            </motion.div>
            
            <motion.div 
              className="max-w-4xl mx-auto space-y-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {faqs.map((faq, index) => (
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
                  Ready to Start?
                </Badge>
                <h2 className="heading-lg mb-6">
                  Start Your Publishing Journey Today
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Join thousands of successful publishers who trust WordCraft to create amazing puzzle books.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
                  <Link href="/signup">
                    <Button size="xl" variant="gradient" className="group">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="xl">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>No setup fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Cancel anytime</span>
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