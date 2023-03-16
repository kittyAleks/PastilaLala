import { applyMiddleware, createStore, compose } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  //__REDUX_DEVTOOLS_EXTENSION__
}

const myPersistReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(myPersistReducer, composeEnhancers(applyMiddleware(logger, thunk)));

export const persistor = persistStore(store);
export default store;
