import React, { useState } from "react";
import { connect } from "react-redux";

import { addMembers } from "../../redux/invite/invite-action";

import "./user.styles.scss";

const User = ({ user, addMembers, handleOnClick, currentUser }) => {
  const [isAvatar, setIsAvatar] = useState(true);
  const { fullName, id } = user;
  const { userId } = currentUser;

  const firstName = fullName ? fullName.split(" ")[0] : "";
  const firstLatter = fullName ? firstName.charAt(0) : "";
  const lastLatter = fullName
    ? fullName.substring(firstName.length).trim().charAt(0)
    : "";

  const handleOnError = () => {
    setIsAvatar(false);
  };
  const handleOnSelect = () => {
    if (userId === id) {
      return;
    }
    handleOnClick();
    addMembers(user);
  };

  return (
    <div className="user" onClick={handleOnSelect}>
      <div>
        {isAvatar ? (
          <div className="user__image">
            <img
              src={`http://localhost:3000/api/users/${id}/avatar`}
              alt=""
              onError={handleOnError}
            />
          </div>
        ) : (
          <div className="user__first-letter">
            <div>{firstLatter + lastLatter}</div>
          </div>
        )}
      </div>

      <div className="user__name">{fullName}</div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  addMembers: (user) => dispatch(addMembers(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
