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
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

export const fetchAuth = createAsyncThunk<any, Record<string, string>>(
  'auth/fetchAuth',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', obj);
      return data;
    } catch (err) {
      //@ts-ignore
      return rejectWithValue(err.response.data);
    }
  },
);

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
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = 'loading';
    },
  },
  extraReducers: (builder) => {
    //GET USER ME
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    //AUTH USER
    builder.addCase(fetchAuth.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.data = null;
      state.status = 'loading';
      //console.log(action.payload);
    });
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
export const { logout } = fetchAuthSlice.actions;

export default fetchAuthSlice.reducer;
