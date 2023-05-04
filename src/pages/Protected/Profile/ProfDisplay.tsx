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
import { getDoc } from "../../../utilities/MongoRequest";
import { setSnackbar } from "../../../features/snackbar/snackbarSlice";
import { msg } from "../../../utilities/gen";

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
      lastLoginAt,
   } = session.user;
   const d = new Date(lastLoginAt);
   const c = new Date(createdAt);
   const [profileLoaded, setProfileLoaded] = React.useState<boolean>(false);

   const initProfile = async () => {
      try {
         let tmp: any = await getDoc("users", "email", email, token);
         console.log(tmp.data.data[0]);
      } catch (error) {
         console.log(error);
         dispatch(setSnackbar(msg("could not find user", "error")));
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
            <Grid item>
               <Card sx={{ minWidth: 250 }}>
                  <CardContent>
                     <Typography variant='body2' color='text.secondary'>
                        <strong>User Profile {displayName}</strong>
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
            <Grid item>
               {!profileLoaded ? (
                  <Card sx={{ minWidth: 250, maxWidth: "100%" }}>
                     <Box sx={{ width: "100%", textAlign: "center" }}>
                        Loading profile...
                        {/* <LinearProgress /> */}
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
