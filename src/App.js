import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import { BlogForm } from './components/BlogForm';
import { Togglable } from './components/Togglable';
import { Blog } from './components/Blog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [userId, setuserId] = useState('');
  const [message, setMessage] = useState('');
  const [newSavedBlogId, setNewSavedBlogId] = useState(null);

  const blogFormRef = useRef();

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(username, password);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      const userId = await blogService.getUserId(user.token);

      setuserId(userId.data);
      setUsername('');
      setPassword('');
    } catch (error) {
      setMessage('wrong username or password');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const fetchUserId = async (user) => {
      const userId = await blogService.getUserId(user.token);

      setuserId(userId.data);
    };
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      fetchUserId(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();

    const savedBlog = await blogService.create(newBlog);

    setNewSavedBlogId(savedBlog.user);
    setBlogs(blogs.concat(savedBlog));
    setMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added`);
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  const deleteBlog = async (id) => {
    await blogService.deleteBlog(id);
    const deletedBlogIndex = blogs.findIndex((blog) => blog.id === id);
    const updatedBlogs = blogs.filter(
      (blog, index) => index !== deletedBlogIndex
    );
    setBlogs(updatedBlogs);
  };

  const increaseLike = async (id, likes) => {
    await blogService.addLike(id, likes + 1);

    const blogIndex = blogs.findIndex((blog) => blog.id === id);
    if (blogIndex !== -1) {
      // Create a new array with the updated blog
      const updatedBlogs = [...blogs];
      updatedBlogs[blogIndex] = {
        ...updatedBlogs[blogIndex],
        likes: updatedBlogs[blogIndex].likes + 1,
      };
      updatedBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(updatedBlogs);
    }
  };

  const displayButton = (blog) => {
    if (blog.user.id === userId) {
      console.log('here123');
      return { display: '' };
    } else if (newSavedBlogId === userId && !blog.user.id)
      return { display: '' };
    return { display: 'none' };
  };
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <h3>{message}</h3>
        <form onSubmit={loginUser}>
          <div>
            username:
            <input
              id="username"
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            ></input>
          </div>
          <div>
            password:
            <input
              id="password"
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            ></input>
            <div>
              <button id="login-button" type="submit">
                login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <h3>{message}</h3>
      <div>
        {user.name} logged in{' '}
        <button id="logout-button" onClick={logout}>
          logout
        </button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          increaseLike={increaseLike}
          displayButton={displayButton}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default App;

