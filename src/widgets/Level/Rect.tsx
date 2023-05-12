import { color1, color2, color3, color4, color5 } from "../../constants/colors";

export const Rect = (props: { level: number; children?: any; row?: any }) => {
   const { level, children, row } = props;
   console.log(row);
   const color =
      level === 1
         ? color1
         : level === 2
         ? color2
         : level === 3
         ? color3
         : level === 4
         ? color4
         : level === 5
         ? color5
         : "inherit";
   return (
      <div
         style={{
            backgroundColor: color,
            width: 255,
            height: 25,
            padding: "2px 5px",
            textAlign: "center",
            borderRadius: 15,
            overflow: "hidden",
            fontSize: 12,
         }}
      >
         {children || row.room || level}
      </div>
   );
};
