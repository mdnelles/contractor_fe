// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { firebaseConfig } from "../../../firebase/constants";

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

import { addDoc } from "../../../utilities/MongoRequest";

function generateRandomNameAddress() {
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

   const types = [
      "Street",
      "Avenue",
      "Road",
      "Drive",
      "Lane",
      "Way",
      "Place",
      "Boulevard",
      "Circle",
      "Court",
      "Terrace",
      "Parkway",
      "Square",
      "Trail",
      "Path",
      "Highway",
      "Loop",
      "Crescent",
      "Commons",
      "Ridge",
   ];

   // generate random number between 1 and 9999
   const num = Math.floor(Math.random() * 9999) + 1;

   const randomIndex = Math.floor(Math.random() * names.length);
   const randomIndex2 = Math.floor(Math.random() * types.length);
   return `${num} ${names[randomIndex]} ${types[randomIndex2]}`;
}

const returnRandomProvince = () => {
   const provinces = [
      "Bocas del Toro",
      "Cocle",
      "Colon",
      "Chiriqui",
      "Darien",
      "Herrera",
      "Los Santos",
      "Panama",
      "Veraguas",
      "Ngabe-Bugle",
   ];
   const randomIndex = Math.floor(Math.random() * provinces.length);
   return provinces[randomIndex];
};

const generateRandomPhone = () => {
   // generate 4 digit number
   return `(+507) ${Math.floor(Math.random() * 10000)}-${Math.floor(
      Math.random() * 100000
   )} `;
};

const generateRadomPostalCode = () => {
   // formate is alpha numberic characters in the form LNLN+LN
   // where L is a letter and N is a number
   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   const numbers = "0123456789";
   let postal = "";
   for (let i = 0; i < 6; i++) {
      if (i % 2 === 0) {
         postal += letters[Math.floor(Math.random() * letters.length)];
      } else {
         postal += numbers[Math.floor(Math.random() * numbers.length)];
      }
      if (i === 3) postal += "+";
   }
   return postal;
};

async function generateRandomStore(numRecords: number) {
   const data = [];
   for (let i = 0; i < numRecords; i++) {
      const address = generateRandomNameAddress();
      const phone = generateRandomPhone();
      const postal = Math.floor(Math.random() * 100000);
      const storeObj = {
         number: i,
         address,
         province: returnRandomProvince(),
         postal: generateRadomPostalCode(),
         phone,
      };
      data.push(storeObj);
      console.log(
         await addDoc("stores", storeObj, "ncrn9u34hf93u4hf394fhu349ufh34")
      );
   }
   return data;
}

export default function (): JSX.Element {
   generateRandomStore(0);
   return <>loaded...stores</>;
}
