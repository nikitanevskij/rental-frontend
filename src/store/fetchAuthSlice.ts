import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from '../axios';
import { RootState } from './store';

export type TUser = {
  fullName: string;
  email: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
};
export interface AuthUserState {
  data: TUser | null;
  status: string;
}

export type TInputUserData = {
  fullName: string;
  email: string;
  password: string;
  avatarUrl?: string;
};

const initialState: AuthUserState = {
  data: null,
  status: 'loading',
};

export const fetchRegister = createAsyncThunk<TUser, TInputUserData>(
  'auth/register',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<TUser>('/auth/register', obj);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //REGISTER
    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.data = null;
      state.status = 'loading';
    });
  },
});
export const isAuthSelect = (state: RootState) => Boolean(state.fetchAuthSlice.data);
export const {} = fetchAuthSlice.actions;

export default fetchAuthSlice.reducer;
