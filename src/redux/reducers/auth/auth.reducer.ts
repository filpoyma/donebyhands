import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { logout } from '~redux/actions';
import { IUser, IUserUpdate } from '~typedefs/models/User.model';
import { IAuthState } from '~typedefs/redux/reducers/auth.reducer';

const initialState: IAuthState = {
  token: null,
  user: null,
  isLoggedIn: false,
};

const { reducer: authReducer, actions: authActions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state: IAuthState, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setUser(state: IAuthState, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
    setIsLoggedIn(state: IAuthState, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    updateUser(state: IAuthState, action: PayloadAction<IUserUpdate>) {
      //@ts-ignore
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(logout, () => initialState);
  },
});

export { authReducer, authActions };
