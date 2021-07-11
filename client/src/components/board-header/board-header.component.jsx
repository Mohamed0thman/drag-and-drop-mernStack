import React from "react";

import InviteForm from "../invite-form/invite-form.component";

import "./board-header.styles.scss";

const BoardHeader = ({ board }) => {
  const { boardName, _id } = board ? board : {};
  return (
    <div className="board-header">
      <div>
        <span>first letter</span>
        <span>{boardName}</span>
      </div>
      <div className="board-header__invite">invite</div>{" "}
      <div className="board-header__autocomplite">
        <InviteForm boardId={_id} />
      </div>
    </div>
  );
};

export default BoardHeader;
