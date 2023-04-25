import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";

interface LoadingProps {
   name: string;
}

export default function Loading(props: LoadingProps): JSX.Element {
   const { name = "" } = props;
   return (
      <div
         style={{
            width: "100%",
            minHeight: 200,
            textAlign: "center",
            marginTop: 88,
         }}
      >
         Loading {name} <br />
         <CircularProgress />
      </div>
   );
}
