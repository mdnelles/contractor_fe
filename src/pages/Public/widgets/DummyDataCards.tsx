//import { initializeApp } from "firebase/app";

import React from "react";
import { addDoc } from "../../../utilities/MongoRequest";

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

  for (let i = 0; i < 100; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomWords += words[randomIndex] + " ";
  }

  return randomWords;
}

// crete function getStage which returns a random number between but including 1 and 5
function getStage() {
  return Math.floor(Math.random() * 5) + 1;
}

async function generateRandomLoop(numRecords: number) {
  for (let i = 0; i < numRecords; i++) {
    const contract = generateRandomContract();
    const stage = getStage();
    const createdAt = getRandomDate();
    const contractsObj = {
      jobTitle: "cards: " + createdAt + " (" + contract.room + ")",
      task: contract.task,
      room: contract.room,
      description: generateLoremIpsum(),
      clientId: "NA",
      stage,
      createdAt,
    };
    //console.log("....addDoc");
    //console.log(await addDoc("contracts", contractsObj,"ncrn9u34hf93u4hf394fhu349ufh34fuh"));
  }
  return 1;
}

const DummyDataCards = (): JSX.Element => {
  generateRandomLoop(120);
  return <>loaded...tasks</>;
};

export default DummyDataCards;
//export default React.memo(DummyDataCards);
