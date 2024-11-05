import { createSlice } from '@reduxjs/toolkit';
import { getBannerThunk, getServiceThunk, getBalanceThunk } from "../../action/services";

const initialState = {
    getBanner: {},
    isgetBannerSucces: false,
    isgetBannerLoading: false,
    getBannerError: {},

    getService: {},
    services: [],
    isgetServiceSucces: false,
    isgetServiceLoading: false,
    getServiceError: {},
    selectedService: null,

    getBalance: {},
    isgetBalanceSucces: false,
    isgetBalanceLoading: false,
    isBalanceError: {},
    
};

export const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
      setSelectedService: (state, action) => {
        state.selectedService = action.payload;  // Menyimpan layanan yang dipilih
      },
      resetSelectedService: (state) => {
        state.selectedService = null;  // Menghapus data layanan yang dipilih
      },
    },
    extraReducers: (builder) => {
      builder
        // Handling getBannerThunk cases
        .addCase(getBannerThunk.fulfilled, (state, action) => {
          state.isgetBannerLoading = false;
          state.getBanner = action.payload;
          state.isgetBannerSucces = true;
        })
        .addCase(getBannerThunk.pending, (state) => {
          state.isgetBannerLoading = true;
          state.isgetBannerSucces = false;
        })
        .addCase(getBannerThunk.rejected, (state, action) => {
          state.isgetBannerLoading = false;
          state.getBannerError = action.payload;
          state.isgetBannerSucces = false;
        })
        
        // Handling getServiceThunk cases
        .addCase(getServiceThunk.fulfilled, (state, action) => {
          state.isgetServiceLoading = false;
          state.getService = action.payload;
          state.isgetServiceSucces = true;
        })
        .addCase(getServiceThunk.pending, (state) => {
          state.isgetServiceLoading = true;
          state.isgetServiceSucces = false;
        })
        .addCase(getServiceThunk.rejected, (state, action) => {
          state.isgetServiceLoading = false;
          state.getServiceError = action.payload;
          state.isgetServiceSucces = false;
        })
        
        
        // Handling getBalanceThunk cases
        .addCase(getBalanceThunk.fulfilled, (state, action) => {
          state.isgetBalanceLoading = false;
          state.getBalance = action.payload;
          state.isgetBalanceSucces = true;
        })
        .addCase(getBalanceThunk.pending, (state) => {
          state.isgetBalanceLoading = true;
          state.isgetBalanceSucces = false;
        })
        .addCase(getBalanceThunk.rejected, (state, action) => {
          state.isgetBalanceLoading = false;
          state.isBalanceError = action.payload;
          state.isgetBalanceSucces = false;
        });
    },
});
export const { setSelectedService, resetSelectedService } = serviceSlice.actions;
export default serviceSlice.reducer;
