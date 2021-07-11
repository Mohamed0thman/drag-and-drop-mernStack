import React, { useState } from "react";
import { connect } from "react-redux";

import { toast } from "react-toastify";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import InviteDropdown from "../invite-dropdown/invite-dropdown.component";
import InvitedMember from "../invited-member/invited-member.component";
import InviteForm from "../invite-form/invite-form.component";

import { toggleCreateTeamPopup } from "../../redux/team/team-action";
import { searchUserName } from "../../redux/users/users-action";
import { createNotification } from "../../redux/notification/notification-action";

import "./invite-team.styles.scss";

const InviteTeam = ({
  toggleCreateTeamPopup,
  toggleForm,
  invitedUser,
  users,
  currentUser,
  newTeamId,
}) => {
  const { InviteTeamFormToLeft } = toggleForm;

  return (
    <div
      className="invite-team"
      style={{
        left: InviteTeamFormToLeft,
      }}
    >
      <h3 className="invite-team__title">invite your team</h3>
      <p className="invite-team__text">
        Invite your new team members to get going!
      </p>
      <InviteForm
        invitedUser={invitedUser}
        users={users}
        newTeamId={newTeamId}
        currentUser={currentUser}
      />

      <div className="invite-team__later" onClick={toggleCreateTeamPopup}>
        I'll do this later
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  invitedUser: state.invite.invitedUser,
  users: state.users.users,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCreateTeamPopup: () => dispatch(toggleCreateTeamPopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteTeam);
