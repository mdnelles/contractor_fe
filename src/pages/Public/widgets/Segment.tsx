import React, { JSXElementConstructor } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface SegmentProps {
   img: string;
   copy?: string | JSX.Element | any;
   title: string;
   sub?: string | any;
   height?: number;
}

export default function Segment(props: SegmentProps): JSX.Element {
   const { img, title, sub = "", height = 200, copy = "" } = props;
   return (
      <div style={{ paddingTop: 25 }}>
         <Card sx={{ display: "flex", height }}>
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: 600,
               }}
            >
               <CardContent sx={{ flex: "1 0 auto" }}>
                  <strong>{title}</strong>
                  <Typography
                     variant='subtitle1'
                     color='text.secondary'
                     component='div'
                  >
                     {sub}
                  </Typography>
               </CardContent>
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "right",
                     pl: 2,
                     pb: 2,
                  }}
               >
                  {copy}
               </Box>
            </Box>
            <CardMedia component='img' sx={{ maxWidth: "50%" }} image={img} />
         </Card>
      </div>
   );
}
