import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PageState } from "./page";

const initialState: PageState = {
   current: undefined,
   title: undefined,
   body: undefined,
   toggle: false,
};

export const pageSlice = createSlice({
   name: "page",
   initialState,
   // The `reducers` field lets us define reducers and generate associated actions
   reducers: {
      setPage: (state, action: PayloadAction<PageState>) => {
         const o: PageState = action.payload;

         try {
            state.current = o.current;
            state.title = o.title;
            state.body = o.title;
            state.toggle = o.toggle;
         } catch (error) {
            console.log(error);
         }
      },
      clearPage: (state) => {
         state.current = undefined;
         state.title = undefined;
         state.body = undefined;
      },
      // Use the PayloadAction type to declare the contents of `action.payload`
   },
});

export const { setPage, clearPage } = pageSlice.actions;

export const selectPage = (state: RootState) => state.page;

export default pageSlice.reducer;
