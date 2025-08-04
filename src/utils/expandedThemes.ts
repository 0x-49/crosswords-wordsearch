export interface ThemeData {
  words: string[];
  crosswordData: { word: string; clue: string }[];
}

export const EXPANDED_THEMES: Record<string, ThemeData> = {
  'Animals': {
    words: [
      'CAT', 'DOG', 'ELEPHANT', 'LION', 'TIGER', 'BEAR', 'WOLF', 'FOX', 'RABBIT', 'DEER',
      'HORSE', 'COW', 'PIG', 'SHEEP', 'GOAT', 'CHICKEN', 'DUCK', 'GOOSE', 'TURKEY', 'EAGLE',
      'HAWK', 'OWL', 'PARROT', 'PENGUIN', 'DOLPHIN', 'WHALE', 'SHARK', 'FISH', 'OCTOPUS', 'CRAB'
    ],
    crosswordData: [
      { word: 'CAT', clue: 'Feline pet that purrs' },
      { word: 'DOG', clue: 'Man\'s best friend' },
      { word: 'ELEPHANT', clue: 'Largest land mammal' },
      { word: 'LION', clue: 'King of the jungle' },
      { word: 'TIGER', clue: 'Striped big cat' },
      { word: 'BEAR', clue: 'Large omnivorous mammal' },
      { word: 'WOLF', clue: 'Pack hunting canine' },
      { word: 'FOX', clue: 'Cunning red-furred animal' },
      { word: 'RABBIT', clue: 'Long-eared hopping mammal' },
      { word: 'DEER', clue: 'Antlered forest animal' },
      { word: 'HORSE', clue: 'Galloping farm animal' },
      { word: 'COW', clue: 'Milk-producing farm animal' },
      { word: 'PIG', clue: 'Pink barnyard animal' },
      { word: 'SHEEP', clue: 'Woolly farm animal' },
      { word: 'GOAT', clue: 'Horned climbing animal' },
      { word: 'CHICKEN', clue: 'Egg-laying bird' },
      { word: 'DUCK', clue: 'Quacking water bird' },
      { word: 'EAGLE', clue: 'Soaring bird of prey' },
      { word: 'OWL', clue: 'Nocturnal hooting bird' },
      { word: 'PENGUIN', clue: 'Tuxedo-wearing Antarctic bird' }
    ]
  },
  'Nature': {
    words: [
      'TREE', 'FLOWER', 'GRASS', 'MOUNTAIN', 'RIVER', 'OCEAN', 'LAKE', 'FOREST', 'DESERT', 'BEACH',
      'CLOUD', 'RAIN', 'SNOW', 'WIND', 'STORM', 'RAINBOW', 'SUNSET', 'SUNRISE', 'MOON', 'STAR',
      'ROCK', 'STONE', 'SAND', 'LEAF', 'BRANCH', 'ROOT', 'SEED', 'FRUIT', 'BERRY', 'MUSHROOM'
    ],
    crosswordData: [
      { word: 'TREE', clue: 'Tall woody plant' },
      { word: 'FLOWER', clue: 'Colorful blooming plant part' },
      { word: 'MOUNTAIN', clue: 'High rocky peak' },
      { word: 'RIVER', clue: 'Flowing body of water' },
      { word: 'OCEAN', clue: 'Vast body of salt water' },
      { word: 'FOREST', clue: 'Dense collection of trees' },
      { word: 'DESERT', clue: 'Dry sandy region' },
      { word: 'CLOUD', clue: 'White fluffy sky formation' },
      { word: 'RAIN', clue: 'Water falling from clouds' },
      { word: 'SNOW', clue: 'Frozen precipitation' },
      { word: 'RAINBOW', clue: 'Colorful arc in the sky' },
      { word: 'SUNSET', clue: 'Evening sky display' },
      { word: 'MOON', clue: 'Earth\'s natural satellite' },
      { word: 'STAR', clue: 'Twinkling celestial body' },
      { word: 'LEAF', clue: 'Green part of a plant' },
      { word: 'SEED', clue: 'Plant\'s beginning' },
      { word: 'FRUIT', clue: 'Sweet plant product' },
      { word: 'BERRY', clue: 'Small round fruit' },
      { word: 'ROCK', clue: 'Hard mineral mass' },
      { word: 'SAND', clue: 'Fine beach particles' }
    ]
  },
  'Food': {
    words: [
      'APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'STRAWBERRY', 'PIZZA', 'BURGER', 'SANDWICH', 'SALAD', 'SOUP',
      'BREAD', 'CHEESE', 'MILK', 'BUTTER', 'EGGS', 'CHICKEN', 'BEEF', 'FISH', 'RICE', 'PASTA',
      'COOKIE', 'CAKE', 'PIE', 'CHOCOLATE', 'CANDY', 'ICE CREAM', 'COFFEE', 'TEA', 'JUICE', 'WATER'
    ],
    crosswordData: [
      { word: 'APPLE', clue: 'Red or green crunchy fruit' },
      { word: 'BANANA', clue: 'Yellow curved fruit' },
      { word: 'ORANGE', clue: 'Citrus fruit and color' },
      { word: 'PIZZA', clue: 'Italian flatbread with toppings' },
      { word: 'BURGER', clue: 'Grilled meat sandwich' },
      { word: 'BREAD', clue: 'Baked flour staple' },
      { word: 'CHEESE', clue: 'Dairy product from milk' },
      { word: 'MILK', clue: 'White dairy beverage' },
      { word: 'EGGS', clue: 'Oval protein source' },
      { word: 'CHICKEN', clue: 'Popular poultry meat' },
      { word: 'RICE', clue: 'Asian grain staple' },
      { word: 'PASTA', clue: 'Italian noodle dish' },
      { word: 'COOKIE', clue: 'Sweet baked treat' },
      { word: 'CAKE', clue: 'Layered birthday dessert' },
      { word: 'CHOCOLATE', clue: 'Sweet cocoa confection' },
      { word: 'COFFEE', clue: 'Morning caffeine drink' },
      { word: 'TEA', clue: 'Steeped leaf beverage' },
      { word: 'SOUP', clue: 'Hot liquid meal' },
      { word: 'SALAD', clue: 'Mixed vegetable dish' },
      { word: 'WATER', clue: 'Essential clear liquid' }
    ]
  },
  'Sports': {
    words: [
      'FOOTBALL', 'BASKETBALL', 'BASEBALL', 'SOCCER', 'TENNIS', 'GOLF', 'SWIMMING', 'RUNNING', 'CYCLING', 'BOXING',
      'HOCKEY', 'VOLLEYBALL', 'BADMINTON', 'CRICKET', 'RUGBY', 'SKIING', 'SNOWBOARDING', 'SURFING', 'DIVING', 'WRESTLING',
      'GYMNASTICS', 'TRACK', 'FIELD', 'MARATHON', 'SPRINT', 'JUMP', 'THROW', 'CATCH', 'KICK', 'SCORE'
    ],
    crosswordData: [
      { word: 'FOOTBALL', clue: 'American gridiron sport' },
      { word: 'BASKETBALL', clue: 'Hoop shooting game' },
      { word: 'BASEBALL', clue: 'America\'s pastime' },
      { word: 'SOCCER', clue: 'World\'s most popular sport' },
      { word: 'TENNIS', clue: 'Racket sport with net' },
      { word: 'GOLF', clue: 'Club and ball precision sport' },
      { word: 'SWIMMING', clue: 'Water-based athletic activity' },
      { word: 'RUNNING', clue: 'Fast-paced foot race' },
      { word: 'BOXING', clue: 'Combat sport with gloves' },
      { word: 'HOCKEY', clue: 'Ice sport with sticks' },
      { word: 'VOLLEYBALL', clue: 'Net sport with spiking' },
      { word: 'CRICKET', clue: 'British bat and wicket game' },
      { word: 'SKIING', clue: 'Snow slope sport' },
      { word: 'SURFING', clue: 'Wave riding sport' },
      { word: 'GYMNASTICS', clue: 'Acrobatic floor sport' },
      { word: 'MARATHON', clue: 'Long distance race' },
      { word: 'SPRINT', clue: 'Short fast race' },
      { word: 'JUMP', clue: 'Leap athletic movement' },
      { word: 'SCORE', clue: 'Points in a game' },
      { word: 'TRACK', clue: 'Running surface' }
    ]
  },
  'Colors': {
    words: [
      'RED', 'BLUE', 'GREEN', 'YELLOW', 'ORANGE', 'PURPLE', 'PINK', 'BROWN', 'BLACK', 'WHITE',
      'GRAY', 'SILVER', 'GOLD', 'BRONZE', 'MAROON', 'NAVY', 'TEAL', 'LIME', 'OLIVE', 'AQUA',
      'FUCHSIA', 'VIOLET', 'INDIGO', 'TURQUOISE', 'CORAL', 'SALMON', 'CRIMSON', 'SCARLET', 'AZURE', 'IVORY'
    ],
    crosswordData: [
      { word: 'RED', clue: 'Color of fire and roses' },
      { word: 'BLUE', clue: 'Color of sky and ocean' },
      { word: 'GREEN', clue: 'Color of grass and leaves' },
      { word: 'YELLOW', clue: 'Color of sun and bananas' },
      { word: 'ORANGE', clue: 'Color between red and yellow' },
      { word: 'PURPLE', clue: 'Royal color mix of red and blue' },
      { word: 'PINK', clue: 'Light red color' },
      { word: 'BROWN', clue: 'Color of earth and wood' },
      { word: 'BLACK', clue: 'Darkest color' },
      { word: 'WHITE', clue: 'Lightest color' },
      { word: 'SILVER', clue: 'Metallic gray color' },
      { word: 'GOLD', clue: 'Precious metal color' },
      { word: 'NAVY', clue: 'Dark blue color' },
      { word: 'TEAL', clue: 'Blue-green color' },
      { word: 'VIOLET', clue: 'Purple flower color' },
      { word: 'INDIGO', clue: 'Deep blue-purple color' },
      { word: 'CORAL', clue: 'Pink-orange sea color' },
      { word: 'CRIMSON', clue: 'Deep red color' },
      { word: 'AZURE', clue: 'Bright blue color' },
      { word: 'IVORY', clue: 'Off-white color' }
    ]
  },
  'School': {
    words: [
      'TEACHER', 'STUDENT', 'BOOK', 'PENCIL', 'PEN', 'PAPER', 'DESK', 'CHAIR', 'BOARD', 'CHALK',
      'ERASER', 'RULER', 'CALCULATOR', 'COMPUTER', 'LIBRARY', 'CLASSROOM', 'HOMEWORK', 'TEST', 'GRADE', 'STUDY',
      'LEARN', 'READ', 'WRITE', 'MATH', 'SCIENCE', 'HISTORY', 'ENGLISH', 'ART', 'MUSIC', 'GYM'
    ],
    crosswordData: [
      { word: 'TEACHER', clue: 'Classroom instructor' },
      { word: 'STUDENT', clue: 'Learning pupil' },
      { word: 'BOOK', clue: 'Reading material with pages' },
      { word: 'PENCIL', clue: 'Writing tool with eraser' },
      { word: 'PAPER', clue: 'Writing surface material' },
      { word: 'DESK', clue: 'Student work surface' },
      { word: 'BOARD', clue: 'Classroom writing surface' },
      { word: 'LIBRARY', clue: 'Book storage building' },
      { word: 'HOMEWORK', clue: 'Take-home assignments' },
      { word: 'TEST', clue: 'Knowledge assessment' },
      { word: 'STUDY', clue: 'Learning activity' },
      { word: 'READ', clue: 'Interpret written words' },
      { word: 'WRITE', clue: 'Create text with pen' },
      { word: 'MATH', clue: 'Numbers and calculations subject' },
      { word: 'SCIENCE', clue: 'Laboratory subject' },
      { word: 'HISTORY', clue: 'Past events subject' },
      { word: 'ENGLISH', clue: 'Language arts subject' },
      { word: 'ART', clue: 'Creative drawing subject' },
      { word: 'MUSIC', clue: 'Sound and rhythm subject' },
      { word: 'GRADE', clue: 'Academic performance mark' }
    ]
  },
  'Technology': {
    words: [
      'COMPUTER', 'PHONE', 'INTERNET', 'EMAIL', 'WEBSITE', 'SOFTWARE', 'HARDWARE', 'KEYBOARD', 'MOUSE', 'SCREEN',
      'PRINTER', 'SCANNER', 'CAMERA', 'TABLET', 'LAPTOP', 'DESKTOP', 'SERVER', 'NETWORK', 'WIFI', 'BLUETOOTH',
      'APP', 'DOWNLOAD', 'UPLOAD', 'CLOUD', 'DATA', 'FILE', 'FOLDER', 'PASSWORD', 'SECURITY', 'VIRUS'
    ],
    crosswordData: [
      { word: 'COMPUTER', clue: 'Electronic processing machine' },
      { word: 'PHONE', clue: 'Mobile communication device' },
      { word: 'INTERNET', clue: 'Global network connection' },
      { word: 'EMAIL', clue: 'Electronic mail message' },
      { word: 'WEBSITE', clue: 'Online information page' },
      { word: 'SOFTWARE', clue: 'Computer program code' },
      { word: 'KEYBOARD', clue: 'Computer typing input' },
      { word: 'MOUSE', clue: 'Computer pointing device' },
      { word: 'SCREEN', clue: 'Visual display surface' },
      { word: 'TABLET', clue: 'Touchscreen portable device' },
      { word: 'LAPTOP', clue: 'Portable computer' },
      { word: 'WIFI', clue: 'Wireless internet connection' },
      { word: 'APP', clue: 'Mobile software program' },
      { word: 'CLOUD', clue: 'Online data storage' },
      { word: 'DATA', clue: 'Digital information' },
      { word: 'FILE', clue: 'Digital document' },
      { word: 'PASSWORD', clue: 'Security access code' },
      { word: 'DOWNLOAD', clue: 'Transfer data to device' },
      { word: 'NETWORK', clue: 'Connected computer system' },
      { word: 'CAMERA', clue: 'Photo capturing device' }
    ]
  },
  'Music': {
    words: [
      'PIANO', 'GUITAR', 'VIOLIN', 'DRUMS', 'TRUMPET', 'FLUTE', 'SAXOPHONE', 'CLARINET', 'HARP', 'CELLO',
      'SONG', 'MELODY', 'RHYTHM', 'BEAT', 'HARMONY', 'CHORD', 'NOTE', 'SCALE', 'TEMPO', 'VOLUME',
      'CONCERT', 'BAND', 'ORCHESTRA', 'SINGER', 'MUSICIAN', 'COMPOSER', 'CONDUCTOR', 'AUDIENCE', 'STAGE', 'MICROPHONE'
    ],
    crosswordData: [
      { word: 'PIANO', clue: 'Black and white keyed instrument' },
      { word: 'GUITAR', clue: 'Six-stringed strummed instrument' },
      { word: 'VIOLIN', clue: 'Bowed string instrument' },
      { word: 'DRUMS', clue: 'Percussion rhythm instrument' },
      { word: 'TRUMPET', clue: 'Brass wind instrument' },
      { word: 'FLUTE', clue: 'Woodwind breath instrument' },
      { word: 'SONG', clue: 'Musical composition with lyrics' },
      { word: 'MELODY', clue: 'Main musical tune' },
      { word: 'RHYTHM', clue: 'Musical time pattern' },
      { word: 'HARMONY', clue: 'Blended musical sounds' },
      { word: 'NOTE', clue: 'Single musical sound' },
      { word: 'TEMPO', clue: 'Speed of music' },
      { word: 'CONCERT', clue: 'Live musical performance' },
      { word: 'BAND', clue: 'Group of musicians' },
      { word: 'SINGER', clue: 'Vocal performer' },
      { word: 'COMPOSER', clue: 'Music creator' },
      { word: 'STAGE', clue: 'Performance platform' },
      { word: 'CHORD', clue: 'Multiple notes played together' },
      { word: 'SCALE', clue: 'Musical note sequence' },
      { word: 'BEAT', clue: 'Rhythmic pulse' }
    ]
  },
  'Transportation': {
    words: [
      'CAR', 'TRUCK', 'BUS', 'TRAIN', 'PLANE', 'BOAT', 'SHIP', 'BICYCLE', 'MOTORCYCLE', 'HELICOPTER',
      'SUBWAY', 'TAXI', 'VAN', 'SCOOTER', 'SKATEBOARD', 'WAGON', 'SLED', 'CANOE', 'KAYAK', 'FERRY',
      'ROCKET', 'SPACESHIP', 'BALLOON', 'YACHT', 'SAILBOAT', 'SPEEDBOAT', 'JET', 'GLIDER', 'TROLLEY', 'AMBULANCE'
    ],
    crosswordData: [
      { word: 'CAR', clue: 'Four-wheeled personal vehicle' },
      { word: 'TRAIN', clue: 'Railway passenger transport' },
      { word: 'PLANE', clue: 'Flying passenger aircraft' },
      { word: 'BOAT', clue: 'Water transportation vessel' },
      { word: 'BICYCLE', clue: 'Two-wheeled pedal vehicle' },
      { word: 'BUS', clue: 'Large passenger vehicle' },
      { word: 'TAXI', clue: 'Hired passenger car' },
      { word: 'SUBWAY', clue: 'Underground train system' },
      { word: 'HELICOPTER', clue: 'Rotating blade aircraft' },
      { word: 'MOTORCYCLE', clue: 'Two-wheeled motor vehicle' },
      { word: 'TRUCK', clue: 'Large cargo vehicle' },
      { word: 'SHIP', clue: 'Large ocean vessel' },
      { word: 'ROCKET', clue: 'Space launch vehicle' },
      { word: 'CANOE', clue: 'Paddle-powered boat' },
      { word: 'SCOOTER', clue: 'Small wheeled vehicle' },
      { word: 'FERRY', clue: 'Water crossing transport' },
      { word: 'JET', clue: 'Fast aircraft' },
      { word: 'YACHT', clue: 'Luxury sailing vessel' },
      { word: 'BALLOON', clue: 'Hot air flying craft' },
      { word: 'SLED', clue: 'Snow sliding vehicle' }
    ]
  },
  'Space': {
    words: [
      'PLANET', 'STAR', 'MOON', 'SUN', 'EARTH', 'MARS', 'JUPITER', 'SATURN', 'VENUS', 'MERCURY',
      'GALAXY', 'UNIVERSE', 'ASTEROID', 'COMET', 'METEOR', 'ROCKET', 'SATELLITE', 'ASTRONAUT', 'TELESCOPE', 'ORBIT',
      'GRAVITY', 'SOLAR', 'LUNAR', 'COSMIC', 'NEBULA', 'BLACKHOLE', 'MILKYWAY', 'CONSTELLATION', 'ECLIPSE', 'CRATER'
    ],
    crosswordData: [
      { word: 'PLANET', clue: 'Celestial body orbiting star' },
      { word: 'STAR', clue: 'Burning celestial object' },
      { word: 'MOON', clue: 'Earth\'s natural satellite' },
      { word: 'SUN', clue: 'Our solar system\'s star' },
      { word: 'EARTH', clue: 'Our home planet' },
      { word: 'MARS', clue: 'The red planet' },
      { word: 'JUPITER', clue: 'Largest planet in solar system' },
      { word: 'SATURN', clue: 'Ringed gas giant' },
      { word: 'GALAXY', clue: 'Collection of stars' },
      { word: 'ASTEROID', clue: 'Rocky space object' },
      { word: 'COMET', clue: 'Icy celestial visitor' },
      { word: 'ROCKET', clue: 'Space launch vehicle' },
      { word: 'ASTRONAUT', clue: 'Space traveler' },
      { word: 'TELESCOPE', clue: 'Star viewing instrument' },
      { word: 'ORBIT', clue: 'Circular space path' },
      { word: 'GRAVITY', clue: 'Attractive force' },
      { word: 'NEBULA', clue: 'Colorful space cloud' },
      { word: 'ECLIPSE', clue: 'Celestial shadow event' },
      { word: 'CRATER', clue: 'Impact depression' },
      { word: 'METEOR', clue: 'Shooting star' }
    ]
  },
  'Weather': {
    words: [
      'SUNNY', 'CLOUDY', 'RAINY', 'SNOWY', 'WINDY', 'STORMY', 'FOGGY', 'HOT', 'COLD', 'WARM',
      'COOL', 'HUMID', 'DRY', 'THUNDER', 'LIGHTNING', 'HAIL', 'SLEET', 'FROST', 'DEW', 'MIST',
      'TORNADO', 'HURRICANE', 'BLIZZARD', 'DROUGHT', 'FLOOD', 'RAINBOW', 'SUNSHINE', 'SHADOW', 'BREEZE', 'GALE'
    ],
    crosswordData: [
      { word: 'SUNNY', clue: 'Bright clear weather' },
      { word: 'RAINY', clue: 'Wet precipitation weather' },
      { word: 'SNOWY', clue: 'White frozen precipitation' },
      { word: 'WINDY', clue: 'Breezy air movement' },
      { word: 'STORMY', clue: 'Turbulent weather condition' },
      { word: 'THUNDER', clue: 'Loud storm sound' },
      { word: 'LIGHTNING', clue: 'Electric sky flash' },
      { word: 'RAINBOW', clue: 'Colorful arc after rain' },
      { word: 'TORNADO', clue: 'Spinning wind funnel' },
      { word: 'HURRICANE', clue: 'Massive rotating storm' },
      { word: 'BLIZZARD', clue: 'Heavy snow storm' },
      { word: 'FROST', clue: 'Frozen morning dew' },
      { word: 'HAIL', clue: 'Frozen rain pellets' },
      { word: 'DROUGHT', clue: 'Extended dry period' },
      { word: 'FLOOD', clue: 'Overflowing water' },
      { word: 'BREEZE', clue: 'Gentle wind' },
      { word: 'HUMID', clue: 'Moist air condition' },
      { word: 'FOGGY', clue: 'Misty low visibility' },
      { word: 'DEW', clue: 'Morning moisture drops' },
      { word: 'MIST', clue: 'Light fog' }
    ]
  },
  'Ocean': {
    words: [
      'WHALE', 'DOLPHIN', 'SHARK', 'FISH', 'OCTOPUS', 'JELLYFISH', 'STARFISH', 'SEAHORSE', 'CRAB', 'LOBSTER',
      'CORAL', 'SEAWEED', 'WAVE', 'TIDE', 'BEACH', 'SAND', 'SHELL', 'PEARL', 'TREASURE', 'SHIPWRECK',
      'SAILOR', 'CAPTAIN', 'ANCHOR', 'LIGHTHOUSE', 'ISLAND', 'SUBMARINE', 'DIVING', 'SURFING', 'FISHING', 'SWIMMING'
    ],
    crosswordData: [
      { word: 'WHALE', clue: 'Largest ocean mammal' },
      { word: 'DOLPHIN', clue: 'Intelligent marine mammal' },
      { word: 'SHARK', clue: 'Predatory ocean fish' },
      { word: 'OCTOPUS', clue: 'Eight-armed sea creature' },
      { word: 'JELLYFISH', clue: 'Transparent stinging sea animal' },
      { word: 'STARFISH', clue: 'Five-armed sea creature' },
      { word: 'CORAL', clue: 'Colorful reef builder' },
      { word: 'WAVE', clue: 'Moving water formation' },
      { word: 'TIDE', clue: 'Ocean water level change' },
      { word: 'BEACH', clue: 'Sandy ocean shore' },
      { word: 'SHELL', clue: 'Hard sea creature home' },
      { word: 'PEARL', clue: 'Oyster\'s precious gem' },
      { word: 'LIGHTHOUSE', clue: 'Ship guiding tower' },
      { word: 'ISLAND', clue: 'Land surrounded by water' },
      { word: 'SUBMARINE', clue: 'Underwater vessel' },
      { word: 'ANCHOR', clue: 'Ship holding device' },
      { word: 'CAPTAIN', clue: 'Ship commander' },
      { word: 'TREASURE', clue: 'Buried pirate wealth' },
      { word: 'DIVING', clue: 'Underwater exploration' },
      { word: 'SURFING', clue: 'Wave riding sport' }
    ]
  },
  'Garden': {
    words: [
      'FLOWER', 'ROSE', 'TULIP', 'DAISY', 'SUNFLOWER', 'LILY', 'ORCHID', 'VIOLET', 'PANSY', 'IRIS',
      'TREE', 'BUSH', 'GRASS', 'LEAF', 'STEM', 'ROOT', 'SEED', 'SOIL', 'WATER', 'FERTILIZER',
      'SHOVEL', 'RAKE', 'HOE', 'WATERING CAN', 'GLOVES', 'PRUNING', 'PLANTING', 'WEEDING', 'HARVEST', 'BLOOM'
    ],
    crosswordData: [
      { word: 'FLOWER', clue: 'Colorful plant bloom' },
      { word: 'ROSE', clue: 'Thorny romantic flower' },
      { word: 'TULIP', clue: 'Spring bulb flower' },
      { word: 'SUNFLOWER', clue: 'Tall yellow bloom' },
      { word: 'DAISY', clue: 'White petaled flower' },
      { word: 'TREE', clue: 'Tall woody plant' },
      { word: 'GRASS', clue: 'Green lawn covering' },
      { word: 'SEED', clue: 'Plant starting point' },
      { word: 'SOIL', clue: 'Plant growing medium' },
      { word: 'ROOT', clue: 'Underground plant part' },
      { word: 'LEAF', clue: 'Green plant appendage' },
      { word: 'SHOVEL', clue: 'Digging garden tool' },
      { word: 'RAKE', clue: 'Leaf gathering tool' },
      { word: 'BLOOM', clue: 'Flower opening process' },
      { word: 'HARVEST', clue: 'Crop gathering time' },
      { word: 'PLANTING', clue: 'Seed sowing activity' },
      { word: 'WATER', clue: 'Plant life necessity' },
      { word: 'STEM', clue: 'Plant support structure' },
      { word: 'VIOLET', clue: 'Purple woodland flower' },
      { word: 'LILY', clue: 'Elegant pond flower' }
    ]
  },
  'Kitchen': {
    words: [
      'STOVE', 'OVEN', 'REFRIGERATOR', 'MICROWAVE', 'DISHWASHER', 'SINK', 'COUNTER', 'CABINET', 'DRAWER', 'PANTRY',
      'POT', 'PAN', 'BOWL', 'PLATE', 'CUP', 'FORK', 'KNIFE', 'SPOON', 'SPATULA', 'WHISK',
      'CUTTING BOARD', 'MIXER', 'BLENDER', 'TOASTER', 'KETTLE', 'RECIPE', 'COOKING', 'BAKING', 'FRYING', 'BOILING'
    ],
    crosswordData: [
      { word: 'STOVE', clue: 'Cooking heat source' },
      { word: 'OVEN', clue: 'Baking appliance' },
      { word: 'REFRIGERATOR', clue: 'Food cooling appliance' },
      { word: 'MICROWAVE', clue: 'Quick heating appliance' },
      { word: 'SINK', clue: 'Dish washing basin' },
      { word: 'POT', clue: 'Deep cooking vessel' },
      { word: 'PAN', clue: 'Flat cooking surface' },
      { word: 'PLATE', clue: 'Food serving dish' },
      { word: 'FORK', clue: 'Pronged eating utensil' },
      { word: 'KNIFE', clue: 'Cutting utensil' },
      { word: 'SPOON', clue: 'Scooping eating tool' },
      { word: 'BOWL', clue: 'Round serving container' },
      { word: 'MIXER', clue: 'Batter blending appliance' },
      { word: 'TOASTER', clue: 'Bread browning appliance' },
      { word: 'RECIPE', clue: 'Cooking instructions' },
      { word: 'COOKING', clue: 'Food preparation process' },
      { word: 'BAKING', clue: 'Oven food preparation' },
      { word: 'COUNTER', clue: 'Kitchen work surface' },
      { word: 'CABINET', clue: 'Kitchen storage space' },
      { word: 'SPATULA', clue: 'Flipping cooking tool' }
    ]
  },
  'Holidays': {
    words: [
      'CHRISTMAS', 'HALLOWEEN', 'THANKSGIVING', 'EASTER', 'VALENTINE', 'BIRTHDAY', 'PARTY', 'GIFT', 'CAKE', 'CANDLE',
      'DECORATION', 'CELEBRATION', 'FAMILY', 'FRIENDS', 'JOY', 'HAPPINESS', 'LOVE', 'PEACE', 'HOPE', 'TRADITION',
      'SANTA', 'REINDEER', 'SNOWMAN', 'PUMPKIN', 'TURKEY', 'BUNNY', 'EGGS', 'HEART', 'CUPID', 'FIREWORKS'
    ],
    crosswordData: [
      { word: 'CHRISTMAS', clue: 'December 25th celebration' },
      { word: 'HALLOWEEN', clue: 'October 31st costume holiday' },
      { word: 'THANKSGIVING', clue: 'November gratitude holiday' },
      { word: 'EASTER', clue: 'Spring resurrection celebration' },
      { word: 'BIRTHDAY', clue: 'Annual personal celebration' },
      { word: 'PARTY', clue: 'Festive gathering' },
      { word: 'GIFT', clue: 'Present given to others' },
      { word: 'CAKE', clue: 'Sweet celebration dessert' },
      { word: 'SANTA', clue: 'Christmas gift giver' },
      { word: 'PUMPKIN', clue: 'Halloween orange decoration' },
      { word: 'TURKEY', clue: 'Thanksgiving main dish' },
      { word: 'BUNNY', clue: 'Easter egg deliverer' },
      { word: 'FIREWORKS', clue: 'Explosive celebration display' },
      { word: 'FAMILY', clue: 'Holiday gathering group' },
      { word: 'TRADITION', clue: 'Passed down custom' },
      { word: 'JOY', clue: 'Holiday feeling' },
      { word: 'LOVE', clue: 'Valentine emotion' },
      { word: 'PEACE', clue: 'Holiday wish' },
      { word: 'HEART', clue: 'Valentine symbol' },
      { word: 'CANDLE', clue: 'Birthday cake topper' }
    ]
  },
  'Professions': {
    words: [
      'DOCTOR', 'NURSE', 'TEACHER', 'LAWYER', 'ENGINEER', 'CHEF', 'ARTIST', 'MUSICIAN', 'WRITER', 'ACTOR',
      'PILOT', 'FIREFIGHTER', 'POLICE', 'FARMER', 'BUILDER', 'MECHANIC', 'DENTIST', 'SCIENTIST', 'LIBRARIAN', 'JUDGE',
      'BANKER', 'ACCOUNTANT', 'DESIGNER', 'PHOTOGRAPHER', 'JOURNALIST', 'VETERINARIAN', 'PHARMACIST', 'ARCHITECT', 'PLUMBER', 'ELECTRICIAN'
    ],
    crosswordData: [
      { word: 'DOCTOR', clue: 'Medical professional' },
      { word: 'TEACHER', clue: 'Educational instructor' },
      { word: 'LAWYER', clue: 'Legal representative' },
      { word: 'CHEF', clue: 'Professional cook' },
      { word: 'ARTIST', clue: 'Creative visual creator' },
      { word: 'PILOT', clue: 'Aircraft operator' },
      { word: 'FIREFIGHTER', clue: 'Emergency responder' },
      { word: 'FARMER', clue: 'Crop grower' },
      { word: 'NURSE', clue: 'Medical care provider' },
      { word: 'ENGINEER', clue: 'Technical designer' },
      { word: 'WRITER', clue: 'Text creator' },
      { word: 'SCIENTIST', clue: 'Research professional' },
      { word: 'DENTIST', clue: 'Tooth care specialist' },
      { word: 'MECHANIC', clue: 'Vehicle repair expert' },
      { word: 'ARCHITECT', clue: 'Building designer' },
      { word: 'JUDGE', clue: 'Court decision maker' },
      { word: 'BANKER', clue: 'Financial professional' },
      { word: 'PHOTOGRAPHER', clue: 'Image capture artist' },
      { word: 'LIBRARIAN', clue: 'Book organization expert' },
      { word: 'PLUMBER', clue: 'Pipe repair specialist' }
    ]
  },
  'Clothing': {
    words: [
      'SHIRT', 'PANTS', 'DRESS', 'SKIRT', 'JACKET', 'COAT', 'SWEATER', 'JEANS', 'SHORTS', 'SOCKS',
      'SHOES', 'BOOTS', 'SANDALS', 'SNEAKERS', 'HAT', 'CAP', 'SCARF', 'GLOVES', 'BELT', 'TIE',
      'UNDERWEAR', 'PAJAMAS', 'SWIMSUIT', 'UNIFORM', 'COSTUME', 'JEWELRY', 'WATCH', 'GLASSES', 'PURSE', 'WALLET'
    ],
    crosswordData: [
      { word: 'SHIRT', clue: 'Upper body garment' },
      { word: 'PANTS', clue: 'Leg covering clothing' },
      { word: 'DRESS', clue: 'One-piece female garment' },
      { word: 'JACKET', clue: 'Outer upper garment' },
      { word: 'SHOES', clue: 'Foot protection wear' },
      { word: 'HAT', clue: 'Head covering accessory' },
      { word: 'SOCKS', clue: 'Foot covering garment' },
      { word: 'JEANS', clue: 'Denim leg wear' },
      { word: 'SWEATER', clue: 'Warm knitted garment' },
      { word: 'COAT', clue: 'Heavy outer garment' },
      { word: 'BOOTS', clue: 'High ankle footwear' },
      { word: 'SCARF', clue: 'Neck warming accessory' },
      { word: 'GLOVES', clue: 'Hand covering wear' },
      { word: 'BELT', clue: 'Waist securing accessory' },
      { word: 'SHORTS', clue: 'Short leg garment' },
      { word: 'SNEAKERS', clue: 'Athletic footwear' },
      { word: 'UNIFORM', clue: 'Standardized work clothing' },
      { word: 'WATCH', clue: 'Time telling accessory' },
      { word: 'GLASSES', clue: 'Vision correction wear' },
      { word: 'WALLET', clue: 'Money carrying accessory' }
    ]
  },
  'Home': {
    words: [
      'HOUSE', 'APARTMENT', 'ROOM', 'BEDROOM', 'BATHROOM', 'KITCHEN', 'LIVING ROOM', 'DINING ROOM', 'GARAGE', 'BASEMENT',
      'ATTIC', 'DOOR', 'WINDOW', 'WALL', 'FLOOR', 'CEILING', 'ROOF', 'STAIRS', 'HALLWAY', 'CLOSET',
      'BED', 'CHAIR', 'TABLE', 'SOFA', 'LAMP', 'TELEVISION', 'COMPUTER', 'PHONE', 'CLOCK', 'MIRROR'
    ],
    crosswordData: [
      { word: 'HOUSE', clue: 'Residential building' },
      { word: 'BEDROOM', clue: 'Sleeping room' },
      { word: 'KITCHEN', clue: 'Cooking room' },
      { word: 'BATHROOM', clue: 'Washing room' },
      { word: 'DOOR', clue: 'Room entrance barrier' },
      { word: 'WINDOW', clue: 'Glass wall opening' },
      { word: 'ROOF', clue: 'House top covering' },
      { word: 'STAIRS', clue: 'Level connecting steps' },
      { word: 'BED', clue: 'Sleeping furniture' },
      { word: 'CHAIR', clue: 'Sitting furniture' },
      { word: 'TABLE', clue: 'Flat surface furniture' },
      { word: 'SOFA', clue: 'Living room seating' },
      { word: 'LAMP', clue: 'Light providing fixture' },
      { word: 'TELEVISION', clue: 'Entertainment viewing device' },
      { word: 'CLOCK', clue: 'Time displaying device' },
      { word: 'MIRROR', clue: 'Reflection showing surface' },
      { word: 'GARAGE', clue: 'Car storage space' },
      { word: 'BASEMENT', clue: 'Underground house level' },
      { word: 'ATTIC', clue: 'Top house storage space' },
      { word: 'CLOSET', clue: 'Clothing storage space' }
    ]
  }
};

export function getThemeNames(): string[] {
  return Object.keys(EXPANDED_THEMES);
}

export function getThemeData(theme: string): ThemeData | null {
  return EXPANDED_THEMES[theme] || null;
}

export function getRandomWordsFromExpandedTheme(theme: string, count: number): string[] {
  const themeData = EXPANDED_THEMES[theme];
  if (!themeData) return [];
  
  const words = themeData.words;
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, words.length));
}

export function getRandomCrosswordClues(theme: string, count: number): { word: string; clue: string }[] {
  const themeData = EXPANDED_THEMES[theme];
  if (!themeData) return [];
  
  const clues = themeData.crosswordData;
  const shuffled = [...clues].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, clues.length));
}