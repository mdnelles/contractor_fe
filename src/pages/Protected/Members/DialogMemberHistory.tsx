import Box from "@mui/material/Box";
import React, { useEffect, useRef, useState } from "react";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { setUsers } from "../../../features/users/usersSlice";
import { setDialog } from "../../../features/dialog/dialogSlice";
import { UserObj, UsersState } from "../../../features/users/users";
import { dia, rand } from "../../../utilities/gen";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

interface UseEditProps {
   params: {
      row: any;
      table: string;
      uid: any;
      hidden: string[];
      disabled: string[];
   };
}

export default function DialogMemberHistory(props: UseEditProps): JSX.Element {
   const { register, handleSubmit } = useForm();
   const {
      row,
      table = "",
      uid = "",
      hidden = [""],
      disabled = [""],
   } = props.params;

   return (
      <Container component='main' maxWidth='lg' sx={{ padding: 3 }}>
         <AppBar position='static' enableColorOnDark>
            <Toolbar>
               <Typography
                  variant='h6'
                  component='div'
                  sx={{ flexGrow: 1, paddingLeft: 1 }}
               >
                  User History
               </Typography>
            </Toolbar>
         </AppBar>
         <div style={{ padding: 5 }} />
         <Paper
            sx={{
               width: "100%",
               overflow: "hidden",
               minHeight: 300,
               minWidth: 300,
            }}
         >
            User: {row.firstName} {row.lastName} has no history
         </Paper>
      </Container>
   );
}
