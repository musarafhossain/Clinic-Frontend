import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: number;
    name: string | null;
    email: string;
    phone: string | null;
    created_at: string;
    updated_at: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const userFromStorage: User | null =
    typeof window !== "undefined" && localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null;

const tokenFromStorage: string | null =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialState: AuthState = {
    user: userFromStorage,
    token: tokenFromStorage,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
