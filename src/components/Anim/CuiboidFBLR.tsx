import { getFirstNonSpannedColumnToRender } from "@mui/x-data-grid/hooks/features/columns/gridColumnsUtils";
import Obj from "anim-3d-obj/dist/cjs/components/Obj";
import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { animBuild, hor90, noAnim, testAnim } from "./_anims";

// FBLR = Front Back Left Right

interface CuboidFBLRProps {
   front?: string | any;
   back?: string | any;
   left?: string | any;
   right?: string | any;
   css?: string;
   body?: any;
   width?: number;
   height?: number;
   depth?: number;
   children?: any;
   direction?: string;
   animCount?: number;
}

export default (props: CuboidFBLRProps) => {
   const anims: any = useAppSelector((state) => state.anims);
   const session: any = useAppSelector((state) => state.session);
   const {
      front = "",
      left = "",
      right = "",
      back = "",
      width = 200,
      height = 60,
      depth = 200,
      css = "",
      body = "",
      children = "",
      direction = "forwards",
      animCount = 0,
   } = props;
   const faceprops = {
      front: true,
      back: true,
      left: true,
      right: true,
   };

   const global = {
      css,
      body,
   };

   const custom = {
      bottom: {},
      front: { body: front },
      left: { body: left },
      right: { body: right },
      back: { body: back },
   };

   useEffect(() => {
      //trigger new animation
   }, [anims]);

   return (
      <>
         <Obj
            width={width}
            height={height}
            depth={depth}
            perspectiveOrigin='50% 50%'
            zIndex={10}
            anim1={animBuild(
               hor90[animCount],
               session.speed * 3,
               0,
               direction,
               "forwards",
               1
            )}
            anim2={noAnim}
            custom={custom}
            faces={faceprops}
            global={global}
         >
            {children}
         </Obj>
         <div style={{ padding: 5 }} />
      </>
   );
};
