import axios from "axios";
import { UserActionTypes } from "./user/user-type";
import { LoadingActionTypes } from "./loading/loading-type";
import { logoutUser } from "./user/user-action";

export const apiMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== UserActionTypes.API) return next(action);
  const {
    url,
    method,
    success,
    data,
    headers,
    postProcessSuccess,
    postProcessError,
  } = action.payload;

  console.log(data);

  if (method === "GET") {
    dispatch({ type: LoadingActionTypes.TOGGLE_LOADER });
  }

  const BASE_URL = "http://localhost:3000";
  const AUTH_TOKEN = getState().user.currentUser.token;
  if (AUTH_TOKEN) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
  }

  axios({
    method,
    url: BASE_URL + url,
    data: data ? data : null,
    headers,
  })
    .then((response) => {
      if (method === "GET") {
        dispatch({ type: LoadingActionTypes.TOGGLE_LOADER });
      }
      console.log(response);

      if (success) dispatch(success(response.data));
      if (postProcessSuccess) postProcessSuccess(response.data);
    })
    .catch((e) => {
      if (method === "GET") {
        dispatch({ type: LoadingActionTypes.TOGGLE_LOADER });
      }
      console.log(e);
      if (!e.response) console.warn(e);
      else {
        if (e.response && e.response.status === 403) {
          dispatch(logoutUser());
        }
        if (e.response.status === 401) {
          console.log(e.response);
        }
        if (e.response.data.message) {
          if (postProcessError) postProcessError(e.response.data.message);
        }
      }
    });
};
