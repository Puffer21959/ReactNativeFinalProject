import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-toolkit/store";

interface AuthState {
  isLoading: boolean;
  profile: any | null;
  IP: string | null;
  currentUser: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  profile: null,
  IP: null,
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<any | null>) {
      state.isLoading = action.payload;
    },

    setProfile(state, action: PayloadAction<any | null>) {
      state.profile = action.payload;
    },

    setIP(state, action: PayloadAction<any | null>) {
      state.IP = action.payload;
    },

    setCurrentUser(state, action: PayloadAction<any | null>) {
      state.currentUser = action.payload;
    },
  },
});

export const { setIsLoading, setProfile, setIP, setCurrentUser } =
  authSlice.actions;

export const selectAuthState = (state: RootState) => state.authState;

export default authSlice.reducer;
