import fs from "fs";
import csv from "csvtojson";
import { Parser } from "json2csv";
import {
  translateAthleteName,
  missingPlayerArr,
} from "./player-dictionary.mjs";
import e from "express";

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
  console.log(`Convert Projections: Files to sanitize: ${currentFiles}`);
  if (currentFiles.length === 0)
    return console.log(
      "Convert Projections: Cannot sanitize player names: no files exist"
    );
  else {
    // switch to if currentFiles === 0 return
    for (let i = 0; i < currentFiles.length; i++) {
      const currentFile = currentFiles[i];
      console.log(`Convert Projections: Sanitizing ${currentFile}`);
      let csvFile = await loadFile(currentFile);
      await modifyFile(csvFile, currentFile);
      await saveChanges(csvFile, currentFile);
    }
  }
}

async function loadFile(filePath) {
  const csvFromFile = await csv().fromFile(filePath);
  console.log(`Convert Projections: loaded ${filePath} succesfully`);
  return csvFromFile;
}

async function modifyFile(file, filePath) {
  // console.log(`modified ${filePath} successfully `);
  return new Promise((resolve, reject) => {
    const translatedProjections = file.map((obj) => {
      obj.Name = translateAthleteName(obj.Name);
      return obj;
    });
    resolve();
  });
}

function createPosts(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);

      const error = false;
      if (!error) {
        resolve();
      } else {
        reject(`Error, something went wrong`);
      }
    }, 2000);
  });
}

async function saveChanges(file, filePath) {
  // save the changes
  if (
    filePath === "NBA DK Projections.csv" ||
    filePath === "NBA FD Projections.csv"
  ) {
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
  } else if (
    filePath === "NBA DK Ownership.csv" ||
    filePath === "NBA FD Ownership.csv"
  ) {
    const modifiedCSV = new Parser({
      fields: [
        "Name",
        "Salary",
        "Position",
        "Matchup",
        "Team",
        "Opponent",
        "Ownership %",
      ],
    }).parse(file); // loaded file in memory
    fs.writeFileSync(filePath, modifiedCSV); // filePath, data
    console.log(`Convert Projections: sanitized names to ${filePath} success`);
  } else {
    console.log(`ERROR: Can't save to file. ${filePath} not a valid file name`);
  }
}
