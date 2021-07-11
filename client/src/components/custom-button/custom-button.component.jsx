import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({
  children,
  handleOnClick,
  active,
  isformBtn,
  isToggleBtn,
  isUpload,
  isRequest,
  ...otherProps
}) => {
  return (
    <button
      className={`custom-button ${isUpload} ${isToggleBtn} 
      ${isRequest ? "isRequest" : ""}
      ${isformBtn}  ${active}`}
      onClick={handleOnClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
