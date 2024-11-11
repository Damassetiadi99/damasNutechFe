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
    istopUpError : {},
    
    postTransactions : {},
    isTransactionsLoading : false,
    isTransactionsSucces : false,
    isTransactionError : {}
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
        // .addCase(transactionsThunk.rejected, (state, action) => {
        //   state.isTransactionsLoading = false;
        //   state.isTransactionsSucces = action.payload;
        //   state.isTransactionsSucces = false;
        // }) .addCase(transactionsThunk.fulfilled, (state, action) => {
        //   state.isTransactionsLoading = false;
        //   state.postTopup = action.payload;
        //   state.isTransactionsSucces = true;
        // })
        // .addCase(transactionsThunk.pending, (state) => {
        //   state.isTransactionsLoading = true;
        //   state.isTransactionsSucces = false;
        // })
        // .addCase(transactionsThunk.rejected, (state, action) => {
        //   state.isTransactionsLoading = false;
        //   state.isTransactionError = action.payload;
        //   state.isTransactionsSucces = false;
        // })
        
    },
});

export default serviceSlice.reducer;
