import React, { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createNewBlog } from '../reducers/blogReducer';
import { Togglable } from './Togglable';
import { BlogForm } from './BlogForm';
import { setNotificationAsync } from '../reducers/notificationReducer';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import { Table } from 'react-bootstrap';

const selectBlogs = (state) => state.blogs;

const selectSortedBlogs = createSelector(selectBlogs, (blogs) => {
  const arrayForSort = [...blogs];
  arrayForSort.sort((a, b) => b.likes - a.likes);
  return arrayForSort;
});
export const Blogs = () => {
  const blogs = useSelector(selectSortedBlogs);

  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();

    const savedBlog = await dispatch(createNewBlog(newBlog));

    dispatch(setNotificationAsync(`Added new blog ${savedBlog.title}`, 5));
  };

  return (
    <div>
      <h3>Blogs</h3>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

