import React from "react";
import { TransState } from "../../features/transalte/translate";
import { useAppSelector } from "../../app/hooks";
import { SessionState } from "../../features/session/session";


export default function Translate(props:{txt:string}):JSX.Element {
    let {txt} = props;
    const trans:TransState = useAppSelector((state) => state.trans);
    const session: SessionState = useAppSelector((state) => state.session);
    const {lang} = session;
    if(lang === 'es'){
        // iterate through trans.arr if there is a match of txt and arr.en save it to txt
        trans.arr.map((item) => {
            // make the following check case insensitive

            if(item.en.toString().toUpperCase() === txt.toString().toUpperCase()){
                txt = item.es;
            }
        })
    }
    return (
        <>
           {txt}
        </>
    )
}