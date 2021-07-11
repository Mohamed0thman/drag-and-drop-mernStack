import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

import Lists from "../lists/lists.component";
import List from "../list/list.component";
import CreateList from "../create-list/create-list.component";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { sort, updateList } from "../../redux/list-and-card/list-action";

import { toast } from "react-toastify";

import "./board-canvas.styles.scss";

const BoardCanvas = ({ board, lists, sort, updateList }) => {
  const { _id } = board ? board : {};

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    updateList(
      {
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIdIndexStart: source.index,
        droppableIdIndexEnd: destination.index,
        draggableId,
        type,
      },
      _id,
      () => toast.success("update Successfully!"),
      (message) => toast.error(`Error: ${message}`)
    );
    sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    );
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-list" direction="horizontal" type="list">
        {(provided) => (
          <div
            className="board-canvas"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {lists.map((list, index) => (
              <List key={`list-${list._id}`} list={list} index={index} />
            ))}
            {provided.placeholder}
            <CreateList lists={lists} board={board} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
const mapDispatchToProps = (dispatch) => ({
  updateList: (result, _id, onSuccess, onError) =>
    dispatch(updateList(result, _id, onSuccess, onError)),
  sort: (
    droppableIdStart,
    droppableIdEnd,
    droppableIdIndexStart,
    droppableIdIndexEnd,
    droppableI,
    type
  ) =>
    dispatch(
      sort(
        droppableIdStart,
        droppableIdEnd,
        droppableIdIndexStart,
        droppableIdIndexEnd,
        droppableI,
        type
      )
    ),
});

export default connect(null, mapDispatchToProps)(BoardCanvas);
