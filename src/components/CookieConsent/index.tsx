import Button from "@mui/material/Button";
import React from "react";
import { Navigate, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSession } from "../../features/session/sessionSlice";

export default () => {
   const dis = useAppDispatch();
   const session: any = useAppSelector((state) => state.session);
   const handleAgree = () => {
      dis(setSession({ ...session, cookieConsent: true }));
   };
   const handleDecline = () => {
      window.location.replace("https://www.google.com");
   };
   return (
      <>
         <div className='cookie-banner'>
            This website uses cookies We use cookies to personalise content and
            ads, to provide social media features and to analyse our traffic. We
            also share information about your use of our site with our social
            media, advertising and analytics partners who may combine it with
            other information that you’ve provided to them or that they’ve
            collected from your use of their services.
            <br />
            <Button onClick={handleAgree}>Agree</Button>
            <Button onClick={handleDecline}>Decline</Button>
         </div>
      </>
   );
};
