import React from 'react';
import { deleteBlogAsync, likeBlogAsync } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DisplayComments } from './DisplayComments';
import { AddComment } from './AddComment';
import { Table } from 'react-bootstrap';

export const BlogDetails = ({ blog, userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => (state.user ? state.user : null));

  const increaseLike = async (id) => {
    dispatch(likeBlogAsync(id));
  };

  const displayButton = () => {
    if (blog.user.username === user.username) {
      return { display: '' };
    } else if (blog.user === userId) {
      return { display: '' };
    } else return { display: 'none' };
  };
  const deleteBlog = async (id) => {
    dispatch(deleteBlogAsync(id));
    navigate('/blogs');
  };
  //   // const deletedBlogIndex = blogs.findIndex((blog) => blog.id === id);
  //   // const updatedBlogs = blogs.filter(
  //   //   (blog, index) => index !== deletedBlogIndex
  //   // );
  //   //setBlogs(updatedBlogs);

  return (
    <div>
      <h2>{blog.title}</h2>
      <Table striped>
        <tbody>
          <tr>
            <td>{blog.url}</td>
          </tr>
          <tr>
            <td>{`${blog.likes} likes`}</td>
            <td>
              <button
                id="likes-button"
                onClick={() => increaseLike(blog.id, blog.likes)}
              >
                like
              </button>
            </td>
          </tr>
          <tr>
            <td>{`Added by ${blog.author} `}</td>
          </tr>
          <tr>
            <td>
              <button
                onClick={() => deleteBlog(blog.id)}
                style={displayButton()}
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
      <DisplayComments blog={blog} />
      <AddComment blog={blog} />
    </div>
  );
};

