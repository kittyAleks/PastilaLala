import React, { useEffect, useLayoutEffect, useState, useTransition } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";
import { Button } from "react-native-elements";
import { HeaderButtons } from "react-navigation-header-buttons";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import {useDispatch} from "react-redux";
import {saveSignUpTypeScreen} from "../store/actions";
import { platforms } from "react-native/react-native.config";
import { useTranslation } from "react-i18next";

const MAIN_URL_IOS = 'http://localhost'; // TODO: move to config
// const MAIN_URL_ANDROID = 'http://10.0.2.2';
// const URL = Platform === 'IOS' ? MAIN_URL_IOS : MAIN_URL_ANDROID

export const SignUpScreen = ({ navigation }) => {
  const {t} = useTranslation()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderButtons>
        <Ionicons onPress={() => navigation.navigate("Home")} name="chevron-back" color="white" size={25} />
      </HeaderButtons>,
    });
  }, []);
  const dispatch = useDispatch()
  const [dataForm, setDataForm] = useState({
    nickName: "",
    email: "",
    password: "",
  });

  const onChangeNickname = (val) => {
    console.log("VAL", val);
    setDataForm((preState) => ({
      ...preState,
      nickName: val,
    }));
  };
  const onChangeEmail = (val) => {
    console.log("VAL", val);
    setDataForm((preState) => ({
      ...preState,
      email: val,
    }));
  };
  const onChangePassword = (val) => {
    console.log("VAL", val);
    setDataForm((preState) => ({
      ...preState,
      password: val,
    }));
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(MAIN_URL_IOS + '/signup', {
        nickname: dataForm.nickName,
        email: dataForm.email,
        password: dataForm.password,
      });
      console.log('EEEhandleSignUpres', res)
      dispatch(saveSignUpTypeScreen())
      if(res.status === 200) {
        navigation.navigate('SignIn')
      }
    } catch (e) {
      console.log('[SERVER ERROR]', e);
    }
  };

  return (
    <KeyboardAvoidingView style={{
      flex: 1,
    }}>
      <ScrollView style={styles.mainTextStyle}>
        <View
          style={styles.center}
        >
          <Text style={styles.title}>{t("loginRegScreen.welcomeBack")}</Text>
          <Text style={{ ...styles.title, ...styles.info }}>
            {t("loginRegScreen.createAccount")}
          </Text>
        </View>

        <TextInput
          style={styles.input}
          onChangeText={onChangeNickname}
          value={dataForm.nickName}
          placeholder={t("loginRegScreen.nickName")}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={dataForm.email}
          placeholder={t("loginRegScreen.email")}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={dataForm.password}
          placeholder={t("loginRegScreen.password")}
          keyboardType="numeric"
        />
        <Button
          title={t("loginRegButton.signUp")}
          onPress={handleSignUp}
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
    // opacity: 1,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonSignUp: {
    backgroundColor: "white",
  },
  titleSignUp: {
    color: "#ec5e4e",
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
