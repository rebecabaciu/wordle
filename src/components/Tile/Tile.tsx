import React from "react";
import "./Tile.css";

export type TileStatus = "" | "correct" | "present" | "absent";

interface TileProps {
  letter: string;
  status: TileStatus;
  animated?: boolean;
}

const Tile: React.FC<TileProps> = ({ letter, status, animated = false }) => {
  return (
    <div
      className={`tile ${status} ${animated ? "pop" : ""}`}
    >
      {letter}
    </div>
  );
};

export default Tile;
