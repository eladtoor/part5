import React from 'react';

export const DisplayComments = ({ blog }) => {
  return (
    <div>
      <h3>Comments</h3>

      <ul>
        {blog.comments.map((comment) => (
          <li key={comment._id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  );
};

