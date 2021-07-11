import { NotificationActionTypes } from "./notification.type";

const INITIAL_STATE = {
  notificationDropdown: false,
  notification: [],
};

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotificationActionTypes.TOGGLE_NOTIFICATION:
      return {
        ...state,
        notificationDropdown: !state.notificationDropdown,
      };
    case NotificationActionTypes.SET_ALL_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };

    default:
      return state;
  }
};

export default notificationReducer;
