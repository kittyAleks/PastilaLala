import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, Text, FlatList, SafeAreaView, Platform } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { MainProductList } from "./components/MainProductList";
// import { NativeBaseProvider } from "native-base/src/core/NativeBaseProvider";
import { getProducts } from "../store/actions";
import { useTranslation } from "react-i18next";
import { get_language } from "../config/storage";
import { Loader } from "../config/Loader/Loader";

const MAIN_URL_IOS = "http://10.0.2.2"; // TODO: move to config
const MAIN_URL_ANDROID = "http://10.0.2.2";
const URL = Platform === "IOS" ? MAIN_URL_IOS : MAIN_URL_ANDROID;

export const HomeScreen = ({ navigation }) => {
  const products = useSelector(state => state.products);

  const [categories, setCategories] = useState([]);
  const [language, setLanguage] = useState("uk");
  console.log('EEElanguage', language)
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDataLang = async () => {
      const currentLang = await get_language();
      setLanguage(currentLang);
    };
    fetchDataLang();
  }, []);

  useEffect(() => {
    setLoader(true);
    axios.post(URL + "/pastille", {
      language: language,
    })
      .then(res => {
        const data = res.data;
        console.log("WWWdata", data);
        dispatch(getProducts(data));
        if (data.length > 0) {
          setTimeout(() => {
            setLoader(false);
          }, 1000);
        }
        setCategories(products);
      }).catch(error => error);
  }, [language]);

  // const getNickname = () => {
  //   AsyncStorage.getItem(STORAGE_KEY)
  //     .then(nick => {
  //       if (nick !== null) {
  //         setNickname(nick);
  //         navigation.navigate("Home");
  //       }
  //     }).catch(e => e.message);
  // };

  return (
    // <NativeBaseProvider>
    <SafeAreaView style={styles.container}>
      {loader ? <Loader loader={loader} /> :
        <FlatList
          data={products}
          // data={t('home.data', { returnObjects: true })}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <MainProductList item={item} />;
          }}
        />}
    </SafeAreaView>
    // </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
});
