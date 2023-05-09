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
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import LinearProgress from "@mui/material/LinearProgress";
import { getDoc, getDocs, getDocsByObj } from "../../../utilities/MongoRequest";
import { setSnackbar } from "../../../features/snackbar/snackbarSlice";
import { findDataArray, msg } from "../../../utilities/gen";
import { setSession } from "../../../features/session/sessionSlice";
import { clearUsers, setUsers } from "../../../features/users/usersSlice";
import {
   clearContracts,
   setContracts,
} from "../../../features/contracts/contractsSlice";
import { clearStores, setStores } from "../../../features/stores/storesSlice";
import { StoresState } from "../../../features/stores/stores";
import CircularProgress from "@mui/material/CircularProgress";
import { UsersState } from "../../../features/users/users";
import RefreshIcon from "@mui/icons-material/Refresh";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import {
   color1,
   color2,
   color3,
   color4,
   color5,
} from "../../../constants/colors";
import { Tooltip } from "@mui/material";

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
   const stores: StoresState = useAppSelector((state) => state.stores);
   const contracts: any = useAppSelector((state) => state.contracts);
   const users: UsersState = useAppSelector((state) => state.users);
   const [storesLoaded, setStoresLoaded] = React.useState<boolean>(false);
   const [contractsLoaded, setContractsLoaded] = React.useState<boolean>(false);
   const [usersLoaded, setUsersLoaded] = React.useState<boolean>(false);

   const dispatch = useAppDispatch();

   const {
      token = "",
      email = "",
      displayName = "NA",
      photoUrl = "https://i.ibb.co/PtDp2nH/noImage.png",
      uid = "NA",
      createdAt,
      bio,
      homeStore,
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
      let usersRedux, contractsRedux;

      const stores = findDataArray(await getDocs("stores", token));
      dispatch(setStores(stores));
      setTimeout(() => setStoresLoaded(true), 1000);

      switch (userLevel) {
         case 1: // super admin
            usersRedux = findDataArray(await getDocs("users", token));
            contractsRedux = findDataArray(await getDocs("contracts", token));
            dispatch(setUsers(usersRedux));
            dispatch(setContracts(contractsRedux));
            setUsersLoaded(true);
            setContractsLoaded(true);
            break;
         case 2: // store admin
         case 3: // order picker
            usersRedux = findDataArray(
               await getDoc("users", "homeStore", homeStore, token)
            );
            contractsRedux = findDataArray(
               await getDoc("contracts", "homeStore", homeStore, token)
            );
            dispatch(setUsers(usersRedux));
            dispatch(setContracts(contractsRedux));
            setUsersLoaded(true);
            setContractsLoaded(true);
            break;
         case 4: // delivery / contractor
            //users = findDataArray(await getDoc("users","homeStore",homeStore, token));
            contractsRedux = findDataArray(
               await getDocsByObj("contracts", { contractor: id }, token)
            );
            dispatch(setUsers(usersRedux));
            dispatch(setContracts(contractsRedux));
            setUsersLoaded(true);
            setContractsLoaded(true);
            break;
         case 5: // delivery / contractor
            //users = findDataArray(await getDoc("users","homeStore",homeStore, token));
            contractsRedux = findDataArray(
               await getDocsByObj("contracts", { clientid: id }, token)
            );
            dispatch(setContracts(contractsRedux));
            setContractsLoaded(true);
            break;
         default:
            break;
      }
   };

   const reUsers = async () => {
      clearUsers();
      setUsersLoaded(false);
      try {
         const resp: any = await getDocs("users", token);
         setTimeout(() => {
            const arr: any = findDataArray(resp);
            dispatch(setUsers(arr));
            dispatch(setSnackbar(msg("users loaded", "success")));
            setUsersLoaded(true);
         }, 1500);
      } catch (error) {
         console.log(error);
         dispatch(setSnackbar(msg("users not found", "error")));
      }
   };

   const reContracts = async () => {
      clearContracts();
      setContractsLoaded(false);
      try {
         const resp: any = await getDocs("contracts", token);
         setTimeout(() => {
            const arr: any = findDataArray(resp);
            dispatch(setContracts(arr));
            dispatch(setSnackbar(msg("contracts loaded", "success")));
            setContractsLoaded(true);
         }, 2000);
      } catch (error) {
         console.log(error);
         dispatch(setSnackbar(msg("contracts not found", "error")));
      }
   };

   const reStores = async () => {
      clearStores();
      setStoresLoaded(false);
      try {
         const resp: any = await getDocs("stores", token);
         setTimeout(() => {
            const arr: any = findDataArray(resp);
            dispatch(setStores(arr));
            dispatch(setSnackbar(msg("stores loaded", "success")));
            setStoresLoaded(true);
         }, 1000);
      } catch (error) {
         console.log(error);
         dispatch(setSnackbar(msg("stores not found", "error")));
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
                     <Typography variant='h5' color='primary'>
                        {displayName}
                        <Chip
                           label={userLevel}
                           sx={{
                              m: 1,
                              backgroundColor:
                                 parseInt(userLevel) === 1
                                    ? color1
                                    : parseInt(userLevel) === 2
                                    ? color2
                                    : parseInt(userLevel) === 3
                                    ? color3
                                    : parseInt(userLevel) === 4
                                    ? color4
                                    : parseInt(userLevel) === 5
                                    ? color5
                                    : "inherit",
                           }}
                        />
                        <Chip label={`Store: ${homeStore}`} />
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

            {!profileLoaded ? (
               <Grid item xs={12}>
                  <Card sx={{ minWidth: 250, maxWidth: "100%", p: 1, m: 2 }}>
                     <Box sx={{ width: "100%", textAlign: "center" }}>
                        Loading profile...
                        <LinearProgress />
                     </Box>
                  </Card>
               </Grid>
            ) : (
               <Grid item xs={12}>
                  <Card sx={{ minWidth: 250 }}>
                     <Grid container padding={2}>
                        <Grid
                           item
                           xs={12}
                           md={userLevel > 2 ? 6 : 4}
                           sx={{ textAlign: "center", p: 2 }}
                        >
                           <Typography
                              component='h3'
                              fontWeight={600}
                              color='primary'
                              gutterBottom
                           >
                              Stores
                           </Typography>
                           {storesLoaded && stores.arr.length > 0 ? (
                              <>
                                 <Chip
                                    label={`Loaded:  ${stores.arr.length}`}
                                    sx={{ p: 3, mt: 2, mb: 3 }}
                                 />

                                 <br />
                                 <Tooltip title='get the latest from the cloud'>
                                    <Button
                                       size='small'
                                       variant='contained'
                                       onClick={() => reStores()}
                                    >
                                       <CloudDownloadIcon sx={{ mr: 2 }} />{" "}
                                       Refresh
                                    </Button>
                                 </Tooltip>
                              </>
                           ) : (
                              <CircularProgress />
                           )}
                        </Grid>

                        <Grid
                           item
                           xs={12}
                           md={userLevel > 2 ? 6 : 4}
                           sx={{ textAlign: "center", p: 2 }}
                        >
                           <Typography
                              component='h3'
                              fontWeight={600}
                              color='primary'
                              gutterBottom
                           >
                              Contracts
                           </Typography>
                           {contractsLoaded ? (
                              <>
                                 <Chip
                                    label={`Loaded: ${contracts.arr.length}`}
                                    sx={{ p: 3, mt: 2, mb: 3 }}
                                 />
                                 <br />
                                 <Tooltip title='get latest data from the cloud'>
                                    <Button
                                       size='small'
                                       variant='contained'
                                       onClick={() => reContracts()}
                                    >
                                       <CloudDownloadIcon sx={{ mr: 2 }} />{" "}
                                       Refresh
                                    </Button>
                                 </Tooltip>
                              </>
                           ) : (
                              <CircularProgress />
                           )}
                        </Grid>

                        {userLevel > 2 ? (
                           <></>
                        ) : (
                           <Grid
                              item
                              xs={12}
                              md={4}
                              sx={{ textAlign: "center", p: 2 }}
                           >
                              <Typography
                                 component='h3'
                                 fontWeight={600}
                                 color='primary'
                                 gutterBottom
                              >
                                 Users
                              </Typography>
                              {usersLoaded ? (
                                 <>
                                    <Chip
                                       label={`Loaded: ${users.arr.length}`}
                                       sx={{ p: 3, mt: 2, mb: 3 }}
                                    />
                                    <br />
                                    <Tooltip title='get latest data from the cloud'>
                                       <Button
                                          size='small'
                                          variant='contained'
                                          onClick={() => reUsers()}
                                       >
                                          <CloudDownloadIcon sx={{ mr: 2 }} />{" "}
                                          Refresh
                                       </Button>
                                    </Tooltip>
                                 </>
                              ) : (
                                 <CircularProgress />
                              )}
                           </Grid>
                        )}
                     </Grid>
                  </Card>
               </Grid>
            )}
         </Grid>
      </>
   );
}
