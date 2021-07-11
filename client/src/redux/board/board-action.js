import { BoardActionTypes } from "./board-type";

export const toggleCreateBoardPopup = () => ({
  type: BoardActionTypes.TOGGLE_CREATE_BOARD_POPUP,
});

export const fetchAllBoards = () => ({
  type: BoardActionTypes.API,
  payload: {
    method: "GET",
    url: "/api/boards",
    success: (response) => setAllBoards(response),
  },
});

export const fetchSelectedBoard = (boardId) => ({
  type: BoardActionTypes.API,
  payload: {
    method: "GET",
    url: `/api/${boardId}/board`,
    success: (response) => selectedBoard(response),
  },
});

export const createBoard = (data, onSuccess, onError) => ({
  type: BoardActionTypes.API,
  payload: {
    method: "POST",
    url: "/api/boards",
    data,
    success: (board) => addBoard(board),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const addBoard = (board) => ({
  type: BoardActionTypes.ADD_BOARD,
  payload: board,
});

const setAllBoards = (data) => ({
  type: BoardActionTypes.SET_ALL_BOARDS,
  payload: data,
});
const selectedBoard = (data) => ({
  type: BoardActionTypes.SELECTED_BOARD,
  payload: data,
});
