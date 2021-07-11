import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./option-list.styles.scss";

const OptionList = ({ handleOnClickDelete }) => {
  return (
    <ul className="option-list">
      <li className="option-list__item">
        <FontAwesomeIcon className="option-list__icon" icon={faPen} />
        <span>Rename List</span>
      </li>
      <li className="option-list__item" onClick={handleOnClickDelete}>
        <FontAwesomeIcon className="option-list__icon" icon={faTrash} />
        <span>Delete List</span>
      </li>
    </ul>
  );
};

export default OptionList;
