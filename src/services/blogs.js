import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getUserById = (id) => {
  const user = axios.get(`${baseUrl}/${id}`);
  return user;
};

const create = async (newBlog) => {
  console.log(token);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const addLike = async (id, likes) => {
  const response = await axios.put(`${baseUrl}/${id}`, { likes });
  return response.data;
};

const getUserId = async (token) => {
  const response = await axios.post('/api/tokens', {
    token: `Bearer ${token}`,
  });
  return response;
};

const createComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return response.data;
};
export default {
  getAll,
  create,
  setToken,
  addLike,
  getUserId,
  deleteBlog,
  getUserById,
  createComment,
};

