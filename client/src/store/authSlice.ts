import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: localStorage.getItem('status')=="true",
    token: localStorage.getItem('token')
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state,action)=>{
            state.status = true;
            state.token = action.payload.token;
        },
        logout: (state)=>{
            state.status = false;
            state.token = ''
        }
    }
})

export const {login,logout} = authSlice.actions;


export default authSlice.reducer;