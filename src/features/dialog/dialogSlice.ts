import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { DialogState } from "./dialog";

const initialState: DialogState = {
   open: false,
   title: "",
   content: "",
   params: {},
};

export const dialogSlice = createSlice({
   name: "dialog",
   initialState,
   reducers: {
      setDialog: (state, action: PayloadAction<any>) => {
         const {
            open = false,
            title = "",
            content = "",
            params = {},
         } = action.payload;

         try {
            state.open = open;
            state.title = title;
            state.content = content;
            state.params = params;
         } catch (error) {
            console.log(error);
         }
      },
      clearDialog: (state) => initialState,
      // Use the PayloadAction type to declare the contents of `action.payload`
   },
});

export const { setDialog, clearDialog } = dialogSlice.actions;

export const selectDialog = (state: RootState) => state.dialog;

export default dialogSlice.reducer;
