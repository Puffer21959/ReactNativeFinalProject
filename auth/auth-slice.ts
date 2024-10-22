import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-toolkit/store";

interface AuthState {
  isLoading: boolean;
  profile: any | null;
  gallery: any | null;
  currentUser: string | null;
  shopStatus: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  profile: null,
  gallery: null,
  currentUser: null,
  shopStatus: false,
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

    setGallery(state, action: PayloadAction<any | null>) {
      state.gallery = action.payload;
    },

    setCurrentUser(state, action: PayloadAction<any | null>) {
      state.currentUser = action.payload;
    },
    setShopStatus(state, action: PayloadAction<any | null>) { 
      state.shopStatus = action.payload;
    },
  },
});

export const { setIsLoading, setProfile, setGallery, setCurrentUser, setShopStatus } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.authState;

export default authSlice.reducer;
