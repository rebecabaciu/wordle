import React, { useState, useEffect } from "react";
import Tile, { TileStatus } from "../Tile/Tile";
import Keyboard, { KeyStatus } from "../Keyboard/Keyboard";
import "./Board.css";
import { words } from "../../data/words";

const Board: React.FC = () => {
  const rows = 6;
  const cols = 5;

  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""))
  );
  const [statusBoard, setStatusBoard] = useState<TileStatus[][]>(
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [targetWord, setTargetWord] = useState(() => words[Math.floor(Math.random() * words.length)]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [keyStatuses, setKeyStatuses] = useState<{ [key: string]: KeyStatus }>({});
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameOver) return;
      const { key } = event;

      if (/^[a-zA-Z]$/.test(key)) {
        handleVirtualKeyPress(key.toLowerCase());
      } else if (key === "Enter") {
        handleVirtualKeyPress("Enter");
      } else if (key === "Backspace") {
        handleVirtualKeyPress("Backspace");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, currentCol, currentRow, targetWord, gameOver, keyStatuses]);

  const handleSubmit = () => {
    const guess = board[currentRow].join("");

    if (!words.includes(guess)) {
      alert("Cuvânt invalid!");
      return;
    }

    const targetLetters = targetWord.split("");
    const updatedStatuses: TileStatus[] = [];

    // Stabilim ce status va primi fiecare literă
    for (let i = 0; i < cols; i++) {
      if (guess[i] === targetLetters[i]) {
        updatedStatuses.push("correct");
        targetLetters[i] = "_";
      } else {
        updatedStatuses.push("");
      }
    }

    for (let i = 0; i < cols; i++) {
      if (updatedStatuses[i] === "") {
        const index = targetLetters.indexOf(guess[i]);
        if (index !== -1) {
          updatedStatuses[i] = "present";
          targetLetters[index] = "_";
        } else {
          updatedStatuses[i] = "absent";
        }
      }
    }

    // Acum, setăm flip + delay individual pe fiecare literă
    for (let i = 0; i < cols; i++) {
      setTimeout(() => {
        setStatusBoard((prev) => {
          const newBoard = [...prev];
          newBoard[currentRow][i] = updatedStatuses[i];
          return newBoard;
        });
      }, i * 300); // fiecare literă întârzie 300ms
    }

    // După toate flipurile
    setTimeout(() => {
      const newKeyStatuses = { ...keyStatuses };
      for (let i = 0; i < cols; i++) {
        const letter = guess[i];
        const currentStatus = updatedStatuses[i];
        const existingStatus = newKeyStatuses[letter];

        if (currentStatus === "correct" ||
            (currentStatus === "present" && existingStatus !== "correct") ||
            (currentStatus === "absent" && !existingStatus)) {
          newKeyStatuses[letter] = currentStatus;
        }
      }
      setKeyStatuses(newKeyStatuses);

      if (guess === targetWord) {
        setGameOver(true);
        setWin(true);
      } else if (currentRow + 1 === rows) {
        setGameOver(true);
        setWin(false);
      } else {
        setCurrentRow(currentRow + 1);
        setCurrentCol(0);
      }
    }, cols * 300 + 500); // După toate flipurile + puțin buffer
  };

  const handleVirtualKeyPress = (key: string) => {
    if (gameOver) return;

    if (key === "Enter") {
      if (currentCol === cols) {
        handleSubmit();
      }
    } else if (key === "Backspace") {
      if (currentCol > 0) {
        const updatedBoard = [...board];
        updatedBoard[currentRow][currentCol - 1] = "";
        setBoard(updatedBoard);
        setCurrentCol(currentCol - 1);
      }
    } else if (/^[a-z]$/.test(key)) {
      if (currentCol < cols) {
        const updatedBoard = [...board];
        updatedBoard[currentRow][currentCol] = key;
        setBoard(updatedBoard);
        setCurrentCol(currentCol + 1);
      }
    }
  };

  const handleRestart = () => {
    setBoard(Array.from({ length: rows }, () => Array.from({ length: cols }, () => "")));
    setStatusBoard(Array.from({ length: rows }, () => Array.from({ length: cols }, () => "")));
    setCurrentRow(0);
    setCurrentCol(0);
    setTargetWord(words[Math.floor(Math.random() * words.length)]);
    setGameOver(false);
    setWin(false);
    setKeyStatuses({});
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((letter, colIndex) => (
            <Tile
            key={colIndex}
            letter={letter}
            status={statusBoard[rowIndex]?.[colIndex] || ""}
            animated={rowIndex === currentRow && colIndex < currentCol && !gameOver}
          />          
          ))}
        </div>
      ))}

      {gameOver && (
        <div className="game-over">
          <h2>
            {win
              ? "Felicitări, ai câștigat!"
              : `Ai pierdut! Cuvântul era: ${targetWord.toUpperCase()}`}
          </h2>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}

      <Keyboard onKeyPress={handleVirtualKeyPress} keyStatuses={keyStatuses} />
    </div>
  );
};

export default Board;
