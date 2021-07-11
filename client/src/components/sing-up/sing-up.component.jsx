import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { registerUser } from "../../redux/user/user-action";

import "./sing-up.styles.scss";

const SignUp = ({ registerUser, formToggle }) => {
  const [userCredentials, setCredentials] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { fullName, email, password, confirmPassword } = userCredentials;
  const { registerLeft } = formToggle;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error(`Error: password dont match}`);
      return;
    }

    registerUser(
      userCredentials,
      () => toast.success("Account Created Successfully!"),
      (message) => toast.error(`Error: ${message}`)
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <form
      id="register"
      className="sign-UP"
      onSubmit={handleSubmit}
      style={{ left: registerLeft }}
    >
      <FormInput
        type="text"
        name="fullName"
        placeholder="First name"
        required
        value={fullName}
        onChange={handleChange}
        autoComplete="true"
      />
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        required
        value={email}
        onChange={handleChange}
        autoComplete="true"
      />
      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        required
        value={password}
        onChange={handleChange}
        autoComplete="true"
      />
      <FormInput
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        required
        value={confirmPassword}
        onChange={handleChange}
        autoComplete="true"
      />
      <div className="sign-UP__term">
        <input
          className="sign-UP__term--checkbox"
          type="checkbox"
          id="checkbox"
          required
        />
        <label className="sign-UP__term--label" htmlFor="checkbox"></label>

        <p className="sign-UP__term--text">
          agree to the <a href="#!">terms and conditions</a>
        </p>
      </div>
      <CustomButton isformBtn="isformBtn">REGISTER</CustomButton>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  registerUser: (userCredentials, onSuccess, onError) =>
    dispatch(registerUser(userCredentials, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(SignUp);
