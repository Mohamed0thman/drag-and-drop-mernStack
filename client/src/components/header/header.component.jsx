import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import NotificationDropdown from "../notification-dropdown/notification-dropdown.component";
import AccountDropdown from "../account-dropdown/account-dropdown.component";
import CreateDorpdown from "../create-dropdown/create-dropdown.component";

import { ToggleAcountDropdown } from "../../redux/user/user-action";
import {
  fetchAllNotification,
  ToggleNotification,
} from "../../redux/notification/notification-action";
import { fetchUserProfile } from "../../redux/user/user-action";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClipboard,
  faUsers,
  faPlus,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

import "./header.styles.scss";

const Header = ({
  accountDropdown,
  notificationDropdown,
  ToggleAcountDropdown,
  fetchAllNotification,
  fetchUserProfile,
  ToggleNotification,
}) => {
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);
  const [createDropdown, seCreateDropdown] = useState(false);

  const handleToggleAccount = () => {
    if (notificationDropdown) {
      ToggleNotification();
    }
    if (createDropdown) {
      seCreateDropdown(!createDropdown);
    }
    ToggleAcountDropdown();
  };

  const handleToggleNotification = () => {
    if (accountDropdown) {
      ToggleAcountDropdown();
    }
    if (createDropdown) {
      seCreateDropdown(!createDropdown);
    }
    ToggleNotification();
  };

  const handleToggleCreate = () => {
    if (accountDropdown) {
      ToggleAcountDropdown();
    }
    if (notificationDropdown) {
      ToggleNotification();
    }
    seCreateDropdown(!createDropdown);
  };

  const activeStyle = { backgroundColor: "#A7507F" };
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__left">
          <NavLink
            className="header__left--link"
            exact
            to="/"
            activeStyle={activeStyle}
          >
            <FontAwesomeIcon
              icon={faHome}
              color="white"
              style={{ fontSize: "2.5rem" }}
            />
          </NavLink>
          <NavLink
            className="header__left--link"
            to="/board"
            activeStyle={activeStyle}
          >
            <FontAwesomeIcon
              icon={faClipboard}
              color="white"
              size="2x"
              style={{ fontSize: "2.5rem" }}
            />
          </NavLink>
          <NavLink
            className="header__left--link"
            to="/team"
            activeStyle={activeStyle}
          >
            <FontAwesomeIcon
              icon={faUsers}
              color="white"
              size="2x"
              style={{ fontSize: "2.5rem" }}
            />
          </NavLink>
        </div>
        <div className="header__title">
          TEAM<span>WORK</span>
        </div>
        <div className="header__right">
          <div
            className={`header__right--icon create `}
            onClick={handleToggleCreate}
          >
            <FontAwesomeIcon icon={faPlus} color="white" />
          </div>
          <div
            className={`header__right--icon ${
              notificationDropdown ? "active" : null
            }`}
            onClick={handleToggleNotification}
          >
            <FontAwesomeIcon icon={faBell} color="white" />
          </div>
          <div
            className={`header__right--icon ${
              accountDropdown ? "active" : null
            }`}
            onClick={handleToggleAccount}
          >
            <span>M</span>
          </div>
        </div>
      </div>
      {accountDropdown ? (
        <AccountDropdown fetchUserProfile={fetchUserProfile} />
      ) : null}
      {notificationDropdown ? (
        <NotificationDropdown
          ToggleNotification={ToggleNotification}
          fetchAllNotification={fetchAllNotification}
        />
      ) : null}
      {createDropdown ? (
        <CreateDorpdown handleToggleCreate={handleToggleCreate} />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  accountDropdown: state.user.accountDropdown,
  notificationDropdown: state.notification.notificationDropdown,
});

const mapDispatchToProps = (dispatch) => ({
  ToggleAcountDropdown: () => dispatch(ToggleAcountDropdown()),
  ToggleNotification: () => dispatch(ToggleNotification()),
  fetchAllNotification: () => dispatch(fetchAllNotification()),
  fetchUserProfile: () => dispatch(fetchUserProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
