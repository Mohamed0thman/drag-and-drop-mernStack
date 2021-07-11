import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./photos.styles.scss";

const PhotoBg = ({ handleChange, photosLeft }) => {
  const [background, setBackground] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnClick = (e, i) => {
    console.log(e.currentTarget.id);
    setBackground(e.currentTarget.id);
    setActiveIndex(i);
  };

  useEffect(() => {
    handleChange({ target: { name: "background", value: background } });
  }, [background]);

  const photos = [
    "none",
    "url(/image/image-1-small.png)",
    "url(/image/image-2-small.png)",
    "url(/image/image-3-small.png)",
    "url(/image/image-4-small.png)",
    "url(/image/image-5-small.png)",
  ];
  return (
    <div
      className="photos"
      style={{
        left: photosLeft,
      }}
    >
      <ul className="photos__list">
        {photos.map((photo, i) => (
          <li
            key={i}
            className={`photos__item   ${photo === "none" ? "boarder" : ""} ${
              activeIndex === i ? "active" : ""
            }`}
            style={{
              backgroundImage: photo,
            }}
            id={`image-${i}`}
            onClick={(e) => handleOnClick(e, i)}
          >
            {photo === "none" ? (
              <FontAwesomeIcon className="photos__icon" icon={faTimes} />
            ) : null}
          </li>
        ))}

        {/* <li
          className="photos__item"
          style={{
            backgroundImage: `url(/image/image-1-small.png)`,
          }}
          id="image-1"
          onClick={handleOnClick}
        ></li>{" "}
        <li
          className="photos__item"
          style={{
            backgroundImage: `url(/image/image-2-small.png)`,
          }}
          id="image-2"
          onClick={handleOnClick}
        ></li>
        <li
          className="photos__item"
          style={{
            backgroundImage: `url(/image/image-3-small.png)`,
          }}
          id="image-3"
          onClick={handleOnClick}
        ></li>
        <li
          className="photos__item"
          style={{
            backgroundImage: `url(/image/image-4-small.png)`,
          }}
          id="image-4"
          onClick={handleOnClick}
        ></li>{" "}
        <li
          className="photos__item"
          style={{
            backgroundImage: `url(/image/image-5-small.png)`,
          }}
          id="image-5"
          onClick={handleOnClick}
        ></li>{" "}
        <li
          className="photos__item"
          style={{
            backgroundImage: `url(/image/image-6-small.png)`,
          }}
          id="image-6"
          onClick={handleOnClick}
        ></li> */}
      </ul>
    </div>
  );
};
export default PhotoBg;
