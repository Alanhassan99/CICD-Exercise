import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const post = (obj) => {
  const request = axios.post(baseUrl, obj, {
    headers: { Authorization: token },
  });
  return request.then((response) => response.data);
};

const addComment = (id, comment) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, { comment })
  return request.then((response) => response.data);
};

const put = (obj) => {
  const request = axios.put(`${baseUrl}/${obj.id}`, obj, {
    headers: { Authorization: token },
  });
  return request.then((response) => response.data);
};
const remove = (obj) => {
  const request = axios.delete(`${baseUrl}/${obj.id}`, {
    headers: { Authorization: token },
  });
  return request.then((response) => response.data);
};

export default { getAll, setToken, post, put, remove, addComment };
