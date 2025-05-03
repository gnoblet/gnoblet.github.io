import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-url.com',
});

export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};