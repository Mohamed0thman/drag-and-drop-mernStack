import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";

import Profile from "../../components/Profile/profile.component";
import Active from "../../components/active/active.component";
import Me from "../../components/me/me.component";

import "./account.styles.scss";

const AccountPage = ({ match }) => {
  const activeStyle = { backgroundColor: "white" };
  return (
    <div className="account">
      <Me />
      <ul className="account__nav">
        <li className="account__item">
          <NavLink
            className="account__link"
            exact
            to={match.path}
            activeStyle={activeStyle}
          >
            Profile
          </NavLink>
        </li>
        <li className="account__item">
          <NavLink
            className="account__link"
            to={`${match.path}/active`}
            activeStyle={activeStyle}
          >
            Active
          </NavLink>
        </li>
        <li className="account__item">
          <NavLink
            className="account__link"
            to={`${match.path}/settings`}
            activeStyle={activeStyle}
          >
            Settings
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path={match.path} component={Profile} />{" "}
        <Route path={`${match.path}/active`} component={Active} />
      </Switch>
    </div>
  );
};

export default AccountPage;
