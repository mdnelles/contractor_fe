import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import InfoIcon from "@mui/icons-material/Info";
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
import Chip from "@mui/material/Chip";
import TablePagination from "@mui/material/TablePagination";
import {
   color1,
   color2,
   color3,
   color4,
   color5,
} from "../../../constants/colors";

export default function (): JSX.Element {
   const users = useAppSelector((state) => state.users);
   const contracts = useAppSelector((state) => state.contracts);
   const session = useAppSelector((state) => state.session);

   const [num, setNum] = React.useState<number>(10);
   const [view, setView] = React.useState<string>("");
   const [rows, setRows] = React.useState<any[]>([]);
   const [selected, setSelected] = React.useState<readonly string[]>([]);
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);

   const handleChangeStore = (event: any) =>
      setNum(event.target.value as number);
   const handleChangeView = (event: any) =>
      setView(event.target.value as string);

   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   useEffect(() => {
      try {
         setRows(
            view === "members"
               ? users.arr.filter((u: any) => u.homeStore === num)
               : contracts.arr.filter((c) => c.homeStore === num)
         );
      } catch (err) {
         console.log(err);
      }
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
                  <>
                     <Chip
                        label='New Order'
                        sx={{ backgroundColor: color1, m: 0.5 }}
                     />
                     <Chip
                        label='Picked Order'
                        sx={{ backgroundColor: color2, m: 0.5 }}
                     />
                     <Chip
                        label='Order Delivered'
                        sx={{ backgroundColor: color3, m: 0.5 }}
                     />
                     <Chip
                        label='Work Started'
                        sx={{ backgroundColor: color4, m: 0.5 }}
                     />
                     <Chip
                        label='Life Cylce Complete'
                        sx={{ backgroundColor: color5, m: 0.5 }}
                     />
                     <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                           <TableHead>
                              <TableRow sx={{ p: 1 }}>
                                 <TableCell>Job</TableCell>
                                 <TableCell>Task</TableCell>
                                 <TableCell>Store</TableCell>
                                 <TableCell>Date</TableCell>
                                 <TableCell>Action</TableCell>
                              </TableRow>
                           </TableHead>

                           <TableBody>
                              {rows.map((row: any) => (
                                 <TableRow key={row._id}>
                                    <TableCell sx={{ p: 1 }}>
                                       {row.jobTitle
                                          .toString()
                                          .replace("cards:", "")}
                                    </TableCell>
                                    <TableCell sx={{ p: 1 }}>
                                       {row.task}
                                    </TableCell>
                                    <TableCell sx={{ p: 1 }}>
                                       {row.homeStore}
                                    </TableCell>
                                    <TableCell sx={{ p: 1 }}>
                                       {epochToDate(parseInt(row.createdAt))}
                                    </TableCell>
                                    <TableCell sx={{ p: 1 }}>
                                       <Chip
                                          label={row.stage}
                                          sx={{
                                             mr: 1,
                                             backgroundColor:
                                                row.stage === 1
                                                   ? color1
                                                   : row.stage === 2
                                                   ? color2
                                                   : row.stage === 3
                                                   ? color3
                                                   : row.stage === 4
                                                   ? color4
                                                   : row.stage === 5
                                                   ? color5
                                                   : "inherit",
                                          }}
                                       />
                                       <Button variant='contained' size='small'>
                                          Update
                                       </Button>
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TableContainer>
                     <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component='div'
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                     />
                  </>
               )}
            </Grid>
         </Grid>
      </>
   );
}
