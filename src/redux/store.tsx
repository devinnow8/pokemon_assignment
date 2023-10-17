import { configureStore, combineReducers } from "@reduxjs/toolkit";

import pokemonReducer from "./slice/pokemon";
import loadingReducer from "./slice/loading";

export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  pokemonReducer,
  loadingReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export { store };
