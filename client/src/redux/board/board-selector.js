import { createSelector } from "reselect";

const selectBoard = (state) => state.board;

export const selectBoards = createSelector(
  [selectBoard],
  (board) => board.boards
);

export const selectedBoard = (boardUrlParam) =>
  createSelector([selectBoards], (boards) =>
    boards.find((board) => board.boardName === boardUrlParam)
  );
