import React, { useState } from "react";

const LanguageSelector = () => {
   const [selectedLanguage, setSelectedLanguage] = useState("english"); // i18n.language contains the language assigned to lng in i18n.js file.

   const chooseLanguage = (e: any) => {
      e.preventDefault();
      //i18n.changeLanguage(e.target.value);   // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
      //setSelectedLanguage(e.target.value);
      //localStorage.setItem("lang", e.target.value);
   };

   return (
      <select defaultValue={selectedLanguage} onChange={chooseLanguage}>
         <option value='es'>Espanol</option>
         <option value='en'>English</option>
         <option value='it'>Italian</option>
      </select>
   );
};

export default LanguageSelector;
