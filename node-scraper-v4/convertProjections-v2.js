import fs from "fs";
import csv from "csvtojson";
import { Parser } from "json2csv";
import {
  translateAthleteName,
  awesemoAthleteName,
  missingPlayerArr,
} from "./player-dictionary.mjs";

/*
What i'm trying to achieve:

This script will execute after an undetermined number of csv files are transferred into the respository's folder. This script will modify data in the transferred files. The script should not throw if an expected file is not present. 

The script should start with a list of expected files. If the expected file is present, the file should be edited, and consolelog the file name of the edited file. If the expected file is not present, the script should write a console.log to indicate its not present.

Ways to implement:
1) currentFiles.map((file) => asyc execute script) -- doesn't work because can't run async operations in a map function
2) for loop on currentFiles - interesting but not elegant 
3) destructuring currentFiles array
*/

// fileDescription: fileName
const expectedFileNames = [
  { projectionsDK: "NBA DK Projections.csv" },
  { projectionsDKFO: "NBA DK Ownership.csv" },
  { projectionsFD: "NBA FD Projections.csv" },
  { projectionsFDFO: "NBA FD Ownership.csv" },
];

function doesFileExist() {
  let arr = [];
  expectedFileNames.map((file) => {
    let key = Object.keys(file);
    let fileName = file[key];
    if (!fs.existsSync(fileName)) {
      //   console.log(`${key} not found`);
      return false;
    } else {
      console.log(`found ${fileName}`);
      arr.push(fileName);
      return true;
    }
  });
  return arr;
}

async function convertAwesemoProjectionNamesV2() {
  let currentFiles = await doesFileExist(); // returns array of currentFiles
  if (currentFiles.length > 0) {
    // switch to if currentFiles === 0 return
    for (let i = 0; i < currentFiles.length; i++) {
      const currentFile = currentFiles[i];
      executeFile(currentFile);
    }
  }
}

async function executeFile(currentFile) {
  const currentFileCSV = await csv().fromFile(currentFile);
  const translatedProjections = currentFileCSV.map((obj) => {
    obj.Name = translateAthleteName(obj.Name);
    return obj;
  });
}

convertAwesemoProjectionNamesV2();

// // This function converts each player's name in awesemos projection files to pro-basketball-reference's convention.
// const convertAwesemoProjectionNames = async () => {
//   // load the players
//   const projectionsDK = await csv().fromFile("NBA DK Projections.csv");
//   const projectionsFD = await csv().fromFile("NBA FD Projections.csv");
//   const projectionsDKFO = await csv().fromFile("NBA DK Ownership.csv");
//   const projectionsFDFO = await csv().fromFile("NBA FD Projections.csv");

//   // show the athletes
//   //   console.log(projectionsDK);

//   // modify the athletes
//   const translatedProjectionsDK = projectionsDK.map((obj) => {
//     // convert obj.Name to basketball reference
//     obj.Name = translateAthleteName(obj.Name);
//     return obj;
//   });

//   const translatedProjectionsFD = projectionsFD.map((obj) => {
//     // convert obj.Name to basketball reference
//     obj.Name = translateAthleteName(obj.Name);
//     return obj;
//   });

//   const translatedProjectionsDKFO = projectionsDKFO.map((obj) => {
//     // convert obj.Name to basketball reference
//     obj.Name = translateAthleteName(obj.Name);
//     return obj;
//   });

//   const translatedProjectionsFDFO = projectionsFDFO.map((obj) => {
//     // convert obj.Name to basketball reference
//     obj.Name = translateAthleteName(obj.Name);
//     return obj;
//   });

//   console.log(missingPlayerArr);

//   // save the changes
//   const athletesToCsvDK = new Parser({
//     fields: [
//       "Name",
//       "Fpts",
//       "Position",
//       "Team",
//       "Opponent",
//       "Minutes",
//       "Salary",
//       "Pts/$",
//       "Value",
//     ],
//   }).parse(projectionsDK);
//   fs.writeFileSync("NBA DK Projections.csv", athletesToCsvDK);

//   const athletesToCsvFD = new Parser({
//     fields: [
//       "Name",
//       "Fpts",
//       "Position",
//       "Team",
//       "Opponent",
//       "Minutes",
//       "Salary",
//       "Pts/$",
//       "Value",
//     ],
//   }).parse(projectionsFD);
//   fs.writeFileSync("NBA FD Projections.csv", athletesToCsvFD);
// };
