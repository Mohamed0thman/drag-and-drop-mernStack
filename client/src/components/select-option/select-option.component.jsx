import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import "./select-option.styles.scss";

const SelectOption = ({ handleChange, name }) => {
  const [active, setActive] = useState(false);
  const [option, setOption] = useState("");
  const dorpdown = () => {
    setActive(!active);
  };
  const selectOption = (e) => {
    setOption(e.target.innerHTML);
    setActive(!active);
  };

  useEffect(() => {
    handleChange({
      target: { name: name, value: option },
    });
  }, [option]);
  return (
    <div className="select">
      <div className="select__select-box">
        <div
          className={`select__select-box__option-container ${
            active ? "active" : ""
          }`}
        >
          <div
            className="select__select-box__option-container--option"
            onClick={selectOption}
          >
            education
          </div>
          <div
            className="select__select-box__option-container--option"
            onClick={selectOption}
          >
            business
          </div>
        </div>
        <div className="select__select-box__selected-container">
          <FontAwesomeIcon
            icon={faAngleDown}
            className={`select__select-box__selected-container--arrow ${
              active ? "active" : ""
            } `}
          />
          <div
            className="select__select-box__selected-container--selected"
            onClick={dorpdown}
          >
            {option === "" ? "Choose here" : option}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
