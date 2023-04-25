import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

interface LeftNavProps {
   goPage: any;
}

export const LeftNav = (props: LeftNavProps) => {
   const { goPage } = props;

   return (
      <div>
         <List component='nav'>
            <ListItemButton onClick={() => goPage(`/clients`)}>
               <ListItemIcon>
                  <DashboardIcon />
               </ListItemIcon>
               <ListItemText primary='Dashboard' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/clients/account`)}>
               <ListItemIcon>
                  <AccountBalanceIcon />
               </ListItemIcon>
               <ListItemText primary='My Account' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/clients/todo`)}>
               <ListItemIcon>
                  <FormatListBulletedIcon />
               </ListItemIcon>
               <ListItemText primary='Project Notes' />
            </ListItemButton>

            <Divider sx={{ my: 1 }} />

            <ListItemButton onClick={() => goPage(`/clients/support`)}>
               <ListItemIcon>
                  <ContactSupportIcon />
               </ListItemIcon>
               <ListItemText primary='Support Ticket' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/clients/calendar`)}>
               <ListItemIcon>
                  <CalendarMonthIcon />
               </ListItemIcon>
               <ListItemText primary='Calendar' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/`)}>
               <ListItemIcon>
                  <HomeIcon />
               </ListItemIcon>
               <ListItemText primary='Home' />
            </ListItemButton>
         </List>
      </div>
   );
};
