import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { View, StyleSheet, Text, Platform, TouchableOpacity, Image, Button } from "react-native";
import { mainColors } from "../../assets/colors";
import { addToCart, removeProduct } from "../../store/actions";
import Entypo from "react-native-vector-icons/Entypo";
import {useTranslation} from "react-i18next";

export const CartProductList = ({ item, totalAmount }) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const deleteProduct = () => {
    dispatch(removeProduct(item))
  };

  return (
    <View style={styles.mainContainer} key={item.id}>
      <TouchableOpacity style={styles.rowContainer}>
        <Image style={styles.imageContainer}
               source={{ uri: "https://www.recept.ua/files/uploads/rec_img/pastila-v-suschilke.jpg" }} />
        <View style={styles.textContainer}>
          <Text style={{ fontWeight: "600" }}>{item.name}</Text>
          <Text style={{ color: mainColors.price, fontWeight: "600" }}>{item.price} {t('currency')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Entypo onPress={deleteProduct} name="circle-with-cross" style={{paddingHorizontal: 20}}
                  color="#ec5e4e" size={20} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
    marginTop: 10,
    // paddingTop: 10,
    paddingHorizontal: 10,
  },
  rowContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: 160,
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  priceContainer: {

  },
  imageContainer: {
    height: 80,
    width: 80,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
  },

  titleBasket: {
    color: "white",
    fontSize: 13,
  },
});
