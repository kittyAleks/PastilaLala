import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import {useDispatch} from 'react-redux';

import {MainProductList} from './components/MainProductList';
// import { NativeBaseProvider } from "native-base/src/core/NativeBaseProvider";
import {getProducts} from '../store/actions';
import {get_language} from '../config/storage';
import {Loader} from '../config/Loader/Loader';

const MAIN_URL_IOS = 'http://localhost'; // TODO: move to config
const MAIN_URL_ANDROID = 'http://10.0.2.2';
// const URL = Platform === "IOS" ? MAIN_URL_IOS : MAIN_URL_ANDROID;

interface IItem {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly weight: number;
}

interface Props {
  navigation: Object;
}
type TResponse = {
  id: number;
  name: string;
  price: number;
  weight: number;
};

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  console.log('WWWnavigation', navigation);
  // const products = useSelector(state => state.products);
  let products = [
    {id: 1, name: 'Apple', price: 30, weight: 20},
    {id: 2, name: 'Apple2', price: 140, weight: 120},
    {id: 3, name: 'Apple3', price: 130, weight: 35},
    {id: 4, name: 'Apple4', price: 30, weight: 20},
    {id: 5, name: 'Apple5', price: 140, weight: 120},
    {id: 6, name: 'Apple6', price: 130, weight: 35},
  ];

  const [categories, setCategories] = useState<TResponse[]>([]);
  const [language, setLanguage] = useState('uk');

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
    axios
      .post(MAIN_URL_ANDROID + '/pastille', {
        language: language,
      })
      .then((res): void => {
        const data = res.data;
        console.log('WWWdata', data);
        dispatch(getProducts(data));
        if (data.length > 0) {
          setTimeout(() => {
            setLoader(false);
          }, 1000);
        }
        setCategories(data);
      })
      .catch(error => error);
  }, [dispatch, language]);

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
      {loader && categories.length ? (
        <Loader loader={loader} />
      ) : (
        <FlatList
          data={products}
          // data={t('home.data', { returnObjects: true })}
          keyExtractor={item => item.id}
          renderItem={({item}) => <MainProductList item={item} />}
        />
      )}
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
