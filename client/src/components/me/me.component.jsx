import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import UploadForm from "../upload-form/upload-form.component";

import "./me.styles.scss";

const Me = ({ currentUser, profile }) => {
  const [isAvatar, setIsAvatar] = useState(false);
  const { userId, fullName, email } = currentUser;

  const firstName = fullName ? fullName.split(" ")[0] : "";
  const firstLatter = fullName ? firstName.charAt(0) : "";
  const lastLatter = fullName
    ? fullName.substring(firstName.length).trim().charAt(0)
    : "";

  const createProfileImageUrl = () => {
    fetch(`http://localhost:3000/api/users/${userId}/avatar`).then((res) => {
      if (res.ok) {
        setIsAvatar(true);
      } else {
        setIsAvatar(false);
      }
      return;
    });
  };
  useEffect(() => {
    createProfileImageUrl();
  }, []);

  return (
    <div className="information">
      <div className="information__user">
        <div className="information__user-container">
          <div className="information__me">
            {isAvatar ? (
              <div className="information__image">
                <img
                  src={`http://localhost:3000/api/users/${userId}/avatar`}
                  alt=""
                />
              </div>
            ) : (
              <div className="information__me--name">
                <span> {firstLatter}</span>
                <span>{lastLatter}</span>
              </div>
            )}
          </div>
          <UploadForm isAvatar={isAvatar} />
        </div>
        <div className="information__name">{fullName}</div>
        <div className="information__email">{email}</div>
      </div>

      <CustomButton
        type="submit"
        form="upload-form"
        value="Upload Image"
        name="submit"
        isUpload="isUpload"
      >
        Upload
      </CustomButton>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  profile: state.user.profile,
});

export default connect(mapStateToProps)(Me);
