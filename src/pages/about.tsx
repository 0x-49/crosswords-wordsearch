import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { 
  Users, 
  Target, 
  Heart, 
  Award,
  Sparkles,
  ArrowRight,
  BookOpen,
  Puzzle,
  Globe,
  Lightbulb,
  Rocket,
  Shield
} from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Former Amazon KDP publisher with 10+ years experience. Built WordCraft to solve the puzzle creation challenges she faced.",
      expertise: ["Publishing Strategy", "Product Vision", "Market Research"]
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "AI researcher and software architect. Specializes in algorithm optimization and puzzle generation systems.",
      expertise: ["AI Development", "System Architecture", "Algorithm Design"]
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "UX designer passionate about accessibility. Ensures our puzzles are beautiful and inclusive for all users.",
      expertise: ["UX Design", "Accessibility", "Visual Design"]
    },
    {
      name: "David Kim",
      role: "Senior Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Full-stack developer with expertise in puzzle algorithms and PDF generation systems.",
      expertise: ["Full-Stack Development", "PDF Generation", "Performance Optimization"]
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Accessibility First",
      description: "We believe puzzles should be enjoyable for everyone, regardless of age or ability. Our designs prioritize clarity and inclusivity.",
      color: "text-red-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Guaranteed",
      description: "Every puzzle undergoes rigorous testing to ensure it's solvable, engaging, and meets professional publishing standards.",
      color: "text-blue-500"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation Driven",
      description: "We continuously push the boundaries of puzzle generation technology to provide the best tools for creators.",
      color: "text-yellow-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Focused",
      description: "Our success is measured by the success of our users. We're committed to supporting the publishing community.",
      color: "text-green-500"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "The Idea",
      description: "Sarah struggled with creating quality puzzles for her KDP books, spending hours on manual creation."
    },
    {
      year: "2021",
      title: "First Prototype",
      description: "Michael joined to build the first AI-powered puzzle generator, focusing on word search algorithms."
    },
    {
      year: "2022",
      title: "Beta Launch",
      description: "Launched beta version with 50 early users, generating over 1,000 puzzles in the first month."
    },
    {
      year: "2023",
      title: "Public Release",
      description: "Official launch with crossword support, accessibility features, and KDP-ready exports."
    },
    {
      year: "2024",
      title: "Scale & Growth",
      description: "Reached 10,000+ users, 100+ themes, and partnerships with major publishing platforms."
    }
  ];

  return (
    <Layout
      title="About WordCraft - Our Story & Mission"
      description="Learn about WordCraft's mission to democratize puzzle book publishing. Meet our team and discover how we're helping thousands of publishers succeed."
      keywords="about wordcraft, puzzle book publishing, KDP publishing team, word search creator story, crossword generator company"
    >
      <div className="bg-background">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
          <div className="container-fluid">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6 text-sm px-6 py-3 rounded-full shadow-soft">
                <Sparkles className="w-4 h-4 mr-2" />
                Our Story
              </Badge>
              <h1 className="heading-xl text-gradient mb-8">
                About WordCraft
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                We're on a mission to democratize puzzle book publishing, making it easy for anyone to create professional-quality puzzle books that delight readers worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="story" className="section-padding">
          <div className="container-fluid">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge variant="outline" className="mb-6 px-4 py-2">
                  <Target className="w-4 h-4 mr-2" />
                  Our Mission
                </Badge>
                <h2 className="heading-lg mb-6">
                  Empowering Publishers Worldwide
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  WordCraft was born from a simple frustration: creating quality puzzle books was too time-consuming and expensive. Our founder, Sarah, spent countless hours manually creating word searches for her KDP books, often sacrificing quality for speed.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We believe that everyone should have access to professional-grade puzzle creation tools, regardless of their technical expertise or budget. That's why we've built WordCraft to be powerful yet intuitive, comprehensive yet affordable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="group">
                      Join Our Mission
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-intense">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center"
                    alt="WordCraft team collaborating on puzzle generation algorithms"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
          <div className="container-fluid">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-6 px-4 py-2">
                <Heart className="w-4 h-4 mr-2" />
                Our Values
              </Badge>
              <h2 className="heading-lg mb-6">
                What Drives Us Forward
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our core values guide every decision we make and every feature we build.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index}>
                  <Card className="card-interactive h-full text-center group">
                    <CardContent className="p-8">
                      <div className={`${value.color} mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {value.icon}
                      </div>
                      <CardTitle className="text-xl mb-4">{value.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="section-padding">
          <div className="container-fluid">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-6 px-4 py-2">
                <Rocket className="w-4 h-4 mr-2" />
                Our Journey
              </Badge>
              <h2 className="heading-lg mb-6">
                From Idea to Impact
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how WordCraft evolved from a simple idea to a platform serving thousands of publishers.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-8 mb-12 last:mb-0">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-strong">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-2xl font-semibold mb-3">{milestone.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="section-padding bg-gradient-to-b from-secondary/20 to-background">
          <div className="container-fluid">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-6 px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Meet the Team
              </Badge>
              <h2 className="heading-lg mb-6">
                The People Behind WordCraft
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our diverse team combines expertise in publishing, technology, and design to create the best puzzle generation platform.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index}>
                  <Card className="card-interactive h-full group">
                    <CardContent className="p-6">
                      <div className="relative mb-6">
                        <img 
                          src={member.image}
                          alt={member.name}
                          className="w-24 h-24 rounded-full mx-auto object-cover shadow-medium group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardTitle className="text-xl mb-2 text-center">{member.name}</CardTitle>
                      <p className="text-primary font-medium text-center mb-4">{member.role}</p>
                      <CardDescription className="text-sm leading-relaxed mb-4 text-center">
                        {member.bio}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.expertise.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding">
          <div className="container-fluid">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "10,000+", label: "Active Publishers", icon: <Users className="h-8 w-8" />, color: "text-purple-600" },
                { number: "500,000+", label: "Puzzles Created", icon: <Puzzle className="h-8 w-8" />, color: "text-blue-600" },
                { number: "100+", label: "Countries Served", icon: <Globe className="h-8 w-8" />, color: "text-green-600" },
                { number: "2M+", label: "Books Published", icon: <BookOpen className="h-8 w-8" />, color: "text-orange-600" }
              ].map((stat, index) => (
                <div key={index}>
                  <Card className="text-center card-elevated group">
                    <CardContent className="p-8">
                      <div className={`${stat.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {stat.icon}
                      </div>
                      <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                      <div className="text-muted-foreground font-medium">{stat.label}</div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
          <div className="container-fluid">
            <div className="text-center max-w-4xl mx-auto">
              <Card className="card-elevated p-12">
                <Badge variant="secondary" className="mb-6 px-4 py-2">
                  <Rocket className="w-4 h-4 mr-2" />
                  Join Our Story
                </Badge>
                <h2 className="heading-lg mb-6">
                  Ready to Start Your Publishing Journey?
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Join thousands of successful publishers who trust WordCraft to bring their puzzle book ideas to life.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/signup">
                    <Button size="xl" variant="gradient" className="group">
                      Start Creating Today
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="xl">
                      Contact Our Team
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}