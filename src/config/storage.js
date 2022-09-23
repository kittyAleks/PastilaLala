import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const set_token = async (token) => {
  await AsyncStorage.setItem("token", JSON.stringify(token));
};

export const get_token = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};
export const remove_token = async () => {
  await AsyncStorage.removeItem("token");
};
export const save_language = async (lang) => {
  await AsyncStorage.setItem("language", JSON.stringify(lang));
};
export const get_language = async () => {
  const language = await AsyncStorage.getItem("language");
  return JSON.parse(language);
};
export const save_notific_token = async (token) => {
  await AsyncStorage.setItem("notification_token", JSON.stringify(token));
};
export const get_notific_token = async () => {
  const notific_token = await AsyncStorage.getItem("notification_token");
  return JSON.parse(notific_token);
};
export const remove_notific_token = async () => {
  await AsyncStorage.removeItem("notification_token");
};

// export const getToken = () => {
//   return AsyncStorage.getItem('access_token');
// };
// export const logOut = () => {
//   AsyncStorage.removeItem("@save_nickname");
// };



