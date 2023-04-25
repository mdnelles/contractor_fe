import React, { useRef } from "react";
import { gsap } from "gsap";
import { useAppSelector } from "../../../app/hooks";

interface AllProps {
   children: any;
}

export default (props: AllProps): JSX.Element => {
   const { children } = props;
   const ref = useRef(null);

   const session: any = useAppSelector((state) => state.session);
   const { speed } = session;

   gsap.fromTo(
      ref.current,
      { y: 50, opacity: 0 },
      {
         y: 0,
         opacity: 1,
         duration: speed * 5,
         ease: "circ.out",
         clear: "both",
      }
   );

   return (
      <div ref={ref} className='body-wrapper'>
         <div className='body-child'>{children}</div>


      </div>
   );
};
