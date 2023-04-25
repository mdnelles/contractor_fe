import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { IconButton, Toolbar } from "@mui/material";
import { LeftNav } from "./LeftNav";
import { useNavigate } from "react-router-dom";

interface DrawerLeftProps {
   drawerWidth: number | undefined;
   open: boolean | any;
   variant: any;
   toggleDrawer: any;
}

export const DrawerLeft = (props: DrawerLeftProps) => {
   const { drawerWidth, open, variant, toggleDrawer } = props;
   const navigate = useNavigate();

   const goPage = (link: string) => {
      navigate(link);
   };

   const DrawerStyle = styled(MuiDrawer, {
      shouldForwardProp: (prop) => prop !== "open",
   })(({ theme, open }) => ({
      "& .MuiDrawer-paper": {
         position: "relative",
         whiteSpace: "nowrap",
         width: drawerWidth,
         transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
         }),
         boxSizing: "border-box",
         ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
               easing: theme.transitions.easing.sharp,
               duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
               width: theme.spacing(9),
            },
         }),
      },
   }));

   return (
      <>
         <DrawerStyle variant={variant} open={open}>
            <Toolbar
               sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
               }}
            >
               <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
               </IconButton>
            </Toolbar>
            <Divider />
            <LeftNav goPage={goPage} />
         </DrawerStyle>
      </>
   );
};
