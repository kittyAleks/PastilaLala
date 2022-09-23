import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Text, Image,
} from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import splash_img from "../assets/splash_img.png";

export const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    getNickname();
  }, []);

  const getNickname = () => {
    AsyncStorage.getItem("@save_nickname")
      .then(nick => {
        if (nick !== null) {
          navigation.navigate("Home");
        }
      }).catch(e => e.message);
  };

  return (
    <View style={styles.containerStyle}>
      {/*<ImageBackground*/}
      {/*  style={{ flex: 1, width: '100%', height: 1000}}*/}
      {/*  resizeMode='cover'*/}
      {/*  source={require('../img/main_image.jpg')}*/}
      {/*  blurRadius={2}>*/}
      {/*</ImageBackground>*/}
      <ScrollView style={styles.buttonGroupStyle}>
        <View style={styles.centerLogoText}>
          <Text style={styles.title}>Welcome</Text>
          <View>
            <Image source={splash_img} style={{width: 80, height: 80, }}/>
          </View>

        </View>
        <Button
          title="LOGIN"
          onPress={() => navigation.navigate("SignIn")}
          buttonStyle={{ ...styles.button, ...styles.buttonSignIn }}
          titleStyle={styles.titleSignIn}
        />
        <Button
          title="SIGN UP"
          onPress={() => navigation.navigate("SignUp")}
          buttonStyle={{ ...styles.button, ...styles.buttonSignUp }}
          titleStyle={styles.titleSignUp}
        />


          {/*<LoginButton*/}
          {/*  onPress={() => alert('JJJJJJ')}*/}
          {/*  onLoginFinished={*/}
          {/*    (error, result) => {*/}
          {/*      if (result.error) {*/}
          {/*        console.log("RRRlogin_has_error: " + error);*/}
          {/*      } else if (result.isCancelled) {*/}
          {/*        console.log("RRRlogin is cancelled.");*/}
          {/*      } else {*/}
          {/*        console.log("RRRlogin sucsess");*/}
          {/*        // AccessToken.getCurrentAccessToken().then(*/}
          {/*        //   (data) => {*/}
          {/*        //     console.log(data.accessToken.toString());*/}
          {/*        //   },*/}
          {/*        // );*/}
          {/*      }*/}
          {/*    }*/}
          {/*  }*/}
          {/*  onLogoutFinished={() => console.log("logout.")} />*/}


      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#efe8e8",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
    color: "white",
  },
  buttonGroupStyle: {
    flexDirection: "column",
    paddingHorizontal: 30,
    textAlign: "center",
    paddingVertical: 200,
  },
  inputStyle: {
    paddingLeft: 20,
    marginTop: 15,
    borderRadius: 10,
    height: 50,
    width: "100%",
    backgroundColor: "white",
    // opacity: 0.7
  },
  button: {
    marginLeft: 5,
    marginTop: 20,
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
  buttonSignIn: {
    backgroundColor: "#ec5e4e",
  },

  titleSignIn: {
    color: "white",
  },
  titleSignUp: {
    color: "#ec5e4e",
  },
  title: {
    fontSize: 35,
    color: "#423e3e",
    textAlign: "center",
    paddingVertical: 10,
  },
  centerLogoText: {
    paddingTop: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    fontSize: 20,
    marginHorizontal: 20,
    margin: 20,
  },

});
