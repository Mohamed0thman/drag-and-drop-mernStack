import React from "react";

import "./home-page.styles.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-page__image">
        <img src="/image/home-page-image.png" alt="" />
      </div>
      <div className="home-page__welcome">
        welcome to our Project Management Website
      </div>
      <div className="home-page__message">
        <div className="home-page__message--title">
          Let's get you started in the meantime.
        </div>
        <p className="home-page__message--text">
          You can experiment by creating boards. If you'd like to create a
          project, first create a team, or wait for approval to join one.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
