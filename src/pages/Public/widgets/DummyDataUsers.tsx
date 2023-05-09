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

function generateRandomNameFirst() {
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
      "Emma",
      "Liam",
      "Noah",
      "Olivia",
      "William",
      "Ava",
      "James",
      "Isabella",
      "Oliver",
      "Sophia",
      "Benjamin",
      "Mia",
      "Elijah",
      "Charlotte",
      "Lucas",
      "Amelia",
      "Mason",
      "Harper",
      "Logan",
      "Evelyn",
      "Alexander",
      "Abigail",
      "Ethan",
      "Emily",
      "Jackson",
      "Ella",
      "Sebastian",
      "Avery",
      "Michael",
      "Sofia",
      "Daniel",
      "Camila",
      "Carter",
      "Aria",
      "Gabriel",
      "Scarlett",
      "Matthew",
      "Victoria",
      "Samuel",
      "Madison",
      "David",
      "Luna",
      "Joseph",
      "Chloe",
      "Isaac",
      "Grace",
      "John",
      "Penelope",
      "Luke",
      "Riley",
   ];

   const randomIndex = Math.floor(Math.random() * names.length);
   return names[randomIndex];
}

function generateRandomNameLast() {
   const names = [
      "Brown",
      "Davis",
      "Wilson",
      "Johnson",
      "Taylor",
      "Anderson",
      "Martinez",
      "Jackson",
      "Baker",
      "Adams",
      "Garcia",
      "Nelson",
      "White",
      "Miller",
      "Thompson",
      "Robinson",
      "Clark",
      "Lewis",
      "Hall",
      "Wright",
      "King",
      "Green",
      "Parker",
      "Collins",
      "Edwards",
      "Hill",
      "Young",
      "Turner",
      "Walker",
      "Mitchell",
      "Allen",
      "Campbell",
      "Carter",
      "Phillips",
      "Cooper",
      "Flores",
      "Gonzalez",
      "Gray",
      "Hernandez",
      "Hughes",
      "James",
      "Jenkins",
      "Kelly",
      "Lee",
      "Lopez",
      "Murphy",
      "Murray",
      "Reyes",
      "Rodriguez",
      "Scott",
   ];
   const randomIndex = Math.floor(Math.random() * names.length);
   return names[randomIndex];
}
const isDayDisabledRandom = () => {
   const random = Math.random();
   return random > 0.8 ? true : false;
};

async function generateRandomUsers(numRecords: number, userLevel: number) {
   const data = [];
   for (let i = 0; i < numRecords; i++) {
      const firstName = generateRandomNameFirst();
      const lastName = generateRandomNameLast();
      const email = generateEmail(firstName, lastName);
      const record = { firstName, lastName, email };
      const userObj = {
         emailVarified: false,
         authProvider: "firebase",
         email,
         lastName,
         firstName,
         userLevel,
         homeStore:
            userLevel === 1 || userLevel === 2
               ? i + 1
               : Math.floor(Math.random() * 20) + 1,
         createdAt: Date.now(),
         isDisabled: isDayDisabledRandom(),
      };
      console.log(
         await addDoc("users", userObj, "ncrn9u34hf93u4hf394fhu349ufh34fuh")
      );
   }
   return true;
}

export default function (): JSX.Element {
   const numToGenerate = 567;
   const userLevel = 5;
   //generateRandomUsers(numToGenerate, userLevel);
   return <>loaded...4</>;
}
