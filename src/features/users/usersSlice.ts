import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UsersState } from "./users";

const initialState: UsersState = {
   arr: [],
};

export const usersSlice = createSlice({
   name: "users",
   initialState,

   reducers: {
      setUsers: (state, action: PayloadAction<any>) => {
         try {
            state.arr = action.payload.arr || action.payload;
         } catch (error) {
            console.log(error);
         }
      },
      clearUsers: () => initialState,
   },
});

export const { setUsers, clearUsers } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
