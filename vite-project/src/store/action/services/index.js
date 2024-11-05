import { getBanner,getService,getBalance} from "../../../service/services";
import { createAction ,createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

  export const getBannerThunk = createAsyncThunk(
    "services/getBanner",
    async (_, { rejectWithValue }) => {
      try {
        const token = Cookies.get("token");
        const response = await getBanner(token); // Panggil API untuk mendapatkan profil
        console.log("Profile Response:", response.data); // Log respons profil
        return response.data; // Pastikan mengembalikan data yang benar
      } catch (e) {
        console.log("Profile Fetch Error:", e); // Log error saat fetch profil
        return rejectWithValue(e.response?.data || e.message);
      }
    }
  );
  
  export const getServiceThunk = createAsyncThunk(
    "services/getService",
    async (_, { rejectWithValue }) => {
      try {
        const token = Cookies.get("token");
        const response = await getService(token); // Panggil API untuk mendapatkan profil
        return response.data; // Pastikan mengembalikan data yang benar
      } catch (e) {
        console.log("Profile Fetch Error:", e); // Log error saat fetch profil
        return rejectWithValue(e.response?.data || e.message);
      }
    }
  );
  
  export const getBalanceThunk = createAsyncThunk(
    "services/getBalance",
    async (_, { rejectWithValue }) => {
      try {
        const token = Cookies.get("token");
        const response = await getBalance(token); // Panggil API untuk mendapatkan profil
        console.log("Profile Response:", response); // Log respons profil
        return response.data; // Pastikan mengembalikan data yang benar
      } catch (e) {
        return rejectWithValue(e.response?.data || e.message);
      }
    }
  );
  