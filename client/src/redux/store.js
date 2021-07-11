import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";
import { apiMiddleware } from "./middlewares";

const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}
const compseEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  compseEnhacers(applyMiddleware(...middleware, apiMiddleware))
);
export default { store };
