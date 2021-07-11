import React, { useState } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import Colors from "../colors/colors.component";
import PhotoBg from "../photos/photos.component";

import { createBoard } from "../../redux/board/board-action";

import "./create-board.styles.scss";

const CreateBoard = ({ toggleCreateBoardPopup, createBoard }) => {
  const [boardInfo, setboardInfo] = useState({
    boardName: "",
    background: "",
  });
  const [bgToggle, setBgToggle] = useState({
    btnLeft: "0",
    colorsLeft: "0",
    photosLeft: "250px",
  });
  console.log(boardInfo);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleToColors = () => {
    setBgToggle({
      btnLeft: "0",
      colorsLeft: "0",
      photosLeft: "250px",
    });
  };
  const toggleToPhotos = () => {
    setBgToggle({
      btnLeft: "90px",
      colorsLeft: "-200px",
      photosLeft: "0",
    });
  };
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };

  const { boardName } = boardInfo;
  const { btnLeft, colorsLeft, photosLeft } = bgToggle;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setboardInfo({
      ...boardInfo,
      [name]: value,
    });
  };

  console.log(boardInfo);

  const handleSubmit = async (event) => {
    event.preventDefault();
    createBoard(
      boardInfo,
      () => toast.success("board Created Successfully!"),
      (message) => toast.error(`Error: ${message}`)
    );
  };
  console.log();
  const btns = [
    {
      id: 0,
      children: "colors",
      toggleAction: toggleToColors,
    },
    {
      id: 1,
      children: "photos",
      toggleAction: toggleToPhotos,
    },
  ];
  console.log();
  return (
    <div className="create-board">
      <div className="create-board__container">
        <form className="create-board__form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="boardName"
            placeholder="Board Name"
            required
            value={boardName}
            onChange={handleChange}
            autoComplete="off"
          />
          <div className="create-board__form--btn">
            <CustomButton isformBtn="isformBtn">create board</CustomButton>
          </div>
        </form>
        <div className="create-board__bg">
          <div className="create-board__btns">
            <div id="btn" style={{ left: btnLeft }}></div>

            {btns.map((btn, i) => (
              <CustomButton
                key={i}
                children={btn.children}
                handleOnClick={() => {
                  btn.toggleAction();
                  handleOnClick(i);
                }}
                active={activeIndex === i ? "active" : ""}
              ></CustomButton>
            ))}
          </div>
          <div className="create-board__bg-container">
            <Colors colorsLeft={colorsLeft} handleChange={handleChange} />
            <PhotoBg photosLeft={photosLeft} handleChange={handleChange} />
          </div>
        </div>
        <div className="create-board__icon" onClick={toggleCreateBoardPopup}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  createBoard: (data, onSuccess, onError) =>
    dispatch(createBoard(data, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(CreateBoard);
