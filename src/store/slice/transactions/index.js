import { createSlice } from '@reduxjs/toolkit';
import { getTransactionhThunk ,topUpThunk } from "../../action/transaction";

const initialState = {
    getTransactionH: {},
    isgetTransactionHSuccess: false,
    isgetTransactionsHLoading: false,
    isgetTransactionHError: {},

    postTopup : {},
    istopUpLoading : false,
    istopUpSucces : false,
    istopUpError : {}
    
};

export const serviceSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Handling getTransactionhThunk cases
        .addCase(getTransactionhThunk.fulfilled, (state, action) => {
          state.isgetTransactionsHLoading = false;
          state.getTransactionH = action.payload;
          state.isgetTransactionHSuccess = true;
        })
        .addCase(getTransactionhThunk.pending, (state) => {
          state.isgetTransactionsHLoading = true;
          state.isgetTransactionHSuccess = false;
        })
        .addCase(getTransactionhThunk.rejected, (state, action) => {
          state.isgetTransactionsHLoading = false;
          state.isgetTransactionHError = action.payload;
          state.isgetTransactionHSuccess = false;
        })
        .addCase(topUpThunk.fulfilled, (state, action) => {
          state.istopUpLoading = false;
          state.postTopup = action.payload;
          state.istopUpSucces = true;
        })
        .addCase(topUpThunk.pending, (state) => {
          state.istopUpLoading = true;
          state.istopUpSucces = false;
        })
        .addCase(topUpThunk.rejected, (state, action) => {
          state.isgetTransactionsHLoading = false;
          state.istopUpError = action.payload;
          state.istopUpSucces = false;
        })
        
    },
});

export default serviceSlice.reducer;
