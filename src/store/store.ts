import { configureStore } from '@reduxjs/toolkit';
import fetchAuthSlice from './fetchAuthSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { fetchAuthSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
