import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../../redux/user/user-action";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { ToggleAcountDropdown } from "../../redux/user/user-action";

import "./account-dropdown.styless.scss";

const AccountDropdown = ({ logoutUser, ToggleAcountDropdown, profile }) => {
  const [isAvatar, setIsAvatar] = useState(true);

  const { _id, fullName, email } = profile;

  const firstName = fullName ? fullName.split(" ")[0] : "";
  const firstLatter = fullName ? firstName.charAt(0) : "";
  const lastLatter = fullName
    ? fullName.substring(firstName.length).trim().charAt(0)
    : "";
  const handleOnError = () => {
    setIsAvatar(false);
  };

  return (
    <div className="account-dropdown">
      <div className="account-dropdown__header">
        <div className="account-dropdown__header--title">Account</div>
        <FontAwesomeIcon
          className="account-dropdown__header--close"
          icon={faTimes}
          onClick={ToggleAcountDropdown}
        />
      </div>
      <div className="account-dropdown__account">
        <div className="account-dropdown__account--image">
          {isAvatar ? (
            <img
              src={`http://localhost:3000/api/users/${_id}/avatar`}
              alt=""
              onError={handleOnError}
            />
          ) : (
            <div className="account-dropdown__account--letter">
              {firstLatter + lastLatter}
            </div>
          )}
        </div>
        <div className="account-dropdown__account--info">
          <h4 className="account-dropdown__account--name">{fullName}</h4>
          <div className="account-dropdown__account--email">{email} </div>
        </div>
      </div>
      <nav className="account-dropdown__nav">
        <ul className="account-dropdown__nav--list">
          <li className="account-dropdown__nav--item">
            <Link to="/account"> my profile</Link>
          </li>
          <li className="account-dropdown__nav--item">
            <Link to="/account/active">active</Link>
          </li>
          <li className="account-dropdown__nav--item" onClick={logoutUser}>
            log out
          </li>
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  profile: state.user.profile,
});
const mapDispatchToProps = (dispatch) => ({
  logoutUser: (userCredentials, onSuccess, onError) =>
    dispatch(logoutUser(userCredentials, onSuccess, onError)),
  ToggleAcountDropdown: () => dispatch(ToggleAcountDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDropdown);
