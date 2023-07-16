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
    likeBlog(state, action) {
      const id = action.payload;
      const blogToChange = state.find((b) => b.id === id);
      const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
    deleteBlogById(state, action) {
      const id = action.payload;
      const deletedBlogIndex = state.findIndex((b) => {
        console.log(b.id, id);
        return b.id === id;
      });
      console.log(deletedBlogIndex, 'index');
      console.log('im here', state.blogs);
      const newB = state.filter((b, i) => i !== deletedBlogIndex);
      console.log(newB);
      return state.filter((b, i) => i !== deletedBlogIndex);
    },
    addComment(state, action) {
      const updatedBlog = action.payload;
      //const blogToReplace = state.find((b) => b.id === id);
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
  },
});

export const { setBlogs, addNewBlog, likeBlog, deleteBlogById, addComment } =
  blogSlice.actions;

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

export const likeBlogAsync = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const blogToChange = blogs.find((b) => b.id === id);
    await blogService.addLike(id, blogToChange.likes + 1);
    dispatch(likeBlog(id));
  };
};

export const deleteBlogAsync = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(deleteBlogById(id));
  };
};

export const addCommentAsync = (id, comment) => {
  return async (dispatch) => {
    console.log(comment);
    const updatedBlog = await blogService.createComment(id, comment);
    console.log(updatedBlog, 'my response');
    dispatch(addComment(updatedBlog));
  };
};

export default blogSlice.reducer;

