import axios from "axios";
const BASE_URL = "http://localhost:3000/";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
