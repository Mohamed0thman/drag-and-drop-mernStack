import { InviteActionTypes } from "./invite-type";
import { addTeam } from "../team/team-action";
import { addBoard } from "../board/board-action";

export const joinTo = (data, onSuccess, onError) => ({
  type: InviteActionTypes.API,
  payload: {
    method: "PATCH",
    url: "/api/join",
    data,
    success: (data) => {
      console.log(data);
      if (data.team) {
        return addTeam(data.team);
      } else {
        return addBoard(data.board);
      }
    },
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const toggleSearchDrobdown = () => ({
  type: InviteActionTypes.TOGGLE_SEARCH_DORBDOWN,
});

export const addMembers = (member) => ({
  type: InviteActionTypes.ADD_MEMBERS,
  payload: member,
});

export const removeMembers = (member) => ({
  type: InviteActionTypes.REMOVE_MEMBERS,
  payload: member,
});
