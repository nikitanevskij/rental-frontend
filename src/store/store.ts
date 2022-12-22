import { configureStore } from '@reduxjs/toolkit';
import fetchAuthSlice from './fetchAuthSlice';
import rentalSlice from './rentalSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { fetchAuthSlice, rentalSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
