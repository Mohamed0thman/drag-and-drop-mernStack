import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { toast } from "react-toastify";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { updateUser } from "../../redux/user/user-action";

import "./profile.styles.scss";

const Profile = ({ updateUser, profile }) => {
  const [userInformation, setUserInformation] = useState({
    fullName: "",
    email: "",
    bio: "",
  });
  useEffect(() => {
    setUserInformation({
      fullName: profile.fullName,
      email: profile.email,
      bio: profile.bio,
    });
  }, [profile]);

  const { fullName, email, bio } = userInformation;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserInformation({
      ...userInformation,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    updateUser(
      userInformation,
      () => toast.success("Account Created Successfully!"),
      (message) => toast.error(`Error: ${message}`)
    );
  };

  return (
    <div className="profile">
      <div className="profile__container">
        <h4 className="profile__title">EDIT INFORMATION</h4>
        <form className="profile__form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="fullName"
            placeholder="first name"
            value={fullName || ""}
            onChange={handleChange}
            label="Full Name"
            unactive={fullName === profile.fullName ? true : false}
          />
          <FormInput
            type="text"
            name="email"
            placeholder="email"
            value={email || ""}
            onChange={handleChange}
            label="E-mail"
            unactive={email === profile.email ? true : false}
          />
          <div className="bio">
            <div className="profile__bio--label">Bio</div>
            <textarea
              className={`profile__bio--input ${
                bio === profile.bio ? "unactive" : ""
              }`}
              type="text"
              name="bio"
              placeholder="biography"
              value={bio || ""}
              onChange={handleChange}
              spellCheck="false"
            />
          </div>
          <div className="profile__btn">
            <CustomButton isformBtn="isformBtn">SAVE</CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});
const mapDispatchToProps = (dispatch) => ({
  updateUser: (userInformation, onSuccess, onError) =>
    dispatch(updateUser(userInformation, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
