import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState: null,
    reducers:{
        addUser : (state,action) =>{
             return  action.payload;
        },
        removeUser : (state) =>{
            console.log('remove called')
            return null;
        }
    }
})
export const {addUser , removeUser} = userSlice.actions;

export default userSlice.reducer;
