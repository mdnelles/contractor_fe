import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InfoIcon from "@mui/icons-material/Info";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
   Button,
   ButtonGroup,
   TableSortLabel,
   TextField,
   Tooltip,
   Typography,
} from "@mui/material";
import { useState } from "react";
import { epochToDate } from "../../../utilities/gen";
import { Level } from "../../../widgets/Level";
import { columns } from "./members.d";
import { useDispatch } from "react-redux";

export default function StickyHeadTable() {
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [searchQuery, setSearchQuery] = useState("");
   const [sort, setSort] = useState({ column: "lastName", direction: "asc" });

   const users: any = useAppSelector((state) => state.users);
   const session: any = useAppSelector((state) => state.session);
   const { userLevel } = session.user;

   const btnView = (id: string) => {
      //
   };

   const btnEdit = (id: string) => {
      //
   };
   const btnHistory = (id: string) => {
      //
   };

   const filteredUsers = users.arr.filter(
      (user: any) =>
         user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
   );

   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleSort = (columnId: any) => {
      const isAsc = sort.column === columnId && sort.direction === "asc";
      const direction = isAsc ? "desc" : "asc";
      setSort({ column: columnId, direction });
   };

   const sortedUsers = filteredUsers.sort((a: any, b: any) => {
      const columnA = a[sort.column];
      const columnB = b[sort.column];
      if (columnA < columnB) {
         return sort.direction === "asc" ? -1 : 1;
      }
      if (columnA > columnB) {
         return sort.direction === "asc" ? 1 : -1;
      }
      return 0;
   });

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   return (
      <>
         <h3>Users</h3>

         <Paper sx={{ width: "100%", overflow: "hidden", p: 1 }}>
            <TextField
               label='Search'
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               fullWidth
               size='small'
            />
            {sortedUsers && sortedUsers.length > 0 ? (
               <>
                  <TableContainer>
                     <Table stickyHeader aria-label='sticky table' size='small'>
                        <TableHead>
                           <TableRow>
                              {columns.map((column) => (
                                 <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sortDirection={
                                       sort.column === column.id ? "asc" : false
                                    }
                                 >
                                    <TableSortLabel
                                       active={sort.column === column.id}
                                       direction={
                                          sort.column === column.id
                                             ? "desc"
                                             : "asc"
                                       }
                                       onClick={() => handleSort(column.id)}
                                    >
                                       {column.label}
                                    </TableSortLabel>
                                 </TableCell>
                              ))}
                              <TableCell></TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {sortedUsers
                              .slice(
                                 page * rowsPerPage,
                                 page * rowsPerPage + rowsPerPage
                              )
                              .map((row: any) => {
                                 return (
                                    <TableRow
                                       hover
                                       role='checkbox'
                                       tabIndex={-1}
                                       key={row.code}
                                    >
                                       <TableCell>
                                          <Tooltip title={row._id}>
                                             <InfoIcon color='primary' />
                                          </Tooltip>
                                       </TableCell>
                                       <TableCell>
                                          <a href={"mainto:" + row.email}>
                                             {row.email}
                                          </a>
                                       </TableCell>
                                       <TableCell>{row.firstName}</TableCell>
                                       <TableCell>{row.lastName}</TableCell>
                                       <TableCell>
                                          <Level level={row.userLevel} />
                                       </TableCell>
                                       <TableCell>
                                          <a href={"mainto:" + row.email}>
                                             {row.email}
                                          </a>
                                       </TableCell>
                                       <TableCell>
                                          {epochToDate(row["createdAt"])}
                                       </TableCell>

                                       <TableCell>
                                          <ButtonGroup
                                             variant='text'
                                             size='small'
                                          >
                                             <Button
                                                onClick={() => btnView(row._id)}
                                             >
                                                <Tooltip title='View details'>
                                                   <VisibilityIcon />
                                                </Tooltip>
                                             </Button>
                                             <Button
                                                onClick={() =>
                                                   btnHistory(row._id)
                                                }
                                             >
                                                <Tooltip title='User History'>
                                                   <HistoryIcon />
                                                </Tooltip>
                                             </Button>
                                             {(userLevel === 1 ||
                                                userLevel === 2) && (
                                                <Button
                                                   onClick={() =>
                                                      btnEdit(row._id)
                                                   }
                                                >
                                                   <Tooltip title='Edit user'>
                                                      <EditIcon />
                                                   </Tooltip>
                                                </Button>
                                             )}
                                          </ButtonGroup>
                                       </TableCell>
                                    </TableRow>
                                 );
                              })}
                        </TableBody>
                     </Table>
                  </TableContainer>
                  <TablePagination
                     rowsPerPageOptions={[5, 10, 15, 25, 100]}
                     component='div'
                     count={sortedUsers.length}
                     rowsPerPage={rowsPerPage}
                     page={page}
                     onPageChange={handleChangePage}
                     onRowsPerPageChange={handleChangeRowsPerPage}
                  />
               </>
            ) : (
               <Typography variant='h6' align='center'>
                  No users found.
               </Typography>
            )}
         </Paper>
      </>
   );
}
