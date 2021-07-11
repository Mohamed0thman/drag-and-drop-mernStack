import React, { useState } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import CreateTeam from "../create-team/create-team.component";
import InviteTeam from "../invite-team/invite-team.component";

import { toggleCreateTeamPopup } from "../../redux/team/team-action";

import "./create-team-popup.styles.scss";

const CreateTeamPopup = ({ toggleCreateTeamPopup }) => {
  const [newTeamId, setNewTeamId] = useState("");
  const [toggleForm, setToggleForm] = useState({
    createTeamFormToLeft: "",
    InviteTeamFormToLeft: "500px",
  });

  const handleChangeToLeft = (team) => {
    setNewTeamId(team._id);
    setToggleForm({
      createTeamFormToLeft: "-500px",
      InviteTeamFormToLeft: "0",
    });
  };
 
  return (
    <div className="create-team-popup">
      <div className="create-team-popup__container">
        <FontAwesomeIcon
          icon={faTimes}
          color="#C58EAC"
          style={{
            fontSize: "18px",
            position: "absolute",
            top: "20px",
            right: "20px",
            cursor: "pointer",
          }}
          onClick={toggleCreateTeamPopup}
        />
        <div className="create-team-popup__form">
          <CreateTeam
            toggleForm={toggleForm}
            handleChangeToLeft={handleChangeToLeft}
          />
          <InviteTeam toggleForm={toggleForm} newTeamId={newTeamId} />
        </div>
        <div className="create-team-popup__image">
          <img src="/image/create-team.png" alt="create team" />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCreateTeamPopup: () => dispatch(toggleCreateTeamPopup()),
});

export default connect(null, mapDispatchToProps)(CreateTeamPopup);
