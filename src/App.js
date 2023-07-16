import { useState, useEffect } from 'react';
import blogService from './services/blogs';

import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationAsync } from './reducers/notificationReducer';
import { Route, Routes, useMatch } from 'react-router-dom';

import { initializeBlogs } from './reducers/blogReducer';
import {
  logoutAsync,
  reloadUserFromLocalStorage,
  loginUserAndSave,
} from './reducers/userReducer';
import { Users } from './components/Users';
import { Blogs } from './components/Blogs';
import { UserDetails } from './components/UserDetails';
import { fetchUsers } from './reducers/usersReducer';
import { BlogDetails } from './components/BlogDetails';
import { Menu } from './components/Menu';
import { Button, Form } from 'react-bootstrap';

const App = () => {
  const user = useSelector((state) => (state.user ? state.user : null));
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  //const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);
  const [userId, setuserId] = useState('');

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUserAndSave(username, password));

      setUsername('');
      setPassword('');
    } catch (error) {
      dispatch(setNotificationAsync('wrong username or password', 5));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await blogService.getUserId(user.token);
        setuserId(userId.data);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    if (user && user.token) {
      blogService.setToken(user.token);
      fetchData();
    }
  }, [user]);

  const logout = () => {
    dispatch(logoutAsync());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(initializeBlogs());
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing blogs:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserId = async (user) => {
      const userId = await blogService.getUserId(user.token);

      setuserId(userId.data);
    };
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(reloadUserFromLocalStorage(user));
      fetchUserId(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const matchUserId = useMatch('/users/:id');
  const userMatched = matchUserId
    ? users.find((user) => user.id === String(matchUserId.params.id))
    : null;

  const matchBlogId = useMatch('/blogs/:id');

  const blogMatched = matchBlogId
    ? blogs.find((blog) => blog.id === matchBlogId.params.id)
    : null;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user === null) {
    return (
      <div className="container">
        <h2>Log in to application</h2>
        <Notification />
        <Form onSubmit={loginUser}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button variant="primary" type="submit">
              login
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
  return (
    <div className="container">
      <div>
        <Menu />
        {user.name} logged in{' '}
        <button id="logout-button" onClick={logout}>
          logout
        </button>
      </div>
      <h2>Blogs App</h2>
      <Notification />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route
          path="/users/:id"
          element={<UserDetails userMatched={userMatched} />}
        />
        <Route
          path="/blogs/:id"
          element={<BlogDetails blog={blogMatched} userId={userId} />}
        />
      </Routes>
    </div>
  );
};

export default App;

