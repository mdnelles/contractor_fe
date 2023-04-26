import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { SnackbarState } from "./snackbar";

const initialState: SnackbarState | any = {
  alert: { msg: "Welcome", severity: "info" },
  open: false,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action: PayloadAction<any>) => {
      const { msg = "", severity = "info", open = true } = action.payload;
      // repeat blocker
      if (
        state.alert.msg !== msg ||
        state.alert.severity !== severity ||
        state.open !== open
      ) {
        state.alert = { msg, severity };
        state.open = open;
      }
    },
    clearSnackbar: (state) => initialState,
  },
});

export const { setSnackbar, clearSnackbar } = snackbarSlice.actions;

export const selectSnackbar = (state: RootState) => state.snackbar.value;

export default snackbarSlice.reducer;
