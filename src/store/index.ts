import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { playlistSlice } from './playlistSlice';
import { searchSlice } from './searchSlice';
import { apiSlice } from './api/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    playlist: playlistSlice.reducer,
    search: searchSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const playlistActions = playlistSlice.actions;
export const searchActions = searchSlice.actions;

export default store;
