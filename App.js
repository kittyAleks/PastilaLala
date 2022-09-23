/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from "react";
import { Provider, useSelector } from "react-redux";
import firebase from "@react-native-firebase/app";
// import { I18nextProvider } from "react-i18next";
// import i18n from "react-i18next";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/store/configureStore";
import { Main } from "./Main";
import { firebaseConfig } from "./src/config/firebaseSettings";

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    // <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    // </I18nextProvider>
  );
}
