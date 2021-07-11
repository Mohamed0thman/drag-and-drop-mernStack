import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import OptionList from "../option-list/option-list.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import { deleteCard } from "../../redux/list-and-card/card-action";

import { Draggable } from "react-beautiful-dnd";

import "./card.styles.scss";

const Card = ({ card, deleteCard, index }) => {
  const { _id } = card;
  const [toggleOptions, setToggleOption] = useState(false);
  const handleOnClickToggleIcon = () => {
    setToggleOption(!toggleOptions);
  };
  const handleOnClickDelete = () => {
    deleteCard(card._id);
    handleOnClickToggleIcon();
  };
  return (
    <Draggable draggableId={`card-${_id}`} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card__header">
            <div className="card__header--title">{card.cardTitle}</div>
            <div
              className="card__header--icon"
              onClick={handleOnClickToggleIcon}
            >
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
          </div>
          {toggleOptions ? (
            <OptionList handleOnClickDelete={handleOnClickDelete} />
          ) : null}{" "}
        </div>
      )}
    </Draggable>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteCard: (cardId, onSuccess, onError) =>
    dispatch(deleteCard(cardId, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(Card);
