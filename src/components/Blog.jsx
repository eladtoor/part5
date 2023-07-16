import React from 'react';

//import blogService from '../services/blogs';

export const Blog = ({
  blog,
  increaseLike,
  displayButton,
  deleteBlog,
  user,
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className=".blog">
      <div className="blog-details">
        <div style={blogStyle}>
          <div>{blog.title}</div>
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

