//import { initializeApp } from "firebase/app";

import React from "react";
import { addDoc, getDocsByObj } from "../../../utilities/MongoRequest";
import { findDataArray } from "../../../utilities/gen";

//import { getAuth } from "firebase/auth";

//import { getFirestore, collection, addDoc } from "firebase/firestore";

//import { firebaseConfig } from "../../../firebase/constants";

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

function getRandomDate() {
   const now = Date.now(); // current date in epoch format
   const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
   const randomOffset =
      Math.floor(Math.random() * (2 * thirtyDaysInMilliseconds)) -
      thirtyDaysInMilliseconds; // random offset between -30 and +30 days
   const randomDate = new Date(now + randomOffset); // create a new date object with the random offset
   return randomDate.getTime(); // return the date in epoch format
}

function generateRandomContract() {
   const rooms = [
      "Living room",
      "Kitchen",
      "Dining room",
      "Bedroom",
      "Bathroom",
      "Office",
      "Library",
      "Game room",
      "Media room",
      "Laundry room",
      "Garage",
      "Basement",
      "Attic",
      "Patio",
      "Deck",
      "Garden",
      "Pool area",
      "Driveway",
   ];

   const roomsp = [
      "Sala de estar",
      "Cocina",
      "Comedor",
      "Dormitorio",
      "Baño",
      "Oficina",
      "Biblioteca",
      "Sala de juegos",
      "Sala de medios",
      "Cuarto de lavado",
      "Garaje",
      "Sótano",
      "Ático",
      "Patio",
      "Terraza",
      "Jardín",
      "Área de piscina",
      "Entrada",
   ];

   const handymanTasks = [
      "Install shelves",
      "Hang pictures",
      "Repair drywall",
      "Fix leaky faucets",
      "Replace light fixtures",
      "Unclog drains",
      "Paint rooms",
      "Install ceiling fans",
      "Assemble furniture",
      "Repair fences",
      "Install pet doors",
      "Clean gutters",
      "Power wash decks and patios",
      "Install window treatments",
      "Fix squeaky doors and hinges",
      "Replace broken tiles",
      "Replace or repair damaged flooring",
   ];

   const randomIndex = Math.floor(Math.random() * rooms.length);
   const randomIndex2 = Math.floor(Math.random() * roomsp.length);
   return { room: rooms[randomIndex], task: handymanTasks[randomIndex2] };
}

function generateLoremIpsum() {
   const loremIpsum =
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum";
   const words = loremIpsum.split(" ");
   let randomWords = "";

   for (let i = 0; i < 30; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      randomWords += words[randomIndex] + " ";
   }

   return randomWords;
}

// crete function getStage which returns a random number between but including 1 and 5
const getStage = () => Math.floor(Math.random() * 5) + 1;

const random1to20 = () => Math.floor(Math.random() * 20) + 1;

const getContractor = (homeStore: number, contractors: any) => {
   const storeContractors = contractors.filter(
      (sc: any) => sc.homeStore === homeStore
   );
   return storeContractors.length > 0
      ? storeContractors[Math.floor(Math.random() * storeContractors.length)]
           ._id
      : contractors[Math.floor(Math.random() * contractors.length)]._id;
};

const getPicker = (homeStore: number, pickers: any) => {
   const storePickers = pickers.filter((sc: any) => sc.homeStore === homeStore);
   return storePickers.length > 0
      ? storePickers[Math.floor(Math.random() * storePickers.length)]._id
      : pickers[Math.floor(Math.random() * pickers.length)]._id;
};

async function generateRandomLoop(
   numRecords: number,
   users: any,
   contractors: any,
   pickers: any
) {
   for (let i = 0; i < numRecords; i++) {
      const contract = generateRandomContract();
      const stage = getStage();
      const createdAt = getRandomDate();
      const homeStore = random1to20();
      const orderPickedBy = getPicker(homeStore, pickers);
      const contractorId = getContractor(homeStore, contractors);
      const clientID = users[Math.floor(Math.random() * users.length)]._id;
      const contractsObj = {
         jobTitle: createdAt + " -" + contract.room,
         task: contract.task,
         room: contract.room,
         description: generateLoremIpsum(),
         clientId: clientID,
         contractorId,
         orderPickedBy,
         homeStore,
         stage,
         createdAt,
      };
      await addDoc(
         "contracts",
         contractsObj,
         "ncrn9u34hf93u4hf394fhu349ufh34fuh"
      );
   }
   return 1;
}

const DummyDataCards = (): JSX.Element => {
   (async () => {
      const users: any = findDataArray(
         await getDocsByObj("users", { userLevel: 5 }, "xyz")
      );
      const contractors: any = findDataArray(
         await getDocsByObj("users", { userLevel: 4 }, "xyz")
      );

      const pickers: any = findDataArray(
         await getDocsByObj("users", { userLevel: 3 }, "xyz")
      );
      //generateRandomLoop(733, users, contractors, pickers);
   })();
   return <>loaded...contracts</>;
};

export default DummyDataCards;
//export default React.memo(DummyDataCards);
