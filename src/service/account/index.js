import clientHttp from "../../utils/apiConfig";
import Cookies from "js-cookie";
import { API_BASE_URL, API_ENDPOINTS} from "../../utils/endpoint";
import axios from "axios";

  export const updateProfileData = (data) => {
    const token = Cookies.get("token"); 
    return axios.put(`${API_BASE_URL}${API_ENDPOINTS.PutProfile}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data; 
    })
    .catch((err) => {
      throw err.response.data; 
    });
  };
  
  export const updateProfileImage = (imageFile)=>{
    const token = Cookies.get('token')
    const formData = new FormData()
    formData.append('image',imageFile)
    return axios.put(`${API_BASE_URL}${API_ENDPOINTS.PutProfileImage}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "multipart/form-data",
        },
    }).then((res) => {
        return res.data; 
      })
      .catch((err) => {
        throw err.response.data; 
      });
  }