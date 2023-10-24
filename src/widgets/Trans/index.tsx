import React, { useState, useEffect } from "react";
import { SessionState } from "../../features/session/session";
import { useAppSelector } from "../../app/hooks";
import { es } from "./es";
import { en } from "./en";
import { fr } from "./fr";

function Translate(props: { txt: string }): JSX.Element {
   const { txt = "header.login" } = props;
   const [value, setValue] = useState("");
   const session: SessionState = useAppSelector((state: any) => state.session);
   const { lang } = session;

   const getTranslation = (language: string, key: string) => {
      //console.log(languageMap[language][key], language, key);
      //console.log(languageMap[lang]["button"]["loginGoogle"]);
      const tmp = key.split(".");
      if (languageMap[language] && languageMap[language][tmp[0]][tmp[1]]) {
         console.log("here");
         return languageMap[language][tmp[0]][tmp[1]];
      }
      return "nnn";
   };

   // Language map
   const languageMap: any = { en, fr, es };

   useEffect(() => {
      setValue(getTranslation(lang, txt));
   }, [lang]);

   if (value !== "") {
      console.log(value, txt);
      return <>{value}</>;
   } else {
      return <></>; // Handle loading or error state as needed
   }
}

export default Translate;
