import React, { useEffect, useRef, useState } from "react";
import Obj from "anim-3d-obj/dist/cjs/components/Obj";
import { gsap } from "gsap";
import { useAppSelector } from "../../../app/hooks";

interface AllProps {
   children: any;
}

export default (props: AllProps): JSX.Element => {
   const { children } = props;
   const ref = useRef(null);

   const page: any = useAppSelector((state) => state.page);

   const session: any = useAppSelector((state) => state.session);
   const { speed } = session;

   gsap.fromTo(
      ref.current,
      { y: 0, opacity: 0 },
      {
         y: 50,
         opacity: 1,
         duration: speed * 3,
         ease: "circ.out",
      }
   );

   const faceprops = {
      top: true,
   };

   const global = {};
   const anim1 = {
      border: "",
      degreesHi: -45, // degrees if spin
      degreesLow: 45, // degrees if spin
      delay: 0,
      direction: "normal", //normal altenating reverse
      duration: 1,
      fillMode: "forwards", // node forwards backwards both
      iterationCount: 1,
      name: "fwdx09",
      timing: "ease-in-out", // linear ease ease-in-out
   };
   const anim2 = {};

   const custom: object = {
      top: { body: children },
   };

   useEffect(() => {
      // make sure animation restarts
   }, [page.toggle]);

   return (
      <div ref={ref} className='title-wrapper'>
         {children}
      </div>
   );
};
