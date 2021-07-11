import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

import CreateCard from "../create-card/create-card.component";
import Card from "../card/card.component";

import OptionList from "../option-list/option-list.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import { Droppable, Draggable } from "react-beautiful-dnd";

import { deleteList } from "../../redux/list-and-card/list-action";

import "./list.styles.scss";

const List = ({ list, deleteList, index }) => {
  const { _id, listTitle, cards } = list;
  const [toggleOptions, setToggleOption] = useState(false);

  const handleOnClickToggleIcon = () => {
    setToggleOption(!toggleOptions);
  };

  const handleOnClickDelete = () => {
    deleteList(list._id);
    handleOnClickToggleIcon();
  };

  return (
    <Draggable
      draggableId={`list-${_id}`}
      index={index}
    >
      {(provided) => (
        <div
          className="list"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={`list-${_id}`}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
            
                <div className="list__header">
                  <div> {listTitle}</div>
                  <div onClick={handleOnClickToggleIcon}>
                    <FontAwesomeIcon
                      className="list__header--icon"
                      icon={faEllipsisH}
                    />
                  </div>
                </div>
                {cards.map((card, index) => (
                  <Card
                    key={`card-${card._id}`}
                    card={card}
                    listId={_id}
                    index={index}
                  />
                ))}
                {provided.placeholder}
                <CreateCard
                  toggleListOption={handleOnClickToggleIcon}
                  listId={_id}
                />
                {toggleOptions ? (
                  <OptionList handleOnClickDelete={handleOnClickDelete} />
                ) : null}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  deleteList: (listId, onSuccess, onError) =>
    dispatch(deleteList(listId, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
