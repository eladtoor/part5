import React, { useState } from 'react';
import { addCommentAsync } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';

export const AddComment = ({ blog }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');
  const addComment = (event) => {
    event.preventDefault();

    dispatch(addCommentAsync(blog.id, comment));
  };
  return (
    <div>
      <form onSubmit={addComment}>
        <input
          type="text"
          onChange={({ target }) => {
            setComment(target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

