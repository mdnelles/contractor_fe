import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { DialogState } from "../../features/dialog/dialog";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearDialog } from "../../features/dialog/dialogSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default (): JSX.Element => {
  const dis = useAppDispatch();
  const dialog: DialogState = useAppSelector((state) => state.dialog);
  const { open, content, params } = dialog;
  console.log(dialog);
  const handleClose = () => {
    dis(clearDialog());
  };

  const compPicker = (content: string, params: any): any => {
    switch (content) {
      default:
        return "na";
    }
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        {compPicker(content, params)}
      </Dialog>
    </>
  );
};
