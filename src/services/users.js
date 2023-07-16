import axios from 'axios';
const baseUrl = '/api/users';

const fetchUsers = async () => {
  const users = await axios.get(baseUrl);
  return users.data;
};

export default { fetchUsers };

