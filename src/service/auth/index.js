import clientHttp from "../../utils/apiConfig";
import Cookies from "js-cookie";
import { API_BASE_URL, API_ENDPOINTS} from "../../utils/endpoint";
import axios from "axios";

export const register = (data) => {
  return clientHttp(API_BASE_URL)
    .post(API_ENDPOINTS.Register, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const login = (data) => {
  return clientHttp(API_BASE_URL)
    .post(API_ENDPOINTS.Login, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err.response.data;
    });
}

export const getProfile = () => {
  const token = Cookies.get("token"); // Ambil token dari cookies
  return axios.get(`${API_BASE_URL}${API_ENDPOINTS.GetProfile}`, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  })
  .then((res) => {
    return res.data; 
  })
  .catch((err) => {
    throw err.response.data; 
  });
};
