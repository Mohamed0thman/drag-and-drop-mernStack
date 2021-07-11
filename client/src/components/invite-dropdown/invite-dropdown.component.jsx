import React from "react";
import { connect } from "react-redux";

import User from "../user/user.component";

import "./invite-dropdown.styless.scss";

const InviteDropdown = ({ users = [], addMembers, handleOnClick }) => {
  return (
    <div className="invite-search-dropdown">
      {users.map((user) => (
        <User
          addMembers={addMembers}
          key={user.id}
          user={user}
          handleOnClick={handleOnClick}
        ></User>
      ))}
    </div>
  );
};
const mapStateToProps = (state) => ({
  users: state.users.users,
});

export default connect(mapStateToProps)(InviteDropdown);
