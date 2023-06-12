import axios from "axios";

export const $api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  config!.headers!.Authorization = `bearer ${localStorage.getItem("token")}`;
  return config;
});
$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    console.log("err");

    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const response = await axios.get(`${process.env.API_URL}/refresh_token`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);

      return $api.request(originalRequest);
    }
    throw error;
  }
);

export default $api;
