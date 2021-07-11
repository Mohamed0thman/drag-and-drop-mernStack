import { TeamActionTypes } from "./team-type";

export const toggleCreateTeamPopup = () => ({
  type: TeamActionTypes.TOGGLE_CREATE_TEAM_POPUP,
});

export const fetchAllTeams = () => ({
  type: TeamActionTypes.API,
  payload: {
    method: "GET",
    url: "/api/teams",
    success: (response) => setAllTeams(response),
  },
});

export const createTeam = (data, onSuccess, onError) => ({
  type: TeamActionTypes.API,
  payload: {
    method: "POST",
    url: "/api/teams",
    data,
    success: (team) => addTeam(team),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const addTeam = (team) => {
  console.log(team);
  return {
    type: TeamActionTypes.ADD_TEAM,
    payload: team,
  };
};

const setAllTeams = (data) => ({
  type: TeamActionTypes.SET_ALL_TEAM,
  payload: data,
});
