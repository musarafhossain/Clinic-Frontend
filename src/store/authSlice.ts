import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "@/models";
import { STORAGE_KEYS } from "@/helpers/constant";

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
        localStorage.setItem(STORAGE_KEYS.JWT, action.payload.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(action.payload.user));
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
        localStorage.removeItem(STORAGE_KEYS.JWT);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    },
  },
});

export const { hydrateAuth, loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
