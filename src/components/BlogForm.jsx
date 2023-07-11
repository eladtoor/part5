import React from 'react';
import { useState } from 'react';

export const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();
    await createBlog({ title, author, url });
    setTitle(''); // Reset title to empty string
    setAuthor(''); // Reset author to empty string
    setUrl(''); // Reset url to empty string
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{' '}
          <input
            id="new-blog-title"
            type="text"
            value={title}
            placeholder="title..."
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />
        </div>
        <div>
          author:{' '}
          <input
            id="new-blog-author"
            type="text"
            value={author}
            placeholder="author..."
            onChange={({ target }) => {
              setAuthor(target.value);
            }}
          />
        </div>
        <div>
          url:{' '}
          <input
            id="new-blog-url"
            type="text"
            value={url}
            placeholder="url..."
            onChange={({ target }) => {
              setUrl(target.value);
            }}
          />
        </div>
        <button id="new-blog-create-btn" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

