import Box from "@mui/material/Box";
import SpeedIcon from "@mui/icons-material/Speed";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { Divider, FormControl, Grid, InputLabel, Switch } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { SessionState } from "../../../features/session/session";
import { setSession } from "../../../features/session/sessionSlice";
import { msg } from "../../../utilities/gen";
import { setSnackbar } from "../../../features/snackbar/snackbarSlice";

export default (): JSX.Element => {
   const dis = useAppDispatch();
   const session: any = useAppSelector((state) => state.session);
   const speeds = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5];

   const handleChange = (sp: number | string) => {
      const spd: number = parseFloat(" " + sp); // space added to satisfy string
      dis(setSession({ ...session, speed: spd }));
      setTimeout(
         () => dis(setSnackbar(msg("Animation Speed updated", "success"))),
         100
      );
   };

   const toggleDark = (event: React.ChangeEvent<HTMLInputElement>): void => {
      dis(setSession({ ...session, darkMode: !session.darkMode }));
      setTimeout(
         () => dis(setSnackbar(msg("Dark Mode Toggled", "success"))),
         100
      );
   };

   return (
      <>
         <Box sx={{ padding: 3, width: 290 }}>
            <Grid container rowSpacing={1}>
               <Grid item={true} xs={2}>
                  <SpeedIcon />
               </Grid>
               <Grid item={true} xs={4}>
                  Animation Speed
               </Grid>
               <Grid item={true} xs={6}>
                  <FormControl sx={{ m: 1, width: 110, marginTop: -1 }}>
                     <InputLabel shrink htmlFor='speed'>
                        seconds
                     </InputLabel>
                     <Select
                        native
                        size='small'
                        value={session.speed}
                        onChange={(event) => handleChange(event.target.value)}
                        label='Native'
                        inputProps={{
                           id: "speed",
                        }}
                     >
                        {speeds.map((s): any => {
                           return (
                              <option value={s} key={"k" + s}>
                                 {" " + s}
                              </option>
                           );
                        })}
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item={true} xs={2}>
                  <Brightness4Icon />
               </Grid>
               <Grid item={true} xs={4}>
                  Darkmode
               </Grid>
               <Grid item={true} xs={6}>
                  <Switch checked={session.darkMode} onChange={toggleDark} />
               </Grid>
            </Grid>
         </Box>
      </>
   );
};
