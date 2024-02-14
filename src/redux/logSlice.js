import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        signIn(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        signOut(state) {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const { signIn, signOut } = logSlice.actions;
export default logSlice.reducer;
