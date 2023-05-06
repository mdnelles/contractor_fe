import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import { epochToDate } from "../../../utilities/gen";

export default function (): JSX.Element {
   const users = useAppSelector((state) => state.users);
   const contracts = useAppSelector((state) => state.contracts);
   const session = useAppSelector((state) => state.session);
   const dispatch = useAppDispatch();

   const [num, setNum] = React.useState<number>(10);
   const [view, setView] = React.useState<string>("");
   const [rows, setRows] = React.useState<any[]>([]);
   const [perPage, setPerPage] = React.useState<number>(10);
   const [currentPage, setCurrentPage] = useState(1);

   const handleChangeStore = (event: any) =>
      setNum(event.target.value as number);
   const handleChangeView = (event: any) =>
      setView(event.target.value as string);

   useEffect(() => {
      setRows(
         view === "members"
            ? users.arr.filter((u: any) => u.homeStore === num)
            : contracts.arr.filter((c) => c.homeStore === num)
      );
   }, [num, view]);

   useEffect(() => {
      console.log("rows", rows);
   }, [rows]);

   return (
      <>
         <h3>Stores</h3>
         <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
               <FormControl fullWidth>
                  <InputLabel id='store-no'>Store Num</InputLabel>
                  <Select
                     size='small'
                     label='Store Number'
                     onChange={handleChangeStore}
                     value={num}
                  >
                     <MenuItem key={"all"} value={""}>
                        all stores
                     </MenuItem>
                     {Array.from({ length: 62 }, (_, i) => i + 10).map((i) => (
                        <MenuItem key={i} value={i}>
                           {"store #" + i}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
               <FormControl fullWidth>
                  <InputLabel id='view-no'>View</InputLabel>
                  <Select
                     size='small'
                     label='View'
                     onChange={handleChangeView}
                     value={view}
                  >
                     <MenuItem key={"members"} value={"members"}>
                        members
                     </MenuItem>
                     <MenuItem key={"contracts"} value={"contracts"}>
                        contracts
                     </MenuItem>
                  </Select>
               </FormControl>
            </Grid>
            <Grid item xs={12}>
               {rows && rows.length > 0 && rows[0] && (
                  <TableContainer component={Paper}>
                     <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                           <TableRow>
                              <TableCell>Job</TableCell>
                              <TableCell>Task</TableCell>
                              <TableCell>store</TableCell>
                              <TableCell>date</TableCell>
                              <TableCell>Action</TableCell>
                           </TableRow>
                        </TableHead>

                        <TableBody>
                           {rows.map((row: any) => (
                              <TableRow key={row._id}>
                                 <TableCell>{row.jobTitle}</TableCell>
                                 <TableCell>{row.task}</TableCell>
                                 <TableCell>{row.store}</TableCell>
                                 <TableCell>
                                    {epochToDate(parseInt(row.createdAt))}
                                 </TableCell>
                                 <TableCell>{row.createdAt}</TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </TableContainer>
               )}
            </Grid>
         </Grid>
      </>
   );
}
