import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Arr {
   id: number;
   title: string;
   date: string;
   code: string;
}

export interface SuggestState {
   arr: Arr[];
}

const initialState: SuggestState = {
   arr: [],
};

export const suggestSlice = createSlice({
   name: "suggest",
   initialState,

   reducers: {
      setSuggest: (state, action: PayloadAction<any>) => {
         try {
            state.arr = action.payload.arr;
         } catch (error) {
            console.log(error);
         }
      },
      clearSuggest: (state) => initialState,
   },
});

export const { setSuggest, clearSuggest } = suggestSlice.actions;

export const selectSuggest = (state: RootState) => state.suggest;

export default suggestSlice.reducer;
