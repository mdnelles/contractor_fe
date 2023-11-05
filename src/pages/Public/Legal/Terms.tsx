import * as React from "react";
import "../../../App.css";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

export default function Terms() {
   const navigate = useNavigate();
   return (
      <div className='center-outer'>
         <div className='center-inner'>
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
                        onClick={() => navigate("/login")}
                        style={{
                           borderRadius: 5,
                           border: "1px solid #777",
                           margin: 5,
                           cursor: "pointer",
                        }}
                     />
                     <Typography component='h1' variant='h5'>
                        Terms of Use
                     </Typography>
                     <Box sx={{ mt: 2 }}>
                        <p>
                           By using Direct Property Care , you agree to comply
                           with and be bound by these Terms of Use. If you do
                           not agree to these terms, please do not use our
                           website.
                        </p>

                        <h2>1. User Responsibilities</h2>

                        <p>By using this website, you agree to:</p>

                        <ul>
                           <li>
                              Comply with all applicable laws and regulations
                           </li>
                           <li>
                              Respect the intellectual property rights of Direct
                              Property Care and other users
                           </li>
                           <li>
                              Not engage in any unlawful or harmful activities
                              while using our website
                           </li>
                           <li>
                              Not attempt to gain unauthorized access to our
                              systems or other users' accounts
                           </li>
                        </ul>

                        <h2>2. Intellectual Property</h2>

                        <p>
                           All content and materials on Direct Property Care ,
                           unless otherwise specified, are the intellectual
                           property of Direct Property Care and are protected by
                           copyright, trademark, and other laws. You may not
                           use, reproduce, or distribute these materials without
                           our express written permission.
                        </p>

                        <h2>3. Disclaimers</h2>

                        <p>
                           We provide our website "as is" and do not guarantee
                           its accuracy, completeness, or reliability. We are
                           not responsible for any errors, omissions, or actions
                           taken based on the information provided on this
                           website.
                        </p>

                        <h2>4. Limitation of Liability</h2>

                        <p>
                           We are not liable for any damages, whether direct,
                           indirect, incidental, or consequential, arising from
                           your use of Direct Property Care . This includes, but
                           is not limited to, loss of data, loss of revenue, and
                           interruption of business operations.
                        </p>

                        <h2>5. Privacy Policy</h2>

                        <p>
                           Your use of our website is also governed by our
                           Privacy Policy. Please review it to understand how we
                           collect, use, and protect your personal information.
                        </p>

                        <h2>6. Changes to Terms</h2>

                        <p>
                           We may update these Terms of Use from time to time.
                           The latest version will always be available on our
                           website with the effective date. Your continued use
                           of our website constitutes your acceptance of these
                           changes.
                        </p>

                        <h2>7. Contact Us</h2>

                        <p>
                           If you have any questions or concerns about these
                           Terms of Use, please contact us at [Your Contact
                           Information].
                        </p>
                     </Box>
                     <Box component='form' noValidate sx={{ mt: 2 }}>
                        <Grid container>
                           <Grid item xs>
                              <Button
                                 onClick={() => navigate("/login")}
                                 size='small'
                                 sx={{ textTransform: "none" }}
                              >
                                 Home
                              </Button>
                           </Grid>
                        </Grid>
                     </Box>
                  </Box>
               </Container>{" "}
            </Paper>
         </div>
         <br />
      </div>
   );
}
