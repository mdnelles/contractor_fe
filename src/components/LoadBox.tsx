import { Button, Grid, LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Success } from "./Global/Icons";

interface LoadBoxProps {
   handleFunction: any;
   obj: any;
   title: string;
}

export default function LoadBox(props: LoadBoxProps): JSX.Element {
   const { handleFunction, obj, title } = props;

   return (
      <>
         <Paper sx={{ margin: 2, padding: 2 }}>
            {!obj.init ? (
               <Box sx={{ width: "100%" }}>
                  Loading {title}...
                  <LinearProgress />
               </Box>
            ) : (
               <>
                  {title} are loaded count :
                  {!!obj && obj.arr ? obj.arr.length : 0}
                  <hr />
                  <Grid container spacing={2}>
                     <Grid item xs={6}>
                        <Success />
                     </Grid>
                     <Grid item xs={6} style={{ textAlign: "right" }}>
                        <Button
                           onClick={handleFunction}
                           size='small'
                           variant='outlined'
                        >
                           Reload
                        </Button>
                     </Grid>
                  </Grid>
               </>
            )}
         </Paper>
      </>
   );
}
