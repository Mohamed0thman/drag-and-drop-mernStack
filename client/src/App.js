import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import HomePage from "./pages/home-page/home-page";
import BoardsPage from "./pages/boards-page/boards-page";
import TeamsPage from "./pages/teams-page/teams-page.jsx";
import AccountPage from "./pages/account/account";

import CreateBoard from "./components/create-board/create-board.component";
import CreateTeamPopup from "./components/create-team-popup/create-team-popup.component";

import Spinner from "./components/spinner/spinner.component";

import { toggleCreateBoardPopup } from "./redux/board/board-action";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";

function App({
  user,
  createTeamPopup,
  createBoardPopup,
  toggleCreateBoardPopup,
  dragedList,
}) {
  
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        transition={Slide}
      />
      <Spinner />
      {!user.currentUser.isLoggedIn ? (
        <Switch>
          <Route exact path="/" component={SignInAndSignUp} />
          <Redirect to="/" />
        </Switch>
      ) : (
        <div className="app__container">
          <Header />
          <div className="app__main">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/board" component={BoardsPage} />
              <Route exact path="/team" component={TeamsPage} />
              <Route path="/account" component={AccountPage} />
            </Switch>
            {createTeamPopup ? <CreateTeamPopup /> : ""}
            {createBoardPopup ? (
              <CreateBoard toggleCreateBoardPopup={toggleCreateBoardPopup} />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  createTeamPopup: state.teams.popup,
  createBoardPopup: state.board.popup,
  dragedList: state.list.dragedList,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCreateBoardPopup: () => dispatch(toggleCreateBoardPopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
