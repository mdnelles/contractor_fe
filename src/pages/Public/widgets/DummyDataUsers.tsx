// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { firebaseConfig } from "../../../firebase/constants";

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

import { addDoc } from "../../../utilities/MongoRequest";

function generateEmail(firstName: string, lastName: string) {
   const emailProviders = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "mail.com",
      "imail.io",
      "zmail.cc",
      "testmail.co",
   ];
   const randomProviderIndex = Math.floor(
      Math.random() * emailProviders.length
   );
   const emailProvider = emailProviders[randomProviderIndex];
   return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailProvider}`;
}

function generateRandomName() {
   const names = [
      "Joe",
      "Jane",
      "John",
      "Alice",
      "Bob",
      "Samantha",
      "Max",
      "Lila",
      "Oscar",
      "Olivia",
      "Rodrigo",
      "Sam",
      "Sara",
      "Sofia",
      "Sophia",
      "Thomas",
      "Tom",
      "William",
      "Zoe",
      "Zoey",
      "Zoie",
      "Allan",
      "Ava",
      "Clara",
      "Lillian",
      "Olivia",
      "Stella",
   ];
   const randomIndex = Math.floor(Math.random() * names.length);
   return names[randomIndex];
}

async function generateRandomUsers(numRecords: number) {
   const data = [];
   for (let i = 0; i < numRecords; i++) {
      const firstName = generateRandomName();
      const lastName = generateRandomName();
      const email = generateEmail(firstName, lastName);
      const record = { firstName, lastName, email };
      data.push(record);
      const userObj = {
         emailVarified: false,
         authProvider: "firebase",
         email,
         lastName,
         firstName,
         userLevel: 5,
         homeStore: Math.floor(Math.random() * 68) + 10,
         createdAt: Date.now(),
      };

      //console.log(await addDoc("users", userObj, "ncrerfererer"));
   }
   return data;
}

export default function (): JSX.Element {
   generateRandomUsers(2);
   return <>loaded...4</>;
}
