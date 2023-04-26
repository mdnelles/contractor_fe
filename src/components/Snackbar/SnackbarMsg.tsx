import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import { SnackbarState } from "../../features/snackbar/snackbar";
import { setSnackbar } from "../../features/snackbar/snackbarSlice";

export default function SnackbarMsg() {
  const dispatch = useAppDispatch();
  const snackbar: SnackbarState = useAppSelector((state) => state.snackbar);
  const { severity, msg } = snackbar.alert;

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackbar({ ...snackbar, open: false }));
  };

  setTimeout(() => {
    dispatch(setSnackbar({ ...snackbar, open: false }));
  }, 6000);

  useEffect(() => {
    //console.log("UE inside snack");
  }, [snackbar]);

  return (
    <Snackbar
      open={snackbar.open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity} sx={{ width: "100%" }} variant="filled">
        {msg}
      </Alert>
    </Snackbar>
  );
}
