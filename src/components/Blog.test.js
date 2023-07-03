import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Blog } from './Blog';
import userEvent from '@testing-library/user-event';
import { BlogForm } from './BlogForm';

test('renders title and author but not url&number of likes', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Elad',
    url: 'www.blog.com',
    likes: 5,
    user: {
      username: 'tamir',
      name: 'Tamir',
    },
  };
  const displayButton = jest.fn(); // Mock displayButton function

  const { container } = render(
    <Blog blog={blog} displayButton={displayButton} />
  );

  const titleAuthorElement = container.querySelector('.blog-title-author');
  const notShownDiv = container.querySelector('.blog-details');
  expect(titleAuthorElement).toHaveTextContent(
    'Component testing is done with react-testing-library Elad'
  );
  expect(notShownDiv).toHaveStyle('display: none');
});

test('url and likes shown when the button clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Elad',
    url: 'www.blog.com',
    likes: 5,
    user: {
      username: 'tamir',
      name: 'Tamir',
    },
  };

  const displayButton = jest.fn(); // Mock displayButton function

  const { container } = render(
    <Blog blog={blog} displayButton={displayButton} />
  );
  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const blogDetails = container.querySelector('.blog-details');
  expect(blogDetails).not.toHaveStyle('display: none');
});

test('like button clicked test', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Elad',
    url: 'www.blog.com',
    likes: 5,
    user: {
      username: 'tamir',
      name: 'Tamir',
    },
    id: '123hj232j13h12jk',
  };

  const displayButton = jest.fn();
  const mockHandler = jest.fn();

  render(
    <Blog
      blog={blog}
      displayButton={displayButton}
      increaseLike={mockHandler}
    />
  );

  const user = userEvent.setup();
  const button = screen.getByText('like');
  await user.click(button);
  await user.click(button);
  console.log(mockHandler.mock.calls);
  expect(mockHandler.mock.calls).toHaveLength(2);
});

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText('title...');
  const inputAuthor = screen.getByPlaceholderText('author...');

  const inputUrl = screen.getByPlaceholderText('url...');

  const sendButton = screen.getByText('create');

  await user.type(inputTitle, 'testing a form...title');
  await user.type(inputAuthor, 'testing a form...author');

  await user.type(inputUrl, 'testing a form...url');

  await user.click(sendButton);
  console.log('im herE:::', createBlog.mock.calls[0][0]);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...title');
  expect(createBlog.mock.calls[0][0].author).toBe('testing a form...author');
  expect(createBlog.mock.calls[0][0].url).toBe('testing a form...url');
});

