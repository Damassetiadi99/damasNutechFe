import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/auth/index"
import serviceReducer from './slice/services/index'
import transactionReducer from './slice/transactions/index'
// import paymentReducer from

const appReducer = combineReducers({
    auth: authReducer,
    services : serviceReducer,
    transaction : transactionReducer
  });
  const reducer = (state, action) => appReducer(state, action);
  
  export default reducer;