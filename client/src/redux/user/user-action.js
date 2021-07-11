import { UserActionTypes } from "./user-type";

export const ToggleAcountDropdown = () => ({
  type: UserActionTypes.TOGGLE_ACCOUNT_DORPDOWN,
});

export const registerUser = (data, onSuccess, onError) => ({
  type: UserActionTypes.API,
  payload: {
    method: "POST",
    url: "/api/users/register",
    data,
    success: (response) => setUserInfo(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const loginUser = (data, onSuccess, onError) => ({
  type: UserActionTypes.API,
  payload: {
    method: "POST",
    url: "/api/users/login",
    data,
    success: (response) => setUserInfo(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const logoutUser = () => {
  localStorage.removeItem("USER_INFO");
  return { type: UserActionTypes.RESET_USER_INFO };
};

const setUserInfo = (data) => {
  console.log("name", data.fullName);
  console.log("data", data);
  const parsedToken = JSON.parse(atob(data.token.split(".")[1]));
  const userInfo = {
    userId: parsedToken._id,
    fullName: data.user.fullName,
    email: data.user.email,
    token: data.token,
    isLoggedIn: true,
  };
  localStorage.setItem("USER_INFO", JSON.stringify(userInfo));
  return { type: UserActionTypes.SET_USER_INFO, payload: userInfo };
};

export const updateUser = (data, onSuccess, onError) => ({
  type: UserActionTypes.API,
  payload: {
    method: "PATCH",
    url: "/api/users/me",
    data,
    success: (response) => setUserProfile(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const fetchUserProfile = (data, onSuccess, onError) => ({
  type: UserActionTypes.API,
  payload: {
    method: "GET",
    url: "/api/users/me",
    data,
    success: (response) => setUserProfile(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

const setUserProfile = (data) => ({
  type: UserActionTypes.SET_USER_PROFILE,
  payload: data,
});

export const uploadAvatar = (data, onSuccess, onError) => ({
  type: UserActionTypes.API,
  payload: {
    method: "POST",
    url: "/api/users/me/avatar",
    data,
    headers: {
      ContentType: "multipart/form-data",
    },
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});
export const deleteAvatar = (onSuccess, onError) => ({
  type: UserActionTypes.API,
  payload: {
    method: "DELETE",
    url: "/api/users/me/avatar",
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});
