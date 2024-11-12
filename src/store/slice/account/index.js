import { createSlice } from '@reduxjs/toolkit';
import { updateProfileDataThunk,updateProfileImageThunk } from '../../action/account';

const initialState = {
    updateData: {},
    isUpdateDataSucces: false,
    isUpdateDataLoading: false,
    isUpdateDataError: {},

    updateImage : {},
    isUpdateImageSucces : false,
    isUpdateImageLoading : false,
    isUpdateImageError : {},
};
export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(updateProfileDataThunk.fulfilled, (state, action) => {
          state.isUpdateDataLoading = false;
          state.updateData = action.payload;
          state.isUpdateDataSucces = true;
        })
        .addCase(updateProfileDataThunk.pending, (state) => {
          state.isUpdateDataLoading = true;
          state.isUpdateDataSucces = false;
        })
        .addCase(updateProfileDataThunk.rejected, (state, action) => {
          state.isUpdateDataLoading = false;
          state.isUpdateDataError = action.payload;
          state.isUpdateDataSucces = false;
        })
        .addCase(updateProfileImageThunk.fulfilled, (state, action) => {
          state.isUpdateImageLoading = false;
          state.updateImage = action.payload;
          state.isUpdateImageSucces = true;
        })
        .addCase(updateProfileImageThunk.pending, (state) => {
          state.isUpdateImageLoading = true;
          state.isUpdateImageSucces = false;
        })
        .addCase(updateProfileImageThunk.rejected, (state, action) => {
          state.isUpdateImageLoading = false;
          state.isUpdateImageError = action.payload;
          state.isUpdateImageSucces = false;
        })
        
    },
});

export default accountSlice.reducer;
