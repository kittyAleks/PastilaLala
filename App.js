import React, { useEffect, FC } from "react";
import { Provider, useSelector } from "react-redux";
import firebase from "@react-native-firebase/app";
// import { I18nextProvider } from "react-i18next";
// import i18n from "react-i18next";
import { PersistGate } from "redux-persist/integration/react";
import SplashScreen from "react-native-splash-screen";
import store, { persistor } from "./src/store/configureStore";
import { Main } from "./Main";

export default function App () {
  useEffect(() => {
    SplashScreen.hide()
  })
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
