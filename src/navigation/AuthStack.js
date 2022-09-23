import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInScreen } from "../screens/SignInScreen";
import { SignUpScreen } from "../screens/SignUpScreen";
import {SplashScreen} from "../screens/SplashScreen";
import {HeaderButtons} from "react-navigation-header-buttons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {HomeScreen} from "../screens/HomeScreen";

const defaultOptions = {
  headerStyle: {
    backgroundColor: "#ec5e4e",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
const Stack = createNativeStackNavigator();
export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={SplashScreen}
        options={{
          headerShown: false,
          headerTitle: "",
          ...defaultOptions,
          // headerBackground: () => <LinearGradient colors={['#F27527', '#F69493']} style={{height: '100%'}}/>,
          headerLeft: () => {
            return <HeaderButtons>
              <Ionicons name="chevron-back" color="green" size={25} />
            </HeaderButtons>
          },
          // headerRight: () => {
          //   return <HeaderButtons>
          //     <Ionicons name="chevron-back" color="white" size={25} />
          //   </HeaderButtons>
          // },
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}

        options={{
          headerTitle: "",
          ...defaultOptions,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerTitle: "",
          ...defaultOptions,
        }}
      />

    </Stack.Navigator>
  );
};
