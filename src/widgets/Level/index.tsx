import { color1, color2, color3, color4, color5 } from "../../constants/colors";

export const Level = ({ level }: { level: number }) => {
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
            border: "1px solid #bbb",
            width: "25px",
            height: "25px",
            padding: "2px 5px",
            textAlign: "center",
         }}
      >
         {level}
      </div>
   );
};
