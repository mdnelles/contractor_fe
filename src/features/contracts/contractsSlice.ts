import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ContractsState } from "./contracts";

const initialState: ContractsState = {
   arr: [],
   init: false,
};

export const contractsSlice = createSlice({
   name: "contracts",
   initialState,

   reducers: {
      setContracts: (state, action: PayloadAction<any>) => {
         try {
            state.arr = action.payload.arr || action.payload;
            state.init = action.payload.init;
         } catch (error) {
            console.log(error);
         }
      },
      clearContracts: (state) => initialState,
   },
});

export const { setContracts, clearContracts } = contractsSlice.actions;

export const selectContracts = (state: RootState) => state.contracts;

export default contractsSlice.reducer;
