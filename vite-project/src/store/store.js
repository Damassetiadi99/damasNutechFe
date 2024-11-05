import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./rootReducer"; // root reducer yang berisi gabungan reducer
export const store = configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  
  export default store;