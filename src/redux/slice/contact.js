import { createSlice } from "@reduxjs/toolkit";
import { contactApi } from "../../mockes/contact";
const initialState = {
    contact:[]
};
const slice = createSlice({
    name:"contacts",
    initialState,
    reducers:{
getContacts(state,action){
    if(action.payload)
        state.contact=action.payload;
    else
    state.contact ={}
},
createContact(state,action){
    state.contact = [action.payload,...state.contact]
},
updateContact(state,action){
    let data = action.payload
state.contact = {...state.contact, ...data}
}
    }
});
export const {reducer} =slice;

export const getContacts =()=>async(dispatch)=>{
    try {
        const res = await contactApi.getContacts()
        if(res){
            await dispatch(slice.actions.getContacts(res))
            return res;
        }
        else{
            return false;
        }
        
    } catch (error) {
        
    }
}
export const createContact =(data)=>async(dispatch)=>{
    try {
        const res = await contactApi.createContacts(data)
        if(res){
            await dispatch(slice.actions.createContact(res));
            return res;
        }
        else{
            return false;
        }
    } catch (error) {
       console.log(error); 
    }
}
export const updateContact = (data,id)=> async (dispatch) =>{
    const result = await contactApi.updateContact(data,id);
    console.log(result);
    if(result){
        await dispatch(slice.actions.updateContact(result))
        return true
    }
    return false
    
}

