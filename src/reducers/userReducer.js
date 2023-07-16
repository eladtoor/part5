import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/login';
const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logoutUser() {
      return null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export const loginUserAndSave = (username, password) => {
  return async (dispatch) => {
    const user = await userService.login(username, password);
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    dispatch(setUser(user));
  };
};

export const logoutAsync = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser');

    dispatch(logoutUser());
  };
};

export const reloadUserFromLocalStorage = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user));
  };
};

export default userSlice.reducer;

