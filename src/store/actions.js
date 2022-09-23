import {ADD_PRODUCT_TO_CART, GET_ALL_PRODUCTS, REMOVE_PRODUCT, TYPE_SCREEN} from "./constans";

export const saveSignUpTypeScreen = () => {
  return({
    type: TYPE_SCREEN,
    payload: 'signup'
  })
}


export const getProducts = (products) => {
  console.log("QWQWQW_products", products);
  return ({
    type: GET_ALL_PRODUCTS,
    allProducts: products,
  });
};

export const addToCart = (item) => {
  console.log("ITEI", item);
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: item,
  };
};

export const removeProduct = (item) => ({
  type: REMOVE_PRODUCT,
  payload: item
})
