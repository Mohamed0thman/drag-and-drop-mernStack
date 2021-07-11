import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

import "./create-button.styles.scss";

const CreateButtom = ({ handelOnClick, isBoard }) => {
  return (
    <div
      className={`create-buttom ${isBoard ? "isBoard" : ""}`}
      onClick={handelOnClick}
    >
      <FontAwesomeIcon
        icon={faPlusSquare}
        color="#C58EAC"
        style={{ fontSize: "7rem" }}
      />
    </div>
  );
};

export default CreateButtom;
