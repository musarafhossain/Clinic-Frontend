import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "@/models";

interface AuthState {
  user: UserModel | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  hydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: true,
  error: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth(
      state,
      action: PayloadAction<{ user: UserModel | null; token: string | null }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.hydrated = true;
      state.loading = false;
    },

    loginStart(state) {
      state.loading = true;
      state.error = null;
    },

    loginSuccess(
      state,
      action: PayloadAction<{ user: UserModel; token: string }>
    ) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.user = null;
      state.token = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { hydrateAuth, loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
