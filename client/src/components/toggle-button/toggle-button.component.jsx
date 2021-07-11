import React from "react";

import CustomButton from "../custom-button/custom-button.component";

import "./toggle-button.styles.scss";

const ToggleButton = () => {
  const boxs = [
    {
      id: 0,
      children: "LOGIN",
      toggleAction: loginToggle,
      message: "hello, friend!",
    },
    {
      id: 1,
      children: "REGISTER",
      toggleAction: registerToggle,
      message: "WELCOME BACK!",
    },
  ];
  return (
    <div>
      {boxs.map((el, i) => {
        return (
          <CustomButton
            key={i}
            children={el.children}
            handleOnClick={() => {
              loginToggle();
              el.toggleAction();
              handleOnClick(i);
            }}
            isToggleBtn="isToggleBtn"
            active={activeIndex === i ? "active" : ""}
          />
        );
      })}
    </div>
  );
};

export default ToggleButton;
