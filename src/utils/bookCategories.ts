// Book categorization and tagging system for puzzle books

export interface BookMetadata {
  categories: string[];
  subcategories: string[];
  tags: string[];
  targetAudience: string;
  difficulty: string;
  estimatedTime: string;
  popularity: number;
}

// Main categories for puzzle books
export const bookCategories = {
  'seniors-lifestyle': {
    name: 'Seniors Lifestyle',
    description: 'Puzzles celebrating the golden years and senior interests',
    subcategories: {
      'golden-memories': 'Golden Memories',
      'classic-entertainment': 'Classic Entertainment',
      'traditional-hobbies': 'Traditional Hobbies',
      'health-wellness': 'Health & Wellness'
    }
  },
  'nostalgia': {
    name: 'Nostalgia',
    description: 'Puzzles that evoke memories of bygone eras',
    subcategories: {
      'vintage-culture': 'Vintage Culture',
      'retro-entertainment': 'Retro Entertainment',
      'classic-americana': 'Classic Americana',
      'historical-themes': 'Historical Themes'
    }
  },
  'nature-outdoors': {
    name: 'Nature & Outdoors',
    description: 'Puzzles celebrating the natural world',
    subcategories: {
      'wildlife': 'Wildlife',
      'gardening': 'Gardening',
      'landscapes': 'Landscapes',
      'outdoor-activities': 'Outdoor Activities'
    }
  },
  'family-traditions': {
    name: 'Family & Traditions',
    description: 'Puzzles about family life and cherished traditions',
    subcategories: {
      'family-life': 'Family Life',
      'holidays': 'Holidays',
      'celebrations': 'Celebrations',
      'home-cooking': 'Home Cooking'
    }
  },
  'arts-culture': {
    name: 'Arts & Culture',
    description: 'Puzzles exploring artistic and cultural themes',
    subcategories: {
      'literature': 'Literature',
      'music': 'Music',
      'visual-arts': 'Visual Arts',
      'crafts': 'Crafts'
    }
  },
  'education-learning': {
    name: 'Education & Learning',
    description: 'Educational and knowledge-based puzzles',
    subcategories: {
      'school-subjects': 'School Subjects',
      'general-knowledge': 'General Knowledge',
      'vocabulary': 'Vocabulary',
      'trivia': 'Trivia'
    }
  }
};

// Theme-specific tags for books - organized by actual content themes
export const bookTags = [
  // Classic Entertainment & Media
  'hollywood-golden-age', 'classic-cinema', 'vintage-television', 'radio-shows', 'big-band-era', 
  'swing-music', 'crooners', 'musical-theater', 'broadway-classics', 'film-noir',
  
  // Nature & Outdoor Themes
  'garden-flowers', 'vegetable-gardening', 'bird-watching', 'wildlife-safari', 'ocean-life', 
  'mountain-hiking', 'forest-animals', 'seasonal-plants', 'butterfly-garden', 'herb-growing',
  
  // Family & Home Life
  'family-traditions', 'holiday-celebrations', 'home-cooking', 'baking-recipes', 'comfort-food',
  'family-recipes', 'kitchen-tools', 'dining-traditions', 'family-gatherings', 'generational-wisdom',
  
  // Arts & Crafts
  'needlework', 'quilting-patterns', 'knitting-stitches', 'woodworking-tools', 'pottery-techniques',
  'painting-styles', 'jewelry-making', 'scrapbooking', 'calligraphy', 'origami-patterns',
  
  // Literature & Learning
  'classic-authors', 'poetry-forms', 'literary-characters', 'book-genres', 'writing-techniques',
  'famous-quotes', 'mythology', 'folklore', 'fairy-tale-characters', 'nursery-rhymes',
  
  // Health & Wellness
  'gentle-exercise', 'meditation-practices', 'healthy-eating', 'stress-relief', 'mindfulness',
  'yoga-poses', 'walking-benefits', 'senior-fitness', 'mental-wellness', 'relaxation-techniques',
  
  // Travel & Places
  'world-capitals', 'famous-landmarks', 'national-parks', 'beach-destinations', 'mountain-resorts',
  'historic-cities', 'cultural-sites', 'scenic-routes', 'vacation-spots', 'travel-memories',
  
  // Hobbies & Interests
  'vintage-cars', 'classic-motorcycles', 'antique-collecting', 'coin-collecting', 'stamp-collecting',
  'photography', 'astronomy', 'chess-strategies', 'card-games', 'board-games',
  
  // Seasonal & Holiday
  'spring-flowers', 'summer-activities', 'autumn-leaves', 'winter-sports', 'christmas-traditions',
  'thanksgiving-feast', 'easter-celebrations', 'valentine-romance', 'halloween-fun', 'new-year-resolutions',
  
  // Educational & Historical
  'american-history', 'world-history', 'famous-inventors', 'scientific-discoveries', 'space-exploration',
  'ancient-civilizations', 'historical-figures', 'cultural-heritage', 'traditional-skills', 'life-lessons'
];

// Theme to metadata mapping with theme-specific tags
const themeMetadataMap: Record<string, Partial<BookMetadata>> = {
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
  'Gardening Wisdom': {
    categories: ['nature-outdoors', 'seniors-lifestyle'],
    subcategories: ['gardening', 'traditional-hobbies'],
    tags: ['garden-flowers', 'vegetable-gardening', 'herb-growing', 'seasonal-plants', 'butterfly-garden'],
    targetAudience: 'Seniors',
    difficulty: 'Easy to Medium',
    estimatedTime: '8-12 hours',
    popularity: 88
  },
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
  'Health & Wellness': {
    categories: ['seniors-lifestyle'],
    subcategories: ['health-wellness'],
    tags: ['gentle-exercise', 'meditation-practices', 'healthy-eating', 'stress-relief', 'mindfulness'],
    targetAudience: 'Seniors',
    difficulty: 'Easy to Medium',
    estimatedTime: '7-11 hours',
    popularity: 85
  },
  'Hobbies & Crafts': {
    categories: ['arts-culture', 'seniors-lifestyle'],
    subcategories: ['crafts', 'traditional-hobbies'],
    tags: ['needlework', 'quilting-patterns', 'knitting-stitches', 'woodworking-tools', 'pottery-techniques'],
    targetAudience: 'Seniors',
    difficulty: 'Mixed',
    estimatedTime: '9-13 hours',
    popularity: 84
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
  'Zoo Animals': {
    categories: ['nature-outdoors', 'education-learning'],
    subcategories: ['wildlife', 'general-knowledge'],
    tags: ['wildlife-safari', 'forest-animals', 'ocean-life', 'bird-watching', 'photography'],
    targetAudience: 'All Ages',
    difficulty: 'Easy to Medium',
    estimatedTime: '7-11 hours',
    popularity: 83
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
  'Spa & Wellness': {
    categories: ['seniors-lifestyle'],
    subcategories: ['health-wellness'],
    tags: ['relaxation-techniques', 'meditation-practices', 'yoga-poses', 'mental-wellness', 'stress-relief'],
    targetAudience: 'Adults',
    difficulty: 'Easy',
    estimatedTime: '6-10 hours',
    popularity: 79
  },
  'Vintage Cars': {
    categories: ['nostalgia', 'seniors-lifestyle'],
    subcategories: ['vintage-culture', 'traditional-hobbies'],
    tags: ['vintage-cars', 'classic-motorcycles', 'antique-collecting', 'american-history', 'photography'],
    targetAudience: 'Seniors',
    difficulty: 'Medium to Hard',
    estimatedTime: '10-14 hours',
    popularity: 78
  },
  'Classic Literature': {
    categories: ['arts-culture', 'education-learning'],
    subcategories: ['literature', 'general-knowledge'],
    tags: ['classic-authors', 'literary-characters', 'poetry-forms', 'famous-quotes', 'writing-techniques'],
    targetAudience: 'Adults',
    difficulty: 'Medium to Hard',
    estimatedTime: '12-16 hours',
    popularity: 77
  }
};

// Get metadata for a specific theme
export function getThemeMetadata(theme: string): BookMetadata {
  // First try the enhanced metadata system
  try {
    const { getEnhancedThemeMetadata } = require('./enhancedThemeMetadata');
    return getEnhancedThemeMetadata(theme);
  } catch (error) {
    // Fallback to original system if enhanced metadata is not available
    const metadata = themeMetadataMap[theme];
    
    return {
      categories: metadata?.categories || ['seniors-lifestyle'],
      subcategories: metadata?.subcategories || ['golden-memories'],
      tags: metadata?.tags || ['traditional-skills', 'cultural-heritage', 'generational-wisdom'],
      targetAudience: metadata?.targetAudience || 'Seniors',
      difficulty: metadata?.difficulty || 'Mixed',
      estimatedTime: metadata?.estimatedTime || '8-12 hours',
      popularity: metadata?.popularity || Math.floor(Math.random() * 20) + 80
    };
  }
}

// Generate metadata for all themes
export function generateMetadataForAllThemes(themes: string[]): Record<string, BookMetadata> {
  const result: Record<string, BookMetadata> = {};
  
  themes.forEach(theme => {
    result[theme] = getThemeMetadata(theme);
  });
  
  return result;
}

// Filter themes by category
export function getThemesByCategory(themes: string[], category: string): string[] {
  return themes.filter(theme => {
    const metadata = getThemeMetadata(theme);
    return metadata.categories.includes(category);
  });
}

// Filter themes by tag
export function getThemesByTag(themes: string[], tag: string): string[] {
  return themes.filter(theme => {
    const metadata = getThemeMetadata(theme);
    return metadata.tags.includes(tag);
  });
}

// Filter themes by target audience
export function getThemesByAudience(themes: string[], audience: string): string[] {
  return themes.filter(theme => {
    const metadata = getThemeMetadata(theme);
    return metadata.targetAudience === audience;
  });
}

// Filter themes by difficulty
export function getThemesByDifficulty(themes: string[], difficulty: string): string[] {
  return themes.filter(theme => {
    const metadata = getThemeMetadata(theme);
    return metadata.difficulty.toLowerCase().includes(difficulty.toLowerCase());
  });
}

// Get popular themes (sorted by popularity)
export function getPopularThemes(themes: string[], limit: number = 10): string[] {
  return themes
    .map(theme => ({ theme, metadata: getThemeMetadata(theme) }))
    .sort((a, b) => b.metadata.popularity - a.metadata.popularity)
    .slice(0, limit)
    .map(item => item.theme);
}

// Get themes by subcategory
export function getThemesBySubcategory(themes: string[], subcategory: string): string[] {
  return themes.filter(theme => {
    const metadata = getThemeMetadata(theme);
    return metadata.subcategories.includes(subcategory);
  });
}

// Search themes by keyword (searches in tags, categories, and subcategories)
export function searchThemes(themes: string[], keyword: string): string[] {
  const lowerKeyword = keyword.toLowerCase();
  
  return themes.filter(theme => {
    const metadata = getThemeMetadata(theme);
    const searchableText = [
      ...metadata.tags,
      ...metadata.categories,
      ...metadata.subcategories,
      theme.toLowerCase()
    ].join(' ');
    
    return searchableText.includes(lowerKeyword);
  });
}