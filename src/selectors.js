import { createSelector } from "reselect";

export const ramTitlesSelector = createSelector(
  state => state.movies,
  movies => movies.map(movie => movie.title)
);
