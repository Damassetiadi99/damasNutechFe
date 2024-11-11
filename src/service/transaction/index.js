import clientHttp from "../../utils/apiConfig";
import Cookies from "js-cookie";
import { API_BASE_URL, API_ENDPOINTS} from "../../utils/endpoint";
import axios from "axios";


  export const getTransactionH = () => {
    const token = Cookies.get("token"); 
    return axios.get(`${API_BASE_URL}${API_ENDPOINTS.GetTransaction}`, {
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
  
  export const topUp = (data) => {
    const token = Cookies.get("token"); 
    return axios.post(`${API_BASE_URL}${API_ENDPOINTS.PostTopUp}`,data, {
      headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type' : 'application/json'
      },
    })
    .then((res) => {
      return res.data; 
    })
    .catch((err) => {
      throw err.response.data; 
    });
  };

  // export const Transactions = (data) => {
  //   const token = Cookies.get("token"); 
  //   return axios.post(`${API_BASE_URL}${API_ENDPOINTS.PostTransaction}`,data, {
  //     headers: {
  //      'Authorization': `Bearer ${token}`,
  //      'Content-Type' : 'application/json'
  //     },
  //   })
  //   .then((res) => {
  //     return res.data; 
  //     console.log(data)
  //   })
  //   .catch((err) => {
  //     throw err.response.data; 
  //   });
  // };
