import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-toolkit/store";

interface AuthState {
  profile: any | null;
  IP: string | null;
  currentUser: string | null;
  shopStatus: boolean;
  cart: any | null;
}

const initialState: AuthState = {
  profile: null,
  IP: null,
  currentUser: null,
  shopStatus: false,
  cart: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<any | null>) {
      state.profile = action.payload;
    },

    setIP(state, action: PayloadAction<any | null>) {
      state.IP = action.payload;
    },

    setCurrentUser(state, action: PayloadAction<any | null>) {
      state.currentUser = action.payload;
    },
    setShopStatus(state, action: PayloadAction<any | null>) { 
      state.shopStatus = action.payload;
    },
    setCart(state, action: PayloadAction<any | null>) {
      state.cart.push(action.payload);
    },
  },
});


export const { setProfile, setIP, setCurrentUser,setShopStatus,setCart } =
  authSlice.actions;


export const selectAuthState = (state: RootState) => state.authState;

export default authSlice.reducer;
