import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { toast } from "react-toastify";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import InviteDropdown from "../invite-dropdown/invite-dropdown.component";
import InvitedMember from "../invited-member/invited-member.component";

import { searchUserName } from "../../redux/users/users-action";
import { createNotification } from "../../redux/notification/notification-action";

import "./invite-form.styles.scss";

const InviteForm = ({
  searchUserName,
  createNotification,
  invitedUser,
  currentUser,
  boardId,
  newTeamId,
  users,
}) => {
  console.log(currentUser);
  const { userId, fullName } = currentUser;

  const [search, setSearch] = useState("");
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const message = "send inviton to you";

  const handelOnPress = () => {
    searchUserName(
      search,
      () => toast.success("Account Created Successfully!"),
      (message) => toast.error(`Error: ${message}`)
    );
  };
  console.log(invitedUser);
  const usersId = [];
  invitedUser.forEach((user) => {
    let obj = {
      id: user.id,
    };
    usersId.push(obj);
  });
  console.log(usersId);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("s");

    console.log({
      usersId,
      senderId: userId,
      senderName: fullName,
      teamId: newTeamId,
      message: message,
      type: "request",
    });
    createNotification(
      {
        usersId,
        senderId: userId,
        senderName: fullName,
        teamId: newTeamId,
        boardId: boardId,
        message: message,
        type: "request",
      },
      () => toast.success("Account Created Successfully!"),
      (message) => toast.error(`Error: ${message}`)
    );
  };

  const focus = () => {
    document.getElementById("search").focus();
  };

  const handleOnClick = () => {
    setSearch("");
    focus();
  };

  return (
    <form className="invite-form" onSubmit={handleSubmit}>
      <div className="invite-form__autocomplete">
        <div className="invite-form__search" onClick={focus}>
          {invitedUser.map((invitedUser) => (
            <InvitedMember key={invitedUser.id} invitedUser={invitedUser} />
          ))}
          <FormInput
            type="text"
            name="search"
            id="search"
            placeholder="search"
            value={search}
            onChange={handleChange}
            onKeyPress={handelOnPress}
            autoComplete="off"
            disappeared
          />
        </div>
        {users.length <= 0 || search === "" ? (
          ""
        ) : (
          <InviteDropdown handleOnClick={handleOnClick} />
        )}
      </div>

      <CustomButton isformBtn="isformBtn">invite to team</CustomButton>
    </form>
  );
};

const mapStateToProps = (state, ownProps) => ({
  invitedUser: state.invite.invitedUser,
  users: state.users.users,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  searchUserName: (search, onSuccess, onError) =>
    dispatch(searchUserName(search, onSuccess, onError)),
  createNotification: (data, onSuccess, onError) =>
    dispatch(createNotification(data, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteForm);
