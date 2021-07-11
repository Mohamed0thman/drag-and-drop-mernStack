import React from "react";

import List from "../list/list.component";
import CreateList from "../create-list/create-list.component";

import "./lists.styles.scss";

const Lists = ({ board, lists }) => {
  console.log(board);
  return (
    <div className="lists">
      {lists.map((list) => (
        <List key={list._id} list={list} lists={lists} />
      ))}
      <CreateList board={board} />
    </div>
  );
};

export default Lists;
