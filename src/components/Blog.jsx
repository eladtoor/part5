import React from 'react';
import { useState } from 'react';
//import blogService from '../services/blogs';

export const Blog = ({
  blog,
  increaseLike,
  displayButton,
  deleteBlog,
  user,
}) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className=".blog">
      <div style={hideWhenVisible} className="blog-title-author">
        {blog.title} {blog.author}
        <button id="view-button" onClick={toggleVisibility}>
          view
        </button>
      </div>
      <div style={showWhenVisible} className="blog-details">
        <div style={blogStyle}>
          <div>
            {blog.title} <button onClick={toggleVisibility}>hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            <span id="likes-details">likes {blog.likes} </span>
            <button
              id="likes-button"
              onClick={() => increaseLike(blog.id, blog.likes)}
            >
              like
            </button>
          </div>
          <div>{blog.user.name ? blog.user.name : user.name}</div>
          <button
            id="remove-button"
            onClick={() => {
              deleteBlog(blog.id);
            }}
            style={displayButton(blog)}
          >
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

