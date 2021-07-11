import { UsersActionTypes } from "./users-type";

const INITIAL_STATE = {
  users: [],
};

const usersReduser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UsersActionTypes.SET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default usersReduser;
