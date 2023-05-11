import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { StoresState } from "../../../features/stores/stores";

export default function (): JSX.Element {
   const dispatch = useDispatch();
   const users = useAppSelector((state) => state.users);
   const stores: any = useAppSelector((state) => state.stores);
   const session: any = useAppSelector((state) => state.session);
   const [num, setNum] = React.useState<number>(session.user.homeStore);
   const [store, setStore] = React.useState<any>(
      stores.arr.filter((s: any) => s.number === num)[0]
   );

   const handleChangeStore = (event: any) => {
      const sNum = event.target.value as number;
      setNum(sNum);
      setStore(stores.arr.filter((s: any) => s.number === sNum)[0]);
   };
   return (
      <>
         <h3>Store View</h3>
         <Grid container spacing={1}>
            {session.user.userLevel === 1 && (
               <Grid item xs={12}>
                  <FormControl fullWidth>
                     <InputLabel id='store-no'>Select Store</InputLabel>
                     <Select
                        size='small'
                        label='Select Store'
                        onChange={handleChangeStore}
                        value={num}
                     >
                        {Array.from(
                           { length: stores.arr.length },
                           (_, i) => i + 1
                        ).map((i) => (
                           <MenuItem key={i} value={i}>
                              {"store #" + i}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Grid>
            )}
            <Grid>
               <List>
                  <ListItem>
                     <ListItemText
                        primary='ID'
                        secondary={store ? store._id : ""}
                     />
                  </ListItem>
                  <ListItem>
                     <ListItemText
                        primary='Number'
                        secondary={store ? store.number : ""}
                     />
                  </ListItem>
                  <ListItem>
                     <ListItemText
                        primary='Address'
                        secondary={store ? store.address : ""}
                     />
                  </ListItem>
                  <ListItem>
                     <ListItemText
                        primary='Province'
                        secondary={store ? store.province : ""}
                     />
                  </ListItem>
                  <ListItem>
                     <ListItemText
                        primary='Postal'
                        secondary={store ? store.postal : ""}
                     />
                  </ListItem>
                  <ListItem>
                     <ListItemText
                        primary='Phone'
                        secondary={store ? store.phone : ""}
                     />
                  </ListItem>
               </List>
            </Grid>
         </Grid>
      </>
   );
}
