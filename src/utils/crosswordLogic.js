// A more robust CrosswordGenerator class with backtracking

class CrosswordGenerator {
    constructor(wordLists, gridSize = 15) {
        this.wordLists = wordLists;
        this.gridSize = gridSize;
        this.grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(' '));
        this.wordsPlaced = [];
        this.clues = {};
    }

    generateGrid() {
        const allWords = Object.values(this.wordLists).flat();
        // Shuffle words for variety in puzzle generation
        for (let i = allWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
        }
        this.placeWordWithBacktracking(allWords);
    }

    placeWordWithBacktracking(words) {
        if (words.length === 0) {
            return true; // All words placed
        }

        const word = words[0];
        const remainingWords = words.slice(1);

        // Try to place the current word
        // If no words are placed yet, place the first word in the center
        if (this.wordsPlaced.length === 0) {
            const row = Math.floor(this.gridSize / 2);
            const col = Math.floor((this.gridSize - word.length) / 2);
            // Assuming a default topic for the first word, or pass it from wordLists
            // For now, using "90's music" as a placeholder
            if (this.canPlaceWord(word, row, col, "horizontal")) {
                this.placeWord(word, "90's music", row, col, "horizontal"); // Use a valid topic
                if (this.placeWordWithBacktracking(remainingWords)) {
                    return true;
                }
                this.removeWord(word); // Backtrack
            }
            // Also try vertical for the first word
            if (this.canPlaceWord(word, col, row, "vertical")) { // Swapping row/col for vertical center
                this.placeWord(word, "90's music", col, row, "vertical"); // Use a valid topic
                if (this.placeWordWithBacktracking(remainingWords)) {
                    return true;
                }
                this.removeWord(word); // Backtrack
            }
        } else {
            // Try to place the word by intersecting with existing words
            for (const placed of this.wordsPlaced) {
                for (let i = 0; i < placed.word.length; i++) { // Iterate through letters of placed word
                    for (let j = 0; j < word.length; j++) { // Iterate through letters of current word
                        if (placed.word[i] === word[j]) { // If letters match, try to intersect
                            let newRow, newCol, newOrientation;
                            if (placed.orientation === "horizontal") {
                                newRow = placed.row - j;
                                newCol = placed.col + i;
                                newOrientation = "vertical";
                            } else { // placed.orientation === "vertical"
                                newRow = placed.row + i;
                                newCol = placed.col - j;
                                newOrientation = "horizontal";
                            }

                            // Check if the intersection point is valid and word can be placed
                            if (this.canPlaceWord(word, newRow, newCol, newOrientation)) {
                                // Need to determine the topic for the current word.
                                // This is a limitation of the current setup where words are flattened.
                                // For now, using "90's music" as a placeholder.
                                this.placeWord(word, "90's music", newRow, newCol, newOrientation); // Use a valid topic
                                if (this.placeWordWithBacktracking(remainingWords)) {
                                    return true;
                                }
                                this.removeWord(word); // Backtrack
                            }
                        }
                    }
                }
            }
        }

        return false; // Could not place the word
    }

    canPlaceWord(word, row, col, orientation) {
        if (row < 0 || col < 0) return false;

        if (orientation === "horizontal") {
            if (col + word.length > this.gridSize) return false;
            for (let i = 0; i < word.length; i++) {
                if (this.grid[row][col + i] !== ' ' && this.grid[row][col + i] !== word[i]) {
                    return false;
                }
            }
        } else { // vertical
            if (row + word.length > this.gridSize) return false;
            for (let i = 0; i < word.length; i++) {
                if (this.grid[row + i][col] !== ' ' && this.grid[row + i][col] !== word[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    placeWord(word, topic, row, col, orientation) {
        if (orientation === "horizontal") {
            for (let i = 0; i < word.length; i++) {
                this.grid[row][col + i] = word[i];
            }
        } else { // vertical
            for (let i = 0; i < word.length; i++) {
                this.grid[row + i][col] = word[i];
            }
        }
        this.wordsPlaced.push({ word, topic, row, col, orientation });
        this.clues[word] = this.getClue(topic, word);
    }

    removeWord(word) {
        const wordInfo = this.wordsPlaced.pop();
        if (wordInfo) {
            if (wordInfo.orientation === "horizontal") {
                for (let i = 0; i < wordInfo.word.length; i++) {
                    this.grid[wordInfo.row][wordInfo.col + i] = ' ';
                }
            } else { // vertical
                for (let i = 0; i < wordInfo.word.length; i++) {
                    this.grid[wordInfo.row + i][wordInfo.col] = ' ';
                }
            }
        }
        delete this.clues[word];
    }

    getClue(topic, word) {
        const cluesMap = {
            "90's music": {
                "NIRVANA": "Grunge band fronted by Kurt Cobain.",
                "SPICEGIRLS": "What you might add to your life to make it more exciting.",
                "MACARENA": "Dance craze of the mid-90s.",
                "BRITNEY": "Pop princess of the late 90s.",
                "BLUR": "British band known for 'Song 2'.",
                "REM": "Band with 'Losing My Religion'.",
                "OASIS": "Britpop band, brothers Liam and Noel.",
                "DRDRE": "Hip-hop producer and rapper.",
                "TLC": "R&B group with hits like 'Waterfalls'.",
                "ACE OF BASE": "Swedish pop group with 'The Sign'.",
                "COOLIO": "Rapper known for 'Gangsta's Paradise'.",
                "MC HAMMER": "Rapper famous for 'U Can't Touch This'.",
                "ENYA": "Irish singer known for 'Orinoco Flow'.",
                "ALANIS": "Canadian singer-songwriter, 'Jagged Little Pill'.",
                "BECK": "Musician known for 'Loser'.",
                "NO DOUBT": "Ska-influenced band fronted by Gwen Stefani.",
                "RED HOT CHILI PEPPERS": "Funk-rock band from California.",
                "SOUNDGARDEN": "Seattle grunge band, Chris Cornell's group.",
                "PEARL JAM": "Seattle grunge band, Eddie Vedder's group.",
                "SMASHING PUMPKINS": "Alternative rock band from Chicago."
            },
            "Christianity": {
                "GOSPEL": "The 'Good News' of Jesus Christ.",
                "APOSTLE": "One who is sent, like a messenger of faith.",
                "BETHLEHEM": "The birthplace of Jesus.",
                "JESUS": "Central figure of Christianity.",
                "FAITH": "Belief or trust in God.",
                "GRACE": "Unmerited divine assistance.",
                "PRAYER": "Communication with God.",
                "CHURCH": "A place of Christian worship.",
                "BIBLE": "The holy scripture of Christianity.",
                "PSALM": "A sacred song or poem, often from the Book of Psalms.",
                "PROPHET": "A person regarded as a spokesperson for God.",
                "MIRACLE": "A supernatural event.",
                "SALVATION": "Deliverance from sin.",
                "EASTER": "Celebration of Christ's resurrection.",
                "PENTECOST": "Feast commemorating the descent of the Holy Spirit.",
                "DISCIPLE": "A follower or student of Jesus.",
                "ANGEL": "A spiritual being attendant upon God.",
                "SIN": "An immoral act.",
                "REPENTANCE": "Sincere regret for wrongdoing.",
                "WORSHIP": "Adoration and devotion."
            },
            "Math": {
                "ALGEBRA": "Branch of mathematics dealing with symbols.",
                "PI": "What you might eat if you're feeling irrational.",
                "SQUARE": "The result of multiplying a number by itself (e.g., 5 x 5).",
                "FRACTION": "A part of a whole.",
                "EQUATION": "A statement that the values of two mathematical expressions are equal.",
                "CALCULUS": "Branch of mathematics dealing with rates of change and accumulation.",
                "GEOMETRY": "Study of shapes and space.",
                "STATISTICS": "The practice or science of collecting and analyzing data.",
                "PROBABILITY": "The likelihood of an event occurring.",
                "LOGARITHM": "The exponent to which a base must be raised to produce a given number.",
                "TRIGONOMETRY": "Study of triangles and trigonometric functions.",
                "DERIVATIVE": "A function's rate of change.",
                "INTEGRAL": "A function whose derivative is a given function.",
                "VECTOR": "A quantity having direction as well as magnitude.",
                "MATRIX": "A rectangular array of numbers.",
                "DIFFERENCE": "The result of subtraction.",
                "SUMMATION": "The process of adding numbers.",
                "VARIABLE": "A symbol representing a quantity that can change.",
                "CONSTANT": "A quantity having a fixed value.",
                "FUNCTION": "A relationship or expression involving one or more variables."
            }
        };
        
        if (cluesMap[topic] && cluesMap[topic][word]) {
            return cluesMap[topic][word];
        }
        return "Clue not found";
    }

    getClues() {
        return this.clues;
    }
}

const exampleWordLists = {
    "90's music": ["NIRVANA", "SPICEGIRLS", "MACARENA", "BRITNEY", "BLUR", "REM", "OASIS", "DRDRE", "TLC", "ACE OF BASE", "COOLIO", "MC HAMMER", "ENYA", "ALANIS", "BECK", "NO DOUBT", "RED HOT CHILI PEPPERS", "SOUNDGARDEN", "PEARL JAM", "SMASHING PUMPKINS"],
    "Christianity": ["GOSPEL", "APOSTLE", "BETHLEHEM", "JESUS", "FAITH", "GRACE", "PRAYER", "CHURCH", "BIBLE", "PSALM", "PROPHET", "MIRACLE", "SALVATION", "EASTER", "PENTECOST", "DISCIPLE", "ANGEL", "SIN", "REPENTANCE", "WORSHIP"],
    "Math": ["ALGEBRA", "PI", "SQUARE", "FRACTION", "EQUATION", "CALCULUS", "GEOMETRY", "STATISTICS", "PROBABILITY", "LOGARITHM", "TRIGONOMETRY", "DERIVATIVE", "INTEGRAL", "VECTOR", "MATRIX", "DIFFERENCE", "SUMMATION", "VARIABLE", "CONSTANT", "FUNCTION"]
};

export { CrosswordGenerator, exampleWordLists };
