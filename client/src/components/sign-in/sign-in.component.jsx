import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { loginUser } from "../../redux/user/user-action";

import "./sign-in.styles.scss";

const SignIn = ({ loginUser, formToggle }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;
  const { loginLeft } = formToggle;

  const handelSubmit = async (event) => {
    event.preventDefault();

    loginUser(
      userCredentials,
      () => toast.success("Logged In Successfully!"),
      (message) => toast.error(`Error: ${message}`)
    );
  };

  const handelChange = (event) => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <form
      id="login"
      className="sign-in"
      onSubmit={handelSubmit}
      style={{ left: loginLeft }}
    >
      <FormInput
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={handelChange}
        autoComplete="true"
      />
      <FormInput
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={handelChange}
        autoComplete="true"
      />
      <p className="sign-in__forgot-password">forgot your password?</p>
      <CustomButton isformBtn="isformBtn">LOGIN</CustomButton>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userCredentials, onSuccess, onError) =>
    dispatch(loginUser(userCredentials, onSuccess, onError)),
});
export default connect(null, mapDispatchToProps)(SignIn);
