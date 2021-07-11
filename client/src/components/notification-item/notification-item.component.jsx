import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";

import { toast } from "react-toastify";

import CustomButton from "../custom-button/custom-button.component";

import {
  updateNotification,
  createNotification,
} from "../../redux/notification/notification-action";
import { joinTo } from "../../redux/invite/invite-action";

import "./notification-item.styless.scss";

const NotificationItem = ({
  notification,
  updateNotification,
  createNotification,
  currentUser,
  joinTo,
}) => {
  const [isAvatar, setIsAvatar] = useState(true);
  const [state, setState] = useState({
    type: "",
    message: "",
    senderName: "",
  });
  const {
    senderId,
    senderName,
    message,
    type,
    teamId,
    boardId,
    _id,
  } = notification;

  const firstName = senderName ? senderName.split(" ")[0] : "";
  const firstLatter = senderName ? senderName.charAt(0) : "";
  const lastLatter = senderName
    ? senderName.substring(firstName.length).trim().charAt(0)
    : "";

  useEffect(() => {
    setState({
      type: type,
      message: message,
      senderName: senderName,
    });
  }, [notification]);
  const usersId = [{ id: senderId }];

  const handleOnError = () => {
    setIsAvatar(false);
  };
  const handleOnConfirm = async (event) => {
    event.preventDefault();
    setState({
      senderName: "",
      type: "message",
      message: "you accepted the invitation",
    });

    joinTo(
      {
        teamId: teamId,
        boardId: boardId,
        usersId: currentUser.userId,
      },
      () => toast.success("Account Created Successfully!"),
      (message) => toast.error(`Error: ${message}`)
    );
    // updateNotification(
    //   {
    //     senderName: "",
    //     type: "message",
    //     message: "you accepted  the invitation",
    //   },
    //   _id,
    //   () => toast.success("Account Created Successfully!"),
    //   (message) => toast.error(`Error: ${message}`)
    // );
    // createNotification(
    //   {
    //     usersId: usersId,
    //     senderId: currentUser.userId,
    //     senderName: currentUser.fullName,
    //     message: "accepted the invitation",
    //     type: "message",
    //   },
    //   () => toast.success("Account Created Successfully!"),
    //   (message) => toast.error(`Error: ${message}`)
    // );
  };

  const handleOnDismiss = async (event) => {
    event.preventDefault();
    setState({
      senderName: "",
      type: "message",
      message: "you dismissed the invitation",
    });
    updateNotification(
      {
        senderName: "",
        type: "message",
        message: "you dismissed the invitation",
      },
      _id,
      () => toast.success("Account Created Successfully!"),
      (message) => toast.error(`Error: ${message}`)
    );
  };
  console.log();
  return (
    <div className="notification-item">
      <div className="notification-item__container">
        <div className="notification-item__user">
          {isAvatar ? (
            <div className="notification-item__user--image">
              <img
                onError={handleOnError}
                src={`http://localhost:3000/api/users/${senderId}/avatar`}
                alt=""
              />
            </div>
          ) : (
            <div className="notification-item__user--Letter">
              <div>{firstLatter + lastLatter} </div>
            </div>
          )}
        </div>
        <div className="notification-item__message">
          {state.senderName === "" ? (
            ""
          ) : (
            <span className="notification-item__sender-name">{senderName}</span>
          )}{" "}
          {state.message}
        </div>
      </div>
      {state.type === "request" ? (
        <div className="notification-item__btns">
          <CustomButton isRequest type="submit" onClick={handleOnConfirm}>
            confirm
          </CustomButton>
          <CustomButton isRequest type="submit" onClick={handleOnDismiss}>
            dismiss
          </CustomButton>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateNotification: (data, id, onSuccess, onError) =>
    dispatch(updateNotification(data, id, onSuccess, onError)),
  joinTo: (data, onSuccess, onError) =>
    dispatch(joinTo(data, onSuccess, onError)),
  createNotification: (id, onSuccess, onError) =>
    dispatch(createNotification(id, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem);
