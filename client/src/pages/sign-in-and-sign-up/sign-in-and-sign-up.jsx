import React, { useState } from "react";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sing-up/sing-up.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import "./sign-in-and-sign-up.styles.scss";

const SignInAndSignUp = () => {
  const [formToggle, setFormToggle] = useState({
    btnLeft: "0",
    loginLeft: "0",
    registerLeft: "500px",
    message: "hello, friend!",
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const registerToggle = () => {
    setFormToggle({
      btnLeft: "120px",
      loginLeft: "-500px",
      registerLeft: "0",
      message: "WELCOME BACK!",
    });
  };
  const loginToggle = () => {
    setFormToggle({
      btnLeft: "0",
      loginLeft: "0",
      registerLeft: "500px",
      message: "hello, friend!",
    });
  };
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };
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
  const { btnLeft } = formToggle;
  return (
    <div className="sign-in-and-sign-up">
      <div className="sign-in-and-sign-up__logo">
        <img src="/image/TW.png" alt="" />
      </div>
      {boxs.map((el, i) => {
        return (
          <p
            key={i}
            className={`sign-in-and-sign-up__text ${
              activeIndex === i ? "active" : ""
            }`}
          >
            {el.message}
          </p>
        );
      })}

      <div className="sign-in-and-sign-up__container">
        <h1 className="sign-in-and-sign-up__container--heading">
          TEAM<span>WORK</span>
        </h1>
        <p className="sign-in-and-sign-up__container--text">
          project management website
        </p>
        <div className="sign-in-and-sign-up__container--btn-box">
          <div id="btn" style={{ left: btnLeft }}></div>
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
        <div className="sign-in-and-sign-up__container--form-group">
          <SignIn formToggle={formToggle} />
          <SignUp formToggle={formToggle} />
        </div>
      </div>
    </div>
  );
};

export default SignInAndSignUp;
