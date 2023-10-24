import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
   resources: {
      en: {
         translation: require("./i18n/en.json"),
      },
      es: {
         translation: require("./i18n/es.json"),
      },
      fr: {
         translation: require("./i18n/fr.json"),
      },
   },
   lng: "en", // Set the default language
   interpolation: {
      escapeValue: false, // Allows using HTML tags in translations
   },
});

export default i18n;
