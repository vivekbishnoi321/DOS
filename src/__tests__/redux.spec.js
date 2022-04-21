import fetch from "cross-fetch";

import {
  friendsReducer,
  getMovies,
  initialState,
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_FAILURE,
  GET_FRIENDS_SUCCESS
} from "../redux";

jest.mock("cross-fetch");

describe("movies-redux", () => {
  describe("friendsReducer", () => {
    it("should handle initial state", () => {
      expect(friendsReducer()).toEqual(initialState);
    });

    it("should handle unknown actions", () => {
      const action = { type: "UNKNOWN" };
      const state = initialState;
      expect(friendsReducer(state, action)).toEqual(initialState);
    });

    it(`should handle ${GET_FRIENDS_REQUEST}`, () => {
      const action = { type: GET_FRIENDS_REQUEST };
      const state = initialState;
      expect(friendsReducer(state, action)).toEqual({
        ...state,
        isFetching: true
      });
    });

    it(`should handle ${GET_FRIENDS_FAILURE}`, () => {
      const action = { type: GET_FRIENDS_FAILURE };
      const state = initialState;
      expect(friendsReducer(state, action)).toEqual({
        ...state,
        isFetching: false
      });
    });

    it(`should handle ${GET_FRIENDS_SUCCESS}`, () => {
      const payload = ["movie"];
      const action = { type: GET_FRIENDS_SUCCESS, payload };
      const state = initialState;
      expect(friendsReducer(state, action)).toEqual({
        movies: payload,
        isFetching: false
      });
    });
  });

  describe("getMovies", () => {
    it(`should dispatch ${GET_MOVIES_REQUEST}`, async () => {
      const payload = ["movie"];
      fetch.mockResolvedValue({ json: () => payload, ok: true, status: 200 });
      const dispatch = jest.fn();
      await getMovies()(dispatch);
      expect(dispatch).toBeCalledWith({ type: GET_MOVIES_REQUEST });
    });

    it(`should dispatch ${GET_MOVIES_FAILURE} when fetch failed`, async () => {
      fetch.mockResolvedValue({ ok: false, status: 422 });
      const dispatch = jest.fn();
      await getMovies()(dispatch);
      expect(dispatch).toBeCalledWith({
        type: GET_MOVIES_FAILURE,
        error: new Error("Invalid Response")
      });
    });

    it(`should dispatch ${GET_MOVIES_FAILURE} when fetch failed`, async () => {
      fetch.mockRejectedValue();
      const dispatch = jest.fn();
      await getMovies()(dispatch);
      expect(dispatch).toBeCalledWith({ type: GET_MOVIES_FAILURE });
    });

    it(`should dispatch ${GET_MOVIES_SUCCESS} when fetch succeeds`, async () => {
      const payload = ["movie"];
      fetch.mockResolvedValue({ json: () => payload, ok: true, status: 200 });
      const dispatch = jest.fn();
      await getMovies()(dispatch);
      expect(dispatch).toBeCalledWith({ type: GET_MOVIES_SUCCESS, payload });
    });
  });
});
