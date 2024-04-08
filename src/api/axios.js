import axios from 'axios';

const BASE_URL = '/api';

export default axios.create({
  //base url is /api the normal ip address is on proxy in vite config file
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  //base url is /api the normal ip address is on proxy in vite config file
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
