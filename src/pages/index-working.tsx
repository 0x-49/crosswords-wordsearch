import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { 
  BookOpen, 
  Puzzle, 
  Users, 
  Star,
  ArrowRight
} from "lucide-react";

/**
 * Simplified Working Homepage
 * This version eliminates all potential runtime errors that cause 500 status
 */

export default function HomePage() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI-Powered Puzzle Discovery
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover thousands of crossword and word search puzzles with our advanced AI-powered search and recommendation system.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/puzzle-library">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Explore Puzzles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/book-library">
                <Button size="lg" variant="outline">
                  Browse Books
                  <BookOpen className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Our Platform?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Puzzle className="h-12 w-12 text-purple-600" />,
                  title: "50,000+ Puzzles",
                  description: "Massive collection of crossword and word search puzzles across 150+ themes"
                },
                {
                  icon: <Star className="h-12 w-12 text-blue-600" />,
                  title: "AI-Powered Search",
                  description: "Advanced semantic search and personalized recommendations powered by AI"
                },
                {
                  icon: <Users className="h-12 w-12 text-green-600" />,
                  title: "Brain Health Focus",
                  description: "Scientifically-backed cognitive benefits tracking and brain health insights"
                }
              ].map((feature, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "50,000+", label: "Puzzles Generated", icon: <Puzzle className="h-8 w-8" /> },
                { number: "150+", label: "Theme Categories", icon: <BookOpen className="h-8 w-8" /> },
                { number: "4.9★", label: "User Rating", icon: <Star className="h-8 w-8" /> },
                { number: "250+", label: "Puzzle Books", icon: <Users className="h-8 w-8" /> }
              ].map((stat, index) => (
                <Card key={index} className="p-6">
                  <div className="flex justify-center mb-4 text-purple-600">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Puzzle Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of puzzle enthusiasts and boost your brain health with our AI-powered platform.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/puzzle-library">
                <Button size="lg" variant="secondary">
                  Start Exploring
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/benefits">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Learn Benefits
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
