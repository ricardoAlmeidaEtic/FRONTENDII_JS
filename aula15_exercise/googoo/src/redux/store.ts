import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "./middleware";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import counterReducer from './counterSlice'

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, counterReducer)

export const store = configureStore({
    reducer: {
        counter: persistedReducer,
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store)