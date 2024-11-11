import { createAction ,createAsyncThunk } from "@reduxjs/toolkit";
import { getTransactionH , topUp, Transactions} from "../../../service/transaction/index";
import Cookies from "js-cookie";

  export const getTransactionhThunk = createAsyncThunk(
    "transaction/getTransaction",
    async (_, { rejectWithValue }) => {
      try {
        const token = Cookies.get("token");
        const response = await getTransactionH(token); // Panggil API untuk mendapatkan profil
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
        return response.data; 
      } catch (e) {
        console.log("Profile Fetch Error:", e); // Log error saat fetch profil
        return rejectWithValue(e.response?.data || e.message);
      }
    }
  );

  export const postTransactionThunk = createAsyncThunk(
    'transaction/postTransaction',
    async (transactionData, { rejectWithValue }) => {
      try {
        const response = await Transactions(transactionData);
        return response;
        console.log(response)
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
