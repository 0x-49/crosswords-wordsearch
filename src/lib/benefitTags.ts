/**
 * Benefit Tags System for Cognitive Enhancement
 * Maps puzzle themes to research-backed cognitive benefits
 */

export interface BenefitTag {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  researchBacked: boolean;
  cognitiveArea: 'memory' | 'vocabulary' | 'attention' | 'problem-solving' | 'stress-relief' | 'processing-speed';
}

export const BENEFIT_TAGS: Record<string, BenefitTag> = {
  memory_boost: {
    id: 'memory_boost',
    name: 'Memory Boost',
    description: 'Enhances working memory and recall abilities',
    color: 'purple',
    icon: 'brain',
    researchBacked: true,
    cognitiveArea: 'memory'
  },
  vocabulary_builder: {
    id: 'vocabulary_builder',
    name: 'Vocabulary Builder',
    description: 'Expands vocabulary through contextual learning',
    color: 'green',
    icon: 'book-open',
    researchBacked: true,
    cognitiveArea: 'vocabulary'
  },
  stress_relief: {
    id: 'stress_relief',
    name: 'Stress Relief',
    description: 'Promotes relaxation and reduces cortisol levels',
    color: 'blue',
    icon: 'heart',
    researchBacked: true,
    cognitiveArea: 'stress-relief'
  },
  focus_enhancer: {
    id: 'focus_enhancer',
    name: 'Focus Enhancer',
    description: 'Improves attention span and concentration',
    color: 'orange',
    icon: 'target',
    researchBacked: true,
    cognitiveArea: 'attention'
  },
  problem_solver: {
    id: 'problem_solver',
    name: 'Problem Solver',
    description: 'Develops analytical and logical thinking',
    color: 'red',
    icon: 'puzzle',
    researchBacked: true,
    cognitiveArea: 'problem-solving'
  },
  speed_trainer: {
    id: 'speed_trainer',
    name: 'Speed Trainer',
    description: 'Increases processing speed and pattern recognition',
    color: 'yellow',
    icon: 'zap',
    researchBacked: true,
    cognitiveArea: 'processing-speed'
  }
};

/**
 * Maps puzzle themes to appropriate benefit tags
 */
export const THEME_TO_BENEFITS: Record<string, string[]> = {
  // Memory-focused themes
  'animals': ['memory_boost', 'vocabulary_builder'],
  'nature': ['memory_boost', 'stress_relief'],
  'geography': ['memory_boost', 'vocabulary_builder'],
  'history': ['memory_boost', 'vocabulary_builder'],
  'science': ['memory_boost', 'problem_solver'],
  
  // Vocabulary-focused themes
  'literature': ['vocabulary_builder', 'memory_boost'],
  'language': ['vocabulary_builder', 'focus_enhancer'],
  'education': ['vocabulary_builder', 'problem_solver'],
  'academic': ['vocabulary_builder', 'memory_boost'],
  
  // Stress relief themes
  'flowers': ['stress_relief', 'memory_boost'],
  'garden': ['stress_relief', 'vocabulary_builder'],
  'peaceful': ['stress_relief', 'focus_enhancer'],
  'meditation': ['stress_relief', 'focus_enhancer'],
  'calm': ['stress_relief', 'memory_boost'],
  
  // Focus and attention themes
  'puzzles': ['focus_enhancer', 'problem_solver'],
  'logic': ['focus_enhancer', 'problem_solver'],
  'patterns': ['focus_enhancer', 'speed_trainer'],
  'mathematics': ['focus_enhancer', 'problem_solver'],
  
  // Problem-solving themes
  'mystery': ['problem_solver', 'focus_enhancer'],
  'detective': ['problem_solver', 'vocabulary_builder'],
  'strategy': ['problem_solver', 'focus_enhancer'],
  'chess': ['problem_solver', 'memory_boost'],
  
  // Speed training themes
  'sports': ['speed_trainer', 'focus_enhancer'],
  'racing': ['speed_trainer', 'focus_enhancer'],
  'quick': ['speed_trainer', 'problem_solver'],
  'fast': ['speed_trainer', 'focus_enhancer']
};

/**
 * Gets benefit tags for a puzzle based on its theme and difficulty
 */
export function getBenefitTags(theme: string, difficulty: string = 'medium'): BenefitTag[] {
  const normalizedTheme = theme.toLowerCase();
  const benefitIds = THEME_TO_BENEFITS[normalizedTheme] || ['memory_boost'];
  
  // Add difficulty-based benefits
  if (difficulty.toLowerCase() === 'hard') {
    benefitIds.push('problem_solver');
  }
  if (difficulty.toLowerCase() === 'easy') {
    benefitIds.push('stress_relief');
  }
  
  // Remove duplicates and map to benefit objects
  const uniqueIds = [...new Set(benefitIds)];
  return uniqueIds.map(id => BENEFIT_TAGS[id]).filter(Boolean);
}

/**
 * Gets all available benefit tags for filtering
 */
export function getAllBenefitTags(): BenefitTag[] {
  return Object.values(BENEFIT_TAGS);
}

/**
 * Filters puzzles by benefit tags
 */
export function filterPuzzlesByBenefits(puzzles: any[], benefitIds: string[]): any[] {
  if (benefitIds.length === 0) return puzzles;
  
  return puzzles.filter(puzzle => {
    const puzzleBenefits = getBenefitTags(puzzle.theme, puzzle.difficulty);
    const puzzleBenefitIds = puzzleBenefits.map(b => b.id);
    
    return benefitIds.some(benefitId => puzzleBenefitIds.includes(benefitId));
  });
}

/**
 * Cognitive tracking utilities
 */
export interface CognitiveStats {
  totalPuzzlesSolved: number;
  memoryPuzzles: number;
  vocabularyPuzzles: number;
  focusPuzzles: number;
  problemSolvingPuzzles: number;
  stressReliefPuzzles: number;
  speedPuzzles: number;
  averageDifficulty: number;
  streakDays: number;
  lastPlayDate: string;
  cognitiveScore: number;
}

/**
 * Calculates cognitive improvement score based on puzzle solving patterns
 */
export function calculateCognitiveScore(stats: Partial<CognitiveStats>): number {
  const {
    totalPuzzlesSolved = 0,
    memoryPuzzles = 0,
    vocabularyPuzzles = 0,
    focusPuzzles = 0,
    problemSolvingPuzzles = 0,
    stressReliefPuzzles = 0,
    speedPuzzles = 0,
    averageDifficulty = 1,
    streakDays = 0
  } = stats;
  
  // Base score from total puzzles (max 40 points)
  const baseScore = Math.min(totalPuzzlesSolved * 0.5, 40);
  
  // Diversity bonus (max 20 points)
  const diversityAreas = [
    memoryPuzzles > 0 ? 1 : 0,
    vocabularyPuzzles > 0 ? 1 : 0,
    focusPuzzles > 0 ? 1 : 0,
    problemSolvingPuzzles > 0 ? 1 : 0,
    stressReliefPuzzles > 0 ? 1 : 0,
    speedPuzzles > 0 ? 1 : 0
  ].reduce((sum, val) => sum + val, 0);
  
  const diversityScore = (diversityAreas / 6) * 20;
  
  // Difficulty bonus (max 20 points)
  const difficultyScore = Math.min(averageDifficulty * 6.67, 20);
  
  // Consistency bonus (max 20 points)
  const consistencyScore = Math.min(streakDays * 2, 20);
  
  return Math.round(baseScore + diversityScore + difficultyScore + consistencyScore);
}

/**
 * Gets personalized benefit recommendations based on user's puzzle history
 */
export function getPersonalizedBenefitRecommendations(stats: Partial<CognitiveStats>): {
  recommended: BenefitTag[];
  reason: string;
}[] {
  const recommendations: { recommended: BenefitTag[]; reason: string; }[] = [];
  
  const {
    memoryPuzzles = 0,
    vocabularyPuzzles = 0,
    focusPuzzles = 0,
    problemSolvingPuzzles = 0,
    stressReliefPuzzles = 0,
    speedPuzzles = 0,
    totalPuzzlesSolved = 0
  } = stats;
  
  // Recommend underutilized areas
  if (memoryPuzzles < totalPuzzlesSolved * 0.2) {
    recommendations.push({
      recommended: [BENEFIT_TAGS.memory_boost],
      reason: 'Boost your memory with targeted puzzles - research shows 30% improvement in recall'
    });
  }
  
  if (vocabularyPuzzles < totalPuzzlesSolved * 0.2) {
    recommendations.push({
      recommended: [BENEFIT_TAGS.vocabulary_builder],
      reason: 'Expand your vocabulary - studies show 200+ new words learned per month'
    });
  }
  
  if (stressReliefPuzzles < totalPuzzlesSolved * 0.15) {
    recommendations.push({
      recommended: [BENEFIT_TAGS.stress_relief],
      reason: 'Try stress-relief puzzles - research shows 23% reduction in cortisol levels'
    });
  }
  
  return recommendations.slice(0, 3); // Limit to top 3 recommendations
}
