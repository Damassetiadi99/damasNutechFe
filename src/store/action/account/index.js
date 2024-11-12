import { createAction ,createAsyncThunk } from "@reduxjs/toolkit";
import { updateProfileData,updateProfileImage } from "../../../service/account";
// import Cookies from "js-cookie";

  export const updateProfileDataThunk = createAsyncThunk(
    "auth/updateProfileData",
    async (data, { rejectWithValue }) => {
      try {
        // const token = Cookies.get("token");
        const response = await updateProfileData(data); // Panggil API untuk mendapatkan profil
        return response.data; // Pastikan mengembalikan data yang benar
      } catch (e) {
        console.log("Profile Fetch Error:", e); // Log error saat fetch profil
        return rejectWithValue(e.response?.data || e.message);
      }
    }
  );
  
  export const updateProfileImageThunk = createAsyncThunk(
    "auth/updateProfileImage",
    async (imageFile, { rejectWithValue }) => {
      try {
        // const token = Cookies.get("token");
        const response = await updateProfileImage(imageFile); // Panggil API untuk mendapatkan profil
        return response.data; // Pastikan mengembalikan data yang benar
      } catch (e) {
        console.log("Profile Fetch Error:", e); // Log error saat fetch profil
        return rejectWithValue(e.response?.data || e.message);
      }
    }
  );