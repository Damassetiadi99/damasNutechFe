import { submitRegisterThunk, submitLoginThunk,getProfileThunk} from "../../action/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    register : {},
    isRegisterSuccess : false,
    isLoadingRegister : false,
    registerError : {},

    login : {},
    isLoginSuccess : false,
    isLoadingLogin : false,
    loginError : {},

    getProfile : {},
    isgetProfileSuccess : false ,
    isLoadinggetProfile : false,
    getProfileError : {}

}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(submitRegisterThunk.fulfilled, (state, action) => {
          state.isLoadingRegister = false;
          state.register = action.payload;
          state.isRegisterSuccess = true;
        })
        .addCase(submitRegisterThunk.pending, (state) => {
          state.isLoadingRegister = true;
          state.isRegisterSuccess = false;
        })
        .addCase(submitRegisterThunk.rejected, (state, action) => {
          state.isLoadingRegister = false;
          state.registerError = action.payload;
          state.isRegisterSuccess = false;
        })
        .addCase(submitLoginThunk.fulfilled, (state, action) => {
          state.isLoadingLogin = false;
          state.login = action.payload;
          state.isLoginSuccess = true;
        })
        .addCase(submitLoginThunk.pending, (state) => {
          state.isLoadingLogin = true;
          state.isLoginSuccess = false;
        })
        .addCase(submitLoginThunk.rejected, (state, action) => {
          state.isLoadingLogin = false;
          state.loginError = action.payload;
          state.isLoginSuccess = false;
        })
        .addCase(getProfileThunk.fulfilled, (state, action) => {
          state.isLoadinggetProfile = false;
          state.getProfile = action.payload;
          state.isgetProfileSuccess = true;
        })
        .addCase(getProfileThunk.pending, (state) => {
          state.isLoadinggetProfile = true;
          state.isgetProfileSuccess = false;
        })
        .addCase(getProfileThunk.rejected, (state, action) => {
          state.isLoadinggetProfile = false;
          state.getProfileError = action.payload;
          state.isgetProfileSuccess = false;
        })
        
    },
  });
  export default authSlice.reducer;