import { register,login ,getProfile} from "../../../service/auth";
import { createAction ,createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
export const submitRegisterThunk = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
      try {
        const response = await register(data);
        return response;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  );

  export const submitLoginThunk = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
      try {
        const response = await login(data);
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: response.data.email,
            userId: response.data.userId,
          })
        );
        Cookies.set("token", response.data.token);
        return response;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  );
  
  export const getProfileThunk = createAsyncThunk(
    "auth/getProfile",
    async (_, { rejectWithValue }) => {
      try {
        const token = Cookies.get("token");
        const response = await getProfile(token); // Panggil API untuk mendapatkan profil
        return response.data; // Pastikan mengembalikan data yang benar
      } catch (e) {
        return rejectWithValue(e.response?.data || e.message);
      }
    }
  );
  
  export const logOutThunk = createAsyncThunk(
    "auth/logout",
    async(_,{rejectWithValue}) => {
      try{
        Cookies.remove('token')
        localStorage.removeItem('user')
        return true;
      }
      catch (e){
        return rejectWithValue(e.message)
      }
    }
  )