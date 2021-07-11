import { NotificationActionTypes } from "./notification.type";

export const ToggleNotification = () => ({
  type: NotificationActionTypes.TOGGLE_NOTIFICATION,
});

export const fetchAllNotification = () => ({
  type: NotificationActionTypes.API,
  payload: {
    method: "GET",
    url: "/api/notification",
    success: (response) => setAllNotification(response),
  },
});

export const createNotification = (data, onSuccess, onError) => {
  console.log(data);
  return {
    type: NotificationActionTypes.API,
    payload: {
      method: "POST",
      url: "/api/notification",
      data,
      success: (notification) => sendNotification(notification),
      postProcessSuccess: onSuccess,
      postProcessError: onError,
    },
  };
};

const sendNotification = (notification) => ({
  type: NotificationActionTypes.SEND_NOTIFICATION,
  payload: notification,
});

export const updateNotification = (data, id, onSuccess, onError) => ({
  type: NotificationActionTypes.API,
  payload: {
    method: "PATCH",
    url: `/api/notification/${id}`,
    data,
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const setAllNotification = (data) => ({
  type: NotificationActionTypes.SET_ALL_NOTIFICATION,
  payload: data,
});
