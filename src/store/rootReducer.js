import {ADD_PRODUCT_TO_CART, GET_ALL_PRODUCTS, REMOVE_PRODUCT, TYPE_SCREEN} from "./constans";

const initialState = {
  products: [],
  cart: [],
  type_screen: "login",
};
export const rootReducer = (state = initialState, action) => {
  console.log("QQQactionpayload", action.payload);
  console.log("QQQstate", state);
  const {type, allProducts} = action;
  switch (type) {
    case TYPE_SCREEN:
      return {
        ...state,
        type_screen: action.payload
      }
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: allProducts,
      };
    case ADD_PRODUCT_TO_CART: {
      let uniqProduct = state.cart.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        cart: [...uniqProduct, action.payload],
      };
    }
    case REMOVE_PRODUCT: {
      const newItem = state.cart.filter(item => item.id !== action.payload.id)
      return {
        ...state,
        cart: [...newItem]
      }
    }
    default:
      return state;
  }
};
