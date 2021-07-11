import { UsersActionTypes } from "./users-type";

export const searchUserName = (data, onSuccess, onError) => ({
  type: UsersActionTypes.API,
  payload: {
    method: "GET",
    url: `/api/users?name=${data}`,
    data,
    success: (response) => setAllUsers(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

const setAllUsers = (data) => ({
  type: UsersActionTypes.SET_ALL_USERS,
  payload: data,
});
