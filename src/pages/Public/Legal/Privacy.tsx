import * as React from "react";
import "../../../App.css";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Trans from "../../../widgets/Trans";
import { useNavigate } from "react-router-dom";

export default function Privacy() {
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
                        <Trans txt='Privacy' />
                     </Typography>
                     <Box sx={{ mt: 2 }}>
                        <h1>Privacy Policy</h1>

                        <p>
                           At Direct Property Care, we are committed to
                           protecting your privacy. This Privacy Policy
                           describes the types of information we collect, how we
                           use it, and how we protect it.
                        </p>

                        <h2>Information We Collect</h2>

                        <p>
                           We may collect various types of information,
                           including but not limited to:
                        </p>

                        <ul>
                           <li>
                              <strong>Personal Information:</strong> This may
                              include your name, email address, phone number,
                              and other information you provide when contacting
                              us or signing up for our services.
                           </li>
                           <li>
                              <strong>Log Data:</strong> We automatically
                              collect information such as your IP address,
                              browser type, the pages you visit, and other usage
                              information.
                           </li>
                           <li>
                              <strong>Cookies:</strong> We use cookies and
                              similar tracking technologies to enhance your
                              browsing experience and collect data about your
                              interactions with our website.
                           </li>
                        </ul>

                        <h2>How We Use Your Information</h2>

                        <p>
                           We may use the information we collect for various
                           purposes, including:
                        </p>

                        <ul>
                           <li>Providing and improving our services</li>
                           <li>Communicating with you</li>
                           <li>Analyzing website usage and trends</li>
                           <li>Preventing fraud and enhancing security</li>
                        </ul>

                        <h2>Sharing Your Information</h2>

                        <p>
                           We do not sell or rent your personal information to
                           third parties. However, we may share information
                           with:
                        </p>

                        <ul>
                           <li>
                              Service providers who assist us in delivering our
                              services
                           </li>
                           <li>
                              Law enforcement or government authorities when
                              required by law
                           </li>
                        </ul>

                        <h2>Security</h2>

                        <p>
                           We take security measures to protect your information
                           from unauthorized access, disclosure, or alteration.
                           However, no online data transmission or storage is
                           entirely secure, so we cannot guarantee absolute
                           security.
                        </p>

                        <h2>Your Choices</h2>

                        <p>
                           You have the right to access, update, or delete your
                           personal information. You can also opt out of certain
                           communications. To exercise these rights, please
                           contact us at [Your Contact Information].
                        </p>

                        <h2>Changes to this Privacy Policy</h2>

                        <p>
                           We may update this Privacy Policy from time to time.
                           The latest version will always be available on our
                           website with the effective date.
                        </p>

                        <h2>Contact Us</h2>

                        <p>
                           If you have any questions or concerns about this
                           Privacy Policy, please contact us at [Your Contact
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
                                 <Trans txt='Back' />
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
