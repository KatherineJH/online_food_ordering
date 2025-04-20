import {
  GET_USERS_NOTIFICATION_SUCCESS,
  GET_USERS_ORDERS_FAILURE,
  GET_USERS_ORDERS_REQUEST,
  GET_USERS_ORDERS_SUCCESS,
  GET_ORDER_REVIEW_REQUEST,
  GET_ORDER_REVIEW_SUCCESS,
  GET_ORDER_REVIEW_FAILURE,
} from "./ActionType";

const initialState = {
  loading: false,
  orders: [],
  error: null,
  orderReview: null,
  notifications: [],
};
export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_ORDERS_REQUEST:
    case GET_ORDER_REVIEW_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_USERS_ORDERS_SUCCESS:
      return { ...state, error: null, loading: false, orders: payload };
    // case GET_USERS_NOTIFICATION_SUCCESS:
    //     return { ...state,notifications:payload, error: null, loading: false };
    case GET_ORDER_REVIEW_SUCCESS:
      return { ...state, loading: false, orderReview: payload };
    case GET_USERS_ORDERS_FAILURE:
    case GET_ORDER_REVIEW_FAILURE:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};
