import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export const UserDetails = ({ userMatched }) => {
  if (!userMatched) {
    return null;
  }
  return (
    <div>
      <h2>{userMatched.name}</h2>
      <h3> User Blogs</h3>
      <ListGroup>
        {userMatched.blogs.map((blog) => {
          return <ListGroupItem key={blog.id}>{blog.title}</ListGroupItem>;
        })}
      </ListGroup>
    </div>
  );
};

