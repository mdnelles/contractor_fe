import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UsersState } from "./users";

const initialState: UsersState = {
   arr: [],
   init: false,
};

export const usersSlice = createSlice({
   name: "users",
   initialState,

   reducers: {
      setUsers: (state, action: PayloadAction<any>) => {
         try {
            state.arr = action.payload.arr;
            state.init = action.payload.init;
         } catch (error) {
            console.log(error);
         }
      },
      clearUsers: (state) => initialState,
   },
});

export const { setUsers, clearUsers } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
