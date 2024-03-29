import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./components/themes/Theme";
import ProtectedRoute from "./utilities/ProtectedRoute";
import CssBaseline from "@mui/material/CssBaseline";
import CookieConsent from "./components/CookieConsent";
import "./App.css";
import Login from "./pages/Login";
import Clients from "./pages/Protected";
import SignUp from "./pages/Public/Signup";
import Forgot from "./pages/Public/Forgot";
import { SessionState } from "./features/session/session";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Terms from "./pages/Public/Legal/Terms";
import Privacy from "./pages/Public/Legal/Privacy";
import GoogleTranslate from "./widgets/GoogleTranslate";
import { setSession } from "./features/session/sessionSlice";

export default function App() {
   // import session from redux store
   const session: SessionState = useAppSelector((state: any) => state.session);

   //const dispatch = useAppDispatch();
   const { darkMode, loadInit } = session;

   useEffect(() => {
      // update template
   }, [darkMode]);
   return (
      <>
         <GoogleTranslate />
         <Suspense fallback={<div>Loading...</div>}>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
               <CssBaseline />
               <Routes>
                  <Route path='' element={<Login />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/sign-up' element={<SignUp />} />
                  <Route path='/forgot' element={<Forgot />} />
                  <Route path='/privacy' element={<Privacy />} />
                  <Route path='/terms' element={<Terms />} />

                  <Route element={<ProtectedRoute />}>
                     <Route path='/clients/:page' element={<Clients />} />
                     <Route path='/clients' element={<Clients />} />
                  </Route>
               </Routes>
            </ThemeProvider>
         </Suspense>
      </>
   );
}
