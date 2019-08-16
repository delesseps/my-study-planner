import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api"
    : process.env.REACT_SERVER_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

axios.defaults.withCredentials = true;

export default instance;
