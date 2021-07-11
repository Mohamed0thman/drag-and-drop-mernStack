import React from "react";
import { Link } from "react-router-dom";
import "./board.styless.scss";

const Board = ({ board }) => {
  console.log();
  const { background, boardName } = board ? board : {};
  return (
    <Link to={`/board/${board.boardName}`}>
      <div
        className="board"
        style={{
          backgroundColor: background,
          backgroundImage: `url(/image/${background}-small.png`,
        }}
      >
        <div
          className="board__name"
          style={{
            color: background ? "white" : "#333333",
          }}
        >
          {boardName}
        </div>
      </div>
    </Link>
  );
};

export default Board;
