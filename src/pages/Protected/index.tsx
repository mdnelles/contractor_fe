import React from "react";
import { useParams } from "react-router-dom";
import DashboardTemplate from "../../components/TemplateMembers/DashboardTemplate";
import Ticket from "./Ticket";
import Account from "./Account";
import Calendar from "./Calendar";

import Profile from "./Profile/Profile";
import Todo from "./Todo";
import Guide from "./Guide";
import Orders from "./Orders";
import Members from "./Members";
import Stores from "./Stores";

export default function Clients(): JSX.Element {
   const { page } = useParams();
   const pageChooser = () => {
      switch (page) {
         case "account":
            return <Account />;
         case "support":
            return <Ticket />;
         case "guide":
            return <Guide />;
         case "calendar":
            return <Calendar />;
         case "orders":
            return <Orders />;
         case "members":
            return <Members />;
         case "stores":
            return <Stores />;
         case "todo":
            return <Todo />;
         case "profile":
            return <Profile />;

         default:
            return <Profile />;
      }
   };
   return <DashboardTemplate>{pageChooser()}</DashboardTemplate>;
}
