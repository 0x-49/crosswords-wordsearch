// Puzzle Name Generator - Creates unique, themed puzzle names and ensures content variety

interface ThemeNameTemplates {
  wordSearchNames: string[];
  crosswordNames: string[];
}

// Theme-specific name templates with extensive variety
const THEME_TEMPLATES: Record<string, ThemeNameTemplates> = {
  "Classic Movies": {
    wordSearchNames: [
      "Casablanca Memories", "Gone with the Wind Tales", "Citizen Kane Chronicles", "The Wizard of Oz Magic",
      "Singin' in the Rain Joy", "Sunset Boulevard Drama", "Some Like It Hot Comedy", "Vertigo Suspense",
      "North by Northwest Thrills", "Psycho Terror", "Lawrence of Arabia Epic", "The Godfather Saga",
      "Chinatown Mystery", "Apocalypse Now Journey", "Raging Bull Intensity", "Taxi Driver Streets",
      "Annie Hall Romance", "Manhattan Nights", "The Deer Hunter War", "Kramer vs. Kramer Drama",
      "Ordinary People Stories", "Raiders of the Lost Ark Adventure", "E.T. Wonder", "Blade Runner Future",
      "Terms of Endearment Love", "Amadeus Genius", "Out of Africa Romance", "Platoon Battlefield",
      "The Last Emperor Majesty", "Rain Man Brotherhood", "Driving Miss Daisy Friendship", "Dances with Wolves Spirit",
      "The Silence of the Lambs Thriller", "Unforgiven Justice", "Schindler's List Courage", "Forrest Gump Life",
      "Pulp Fiction Style", "The Shawshank Redemption Hope", "Braveheart Freedom", "The English Patient Love",
      "Titanic Romance", "Shakespeare in Love Poetry", "American Beauty Truth", "Gladiator Honor",
      "A Beautiful Mind Brilliance", "Chicago Glamour", "Million Dollar Baby Dreams", "Crash Connections",
      "The Departed Undercover", "No Country for Old Men Fate", "Slumdog Millionaire Destiny", "The Hurt Locker Courage",
      "The King's Speech Triumph", "The Artist Silent Era", "Argo Rescue", "12 Years a Slave Freedom",
      "Birdman Flight", "Spotlight Truth", "Moonlight Identity", "The Shape of Water Love",
      "Green Book Journey", "Parasite Society", "Nomadland Wandering", "CODA Family",
      "Everything Everywhere All at Once Multiverse", "Top Gun Maverick", "The Maltese Falcon Mystery", "Double Indemnity Noir",
      "The Third Man Shadows", "All About Eve Ambition", "A Streetcar Named Desire Passion", "On the Waterfront Courage",
      "Roman Holiday Romance", "Rear Window Voyeur", "The Seven Year Itch Temptation", "12 Angry Men Justice",
      "The Bridge on the River Kwai Honor", "Ben-Hur Spectacle", "The Apartment Love", "West Side Story Music",
      "To Kill a Mockingbird Justice", "Dr. Strangelove Satire", "My Fair Lady Transformation", "The Sound of Music Joy",
      "Bonnie and Clyde Rebellion", "The Graduate Coming of Age", "2001: A Space Odyssey Vision", "Midnight Cowboy Friendship",
      "Patton Leadership", "The French Connection Chase", "The Exorcist Horror", "The Sting Con Game"
    ],
    crosswordNames: [
      "Golden Age Stars", "Academy Award Winners", "Film Noir Classics", "Musical Masterpieces",
      "Western Legends", "Romantic Comedies", "Thriller Suspense", "War Movie Heroes",
      "Sci-Fi Pioneers", "Horror Icons", "Drama Queens", "Comedy Kings",
      "Director's Vision", "Cinematography Art", "Screenplay Genius", "Character Studies",
      "Box Office Hits", "Cult Classics", "Foreign Films", "Documentary Legends",
      "Animation Magic", "Silent Film Era", "Talkies Revolution", "Technicolor Dreams",
      "Studio System", "Method Acting", "Star System", "Producer's Choice",
      "Critic's Darling", "Audience Favorite", "Time Capsule", "Cultural Impact",
      "Behind the Scenes", "Movie Trivia", "Film History", "Cinema Legends",
      "Leading Men", "Leading Ladies", "Supporting Cast", "Character Actors",
      "Movie Quotes", "Memorable Scenes", "Plot Twists", "Happy Endings",
      "Tragic Tales", "Love Stories", "Action Sequences", "Dance Numbers",
      "Song and Dance", "Costume Design", "Set Decoration", "Special Effects",
      "Editing Magic", "Sound Design", "Musical Scores", "Theme Songs",
      "Opening Credits", "Closing Scenes", "Sequel Stories", "Remake Magic",
      "Adaptation Art", "Original Stories", "True Stories", "Fictional Tales",
      "Period Pieces", "Contemporary Films", "Future Visions", "Past Reflections",
      "Urban Stories", "Rural Tales", "International Cinema", "American Dreams",
      "European Art", "Asian Cinema", "Latin Films", "African Stories",
      "Independent Films", "Blockbuster Hits", "Art House Cinema", "Commercial Success",
      "Festival Winners", "Critics Choice", "People's Favorite", "Timeless Classics",
      "Forgotten Gems", "Rediscovered Treasures", "Influential Works", "Groundbreaking Films"
    ]
  },
  
  "Vintage Music": {
    wordSearchNames: [
      "Frank Sinatra Classics", "Ella Fitzgerald Jazz", "Duke Ellington Orchestra", "Louis Armstrong Trumpet",
      "Billie Holiday Blues", "Nat King Cole Smooth", "Bing Crosby Crooning", "Dean Martin Swagger",
      "Sammy Davis Jr. Style", "Tony Bennett Standards", "Doris Day Sunshine", "Peggy Lee Sultry",
      "Rosemary Clooney Charm", "Sarah Vaughan Voice", "Dinah Washington Soul", "Carmen McRae Jazz",
      "Big Band Swing Era", "Glenn Miller Sound", "Benny Goodman Clarinet", "Tommy Dorsey Trombone",
      "Count Basie Piano", "Artie Shaw Swing", "Harry James Trumpet", "Les Brown Orchestra",
      "Kay Kyser Dance", "Sammy Kaye Sweet", "Guy Lombardo Waltz", "Lawrence Welk Champagne",
      "Perry Como Relaxed", "Andy Williams Moon", "Johnny Mathis Romance", "Vic Damone Velvet",
      "Al Martino Passion", "Jerry Vale Italian", "Connie Francis Pop", "Patti Page Tennessee",
      "Teresa Brewer Peppy", "Georgia Gibbs Dance", "Kitty Kallen Sweet", "Jo Stafford Pure",
      "Andrews Sisters Harmony", "McGuire Sisters Trio", "Fontane Sisters Blend", "Chordettes Vocal",
      "Four Aces Smooth", "Four Freshmen Jazz", "Hi-Lo's Harmony", "Modernaires Swing",
      "Mills Brothers Vocal", "Ink Spots Ballad", "Platters Doo-Wop", "Drifters Rhythm",
      "Coasters Comedy", "Five Satins Harmony", "Penguins Earth Angel", "Flamingos I Only",
      "Moonglows Sincerely", "Harptones Sunday", "Cadillacs Speedoo", "Orioles Crying",
      "Ravens Old Man", "Dominoes Sixty Minute", "Clovers Love Potion", "Spaniels Goodnite",
      "Velvets Tonight", "Heartbeats Thousand", "Paragons Florence", "Jesters So Strange",
      "Channels Closer", "Nutmegs Story", "Silhouettes Get Job", "Rays Silhouettes",
      "Crests Sixteen", "Belmonts I Wonder", "Dion Runaround", "Bobby Darin Mack",
      "Paul Anka Diana", "Frankie Avalon Venus", "Fabian Tiger", "Bobby Rydell Wild",
      "Neil Sedaka Calendar", "Carole King Will You", "Gerry Goffin Partner", "Barry Mann Who Put"
    ],
    crosswordNames: [
      "Swing Era Legends", "Jazz Vocal Masters", "Big Band Leaders", "Crooner Classics",
      "Dance Band Hits", "Radio Show Tunes", "Jukebox Favorites", "Ballroom Dancing",
      "Tin Pan Alley", "Broadway Standards", "Hollywood Musicals", "Recording Stars",
      "Nightclub Performers", "Concert Hall Artists", "Studio Musicians", "Song Writers",
      "Music Publishers", "Record Labels", "Hit Parade Songs", "Chart Toppers",
      "Golden Oldies", "Nostalgic Melodies", "Timeless Classics", "Vintage Vocals",
      "Instrumental Hits", "Orchestra Leaders", "Band Vocalists", "Solo Artists",
      "Duet Partners", "Harmony Groups", "Vocal Arrangements", "Musical Styles",
      "Genre Pioneers", "Influence Makers", "Cultural Icons", "Entertainment Legends",
      "Performance Venues", "Music History", "Industry Giants", "Artistic Innovation",
      "Creative Genius", "Musical Heritage", "Sound Evolution", "Style Development",
      "Technique Masters", "Vocal Range", "Instrumental Skill", "Composition Art",
      "Lyrical Poetry", "Melodic Beauty", "Rhythmic Patterns", "Harmonic Structure",
      "Musical Theory", "Performance Practice", "Recording Technology", "Sound Quality",
      "Audio Engineering", "Production Values", "Artistic Vision", "Creative Process",
      "Musical Collaboration", "Industry Relationships", "Career Highlights", "Legacy Impact",
      "Cultural Significance", "Historical Context", "Social Influence", "Artistic Merit",
      "Commercial Success", "Critical Acclaim", "Popular Appeal", "Enduring Quality",
      "Timeless Appeal", "Cross-Generational", "Musical Education", "Appreciation Study"
    ]
  },

  "Golden Age TV": {
    wordSearchNames: [
      "I Love Lucy Laughs", "The Honeymooners Bus", "Leave It to Beaver", "Father Knows Best",
      "The Andy Griffith Show", "The Dick Van Dyke Show", "The Mary Tyler Moore Show", "All in the Family",
      "The Carol Burnett Show", "The Ed Sullivan Show", "The Tonight Show Johnny", "What's My Line",
      "I've Got a Secret", "To Tell the Truth", "The Price is Right", "Queen for a Day",
      "This Is Your Life", "Person to Person", "See It Now", "Playhouse 90",
      "Studio One", "Kraft Television Theatre", "Philco Television Playhouse", "Goodyear Playhouse",
      "The Twilight Zone", "Alfred Hitchcock Presents", "Perry Mason", "Dragnet",
      "Gunsmoke", "Bonanza", "The Rifleman", "Have Gun Will Travel",
      "Maverick", "77 Sunset Strip", "Hawaiian Eye", "Surfside 6",
      "The Untouchables", "Route 66", "Dr. Kildare", "Ben Casey",
      "The Fugitive", "The Outer Limits", "Lost in Space", "Star Trek",
      "The Man from U.N.C.L.E.", "Mission: Impossible", "Get Smart", "The Wild Wild West",
      "Batman", "The Green Hornet", "The Addams Family", "The Munsters",
      "Bewitched", "I Dream of Jeannie", "The Beverly Hillbillies", "Petticoat Junction",
      "Green Acres", "Gilligan's Island", "The Brady Bunch", "The Partridge Family",
      "The Waltons", "Little House Prairie", "Happy Days", "Laverne & Shirley",
      "Mork & Mindy", "Three's Company", "The Jeffersons", "Good Times",
      "Sanford and Son", "Chico and the Man", "Welcome Back Kotter", "Barney Miller",
      "Taxi", "WKRP in Cincinnati", "Dallas", "Dynasty"
    ],
    crosswordNames: [
      "Sitcom Stars", "Drama Series", "Variety Shows", "Game Shows",
      "Talk Shows", "News Programs", "Western Series", "Detective Shows",
      "Science Fiction", "Comedy Classics", "Family Shows", "Musical Programs",
      "Children's TV", "Educational Shows", "Documentary Series", "Anthology Programs",
      "Live Television", "Studio Audiences", "Laugh Tracks", "Commercial Breaks",
      "Network Programming", "Prime Time Hits", "Daytime Television", "Late Night Shows",
      "Weekend Specials", "Holiday Programs", "Award Shows", "Talent Competitions",
      "Quiz Shows", "Panel Shows", "Interview Programs", "Cooking Shows",
      "Travel Programs", "Sports Broadcasting", "Weather Reports", "Local News",
      "National News", "International Coverage", "Breaking News", "Special Reports",
      "Documentary Films", "Made-for-TV Movies", "Mini-Series", "Soap Operas",
      "Cartoon Shows", "Puppet Shows", "Educational Programming", "Public Television",
      "Cable Television", "Syndicated Shows", "Reruns", "Classic Episodes",
      "Memorable Moments", "Famous Quotes", "Character Names", "Actor Profiles",
      "Behind the Scenes", "Production Stories", "Network History", "Broadcasting Evolution",
      "Television Technology", "Color Television", "Remote Controls", "TV Guides",
      "Rating Systems", "Nielsen Ratings", "Advertising Revenue", "Sponsor Messages",
      "Commercial Jingles", "Product Placements", "Celebrity Endorsements", "Fan Mail",
      "Studio Tours", "Live Tapings", "Audience Participation", "Home Viewing",
      "Family Gathering", "Appointment Television", "Water Cooler Talk", "Cultural Impact"
    ]
  },

  "Gardening Wisdom": {
    wordSearchNames: [
      "Rose Garden Beauty", "Tulip Spring Blooms", "Sunflower Summer Joy", "Daffodil Early Spring",
      "Iris Rainbow Colors", "Peony Fragrant Blooms", "Lily Elegant Grace", "Dahlia Autumn Glory",
      "Marigold Bright Cheer", "Zinnia Colorful Display", "Cosmos Delicate Beauty", "Petunia Cascade",
      "Impatiens Shade Lovers", "Begonia Waxy Blooms", "Geranium Window Boxes", "Pansy Cool Weather",
      "Snapdragon Tall Spikes", "Sweet Pea Climbing", "Morning Glory Vines", "Nasturtium Edible Flowers",
      "Lavender Aromatic Herb", "Rosemary Culinary Use", "Basil Kitchen Garden", "Thyme Ground Cover",
      "Sage Silver Leaves", "Mint Spreading Herb", "Oregano Pizza Herb", "Parsley Garnish Green",
      "Chives Onion Flavor", "Dill Pickle Herb", "Cilantro Fresh Taste", "Tarragon French Cooking",
      "Tomato Garden Staple", "Pepper Spicy Heat", "Cucumber Cool Crisp", "Lettuce Salad Greens",
      "Spinach Iron Rich", "Kale Superfood Green", "Broccoli Healthy Choice", "Cauliflower White Head",
      "Carrot Orange Root", "Radish Quick Growing", "Beet Earthy Sweet", "Turnip Root Vegetable",
      "Potato Underground Tuber", "Onion Layered Bulb", "Garlic Pungent Cloves", "Leek Mild Onion",
      "Asparagus Spring Spears", "Artichoke Thistle Flower", "Brussels Sprouts Mini Cabbages", "Cabbage Leafy Head",
      "Corn Sweet Kernels", "Bean Climbing Vines", "Pea Cool Season", "Squash Summer Harvest",
      "Pumpkin Fall Orange", "Zucchini Prolific Producer", "Eggplant Purple Beauty", "Okra Southern Favorite",
      "Apple Tree Orchard", "Pear Sweet Fruit", "Cherry Spring Blossoms", "Plum Summer Treat",
      "Peach Fuzzy Skin", "Apricot Early Fruit", "Fig Mediterranean Delight", "Grape Vine Clusters",
      "Berry Patch Picking", "Strawberry Ground Fruit", "Blueberry Antioxidant Rich", "Raspberry Thorny Canes",
      "Blackberry Wild Growing", "Gooseberry Tart Flavor", "Currant Small Berries", "Elderberry Dark Purple"
    ],
    crosswordNames: [
      "Soil Preparation", "Seed Starting", "Plant Nutrition", "Watering Wisdom",
      "Pruning Techniques", "Pest Control", "Disease Prevention", "Organic Methods",
      "Composting Basics", "Mulching Benefits", "Seasonal Care", "Climate Zones",
      "Sun Requirements", "Shade Gardening", "Container Growing", "Raised Beds",
      "Greenhouse Growing", "Indoor Plants", "Houseplant Care", "Propagation Methods",
      "Grafting Techniques", "Companion Planting", "Crop Rotation", "Succession Planting",
      "Harvest Timing", "Storage Methods", "Preservation Techniques", "Seed Saving",
      "Garden Planning", "Layout Design", "Color Schemes", "Texture Combinations",
      "Height Arrangements", "Bloom Times", "Fragrance Gardens", "Butterfly Gardens",
      "Bird Attracting", "Pollinator Plants", "Native Species", "Drought Tolerant",
      "Water Gardens", "Rock Gardens", "Woodland Gardens", "Prairie Gardens",
      "Cottage Gardens", "Formal Gardens", "Japanese Gardens", "Mediterranean Gardens",
      "Herb Spirals", "Vegetable Plots", "Cutting Gardens", "Moon Gardens",
      "Children's Gardens", "Sensory Gardens", "Therapeutic Gardens", "Community Gardens",
      "Urban Gardening", "Balcony Gardens", "Rooftop Gardens", "Vertical Gardens",
      "Hydroponic Systems", "Aquaponic Growing", "Permaculture Principles", "Sustainable Practices",
      "Water Conservation", "Energy Efficiency", "Wildlife Habitat", "Ecosystem Balance",
      "Soil Health", "Beneficial Insects", "Natural Predators", "Integrated Management",
      "Garden Tools", "Equipment Care", "Safety Practices", "Ergonomic Techniques",
      "Garden Records", "Plant Labels", "Growth Tracking", "Weather Monitoring"
    ]
  },

  "Traditional Cooking": {
    wordSearchNames: [
      "Grandma's Apple Pie", "Sunday Roast Dinner", "Homemade Bread Rising", "Chicken Soup Comfort",
      "Beef Stew Hearty", "Meatloaf Family Style", "Pot Roast Tender", "Fried Chicken Crispy",
      "Mashed Potatoes Creamy", "Green Bean Casserole", "Cornbread Golden", "Biscuits Buttermilk",
      "Gravy Rich Brown", "Stuffing Savory", "Cranberry Sauce Tart", "Sweet Potato Casserole",
      "Mac and Cheese Comfort", "Tuna Casserole Classic", "Shepherd's Pie Layers", "Chili Con Carne",
      "Spaghetti Meatballs", "Lasagna Layered", "Pizza Homemade", "Tacos Tuesday Night",
      "Enchiladas Rolled", "Quesadillas Cheesy", "Burrito Bean Rice", "Nachos Loaded",
      "Pancakes Fluffy Stack", "Waffles Crispy Grid", "French Toast Golden", "Eggs Benedict Hollandaise",
      "Scrambled Eggs Creamy", "Omelet Folded Perfect", "Bacon Crispy Strips", "Sausage Breakfast Links",
      "Hash Browns Crispy", "Oatmeal Warm Bowl", "Cereal Morning Crunch", "Toast Buttered",
      "Jam Homemade Spread", "Honey Golden Drizzle", "Maple Syrup Sweet", "Orange Juice Fresh",
      "Coffee Morning Brew", "Tea Afternoon Cup", "Hot Chocolate Warm", "Milk Cold Glass",
      "Cookies Chocolate Chip", "Brownies Fudgy Rich", "Cake Birthday Celebration", "Cupcakes Frosted Sweet",
      "Ice Cream Sundae", "Pie Slice Heaven", "Cobbler Fruit Bubbling", "Pudding Creamy Dessert",
      "Jello Wiggly Fun", "Candy Sweet Treats", "Fudge Rich Chocolate", "Caramel Sticky Sweet",
      "Popcorn Movie Night", "Pretzels Salty Twist", "Chips Crunchy Snack", "Nuts Mixed Bowl",
      "Pickles Dill Crunch", "Olives Briny Bite", "Cheese Aged Sharp", "Crackers Crispy Base",
      "Soup Ladle Warm", "Salad Fresh Greens", "Sandwich Stacked High", "Wrap Rolled Tight"
    ],
    crosswordNames: [
      "Kitchen Essentials", "Cooking Methods", "Baking Basics", "Spice Cabinet",
      "Measuring Tools", "Mixing Bowls", "Cutting Boards", "Sharp Knives",
      "Pots and Pans", "Oven Settings", "Stovetop Cooking", "Slow Cooker Meals",
      "Pressure Cooker", "Food Processor", "Stand Mixer", "Hand Tools",
      "Recipe Cards", "Cookbook Collection", "Family Recipes", "Secret Ingredients",
      "Cooking Techniques", "Food Safety", "Storage Methods", "Meal Planning",
      "Grocery Shopping", "Fresh Ingredients", "Pantry Staples", "Refrigerator Items",
      "Freezer Foods", "Canned Goods", "Dried Herbs", "Fresh Herbs",
      "Seasonal Produce", "Local Farmers", "Organic Options", "Healthy Choices",
      "Comfort Foods", "Holiday Meals", "Birthday Treats", "Special Occasions",
      "Breakfast Ideas", "Lunch Options", "Dinner Plans", "Snack Time",
      "Appetizers", "Main Courses", "Side Dishes", "Dessert Menu",
      "Beverage Pairings", "Wine Selection", "Coffee Brewing", "Tea Varieties",
      "International Cuisine", "Regional Specialties", "Cultural Dishes", "Fusion Cooking",
      "Vegetarian Options", "Vegan Recipes", "Gluten-Free", "Low-Carb Meals",
      "Heart Healthy", "Diabetic Friendly", "Kid Approved", "Senior Favorites",
      "Quick Meals", "Make Ahead", "Freezer Friendly", "One Pot Wonders",
      "Sheet Pan Dinners", "Slow Cooker Set", "Instant Pot Magic", "Air Fryer Crispy",
      "Grilling Season", "BBQ Favorites", "Picnic Foods", "Camping Meals",
      "Kitchen Memories", "Cooking Stories", "Food Traditions", "Culinary Heritage"
    ]
  },

  "Family Memories": {
    wordSearchNames: [
      "Christmas Morning Joy", "Birthday Party Fun", "Wedding Day Bliss", "Anniversary Celebration",
      "Graduation Pride", "Baby's First Steps", "First Day School", "Family Vacation Road Trip",
      "Thanksgiving Gathering", "Easter Egg Hunt", "Halloween Costumes", "Fourth of July Picnic",
      "Summer BBQ Backyard", "Winter Snow Day", "Spring Garden Planting", "Fall Leaf Raking",
      "Grandparents Visit", "Cousins Reunion", "Family Game Night", "Movie Night Popcorn",
      "Bedtime Stories", "Lullaby Singing", "Tooth Fairy Visit", "Santa Claus Belief",
      "Ice Cream Truck", "Playground Adventures", "Beach Sand Castles", "Camping Under Stars",
      "Fishing with Dad", "Baking with Mom", "Grandma's Cookies", "Grandpa's Workshop",
      "Family Photos", "Home Videos", "Scrapbook Pages", "Memory Box Treasures",
      "First Bicycle Ride", "Learning to Drive", "Prom Night Dance", "High School Sports",
      "College Send Off", "First Job Celebration", "New Home Keys", "Pet Adoption Day",
      "Garden Tea Party", "Treehouse Building", "Snowman Creation", "Kite Flying Day",
      "Farmers Market Trip", "Zoo Adventure", "Museum Discovery", "Library Story Time",
      "Church Sunday Best", "School Play Performance", "Piano Recital", "Art Show Display",
      "Science Fair Project", "Spelling Bee Champion", "Soccer Game Cheers", "Dance Recital",
      "Family Recipe Sharing", "Holiday Traditions", "Cultural Heritage", "Ancestral Stories",
      "Old Photo Albums", "Handwritten Letters", "Diary Entries", "Time Capsule Memories",
      "Childhood Bedroom", "Favorite Toys", "Comfort Blanket", "Stuffed Animal Friends",
      "Family Car Trips", "Singing in Car", "License Plate Game", "Are We There Yet",
      "Packing Lunches", "School Bus Rides", "Walking to School", "Neighborhood Friends"
    ],
    crosswordNames: [
      "Family Tree", "Generations Past", "Ancestral Roots", "Heritage Pride",
      "Cultural Traditions", "Holiday Customs", "Celebration Rituals", "Special Occasions",
      "Milestone Moments", "Life Transitions", "Growing Up", "Coming of Age",
      "Childhood Memories", "Teen Years", "Young Adult", "Parenthood Journey",
      "Grandparent Joy", "Elder Wisdom", "Life Lessons", "Values Taught",
      "Love Expressed", "Support Given", "Encouragement Shared", "Dreams Nurtured",
      "Home Sweet Home", "Family Rooms", "Kitchen Table", "Living Room Couch",
      "Backyard Fun", "Front Porch Talks", "Attic Treasures", "Basement Hideout",
      "Neighborhood Life", "Community Bonds", "Friendly Neighbors", "Local Hangouts",
      "School Days", "Teachers Remembered", "Classmates Forever", "Learning Together",
      "Sports Teams", "Music Lessons", "Art Classes", "Drama Club",
      "Summer Camps", "Youth Groups", "Scout Adventures", "Club Activities",
      "Pet Companions", "Animal Friends", "Caring Responsibility", "Unconditional Love",
      "Travel Adventures", "Family Trips", "Vacation Memories", "New Places",
      "Photo Albums", "Video Collections", "Keepsake Boxes", "Memory Books",
      "Handmade Gifts", "Craft Projects", "Art Creations", "DIY Adventures",
      "Garden Memories", "Flower Picking", "Vegetable Growing", "Nature Walks",
      "Seasonal Changes", "Weather Memories", "Storm Stories", "Sunny Days",
      "Food Memories", "Favorite Meals", "Special Recipes", "Cooking Together",
      "Bedtime Routines", "Morning Rituals", "Daily Habits", "Family Rhythms"
    ]
  },

  "Health & Wellness": {
    wordSearchNames: [
      "Morning Yoga Stretch", "Evening Walk Peace", "Meditation Mindfulness", "Deep Breathing Calm",
      "Healthy Breakfast Start", "Nutritious Lunch Energy", "Balanced Dinner Fuel", "Hydration Water Pure",
      "Fresh Fruit Vitamins", "Leafy Greens Nutrients", "Whole Grains Fiber", "Lean Protein Strength",
      "Heart Rate Monitor", "Blood Pressure Check", "Cholesterol Levels", "Blood Sugar Balance",
      "Weight Management", "BMI Calculation", "Body Composition", "Muscle Mass Building",
      "Cardio Exercise Heart", "Strength Training Power", "Flexibility Stretching", "Balance Coordination",
      "Swimming Pool Laps", "Cycling Fresh Air", "Running Trail Nature", "Walking Steps Daily",
      "Gym Workout Routine", "Home Exercise Space", "Outdoor Activities", "Sports Recreation",
      "Sleep Quality Rest", "Bedtime Routine", "Dream Peaceful", "Energy Restoration",
      "Stress Management", "Anxiety Relief", "Mental Health Care", "Emotional Wellbeing",
      "Social Connections", "Family Support", "Friend Networks", "Community Involvement",
      "Preventive Care", "Regular Checkups", "Health Screenings", "Vaccination Protection",
      "Dental Hygiene", "Vision Care", "Hearing Health", "Skin Protection",
      "Vitamin Supplements", "Mineral Balance", "Herbal Remedies", "Natural Healing",
      "First Aid Kit", "Emergency Preparedness", "Safety Measures", "Injury Prevention",
      "Posture Awareness", "Ergonomic Setup", "Back Care", "Joint Health",
      "Hand Washing", "Personal Hygiene", "Clean Environment", "Germ Prevention",
      "Sunscreen Protection", "UV Ray Shield", "Skin Cancer Prevention", "Healthy Tan",
      "Air Quality", "Water Purity", "Food Safety", "Chemical Avoidance",
      "Work Life Balance", "Leisure Time", "Hobby Enjoyment", "Creative Expression"
    ],
    crosswordNames: [
      "Nutrition Facts", "Vitamin Benefits", "Mineral Needs", "Healthy Eating",
      "Exercise Types", "Fitness Goals", "Workout Plans", "Training Methods",
      "Body Systems", "Organ Functions", "Health Conditions", "Disease Prevention",
      "Medical Terms", "Healthcare Providers", "Treatment Options", "Recovery Process",
      "Mental Wellness", "Emotional Health", "Stress Factors", "Coping Strategies",
      "Sleep Science", "Rest Importance", "Dream Cycles", "Insomnia Solutions",
      "Heart Health", "Cardiovascular", "Blood Circulation", "Pulse Rhythm",
      "Respiratory System", "Lung Capacity", "Breathing Techniques", "Oxygen Flow",
      "Digestive Health", "Gut Bacteria", "Fiber Benefits", "Hydration Needs",
      "Immune System", "Antibody Defense", "Infection Fighting", "Wellness Boost",
      "Bone Strength", "Calcium Sources", "Osteoporosis Prevention", "Joint Care",
      "Muscle Building", "Protein Synthesis", "Recovery Time", "Strength Gains",
      "Weight Control", "Calorie Balance", "Metabolism Rate", "Fat Burning",
      "Skin Health", "Collagen Production", "Anti-Aging", "Sun Protection",
      "Eye Care", "Vision Health", "Screen Time", "Reading Glasses",
      "Hearing Protection", "Noise Levels", "Ear Health", "Sound Therapy",
      "Dental Care", "Oral Hygiene", "Cavity Prevention", "Gum Health",
      "Preventive Medicine", "Health Screenings", "Early Detection", "Risk Assessment",
      "Alternative Medicine", "Holistic Approach", "Natural Remedies", "Complementary Care",
      "Wellness Lifestyle", "Healthy Habits", "Daily Routines", "Long-term Health"
    ]
  },

  "Hobbies & Crafts": {
    wordSearchNames: [
      "Knitting Needles Click", "Crochet Hook Dance", "Embroidery Hoop Art", "Cross Stitch Pattern",
      "Quilting Fabric Squares", "Sewing Machine Hum", "Pattern Cutting", "Button Collection",
      "Thread Spool Rainbow", "Needle Sharp Point", "Thimble Finger Guard", "Scissors Sharp Cut",
      "Painting Canvas Blank", "Watercolor Wash", "Oil Paint Thick", "Acrylic Bright Colors",
      "Brush Stroke Smooth", "Palette Knife Mix", "Easel Standing Tall", "Art Studio Space",
      "Drawing Pencil Lead", "Charcoal Smudge", "Pastel Soft Color", "Ink Pen Line",
      "Sketchbook Pages", "Paper Texture", "Eraser Clean Slate", "Blending Stump",
      "Pottery Wheel Spin", "Clay Soft Mold", "Kiln Fire Hot", "Glaze Shiny Coat",
      "Sculpture Chisel", "Carving Wood Grain", "Stone Hard Surface", "Metal Forge",
      "Jewelry Wire Wrap", "Beads String Together", "Gemstone Sparkle", "Silver Polish",
      "Scrapbook Memory", "Photo Album Pages", "Sticker Collection", "Washi Tape",
      "Card Making Paper", "Stamp Ink Pad", "Die Cut Shapes", "Ribbon Bow",
      "Woodworking Saw", "Hammer Nail Drive", "Sandpaper Smooth", "Stain Wood Color",
      "Garden Trowel Dig", "Seeds Plant Hope", "Watering Can Sprinkle", "Pruning Shears",
      "Photography Camera", "Lens Focus Sharp", "Light Exposure", "Darkroom Develop",
      "Cooking Recipe Try", "Baking Oven Warm", "Spice Blend Mix", "Taste Test",
      "Reading Book Page", "Writing Story Tell", "Journal Daily", "Poetry Verse",
      "Music Instrument", "Guitar String Strum", "Piano Key Press", "Violin Bow",
      "Dance Step Move", "Theater Stage", "Costume Design", "Makeup Artist"
    ],
    crosswordNames: [
      "Craft Supplies", "Art Materials", "Tool Collection", "Workshop Setup",
      "Project Planning", "Skill Development", "Technique Learning", "Creative Process",
      "Inspiration Sources", "Design Elements", "Color Theory", "Pattern Making",
      "Texture Variety", "Material Properties", "Quality Tools", "Safety Equipment",
      "Storage Solutions", "Organization Tips", "Workspace Design", "Lighting Needs",
      "Time Management", "Budget Planning", "Cost Effective", "Resource Sharing",
      "Community Groups", "Class Instruction", "Online Tutorials", "Skill Exchange",
      "Show and Tell", "Competition Entry", "Gallery Display", "Gift Giving",
      "Personal Satisfaction", "Stress Relief", "Mental Health", "Creative Outlet",
      "Problem Solving", "Critical Thinking", "Hand Coordination", "Fine Motor",
      "Patience Building", "Focus Training", "Attention Detail", "Quality Control",
      "Tradition Keeping", "Cultural Heritage", "Family Skills", "Generation Pass",
      "Innovation Trying", "Experiment New", "Mistake Learning", "Improvement Goal",
      "Hobby Evolution", "Interest Growth", "Passion Discovery", "Talent Development",
      "Social Connection", "Friend Making", "Group Projects", "Collaboration",
      "Teaching Others", "Sharing Knowledge", "Mentoring New", "Legacy Building",
      "Personal Style", "Unique Voice", "Artistic Vision", "Creative Identity",
      "Seasonal Projects", "Holiday Crafts", "Special Occasions", "Memory Making",
      "Therapeutic Benefits", "Mindful Practice", "Meditation Motion", "Peaceful Activity"
    ]
  },

  "Fairy Tales": {
    wordSearchNames: [
      "Cinderella Glass Slipper", "Snow White Seven Dwarfs", "Sleeping Beauty Spindle", "Little Red Riding Hood",
      "Goldilocks Three Bears", "Jack and the Beanstalk", "Hansel and Gretel", "Rapunzel Long Hair",
      "The Little Mermaid", "Beauty and the Beast", "Rumpelstiltskin Gold", "The Frog Prince",
      "Thumbelina Tiny Girl", "The Ugly Duckling", "The Little Match Girl", "The Snow Queen",
      "Puss in Boots", "The Gingerbread Man", "Three Little Pigs", "The Big Bad Wolf",
      "Little Bo Peep", "Mary Had a Little Lamb", "Humpty Dumpty Wall", "Jack and Jill Hill",
      "Old Mother Hubbard", "Hickory Dickory Dock", "Hey Diddle Diddle", "Rock-a-Bye Baby",
      "Twinkle Twinkle Star", "Baa Baa Black Sheep", "London Bridge Falling", "Ring Around Rosie",
      "Alice in Wonderland", "Mad Hatter Tea Party", "Cheshire Cat Grin", "Queen of Hearts",
      "White Rabbit Late", "Caterpillar Hookah", "March Hare Mad", "Dormouse Sleepy",
      "Peter Pan Never Land", "Tinker Bell Fairy", "Captain Hook Pirate", "Wendy Darling",
      "Pinocchio Wooden Boy", "Jiminy Cricket", "Blue Fairy Wish", "Geppetto Puppet Maker",
      "The Wizard of Oz", "Dorothy Ruby Slippers", "Scarecrow Brain", "Tin Man Heart",
      "Cowardly Lion Courage", "Toto Little Dog", "Yellow Brick Road", "Emerald City",
      "Aladdin Magic Lamp", "Genie Three Wishes", "Princess Jasmine", "Magic Carpet Ride",
      "The Lion King", "Simba Young Cub", "Mufasa Wise King", "Timon and Pumbaa",
      "Frozen Elsa Powers", "Anna Sister Love", "Olaf Snowman", "Kristoff Ice Harvester",
      "Moana Ocean Heart", "Maui Demigod", "Te Fiti Island", "Grandmother Willow",
      "Mulan Warrior Girl", "Mushu Dragon", "Li Shang Captain", "Emperor's Palace"
    ],
    crosswordNames: [
      "Magic Spells", "Enchanted Objects", "Fairy Godmothers", "Wicked Witches",
      "Brave Princes", "Beautiful Princesses", "Talking Animals", "Magical Creatures",
      "Castles Grand", "Cottages Small", "Dark Forests", "Enchanted Gardens",
      "Crystal Balls", "Magic Mirrors", "Flying Carpets", "Seven League Boots",
      "Poison Apples", "Spinning Wheels", "Glass Slippers", "Magic Beans",
      "Treasure Chests", "Golden Eggs", "Silver Keys", "Diamond Rings",
      "Fairy Wings", "Magic Wands", "Spell Books", "Potion Bottles",
      "Dragon Caves", "Tower Tall", "Bridge Troll", "Wishing Wells",
      "Midnight Hour", "True Love Kiss", "Happy Endings", "Once Upon Time",
      "Long Ago", "Far Away", "Kingdom Distant", "Land Magical",
      "Good Triumphs", "Evil Defeated", "Lessons Learned", "Morals Taught",
      "Dreams Come True", "Wishes Granted", "Hope Restored", "Faith Rewarded",
      "Courage Found", "Love Conquers", "Friendship Wins", "Family Bonds",
      "Growing Up", "Coming Age", "Finding Self", "Inner Strength",
      "Overcoming Fear", "Facing Challenges", "Learning Wisdom", "Gaining Knowledge",
      "Helping Others", "Kindness Matters", "Sharing Caring", "Giving Receiving",
      "Nature Magic", "Animal Friends", "Forest Spirits", "Ocean Depths",
      "Mountain Heights", "Desert Sands", "Snowy Lands", "Tropical Islands",
      "Storytelling Art", "Oral Tradition", "Written Tales", "Illustrated Books",
      "Cultural Heritage", "Universal Themes", "Timeless Stories", "Childhood Wonder"
    ]
  },

  "Zoo Animals": {
    wordSearchNames: [
      "African Elephant Herd", "Asian Tiger Stripes", "Giant Panda Bamboo", "Polar Bear Arctic",
      "Brown Bear Forest", "Black Bear Climbing", "Grizzly Bear Salmon", "Sun Bear Honey",
      "Lion Pride Roar", "Leopard Spotted Coat", "Cheetah Speed Run", "Jaguar Jungle",
      "Giraffe Tall Neck", "Zebra Black Stripes", "Hippopotamus River", "Rhinoceros Horn",
      "Chimpanzee Swing", "Orangutan Tree", "Gorilla Silverback", "Baboon Troop",
      "Kangaroo Hop Jump", "Koala Eucalyptus", "Wombat Burrow", "Tasmanian Devil",
      "Red Fox Clever", "Arctic Fox White", "Gray Wolf Pack", "Coyote Howl",
      "Bald Eagle Soar", "Golden Eagle Hunt", "Owl Hoot Night", "Hawk Circle Sky",
      "Peacock Feather Fan", "Flamingo Pink Stand", "Penguin Waddle Ice", "Ostrich Run Fast",
      "Crocodile Snap Jaw", "Alligator Swamp", "Komodo Dragon", "Iguana Sunbath",
      "Python Coil Squeeze", "Cobra Hood Spread", "Rattlesnake Warning", "Boa Constrictor",
      "Sea Turtle Swim", "Tortoise Shell Hard", "Frog Lily Pad", "Toad Garden Hop",
      "Shark Fin Water", "Dolphin Play Jump", "Whale Song Deep", "Seal Clap Flippers",
      "Octopus Eight Arms", "Jellyfish Float", "Starfish Five Points", "Crab Sidewalk",
      "Butterfly Wing Color", "Bee Buzz Flower", "Ant Colony March", "Spider Web Silk",
      "Monkey Banana Eat", "Lemur Ring Tail", "Sloth Slow Move", "Armadillo Roll Ball",
      "Deer Antler Rack", "Moose Antler Wide", "Elk Bugle Call", "Caribou Migration",
      "Camel Hump Desert", "Llama Soft Wool", "Alpaca Fluffy Coat", "Yak Mountain High",
      "Horse Gallop Free", "Donkey Bray Loud", "Mule Stubborn", "Pony Small Size"
    ],
    crosswordNames: [
      "Animal Habitats", "Food Chains", "Predator Prey", "Migration Patterns",
      "Animal Behavior", "Social Groups", "Communication", "Survival Skills",
      "Adaptation Features", "Camouflage Colors", "Defense Mechanisms", "Hunting Strategies",
      "Breeding Seasons", "Parental Care", "Offspring Names", "Life Cycles",
      "Endangered Species", "Conservation Efforts", "Wildlife Protection", "Habitat Loss",
      "Zoo Education", "Animal Care", "Veterinary Medicine", "Enrichment Activities",
      "Animal Training", "Keeper Duties", "Feeding Schedules", "Health Monitoring",
      "Exhibit Design", "Safety Measures", "Visitor Experience", "Educational Programs",
      "Research Studies", "Breeding Programs", "Species Survival", "Genetic Diversity",
      "Animal Classification", "Taxonomy Groups", "Scientific Names", "Common Names",
      "Physical Features", "Body Parts", "Sensory Organs", "Locomotion Methods",
      "Diet Types", "Feeding Habits", "Nutritional Needs", "Food Sources",
      "Seasonal Changes", "Weather Adaptations", "Temperature Control", "Shelter Needs",
      "Territory Marking", "Dominance Hierarchy", "Mating Rituals", "Courtship Displays",
      "Animal Intelligence", "Problem Solving", "Tool Use", "Memory Skills",
      "Nocturnal Animals", "Diurnal Species", "Crepuscular Activity", "Sleep Patterns",
      "Animal Sounds", "Vocal Communication", "Body Language", "Scent Marking",
      "Symbiotic Relationships", "Mutualism", "Parasitism", "Commensalism",
      "Ecosystem Roles", "Environmental Impact", "Biodiversity", "Natural Balance",
      "Animal Rights", "Ethical Treatment", "Welfare Standards", "Conservation Ethics"
    ]
  },

  "School Days": {
    wordSearchNames: [
      "First Day Jitters", "Classroom Rules", "Alphabet Learning", "Number Counting",
      "Reading Books", "Writing Stories", "Math Problems", "Science Experiments",
      "Art Projects", "Music Class", "Physical Education", "Library Time",
      "Recess Playground", "Lunch Cafeteria", "School Bus Ride", "Walking Line",
      "Homework Assignment", "Test Taking", "Report Cards", "Parent Conference",
      "Field Trip Adventure", "Assembly Program", "School Play", "Talent Show",
      "Spelling Bee", "Science Fair", "Book Report", "Show and Tell",
      "Classroom Pet", "Bulletin Board", "Desk Organization", "Pencil Sharpener",
      "Backpack Heavy", "Lunch Box", "Water Bottle", "School Supplies",
      "Teacher Helper", "Line Leader", "Door Holder", "Board Eraser",
      "Crayon Colors", "Glue Stick", "Safety Scissors", "Construction Paper",
      "Friendship Bonds", "Playground Games", "Jump Rope", "Hopscotch",
      "Tag You're It", "Hide and Seek", "Red Light Green", "Duck Duck Goose",
      "Kindergarten Start", "First Grade Reading", "Second Grade Math", "Third Grade Cursive",
      "Fourth Grade Research", "Fifth Grade Leadership", "Middle School Change", "High School Prep",
      "Morning Announcements", "Pledge Allegiance", "National Anthem", "School Song",
      "Fire Drill Practice", "Tornado Drill", "Safety First", "Emergency Procedures",
      "Lost Tooth", "Tooth Fairy", "Growing Taller", "New Shoes",
      "Birthday Celebration", "Holiday Parties", "Valentine Cards", "Halloween Costume",
      "Christmas Program", "Spring Concert", "Graduation Day", "Summer Vacation"
    ],
    crosswordNames: [
      "School Subjects", "Learning Tools", "Classroom Items", "Educational Games",
      "Study Skills", "Test Strategies", "Note Taking", "Time Management",
      "Reading Comprehension", "Writing Skills", "Math Concepts", "Science Methods",
      "History Facts", "Geography Maps", "Language Arts", "Foreign Languages",
      "Computer Skills", "Technology Use", "Internet Safety", "Digital Citizenship",
      "Critical Thinking", "Problem Solving", "Creative Expression", "Artistic Skills",
      "Musical Instruments", "Physical Fitness", "Health Education", "Nutrition Facts",
      "Social Skills", "Teamwork", "Leadership", "Communication",
      "Respect Others", "Following Rules", "Responsibility", "Honesty",
      "Perseverance", "Goal Setting", "Achievement", "Success",
      "Teacher Roles", "Principal Duties", "Counselor Help", "Librarian Services",
      "Custodian Care", "Secretary Office", "Nurse Health", "Coach Sports",
      "Parent Involvement", "Volunteer Help", "Community Support", "School Board",
      "Curriculum Standards", "Assessment Methods", "Progress Reports", "Grade Levels",
      "Special Programs", "Gifted Education", "Special Needs", "ESL Support",
      "After School", "Clubs Activities", "Sports Teams", "Student Council",
      "Yearbook Committee", "Newspaper Staff", "Drama Club", "Band Orchestra",
      "School Spirit", "Mascot Pride", "School Colors", "Traditions",
      "Memory Making", "Friendship Building", "Learning Growth", "Future Dreams"
    ]
  },

  "Beach Vacation": {
    wordSearchNames: [
      "Sandy Toes Warm", "Ocean Waves Crash", "Seashell Treasure Hunt", "Sandcastle Building",
      "Beach Ball Toss", "Frisbee Flying Disc", "Volleyball Net Game", "Surfboard Riding",
      "Boogie Board Fun", "Snorkel Underwater", "Scuba Diving Deep", "Fishing Pier Cast",
      "Sailboat Wind Power", "Kayak Paddle Stroke", "Jet Ski Speed", "Parasailing High",
      "Sunset Golden Hour", "Sunrise Early Light", "Lighthouse Beacon", "Pier Walking",
      "Boardwalk Stroll", "Beach Umbrella Shade", "Lounge Chair Relax", "Hammock Swing",
      "Coconut Palm Tree", "Tropical Breeze", "Salt Air Fresh", "Seagull Cry",
      "Pelican Dive", "Dolphin Play", "Sea Turtle Nest", "Crab Scurry",
      "Starfish Five Points", "Sand Dollar Find", "Conch Shell Sound", "Coral Reef Color",
      "Tide Pool Explore", "Driftwood Smooth", "Beach Glass Green", "Pebble Collection",
      "Sunscreen Protection", "Sun Hat Wide Brim", "Sunglasses Dark", "Beach Towel Soft",
      "Flip Flops Easy", "Swimsuit Bright", "Cover Up Light", "Beach Bag Pack",
      "Cooler Ice Cold", "Picnic Lunch", "Fresh Fruit", "Cold Drinks",
      "Ice Cream Cone", "Popsicle Frozen", "Lemonade Tart", "Iced Tea Sweet",
      "Beach Bonfire", "Marshmallow Roast", "Guitar Music", "Stories Told",
      "Stargazing Night", "Moon Reflection", "Campfire Glow", "Night Sounds",
      "Morning Jog", "Beach Yoga", "Meditation Calm", "Deep Breathing",
      "Shell Collecting", "Sand Art", "Beach Photography", "Memory Making",
      "Vacation Relaxation", "Stress Relief", "Peaceful Moments", "Happy Times"
    ],
    crosswordNames: [
      "Ocean Life", "Marine Animals", "Sea Creatures", "Underwater World",
      "Beach Activities", "Water Sports", "Sand Games", "Shore Fun",
      "Tropical Paradise", "Island Life", "Coastal Living", "Seaside Resort",
      "Vacation Planning", "Travel Packing", "Hotel Booking", "Flight Schedules",
      "Weather Patterns", "Tide Charts", "Surf Reports", "Beach Conditions",
      "Sun Safety", "Skin Protection", "Hydration Needs", "Heat Precautions",
      "Swimming Skills", "Water Safety", "Lifeguard Duties", "Emergency Procedures",
      "Beach Equipment", "Rental Services", "Activity Guides", "Local Attractions",
      "Seafood Dining", "Beachside Restaurants", "Tropical Drinks", "Fresh Catch",
      "Souvenir Shopping", "Local Crafts", "Beach Wear", "Vacation Memories",
      "Photography Tips", "Sunset Shots", "Action Photos", "Family Pictures",
      "Relaxation Techniques", "Stress Reduction", "Mental Health", "Physical Wellness",
      "Environmental Awareness", "Ocean Conservation", "Beach Cleanup", "Marine Protection",
      "Cultural Experiences", "Local Traditions", "Island History", "Native Culture",
      "Adventure Tours", "Excursion Options", "Guided Trips", "Self Exploration",
      "Family Fun", "Kid Activities", "Teen Adventures", "Adult Relaxation",
      "Romantic Getaway", "Couple Time", "Honeymoon Bliss", "Anniversary Trip",
      "Group Vacations", "Friend Trips", "Reunion Gatherings", "Corporate Retreats",
      "Budget Travel", "Luxury Resorts", "All Inclusive", "Vacation Rentals",
      "Seasonal Visits", "Peak Times", "Off Season", "Weather Considerations"
    ]
  },

  "Mountain Retreat": {
    wordSearchNames: [
      "Alpine Meadow Flowers", "Pine Forest Scent", "Mountain Peak Summit", "Valley View Below",
      "Hiking Trail Winding", "Backpack Adventure", "Camping Under Stars", "Tent Setup",
      "Sleeping Bag Warm", "Campfire Crackling", "Marshmallow Roasting", "Ghost Stories",
      "Fresh Air Breathing", "Clean Water Stream", "Wildlife Spotting", "Bird Watching",
      "Deer Grazing", "Eagle Soaring", "Chipmunk Scurry", "Squirrel Gathering",
      "Rock Climbing Challenge", "Rappelling Down", "Bouldering Strength", "Via Ferrata",
      "Mountain Biking", "Trail Running", "Nordic Walking", "Snowshoeing Winter",
      "Skiing Powder Snow", "Snowboarding Fun", "Ice Climbing", "Winter Sports",
      "Cabin Cozy Retreat", "Fireplace Warmth", "Hot Cocoa Mug", "Wool Blanket",
      "Sunrise Mountain Glow", "Sunset Alpine Light", "Star Filled Sky", "Milky Way",
      "Photography Nature", "Landscape Shots", "Wildlife Photos", "Macro Flowers",
      "Meditation Peaceful", "Yoga Mountain Pose", "Deep Breathing", "Mindfulness",
      "Fishing Mountain Lake", "Trout Jumping", "Fly Fishing Cast", "Peaceful Angling",
      "Kayaking Lake", "Canoeing Quiet", "Paddleboarding", "Water Reflection",
      "Picnic Scenic Spot", "Trail Mix Snack", "Energy Bars", "Water Bottle",
      "Map Reading", "Compass Navigation", "GPS Device", "Trail Markers",
      "Weather Watching", "Cloud Formation", "Storm Approaching", "Clear Skies",
      "Altitude Adjustment", "Thin Air", "Slow Pace", "Rest Breaks",
      "Mountain Rescue", "Safety First", "Emergency Kit", "Communication Device"
    ],
    crosswordNames: [
      "Mountain Ranges", "Peak Names", "Elevation Heights", "Geographic Features",
      "Hiking Equipment", "Outdoor Gear", "Safety Items", "Navigation Tools",
      "Weather Conditions", "Climate Zones", "Seasonal Changes", "Temperature Ranges",
      "Flora Fauna", "Plant Species", "Animal Habitats", "Ecosystem Balance",
      "Geological Features", "Rock Formations", "Mineral Deposits", "Erosion Patterns",
      "Trail Systems", "Difficulty Levels", "Distance Markers", "Elevation Gain",
      "Camping Regulations", "Permit Requirements", "Leave No Trace", "Environmental Ethics",
      "Survival Skills", "Emergency Procedures", "First Aid", "Rescue Techniques",
      "Physical Fitness", "Endurance Training", "Strength Building", "Flexibility",
      "Mental Preparation", "Goal Setting", "Challenge Acceptance", "Fear Management",
      "Group Dynamics", "Leadership Skills", "Team Building", "Communication",
      "Solo Adventures", "Self Reliance", "Independence", "Personal Growth",
      "Photography Skills", "Equipment Care", "Composition Tips", "Lighting Techniques",
      "Nature Appreciation", "Environmental Awareness", "Conservation Efforts", "Sustainability",
      "Cultural History", "Indigenous Peoples", "Mining Heritage", "Settlement Stories",
      "Recreation Activities", "Seasonal Sports", "Adventure Tourism", "Eco Tourism",
      "Health Benefits", "Physical Exercise", "Mental Wellness", "Stress Relief",
      "Spiritual Connection", "Nature Therapy", "Mindful Presence", "Inner Peace",
      "Family Adventures", "Teaching Children", "Outdoor Education", "Life Skills",
      "Memory Making", "Shared Experiences", "Bonding Time", "Tradition Building"
    ]
  },

  "Spa & Wellness": {
    wordSearchNames: [
      "Massage Therapy Relax", "Facial Treatment Glow", "Aromatherapy Essential Oils", "Hot Stone Warmth",
      "Swedish Massage", "Deep Tissue Work", "Reflexology Feet", "Acupuncture Points",
      "Meditation Room Quiet", "Yoga Class Stretch", "Pilates Core Strength", "Tai Chi Flow",
      "Sauna Heat Sweat", "Steam Room Moist", "Jacuzzi Bubbles", "Cold Plunge Pool",
      "Mud Wrap Detox", "Seaweed Body Wrap", "Salt Scrub Exfoliate", "Sugar Scrub Sweet",
      "Manicure Nail Care", "Pedicure Foot Pamper", "Hair Treatment Shine", "Scalp Massage",
      "Cucumber Eye Mask", "Collagen Face Mask", "Hydrating Serum", "Anti Aging Cream",
      "Herbal Tea Soothing", "Infused Water Fresh", "Healthy Smoothie", "Detox Juice",
      "Quiet Reading Nook", "Peaceful Garden", "Fountain Water Sound", "Soft Music",
      "Candlelight Ambiance", "Dim Lighting", "Comfortable Robes", "Plush Slippers",
      "Lavender Scent Calm", "Eucalyptus Fresh", "Peppermint Energize", "Rose Romance",
      "Chamomile Soothe", "Jasmine Exotic", "Sandalwood Grounding", "Vanilla Comfort",
      "Breathing Exercise", "Progressive Relaxation", "Guided Imagery", "Mindfulness Practice",
      "Stress Relief", "Tension Release", "Muscle Relaxation", "Mental Clarity",
      "Energy Renewal", "Vitality Boost", "Immune Support", "Circulation Improve",
      "Sleep Quality", "Rest Restoration", "Dream Peaceful", "Morning Refreshed",
      "Skin Rejuvenation", "Cellular Renewal", "Hydration Boost", "Radiant Complexion",
      "Inner Peace", "Emotional Balance", "Spiritual Wellness", "Holistic Health",
      "Self Care Ritual", "Personal Time", "Me Time", "Wellness Journey"
    ],
    crosswordNames: [
      "Spa Treatments", "Wellness Services", "Relaxation Methods", "Therapeutic Techniques",
      "Essential Oils", "Aromatherapy Benefits", "Natural Ingredients", "Organic Products",
      "Massage Types", "Bodywork Styles", "Healing Touch", "Pressure Points",
      "Skincare Routine", "Beauty Treatments", "Anti Aging", "Skin Health",
      "Stress Management", "Anxiety Relief", "Mental Wellness", "Emotional Health",
      "Physical Therapy", "Pain Relief", "Injury Recovery", "Mobility Improvement",
      "Nutrition Counseling", "Healthy Eating", "Dietary Supplements", "Wellness Coaching",
      "Fitness Programs", "Exercise Classes", "Personal Training", "Group Activities",
      "Meditation Practices", "Mindfulness Training", "Spiritual Guidance", "Inner Work",
      "Sleep Therapy", "Rest Improvement", "Insomnia Treatment", "Dream Work",
      "Detoxification", "Cleansing Programs", "Toxin Removal", "Body Purification",
      "Hydrotherapy", "Water Treatments", "Aquatic Therapy", "Healing Waters",
      "Energy Healing", "Chakra Balancing", "Reiki Treatment", "Crystal Therapy",
      "Sound Healing", "Music Therapy", "Vibrational Medicine", "Frequency Healing",
      "Color Therapy", "Light Treatment", "Chromotherapy", "Visual Healing",
      "Breathwork", "Pranayama", "Oxygen Therapy", "Respiratory Health",
      "Posture Correction", "Alignment Therapy", "Ergonomic Assessment", "Body Mechanics",
      "Lifestyle Changes", "Habit Formation", "Behavior Modification", "Goal Achievement",
      "Preventive Care", "Health Maintenance", "Wellness Planning", "Longevity Strategies",
      "Mind Body Connection", "Holistic Approach", "Integrative Medicine", "Whole Person Care"
    ]
  }
};

// Generate unique word search names for a theme
export function generateWordSearchNames(theme: string): string[] {
  // First check if we have predefined templates
  const templates = THEME_TEMPLATES[theme];
  if (templates && templates.wordSearchNames && templates.wordSearchNames.length >= 75) {
    return templates.wordSearchNames.slice(0, 75);
  }

  // If we have some predefined names but not enough, use them and pad
  if (templates && templates.wordSearchNames && templates.wordSearchNames.length > 0) {
    const names = [...templates.wordSearchNames];
    for (let i = names.length; i < 75; i++) {
      names.push(`${theme} Word Search ${i + 1}`);
    }
    return names;
  }

  // For themes without predefined templates, check if theme data has puzzle names
  const { getExpandedThemeDataComplete } = require('@/utils/elderlyFriendlyThemes');
  const themeData = getExpandedThemeDataComplete(theme);
  
  if (themeData && themeData.puzzleNames && themeData.puzzleNames.wordSearchNames) {
    return themeData.puzzleNames.wordSearchNames.slice(0, 75);
  }

  // Generate themed names based on the theme
  return generateThemedWordSearchNames(theme);
}

// Generate unique crossword names for a theme
export function generateCrosswordNames(theme: string): string[] {
  // First check if we have predefined templates
  const templates = THEME_TEMPLATES[theme];
  if (templates && templates.crosswordNames && templates.crosswordNames.length >= 75) {
    return templates.crosswordNames.slice(0, 75);
  }

  // If we have some predefined names but not enough, use them and pad
  if (templates && templates.crosswordNames && templates.crosswordNames.length > 0) {
    const names = [...templates.crosswordNames];
    for (let i = names.length; i < 75; i++) {
      names.push(`${theme} Crossword ${i + 1}`);
    }
    return names;
  }

  // For themes without predefined templates, check if theme data has puzzle names
  const { getExpandedThemeDataComplete } = require('@/utils/elderlyFriendlyThemes');
  const themeData = getExpandedThemeDataComplete(theme);
  
  if (themeData && themeData.puzzleNames && themeData.puzzleNames.crosswordNames) {
    return themeData.puzzleNames.crosswordNames.slice(0, 75);
  }

  // Generate themed names based on the theme
  return generateThemedCrosswordNames(theme);
}

// Generate themed word search names based on the theme
function generateThemedWordSearchNames(theme: string): string[] {
  const baseNames = [
    "Discovery", "Adventure", "Journey", "Exploration", "Quest", "Hunt", "Search", "Find",
    "Collection", "Gathering", "Assembly", "Compilation", "Selection", "Variety", "Mix", "Blend",
    "Memories", "Moments", "Times", "Days", "Years", "Seasons", "Experiences", "Stories",
    "Treasures", "Gems", "Jewels", "Pearls", "Diamonds", "Gold", "Silver", "Riches",
    "Wonders", "Marvels", "Miracles", "Magic", "Enchantment", "Charm", "Beauty", "Grace",
    "Legends", "Tales", "Myths", "Folklore", "History", "Heritage", "Tradition", "Culture",
    "Classics", "Favorites", "Beloved", "Cherished", "Special", "Unique", "Rare", "Precious",
    "Celebration", "Festival", "Party", "Gathering", "Reunion", "Meeting", "Assembly", "Convention",
    "Paradise", "Haven", "Sanctuary", "Retreat", "Refuge", "Oasis", "Garden", "Valley",
    "Spotlight", "Focus", "Highlight", "Feature", "Showcase", "Display", "Exhibition", "Gallery"
  ];

  return Array.from({ length: 75 }, (_, i) => {
    const baseName = baseNames[i % baseNames.length];
    const number = Math.floor(i / baseNames.length) + 1;
    return number === 1 ? `${theme} ${baseName}` : `${theme} ${baseName} ${number}`;
  });
}

// Generate themed crossword names based on the theme
function generateThemedCrosswordNames(theme: string): string[] {
  const baseNames = [
    "Challenge", "Puzzle", "Brain Teaser", "Mind Bender", "Quiz", "Test", "Trivia", "Knowledge",
    "Facts", "Information", "Details", "Specifics", "Particulars", "Elements", "Features", "Aspects",
    "Concepts", "Ideas", "Thoughts", "Notions", "Principles", "Fundamentals", "Basics", "Essentials",
    "Mastery", "Expertise", "Skill", "Talent", "Ability", "Proficiency", "Competence", "Excellence",
    "Wisdom", "Intelligence", "Insight", "Understanding", "Comprehension", "Awareness", "Recognition", "Perception",
    "Study", "Learning", "Education", "Training", "Instruction", "Teaching", "Guidance", "Direction",
    "Analysis", "Examination", "Investigation", "Research", "Inquiry", "Study", "Review", "Survey",
    "Connection", "Link", "Bond", "Tie", "Relationship", "Association", "Union", "Alliance",
    "Pattern", "Design", "Structure", "Framework", "System", "Organization", "Arrangement", "Layout",
    "Solution", "Answer", "Resolution", "Conclusion", "Result", "Outcome", "Finding", "Discovery"
  ];

  return Array.from({ length: 75 }, (_, i) => {
    const baseName = baseNames[i % baseNames.length];
    const number = Math.floor(i / baseNames.length) + 1;
    return number === 1 ? `${theme} ${baseName}` : `${theme} ${baseName} ${number}`;
  });
}

// Generate unique word sets to ensure no repetition across puzzles
export function generateUniqueWordSets(allWords: string[], puzzleCount: number, maxWordsPerPuzzle: number): string[][] {
  const wordSets: string[][] = [];
  const usedWords = new Set<string>();
  const shuffledWords = [...allWords].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < puzzleCount; i++) {
    const puzzleWords: string[] = [];
    let wordIndex = 0;
    
    // Try to get unique words for this puzzle
    while (puzzleWords.length < maxWordsPerPuzzle && wordIndex < shuffledWords.length) {
      const word = shuffledWords[wordIndex];
      
      if (!usedWords.has(word)) {
        puzzleWords.push(word);
        usedWords.add(word);
      }
      
      wordIndex++;
      
      // If we've gone through all words and still need more, start reusing
      if (wordIndex >= shuffledWords.length && puzzleWords.length < maxWordsPerPuzzle) {
        const remainingNeeded = maxWordsPerPuzzle - puzzleWords.length;
        const additionalWords = shuffledWords
          .filter(w => !puzzleWords.includes(w))
          .slice(0, remainingNeeded);
        puzzleWords.push(...additionalWords);
        break;
      }
    }
    
    // If we still don't have enough words, fill with remaining words
    if (puzzleWords.length < maxWordsPerPuzzle) {
      const remainingWords = shuffledWords.filter(w => !puzzleWords.includes(w));
      const needed = maxWordsPerPuzzle - puzzleWords.length;
      puzzleWords.push(...remainingWords.slice(0, needed));
    }
    
    wordSets.push(puzzleWords);
  }
  
  return wordSets;
}

// Generate unique clue sets to ensure no repetition across puzzles
export function generateUniqueCluesets(allClues: { word: string; clue: string }[], puzzleCount: number, maxCluesPerPuzzle: number): { word: string; clue: string }[][] {
  const clueSets: { word: string; clue: string }[][] = [];
  const usedClues = new Set<string>();
  const shuffledClues = [...allClues].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < puzzleCount; i++) {
    const puzzleClues: { word: string; clue: string }[] = [];
    let clueIndex = 0;
    
    // Try to get unique clues for this puzzle
    while (puzzleClues.length < maxCluesPerPuzzle && clueIndex < shuffledClues.length) {
      const clue = shuffledClues[clueIndex];
      const clueKey = `${clue.word}-${clue.clue}`;
      
      if (!usedClues.has(clueKey)) {
        puzzleClues.push(clue);
        usedClues.add(clueKey);
      }
      
      clueIndex++;
      
      // If we've gone through all clues and still need more, start reusing
      if (clueIndex >= shuffledClues.length && puzzleClues.length < maxCluesPerPuzzle) {
        const remainingNeeded = maxCluesPerPuzzle - puzzleClues.length;
        const additionalClues = shuffledClues
          .filter(c => !puzzleClues.some(pc => pc.word === c.word && pc.clue === c.clue))
          .slice(0, remainingNeeded);
        puzzleClues.push(...additionalClues);
        break;
      }
    }
    
    // If we still don't have enough clues, fill with remaining clues
    if (puzzleClues.length < maxCluesPerPuzzle) {
      const remainingClues = shuffledClues.filter(c => 
        !puzzleClues.some(pc => pc.word === c.word && pc.clue === c.clue)
      );
      const needed = maxCluesPerPuzzle - puzzleClues.length;
      puzzleClues.push(...remainingClues.slice(0, needed));
    }
    
    clueSets.push(puzzleClues);
  }
  
  return clueSets;
}