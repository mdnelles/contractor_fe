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
import InfoIcon from "@mui/icons-material/Info";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Paper from "@mui/material/Paper";
import { dia, epochToDate } from "../../../utilities/gen";
import Chip from "@mui/material/Chip";
import TablePagination from "@mui/material/TablePagination";
import {
   color1,
   color2,
   color3,
   color4,
   color5,
} from "../../../constants/colors";
import { Level } from "../../../widgets/Level";
import { Rect } from "../../../widgets/Level/Rect";
import { ButtonGroup, Tooltip, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDialog } from "../../../features/dialog/dialogSlice";

export default function (): JSX.Element {
   const dispatch = useDispatch();
   const users = useAppSelector((state) => state.users);
   const contracts = useAppSelector((state) => state.contracts);
   const session: any = useAppSelector((state) => state.session);
   const { userLevel } = session.user;

   const [num, setNum] = React.useState<number>(1);
   const [view, setView] = React.useState<string>("");
   const [rows, setRows] = React.useState<any[]>([]);
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);

   const handleChange = (event: SelectChangeEvent) => {
      //
   };

   const handleChangeStore = (event: any) =>
      setNum(event.target.value as number);

   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
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
            view === "members"
               ? users.arr.filter((u: any) => parseInt(u.homeStore) === num)
               : contracts.arr.filter((c: any) => parseInt(c.homeStore) === num)
         );
      } catch (err) {
         console.log(err);
      }
   }, [num, view]);

   useEffect(() => {
      //console.log("rows", rows);
   }, [rows]);

   useEffect(() => {
      //console.log("users");
   }, [users]);

   return (
      <>
         <h3>Stores</h3>
         <Grid container spacing={1}>
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
                     {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                        <MenuItem key={i} value={i}>
                           {"store #" + i}
                        </MenuItem>
                     ))}
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
                        <Table
                           stickyHeader
                           aria-label='sticky table'
                           size='small'
                        >
                           <TableHead>
                              <TableRow sx={{ p: 1 }}>
                                 <TableCell>Job</TableCell>
                                 <TableCell>Task</TableCell>
                                 <TableCell>#</TableCell>
                                 <TableCell>Date</TableCell>
                                 <TableCell>Action</TableCell>
                                 <TableCell></TableCell>
                              </TableRow>
                           </TableHead>

                           <TableBody>
                              {rows
                                 .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                 )
                                 .map((row: any) => (
                                    <TableRow key={row._id}>
                                       <TableCell sx={{ p: 1 }}>
                                          <Typography
                                             color='primary'
                                             gutterBottom
                                          >
                                             {row.jobTitle
                                                .toString()
                                                .replace("cards:", "")}
                                          </Typography>
                                       </TableCell>
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
                                                      : parseInt(row.stage) ===
                                                        2
                                                      ? color2
                                                      : parseInt(row.stage) ===
                                                        3
                                                      ? color3
                                                      : parseInt(row.stage) ===
                                                        4
                                                      ? color4
                                                      : parseInt(row.stage) ===
                                                        5
                                                      ? color5
                                                      : "inherit",
                                             }}
                                          />
                                          <ButtonGroup
                                             variant='text'
                                             size='small'
                                          >
                                             <Button
                                                onClick={() => btnView(row)}
                                             >
                                                <Tooltip title='View details'>
                                                   <VisibilityIcon />
                                                </Tooltip>
                                             </Button>

                                             {(userLevel === 1 ||
                                                userLevel === 2) && (
                                                <>
                                                   <Button
                                                      onClick={() =>
                                                         btnEdit(row)
                                                      }
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
                                                value={row.stage}
                                                label='Stage'
                                                onChange={handleChange}
                                                size='small'
                                                sx={{ width: 80 }}
                                             >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
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
