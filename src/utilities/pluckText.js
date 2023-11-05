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

function extractTextFromReturns(filePath) {
   console.log(filePath);
   const fileContent = fs.readFileSync(filePath, "utf8");

   const returnMatches = fileContent.match(/return\s+\((.*?)\)/gs);
   if (returnMatches) {
      for (const returnMatch of returnMatches) {
         const returnContent = returnMatch.match(/\((.*?)\)/s);
         if (returnContent) {
            const contentToParse = returnContent[1];
            const $ = cheerio.load(contentToParse);

            // Find all text within JSX/HTML tags.
            $("*").each(function () {
               let elementText = $(this).text().trim();
               //console.log(elementText);
               if (
                  elementText &&
                  !elementText.includes("{") &&
                  !elementText.includes("}") &&
                  !elementText.includes("#") &&
                  elementText.length > 1 &&
                  elementText !== " " &&
                  elementText.length < 1000 &&
                  elementText.length > 1
               ) {
                  console.log("**acepted** " + elementText);
                  elementText = elementText
                     .replace(/[^a-zA-Z0-9\s]/g, "")
                     .replace(/\s{2,}/g, " ")
                     .replace(/\n/g, "")
                     .trim();

                  console.log(elementText);
                  // Convert the text to a valid key and store it.
                  const key =
                     (/\d/.test(elementText[0]) ? "k" : "") + // Check if the first character is a number
                     elementText
                        .toLowerCase()
                        .replace(/ /g, "-")
                        .replace(/\./g, "")
                        .replace(/-{2,}/g, "-")
                        .substring(0, 25);
                  console.log(elementText);
                  translationData[key] = elementText;
               } else {
                  console.log("**rejected**:" + elementText);
               }
            });
         }
      }
   }
}

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
   extractTextFromReturns(file);
});

// Write the translations to a JavaScript file.
writeTranslationsToFile();
