import React, { useState } from "react";
import { connect } from "react-redux";

import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { uploadAvatar, deleteAvatar } from "../../redux/user/user-action";

import "./upload-form.styles.scss";

const UploadForm = ({ isAvatar, uploadAvatar, deleteAvatar }) => {
  const [avatar, setAvatar] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);
    uploadAvatar(
      formData,
      () => toast.success("avatar create"),
      (message) => toast.error(`Error: ${message}`)
    );
  };
  const handleChange = (e) => {
    setAvatar(e.target.files[0]);
  };
  const handleOnClick = () => {
    deleteAvatar();
  };
  return (
    <div className="information__upload-container">
      {isAvatar ? (
        <div className="information__delete">
          <FontAwesomeIcon
            className="information__delete--icon"
            icon={faTrashAlt}
            onClick={handleOnClick}
          />
        </div>
      ) : (
        <form
          id="upload-form"
          className="information__upload-form"
          onSubmit={handleSubmit}
        >
          <label className="information__label" htmlFor="avatar">
            <FontAwesomeIcon className="information__icon" icon={faCamera} />
          </label>
          <input
            className="information__input"
            type="file"
            name="avatar"
            id="avatar"
            onChange={handleChange}
          />
        </form>
      )}
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  uploadAvatar: (avatar, onSuccess, onError) =>
    dispatch(uploadAvatar(avatar, onSuccess, onError)),
  deleteAvatar: () => dispatch(deleteAvatar()),
});
export default connect(null, mapDispatchToProps)(UploadForm);
