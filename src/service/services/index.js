import clientHttp from "../../utils/apiConfig";
import Cookies from "js-cookie";
import { API_BASE_URL, API_ENDPOINTS} from "../../utils/endpoint";
import axios from "axios";


  export const getBanner = () => {
    const token = Cookies.get("token"); 
    return axios.get(`${API_BASE_URL}${API_ENDPOINTS.GetBanner}`, {
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

  export const getService = () => {
    const token = Cookies.get("token"); 
    return axios.get(`${API_BASE_URL}${API_ENDPOINTS.GetService}`, {
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

  export const getBalance = () => {
    const token = Cookies.get("token"); 
    return axios.get(`${API_BASE_URL}${API_ENDPOINTS.GetBalance}`, {
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