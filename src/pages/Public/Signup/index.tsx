import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { initializeApp } from "firebase/app";
import {
   getAuth,
   createUserWithEmailAndPassword,
} from "firebase/auth";
import {
   getFirestore
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
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import { isValidEmail, isValidPassword } from "../../../utilities/validate";
import { setSnackbar } from "../../../features/snackbar/snackbarSlice";
import { msg } from "../../../utilities/gen";
import CircularProgress from "@mui/material/CircularProgress";
import SnackbarMsg from "../../../components/Snackbar/SnackbarMsg";
import { SessionState } from "../../../features/session/session";
import Trans from "../../../widgets/Trans";

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

const theme = createTheme();

export default function SignUp() {
   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);
   const db = getFirestore(app);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const session: SessionState = useAppSelector((state) => state.session);
   const snackbar: SnackbarState = useAppSelector((state) => state.snackbar);
   const {lang} = session;

   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);

   const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
   ) => {
      event.preventDefault();
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);

      const data = new FormData(event.currentTarget);

      const email: any = data.get("email");
      const password: any = data.get("password");

      if (isValidEmail(email) && isValidPassword(password)) {
         dispatch(setSnackbar(msg(lang === 'es'? `
         Intentando registrarse` : `Attempting Signup...`, "info")));
         try {
            const resp: any = await createUserWithEmailAndPassword(
               auth,
               email,
               password
            );
            console.log(resp);
            setSuccess(true);
            dispatch(setSnackbar(msg(`Signup Success`, "success")));
         } catch (error: any) {
            error.toString().includes("email-already-in-use")
               ? dispatch(setSnackbar(msg(`Email already in use`, "error")))
               : dispatch(setSnackbar(msg(`Signup Failed`, "error")));

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
                        <Trans txt="Create Account" />
                     </Typography>
                     {success ? (
                        <>
                           New account success
                           <div style={{ padding: 20 }} />
                           <Button onClick={()=>navigate('/login')} >
                              Go To Login
                           </Button>
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
                                    label={<Trans txt='Email Address' />}
                                    name='email'
                                    autoComplete='email'
                                 />
                              </Grid>
                              <Grid item xs={12}>
                                 <FormControl
                                    size='small'
                                    sx={{ width: "100%" }}
                                    variant='outlined'
                                 >
                                    <InputLabel htmlFor='outlined-adornment-password'>
                                    <Trans txt="Password" />
                                    </InputLabel>
                                    <OutlinedInput
                                       size='small'
                                       type={showPassword ? "text" : "password"}
                                       defaultValue=''
                                       id='password'
                                       name='password'
                                       endAdornment={
                                          <InputAdornment position='end'>
                                             <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={() =>
                                                   setShowPassword(
                                                      !showPassword
                                                   )
                                                }
                                                onMouseDown={
                                                   handleMouseDownPassword
                                                }
                                                edge='end'
                                             >
                                                {showPassword ? (
                                                   <VisibilityOff />
                                                ) : (
                                                   <Visibility />
                                                )}
                                             </IconButton>
                                          </InputAdornment>
                                       }
                                       label='Password'
                                    />
                                 </FormControl>
                              </Grid>
                              <Grid item xs={12}>
                                 <TextField
                                    required
                                    fullWidth
                                    size='small'
                                    id='First_Name'
                                    label={<Trans txt="First Name" />}
                                    name='First_Name'
                                    autoComplete='first_name'
                                 />
                              </Grid>
                              <Grid item xs={12}>
                                 <TextField
                                    required
                                    fullWidth
                                    size='small'
                                    id='Last_Name'
                                    label={<Trans txt='Last Name' />}
                                    name='Last_Name'
                                    autoComplete='last_name'
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
                                    <Trans txt="Continue" />
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
                                 <Button onClick={()=>navigate('/login')} >
                                 <Trans txt="Already have an account? Log in" />
                                 </Button>
                              </Grid>
                           </Grid>
                        </Box>
                     )}
                  </Box>
               </Container>
            </Paper>
            <SnackbarMsg />
         </div>
      </div>
   );
}
