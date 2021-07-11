import React, { useRef } from "react";

import "./form-input.styles.scss";

const FormInput = ({ label, disappeared, unactive, ...otherProps }) => {
  const input = useRef(null);

  return (
    <div className="group">
      {label ? <label className="form-label">{label}</label> : null}
      <input
        ref={input}
        className={`form-input  ${disappeared ? "disappeared" : ""}
        ${unactive ? "unactive" : ""}
        `}
        {...otherProps}
      />
    </div>
  );
};

export default FormInput;
