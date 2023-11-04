import React, { useEffect } from "react";
import "./GoogleTranslate.css";

const GoogleTranslate: React.FC = () => {
   const supportedLanguages = ["fr", "en", "es"];

   const loadGoogleTranslateScript = () => {
      if ((window as any).googleTranslateElementInit) {
         return;
      }

      const script = document.createElement("script");
      script.src =
         "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.onerror = () => {
         console.error("Error loading Google Translate script");
      };
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
         new (window as any).google.translate.TranslateElement(
            {
               pageLanguage: "en",
            },
            "google_translate_element"
         );
      };
   };

   useEffect(() => {
      const initGoogleTranslate = () => {
         if (typeof (window as any).googleTranslateElementInit === "function") {
            (window as any).googleTranslateElementInit = () => {
               // Initialize Google Translate
               new (window as any).google.translate.TranslateElement(
                  {
                     pageLanguage: "en",
                  },
                  "google_translate_element"
               );

               // Find the select element
               const select = document.querySelector(
                  ".goog-te-combo"
               ) as HTMLSelectElement | null;

               // Find the target div
               const targetDiv = document.getElementById(
                  "google_translate_element"
               );

               if (select && targetDiv) {
                  // Append the select element to the target div
                  targetDiv.appendChild(select);
               }
            };
         }
      };

      const checkScript = () => {
         if (typeof (window as any).googleTranslateElementInit === "function") {
            initGoogleTranslate();
         } else {
            // If the script hasn't loaded yet, check again after a delay
            setTimeout(checkScript, 100);
         }
      };

      // Load the Google Translate script
      loadGoogleTranslateScript();

      // Check if the script has loaded
      checkScript();
   }, []);

   const changeLanguage = (languageCode: string) => {
      console.log("changeLanguage", languageCode);
      // make all items of .flagButton have opactiy of .3
      const flagButtons = document.querySelectorAll(".flagButton");
      flagButtons.forEach((flagButton) => {
         (flagButton as HTMLElement).style.opacity = ".3";
      });
      // make the clicked flagButton have opacity of 1
      const flagButton: any = document.getElementById("flag_" + languageCode);
      (flagButton as HTMLElement).style.opacity = "1";
      const select = document.querySelector(
         ".goog-te-combo"
      ) as HTMLSelectElement | null;
      if (select) {
         select.value = languageCode; // Set the selected language
         select.dispatchEvent(new Event("change"));
         setTimeout(() => {
            select.dispatchEvent(new Event("change")); // Trigger a change event to update the translation
         }, 300);
      }
   };

   return (
      <div
         style={{
            position: "fixed",
            bottom: 15,
            right: 15,
            zIndex: 125,
            padding: 0,
            margin: 0,
            overflow: "hidden",
         }}
      >
         <div id='google_translate_element'></div>

         <img
            src='./img/flags/gb.png'
            alt='English'
            id='flag_en'
            onClick={() => changeLanguage("en")}
            className='flagButton'
         />
         <img
            src='./img/flags/es.png'
            alt='Español'
            id='flag_es'
            onClick={() => changeLanguage("es")}
            className='flagButton'
         />
         <img
            src='./img/flags/fr.png'
            alt='French'
            id='flag_fr'
            onClick={() => changeLanguage("fr")}
            className='flagButton'
         />
         <img
            src='./img/flags/br.png'
            alt='Portuguese'
            id='flag_pt'
            onClick={() => changeLanguage("pt")}
            className='flagButton'
         />
      </div>
   );
};

export default GoogleTranslate;
