import React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

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
      <Form onSubmit={addBlog}>
        <Form.Group>
          <div>
            <Form.Label>title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              placeholder="title..."
              onChange={({ target }) => {
                setTitle(target.value);
              }}
            />
          </div>
          <div>
            <Form.Label>author:</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={author}
              placeholder="author..."
              onChange={({ target }) => {
                setAuthor(target.value);
              }}
            />
          </div>
          <div>
            <Form.Label>url:</Form.Label>
            <Form.Control
              type="text"
              name="url"
              value={url}
              placeholder="url..."
              onChange={({ target }) => {
                setUrl(target.value);
              }}
            />
          </div>
          <Button variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

