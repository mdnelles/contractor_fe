const fs = require("fs");
const path = require("path");
const htmlparser = require("htmlparser2");

const directoryPath = "../";

// Function to parse HTML-like content using htmlparser2
function parseHTMLContent(content) {
   const textChunks = [];
   let currentText = "";

   const parser = new htmlparser.Parser({
      ontext(text) {
         currentText += text;
      },
      onclosetag(tagname) {
         if (tagname !== "br" && tagname !== "p" && tagname !== "div") {
            textChunks.push(currentText);
            currentText = "";
         }
      },
   });

   parser.write(content);
   parser.end();

   return textChunks.filter((text) => /[a-zA-Z0-9]/.test(text)).join(" ");
}

// Function to extract content inside the return statement
function extractReturnContent(data) {
   const returnMatch = data.match(/return\s*\((.*?)\)/s);
   if (returnMatch) {
      returnMatch[1] = returnMatch[1].trim();
      return returnMatch[1];
   }
   return "";
}

// Function to process a single .tsx file
function processFile(filePath) {
   console.log(`Parsing file: ${filePath}`);

   fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
         console.error(`Error reading file: ${filePath}`);
         console.error(err);
      } else {
         const returnContent = extractReturnContent(data);
         if (returnContent) {
            const parsedText = parseHTMLContent(returnContent);
            console.log("Parsed Text:");
            console.log(parsedText);
         }
      }
   });
}

// Main function to iterate through .tsx files in the directory
function iterateThroughFiles(directoryPath) {
   fs.readdir(directoryPath, (err, files) => {
      if (err) {
         console.error(`Error reading directory: ${directoryPath}`);
         console.error(err);
         return;
      }

      files.forEach((file) => {
         const filePath = path.join(directoryPath, file);

         if (fs.lstatSync(filePath).isDirectory()) {
            iterateThroughFiles(filePath);
         } else if (path.extname(filePath) === ".tsx") {
            processFile(filePath);
         }
      });
   });
}

iterateThroughFiles(directoryPath);
