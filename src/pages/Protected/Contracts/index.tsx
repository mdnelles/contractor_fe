import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import { dia, epochToDate, msg } from "../../../utilities/gen";
import Chip from "@mui/material/Chip";
import TablePagination from "@mui/material/TablePagination";
import {
   color1,
   color2,
   color3,
   color4,
   color5,
} from "../../../constants/colors";
import { Rect } from "../../../widgets/Level/Rect";
import { ButtonGroup, Tooltip, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDialog } from "../../../features/dialog/dialogSlice";
import { setContracts } from "../../../features/contracts/contractsSlice";
import { setSnackbar } from "../../../features/snackbar/snackbarSlice";
import Legend from "../../../widgets/Legend";
import { updateDocById } from "../../../utilities/MongoRequest";

const nameSort = (arr: any) => {
   arr.sort((a: any, b: any) =>
      a.lastName > b.lastName
         ? 1
         : a.lastName < b.lastName
         ? -1
         : a.firstName > b.firstName
         ? 1
         : a.firstName < b.firstName
         ? -1
         : 0
   );
   return arr;
};

export default function (): JSX.Element {
   const dispatch = useDispatch();
   const users = useAppSelector((state) => state.users);
   const contracts = useAppSelector((state) => state.contracts);
   const session: any = useAppSelector((state) => state.session);
   const { userLevel, token } = session.user;
   const contractors = nameSort(
      users.arr.filter((u: any) => u.userLevel === 4)
   );
   const pickers = nameSort(users.arr.filter((u: any) => u.userLevel === 3));

   const [num, setNum] = React.useState<number>(session.user.homeStore);
   const [view, setView] = React.useState<string>("");
   const [rows, setRows] = React.useState<any[]>([]);
   const [rowsTotal, setRowsTotal] = React.useState<number>(0);
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);

   const handleChangeStage = (event: any, row: any) => {
      const val = event.target.value;
      const { _id } = row;

      const newContracts = { ...contracts };
      newContracts.arr = newContracts.arr.map((c: any) =>
         c._id === _id ? { ...c, stage: val } : c
      );

      dispatch(setContracts(newContracts));
      dispatch(setSnackbar(msg("Contract stage updated.", "success")));

      return true;
   };

   const handleChangeStore = (event: any) =>
      setNum(event.target.value as number);

   const handleChangePage = (event: any, newPage: number) => setPage(newPage);

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const handleChangeContractor = (event: any, row: any) => {
      const val = event.target.value;
      const { _id } = row;

      const newContracts = { ...contracts };
      newContracts.arr = newContracts.arr.map((c: any) =>
         c._id === _id ? { ...c, contractorId: val } : c
      );

      updateDocById("contract", _id, { contractorId: val }, token);

      dispatch(setContracts(newContracts));
      dispatch(
         setSnackbar(
            msg("New contractor has been assigned to this project", "warning")
         )
      );
   };

   const handleChangePicker = (event: any, row: any) => {
      const val = event.target.value;
      const { _id } = row;

      const newContracts = { ...contracts };
      newContracts.arr = newContracts.arr.map((c: any) =>
         c._id === _id ? { ...c, orderPickedBy: val } : c
      );

      updateDocById("contract", _id, { orderPickedBy: val }, token);

      dispatch(setContracts(newContracts));
      dispatch(
         setSnackbar(
            msg("New picker has been assigned to this project", "warning")
         )
      );
   };

   const btnView = (row: any) => {
      dispatch(
         setDialog(
            dia(true, `ViewContract`, "ViewContract", {
               row,
               table: "contract",
               uid: "_id",
            })
         )
      );
   };

   const btnEdit = (row: any) => {
      dispatch(
         setDialog(
            dia(true, `EditContract`, "EditContract", {
               row,
               table: "contract",
               uid: "_id",
               disabled: ["createdAt", "emailVarified"],
               hidden: ["authProvider"],
            })
         )
      );
   };

   useEffect(() => {
      try {
         setRows(
            contracts.arr
               .filter((c: any) => parseInt(c.homeStore) === num)
               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
         );
         setRowsTotal(
            contracts.arr.filter((c: any) => parseInt(c.homeStore) === num)
               .length
         );
      } catch (err) {
         console.log(err);
      }
   }, [num, view, page, rowsPerPage, contracts]);

   useEffect(() => {
      //console.log("users");
   }, [users]);

   return (
      <>
         <h3>Contracts</h3>
         <Grid container spacing={1}>
            {session.user.userLevel === 1 && (
               <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                     <InputLabel id='store-no'>Select Store</InputLabel>
                     <Select
                        size='small'
                        label='Select Store'
                        onChange={handleChangeStore}
                        value={num}
                     >
                        <MenuItem key={"all"} value={""}>
                           all stores
                        </MenuItem>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(
                           (i) => (
                              <MenuItem key={i} value={i}>
                                 {"store #" + i}
                              </MenuItem>
                           )
                        )}
                     </Select>
                  </FormControl>
               </Grid>
            )}

            <Grid item xs={12}>
               {rows && rows.length > 0 && rows[0] && (
                  <>
                     <Legend color={color1} label='New Order' num={1} />
                     <Legend color={color2} label='In Progress' num={2} />
                     <Legend color={color3} label='Ready for Pickup' num={3} />
                     <Legend color={color4} label='Picked Up' num={4} />
                     <Legend color={color5} label='Completed' num={5} />

                     <TableContainer component={Paper}>
                        <Table
                           stickyHeader
                           aria-label='sticky table'
                           size='small'
                        >
                           <TableHead>
                              <TableRow sx={{ p: 1 }}>
                                 {/* <TableCell>Job</TableCell> */}
                                 <TableCell>Task</TableCell>
                                 <TableCell>#</TableCell>
                                 <TableCell>Date</TableCell>
                                 <TableCell></TableCell>
                                 <TableCell></TableCell>
                                 <TableCell></TableCell>
                                 <TableCell></TableCell>
                              </TableRow>
                           </TableHead>

                           <TableBody>
                              {rows.map((row: any) => (
                                 <TableRow key={row._id}>
                                    {/* <TableCell sx={{ p: 1 }}>
                                          <Typography
                                             color='primary'
                                             gutterBottom
                                          >
                                             {row.jobTitle
                                                .toString()
                                                .replace("cards:", "")}
                                          </Typography>
                                       </TableCell> */}
                                    <TableCell sx={{ p: 1 }}>
                                       <Rect level={parseInt(row.stage)}>
                                          {row.task}
                                       </Rect>
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
                                                parseInt(row.stage) === 1
                                                   ? color1
                                                   : parseInt(row.stage) === 2
                                                   ? color2
                                                   : parseInt(row.stage) === 3
                                                   ? color3
                                                   : parseInt(row.stage) === 4
                                                   ? color4
                                                   : parseInt(row.stage) === 5
                                                   ? color5
                                                   : "inherit",
                                          }}
                                       />
                                       <ButtonGroup variant='text' size='small'>
                                          <Button onClick={() => btnView(row)}>
                                             <Tooltip title='View details'>
                                                <VisibilityIcon />
                                             </Tooltip>
                                          </Button>

                                          {(userLevel === 1 ||
                                             userLevel === 2) && (
                                             <>
                                                <Button
                                                   onClick={() => btnEdit(row)}
                                                   disabled={
                                                      row.isDisabled &&
                                                      row.isDisabled !== true
                                                   }
                                                >
                                                   <Tooltip title='Edit user'>
                                                      <EditIcon />
                                                   </Tooltip>
                                                </Button>
                                             </>
                                          )}
                                       </ButtonGroup>
                                    </TableCell>
                                    <TableCell sx={{ m: 0, p: 0 }}>
                                       <FormControl sx={{ m: 0, p: 0 }}>
                                          <InputLabel size='small'>
                                             Stage
                                          </InputLabel>
                                          <Select
                                             label='Stage'
                                             onChange={(event) =>
                                                handleChangeStage(event, row)
                                             }
                                             defaultValue={row.stage}
                                             size='small'
                                             sx={{
                                                width: 60,
                                                height: 28,
                                                fontSize: 13,
                                             }}
                                          >
                                             <MenuItem
                                                value={1}
                                                autoFocus={
                                                   parseInt(row.stage) === 1
                                                }
                                             >
                                                1
                                             </MenuItem>
                                             <MenuItem
                                                value={2}
                                                autoFocus={
                                                   parseInt(row.stage) === 2
                                                }
                                             >
                                                2
                                             </MenuItem>
                                             <MenuItem
                                                value={3}
                                                autoFocus={
                                                   parseInt(row.stage) === 3
                                                }
                                             >
                                                3
                                             </MenuItem>
                                             <MenuItem
                                                value={4}
                                                autoFocus={
                                                   parseInt(row.stage) === 4
                                                }
                                             >
                                                4
                                             </MenuItem>
                                             <MenuItem
                                                value={5}
                                                autoFocus={
                                                   parseInt(row.stage) === 5
                                                }
                                             >
                                                5
                                             </MenuItem>
                                          </Select>
                                       </FormControl>
                                    </TableCell>
                                    <TableCell sx={{ m: 0, p: 0 }}>
                                       <FormControl sx={{ m: 0, p: 0 }}>
                                          <InputLabel size='small'>
                                             Contractor
                                          </InputLabel>
                                          <Select
                                             defaultValue={row.contractorId}
                                             label='contractor'
                                             onChange={(event) =>
                                                handleChangeContractor(
                                                   event,
                                                   row
                                                )
                                             }
                                             size='small'
                                             sx={{
                                                minWidth: 140,
                                                height: 28,
                                                fontSize: 13,
                                             }}
                                          >
                                             {rowsTotal < 1 ? (
                                                <></>
                                             ) : (
                                                contractors.map((user: any) => (
                                                   <MenuItem
                                                      autoFocus={
                                                         row.contractorId ===
                                                         user._id
                                                      }
                                                      key={user._id}
                                                      value={user._id}
                                                   >
                                                      {user.firstName}{" "}
                                                      {user.lastName}
                                                   </MenuItem>
                                                ))
                                             )}
                                          </Select>
                                       </FormControl>
                                    </TableCell>
                                    <TableCell sx={{ m: 0, p: 0 }}>
                                       <FormControl sx={{ m: 0, p: 0 }}>
                                          <InputLabel size='small'>
                                             Picker
                                          </InputLabel>
                                          <Select
                                             defaultValue={row.orderPickedBy}
                                             label='Picker'
                                             onChange={(event) =>
                                                handleChangePicker(event, row)
                                             }
                                             size='small'
                                             sx={{
                                                minWidth: 140,
                                                height: 28,
                                                fontSize: 13,
                                             }}
                                          >
                                             {rowsTotal < 1 ? (
                                                <></>
                                             ) : (
                                                pickers.map((user: any) => (
                                                   <MenuItem
                                                      autoFocus={
                                                         row.orderPickedBy ===
                                                         user._id
                                                      }
                                                      key={user._id}
                                                      value={user._id}
                                                   >
                                                      {user.firstName}{" "}
                                                      {user.lastName}
                                                   </MenuItem>
                                                ))
                                             )}
                                          </Select>
                                       </FormControl>
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TableContainer>
                     <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component='div'
                        count={rowsTotal}
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
