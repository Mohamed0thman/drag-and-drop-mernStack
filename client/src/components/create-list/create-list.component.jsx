import React, { useState } from "react";
import { connect } from "react-redux";

import { toast } from "react-toastify";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faTimes } from "@fortawesome/free-solid-svg-icons";

import {
  createList,
  toggleCreateList,
} from "../../redux/list-and-card/list-action";

import "./create-list.styles.scss";

const CreateList = ({
  createList,
  board,
  lists,
  toggleCreateList,
  toggleList,
}) => {
  const [listTitle, setListTitle] = useState("");
  console.log(parseInt(lists.length));
  console.log(listTitle);

  const handleSubmit = async (event) => {
    event.preventDefault();

    createList(
      {
        listTitle,
        sort: lists.length,
      },
      board._id,
      () => toast.success("Account Created Successfully!"),
      (message) => toast.error(`Error: ${message}`)
    );
    setListTitle("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setListTitle(value);
  };
  const handleOnClickClose = () => {
    setListTitle("");
    toggleCreateList();
  };

  return (
    <div className="create-list">
      {!toggleList ? (
        <CustomButton isformBtn="isformBtn" handleOnClick={toggleCreateList}>
          <FontAwesomeIcon icon={faPlusSquare} /> Add List
        </CustomButton>
      ) : null}

      {toggleList ? (
        <form action="" className="create-list__form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="listTitle"
            placeholder="list title"
            required
            value={listTitle}
            onChange={handleChange}
            autoComplete="off"
          />
          <div className="create-list__btns">
            <CustomButton type="submit" isformBtn="isformBtn">
              Create List
            </CustomButton>
            <CustomButton
              type="button"
              isformBtn="isformBtn"
              handleOnClick={handleOnClickClose}
            >
              <FontAwesomeIcon icon={faTimes} />
            </CustomButton>
          </div>
        </form>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  toggleList: state.list.toggleListForm,
});

const mapDispatchToProps = (dispatch) => ({
  createList: (listInfo, boardId, onSuccess, onError) =>
    dispatch(createList(listInfo, boardId, onSuccess, onError)),
  toggleCreateList: () => dispatch(toggleCreateList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateList);
