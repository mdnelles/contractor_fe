import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { DialogState } from "../../features/dialog/dialog";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearDialog } from "../../features/dialog/dialogSlice";
import DialogMemberEdit from "../../pages/Protected/Members/DialogMemberEdit";
import DialogMemberView from "../../pages/Protected/Members/DialoagMemberView";
import DialogMemberHistory from "../../pages/Protected/Members/DialogMemberHistory";
import DialogContractEdit from "../../pages/Protected/Contracts/DialogContractEdit";
import DialogContractView from "../../pages/Protected/Contracts/DialogContractView";

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement<any, any>;
   },
   ref: React.Ref<unknown>
) {
   return <Slide direction='up' ref={ref} {...props} />;
});

export default React.memo((): JSX.Element => {
   const dis = useAppDispatch();
   const dialog: DialogState = useAppSelector((state) => state.dialog);
   const { open, content, params } = dialog;

   const handleClose = () => {
      dis(clearDialog());
   };

   const compPicker = (content: string, params: any): any => {
      switch (content) {
         case "History":
            return <DialogMemberHistory params={params} />;
         case "View":
            return <DialogMemberView params={params} />;
         case "Edit":
            return <DialogMemberEdit params={params} />;

         case "ViewContract":
            return <DialogContractView params={params} />;
         case "EditContract":
            return <DialogContractEdit params={params} />;

         default:
            return <DialogMemberEdit params={params} />;
      }
   };

   return (
      <>
         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            maxWidth='xl'
         >
            {compPicker(content, params)}
         </Dialog>
      </>
   );
});
