import fs from "fs";
import csv from "csvtojson";
import { Parser } from "json2csv";
import {
  translateAthleteName,
  awesemoAthleteName,
  missingPlayerArr,
} from "./player-dictionary.mjs";
import e from "express";

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

// returns array in which each element is the name (and path) of an expected file that exists in the repository folder
function getFiles() {
  let arr = [];
  expectedFileNames.map((file) => {
    let key = Object.keys(file);
    let fileName = file[key];
    if (!fs.existsSync(fileName)) {
      //   console.log(`${key} not found`);
      return false;
    } else {
      // console.log(`found ${fileName}`);
      arr.push(fileName);
      return true;
    }
  });
  return arr;
}

export async function convertAwesemoProjectionNamesV2() {
  let currentFiles = await getFiles(); // returns array of currentFiles
  if (currentFiles.length === 0)
    return console.log(
      "Convert Projections: Cannot sanitize player names: no files exist"
    );
  else {
    // switch to if currentFiles === 0 return
    for (let i = 0; i < currentFiles.length; i++) {
      const currentFile = currentFiles[i];
      let csvFile = await loadFile(currentFile);
      await modifyFile(csvFile, currentFile);
      await saveChanges(csvFile, currentFile);
    }
  }
}

async function loadFile(filePath) {
  const csvFromFile = await csv().fromFile(filePath);
  // console.log(`loaded ${filePath} succesfully`);
  return csvFromFile;
}

async function modifyFile(file, filePath) {
  const translatedProjections = file.map((obj) => {
    obj.Name = translateAthleteName(obj.Name);
    return obj;
  });
  // console.log(`modified ${filePath} successfully `);
}

async function saveChanges(file, filePath) {
  // save the changes
  const modifiedCSV = new Parser({
    fields: [
      "Name",
      "Fpts",
      "Position",
      "Team",
      "Opponent",
      "Minutes",
      "Salary",
      "Pts/$",
      "Value",
    ],
  }).parse(file); // loaded file in memory
  fs.writeFileSync(filePath, modifiedCSV); // filePath, data
  console.log(`Convert Projections: sanitized names to ${filePath} success`);
}
