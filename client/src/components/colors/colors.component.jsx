import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./colors.styles.scss";

const Colors = ({ handleChange, colorsLeft }) => {
  const [background, setBackground] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnClick = (e, index) => {
    setBackground(e.currentTarget.style.background);
    setActiveIndex(index);
    console.log(index);
  };

  useEffect(() => {
    handleChange({ target: { name: "background", value: background } });
  }, [background]);

  const colors = [
    "none",
    "#F3C789",
    "#F389EF",
    "#F39789",
    "#89DDF3",
    "#898DF3",
  ];

  return (
    <div
      className="color"
      style={{
        left: colorsLeft,
      }}
    >
      <ul className="color__list">
        {colors.map((color, i) => (
          <li
            id={`color-${i}`}
            key={i}
            className={`color__item ${color === "none" ? "boarder" : ""} ${
              activeIndex === i ? "active" : ""
            }`}
            style={{
              background: color,
            }}
            onClick={(e) => {
              handleOnClick(e, i);
            }}
          >
            {color === "none" ? (
              <FontAwesomeIcon className="color__icon" icon={faTimes} />
            ) : null}
          </li>
        ))}
        {/* <li
          className="color__item"
          style={{
            background: "#F3C789",
          }}
          onClick={handleOnClick}
        ></li>
        <li
          className="color__item"
          style={{
            background: "#89A2F3",
          }}
          onClick={handleOnClick}
        ></li>
        <li
          className="color__item"
          style={{
            background: "#F389EF",
          }}
          onClick={handleOnClick}
        ></li>
        <li
          className="color__item"
          style={{
            background: "#F39789",
          }}
          onClick={handleOnClick}
        ></li>
        <li
          className="color__item"
          style={{
            background: "#89DDF3",
          }}
          onClick={handleOnClick}
        ></li>
        <li
          className="color__item"
          style={{
            background: "#898DF3",
          }}
          onClick={handleOnClick}
        ></li> */}
      </ul>
    </div>
  );
};
export default Colors;
