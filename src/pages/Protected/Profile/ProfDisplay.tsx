import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EmailIcon from "@mui/icons-material/Email";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SessionState } from "../../../features/session/session";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { getDoc, getDocs } from "../../../utilities/MongoRequest";
import { setSnackbar } from "../../../features/snackbar/snackbarSlice";
import { findDataArray, msg } from "../../../utilities/gen";
import { setSession } from "../../../features/session/sessionSlice";
import { setUsers } from "../../../features/users/usersSlice";
import { setContracts } from "../../../features/contracts/contractsSlice";

interface ExpandMoreProps extends IconButtonProps {
   expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
   const { expand, ...other } = props;
   return <IconButton {...other} />;
})(({ theme, expand }) => ({
   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
   marginLeft: "auto",
   transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
   }),
}));

export default function ProfileDisplay(): JSX.Element {
   const session: any = useAppSelector((state) => state.session);
   const dispatch = useAppDispatch();

   const {
      token = "",
      email = "",
      displayName = "NA",
      photoUrl = "https://i.ibb.co/PtDp2nH/noImage.png",
      uid = "NA",
      createdAt,
      bio,
      userLevel,
      lastLoginAt,
   } = session.user;
   const d = new Date(lastLoginAt);
   const c = new Date(createdAt);
   const [profileLoaded, setProfileLoaded] = React.useState<boolean>(false);

   const startGather = async (
      id: string,
      userLevel: number,
      homeStore: string,
      token: string
   ) => {
      let users, contracts;
      switch (userLevel) {
         case 1: // super admin
            users = findDataArray(await getDocs("users", token));
            contracts = findDataArray(await getDocs("contracts", token));
            dispatch(setUsers(users));
            dispatch(setContracts(contracts));
            break;
         case 2: // store admin
         case 3: // order picker
            users = findDataArray(
               await getDoc("users", "homeStore", homeStore, token)
            );
            contracts = findDataArray(
               await getDoc("contracts", "homeStore", homeStore, token)
            );
            dispatch(setUsers(users));
            dispatch(setContracts(contracts));
            break;
         case 4: // delivery / contractor
            //users = findDataArray(await getDoc("users","homeStore",homeStore, token));
            contracts = findDataArray(
               await getDoc("contracts", "assignedTo", id, token)
            );
            dispatch(setUsers(users));
            dispatch(setContracts(contracts));

            break;
         default:
            break;
      }
   };

   const initProfile = async () => {
      try {
         const resp: any = await getDoc("users", "email", email, token);
         const arr: any = findDataArray(resp);
         const o = arr[0];
         let user = session.user;
         user = {
            ...user,
            userLevel: o.userLevel,
            displayName: o.firstName + " " + o.lastName,
         };
         startGather(user._id, o.userLevel, user.homeStore, token);
         dispatch(setSession({ ...session, user }));
         dispatch(setSnackbar(msg("profile loaded", "success")));
      } catch (error) {
         console.log(error);
         dispatch(setSnackbar(msg("profile not found", "error")));
      }
   };

   React.useEffect(() => {
      // gather info
      if (!profileLoaded) {
         initProfile();
         setProfileLoaded(true);
      }
   }, []);

   return (
      <>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Card sx={{ minWidth: 250 }}>
                  <CardContent>
                     <Typography variant='body2' color='text.secondary'>
                        <strong>
                           Dashboard: {displayName} ({userLevel})
                        </strong>
                     </Typography>
                     <List
                        sx={{
                           width: "100%",
                           bgcolor: "background.paper",
                        }}
                     >
                        <ListItem>
                           <ListItemAvatar>
                              <Avatar>
                                 <EmailIcon />
                              </Avatar>
                           </ListItemAvatar>
                           <ListItemText
                              primary='Email'
                              secondary={"" + email}
                           />
                        </ListItem>
                        <ListItem>
                           <ListItemAvatar>
                              <Avatar>
                                 <DateRangeIcon />
                              </Avatar>
                           </ListItemAvatar>
                           <ListItemText primary='Created' secondary={"" + c} />
                        </ListItem>
                        <ListItem>
                           <ListItemAvatar>
                              <Avatar>
                                 <LockIcon />
                              </Avatar>
                           </ListItemAvatar>
                           <ListItemText
                              primary='Session ID'
                              secondary={"" + token.toString().slice(0, 30)}
                           />
                        </ListItem>
                     </List>
                  </CardContent>
               </Card>
            </Grid>
            <Grid item xs={12}>
               {!profileLoaded ? (
                  <Card sx={{ minWidth: 250, maxWidth: "100%", p: 1 }}>
                     <Box sx={{ width: "100%", textAlign: "center" }}>
                        Loading profile...
                        <LinearProgress />
                     </Box>
                  </Card>
               ) : (
                  <Card sx={{ minWidth: 250 }}>Profile Loaded</Card>
               )}
            </Grid>
         </Grid>
      </>
   );
}
