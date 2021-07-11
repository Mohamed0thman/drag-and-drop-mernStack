import React, { useEffect } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUsers,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

import { toggleCreateBoardPopup } from "../../redux/board/board-action";
import { toggleCreateTeamPopup } from "../../redux/team/team-action";

import "./create-dropdown.styles.scss";

const CreateDorpdown = ({
  handleToggleCreate,
  toggleCreateBoardPopup,
  toggleCreateTeamPopup,
}) => {
  return (
    <div className="create-dropdown">
      <div className="create-dropdown__header">
        <div className="create-dropdown__header--title">create</div>
        <div onClick={handleToggleCreate}>
          <FontAwesomeIcon
            className="create-dropdown__header--close"
            icon={faTimes}
          />
        </div>
      </div>
      <div className="create-dropdown__item" onClick={toggleCreateTeamPopup}>
        <div className="create-dropdown__create">
          <FontAwesomeIcon className="create-dropdown__icon" icon={faUsers} />
          <span className="create-dropdown__title"> create team</span>
        </div>
        <div className="create-dropdown__text">
          A team is a group of boards and people. Use it to organize your
          company, side hustle, family, or friends.
        </div>
      </div>
      <div className="create-dropdown__item" onClick={toggleCreateBoardPopup}>
        <div className="create-dropdown__create">
          <FontAwesomeIcon
            className="create-dropdown__icon"
            icon={faClipboard}
          />
          <span className="create-dropdown__title">create board</span>
        </div>
        <div className="create-dropdown__text">
          A board is made up of cards ordered on lists. Use it to manage
          projects, track information, or organize anything.
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  toggleCreateBoardPopup: () => dispatch(toggleCreateBoardPopup()),
  toggleCreateTeamPopup: () => dispatch(toggleCreateTeamPopup()),
});

export default connect(null, mapDispatchToProps)(CreateDorpdown);
