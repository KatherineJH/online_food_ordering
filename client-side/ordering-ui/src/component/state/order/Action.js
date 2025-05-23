import { api } from "../../config/Api";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_USERS_NOTIFICATION_FAILURE,
  GET_USERS_NOTIFICATION_REQUEST,
  GET_USERS_NOTIFICATION_SUCCESS,
  GET_USERS_ORDERS_FAILURE,
  GET_USERS_ORDERS_REQUEST,
  GET_USERS_ORDERS_SUCCESS,
  GET_ORDER_REVIEW_REQUEST,
  GET_ORDER_REVIEW_SUCCESS,
  GET_ORDER_REVIEW_FAILURE,
} from "./ActionType";

export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const { data } = await api.post("/api/order/create", reqData.order, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      //   if (data.payment_url) {
      //     window.location.href = data.payment_url;
      //   }
      console.log("created order data", data);
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.log("error ", error);
      dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
    }
  };
};

export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_ORDERS_REQUEST });
    try {
      const { data } = await api.get(`/api/order/user/history`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("users order ", data);
      dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      console.log("error ", error);
      dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error });
    }
  };
};

export const getUsersNotificationAction = () => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_NOTIFICATION_REQUEST });
    try {
      const { data } = await api.get("/api/notifications");

      console.log("all notifications ", data);
      dispatch({ type: GET_USERS_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
      console.log("error ", error);
      dispatch({ type: GET_USERS_NOTIFICATION_FAILURE, payload: error });
    }
  };
};

// 리뷰
export const getOrderReview = (orderId, jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_ORDER_REVIEW_REQUEST });
    try {
      const { data } = await api.get(`/api/order/review/${orderId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_ORDER_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      console.log("리뷰 불러오기 실패", error);
      dispatch({ type: GET_ORDER_REVIEW_FAILURE, payload: error });
    }
  };
};
