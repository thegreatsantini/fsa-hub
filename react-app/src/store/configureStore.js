import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import createHistory from "history/createBrowserHistory";
import userReducer from "../reducers/user";
import authFormReducer from "../reducers/authForm";
import authReducer from "../reducers/auth";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools";

export const history = createHistory();

const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === "function") {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const combinedReducers = combineReducers({
    user: userReducer,
    auth: authReducer,
    authForm: authFormReducer
});

const store = createStore(
    connectRouter(history)(combinedReducers),
    composedEnhancers
);

export default store;
