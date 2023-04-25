import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
   GoogleAuthProvider,
   getAuth,
   sendPasswordResetEmail,
} from "firebase/auth";
import {
   getFirestore,
} from "firebase/firestore";

import {
   REACT_APP_API_KEY,
   REACT_APP_APP_ID,
   REACT_APP_AUTH_DOMAIN,
   REACT_APP_DATABASE_URL,
   REACT_APP_MEASUREMENT_ID,
   REACT_APP_MESSAGING_SENDER_ID,
   REACT_APP_PROJECT_ID,
   REACT_APP_STORAGE_BUCKET,
} from "../../../firebase.config";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { SnackbarState } from "../../../features/snackbar/snackbar";
import { useState } from "react";
import { isValidEmail} from "../../../utilities/validate";
import { setSnackbar } from "../../../features/snackbar/snackbarSlice";
import { msg } from "../../../utilities/gen";
import CircularProgress from "@mui/material/CircularProgress";
import SnackbarMsg from "../../../components/Snackbar/SnackbarMsg";

const firebaseConfig = {
   apiKey: REACT_APP_API_KEY,
   authDomain: REACT_APP_AUTH_DOMAIN,
   databaseURL: REACT_APP_DATABASE_URL,
   projectId: REACT_APP_PROJECT_ID,
   storageBucket: REACT_APP_STORAGE_BUCKET,
   messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
   appId: REACT_APP_APP_ID,
   measurementId: REACT_APP_MEASUREMENT_ID,
};

function Copyright(props: any) {
   return (
      <Typography
         variant='body2'
         color='text.secondary'
         align='center'
         {...props}
      >
         {"Copyright © "}
         <Link color='inherit' href='#'>
            contratista
         </Link>{" "}
         {new Date().getFullYear()}
         {"."}
      </Typography>
   );
}

const theme = createTheme();

export default function SignUp() {
   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);
   const db = getFirestore(app);
   const analytics = getAnalytics(app);
   const googleProvider = new GoogleAuthProvider();
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const session: any = useAppSelector((state) => state.session);
   const snackbar: SnackbarState = useAppSelector((state) => state.snackbar);

   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);

      const data = new FormData(event.currentTarget);

      const email: any = data.get("email");

      if (isValidEmail(email)) {
         dispatch(setSnackbar(msg(`Attempting Signup...`, "info")));
         try {
            const resp: any = await sendPasswordResetEmail(auth, email);
            console.log(resp);
            setSuccess(true);
            dispatch(setSnackbar(msg(`Password Reset`, "success")));
         } catch (error: any) {
            dispatch(setSnackbar(msg(`Email not in system`, "error")));

            setLoading(false);
         }
      } else {
         setLoading(false);
         dispatch(setSnackbar(msg(`Please enter valid credentials`, "error")));
      }
   };

   const goHome = () => navigate(`/`);

   return (
      <div className='vertical-center center-outer'>
         <div className='center-inner'>
            <SnackbarMsg />
            <Paper sx={{ marginTop: 10, ml: 5, mr: 5, padding: 3 }}>
               <Container component='main' maxWidth='xs'>
                  <CssBaseline />
                  <Box
                     sx={{
                        marginTop: 2,
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
                        Forgot Password
                     </Typography>
                     {success ? (
                        <>
                           Email reset Link sent
                           <div style={{ padding: 20 }} />
                           <Link href='/login' variant='body2'>
                              Got to login
                           </Link>
                        </>
                     ) : (
                        <Box
                           component='form'
                           noValidate
                           onSubmit={handleSubmit}
                           sx={{ mt: 3 }}
                        >
                           <Grid container spacing={2}>
                              <Grid item xs={12}>
                                 <TextField
                                    required
                                    fullWidth
                                    size='small'
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                 />
                              </Grid>

                              <Grid item xs={12}>
                                 <Button
                                    fullWidth
                                    type='submit'
                                    size='small'
                                    variant='contained'
                                    disabled={loading}
                                 >
                                    Reset Password
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
                              </Grid>
                           </Grid>
                           <Grid container justifyContent='flex-end'>
                              <Grid item>
                                 <Link href='/login' variant='body2'>
                                    Go To Login
                                 </Link>
                              </Grid>
                           </Grid>
                        </Box>
                     )}
                  </Box>
               </Container>
            </Paper>
         </div>
      </div>
   );
}
