import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  Brain, 
  BookOpen, 
  Target, 
  Heart, 
  Zap, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Award,
  BarChart3,
  Lightbulb,
  Star
} from 'lucide-react';
import { calculateCognitiveScore, getPersonalizedBenefitRecommendations, CognitiveStats, BenefitTag, BENEFIT_TAGS } from '@/lib/benefitTags';

interface CognitiveTrackerProps {
  userId: string;
  className?: string;
}

const CognitiveTracker: React.FC<CognitiveTrackerProps> = ({ userId, className = '' }) => {
  const [stats, setStats] = useState<CognitiveStats>({
    totalPuzzlesSolved: 0,
    memoryPuzzles: 0,
    vocabularyPuzzles: 0,
    focusPuzzles: 0,
    problemSolvingPuzzles: 0,
    stressReliefPuzzles: 0,
    speedPuzzles: 0,
    averageDifficulty: 1,
    streakDays: 0,
    lastPlayDate: '',
    cognitiveScore: 0
  });

  const [showDetails, setShowDetails] = useState(false);
  const [recommendations, setRecommendations] = useState<{recommended: BenefitTag[]; reason: string}[]>([]);

  useEffect(() => {
    // Load cognitive stats from localStorage (in production, this would come from database)
    loadCognitiveStats();
  }, [userId]);

  const loadCognitiveStats = () => {
    try {
      const savedStats = localStorage.getItem(`cognitive_stats_${userId}`);
      if (savedStats) {
        const parsedStats = JSON.parse(savedStats);
        const cognitiveScore = calculateCognitiveScore(parsedStats);
        const updatedStats = { ...parsedStats, cognitiveScore };
        setStats(updatedStats);
        setRecommendations(getPersonalizedBenefitRecommendations(updatedStats));
      } else {
        // Initialize with sample data for demo
        const initialStats: CognitiveStats = {
          totalPuzzlesSolved: 23,
          memoryPuzzles: 8,
          vocabularyPuzzles: 5,
          focusPuzzles: 6,
          problemSolvingPuzzles: 3,
          stressReliefPuzzles: 1,
          speedPuzzles: 0,
          averageDifficulty: 2.1,
          streakDays: 5,
          lastPlayDate: new Date().toISOString().split('T')[0],
          cognitiveScore: 0
        };
        const cognitiveScore = calculateCognitiveScore(initialStats);
        const completeStats = { ...initialStats, cognitiveScore };
        setStats(completeStats);
        setRecommendations(getPersonalizedBenefitRecommendations(completeStats));
        localStorage.setItem(`cognitive_stats_${userId}`, JSON.stringify(completeStats));
      }
    } catch (error) {
      console.error('Error loading cognitive stats:', error);
    }
  };

  const updatePuzzleStats = (puzzleType: string, difficulty: string) => {
    // This would be called when a puzzle is completed
    const newStats = { ...stats };
    newStats.totalPuzzlesSolved += 1;
    
    // Update specific benefit counters based on puzzle theme/type
    // This is a simplified version - in production, you'd use the benefit tags system
    if (puzzleType.includes('memory') || puzzleType.includes('animal')) {
      newStats.memoryPuzzles += 1;
    }
    if (puzzleType.includes('vocabulary') || puzzleType.includes('language')) {
      newStats.vocabularyPuzzles += 1;
    }
    
    // Update average difficulty
    const difficultyValue = difficulty === 'Easy' ? 1 : difficulty === 'Medium' ? 2 : 3;
    newStats.averageDifficulty = (
      (newStats.averageDifficulty * (newStats.totalPuzzlesSolved - 1) + difficultyValue) / 
      newStats.totalPuzzlesSolved
    );
    
    // Update cognitive score
    newStats.cognitiveScore = calculateCognitiveScore(newStats);
    
    setStats(newStats);
    setRecommendations(getPersonalizedBenefitRecommendations(newStats));
    localStorage.setItem(`cognitive_stats_${userId}`, JSON.stringify(newStats));
  };

  const getCognitiveLevel = (score: number): { level: string; color: string; icon: React.ComponentType } => {
    if (score >= 80) return { level: 'Expert', color: 'purple', icon: Trophy };
    if (score >= 60) return { level: 'Advanced', color: 'blue', icon: Award };
    if (score >= 40) return { level: 'Intermediate', color: 'green', icon: Target };
    if (score >= 20) return { level: 'Developing', color: 'orange', icon: TrendingUp };
    return { level: 'Beginner', color: 'gray', icon: Star };
  };

  const cognitiveLevel = getCognitiveLevel(stats.cognitiveScore);
  const IconComponent = cognitiveLevel.icon;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Cognitive Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Brain className="w-8 h-8 text-blue-500 mr-2" />
              <CardTitle className="text-2xl text-blue-700">Cognitive Health Score</CardTitle>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <IconComponent className="w-6 h-6 text-purple-500" />
              <Badge variant="secondary" className={`bg-${cognitiveLevel.color}-100 text-${cognitiveLevel.color}-700`}>
                {cognitiveLevel.level}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {stats.cognitiveScore}/100
              </div>
              <Progress value={stats.cognitiveScore} className="w-full h-3" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalPuzzlesSolved}</div>
                <div className="text-sm text-gray-600">Puzzles Solved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.streakDays}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.averageDifficulty.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Avg Difficulty</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((stats.cognitiveScore / 100) * 50)}%
                </div>
                <div className="text-sm text-gray-600">Memory Boost</div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {showDetails ? 'Hide Details' : 'View Detailed Stats'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Stats */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Cognitive Benefit Breakdown
              </CardTitle>
              <CardDescription>
                Track your progress across different cognitive areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <Brain className="w-5 h-5 text-purple-500 mr-2" />
                    <span className="font-medium">Memory</span>
                  </div>
                  <Badge variant="secondary">{stats.memoryPuzzles} puzzles</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 text-green-500 mr-2" />
                    <span className="font-medium">Vocabulary</span>
                  </div>
                  <Badge variant="secondary">{stats.vocabularyPuzzles} puzzles</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 text-orange-500 mr-2" />
                    <span className="font-medium">Focus</span>
                  </div>
                  <Badge variant="secondary">{stats.focusPuzzles} puzzles</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Lightbulb className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="font-medium">Problem Solving</span>
                  </div>
                  <Badge variant="secondary">{stats.problemSolvingPuzzles} puzzles</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-red-500 mr-2" />
                    <span className="font-medium">Stress Relief</span>
                  </div>
                  <Badge variant="secondary">{stats.stressReliefPuzzles} puzzles</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="font-medium">Speed</span>
                  </div>
                  <Badge variant="secondary">{stats.speedPuzzles} puzzles</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Personalized Recommendations */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription>
                AI-powered suggestions to boost your cognitive training
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex space-x-2">
                        {rec.recommended.map((benefit, idx) => (
                          <Badge key={idx} variant="secondary" className={`bg-${benefit.color}-100 text-${benefit.color}-700`}>
                            {benefit.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{rec.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Research Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <Award className="w-5 h-5 mr-2" />
              Your Brain Health Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Research-Backed Progress:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Memory improvement: ~{Math.round((stats.memoryPuzzles / stats.totalPuzzlesSolved) * 30)}% boost expected</li>
                  <li>• Vocabulary growth: ~{stats.vocabularyPuzzles * 13} new words learned</li>
                  <li>• Stress reduction: {stats.stressReliefPuzzles > 0 ? 'Active' : 'Try stress-relief puzzles!'}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Cognitive Protection:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Daily practice builds cognitive reserve</li>
                  <li>• May delay cognitive decline by 2.5 years</li>
                  <li>• Current streak: {stats.streakDays} days strong!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CognitiveTracker;
