import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

export default function (): JSX.Element {
   const [num, setNum] = React.useState<number>(10);
   const [view, setView] = React.useState<string>("");

   const handleChangeStore = (event: any) =>
      setNum(event.target.value as number);
   const handleChangeView = (event: any) =>
      setView(event.target.value as string);

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
                     <MenuItem key={"orders"} value={"order"}>
                        orders
                     </MenuItem>
                  </Select>
               </FormControl>
            </Grid>
         </Grid>
      </>
   );
}
