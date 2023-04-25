import Box from "@mui/material/Box";
import SpeedIcon from "@mui/icons-material/Speed";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Grid from "@mui/material/Grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import React from "react";
import { Divider, FormControl, InputLabel, Paper, Switch } from "@mui/material";

import { setSession } from "../../../features/session/sessionSlice";
import { msg } from "../../../utilities/gen";
import { setSnackbar } from "../../../features/snackbar/snackbarSlice";
import DashboardTemplate from "../../../components/TemplateMembers/DashboardTemplate";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

export default function Settings(): JSX.Element {
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
         <>
            <strong>App Settings</strong>
            <Paper sx={{ padding: 2 }}>
               Animation Speed
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
               <Divider sx={{ padding: 2 }} />
               Darkmode
               <Switch checked={session.darkMode} onChange={toggleDark} />
            </Paper>
         </>
      </>
   );
}
