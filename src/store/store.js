import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers/rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({ collapsed: true });

const middlewares = [thunk];
if (import.meta.env.DEV) middlewares.push(logger);

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export default store;
