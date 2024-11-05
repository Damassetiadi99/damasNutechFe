import axios from "axios";
import Cookies from "js-cookie";

const clientHttp = (baseURL) => {
    const instance = axios.create({
        baseURL: baseURL,
      });
      instance.interceptors.request.use(
        (config) => {
          const token = Cookies.get("token");
          if (typeof window !== "undefined" && token !== undefined) {
            config.headers.Authorization = `${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );
  return instance;
};

export default clientHttp;