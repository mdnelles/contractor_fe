import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { MenuState } from "./menu";

const initialState: MenuState = {
   liveMenu: undefined,
   compactMenu: false,
};

export const menuSlice = createSlice({
   name: "menu",
   initialState,
   reducers: {
      setMenu: (state, action: PayloadAction<MenuState>) => {
         const o: MenuState = action.payload;
         try {
            state.liveMenu = o.liveMenu;
            state.compactMenu = o.compactMenu;
         } catch (error) {
            console.log(error);
         }
      },
      clearMenu: (state) => {
         state.liveMenu = undefined;
         state.compactMenu = false;
      },
      // Use the PayloadAction type to declare the contents of `action.payload`
   },
});

export const { setMenu, clearMenu } = menuSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.Menu.value)`
export const selectMenu = (state: RootState) => state.menu || initialState;

export default menuSlice.reducer;
