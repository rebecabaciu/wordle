import React from "react";
import "./Keyboard.css";

export type KeyStatus = "" | "correct" | "present" | "absent";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  keyStatuses: { [key: string]: KeyStatus };
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, keyStatuses }) => {
  const firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const thirdRow = ["z", "x", "c", "v", "b", "n", "m"];

  const renderKey = (key: string) => (
    <button
      key={key}
      className={`key ${keyStatuses[key] || ""}`}
      onClick={() => onKeyPress(key)}
    >
      {key.toUpperCase()}
    </button>
  );

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {firstRow.map(renderKey)}
      </div>
      <div className="keyboard-row">
        {secondRow.map(renderKey)}
      </div>
      <div className="keyboard-row">
        <button className="key special" onClick={() => onKeyPress("Enter")}>
          ENTER
        </button>
        {thirdRow.map(renderKey)}
        <button className="key special" onClick={() => onKeyPress("Backspace")}>
          ⌫
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
