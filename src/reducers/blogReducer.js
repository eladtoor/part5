import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
const initialState = [];

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addNewBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, addNewBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createNewBlog = (newBlog) => {
  return async (dispatch) => {
    const responseBlog = await blogService.create(newBlog);
    dispatch(addNewBlog(responseBlog));
    return responseBlog;
  };
};
export default blogSlice.reducer;

