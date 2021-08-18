import {applyMiddleware, createStore, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import reducers from "../Reducers";
import {createLogger} from "redux-logger";
import promise from "./promise";
import array from "./array";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
export const storeObj = {};
const persistConfig = {
  key: "root",
  storage,
  whitelist:['billspls','indone','user'],
};
export default function setup() {

  const logger = createLogger();
  let middleWareArray = [thunk, promise, array];
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    middleWareArray.push(logger);
  }
  const middleware = [applyMiddleware(...middleWareArray)];
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // middleware.push(
    //   applyMiddleware(require("redux-immutable-state-invariant").default()),
    // );
  }
  const reducer = combineReducers(reducers);
  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, {}, compose(...middleware));
  if (global.isDebuggingInChrome) {
    window.store = store;
  }
  const persistor = persistStore(store, null, () => {

  });
  storeObj.store = store;
  console.log(storeObj)
  return {persistor, store};
}