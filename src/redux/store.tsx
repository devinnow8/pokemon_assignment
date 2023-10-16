import { configureStore, combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  
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
