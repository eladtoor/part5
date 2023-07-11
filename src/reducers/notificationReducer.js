import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    resetNotification() {
      return '';
    },
  },
});

export const { setNotification, resetNotification } = notificationSlice.actions;

export const setNotificationAsync = (notification, time) => {
  return async (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(resetNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;

