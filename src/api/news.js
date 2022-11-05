import axios from "axios";
import { API_KEY } from "../utils/constants";

const instance = axios.create({
  baseURL: "https://newsapi.org/v2",
});

instance.interceptors.request.use(
  (config) => {
    config.params = { ...config.params, apiKey: API_KEY };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
