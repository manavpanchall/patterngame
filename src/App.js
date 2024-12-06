import React, { useEffect, useState } from 'react';
import './App.css';

const GRID_ROWS = 15;
const GRID_COLS = 20;

const generateInitialGrid = () => {
    const grid = [];
    for (let i = 0; i < GRID_ROWS; i++) {
        const row = [];
        for (let j = 0; j < GRID_COLS; j++) {
            row.push({ color: 'black' });
        }
        grid.push(row);
    }
    return grid;
};

const App = () => {
    const [grid, setGrid] = useState(generateInitialGrid());

    useEffect(() => {
        const interval = setInterval(() => {
            setGrid(prevGrid => {
                const newGrid = prevGrid.map(row => row.map(cell => ({ ...cell })));
                for (let col = 0; col < GRID_COLS; col++) {
                    for (let row = GRID_ROWS - 1; row > 0; row--) {
                        newGrid[row][col].color = newGrid[row - 1][col].color;
                    }
                    const intensity = Math.floor(Math.random() * 256);
                    if (col === 5 || col === 10) {
                        newGrid[0][col].color = `rgb(${intensity}, 0, 0)`;
                    } else if (col === 15) {
                        newGrid[0][col].color = `rgb(0, 0, ${intensity})`;
                    } else {
                        newGrid[0][col].color = 'black';
                    }
                }
                return newGrid;
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <div key={colIndex} className="cell" style={{ backgroundColor: cell.color }}></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default App;
