import { InviteActionTypes } from "./invite-type";

import { addMemberToInvite, removeMemberFromInvite } from "./invite-utils";

const INITIAL_STATE = {
  drobpown: false,
  invitedUser: [],
};

const inviteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case InviteActionTypes.TOGGLE_SEARCH_DORBDOWN:
      return {
        ...state,
        drobpown: !state.popup,
      };
    case InviteActionTypes.ADD_MEMBERS:
      return {
        ...state,
        invitedUser: addMemberToInvite(state.invitedUser, action.payload),
      };
    case InviteActionTypes.REMOVE_MEMBERS:
      return {
        ...state,
        invitedUser: state.invitedUser.filter(
          (invitedUser) => invitedUser.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default inviteReducer;
