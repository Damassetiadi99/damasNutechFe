import { getTransactionH , topUp} from "../../../service/transaction/index";
import { createAction ,createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

  export const getTransactionhThunk = createAsyncThunk(
    "transaction/getTransaction",
    async (_, { rejectWithValue }) => {
      try {
        const token = Cookies.get("token");
        const response = await getTransactionH(token); // Panggil API untuk mendapatkan profil
        console.log("Profile Response:", response.data); // Log respons profil
        return response.data; // Pastikan mengembalikan data yang benar
      } catch (e) {
        console.log("Profile Fetch Error:", e); // Log error saat fetch profil
        return rejectWithValue(e.response?.data || e.message);
      }
    }
  );

  export const topUpThunk = createAsyncThunk(
    "transaction/topup",
    async (_, { rejectWithValue }) => {
      try {
        const token = Cookies.get("token");
        const response = await topUp(_); // Panggil API untuk mendapatkan profil
        console.log("Profile Response:", response.data); // Log respons profil
        return response.data; 
      } catch (e) {
        console.log("Profile Fetch Error:", e); // Log error saat fetch profil
        return rejectWithValue(e.response?.data || e.message);
      }
    }
  );
  
 