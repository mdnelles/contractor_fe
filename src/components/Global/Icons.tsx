import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
export const Success = () => {
   return (
      <>
         <CheckCircleIcon color='success' />
      </>
   );
};

export const Loading = () => {
   return (
      <>
         <HourglassTopIcon color='info' /> Loading from Database
      </>
   );
};
