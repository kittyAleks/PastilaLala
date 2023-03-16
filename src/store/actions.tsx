import {
  ADD_PRODUCT_TO_CART,
  GET_ALL_PRODUCTS,
  REMOVE_PRODUCT,
  TYPE_SCREEN,
} from './constans';
import {TProps} from '../screens/components/MainProductList';

type TPayload = {
  id: number;
  name: string;
  price: number;
  weight: number;
};

interface TObject {
  type: string;
  payload: TPayload;
}
interface IProducts {
  type: string;
  allProducts: TPayload;
}

export const saveSignUpTypeScreen = () => {
  return {
    type: TYPE_SCREEN,
    payload: 'signup',
  };
};

export const getProducts = (products: TProps): IProducts => {
  console.log('QWQWQW_products', products);
  return {
    type: GET_ALL_PRODUCTS,
    allProducts: products,
  };
};

export const addToCart = (item: TProps): TObject => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: item,
  };
};

export const removeProduct = (item: TProps): TObject => ({
  type: REMOVE_PRODUCT,
  payload: item,
});
