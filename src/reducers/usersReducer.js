import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});
export const { setUsers } = usersSlice.actions;

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = await usersService.fetchUsers();
    dispatch(setUsers(users));
  };
};

export default usersSlice.reducer;
