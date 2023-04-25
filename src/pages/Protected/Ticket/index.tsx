import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { useAppSelector } from "../../../app/hooks";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { SnackbarState } from "../../../features/snackbar/snackbar";

export default function Ticket() {
   const session: any = useAppSelector((state) => state.session);
   const { email } = session.user;
   const snackbar: SnackbarState = useAppSelector((state) => state.snackbar);
   const speed = session.speed;
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);

   const submitTicket = async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
   ) => {
      event.preventDefault();
      setSuccess(false);
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
         setSuccess(true);
      }, 2000);
   };
   return (
      <React.Fragment>
         <Card sx={{ margin: 2, padding: 5 }}>
            <Typography variant='h6' gutterBottom>
               Submit Support ticket
            </Typography>
            {success ? (
               "Form submitted"
            ) : (
               <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        required
                        id='firstName'
                        name='firstName'
                        label='First name'
                        fullWidth
                        size='small'
                        autoComplete='given-name'
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        required
                        id='lastName'
                        name='lastName'
                        label='Last name'
                        fullWidth
                        autoComplete='family-name'
                        size='small'
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        required
                        id='email'
                        name='email'
                        label='Email Adress'
                        fullWidth
                        autoComplete='email address'
                        size='small'
                        defaultValue={email}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        required
                        id='address1'
                        name='address1'
                        label='Address line 1'
                        fullWidth
                        autoComplete='shipping address-line1'
                        size='small'
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        id='address2'
                        name='address2'
                        label='Address line 2'
                        fullWidth
                        autoComplete='address-line2'
                        size='small'
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        required
                        id='city'
                        name='city'
                        label='City'
                        fullWidth
                        autoComplete='address-level2'
                        size='small'
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id='state'
                        name='state'
                        label='State/Province/Region'
                        fullWidth
                        size='small'
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        required
                        id='zip'
                        name='zip'
                        label='Zip / Postal code'
                        fullWidth
                        autoComplete='postal-code'
                        size='small'
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        required
                        id='country'
                        name='country'
                        label='Country'
                        fullWidth
                        autoComplete='country'
                        size='small'
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <TextField
                        required
                        id='explaination'
                        name='explaination'
                        label='Explaination'
                        multiline
                        rows={5}
                        fullWidth
                        autoComplete='sexplaination'
                        size='small'
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <Box
                        sx={{
                           position: "relative",
                           mb: 3,
                           mt: 2,
                        }}
                     >
                        <Button
                           type='submit'
                           fullWidth
                           size='small'
                           variant='contained'
                           disabled={loading}
                           onClick={(event) => submitTicket(event)}
                        >
                           Submit Ticket
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
                  </Grid>
               </Grid>
            )}
         </Card>
      </React.Fragment>
   );
}
