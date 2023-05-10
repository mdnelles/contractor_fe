import Badge, { BadgeProps } from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import React from "react";
import { styled } from "@mui/material/styles";

interface LegendProps {
   color: string;
   num: number;
   label: string;
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
   "& .MuiBadge-badge": {
      right: 13,
      top: 2,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
   },
}));

export default function Legend(props: LegendProps): JSX.Element {
   const { color, num, label } = props;
   return (
      <>
         <StyledBadge badgeContent={num} color='primary'>
            <Chip label={label} sx={{ backgroundColor: color, mr: 1, mb: 2 }} />
         </StyledBadge>
      </>
   );
}
