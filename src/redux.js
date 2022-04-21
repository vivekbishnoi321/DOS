import fetch from "cross-fetch";
import config from "./config";

export const GET_FRIENDS_REQUEST = "GET_FRIENDS_REQUEST";
export const GET_FRIENDS_FAILURE = "GET_FRIENDS_FAILURE";
export const GET_FRIENDS_SUCCESS = "GET_FRIENDS_SUCCESS";

export const initialState = {
  isFetching: false,
  movies: []
};

export const friendsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_FRIENDS_REQUEST:
      return {
        isFetching: true,
        movies: []
      };
    case GET_FRIENDS_SUCCESS:
      return {
        isFetching: false,
        movies: action.payload
      };
    case GET_FRIENDS_FAILURE:
      return {
        isFetching: false,
        movies: []
      };
    default:
      return state;
  }
};

export function getMovies() {
  return async dispatch => {
    try {
      dispatch({ type: GET_FRIENDS_REQUEST });
      const response = await fetch(config.moviesUrl);
      if (!response.ok) throw new Error("Invalid Response");
      const json = await response.json();
      dispatch({ type: GET_FRIENDS_SUCCESS, payload: json });
    } catch (error) {
      dispatch({ type: GET_FRIENDS_FAILURE, error });
    }
  };
}

export default friendsReducer;
