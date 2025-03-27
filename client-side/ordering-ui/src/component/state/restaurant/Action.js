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
} from "./ActionType";

export const gettAllRestaurantsAction = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
    try {
      const { data } = await api.get("/api/restaurants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const { data } = await api.get(`/api/restaurants/${reqData.id}`, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
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

export const createCategoryAction = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      const res = await api.post(`/api/admin/category/`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get restaurants Events", res.data);
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getRestaurantsCategory = ({ jwt, id }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
    try {
      const res = await api.get(
        `/api/category/restaurant/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("get restaurants category", res.data);
      dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
    }
  };
};
