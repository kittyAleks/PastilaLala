import React from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {mainColors} from '../../assets/colors';
import {Button} from 'react-native-elements';
import {addToCart} from '../../store/actions';

export type TProps = {
  id: number;
  name: string;
  price: number;
  weight: number;
};

export const MainProductList = ({item}: {item: TProps}) => {
  console.log('FFFFitem', item);
  // const productsCart = useSelector(state => state.cart)
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.rowContainer}>
        <Image
          style={styles.imageContainer}
          source={{
            uri: 'https://www.recept.ua/files/uploads/rec_img/pastila-v-suschilke.jpg',
          }}
        />
        <View style={styles.textContainer}>
          <Text style={{fontWeight: '600'}}>
            {item.name ? item.name : 'Название скоро будет'}{' '}
            {`(${item.weight ? item.weight : 'Вес неизвестен '}г)`}
          </Text>
          <Text style={{color: mainColors.price, fontWeight: '600'}}>
            {item.price ? item.price : 'Стоимость уже готовится'}{' '}
            {t('currency')}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={t('addButton')}
            buttonStyle={{...styles.button, ...styles.buttonBasket}}
            titleStyle={styles.titleBasket}
            onPress={handleAddToCart}
          />
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
    flexDirection: 'row',
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: 160,
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  imageContainer: {
    height: 80,
    width: 80,
  },
  buttonContainer: {
    justifyContent: 'center',
    marginRight: 40,
    width: 105,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonBasket: {
    backgroundColor: mainColors.buttonBasket,
  },
  titleBasket: {
    color: 'white',
    fontSize: 13,
  },
});
