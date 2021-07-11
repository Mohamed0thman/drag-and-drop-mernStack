import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { removeMembers } from "../../redux/invite/invite-action";

import "./invited-member.styles.scss";

const InvitedMember = ({ invitedUser, removeMembers }) => {
  const handleOnClick = () => {
    removeMembers(invitedUser);
  };
  return (
    <div className="invited-member">
      <div className="invited-member__name">{invitedUser.fullName}</div>

      <div>
        <FontAwesomeIcon
          className="invited-member__icon"
          icon={faTimes}
          onClick={handleOnClick}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeMembers: (user) => dispatch(removeMembers(user)),
});
export default connect(null, mapDispatchToProps)(InvitedMember);
