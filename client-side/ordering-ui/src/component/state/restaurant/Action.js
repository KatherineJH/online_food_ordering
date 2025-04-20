import { api } from "../../config/Api";
import {
  CREATE_RESTAURANTS_REQUEST,
  CREATE_RESTAURANTS_SUCCESS,
  CREATE_RESTAURANTS_FAILURE,
  GET_ALL_RESTAURANTS_REQUEST,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  DELETE_RESTAURANTS_REQUEST,
  DELETE_RESTAURANTS_SUCCESS,
  DELETE_RESTAURANTS_FAILURE,
  UPDATE_RESTAURANTS_REQUEST,
  UPDATE_RESTAURANTS_SUCCESS,
  UPDATE_RESTAURANTS_FAILURE,
  GET_RESTAURANTS_BY_ID_REQUEST,
  GET_RESTAURANTS_BY_ID_SUCCESS,
  GET_RESTAURANTS_BY_ID_FAILURE,
  GET_RESTAURANTS_BY_USER_ID_REQUEST,
  GET_RESTAURANTS_BY_USER_ID_SUCCESS,
  GET_RESTAURANTS_BY_USER_ID_FAILURE,
  UPDATE_RESTAURANTS_STATUS_REQUEST,
  UPDATE_RESTAURANTS_STATUS_SUCCESS,
  UPDATE_RESTAURANTS_STATUS_FAILURE,
  CREATE_RESTAURANTS_EVENTS_REQUEST,
  CREATE_RESTAURANTS_EVENTS_SUCCESS,
  CREATE_RESTAURANTS_EVENTS_FAILURE,
  GET_ALL_RESTAURANTS_EVENTS_REQUEST,
  GET_ALL_RESTAURANTS_EVENTS_SUCCESS,
  GET_ALL_RESTAURANTS_EVENTS_FAILURE,
  GET_RESTAURANTS_EVENTS_REQUEST,
  GET_RESTAURANTS_EVENTS_SUCCESS,
  GET_RESTAURANTS_EVENTS_FAILURE,
  DELETE_RESTAURANTS_EVENTS_REQUEST,
  DELETE_RESTAURANTS_EVENTS_SUCCESS,
  DELETE_RESTAURANTS_EVENTS_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE,
  GET_ELASTICSEARCH_RESTAURANTS_REQUEST,
  GET_ELASTICSEARCH_RESTAURANTS_SUCCESS,
  GET_ELASTICSEARCH_RESTAURANTS_FAILURE,
  RESET_SEARCHED_RESTAURANT_DETAILS,
  GET_FAVORITE_RESTAURANTS_REQUEST,
  GET_FAVORITE_RESTAURANTS_SUCCESS,
  GET_FAVORITE_RESTAURANTS_FAILURE,
} from "./ActionType";

// export const gettAllRestaurantsAction = (token) => {
export const gettAllRestaurantsAction = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
    try {
      const { data } = await api.get("/api/restaurant/visitor");
      // const { data } = await api.get("/api/restaurant/visitor", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
      console.log("all restaurants ", data);
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error });
    }
  };
};

export const getRestaurantById = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_BY_ID_REQUEST });
    try {
      const { data } = await api.get(`/api/restaurant/${reqData.id}`, {
        headers: reqData.jwt ? { Authorization: `Bearer ${reqData.jwt}` } : {},
      }); // 로그인 하지 않은 경우에는, jwt 확인 하지 않아도 됨.
      console.log(`${reqData.id} restaurant`, data);

      dispatch({ type: GET_RESTAURANTS_BY_ID_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: GET_RESTAURANTS_BY_ID_FAILURE, payload: error });
    }
  };
};

export const getRestaurantByUserId = (jwt) => {
  return async (dispatch) => {
    dispatch({
      type: GET_RESTAURANTS_BY_USER_ID_REQUEST,
    });
    try {
      const { data } = await api.get(`/api/admin/restaurant/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get restaurant by user id: ", data);
      dispatch({ type: GET_RESTAURANTS_BY_USER_ID_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({
        type: GET_RESTAURANTS_BY_USER_ID_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createRestaurant = (reqData) => {
  console.log("token => ", reqData.token);
  return async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANTS_REQUEST });
    try {
      const { data } = await api.post(`/api/admin/restaurant`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: CREATE_RESTAURANTS_SUCCESS });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: CREATE_RESTAURANTS_FAILURE, payload: error });
    }
  };
};

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANTS_REQUEST });
    try {
      const res = await api.put(
        `/api/admin/restaurant/${restaurantId}`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPDATE_RESTAURANTS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: UPDATE_RESTAURANTS_FAILURE, payload: error });
    }
  };
};

export const deleteRestaurant = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANTS_REQUEST });
    try {
      const res = await api.delete(`/api/admin/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete restaurant", res.data);
      dispatch({ type: DELETE_RESTAURANTS_SUCCESS, payload: restaurantId });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({ type: DELETE_RESTAURANTS_FAILURE, payload: error });
    }
  };
};

export const updateRestaurantStatus = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANTS_STATUS_REQUEST });
    try {
      const res = await api.put(
        `/api/admin/restaurant/${restaurantId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("updateRestaurantStatus", res.data);
      dispatch({ type: UPDATE_RESTAURANTS_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({ type: UPDATE_RESTAURANTS_STATUS_FAILURE, payload: error });
    }
  };
};

export const createEventAction = ({ data, jwt, restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANTS_EVENTS_REQUEST });
    try {
      const res = await api.post(
        `/api/admin/events/restaurant/${restaurantId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("createEvent", res.data);
      dispatch({ type: CREATE_RESTAURANTS_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({ type: CREATE_RESTAURANTS_EVENTS_FAILURE, payload: error });
    }
  };
};

export const getAllEvent = ({ jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_EVENTS_REQUEST });
    try {
      const res = await api.get(`/api/events`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all Events", res.data);
      dispatch({ type: GET_ALL_RESTAURANTS_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({ type: GET_ALL_RESTAURANTS_EVENTS_FAILURE, payload: error });
    }
  };
};

export const deleteEventAction = ({ eventId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANTS_EVENTS_REQUEST });
    try {
      const res = await api.get(`/api/admin/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete Events", res.data);
      dispatch({ type: DELETE_RESTAURANTS_EVENTS_SUCCESS, payload: eventId });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({ type: DELETE_RESTAURANTS_EVENTS_FAILURE, payload: error });
    }
  };
};

export const getRestaurantEvents = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
    try {
      const res = await api.get(
        `/api/admin/events/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("get restaurants Events", res.data);
      dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: error });
    }
  };
};

export const getVisitsRestaurantEvents = ({ restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
    try {
      const res = await api.get(
        `/api/restaurant/visitor/events/${restaurantId}`
      );
      console.log("get restaurants Events", res.data);
      dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: error });
    }
  };
};

export const createCategoryAction = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      const res = await api.post(`/api/admin/category`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get restaurants Events", res.data);
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      // 에러 로그를 좀 더 구체적으로 출력
      console.error(
        "Error creating category:",
        error.response || error.message || error
      );
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getRestaurantsCategory = ({ jwt, id }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
    try {
      const res = await api.get(`/api/category/restaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get restaurants category", res.data);
      dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const elasticSearchRestaurant = (keyword) => {
  return async (dispatch) => {
    dispatch({ type: GET_ELASTICSEARCH_RESTAURANTS_REQUEST });
    try {
      const { data } = await api.get(`/api/search?keyword=${keyword}`);
      dispatch({ type: GET_ELASTICSEARCH_RESTAURANTS_SUCCESS, payload: data });
      console.log("elasticSearchRestaurant", data);
    } catch (error) {
      console.log("catch error", error);
      dispatch({
        type: GET_ELASTICSEARCH_RESTAURANTS_FAILURE,
        payload: error,
      });
    }
  };
};

export const resetSearchedRestaurantDetails = () => ({
  type: RESET_SEARCHED_RESTAURANT_DETAILS,
});

export const getFavoriteRestaurants = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_FAVORITE_RESTAURANTS_REQUEST });
    try {
      const { data } = await api.get(`/api/restaurant/favorites`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("즐겨찾기 레스토랑 목록", data);
      dispatch({ type: GET_FAVORITE_RESTAURANTS_SUCCESS, payload: data });
    } catch (error) {
      console.log("즐겨찾기 불러오기 실패", error);
      dispatch({ type: GET_FAVORITE_RESTAURANTS_FAILURE, payload: error });
    }
  };
};
