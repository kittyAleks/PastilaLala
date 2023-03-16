import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { HeaderButtons } from "react-navigation-header-buttons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-elements";
import axios from "axios";
import {set_token} from "../config/storage";
import {useDispatch} from "react-redux";
import {TYPE_SCREEN} from "../store/constans";
import { useTranslation } from "react-i18next";

const MAIN_URL_IOS = 'http://localhost'; // TODO: move to config
// const MAIN_URL_ANDROID = 'http://10.0.2.2';
// const URL = Platform === 'IOS' ? MAIN_URL_IOS : MAIN_URL_ANDROID
export const SignInScreen = ({ navigation }) => {
  const {t} = useTranslation()

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderButtons>
        <Ionicons onPress={() => navigation.navigate("Home")} name="chevron-back" color="white" size={25} />
      </HeaderButtons>,
    });
  }, []);

  const dispatch = useDispatch()

  const [data, setData] = useState({
    nickName: null,
    email: null,
    password: null,
  });

  const onChangeNickname = (val) => {
    console.log("VAL", val);
    setData((preState) => ({
      ...preState,
      nickName: val,
    }));
  };
  const onChangeEmail = (val) => {
    console.log("VAL", val);
    setData((preState) => ({
      ...preState,
      email: val,
    }));
  };
  const onChangePassword = (val) => {
    console.log("VAL", val);
    setData((preState) => ({
      ...preState,
      password: val,
    }));
  };

  // useEffect(() => {
  //   getNickname();
  // }, []);

  const handleSignIn = () => {
    console.log('handleSignIn')

    axios.post(URL + "/signin", {
      nickname: data.nickName,
      email: data.email,
      password: data.password,
    }).then(result => {
      console.log('EEEresult_data', result.data)
      const {accessToken} = result.data
      set_token(accessToken)
      dispatch({
        type: TYPE_SCREEN,
        payload: "main",
      })
      navigation.navigate('Home')
      console.log('EEEaccessToken', accessToken)

      // const { email, password, nickname } = result.data.passResult;
      // if (!email || (email && email.trim().length === '')) {
      //   console.log('Поле не может быть пустым')
      // } else {
      //   set_token(nickname, email, password)
      //     // .then(() => navigation.navigate("Home"));
      // }

    }).catch(error => {
      error.message;
    });
  };
  //
  // const getNickname = () => {
  //   AsyncStorage.getItem("@save_nickname")
  //     .then (nick => {
  //       if (nick !== null) {
  //         navigation.navigate("Home");
  //       }
  //     }).catch(e => e.message);
  // };

  return (
    <KeyboardAvoidingView style={{
      flex: 1,
    }}>
      <ScrollView style={styles.mainTextStyle}>
        <View style={styles.center}>
          <Text style={styles.title}>{t("loginRegScreen.welcomeBack")}</Text>
          <Text style={{ ...styles.title, ...styles.info }}>
            {t("loginRegScreen.loginText")}
          </Text>
        </View>

        <TextInput
          style={styles.input}
          onChangeText={onChangeNickname}
          value={data.nickName}
          placeholder={t("loginRegScreen.nickName")}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={data.email}
          placeholder={t("loginRegScreen.email")}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={data.password}
          placeholder={t("loginRegScreen.password")}
          keyboardType="numeric"
        />
        <Button
          title={t("loginRegButton.login")}
          onPress={() => navigation.navigate('TestScreen')}
          // onPress={handleSignIn}
          buttonStyle={{ ...styles.button, ...styles.buttonSignUp }}
          titleStyle={styles.titleSignUp}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainTextStyle: {
    backgroundColor: "#efe8e8",
    flexDirection: "column",
    paddingHorizontal: 30,
    textAlign: "center",
    paddingVertical: 150,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(117,117,117,0.56)",
    padding: 10,
  },

  button: {
    marginTop: 30,
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
    opacity: 1,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonSignUp: {
    backgroundColor: "#ec5e4e",
  },
  titleSignUp: {
    color: "white",
  },
  title: {
    fontSize: 35,
    color: "#423e3e",
    textAlign: "center",
  },
  center: {
    paddingTop: 3,
  },
  info: {
    fontSize: 20,
    marginHorizontal: 20,
    margin: 20,
  },
});
