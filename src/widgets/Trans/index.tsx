import React, { memo, useEffect } from "react";
import { TransState } from "../../features/transalte/translate";
import { useAppSelector } from "../../app/hooks";
import { SessionState } from "../../features/session/session";

function Translate(props: { txt: string }): JSX.Element {
  let { txt } = props;
  const trans: TransState = useAppSelector((state) => state.trans);
  const session: SessionState = useAppSelector((state) => state.session);
  const { lang } = session;
  if (lang === "sp") {
    trans.arr.map((item) => {
      if (item.en.toString().toUpperCase() === txt.toString().toUpperCase()) {
        txt = item.sp;
        // swap out non-serializable data in the variable txt
        txt = JSON.parse(JSON.stringify(txt));
      }
    });
  }
  useEffect(() => {
    // only change memo if you see a change in state lang
  }, [lang]);

  return <>{txt}</>;
}
export default memo(Translate);
