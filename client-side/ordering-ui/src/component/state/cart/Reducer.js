// reducers/cartReducer.js
import { LOGOUT } from "../authentication/ActionType";
import * as actionTypes from "./ActionType";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FIND_CART_REQUEST:
    case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
    case actionTypes.UPDATE_CARTITEM_REQUEST:
    case actionTypes.REMOVE_CARTITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FIND_CART_SUCCESS:
    case actionTypes.CLEARE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload.item,
      };

    case actionTypes.ADD_ITEM_TO_CART_SUCCESS: {
      const updatedItems = [action.payload, ...state.cartItems];
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
      return {
        ...state,
        loading: false,
        cartItems: updatedItems,
        cart: {
          ...state.cart,
          item: updatedItems,
          total: newTotal,
        },
      };
    }

    case actionTypes.UPDATE_CARTITEM_SUCCESS: {
      const updatedItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
      return {
        ...state,
        loading: false,
        cartItems: updatedItems,
        cart: {
          ...state.cart,
          item: updatedItems,
          total: newTotal,
        },
      };
    }

    case actionTypes.REMOVE_CARTITEM_SUCCESS: {
      const updatedItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
      return {
        ...state,
        loading: false,
        cartItems: updatedItems,
        cart: {
          ...state.cart,
          item: updatedItems,
          total: newTotal,
        },
      };
    }

    case actionTypes.FIND_CART_FAILURE:
    case actionTypes.UPDATE_CARTITEM_FAILURE:
    case actionTypes.REMOVE_CARTITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("jwt");
      return {
        ...state,
        cart: null,
        cartItems: [],
        success: "logout success",
      };

    default:
      return state;
  }
};

export default cartReducer;
