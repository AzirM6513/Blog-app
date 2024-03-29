import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config);
  return res.data;
};

const deleteById = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.status;
};

export default { getAll, setToken, create, update, deleteById };
