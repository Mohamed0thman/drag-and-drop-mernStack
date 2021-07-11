import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import Team from "../team/team.component";
import CreateButtom from "../create-button/create-button.componrnt";

import { toggleCreateTeamPopup } from "../../redux/team/team-action";

import "./teams.styles.scss";
const Teams = ({ teams, toggleCreateTeamPopup }) => {
  return (
    <div className="teams">
      <div className="teams__title">
        <FontAwesomeIcon
          className="teams__icon"
          icon={faUsers}
          color="#A7507F"
          style={{ fontSize: "2rem" }}
        />
        <span>Your Teams</span>
      </div>
      <div className="teams__collection">
        {teams.map((team, i) => (
          <Team team={team} key={i} />
        ))}
        <CreateButtom handelOnClick={toggleCreateTeamPopup} />
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  toggleCreateTeamPopup: () => dispatch(toggleCreateTeamPopup()),
});

export default connect(null, mapDispatchToProps)(Teams);
