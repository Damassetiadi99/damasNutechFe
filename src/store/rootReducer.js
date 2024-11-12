import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/auth/index"
import serviceReducer from './slice/services/index'
import transactionReducer from './slice/transactions/index'
import accountReducer from './slice/account/index'

const appReducer = combineReducers({
    auth: authReducer,
    services : serviceReducer,
    transaction : transactionReducer,
    account : accountReducer
  });
  const reducer = (state, action) => appReducer(state, action);
  
  export default reducer;