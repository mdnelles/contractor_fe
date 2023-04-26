// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// module.exports = {
//    preset: "ts-jest",
//    testEnvironment: "jsdom",
//    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
// };

module.exports = {
   preset: 'ts-jest',
   transform: {
     '^.+\\.(ts|tsx)?$': 'ts-jest',
     "^.+\\.(js|jsx)$": "babel-jest",
   }
 };