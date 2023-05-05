import * as React from "react";
import "../App.css";
import ReCAPTCHA from "react-google-recaptcha";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSession } from "../features/session/sessionSlice";
import { isValidEmail, isValidPassword } from "../utilities/validate";
import { setSnackbar } from "../features/snackbar/snackbarSlice";

import { msg } from "../utilities/gen";
import { Suspense, useEffect, useState } from "react";
import { SnackbarState } from "../features/snackbar/snackbar";
import SnackbarMsg from "../components/Snackbar/SnackbarMsg";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { UserType } from "../features/session/session";

import { initializeApp } from "firebase/app";
import { signInWithGoogle } from "../firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
   getFirestore,
   query,
   getDocs,
   collection,
   where,
   addDoc,
} from "firebase/firestore";

import { firebaseConfig } from "../firebase/constants";

import Trans from "../widgets/Trans";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DummyDataCards from "./Public/widgets/DummyDataCards";

export default function Login() {
   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);
   const navigate = useNavigate();
   const db = getFirestore(app);
   const dispatch = useAppDispatch();
   const session: any = useAppSelector((state) => state.session);
   const snackbar: SnackbarState = useAppSelector((state) => state.snackbar);
   const speed = session.speed;
   const [loading, setLoading] = useState(false);
   const [email, setEmail] = useState("");
   const [logEmail, setLogEmail] = useState("");
   const [password, setPassword] = useState("passpass");

   const startLoginWEP = async (event: any, em?: any, pa?: any) => {
      event.preventDefault();

      if ((isValidEmail(email) && isValidPassword(password)) || (em && pa)) {
         dispatch(setSnackbar(msg(<Trans txt='Log in with email' />, "info")));

         setLoading(true);
         try {
            const res =
               em && pa
                  ? await signInWithEmailAndPassword(auth, em, pa)
                  : await signInWithEmailAndPassword(auth, email, password);
            const user = res.user;
            const q = query(
               collection(db, "users"),
               where("uid", "==", user.uid)
            );
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
               await addDoc(collection(db, "users"), {
                  uid: user.uid,
                  name: user.displayName,
                  authProvider: "google",
                  email: user.email,
               });
            }
            startSetSession(res);
         } catch (err: any) {
            setLoading(false);
            dispatch(setSnackbar(msg(`Login Failed`, "error")));
            console.error(err);
            return false;
         }
      } else {
         dispatch(
            setSnackbar(
               msg(<Trans txt='Please enter valid credentials' />, "error")
            )
         );
      }
   };

   const startSignInWithGoogle = async (event: any) => {
      event.preventDefault();
      setLoading(true);
      dispatch(
         setSnackbar(msg(<Trans txt='Attempting Google Log in' />, "info"))
      );

      try {
         const res: any = await signInWithGoogle();
         console.log(res);
         startSetSession(res);
      } catch (error) {
         setLoading(false);
         console.log(error);
      }
   };

   const startSetSession = (res: any) => {
      try {
         const o = res.user;
         const m = o.metadata;
         let userObj: UserType = {
            token: o.accessToken,
            email: o.email,
            displayName: o.displayName | o.email,
            photoUrl: o.photoUrl,
            uid: o.uid,
            createdAt: m.createdAt,
            creationTime: m.creationTime,
            lastLoginAt: m.lastLoginAt,
            lastSignInTime: m.lastSignInTime,
            userLevel: 0,
         };
         dispatch(setSession({ ...session, user: userObj }));
      } catch (error) {
         console.log(error);
      }
   };

   const goHome = () => navigate(`/`);

   const handleChange = (event: any) => {
      startLoginWEP(event, event.target.value, "passpass");
   };

   if (session.user.token) navigate(`/clients`);

   useEffect(() => {
      //console.log("UE - session");
   }, [session.user, session.notRobot]);

   return (
      <div className='vertical-center center-outer'>
         <div className='center-inner'>
            <SnackbarMsg />

            <Paper sx={{ mt: 7, ml: 3, mr: 3, padding: 3 }}>
               <Container component='main' maxWidth='lg'>
                  <CssBaseline />

                  <Box
                     sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                     }}
                  >
                     <img
                        src='./apple-touch-icon-180x180.png'
                        width='45px'
                        height='45px'
                        onClick={() => goHome()}
                        style={{
                           borderRadius: 5,
                           border: "1px solid #777",
                           margin: 5,
                           cursor: "pointer",
                        }}
                     />

                     <Typography component='h1' variant='h5'>
                        <Trans txt='Client Login' />
                     </Typography>
                     <Box component='form' noValidate sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                           <InputLabel id='demo-simple-select-label'>
                              Demo login/demostración
                           </InputLabel>
                           <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              value={logEmail}
                              size='small'
                              label='Demo login/demostración'
                              onChange={handleChange}
                           >
                              <MenuItem value={"user1@email.com"}>
                                 user1@email.com
                              </MenuItem>
                              <MenuItem value={"user2@email.com"}>
                                 user2@email.com
                              </MenuItem>
                              <MenuItem value={"user3@email.com"}>
                                 user3@email.com
                              </MenuItem>
                              <MenuItem value={"user4@email.com"}>
                                 user4@email.com
                              </MenuItem>
                              <MenuItem value={"user5@email.com"}>
                                 user5@email.com
                              </MenuItem>
                           </Select>
                        </FormControl>
                        <TextField
                           margin='normal'
                           size='small'
                           defaultValue={""}
                           required
                           fullWidth
                           id='email'
                           label={<Trans txt='Email Address' />}
                           name='email'
                           autoComplete='email'
                           autoFocus
                           onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                           margin='normal'
                           required
                           fullWidth
                           size='small'
                           type='password'
                           name='password'
                           label={<Trans txt='Password' />}
                           id='password'
                           defaultValue={""}
                           autoComplete='current-password'
                           onChange={(e) => setPassword(e.target.value)}
                        />
                        <Box
                           sx={{
                              position: "relative",
                              mb: 3,
                              mt: 2,
                           }}
                        >
                           <Button
                              fullWidth
                              size='small'
                              variant='contained'
                              disabled={loading}
                              onClick={(event) => startLoginWEP(event)}
                              sx={{ textTransform: "none" }}
                           >
                              <Trans txt='Log in With email' />
                           </Button>
                           {loading && (
                              <CircularProgress
                                 size={24}
                                 sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    marginTop: "-12px",
                                    marginLeft: "-12px",
                                 }}
                              />
                           )}
                        </Box>
                        <Box
                           sx={{
                              position: "relative",
                              marginBottom: 2,
                           }}
                        >
                           <Button
                              type='submit'
                              fullWidth
                              variant='contained'
                              size='small'
                              disabled={loading}
                              sx={{ textTransform: "none" }}
                              onClick={(event) => startSignInWithGoogle(event)}
                              endIcon={<GoogleIcon />}
                           >
                              <Trans txt='Login With Google' />
                           </Button>
                           {loading && (
                              <CircularProgress
                                 size={24}
                                 sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    marginTop: "-12px",
                                    marginLeft: "-12px",
                                 }}
                              />
                           )}
                        </Box>
                        <Grid container>
                           <Grid item xs>
                              <Button
                                 onClick={() => navigate("/forgot")}
                                 size='small'
                                 sx={{ textTransform: "none" }}
                              >
                                 <Trans txt='Forgot Password' />
                              </Button>
                           </Grid>
                           <Grid item>
                              <Button
                                 onClick={() => navigate("/sign-up")}
                                 size='small'
                                 sx={{ textTransform: "none" }}
                              >
                                 <Trans txt="Don't have an account? Sign Up" />
                              </Button>
                           </Grid>
                        </Grid>
                     </Box>
                  </Box>
               </Container>
            </Paper>
         </div>
      </div>
   );
}
