const fs = require("fs");
const glob = require("glob");
const cheerio = require("cheerio");

// Create an object to store the human-readable translations.
const translationData = {};
const tmp = __dirname.split("/src");
const path = tmp[0];

// Define the source directory where you want to search for .tsx files.
const srcDirectory = path + "/src";

// Define a pattern to match .tsx files.
const tsxPattern = `${srcDirectory}/**/*.tsx`;

function extractTextFromFile(filePath) {
   console.log(filePath);
   const fileContent = fs.readFileSync(filePath, "utf8");
   const $ = cheerio.load(fileContent);

   // Find all text within JSX/HTML tags.
   $("*").each(function () {
      let elementText = $(this).text().trim();

      if (
         elementText !== "" &&
         !elementText.includes("{") &&
         !elementText.includes("}") &&
         !elementText.includes("#") &&
         elementText.length > 1 &&
         elementText !== " " &&
         elementText.length < 100
      ) {
         if (filePath.includes("ProtectedRoute.tsx")) {
            // Replace the elementText with <Trans>Element Text</Trans>
            console.log("-------------------");
            $("*").each(function () {
               console.log(">>" + $(this).text());
               $(this).text("<Trans>" + $(this).text() + "</Trans>");
            });
         }

         elementText = elementText
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .replace(/\s{2,}/g, " ")
            .replace(/\n/g, "");

         console.log(elementText);
         // Convert the text to a valid key and store it.
         const key =
            (/\d/.test(elementText[0]) ? "k" : "") + // Check if the first character is a number
            elementText
               .toLowerCase()
               .replace(/ /g, "-")
               .replace(/\./g, "")
               .replace(/-{2,}/g, "-");
         console.log(elementText);
         translationData[key] = elementText;
      }
   });
}

// Function to extract human-readable text from a JSX/HTML file.
// function extractTextFromFile(filePath) {
//    console.log(filePath);
//    const fileContent = fs.readFileSync(filePath, "utf8");
//    const regex = /<([^>]+)>(.*?)<\/\1>/g;

//    let matches;
//    while ((matches = regex.exec(fileContent))) {
//       const elementText = matches[2].trim();
//       //   if (elementText !== "" && /^[a-zA-Z0-9\s]+$/.test(elementText)) {
//       if (
//          elementText !== "" &&
//          elementText.includes("{") === false &&
//          elementText.includes("#") === false
//       ) {
//          console.log(elementText);
//          // Convert the text to a valid key and store it.
//          const key =
//             "k" +
//             elementText.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
//          console.log(elementText);
//          translationData[key] = elementText;
//       }
//    }
// }

// Function to write the translations to a JavaScript file.
function writeTranslationsToFile() {
   const translationFile = path + "/src/constants/translate/en.js";

   const translationsContent = `export const en = ${JSON.stringify(
      translationData,
      null,
      4
   )};\n`;

   fs.writeFileSync(translationFile, translationsContent, "utf8");
   console.log("Translations cataloged in en.js");
}

// Use glob.sync to find .tsx files in the source directory.
const files = glob.sync(tsxPattern);

// Process each .tsx file to extract human-readable text.
files.forEach((file) => {
   extractTextFromFile(file);
});

// Write the translations to a JavaScript file.
writeTranslationsToFile();
