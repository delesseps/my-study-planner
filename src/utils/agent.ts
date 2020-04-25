import axios from "axios";
import { message } from "antd";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api"
    : "https://msp-api.jfelix.info/api";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.message === "Network Error") {
      message.error("Unable to connect to server. Retrying...");
    }

    return Promise.reject(error);
  }
);

axios.defaults.withCredentials = true;

export default instance;
