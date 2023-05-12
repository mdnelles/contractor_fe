import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { useAppSelector } from "../../../app/hooks";
import Tooltip from "@mui/material/Tooltip";

interface LeftNavProps {
   goPage: any;
}

export const LeftNav = (props: LeftNavProps) => {
   const { goPage } = props;
   const userLevel: any = useAppSelector(
      (state) => state.session.user.userLevel
   );

   const menuItems = [
      {
         text: "Dashboard",
         icon: <DashboardIcon />,
         path: "/clients",
         userLevel: [1, 2, 3, 4, 5],
      },
      {
         text: "Project Notes",
         icon: <FormatListBulletedIcon />,
         path: "/clients/todo",
         userLevel: [0],
      },
      {
         text: "Stores",
         icon: <LocalGroceryStoreIcon />,
         path: "/clients/stores",
         userLevel: [1, 2, 3],
      },
      {
         text: "Contracts",
         icon: <EngineeringIcon />,
         path: "/clients/contracts",
         userLevel: [1, 2, 3, 4, 5],
      },
      {
         text: "Members",
         icon: <PeopleIcon />,
         path: "/clients/members",
         userLevel: [1, 2],
      },
      {
         text: "Support Ticket",
         icon: <ConfirmationNumberIcon />,
         path: "/clients/support",
         userLevel: [0],
      },
      {
         text: "App Guide",
         icon: <ContactSupportIcon />,
         path: "/clients/guide",
         userLevel: [1, 2, 3, 4, 5],
      },
      // {
      //    text: "My Account",
      //    icon: <AccountBalanceIcon />,
      //    path: "/clients/account",
      //    userLevel: [1, 2, 3, 4, 5],
      // },
      {
         text: "Calendar",
         icon: <CalendarMonthIcon />,
         path: "/clients/calendar",
         userLevel: [1, 2, 3, 4, 5],
      },
   ];

   return (
      <>
         <List component='nav'>
            {menuItems.map((item, index) => {
               if (!item.userLevel.includes(userLevel)) {
                  return null; // exclude item from the list if it doesn't match the user level
               }
               return (
                  <React.Fragment key={index}>
                     {item.userLevel.includes(1) && (
                        <Tooltip title={item.text} placement='right'>
                           <ListItemButton onClick={() => goPage(item.path)}>
                              <ListItemIcon>{item.icon}</ListItemIcon>
                              <ListItemText primary={item.text} />
                           </ListItemButton>
                        </Tooltip>
                     )}
                  </React.Fragment>
               );
            })}
         </List>
      </>
   );
};
