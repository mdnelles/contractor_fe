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
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { firebaseConfig } from "../../../firebase/constants";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { useState } from "react";
import { isValidEmail } from "../../../utilities/validate";
import { setSnackbar } from "../../../features/snackbar/snackbarSlice";
import { msg } from "../../../utilities/gen";
import CircularProgress from "@mui/material/CircularProgress";
import SnackbarMsg from "../../../components/Snackbar/SnackbarMsg";
import Trans from "../../../widgets/Trans";

const theme = createTheme();

export default function SignUp() {
   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);

      const data = new FormData(event.currentTarget);

      const email: any = data.get("email");

      if (isValidEmail(email)) {
         //dispatch(setSnackbar(msg(<Trans txt="Searching for account" />, "info")));
         try {
            const resp: any = await sendPasswordResetEmail(auth, email);
            console.log(resp);
            setSuccess(true);
            dispatch(
               setSnackbar(
                  msg(<Trans txt='Password Reset Success' />, "success")
               )
            );
         } catch (error: any) {
            dispatch(
               setSnackbar(msg(<Trans txt='Email not found' />, "error"))
            );

            setLoading(false);
         }
      } else {
         setLoading(false);
         dispatch(
            setSnackbar(
               msg(<Trans txt='Please enter a valid email' />, "error")
            )
         );
      }
   };

   const goHome = () => navigate(`/`);

   return (
      <div className='vertical-center center-outer'>
         <div className='center-inner'>
            <SnackbarMsg />
            <Paper sx={{ mt: 7, ml: 3, mr: 3, padding: 3 }}>
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
                        <Trans txt='Forgot Password' />
                     </Typography>
                     {success ? (
                        <>
                           <Trans txt='Email reset Button sent' />
                           <div style={{ padding: 20 }} />
                           <Button onClick={() => navigate("/login")}>
                              <Trans txt='Go To Login' />
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
                                 <Button
                                    fullWidth
                                    type='submit'
                                    size='small'
                                    variant='contained'
                                    disabled={loading}
                                    sx={{ textTransform: "none" }}
                                 >
                                    <Trans txt='Reset Password' />
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
                                 <Button
                                    onClick={() => navigate("/login")}
                                    size='small'
                                    sx={{ textTransform: "none" }}
                                 >
                                    <Trans txt='Go To Login' />
                                 </Button>
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
