import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

import Board from "../board/board.component";
import CreateButtom from "../create-button/create-button.componrnt";

import "./boards.styles.scss";

const Boards = ({ toggleCreateBoardPopup, boards }) => {
  return (
    <div className="boards">
      <div className="boards__title">
        <FontAwesomeIcon
          className="boards__icon"
          icon={faClipboard}
          color="#A7507F"
          style={{ fontSize: "2rem" }}
        />
        <span>Your Boards</span>
      </div>
      <div className="boards__collection ">
        {boards.map((board) => (
          <Board key={board._id} board={board} />
        ))}
        <CreateButtom handelOnClick={toggleCreateBoardPopup} isBoard />
      </div>
    </div>
  );
};

export default Boards;
