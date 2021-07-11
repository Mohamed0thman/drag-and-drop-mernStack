import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import BoardHeader from "../board-header/board-header.component";
import BoardCanvas from "../board-canvas/board-canvas.component";

import {
  fetchAllLists,
  createList,
} from "../../redux/list-and-card/list-action";

import { selectedBoard } from "../../redux/board/board-selector";

import "./board-view.styles.scss";
import { NotImplemented } from "http-errors";

const BoardView = ({ board, lists, fetchAllLists, loading }) => {
  useEffect(() => {
    if (board) {
      fetchAllLists(board._id);
    }
  }, [fetchAllLists, board]);

  const { background } = board ? board : {};

  console.log(background);
  return (
    <div
      className="board-view"
      style={{
        backgroundColor: board ? board.background : null,
        backgroundImage: board
          ? `url(/image/${board.background}-big.png`
          : null,
        background: board ? board.background : null,
      }}
    >
      <BoardHeader board={board} />
      <BoardCanvas board={board} lists={lists} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  lists: state.list.lists,
  loading: state.loading,
  board: selectedBoard(ownProps.match.params.boardName)(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllLists: (boardId, onSuccess) =>
    dispatch(fetchAllLists(boardId, onSuccess)),
  createList: (data, onSuccess, onError) =>
    dispatch(createList(data, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardView);
