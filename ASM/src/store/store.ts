import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { apiSlice } from '@/services/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

import themeReducer from './themeSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
