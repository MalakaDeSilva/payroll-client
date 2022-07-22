import axios from "axios";

const axiosIns = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosIns.interceptors.request.use(
  (config) => {
    const _token = localStorage.getItem("token");

    if (_token) {
      config.headers.Authorization = `Bearer ${_token}`;
    } else {
      delete axiosIns.defaults.headers.common.Authorization;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

export default axiosIns;
