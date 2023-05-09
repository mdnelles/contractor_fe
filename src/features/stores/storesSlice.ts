import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { StoresState } from "./stores";

const initialState: StoresState | any = { arr: [] };

export const storesSlice = createSlice({
   name: "stores",
   initialState,
   reducers: {
      setStores: (state, action: PayloadAction<any>) => {
         state.arr = action.payload.arr || action.payload;
      },
      clearStores: () => initialState,
   },
});

export const { setStores, clearStores } = storesSlice.actions;

export const selectStores = (state: RootState) => state.stores.value;

export default storesSlice.reducer;
