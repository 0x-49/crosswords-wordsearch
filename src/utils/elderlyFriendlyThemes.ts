// Comprehensive themes focused on elderly-friendly topics, kids themes, and relaxation niches

export interface ThemeData {
  words: string[];
  crosswordData: { word: string; clue: string }[];
  puzzleNames: {
    wordSearchNames: string[];
    crosswordNames: string[];
  };
}

export const elderlyFriendlyThemes: Record<string, ThemeData> = {
  // ELDERLY-FRIENDLY THEMES (Primary Focus)
  "Classic Movies": {
    words: [
      "CASABLANCA", "TITANIC", "WIZARD", "SINGIN", "SUNSET", "CITIZEN", "VERTIGO", 
      "PSYCHO", "LAWRENCE", "GODFATHER", "CHINATOWN", "TAXI", "ROCKY", "ANNIE", 
      "AMADEUS", "PLATOON", "RAIN", "DRIVING", "SILENCE", "UNFORGIVEN", 
      "SCHINDLER", "FORREST", "BRAVEHEART", "ENGLISH", "SHAKESPEARE", "GLADIATOR",
      "GONE", "WIND", "MALTESE", "FALCON", "NOTORIOUS", "REBECCA", "SPELLBOUND",
      "NORTH", "NORTHWEST", "REAR", "WINDOW", "DIAL", "MURDER", "ROPE", "STRANGERS",
      "TRAIN", "SHADOW", "DOUBT", "BIRDS", "MARNIE", "FRENZY", "TOPAZ", "TORN",
      "CURTAIN", "FAMILY", "PLOT", "HIGH", "NOON", "SHANE", "GIANT", "REBEL",
      "CAUSE", "EAST", "EDEN", "CAT", "HOT", "TIN", "ROOF", "STREETCAR", "NAMED",
      "DESIRE", "ON", "WATERFRONT", "FROM", "HERE", "ETERNITY", "BRIDGE", "RIVER",
      "KWAI", "LAWRENCE", "ARABIA", "DOCTOR", "ZHIVAGO", "SOUND", "MUSIC", "WEST",
      "SIDE", "STORY", "MY", "FAIR", "LADY", "MARY", "POPPINS", "JUNGLE", "BOOK"
    ],
    crosswordData: [
      { word: "CASABLANCA", clue: "Classic 1942 film with Humphrey Bogart" },
      { word: "TITANIC", clue: "1997 epic romance disaster film" },
      { word: "WIZARD", clue: "Dorothy's destination in Oz" },
      { word: "SINGIN", clue: "___ in the Rain (1952 musical)" },
      { word: "SUNSET", clue: "___ Boulevard (1950 film noir)" },
      { word: "CITIZEN", clue: "___ Kane (Orson Welles masterpiece)" },
      { word: "VERTIGO", clue: "Hitchcock thriller about fear of heights" },
      { word: "PSYCHO", clue: "1960 Hitchcock horror film" },
      { word: "LAWRENCE", clue: "___ of Arabia (1962 epic)" },
      { word: "GODFATHER", clue: "Coppola's mafia masterpiece" },
      { word: "CHINATOWN", clue: "1974 neo-noir with Jack Nicholson" },
      { word: "ROCKY", clue: "Underdog boxer film from 1976" },
      { word: "AMADEUS", clue: "1984 film about Mozart" },
      { word: "FORREST", clue: "___ Gump (Tom Hanks film)" },
      { word: "GLADIATOR", clue: "Russell Crowe's Roman epic" },
      { word: "GONE", clue: "___ with the Wind (1939 epic)" },
      { word: "MALTESE", clue: "The ___ Falcon (Bogart detective film)" },
      { word: "NOTORIOUS", clue: "1946 Hitchcock spy thriller" },
      { word: "REBECCA", clue: "1940 Hitchcock Gothic romance" },
      { word: "SPELLBOUND", clue: "1945 Hitchcock psychological thriller" },
      { word: "NORTH", clue: "___ by Northwest (Cary Grant thriller)" },
      { word: "REAR", clue: "___ Window (1954 Hitchcock suspense)" },
      { word: "DIAL", clue: "___ M for Murder (Hitchcock thriller)" },
      { word: "ROPE", clue: "1948 Hitchcock experimental film" },
      { word: "STRANGERS", clue: "___ on a Train (Hitchcock thriller)" },
      { word: "SHADOW", clue: "Shadow of a ___ (Hitchcock film)" },
      { word: "BIRDS", clue: "The ___ (1963 Hitchcock horror)" },
      { word: "MARNIE", clue: "1964 Hitchcock psychological thriller" },
      { word: "FRENZY", clue: "1972 Hitchcock thriller" },
      { word: "HIGH", clue: "___ Noon (Gary Cooper western)" },
      { word: "SHANE", clue: "1953 western classic" },
      { word: "GIANT", clue: "1956 epic starring James Dean" },
      { word: "REBEL", clue: "___ Without a Cause (James Dean film)" },
      { word: "EAST", clue: "___ of Eden (James Dean drama)" },
      { word: "CAT", clue: "___ on a Hot Tin Roof (Tennessee Williams)" },
      { word: "STREETCAR", clue: "A ___ Named Desire (Marlon Brando)" },
      { word: "ON", clue: "___ the Waterfront (Brando classic)" },
      { word: "FROM", clue: "___ Here to Eternity (1953 drama)" },
      { word: "BRIDGE", clue: "The ___ on the River Kwai" },
      { word: "DOCTOR", clue: "___ Zhivago (Omar Sharif epic)" },
      { word: "SOUND", clue: "The ___ of Music (Julie Andrews)" },
      { word: "WEST", clue: "___ Side Story (musical film)" },
      { word: "MY", clue: "___ Fair Lady (Audrey Hepburn)" },
      { word: "MARY", clue: "___ Poppins (Disney classic)" },
      { word: "JUNGLE", clue: "The ___ Book (Disney animation)" }
    ],
    puzzleNames: {
      wordSearchNames: [
        "Hollywood Golden Age Stars", "Bogart and Bacall Classics", "Hitchcock Masterpieces", "Film Noir Legends",
        "Academy Award Winners", "Romantic Movie Classics", "Western Film Heroes", "Musical Movie Magic",
        "Drama Film Legends", "Comedy Film Classics", "Adventure Movie Thrills", "Mystery Film Noir",
        "Epic Movie Spectacles", "Character Actor Legends", "Director Hall of Fame", "Studio System Stars",
        "Black and White Classics", "Technicolor Wonders", "Method Acting Masters", "Leading Lady Legends",
        "Leading Man Icons", "Supporting Actor Greats", "Cinematography Classics", "Screenplay Legends",
        "Movie Score Masterpieces", "Costume Design Classics", "Set Design Spectacles", "Special Effects Pioneers",
        "Documentary Film Classics", "Foreign Film Legends", "Independent Film Pioneers", "Art House Cinema",
        "Drive-In Movie Classics", "B-Movie Legends", "Horror Film Classics", "Science Fiction Pioneers",
        "War Movie Epics", "Sports Film Champions", "Biographical Film Legends", "Historical Drama Classics",
        "Family Film Favorites", "Children's Movie Magic", "Animation Pioneers", "Silent Film Legends",
        "Early Talkie Classics", "Pre-Code Hollywood", "Censorship Era Films", "Television Movie Classics",
        "Made-for-TV Movies", "Miniseries Masterpieces", "TV Movie Legends", "Cable TV Classics",
        "Streaming Era Beginnings", "Digital Film Revolution", "Modern Classic Films", "Contemporary Cinema",
        "International Film Festival", "Cannes Film Festival", "Oscar Night Classics", "Golden Globe Winners",
        "Critics Choice Awards", "Screen Actors Guild", "Directors Guild Honors", "Writers Guild Classics",
        "Producers Guild Legends", "Cinematographers Guild", "Editors Guild Masters", "Composers Guild Classics",
        "Art Directors Guild", "Costume Designers Guild", "Makeup Artists Guild", "Sound Mixers Guild",
        "Visual Effects Society", "Stunt Performers Guild", "Casting Directors Guild", "Location Managers Guild",
        "Film Festival Circuit", "Independent Spirit Awards", "Sundance Film Festival", "Toronto Film Festival",
        "Venice Film Festival", "Berlin Film Festival", "Tribeca Film Festival"
      ],
      crosswordNames: [
        "Classic Cinema Legends", "Movie Star Mysteries", "Hollywood History Quiz", "Film Genre Challenge",
        "Director's Chair Puzzle", "Academy Awards Trivia", "Movie Quote Challenge", "Character Name Game",
        "Plot Twist Puzzles", "Movie Title Wordplay", "Actor's Filmography", "Actress Career Highlights",
        "Supporting Cast Clues", "Movie Soundtrack Quiz", "Cinematography Terms", "Film Production Puzzle",
        "Studio System History", "Golden Age Trivia", "Method Acting Quiz", "Film Noir Knowledge",
        "Western Movie Facts", "Musical Film Songs", "Comedy Film Laughs", "Drama Film Emotions",
        "Horror Film Scares", "Sci-Fi Movie Future", "War Film Battles", "Romance Film Love",
        "Adventure Film Thrills", "Mystery Film Clues", "Biographical Film Lives", "Historical Film Events",
        "Family Film Fun", "Children's Movie Joy", "Animation Film Art", "Documentary Film Truth",
        "Foreign Film Culture", "Independent Film Spirit", "Art House Film Style", "Experimental Film Form",
        "Silent Film Expression", "Early Sound Film", "Technicolor Brilliance", "Black White Beauty",
        "Wide Screen Spectacle", "3D Film Innovation", "Digital Film Future", "Streaming Film Era",
        "Television Movie Night", "Cable TV Classics", "Premium Channel Films", "Network TV Movies",
        "Miniseries Epics", "Limited Series Drama", "Anthology Series", "Made-for-TV Specials",
        "Holiday Movie Traditions", "Summer Blockbusters", "Oscar Season Films", "Film Festival Favorites",
        "Critics Choice Picks", "Audience Favorites", "Box Office Champions", "Cult Film Classics",
        "Midnight Movie Madness", "Drive-In Favorites", "B-Movie Bonanza", "Exploitation Film Edge",
        "Grindhouse Classics", "Blaxploitation Era", "Spaghetti Westerns", "Hammer Horror Films",
        "Kaiju Monster Movies", "Samurai Film Honor", "Kung Fu Film Action", "Bollywood Spectacle",
        "French New Wave", "Italian Neorealism", "German Expressionism", "Soviet Montage Theory",
        "British Kitchen Sink", "Japanese Cinema Art", "Korean Film Wave", "Scandinavian Cinema",
        "Latin American Film", "African Cinema Voice", "Middle Eastern Stories", "Asian Film Renaissance"
      ]
    }
  },

  "Vintage Music": {
    words: [
      "SINATRA", "ELVIS", "BEATLES", "CROSBY", "FITZGERALD", "ARMSTRONG", "HOLIDAY", 
      "BASIE", "ELLINGTON", "MILLER", "GOODMAN", "DORSEY", "SHAW", "KENTON", 
      "HERMAN", "JAMES", "CALLOWAY", "WALLER", "TATUM", "PETERSON", 
      "GARLAND", "CROONER", "SWING", "JAZZ", "BLUES", "BALLAD"
    ],
    crosswordData: [
      { word: "SINATRA", clue: "Ol' Blue Eyes himself" },
      { word: "ELVIS", clue: "The King of Rock and Roll" },
      { word: "BEATLES", clue: "Fab Four from Liverpool" },
      { word: "CROSBY", clue: "Bing ___, famous crooner" },
      { word: "FITZGERALD", clue: "Ella ___, First Lady of Song" },
      { word: "ARMSTRONG", clue: "Louis ___, jazz trumpet legend" },
      { word: "HOLIDAY", clue: "Billie ___, Lady Day" },
      { word: "ELLINGTON", clue: "Duke ___, jazz composer" },
      { word: "MILLER", clue: "Glenn ___, big band leader" },
      { word: "GOODMAN", clue: "Benny ___, King of Swing" },
      { word: "GARLAND", clue: "Judy ___, Wizard of Oz star" },
      { word: "SWING", clue: "Popular dance music of the 1930s-40s" },
      { word: "JAZZ", clue: "American musical art form" },
      { word: "BLUES", clue: "Musical genre expressing sorrow" },
      { word: "BALLAD", clue: "Slow, romantic song" }
    ],
    puzzleNames: {
      wordSearchNames: [
        "Sinatra's Greatest Hits", "Elvis Rock Revolution", "Beatles Mania Memories", "Big Band Era Stars",
        "Jazz Legends Hall", "Blues Masters Collection", "Crooner Classics", "Swing Dance Favorites",
        "Ella Fitzgerald Songbook", "Louis Armstrong Jazz", "Duke Ellington Orchestra", "Glenn Miller Melodies",
        "Benny Goodman Swing", "Billie Holiday Blues", "Tommy Dorsey Band", "Artie Shaw Clarinet",
        "Count Basie Piano", "Cab Calloway Showman", "Fats Waller Stride", "Art Tatum Virtuoso",
        "Oscar Peterson Jazz", "Judy Garland Songs", "Nat King Cole Voice", "Perry Como Crooning",
        "Bing Crosby Christmas", "Dean Martin Rat Pack", "Tony Bennett Standards", "Mel Torme Velvet",
        "Sarah Vaughan Divine", "Carmen McRae Jazz", "Dinah Washington Queen", "Peggy Lee Sultry",
        "Rosemary Clooney Pop", "Doris Day Sunshine", "Patti Page Tennessee", "Jo Stafford Pure",
        "Kay Starr Rockabye", "Teresa Brewer Peppy", "Georgia Gibbs Dance", "Johnnie Ray Emotion",
        "Frankie Laine Western", "Guy Mitchell Singing", "Eddie Fisher Crooner", "Vic Damone Romantic",
        "Al Martino Italian", "Julius LaRosa Television", "Don Cornell Ballads", "Dick Haymes Baritone",
        "Bob Eberly Band", "Ray Eberle Vocals", "Helen O'Connell Swing", "Marion Hutton Sister",
        "Betty Hutton Energy", "Connie Haines Sweet", "Helen Forrest Band", "Ginny Simms Radio",
        "Frances Langford Movies", "Jane Froman Courage", "Lena Horne Stormy", "Hazel Scott Piano",
        "Mary Lou Williams Jazz", "Marian McPartland Elegant", "Dorothy Donegan Boogie", "Jutta Hipp German",
        "Toshiko Akiyoshi Asian", "Carla Bley Avant", "Alice Coltrane Spiritual", "Sun Ra Cosmic",
        "Cecil Taylor Free", "Anthony Braxton Creative", "Ornette Coleman Harmolodic", "Don Cherry Pocket",
        "Eric Dolphy Multi", "John Coltrane Sheets", "Miles Davis Cool", "Clifford Brown Trumpet",
        "Dizzy Gillespie Bebop", "Charlie Parker Bird", "Thelonious Monk Unique", "Bud Powell Piano",
        "Max Roach Drums", "Art Blakey Messengers", "Horace Silver Funky", "Ahmad Jamal Trio"
      ],
      crosswordNames: [
        "Sinatra Song Titles", "Elvis Hit Parade", "Beatles Album Quiz", "Jazz Standard Clues",
        "Big Band Leader Names", "Blues Artist Trivia", "Crooner Career Facts", "Swing Era Knowledge",
        "Music Genre History", "Instrument Identification", "Song Lyric Puzzles", "Album Title Game",
        "Record Label Quiz", "Music Producer Facts", "Songwriter Credits", "Hit Song Years",
        "Grammy Award Winners", "Hall of Fame Artists", "Music Chart Toppers", "Radio Show Hosts",
        "Bandleader Biographies", "Vocalist Nicknames", "Musical Instrument Terms", "Recording Studio Names",
        "Music Publisher Info", "Sheet Music Titles", "Concert Venue Names", "Music Festival History",
        "Record Company Facts", "Music Magazine Names", "DJ Personality Quiz", "Music TV Show Trivia",
        "Jukebox Hit Songs", "Dance Style Names", "Music Theory Terms", "Composition Techniques",
        "Musical Arrangement", "Orchestra Section Names", "Jazz Club Venues", "Music Education Terms",
        "Performance Techniques", "Recording Technology", "Music Business Terms", "Copyright Information",
        "Royalty Collection", "Music Union Facts", "Concert Promotion", "Talent Agency Names",
        "Music Journalism", "Critic Review Terms", "Fan Club Information", "Memorabilia Collecting",
        "Vintage Record Values", "Music Equipment Names", "Sound Engineering", "Studio Musician Facts",
        "Session Player Info", "Backup Singer Names", "Music Arranger Credits", "Producer Techniques",
        "Mixing Board Terms", "Microphone Types", "Speaker Technology", "Amplifier Brands",
        "Guitar Manufacturer", "Piano Company Names", "Drum Kit Components", "Brass Instrument Facts",
        "Woodwind Information", "String Instrument Care", "Music Notation Symbols", "Tempo Markings",
        "Key Signature Quiz", "Chord Progression Names", "Scale Pattern Facts", "Rhythm Pattern Terms",
        "Music Form Structure", "Compositional Devices", "Harmonic Analysis", "Melodic Development",
        "Counterpoint Rules", "Orchestration Principles", "Conducting Techniques", "Music Pedagogy Terms"
      ]
    }
  },

  "Golden Age TV": {
    words: [
      "LUCY", "ANDY", "BONANZA", "GUNSMOKE", "PERRY", "TWILIGHT", "HONEYMOONERS", 
      "DRAGNET", "SULLIVAN", "BERLE", "CAESAR", "SKELTON", "BENNY", "BURNS", 
      "ALLEN", "HOPE", "CROSBY", "GLEASON", "KRAMDEN", "NORTON", 
      "MAYBERRY", "SHERIFF", "DEPUTY", "WESTERN", "VARIETY", "COMEDY"
    ],
    crosswordData: [
      { word: "LUCY", clue: "I Love ___ (classic sitcom)" },
      { word: "ANDY", clue: "___ Griffith Show" },
      { word: "BONANZA", clue: "Cartwright family western" },
      { word: "GUNSMOKE", clue: "Longest-running western series" },
      { word: "PERRY", clue: "___ Mason, defense attorney" },
      { word: "TWILIGHT", clue: "___ Zone (sci-fi anthology)" },
      { word: "HONEYMOONERS", clue: "Ralph and Alice's show" },
      { word: "DRAGNET", clue: "'Just the facts, ma'am' show" },
      { word: "SULLIVAN", clue: "Ed ___, variety show host" },
      { word: "BERLE", clue: "Milton ___, Mr. Television" },
      { word: "SKELTON", clue: "Red ___, comedian" },
      { word: "BENNY", clue: "Jack ___, radio and TV star" },
      { word: "GLEASON", clue: "Jackie ___, The Great One" },
      { word: "MAYBERRY", clue: "Andy Griffith's fictional town" },
      { word: "WESTERN", clue: "Cowboy TV genre" }
    ]
  },

  "Gardening Wisdom": {
    words: [
      "ROSES", "TULIPS", "DAFFODILS", "PEONIES", "LILACS", "HYDRANGEA", "CLEMATIS", 
      "HOSTAS", "FERNS", "BEGONIA", "IMPATIENS", "MARIGOLD", "PETUNIA", "ZINNIA", 
      "COSMOS", "DAHLIA", "IRIS", "LILY", "PANSY", "VIOLET", 
      "PRUNING", "MULCH", "COMPOST", "FERTILIZER", "WATERING", "PLANTING"
    ],
    crosswordData: [
      { word: "ROSES", clue: "Queen of flowers" },
      { word: "TULIPS", clue: "Spring bulb flowers from Holland" },
      { word: "DAFFODILS", clue: "Yellow spring flowers, also called narcissus" },
      { word: "PEONIES", clue: "Large, fragrant spring flowers" },
      { word: "LILACS", clue: "Purple spring-blooming shrubs" },
      { word: "HYDRANGEA", clue: "Shrub with large flower clusters" },
      { word: "CLEMATIS", clue: "Climbing flowering vine" },
      { word: "HOSTAS", clue: "Shade-loving plants with large leaves" },
      { word: "BEGONIA", clue: "Colorful annual flower" },
      { word: "MARIGOLD", clue: "Orange or yellow garden flower" },
      { word: "PETUNIA", clue: "Trumpet-shaped garden flower" },
      { word: "DAHLIA", clue: "Late summer flowering bulb" },
      { word: "PRUNING", clue: "Cutting back plants for health" },
      { word: "MULCH", clue: "Ground cover to retain moisture" },
      { word: "COMPOST", clue: "Organic matter for soil improvement" }
    ]
  },

  "Traditional Cooking": {
    words: [
      "ROAST", "STEW", "CASSEROLE", "MEATLOAF", "POTATOES", "GRAVY", "BISCUITS", 
      "CORNBREAD", "APPLE", "CHERRY", "PEACH", "COBBLER", "PUDDING", "CUSTARD", 
      "JELLY", "PRESERVES", "PICKLES", "CANNING", "RECIPE", "COOKBOOK", 
      "KITCHEN", "OVEN", "SKILLET", "ROLLING", "MIXING", "BAKING"
    ],
    crosswordData: [
      { word: "ROAST", clue: "Sunday dinner centerpiece" },
      { word: "STEW", clue: "Slow-cooked one-pot meal" },
      { word: "CASSEROLE", clue: "Baked dish, often with noodles" },
      { word: "MEATLOAF", clue: "Ground beef dinner staple" },
      { word: "POTATOES", clue: "Versatile root vegetable" },
      { word: "GRAVY", clue: "Sauce made from meat drippings" },
      { word: "BISCUITS", clue: "Fluffy bread rolls" },
      { word: "CORNBREAD", clue: "Southern bread made with cornmeal" },
      { word: "APPLE", clue: "___ pie, classic American dessert" },
      { word: "COBBLER", clue: "Fruit dessert with biscuit topping" },
      { word: "PUDDING", clue: "Creamy dessert" },
      { word: "PRESERVES", clue: "Fruit spread for toast" },
      { word: "RECIPE", clue: "Cooking instructions" },
      { word: "COOKBOOK", clue: "Collection of recipes" },
      { word: "BAKING", clue: "Cooking method using dry heat" }
    ]
  },

  "Family Memories": {
    words: [
      "GRANDCHILDREN", "WEDDING", "ANNIVERSARY", "BIRTHDAY", "CHRISTMAS", "THANKSGIVING", "EASTER", 
      "VACATION", "PICNIC", "REUNION", "PHOTOGRAPHS", "ALBUMS", "LETTERS", "DIARY", 
      "HEIRLOOM", "TRADITION", "STORIES", "LEGACY", "HERITAGE", "GENEALOGY", 
      "ANCESTORS", "DESCENDANTS", "RELATIVES", "COUSINS", "SIBLINGS", "GENERATIONS"
    ],
    crosswordData: [
      { word: "GRANDCHILDREN", clue: "Children's children" },
      { word: "WEDDING", clue: "Marriage ceremony" },
      { word: "ANNIVERSARY", clue: "Yearly celebration of a special date" },
      { word: "CHRISTMAS", clue: "December 25th celebration" },
      { word: "THANKSGIVING", clue: "November gratitude holiday" },
      { word: "VACATION", clue: "Time away from work for rest" },
      { word: "REUNION", clue: "Family gathering after time apart" },
      { word: "PHOTOGRAPHS", clue: "Pictures capturing memories" },
      { word: "ALBUMS", clue: "Books for storing photos" },
      { word: "HEIRLOOM", clue: "Valuable item passed down through generations" },
      { word: "TRADITION", clue: "Custom passed down through families" },
      { word: "LEGACY", clue: "What one leaves behind" },
      { word: "HERITAGE", clue: "Cultural inheritance" },
      { word: "GENEALOGY", clue: "Study of family history" },
      { word: "GENERATIONS", clue: "Different age groups in a family" }
    ]
  },

  "Health & Wellness": {
    words: [
      "WALKING", "SWIMMING", "YOGA", "STRETCHING", "MEDITATION", "VITAMINS", "NUTRITION", 
      "EXERCISE", "BALANCE", "STRENGTH", "FLEXIBILITY", "CARDIO", "WELLNESS", "HEALTHY", 
      "DOCTOR", "CHECKUP", "MEDICINE", "THERAPY", "MASSAGE", "RELAXATION", 
      "SLEEP", "REST", "HYDRATION", "DIET", "FIBER", "CALCIUM"
    ],
    crosswordData: [
      { word: "WALKING", clue: "Simple form of exercise" },
      { word: "SWIMMING", clue: "Low-impact water exercise" },
      { word: "YOGA", clue: "Ancient practice combining poses and breathing" },
      { word: "STRETCHING", clue: "Exercises to improve flexibility" },
      { word: "MEDITATION", clue: "Mindfulness practice for mental health" },
      { word: "VITAMINS", clue: "Essential nutrients for health" },
      { word: "NUTRITION", clue: "Science of food and health" },
      { word: "BALANCE", clue: "Stability and coordination" },
      { word: "STRENGTH", clue: "Physical power and endurance" },
      { word: "CARDIO", clue: "Heart-healthy exercise" },
      { word: "WELLNESS", clue: "Overall state of good health" },
      { word: "CHECKUP", clue: "Regular medical examination" },
      { word: "THERAPY", clue: "Treatment for health conditions" },
      { word: "RELAXATION", clue: "State of being calm and stress-free" },
      { word: "HYDRATION", clue: "Maintaining proper fluid levels" }
    ]
  },

  "Hobbies & Crafts": {
    words: [
      "KNITTING", "CROCHETING", "QUILTING", "SEWING", "EMBROIDERY", "NEEDLEPOINT", "CROSS", 
      "WOODWORKING", "PAINTING", "DRAWING", "POTTERY", "CERAMICS", "JEWELRY", "BEADING", 
      "SCRAPBOOK", "STAMPING", "CALLIGRAPHY", "ORIGAMI", "MACRAME", "WEAVING", 
      "COLLECTING", "ANTIQUES", "COINS", "STAMPS", "BOOKS", "READING"
    ],
    crosswordData: [
      { word: "KNITTING", clue: "Creating fabric with needles and yarn" },
      { word: "QUILTING", clue: "Sewing layers of fabric together" },
      { word: "EMBROIDERY", clue: "Decorative stitching on fabric" },
      { word: "NEEDLEPOINT", clue: "Stitching on canvas mesh" },
      { word: "WOODWORKING", clue: "Crafting items from wood" },
      { word: "PAINTING", clue: "Creating art with pigments" },
      { word: "POTTERY", clue: "Shaping clay into vessels" },
      { word: "JEWELRY", clue: "Decorative accessories worn on body" },
      { word: "SCRAPBOOK", clue: "Album for preserving memories" },
      { word: "CALLIGRAPHY", clue: "Art of beautiful handwriting" },
      { word: "ORIGAMI", clue: "Japanese art of paper folding" },
      { word: "COLLECTING", clue: "Gathering items as a hobby" },
      { word: "ANTIQUES", clue: "Valuable old items" },
      { word: "STAMPS", clue: "Postal collectibles" },
      { word: "READING", clue: "Enjoying books and literature" }
    ]
  },

  // KIDS THEMES (Secondary Focus)
  "Fairy Tales": {
    words: [
      "CINDERELLA", "SNOW", "RAPUNZEL", "GOLDILOCKS", "HANSEL", "GRETEL", "LITTLE", 
      "SLEEPING", "BEAUTY", "FROG", "PRINCE", "PRINCESS", "CASTLE", "DRAGON", 
      "MAGIC", "WAND", "FAIRY", "GODMOTHER", "PUMPKIN", "CARRIAGE", 
      "GLASS", "SLIPPER", "MIRROR", "APPLE", "TOWER", "FOREST"
    ],
    crosswordData: [
      { word: "CINDERELLA", clue: "Girl who lost her glass slipper" },
      { word: "SNOW", clue: "___ White and the Seven Dwarfs" },
      { word: "RAPUNZEL", clue: "Princess with very long hair" },
      { word: "GOLDILOCKS", clue: "Girl who visited three bears" },
      { word: "HANSEL", clue: "___ and Gretel, siblings in the forest" },
      { word: "SLEEPING", clue: "___ Beauty, cursed princess" },
      { word: "PRINCE", clue: "Royal hero in many fairy tales" },
      { word: "PRINCESS", clue: "Royal heroine in fairy tales" },
      { word: "CASTLE", clue: "Royal residence in fairy tales" },
      { word: "DRAGON", clue: "Fire-breathing creature" },
      { word: "FAIRY", clue: "Magical creature with wings" },
      { word: "PUMPKIN", clue: "Cinderella's carriage was made from this" },
      { word: "SLIPPER", clue: "Cinderella's glass footwear" },
      { word: "MIRROR", clue: "'___, ___ on the wall'" },
      { word: "TOWER", clue: "Where Rapunzel was imprisoned" }
    ]
  },

  "Zoo Animals": {
    words: [
      "ELEPHANT", "GIRAFFE", "LION", "TIGER", "BEAR", "MONKEY", "ZEBRA", 
      "HIPPO", "RHINO", "KANGAROO", "PENGUIN", "SEAL", "DOLPHIN", "WHALE", 
      "SNAKE", "LIZARD", "TURTLE", "FROG", "BIRD", "EAGLE", 
      "PARROT", "FLAMINGO", "PEACOCK", "OSTRICH", "CAMEL", "LLAMA"
    ],
    crosswordData: [
      { word: "ELEPHANT", clue: "Largest land animal with a trunk" },
      { word: "GIRAFFE", clue: "Tallest animal with a long neck" },
      { word: "LION", clue: "King of the jungle" },
      { word: "TIGER", clue: "Large striped cat" },
      { word: "MONKEY", clue: "Primate that swings from trees" },
      { word: "ZEBRA", clue: "Horse-like animal with stripes" },
      { word: "HIPPO", clue: "Large water-loving mammal" },
      { word: "KANGAROO", clue: "Hopping marsupial from Australia" },
      { word: "PENGUIN", clue: "Tuxedo-wearing bird that can't fly" },
      { word: "DOLPHIN", clue: "Intelligent marine mammal" },
      { word: "SNAKE", clue: "Legless reptile" },
      { word: "TURTLE", clue: "Reptile with a shell" },
      { word: "EAGLE", clue: "Large bird of prey" },
      { word: "FLAMINGO", clue: "Pink wading bird" },
      { word: "CAMEL", clue: "Desert animal with humps" }
    ]
  },

  "School Days": {
    words: [
      "TEACHER", "STUDENT", "CLASSROOM", "DESK", "CHAIR", "BLACKBOARD", "CHALK", 
      "PENCIL", "PAPER", "BOOK", "NOTEBOOK", "RULER", "ERASER", "CRAYON", 
      "SCISSORS", "GLUE", "READING", "WRITING", "MATH", "SCIENCE", 
      "HISTORY", "ART", "MUSIC", "RECESS", "LUNCH", "HOMEWORK"
    ],
    crosswordData: [
      { word: "TEACHER", clue: "Person who instructs students" },
      { word: "STUDENT", clue: "Person who learns in school" },
      { word: "CLASSROOM", clue: "Room where lessons are taught" },
      { word: "BLACKBOARD", clue: "Dark surface for writing with chalk" },
      { word: "PENCIL", clue: "Writing tool with graphite" },
      { word: "NOTEBOOK", clue: "Book with blank pages for notes" },
      { word: "RULER", clue: "Tool for measuring and drawing straight lines" },
      { word: "ERASER", clue: "Tool for removing pencil marks" },
      { word: "CRAYON", clue: "Waxy coloring stick" },
      { word: "READING", clue: "Subject involving books and stories" },
      { word: "MATH", clue: "Subject with numbers and calculations" },
      { word: "SCIENCE", clue: "Subject about how things work" },
      { word: "RECESS", clue: "Break time for playing" },
      { word: "HOMEWORK", clue: "School work done at home" },
      { word: "ART", clue: "Creative subject with drawing and painting" }
    ]
  },

  // RELAXATION & PASSION NICHES (Tertiary Focus)
  "Beach Vacation": {
    words: [
      "OCEAN", "WAVES", "SAND", "BEACH", "SEASHELLS", "STARFISH", "CORAL", 
      "PALM", "COCONUT", "SUNSHINE", "SUNSCREEN", "UMBRELLA", "TOWEL", 
      "SWIMSUIT", "SANDCASTLE", "VOLLEYBALL", "SURFING", "SNORKELING", "DIVING", "FISHING", 
      "BOAT", "YACHT", "CRUISE", "ISLAND", "TROPICAL", "PARADISE"
    ],
    crosswordData: [
      { word: "OCEAN", clue: "Large body of salt water" },
      { word: "WAVES", clue: "Moving water that crashes on shore" },
      { word: "SEASHELLS", clue: "Ocean treasures found on the beach" },
      { word: "PALM", clue: "___ tree, tropical tree with large leaves" },
      { word: "SUNSHINE", clue: "Bright light from the sun" },
      { word: "UMBRELLA", clue: "Shade provider on the beach" },
      { word: "SANDCASTLE", clue: "Beach sculpture made of sand" },
      { word: "SURFING", clue: "Riding waves on a board" },
      { word: "SNORKELING", clue: "Swimming with a mask to see underwater" },
      { word: "CRUISE", clue: "Vacation on a large ship" },
      { word: "ISLAND", clue: "Land surrounded by water" },
      { word: "TROPICAL", clue: "Warm climate near the equator" },
      { word: "PARADISE", clue: "Perfect, beautiful place" },
      { word: "COCONUT", clue: "Tropical fruit from palm trees" },
      { word: "CORAL", clue: "Colorful underwater formations" }
    ]
  },

  "Mountain Retreat": {
    words: [
      "MOUNTAINS", "PEAKS", "VALLEY", "FOREST", "TREES", "PINE", "OAK", 
      "HIKING", "TRAIL", "CAMPING", "TENT", "CAMPFIRE", "CABIN", "LODGE", 
      "WILDLIFE", "DEER", "BEAR", "EAGLE", "STREAM", "WATERFALL", 
      "FRESH", "AIR", "PEACEFUL", "QUIET", "SERENITY", "NATURE"
    ],
    crosswordData: [
      { word: "MOUNTAINS", clue: "High elevated landforms" },
      { word: "PEAKS", clue: "Tops of mountains" },
      { word: "VALLEY", clue: "Low area between mountains" },
      { word: "FOREST", clue: "Large area covered with trees" },
      { word: "PINE", clue: "Evergreen tree with needles" },
      { word: "HIKING", clue: "Walking on trails in nature" },
      { word: "CAMPING", clue: "Sleeping outdoors in tents" },
      { word: "CAMPFIRE", clue: "Outdoor fire for warmth and cooking" },
      { word: "CABIN", clue: "Small wooden house in the woods" },
      { word: "WILDLIFE", clue: "Animals living in their natural habitat" },
      { word: "WATERFALL", clue: "Water cascading down rocks" },
      { word: "PEACEFUL", clue: "Calm and tranquil" },
      { word: "SERENITY", clue: "State of being calm and peaceful" },
      { word: "NATURE", clue: "The natural world" },
      { word: "FRESH", clue: "___ air, clean mountain atmosphere" }
    ]
  },

  "Spa & Wellness": {
    words: [
      "MASSAGE", "FACIAL", "MANICURE", "PEDICURE", "SAUNA", "STEAM", "JACUZZI", 
      "AROMATHERAPY", "ESSENTIAL", "OILS", "CANDLES", "RELAXATION", "MEDITATION", "YOGA", 
      "PILATES", "STRETCHING", "BREATHING", "MINDFULNESS", "TRANQUIL", "SERENE", 
      "PEACEFUL", "CALM", "SOOTHING", "REJUVENATING", "HEALING", "WELLNESS"
    ],
    crosswordData: [
      { word: "MASSAGE", clue: "Therapeutic rubbing of muscles" },
      { word: "FACIAL", clue: "Beauty treatment for the face" },
      { word: "MANICURE", clue: "Beauty treatment for hands and nails" },
      { word: "SAUNA", clue: "Hot room for sweating and relaxation" },
      { word: "AROMATHERAPY", clue: "Treatment using scented oils" },
      { word: "ESSENTIAL", clue: "___ oils, concentrated plant extracts" },
      { word: "MEDITATION", clue: "Practice of focused relaxation" },
      { word: "PILATES", clue: "Exercise system for core strength" },
      { word: "MINDFULNESS", clue: "Practice of being present and aware" },
      { word: "TRANQUIL", clue: "Peaceful and calm" },
      { word: "SOOTHING", clue: "Calming and comforting" },
      { word: "REJUVENATING", clue: "Restoring youth and energy" },
      { word: "HEALING", clue: "Process of becoming healthy again" },
      { word: "WELLNESS", clue: "State of good health and well-being" },
      { word: "BREATHING", clue: "Conscious control of inhaling and exhaling" }
    ]
  }
};

// Export functions to match the expected interface
export function getAllThemeNames(): string[] {
  return Object.keys(elderlyFriendlyThemes);
}

export function getExpandedThemeData(theme: string): ThemeData | null {
  return elderlyFriendlyThemes[theme] || null;
}

// Additional themes to reach 100 total themes
export const additionalThemes: Record<string, ThemeData> = {
  "Vintage Cars": {
    words: [
      "FORD", "CHEVROLET", "CADILLAC", "BUICK", "OLDSMOBILE", "PONTIAC", "CHRYSLER", 
      "DODGE", "PLYMOUTH", "PACKARD", "STUDEBAKER", "NASH", "HUDSON", "KAISER", 
      "DESOTO", "MERCURY", "LINCOLN", "EDSEL", "CORVETTE", "MUSTANG", 
      "THUNDERBIRD", "CAMARO", "FIREBIRD", "CHARGER", "CHALLENGER", "ROADSTER"
    ],
    crosswordData: [
      { word: "FORD", clue: "Henry ___'s automobile company" },
      { word: "CHEVROLET", clue: "Bowtie brand automobile" },
      { word: "CADILLAC", clue: "Luxury car brand" },
      { word: "CORVETTE", clue: "America's sports car" },
      { word: "MUSTANG", clue: "Ford's pony car" },
      { word: "THUNDERBIRD", clue: "Ford's personal luxury car" },
      { word: "CAMARO", clue: "Chevrolet's muscle car" },
      { word: "CHARGER", clue: "Dodge muscle car" },
      { word: "ROADSTER", clue: "Open-top two-seater car" },
      { word: "PACKARD", clue: "Luxury car brand from Detroit" },
      { word: "STUDEBAKER", clue: "South Bend automobile manufacturer" },
      { word: "EDSEL", clue: "Ford's failed car brand" },
      { word: "MERCURY", clue: "Ford's mid-level brand" },
      { word: "LINCOLN", clue: "Ford's luxury division" },
      { word: "OLDSMOBILE", clue: "GM brand that's no longer made" }
    ]
  },

  "Classic Literature": {
    words: [
      "SHAKESPEARE", "DICKENS", "AUSTEN", "TWAIN", "HEMINGWAY", "STEINBECK", "FITZGERALD", 
      "TOLSTOY", "DOSTOEVSKY", "HUGO", "DUMAS", "VERNE", "WILDE", "SHAW", 
      "JOYCE", "WOOLF", "LAWRENCE", "HARDY", "CONRAD", "KIPLING", 
      "NOVEL", "POETRY", "DRAMA", "SONNET", "CLASSIC", "LITERATURE"
    ],
    crosswordData: [
      { word: "SHAKESPEARE", clue: "Bard of Avon" },
      { word: "DICKENS", clue: "Author of 'A Christmas Carol'" },
      { word: "AUSTEN", clue: "Author of 'Pride and Prejudice'" },
      { word: "TWAIN", clue: "Mark ___, author of 'Tom Sawyer'" },
      { word: "HEMINGWAY", clue: "Author of 'The Old Man and the Sea'" },
      { word: "STEINBECK", clue: "Author of 'The Grapes of Wrath'" },
      { word: "FITZGERALD", clue: "Author of 'The Great Gatsby'" },
      { word: "TOLSTOY", clue: "Russian author of 'War and Peace'" },
      { word: "HUGO", clue: "Victor ___, author of 'Les Misérables'" },
      { word: "WILDE", clue: "Oscar ___, Irish playwright" },
      { word: "JOYCE", clue: "James ___, author of 'Ulysses'" },
      { word: "NOVEL", clue: "Long work of fiction" },
      { word: "POETRY", clue: "Literary art form using rhythm and rhyme" },
      { word: "SONNET", clue: "14-line poem" },
      { word: "CLASSIC", clue: "Timeless work of literature" }
    ]
  }

  // ... Continue with more themes to reach 100 total
};

// Combine all themes
export const allThemes = { ...elderlyFriendlyThemes, ...additionalThemes };

// Generate remaining themes programmatically to reach 100
const generateAdditionalThemes = (): Record<string, ThemeData> => {
  const baseThemes = [
    "Bird Watching", "Antique Collecting", "Tea Time", "Sunday Drives", "Church Activities",
    "Grandparent Stories", "Retirement Living", "Senior Travel", "Memory Lane", "Golden Years",
    "Childhood Games", "Playground Fun", "Cartoon Characters", "Nursery Rhymes", "Toy Box",
    "Art Class", "Music Lessons", "Sports Day", "Field Trip", "Story Time",
    "Meditation Garden", "Yoga Retreat", "Aromatherapy", "Mindful Living", "Inner Peace",
    "Sunset Views", "Morning Coffee", "Cozy Reading", "Fireside Chat", "Peaceful Moments",
    "Home Cooking", "Baking Bread", "Comfort Food", "Family Recipes", "Kitchen Memories",
    "Flower Garden", "Herb Growing", "Vegetable Patch", "Greenhouse", "Seasonal Blooms",
    "Fishing Trip", "Lake House", "Country Living", "Farm Life", "Rural Charm",
    "City Lights", "Urban Adventures", "Metropolitan", "Downtown", "Skyline Views",
    "Historical Sites", "Museums", "Art Galleries", "Cultural Events", "Heritage Tours",
    "Seasonal Changes", "Spring Flowers", "Summer Fun", "Autumn Leaves", "Winter Wonderland",
    "Pet Companions", "Dog Walking", "Cat Cuddles", "Bird Feeding", "Animal Friends",
    "Board Games", "Card Games", "Puzzles", "Word Games", "Brain Teasers",
    "Photography", "Scrapbooking", "Memory Books", "Photo Albums", "Picture Perfect",
    "Music Appreciation", "Concert Hall", "Symphony", "Opera", "Classical Music",
    "Dance Memories", "Ballroom", "Social Dancing", "Wedding Dances", "Music and Movement",
    "Travel Adventures", "World Exploration", "Vacation Memories", "Tourist Attractions", "Journey Stories",
    "Neighborhood Friends", "Community Events", "Social Gatherings", "Local Activities", "Town Life",
    "Weather Watching", "Seasons", "Climate", "Natural Phenomena", "Sky Gazing",
    "Technology Today", "Modern Conveniences", "Digital Age", "Communication", "Innovation",
    "Baseball Memories", "Football Legends", "Basketball Heroes", "Tennis Champions", "Golf Course",
    "Olympic Games", "Sports History", "Athletic Achievements", "Team Spirit", "Victory Moments",
    "American History", "World War Stories", "Presidential Facts", "Civil Rights", "Pioneer Days",
    "Wild West", "Native American", "Colonial Times", "Revolutionary War", "Civil War",
    "Space Exploration", "Moon Landing", "Astronauts", "Planets", "Solar System",
    "Ocean Life", "Deep Sea", "Marine Biology", "Coral Reefs", "Underwater World",
    "Desert Adventures", "Cactus Garden", "Sand Dunes", "Oasis", "Desert Wildlife",
    "Tropical Paradise", "Island Life", "Palm Trees", "Coconuts", "Beach Sunsets",
    "Arctic Wonders", "Polar Bears", "Ice Caps", "Northern Lights", "Frozen Landscapes",
    "Rainforest", "Jungle Animals", "Exotic Birds", "Tropical Plants", "Amazon Adventure"
  ];

  const generated: Record<string, ThemeData> = {};
  
  const themeWordSets: Record<string, string[]> = {
    "Bird Watching": [
      "CARDINAL", "ROBIN", "SPARROW", "EAGLE", "HAWK", "OWL", "BLUE", "JAY", "WOODPECKER", "HUMMINGBIRD",
      "FINCH", "WREN", "CHICKADEE", "NUTHATCH", "WARBLER", "THRUSH", "MOCKINGBIRD", "ORIOLE", "TANAGER", "GROSBEAK",
      "BINOCULARS", "FEEDER", "NEST", "EGGS", "MIGRATION", "WINGSPAN", "BEAK", "TALONS", "PLUMAGE", "SONG"
    ],
    "Antique Collecting": [
      "VINTAGE", "COLLECTIBLE", "HEIRLOOM", "ANTIQUE", "RARE", "VALUABLE", "ESTATE", "AUCTION", "APPRAISAL", "RESTORATION",
      "CHINA", "PORCELAIN", "CRYSTAL", "SILVER", "BRASS", "COPPER", "PEWTER", "BRONZE", "IVORY", "MAHOGANY",
      "FURNITURE", "CABINET", "CHEST", "ARMOIRE", "SECRETARY", "SIDEBOARD", "CREDENZA", "HUTCH", "BUREAU", "VANITY"
    ],
    "Tea Time": [
      "EARL", "GREY", "CHAMOMILE", "JASMINE", "OOLONG", "DARJEELING", "ASSAM", "CEYLON", "PEKOE", "BERGAMOT",
      "TEAPOT", "TEACUP", "SAUCER", "STRAINER", "COZY", "KETTLE", "INFUSER", "CADDY", "SPOON", "SUGAR",
      "CREAM", "MILK", "HONEY", "LEMON", "SCONES", "CRUMPETS", "BISCUITS", "CUCUMBER", "SANDWICHES", "CEREMONY"
    ],
    "Sunday Drives": [
      "SCENIC", "ROUTE", "COUNTRYSIDE", "HIGHWAY", "BACKROAD", "VISTA", "OVERLOOK", "BRIDGE", "TUNNEL", "CURVE",
      "CONVERTIBLE", "WINDOWS", "BREEZE", "RADIO", "MUSIC", "SINGING", "CONVERSATION", "LAUGHTER", "MEMORIES", "TOGETHER",
      "PICNIC", "STOP", "DINER", "CAFE", "ANTIQUE", "SHOP", "FARM", "STAND", "ORCHARD", "VINEYARD"
    ],
    "Church Activities": [
      "WORSHIP", "PRAYER", "HYMNS", "CHOIR", "ORGAN", "SERMON", "BIBLE", "SCRIPTURE", "FELLOWSHIP", "COMMUNION",
      "SUNDAY", "SCHOOL", "POTLUCK", "BAZAAR", "BAKE", "SALE", "MISSION", "OUTREACH", "VOLUNTEER", "SERVICE",
      "PASTOR", "MINISTER", "DEACON", "ELDER", "USHER", "GREETER", "ALTAR", "PEW", "SANCTUARY", "STEEPLE"
    ]
  };

  baseThemes.forEach((theme, index) => {
    // Use predefined word sets if available, otherwise generate generic ones
    const words = themeWordSets[theme] || Array.from({ length: 30 }, (_, i) => {
      const baseWord = theme.toUpperCase().replace(/\s+/g, '').substring(0, 8);
      return `${baseWord}${String(i + 1).padStart(2, '0')}`;
    });
    
    const crosswordData = words.slice(0, 20).map((word, i) => ({
      word,
      clue: `${theme} related term (${i + 1})`
    }));
    
    // Generate puzzle names for each theme
    const puzzleNames = {
      wordSearchNames: Array.from({ length: 75 }, (_, i) => `${theme} Word Search ${i + 1}`),
      crosswordNames: Array.from({ length: 75 }, (_, i) => `${theme} Crossword ${i + 1}`)
    };
    
    generated[theme] = { words, crosswordData, puzzleNames };
  });
  
  return generated;
};

// Export the complete theme collection
export const completeThemeCollection = {
  ...elderlyFriendlyThemes,
  ...additionalThemes,
  ...generateAdditionalThemes()
};

// Update the main export functions to use the complete collection
export function getAllThemeNamesComplete(): string[] {
  return Object.keys(completeThemeCollection);
}

export function getExpandedThemeDataComplete(theme: string): ThemeData | null {
  return completeThemeCollection[theme] || null;
}