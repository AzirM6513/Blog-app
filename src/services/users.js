import axios from 'axios';

const baseUrl = '/api/users';

const getUserById = async (userId) => {
  const res = await axios.get(`${baseUrl}/${userId}`);
  return res.data;
};

export default { getUserById };
