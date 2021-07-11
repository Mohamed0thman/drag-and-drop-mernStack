import { BoardActionTypes } from "./board-type";

const INITIAL_STATE = {
  popup: false,
  boards: [],
  selectedBoard: {},
};

const boardsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BoardActionTypes.TOGGLE_CREATE_BOARD_POPUP:
      return {
        ...state,
        popup: !state.popup,
      };
    case BoardActionTypes.SET_ALL_BOARDS:
      return {
        ...state,
        boards: action.payload,
      };
    case BoardActionTypes.SELECTED_BOARD:
      return {
        ...state,
        selectedBoard: action.payload,
      };
    case BoardActionTypes.ADD_BOARD:
      return {
        ...state,
        boards: state.boards.concat(action.payload),
      };

    case BoardActionTypes.REMOVE_BOARD:
      return state.filter((team) => team._id !== action.payload);
    case BoardActionTypes.UPDATE_TEAM:
      return state.map((team) => {
        if (team._id === action.payload.teamId)
          return { ...team, ...action.payload.data };
        else return team;
      });
    case BoardActionTypes.RESET_USER_INFO:
      return [];
    default:
      return state;
  }
};

export default boardsReducer;
