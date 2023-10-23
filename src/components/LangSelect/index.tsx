import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SessionState } from "../../features/session/session";
import { setSession } from "../../features/session/sessionSlice";

const LanguageSelector = () => {
   const [selectedLanguage, setSelectedLanguage] = useState("english"); // i18n.language contains the language assigned to lng in i18n.js file.

   const dispatch = useAppDispatch();
   const session: SessionState = useAppSelector((state) => state.session);

   const chooseLanguage = (e: any) => {
      e.preventDefault();
      // session.lang = e.target.value;
      // dispatch(session);
      dispatch(dispatch(setSession({ ...session, lang: e.target.value })));
   };

   return (
      <div className='fixed-bottom-right'>
         <select defaultValue={selectedLanguage} onChange={chooseLanguage}>
            <option value='en'>English</option>
            <option value='es'>Espanol</option>
            <option value='fr'>French</option>
            <option value='it'>Italian</option>
            <option value='po'>Portuguese</option>
         </select>
      </div>
   );
};

export default LanguageSelector;
