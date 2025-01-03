import { configureStore, combineReducers } from "@reduxjs/toolkit";
import keplerGlReducer from "@kepler.gl/reducers";
// @ts-ignore
import { taskMiddleware } from "react-palm/tasks";

const reducer = combineReducers({
  keplerGl: keplerGlReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskMiddleware),
});
