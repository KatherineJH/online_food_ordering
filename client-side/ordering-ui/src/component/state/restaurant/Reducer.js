import * as actionType from "./ActionType";

const initialState = {
  restaurants: [],
  usersRestaurant: [],
  restaurant: null,
  favorites: [],
  loading: false,
  error: null,
  events: [],
  restaurantsEvents: [],
  categories: [],
  searchedRestaurantDetails: [], // fuzzy search 결과로 검색된 id들
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CREATE_RESTAURANTS_REQUEST:
    case actionType.GET_ALL_RESTAURANTS_REQUEST:
    case actionType.DELETE_RESTAURANTS_REQUEST:
    case actionType.UPDATE_RESTAURANTS_REQUEST:
    case actionType.GET_RESTAURANTS_BY_ID_REQUEST:
    case actionType.GET_RESTAURANTS_BY_USER_ID_REQUEST:
    case actionType.CREATE_CATEGORY_REQUEST:
    case actionType.GET_RESTAURANTS_CATEGORY_REQUEST:
    case actionType.GET_RESTAURANTS_EVENTS_REQUEST:
    case actionType.GET_ELASTICSEARCH_RESTAURANTS_REQUEST:
    case actionType.GET_FAVORITE_RESTAURANTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionType.CREATE_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        usersRestaurant: action.payload,
      };
    case actionType.GET_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
      };
    case actionType.GET_RESTAURANTS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
        searchedRestaurantDetails: [
          ...state.searchedRestaurantDetails,
          action.payload,
        ],
      };
    case actionType.RESET_SEARCHED_RESTAURANT_DETAILS: // ✅ 선택적 초기화 지원
      return {
        ...state,
        searchedRestaurantDetails: [],
      };
    case actionType.GET_RESTAURANTS_BY_USER_ID_SUCCESS:
    case actionType.UPDATE_RESTAURANTS_STATUS_SUCCESS:
    case actionType.UPDATE_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        usersRestaurant: action.payload,
      };
    case actionType.GET_FAVORITE_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        favorites: action.payload, // ✅ 올바른 위치로 저장
      };
    case actionType.DELETE_RESTAURANTS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        restaurants: state.restaurants.filter(
          (item) => item.id !== action.payload
        ),
        usersRestaurant: state.usersRestaurant.filter(
          (item) => item.id !== action.payload
        ),
      };
    case actionType.CREATE_RESTAURANTS_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: [...state.events, action.payload],
        restaurantsEvents: [...state.restaurantsEvents, action.payload],
      };
    case actionType.GET_ALL_RESTAURANTS_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case actionType.GET_RESTAURANTS_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurantsEvents: action.payload,
      };
    case actionType.DELETE_RESTAURANTS_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter((item) => item.id !== action.payload),
        restaurantsEvents: state.restaurantsEvents.filter(
          (item) => item !== action.payload
        ),
      };
    case actionType.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };
    case actionType.GET_RESTAURANTS_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case actionType.GET_ELASTICSEARCH_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload, // 검색 결과를 restaurants에 저장
      };
    case actionType.CREATE_RESTAURANTS_FAILURE:
    case actionType.GET_ALL_RESTAURANTS_FAILURE:
    case actionType.DELETE_RESTAURANTS_FAILURE:
    case actionType.UPDATE_RESTAURANTS_FAILURE:
    case actionType.GET_RESTAURANTS_BY_ID_FAILURE:
    case actionType.GET_RESTAURANTS_EVENTS_FAILURE:
    case actionType.CREATE_RESTAURANTS_EVENTS_FAILURE:
    case actionType.CREATE_CATEGORY_FAILURE:
    case actionType.GET_RESTAURANTS_CATEGORY_FAILURE:
    case actionType.GET_ELASTICSEARCH_RESTAURANTS_FAILURE:
    case actionType.GET_FAVORITE_RESTAURANTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default restaurantReducer;
