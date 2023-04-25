import React from "react";

import Button from '@mui/material/Button';
import { SessionState } from "../../features/session/session";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSession } from "../../features/session/sessionSlice";

const fStyle = {
    width: 28,
    height: 20,
    marginRight: 5
}

export default function LangChose(): JSX.Element {
    const dis = useAppDispatch();
    const session:SessionState = useAppSelector((state) => state.session);
    const startSetLanguage = (lang: string) => {
        dis(setSession({ ...session, language: lang }));
    }
    return (
        <div style={{position:"fixed",bottom:10,left:10}} >
            {session.language === 'es' ? 
            <Button size='small' onClick={() => startSetLanguage('en')}><img src="./img/flags/gb.png" alt="English" style={fStyle}  /> English</Button> :             
            <Button size='small' onClick={() => startSetLanguage('es')}><img src="./img/flags/es.png" alt="Spanish" style={fStyle} /> Español</Button>
            }
        </div>
    )
}