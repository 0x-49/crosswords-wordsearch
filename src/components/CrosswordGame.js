import React, { useState, useEffect } from 'react';
import { CrosswordGenerator, exampleWordLists } from '../utils/crosswordLogic';
import './CrosswordGame.css'; // We'll create this CSS file later

const CrosswordGame = () => {
    const [generator, setGenerator] = useState(null);
    const [grid, setGrid] = useState([]);
    const [clues, setClues] = useState({});
    const [selectedWord, setSelectedWord] = useState(null); // { word: 'NIRVANA', clue: '...', direction: 'across'/'down', row: 0, col: 0 }
    const [userInput, setUserInput] = useState({}); // { 'NIRVANA': 'N', 'GOSPEL': 'G' }
    const [currentPuzzle, setCurrentPuzzle] = useState(null); // Stores the generated puzzle data

    useEffect(() => {
        // Initialize the generator and generate the first puzzle
        const initialGenerator = new CrosswordGenerator(exampleWordLists, 15);
        initialGenerator.generateGrid();
        const generatedClues = initialGenerator.getClues();
        
        // Process the grid for easier rendering
        const processedGrid = initialGenerator.grid.map(row => row.map(cell => cell === ' ' ? '' : cell));

        setGenerator(initialGenerator);
        setGrid(processedGrid);
        setClues(generatedClues);
        setCurrentPuzzle({ grid: processedGrid, clues: generatedClues });
    }, []);

    const handleCellClick = (row, col, wordInfo) => {
        // Logic to select a word based on click
        // For simplicity, let's assume clicking on a cell that's part of a word selects it
        // A more robust solution would involve mapping cells to words
        if (wordInfo) {
            setSelectedWord(wordInfo);
        }
    };

    const handleInputChange = (word, value) => {
        setUserInput(prev => ({ ...prev, [word]: value.toUpperCase() }));
    };

    const renderGrid = () => {
        return grid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
                {row.map((cell, colIndex) => {
                    // Determine if this cell is part of a word and its info
                    let wordInfo = null;
                    if (generator) {
                        for (const placedWord of generator.wordsPlaced) {
                            if (placedWord.orientation === 'horizontal' &&
                                placedWord.row === rowIndex &&
                                colIndex >= placedWord.col &&
                                colIndex < placedWord.col + placedWord.word.length) {
                                wordInfo = { word: placedWord.word, clue: clues[placedWord.word], direction: 'across', row: placedWord.row, col: placedWord.col };
                                break;
                            }
                            if (placedWord.orientation === 'vertical' &&
                                placedWord.col === colIndex &&
                                rowIndex >= placedWord.row &&
                                rowIndex < placedWord.row + placedWord.word.length) {
                                wordInfo = { word: placedWord.word, clue: clues[placedWord.word], direction: 'down', row: placedWord.row, col: placedWord.col };
                                break;
                            }
                        }
                    }

                    const isSelected = selectedWord && selectedWord.word === wordInfo?.word;
                    const cellValue = userInput[wordInfo?.word] || cell;

                    return (
                        <div
                            key={colIndex}
                            className={`grid-cell ${cell ? 'filled' : ''} ${isSelected ? 'selected' : ''}`}
                            onClick={() => wordInfo && handleCellClick(rowIndex, colIndex, wordInfo)}
                        >
                            {cellValue}
                        </div>
                    );
                })}
            </div>
        ));
    };

    const renderClues = () => {
        const acrossClues = [];
        const downClues = [];

        if (selectedWord) {
            // Highlight the selected word's clues
            if (selectedWord.direction === 'across') {
                acrossClues.push(selectedWord);
            } else {
                downClues.push(selectedWord);
            }
        } else {
            // Show all clues if no word is selected
            for (const word in clues) {
                const wordInfo = generator?.wordsPlaced.find(wp => wp.word === word);
                if (wordInfo) {
                    if (wordInfo.orientation === 'horizontal') {
                        acrossClues.push({ word, clue: clues[word], direction: 'across', row: wordInfo.row, col: wordInfo.col });
                    } else {
                        downClues.push({ word, clue: clues[word], direction: 'down', row: wordInfo.row, col: wordInfo.col });
                    }
                }
            }
        }

        // Sort clues by their starting position in the grid
        acrossClues.sort((a, b) => a.col - b.col);
        downClues.sort((a, b) => a.row - b.row);

        return (
            <div className="clues-container">
                <div className="clues-section">
                    <h3>Across</h3>
                    {acrossClues.map((clueInfo, index) => (
                        <div key={index} className={`clue-item ${selectedWord?.word === clueInfo.word ? 'highlighted' : ''}`} onClick={() => setSelectedWord(clueInfo)}>
                            {clueInfo.clue}
                        </div>
                    ))}
                </div>
                <div className="clues-section">
                    <h3>Down</h3>
                    {downClues.map((clueInfo, index) => (
                        <div key={index} className={`clue-item ${selectedWord?.word === clueInfo.word ? 'highlighted' : ''}`} onClick={() => setSelectedWord(clueInfo)}>
                            {clueInfo.clue}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="crossword-game">
            <h1>Crossword Puzzle</h1>
            <div className="game-area">
                <div className="grid-wrapper">
                    {renderGrid()}
                </div>
                {renderClues()}
            </div>
            {selectedWord && (
                <div className="input-area">
                    <input
                        type="text"
                        value={userInput[selectedWord.word] || ''}
                        onChange={(e) => handleInputChange(selectedWord.word, e.target.value)}
                        placeholder={`Enter your answer for ${selectedWord.word}`}
                    />
                </div>
            )}
        </div>
    );
};

export default CrosswordGame;
