import { createSlice } from "@reduxjs/toolkit";
const initialAuthState={isAuthenticate: false}

const authSlice = createSlice(
    {
        name:'authentication',
        initialState:initialAuthState,
        reducers :{
            login(state)
            {
                state.isAuthenticate=true;

            },
            logout(state)
            {
                state.isAuthenticate=false;
            }
        }
    }
    
)
export const authAction = authSlice.actions
export default authSlice.reducer;