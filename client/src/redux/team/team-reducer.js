import { TeamActionTypes } from "./team-type";

const INITIAL_STATE = {
  popup: false,
  teams: [],
};

const teamsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TeamActionTypes.TOGGLE_CREATE_TEAM_POPUP:
      return {
        ...state,
        popup: !state.popup,
      };
    case TeamActionTypes.SET_ALL_TEAM:
      return {
        ...state,
        teams: action.payload,
      };
    case TeamActionTypes.ADD_TEAM:
      return {
        ...state,
        teams: state.teams.concat(action.payload),
      };

    case TeamActionTypes.REMOVE_TEAM:
      return state.filter((team) => team._id !== action.payload);
    case TeamActionTypes.UPDATE_TEAM:
      return state.map((team) => {
        if (team._id === action.payload.teamId)
          return { ...team, ...action.payload.data };
        else return team;
      });
    case TeamActionTypes.RESET_USER_INFO:
      return [];
    default:
      return state;
  }
};

export default teamsReducer;
