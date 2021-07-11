import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Route, Switch } from "react-router-dom";

import Boards from "../../components/boards/boards.component";
import BoardView from "../../components/board-view/board-view.component";

import {
  fetchAllBoards,
  toggleCreateBoardPopup,
} from "../../redux/board/board-action";

import "./boards-page.styles.scss";

const BoardsPage = ({
  match,
  fetchAllBoards,
  boards,
  toggleCreateBoardPopup,
}) => {
  const [boardLoading, setBoardLoading] = useState(true);

  const updateBoardData = async () => {
    setBoardLoading(true);
    await fetchAllBoards();
    setBoardLoading(false);
  };

  useEffect(() => {
    updateBoardData();
  }, [fetchAllBoards]);

  console.log(match);
  return (
    <div className="boards-page">
      <Route
        exact
        path={`${match.path}`}
        render={() => (
          <Boards
            toggleCreateBoardPopup={toggleCreateBoardPopup}
            boards={boards}
          />
        )}
      />
      {!boardLoading ? (
        <Route path={`${match.path}/:boardName`} component={BoardView} />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  boards: state.board.boards,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllBoards: () => dispatch(fetchAllBoards()),
  toggleCreateBoardPopup: () => dispatch(toggleCreateBoardPopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardsPage);
