import { combineReducers } from "redux";

import userReduser from "./user/user-reducer";
import loadingReducer from "./loading/loading-reduce";
import teamsReducer from "./team/team-reducer";
import notificationReducer from "./notification/notification-reducer";
import usersReduser from "./users/users-reduce";
import inviteReducer from "./invite/invite-reduce";
import boardsReducer from "./board/board-reduce";
import listsReducer from "./list-and-card/list-and-card-reducer";

const rootReducer = combineReducers({
  user: userReduser,
  loading: loadingReducer,
  teams: teamsReducer,
  notification: notificationReducer,
  users: usersReduser,
  invite: inviteReducer,
  board: boardsReducer,
  list: listsReducer,
});

export default rootReducer;
