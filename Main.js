import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
// import messaging from '@react-native-firebase/messaging';
import { StripeProvider } from '@stripe/stripe-react-native';
import { get_token } from "./src/config/storage";
import {AuthStack} from "./src/navigation/AuthStack";
import {TYPE_SCREEN} from "./src/store/constans";
import {RootStack} from "./src/navigation/RootStack";
import {changeLanguage} from "i18next";
import { createChannel, notificationListener, requestUserPermission } from "./src/config/notification";
import messaging from "@react-native-firebase/messaging";

export const Main = () => {
  const _default = useSelector((state) => state.type_screen);
  const [typeScreen, setTypeScreen] = useState('login');
  const [publishableKey, setPublishableKey] = useState('');


  const dispatch = useDispatch();
  useEffect(() => {
    getToken()
    setTypeScreen(_default)
  }, [_default])
  // useEffect(async () => {
  //   const currentLang = await get_language();
  //   console.log("WWcurrentLang", currentLang);
  //   changeLanguage(currentLang);
  // }, [])

  useEffect(() => {
    requestUserPermission();
    notificationListener();
    // messaging().onMessage(getPushData);
    createChannel();
  }, []);

  const getToken = async () => {
    const token = await get_token();
    token
      ? dispatch({
        type: TYPE_SCREEN,
        payload: 'main',
      })
      : dispatch({
        type: TYPE_SCREEN,
        payload: 'login',
      });
  }

  return (
    <>
      <NavigationContainer>
        {/*TODO: replace on typeScreen !== 'login'*/}
        {typeScreen === 'login' ?
        // {typeScreen !== 'login' ?
          <RootStack/>:
          <AuthStack/>
        }
      </NavigationContainer>
    </>
  )
}
