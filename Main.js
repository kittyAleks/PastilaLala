import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
// import messaging from '@react-native-firebase/messaging';

import { get_notific_token, get_token, save_notific_token } from "./src/config/storage";
import {AuthStack} from "./src/navigation/AuthStack";
import {TYPE_SCREEN} from "./src/store/constans";
import {RootStack} from "./src/navigation/RootStack";
import {changeLanguage} from "i18next";
import { createChannel, notificationListener, requestUserPermission } from "./src/config/notification";

export const Main = () => {
  const _default = useSelector((state) => state.type_screen);
  const [typeScreen, setTypeScreen] = useState('login')

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
        {typeScreen !== 'login' ?
          <RootStack/>:
          <AuthStack/>
        }
      </NavigationContainer>
    </>
  )
}
