import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer/rootReducer";
const appReducers = combineReducers(reducer);
const store = createStore(appReducers, composeWithDevTools(applyMiddleware(thunk)));
export default store;
