import { combineReducers } from "@reduxjs/toolkit";
import  {reducer as contactReducer} from "../slice/contact"
export const rootReducer = combineReducers({
   contact:contactReducer
})