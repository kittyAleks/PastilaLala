import React, { useLayoutEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { HeaderButtons } from "react-navigation-header-buttons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useDispatch} from "react-redux";
import {TYPE_SCREEN} from "../store/constans";
import {remove_token} from "../config/storage";

export const SettingsScreen = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderButtons>
        <Ionicons onPress={() => navigation.navigate("Food market")} name="chevron-back" color="white" size={25} />
      </HeaderButtons>,
    });
  }, []);

  const dispatch = useDispatch()

  const userLogOut = () => {
    dispatch({
      type: TYPE_SCREEN,
      payload: "login",
    });
    navigation.navigate('SignIn')
    remove_token()
  };

  return (
    <View style={{paddingVertical: 100, alignItems: 'center'}}>
      <Button
        title="Log Out"
        onPress={userLogOut}
        buttonStyle={{ ...styles.button, ...styles.buttonLogOut }}
        titleStyle={styles.titleLogOut}
      />

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  button: {
    marginTop: 30,
    paddingHorizontal: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
    opacity: 1,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonLogOut: {
    backgroundColor: "#ff9c9b",
  },
  titleLogOut: {
    color: "white",
  },
});

