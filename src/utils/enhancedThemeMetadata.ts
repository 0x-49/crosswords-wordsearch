// Enhanced theme metadata with comprehensive mappings for all themes
import { BookMetadata } from './bookCategories';

// Comprehensive theme metadata mapping for all 100+ themes
export const enhancedThemeMetadataMap: Record<string, Partial<BookMetadata>> = {
  // Classic Entertainment & Media Themes
  'Classic Movies': {
    categories: ['nostalgia', 'arts-culture'],
    subcategories: ['vintage-culture', 'visual-arts'],
    tags: ['hollywood-golden-age', 'classic-cinema', 'film-noir', 'broadway-classics', 'vintage-television'],
    targetAudience: 'Seniors',
    difficulty: 'Mixed',
    estimatedTime: '10-15 hours',
    popularity: 95
  },
  'Vintage Music': {
    categories: ['nostalgia', 'arts-culture'],
    subcategories: ['vintage-culture', 'music'],
    tags: ['big-band-era', 'swing-music', 'crooners', 'musical-theater', 'radio-shows'],
    targetAudience: 'Seniors',
    difficulty: 'Mixed',
    estimatedTime: '8-12 hours',
    popularity: 92
  },
  'Golden Age TV': {
    categories: ['nostalgia', 'seniors-lifestyle'],
    subcategories: ['classic-entertainment', 'vintage-culture'],
    tags: ['vintage-television', 'classic-cinema', 'radio-shows', 'broadway-classics', 'generational-wisdom'],
    targetAudience: 'Seniors',
    difficulty: 'Mixed',
    estimatedTime: '10-14 hours',
    popularity: 90
  },

  // Nature & Outdoor Themes
  'Gardening Wisdom': {
    categories: ['nature-outdoors', 'seniors-lifestyle'],
    subcategories: ['gardening', 'traditional-hobbies'],
    tags: ['garden-flowers', 'vegetable-gardening', 'herb-growing', 'seasonal-plants', 'butterfly-garden'],
    targetAudience: 'Seniors',
    difficulty: 'Easy to Medium',
    estimatedTime: '8-12 hours',
    popularity: 88
  },
  'Bird Watching': {
    categories: ['nature-outdoors', 'seniors-lifestyle'],
    subcategories: ['wildlife', 'outdoor-activities'],
    tags: ['bird-watching', 'wildlife-safari', 'forest-animals', 'photography', 'nature'],
    targetAudience: 'Seniors',
    difficulty: 'Medium',
    estimatedTime: '9-13 hours',
    popularity: 85
  },
  'Beach Vacation': {
    categories: ['nature-outdoors'],
    subcategories: ['landscapes', 'outdoor-activities'],
    tags: ['beach-destinations', 'ocean-life', 'summer-activities', 'vacation-spots', 'scenic-routes'],
    targetAudience: 'All Ages',
    difficulty: 'Easy to Medium',
    estimatedTime: '7-11 hours',
    popularity: 81
  },
  'Mountain Retreat': {
    categories: ['nature-outdoors'],
    subcategories: ['landscapes', 'outdoor-activities'],
    tags: ['mountain-hiking', 'national-parks', 'mountain-resorts', 'scenic-routes', 'photography'],
    targetAudience: 'All Ages',
    difficulty: 'Easy to Medium',
    estimatedTime: '7-11 hours',
    popularity: 80
  },

  // Family & Home Life Themes
  'Traditional Cooking': {
    categories: ['family-traditions', 'seniors-lifestyle'],
    subcategories: ['home-cooking', 'family-life'],
    tags: ['home-cooking', 'baking-recipes', 'comfort-food', 'family-recipes', 'kitchen-tools'],
    targetAudience: 'Seniors',
    difficulty: 'Mixed',
    estimatedTime: '9-13 hours',
    popularity: 87
  },
  'Family Memories': {
    categories: ['family-traditions', 'seniors-lifestyle'],
    subcategories: ['family-life', 'celebrations'],
    tags: ['family-traditions', 'holiday-celebrations', 'family-gatherings', 'generational-wisdom', 'dining-traditions'],
    targetAudience: 'Seniors',
    difficulty: 'Easy to Medium',
    estimatedTime: '8-12 hours',
    popularity: 89
  },
  'Tea Time': {
    categories: ['family-traditions', 'seniors-lifestyle'],
    subcategories: ['dining-traditions', 'traditional-hobbies'],
    tags: ['dining-traditions', 'comfort-food', 'family-traditions', 'relaxation-techniques', 'cultural-heritage'],
    targetAudience: 'Seniors',
    difficulty: 'Easy',
    estimatedTime: '6-10 hours',
    popularity: 82
  },

  // Arts & Crafts Themes
  'Hobbies & Crafts': {
    categories: ['arts-culture', 'seniors-lifestyle'],
    subcategories: ['crafts', 'traditional-hobbies'],
    tags: ['needlework', 'quilting-patterns', 'knitting-stitches', 'woodworking-tools', 'pottery-techniques'],
    targetAudience: 'Seniors',
    difficulty: 'Mixed',
    estimatedTime: '9-13 hours',
    popularity: 84
  },
  'Antique Collecting': {
    categories: ['seniors-lifestyle', 'nostalgia'],
    subcategories: ['traditional-hobbies', 'vintage-culture'],
    tags: ['antique-collecting', 'vintage-cars', 'cultural-heritage', 'generational-wisdom', 'traditional-skills'],
    targetAudience: 'Seniors',
    difficulty: 'Medium to Hard',
    estimatedTime: '11-15 hours',
    popularity: 78
  },

  // Literature & Learning Themes
  'Classic Literature': {
    categories: ['arts-culture', 'education-learning'],
    subcategories: ['literature', 'general-knowledge'],
    tags: ['classic-authors', 'literary-characters', 'poetry-forms', 'famous-quotes', 'writing-techniques'],
    targetAudience: 'Adults',
    difficulty: 'Medium to Hard',
    estimatedTime: '12-16 hours',
    popularity: 77
  },
  'Fairy Tales': {
    categories: ['arts-culture', 'family-traditions'],
    subcategories: ['literature', 'family-life'],
    tags: ['fairy-tale-characters', 'nursery-rhymes', 'folklore', 'mythology', 'classic-authors'],
    targetAudience: 'All Ages',
    difficulty: 'Easy to Medium',
    estimatedTime: '6-10 hours',
    popularity: 86
  },
  'School Days': {
    categories: ['education-learning', 'nostalgia'],
    subcategories: ['school-subjects', 'historical-themes'],
    tags: ['american-history', 'famous-inventors', 'scientific-discoveries', 'cultural-heritage', 'traditional-skills'],
    targetAudience: 'Seniors',
    difficulty: 'Mixed',
    estimatedTime: '8-12 hours',
    popularity: 82
  },

  // Health & Wellness Themes
  'Health & Wellness': {
    categories: ['seniors-lifestyle'],
    subcategories: ['health-wellness'],
    tags: ['gentle-exercise', 'meditation-practices', 'healthy-eating', 'stress-relief', 'mindfulness'],
    targetAudience: 'Seniors',
    difficulty: 'Easy to Medium',
    estimatedTime: '7-11 hours',
    popularity: 85
  },
  'Spa & Wellness': {
    categories: ['seniors-lifestyle'],
    subcategories: ['health-wellness'],
    tags: ['relaxation-techniques', 'meditation-practices', 'yoga-poses', 'mental-wellness', 'stress-relief'],
    targetAudience: 'Adults',
    difficulty: 'Easy',
    estimatedTime: '6-10 hours',
    popularity: 79
  },
  'Yoga Retreat': {
    categories: ['seniors-lifestyle'],
    subcategories: ['health-wellness'],
    tags: ['yoga-poses', 'meditation-practices', 'mindfulness', 'relaxation-techniques', 'mental-wellness'],
    targetAudience: 'Adults',
    difficulty: 'Easy to Medium',
    estimatedTime: '7-11 hours',
    popularity: 76
  },

  // Travel & Places Themes
  'Sunday Drives': {
    categories: ['nostalgia', 'seniors-lifestyle'],
    subcategories: ['golden-memories', 'outdoor-activities'],
    tags: ['scenic-routes', 'travel-memories', 'family-traditions', 'generational-wisdom', 'vacation-spots'],
    targetAudience: 'Seniors',
    difficulty: 'Easy',
    estimatedTime: '6-10 hours',
    popularity: 83
  },
  'World Capitals': {
    categories: ['education-learning'],
    subcategories: ['general-knowledge', 'trivia'],
    tags: ['world-capitals', 'famous-landmarks', 'cultural-sites', 'travel-memories', 'historic-cities'],
    targetAudience: 'Adults',
    difficulty: 'Medium to Hard',
    estimatedTime: '10-14 hours',
    popularity: 74
  },

  // Hobbies & Interests Themes
  'Vintage Cars': {
    categories: ['nostalgia', 'seniors-lifestyle'],
    subcategories: ['vintage-culture', 'traditional-hobbies'],
    tags: ['vintage-cars', 'classic-motorcycles', 'antique-collecting', 'american-history', 'photography'],
    targetAudience: 'Seniors',
    difficulty: 'Medium to Hard',
    estimatedTime: '10-14 hours',
    popularity: 78
  },
  'Photography': {
    categories: ['arts-culture', 'seniors-lifestyle'],
    subcategories: ['visual-arts', 'traditional-hobbies'],
    tags: ['photography', 'scenic-routes', 'wildlife-safari', 'travel-memories', 'artistic-techniques'],
    targetAudience: 'Adults',
    difficulty: 'Medium',
    estimatedTime: '8-12 hours',
    popularity: 75
  },
  'Chess Strategies': {
    categories: ['education-learning', 'seniors-lifestyle'],
    subcategories: ['general-knowledge', 'traditional-hobbies'],
    tags: ['chess-strategies', 'board-games', 'mental-wellness', 'traditional-skills', 'strategic-thinking'],
    targetAudience: 'Adults',
    difficulty: 'Hard',
    estimatedTime: '12-16 hours',
    popularity: 72
  },

  // Seasonal & Holiday Themes
  'Christmas Traditions': {
    categories: ['family-traditions', 'seniors-lifestyle'],
    subcategories: ['holidays', 'celebrations'],
    tags: ['christmas-traditions', 'holiday-celebrations', 'family-gatherings', 'generational-wisdom', 'seasonal-activities'],
    targetAudience: 'All Ages',
    difficulty: 'Easy to Medium',
    estimatedTime: '7-11 hours',
    popularity: 91
  },
  'Spring Flowers': {
    categories: ['nature-outdoors', 'seniors-lifestyle'],
    subcategories: ['gardening', 'landscapes'],
    tags: ['spring-flowers', 'garden-flowers', 'seasonal-plants', 'butterfly-garden', 'nature-photography'],
    targetAudience: 'Seniors',
    difficulty: 'Easy',
    estimatedTime: '6-10 hours',
    popularity: 84
  },
  'Autumn Leaves': {
    categories: ['nature-outdoors'],
    subcategories: ['landscapes', 'outdoor-activities'],
    tags: ['autumn-leaves', 'seasonal-plants', 'scenic-routes', 'photography', 'nature-walks'],
    targetAudience: 'All Ages',
    difficulty: 'Easy',
    estimatedTime: '6-10 hours',
    popularity: 80
  },

  // Educational & Historical Themes
  'American History': {
    categories: ['education-learning', 'nostalgia'],
    subcategories: ['historical-themes', 'general-knowledge'],
    tags: ['american-history', 'historical-figures', 'cultural-heritage', 'famous-inventors', 'traditional-skills'],
    targetAudience: 'Adults',
    difficulty: 'Medium to Hard',
    estimatedTime: '11-15 hours',
    popularity: 79
  },
  'Space Exploration': {
    categories: ['education-learning'],
    subcategories: ['general-knowledge', 'trivia'],
    tags: ['space-exploration', 'scientific-discoveries', 'famous-inventors', 'astronomy', 'modern-technology'],
    targetAudience: 'Adults',
    difficulty: 'Medium to Hard',
    estimatedTime: '10-14 hours',
    popularity: 73
  },
  'Famous Inventors': {
    categories: ['education-learning'],
    subcategories: ['general-knowledge', 'historical-themes'],
    tags: ['famous-inventors', 'scientific-discoveries', 'american-history', 'cultural-heritage', 'innovation'],
    targetAudience: 'Adults',
    difficulty: 'Medium',
    estimatedTime: '9-13 hours',
    popularity: 76
  },

  // Animal & Wildlife Themes
  'Zoo Animals': {
    categories: ['nature-outdoors', 'education-learning'],
    subcategories: ['wildlife', 'general-knowledge'],
    tags: ['wildlife-safari', 'forest-animals', 'ocean-life', 'bird-watching', 'photography'],
    targetAudience: 'All Ages',
    difficulty: 'Easy to Medium',
    estimatedTime: '7-11 hours',
    popularity: 83
  },
  'Farm Animals': {
    categories: ['nature-outdoors', 'family-traditions'],
    subcategories: ['wildlife', 'family-life'],
    tags: ['farm-animals', 'rural-life', 'traditional-skills', 'family-traditions', 'country-living'],
    targetAudience: 'All Ages',
    difficulty: 'Easy',
    estimatedTime: '6-10 hours',
    popularity: 81
  },
  'Ocean Life': {
    categories: ['nature-outdoors', 'education-learning'],
    subcategories: ['wildlife', 'general-knowledge'],
    tags: ['ocean-life', 'marine-biology', 'beach-destinations', 'wildlife-safari', 'environmental-awareness'],
    targetAudience: 'All Ages',
    difficulty: 'Medium',
    estimatedTime: '8-12 hours',
    popularity: 78
  },

  // Additional Unique Themes
  'Coffee Culture': {
    categories: ['family-traditions', 'seniors-lifestyle'],
    subcategories: ['dining-traditions', 'cultural-sites'],
    tags: ['coffee-culture', 'comfort-food', 'social-gathering', 'cultural-heritage', 'morning-rituals'],
    targetAudience: 'Adults',
    difficulty: 'Easy to Medium',
    estimatedTime: '7-11 hours',
    popularity: 77
  },
  'Lighthouse Keepers': {
    categories: ['nostalgia', 'nature-outdoors'],
    subcategories: ['historical-themes', 'landscapes'],
    tags: ['maritime-history', 'coastal-living', 'traditional-skills', 'scenic-routes', 'historical-figures'],
    targetAudience: 'Adults',
    difficulty: 'Medium',
    estimatedTime: '8-12 hours',
    popularity: 74
  },
  'Train Travel': {
    categories: ['nostalgia', 'seniors-lifestyle'],
    subcategories: ['vintage-culture', 'travel-memories'],
    tags: ['vintage-transportation', 'travel-memories', 'scenic-routes', 'american-history', 'golden-age-travel'],
    targetAudience: 'Seniors',
    difficulty: 'Medium',
    estimatedTime: '8-12 hours',
    popularity: 75
  },
  'Quilting Circles': {
    categories: ['arts-culture', 'family-traditions'],
    subcategories: ['crafts', 'family-life'],
    tags: ['quilting-patterns', 'needlework', 'family-traditions', 'generational-wisdom', 'community-gathering'],
    targetAudience: 'Seniors',
    difficulty: 'Medium',
    estimatedTime: '9-13 hours',
    popularity: 82
  },
  'Country Fair': {
    categories: ['family-traditions', 'nostalgia'],
    subcategories: ['celebrations', 'traditional-hobbies'],
    tags: ['rural-traditions', 'family-gatherings', 'seasonal-celebrations', 'traditional-skills', 'community-events'],
    targetAudience: 'All Ages',
    difficulty: 'Easy to Medium',
    estimatedTime: '7-11 hours',
    popularity: 83
  }
};

// Function to get enhanced metadata for any theme
export function getEnhancedThemeMetadata(theme: string): BookMetadata {
  const metadata = enhancedThemeMetadataMap[theme];
  
  // If we have specific metadata, use it
  if (metadata) {
    return {
      categories: metadata.categories || ['seniors-lifestyle'],
      subcategories: metadata.subcategories || ['golden-memories'],
      tags: metadata.tags || ['traditional-skills', 'cultural-heritage', 'generational-wisdom'],
      targetAudience: metadata.targetAudience || 'Seniors',
      difficulty: metadata.difficulty || 'Mixed',
      estimatedTime: metadata.estimatedTime || '8-12 hours',
      popularity: metadata.popularity || Math.floor(Math.random() * 20) + 70
    };
  }
  
  // For themes not explicitly mapped, generate intelligent defaults based on theme name
  return generateIntelligentDefaults(theme);
}

// Generate intelligent defaults based on theme name analysis
function generateIntelligentDefaults(theme: string): BookMetadata {
  const themeLower = theme.toLowerCase();
  
  // Analyze theme name to determine appropriate categories and tags
  let categories = ['seniors-lifestyle'];
  let subcategories = ['golden-memories'];
  let tags = ['traditional-skills', 'cultural-heritage'];
  let difficulty = 'Mixed';
  let targetAudience = 'Seniors';
  let estimatedTime = '8-12 hours';
  let popularity = Math.floor(Math.random() * 15) + 70;
  
  // Nature-related themes
  if (themeLower.includes('garden') || themeLower.includes('flower') || themeLower.includes('plant')) {
    categories = ['nature-outdoors', 'seniors-lifestyle'];
    subcategories = ['gardening', 'traditional-hobbies'];
    tags = ['garden-flowers', 'seasonal-plants', 'herb-growing', 'nature-photography', 'outdoor-activities'];
    difficulty = 'Easy to Medium';
  }
  // Animal themes
  else if (themeLower.includes('animal') || themeLower.includes('bird') || themeLower.includes('wildlife')) {
    categories = ['nature-outdoors', 'education-learning'];
    subcategories = ['wildlife', 'general-knowledge'];
    tags = ['wildlife-safari', 'bird-watching', 'forest-animals', 'photography', 'nature-education'];
    targetAudience = 'All Ages';
  }
  // Food/cooking themes
  else if (themeLower.includes('cook') || themeLower.includes('food') || themeLower.includes('recipe')) {
    categories = ['family-traditions', 'seniors-lifestyle'];
    subcategories = ['home-cooking', 'family-life'];
    tags = ['home-cooking', 'family-recipes', 'comfort-food', 'kitchen-tools', 'dining-traditions'];
  }
  // Arts/crafts themes
  else if (themeLower.includes('art') || themeLower.includes('craft') || themeLower.includes('paint')) {
    categories = ['arts-culture', 'seniors-lifestyle'];
    subcategories = ['crafts', 'visual-arts'];
    tags = ['painting-styles', 'artistic-techniques', 'creative-expression', 'traditional-crafts', 'hobby-skills'];
  }
  // Music themes
  else if (themeLower.includes('music') || themeLower.includes('song') || themeLower.includes('instrument')) {
    categories = ['arts-culture', 'nostalgia'];
    subcategories = ['music', 'vintage-culture'];
    tags = ['musical-instruments', 'song-traditions', 'cultural-music', 'performance-arts', 'music-history'];
  }
  // Historical themes
  else if (themeLower.includes('history') || themeLower.includes('vintage') || themeLower.includes('classic')) {
    categories = ['nostalgia', 'education-learning'];
    subcategories = ['historical-themes', 'vintage-culture'];
    tags = ['historical-figures', 'cultural-heritage', 'vintage-culture', 'american-history', 'traditional-values'];
  }
  // Travel/places themes
  else if (themeLower.includes('travel') || themeLower.includes('vacation') || themeLower.includes('city')) {
    categories = ['nature-outdoors', 'education-learning'];
    subcategories = ['landscapes', 'general-knowledge'];
    tags = ['travel-memories', 'scenic-routes', 'cultural-sites', 'vacation-spots', 'world-exploration'];
    targetAudience = 'All Ages';
  }
  // Sports/games themes
  else if (themeLower.includes('sport') || themeLower.includes('game') || themeLower.includes('play')) {
    categories = ['education-learning', 'seniors-lifestyle'];
    subcategories = ['general-knowledge', 'traditional-hobbies'];
    tags = ['recreational-activities', 'competitive-sports', 'team-games', 'physical-fitness', 'leisure-time'];
    targetAudience = 'All Ages';
  }
  // Health/wellness themes
  else if (themeLower.includes('health') || themeLower.includes('wellness') || themeLower.includes('fitness')) {
    categories = ['seniors-lifestyle'];
    subcategories = ['health-wellness'];
    tags = ['healthy-living', 'wellness-practices', 'mental-health', 'physical-fitness', 'self-care'];
    difficulty = 'Easy to Medium';
  }
  
  return {
    categories,
    subcategories,
    tags,
    targetAudience,
    difficulty,
    estimatedTime,
    popularity
  };
}