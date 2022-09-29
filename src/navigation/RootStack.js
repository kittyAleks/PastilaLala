import React, {useEffect, useLayoutEffect, useState} from "react";
import {HeaderButtons} from "react-navigation-header-buttons";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import {HomeScreen} from "../screens/HomeScreen";
import {SettingsScreen} from "../screens/SettingsScreen";
import {CartScreen} from "../screens/CartScreen";
import {SplashScreen} from "../screens/SplashScreen";
import {SignInScreen} from "../screens/SignInScreen";
import {SignUpScreen} from "../screens/SignUpScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {mainColors} from "../assets/colors";
import {BasketScreen} from "../screens/BasketScreen";
import {useDispatch, useSelector} from "react-redux";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import flag_en from "../assets/flag_en.png";
import flag_ukraine from "../assets/flag_ukraine.png";
import {useTranslation} from "react-i18next";
import i18next, {changeLanguage} from "i18next";
import {get_language, save_language} from "../config/storage";

const defaultOptions = {
  headerStyle: {
    backgroundColor: "#ec5e4e",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    elevation: 5,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
// const optionsMainScreenHeader = {
//   headerTitle: "HHHHHHH",
//   headerRight: ({navigation}) => {
//     return <HeaderButtons>
//       <Ionicons onPress={() => alert("Hello")} name="chevron-back" color="white" size={25} />
//     </HeaderButtons>
//   },
// };

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator>
      {/*<Stack.Screen options={{*/}
      {/*  ...defaultOptions,*/}
      {/*}}*/}
      {/*  name="SignUpScreen"*/}
      {/*  component={SignUpScreen} />*/}

      <Stack.Screen
        name="Home"
        component={AllTabNavigation}
        options={{
          headerTitle: "",
          headerShown: false,
          ...defaultOptions,
          // headerBackground: () => <LinearGradient colors={['#F27527', '#F69493']} style={{height: '100%'}}/>,
          headerLeft: () => {
            return <HeaderButtons>
              <Ionicons name="chevron-back" color="white" size={25}/>
            </HeaderButtons>
          },
          headerR: () => {
            return <HeaderButtons>
              <Ionicons name="chevron-back" color="white" size={25}/>
            </HeaderButtons>
          },
        }}
      />

      <Stack.Screen options={{
        ...defaultOptions,
      }}
                    name="FoodMarket"
                    component={SplashScreen}/>

      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerTitle: "",
          ...defaultOptions,
        }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}

        options={{
          headerTitle: "",
          ...defaultOptions,
          // headerLeft: () => <HeaderButtons>
          //   <Ionicons onPress={() => navigation.navigate('SplashScreen')} name='chevron-back' color='white'
          // size={25} /> </HeaderButtons>
        }}
      />


      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
          headerTitle: "",
          ...defaultOptions,
          // headerBackground: () => <LinearGradient colors={['#F27527', '#F69493']} style={{height: '100%'}}/>,
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const AllTabNavigation = () => {
  const {t} = useTranslation()
  const productsCart = useSelector(state => state.cart);
  const [product, setProduct] = useState([]);
  const [language, setLanguage] = useState('uk');
  useEffect(() => {
    if (productsCart.length !== null) {
      return setProduct(productsCart.length);
    }
  });
  useEffect(() => {
    i18next.changeLanguage(language)
    save_language(language)
  }, [language])

  useLayoutEffect(() => {
    (async () => {
      const currentLang = await get_language();
      console.log("WWcurrentLang", currentLang);
      // changeLanguage(currentLang);
    })();
  }, [])

  return <BottomTab.Navigator
    barStyle={{
      backgroundColor: "white",
    }}
    screenOptions={{
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "tomato",
      tabBarShowLabel: true,
      tabBarStyle: {
        height: 78,
        backgroundColor: 'white',
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 8,
      }
    }}>
    <BottomTab.Screen
      name={t('bottomTab.buttonBottomMenu')}
      component={HomeScreen}
      options={{
        headerStyle: {backgroundColor: '#ec5e4e'},
        headerShown: true,
        // headerTitle: t('headerTitleMyShop'),
        tabBarIcon: ({color, size}) => (
          <Ionicons name="ios-home" color={mainColors.buttonBasket} size={30}/>
        ),
        headerRight: () => {
          return <HeaderButtons>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => {
                setLanguage('en')
                // i18next.changeLanguage(language)
                // changeLang('en')
              }} style={{marginRight: 10}}>
                <Image source={flag_en} style={styles.flag_img}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setLanguage('uk')
                // i18next.changeLanguage(language)
              }} style={{marginRight: 5}}>
                <Image source={flag_ukraine} style={styles.flag_img}/>
              </TouchableOpacity>
            </View>
            {/*<Ionicons name="chevron-back" color="red" size={25} />*/}
            {/*<Ionicons name="chevron-back" color="red" size={25} />*/}
          </HeaderButtons>
        },

      }}
    />
    <BottomTab.Screen
      options={{
        headerShown: true,
        tabBarIcon: ({color, size}) => (
          <Ionicons name="settings" color={mainColors.buttonBasket} size={30}/>
        ),
      }}
      name={t('bottomTab.buttonBottomSetting')}
ъ      component={SettingsScreen}/>
    <BottomTab.Screen
      options={{
        tabBarBadge: !product ? null : product,
        ...defaultOptions,
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <MaterialIcons name="shopping-basket" color={mainColors.buttonBasket} size={30}/>
        ),
      }}
      name={t("bottomTab.buttonBottomBasket")}
      component={BasketScreen}/>
  </BottomTab.Navigator>;
};

const styles = StyleSheet.create({
  flag_img: {
    width: 25,
    height: 15,
    borderRadius: 3
  },
})
