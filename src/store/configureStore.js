import { applyMiddleware, createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const myPersistReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(myPersistReducer, applyMiddleware(logger));

export const persistor = persistStore(store);
export default store;
