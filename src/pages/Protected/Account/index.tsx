import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { rand } from "../../../utilities/gen";

const bull = (
   <Box
      component='span'
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
   >
      •
   </Box>
);

export default function BasicCard() {
   let yourDate = new Date();

   const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
         backgroundColor: theme.palette.common.black,
         color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
         fontSize: 14,
      },
   }));

   const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
         backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      "&:last-child td, &:last-child th": {
         border: 0,
      },
   }));

   function createData(
      date: string,
      item: string,
      cost: number,
      completed: string
   ) {
      return { date, item, cost, completed };
   }

   const rows = [
      createData("-", "-", 0, "-"),
      createData("-", "-", 0, "-"),
      createData("-", "-", 0, "-"),
   ];

   return (
      <>
         <Card sx={{ minWidth: 275 }}>
            <CardContent>
               <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
               >
                  Account Ballance for {yourDate.toISOString().split("T")[0]}
               </Typography>
               <Typography variant='h5' component='div'>
                  $0.00 USD
               </Typography>
            </CardContent>
         </Card>
         <div style={{ padding: 10 }} />
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
               <TableHead>
                  <TableRow>
                     <StyledTableCell>Date</StyledTableCell>
                     <StyledTableCell>Item</StyledTableCell>
                     <StyledTableCell>Cost</StyledTableCell>
                     <StyledTableCell>Comp/Date</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.map((row) => (
                     <StyledTableRow key={"ke" + rand()}>
                        <StyledTableCell component='th' scope='row'>
                           {row.date}
                        </StyledTableCell>
                        <StyledTableCell>{row.item}</StyledTableCell>
                        <StyledTableCell>{row.cost}</StyledTableCell>
                        <StyledTableCell>{row.completed}</StyledTableCell>
                     </StyledTableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </>
   );
}
