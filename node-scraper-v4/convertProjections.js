import fs from "fs";
import csv from "csvtojson";
import { Parser } from "json2csv";
import {
  translateAthleteName,
  awesemoAthleteName,
  missingPlayerArr,
} from "./player-dictionary.mjs";

// This function converts each player's name in awesemos projection files to pro-basketball-reference's convention.
export const convertAwesemoProjectionNames = async () => {
  // load the players
  const projectionsDK = await csv().fromFile("NBA DK Projections.csv");
  const projectionsFD = await csv().fromFile("NBA FD Projections.csv");
  const projectionsDKFO = await csv().fromFile("NBA DK Ownership.csv");
  const projectionsFDFO = await csv().fromFile("NBA FD Ownership.csv");

  // show the athletes
  //   console.log(projectionsDK);

  // modify the athletes
  const translatedProjectionsDK = projectionsDK.map((obj) => {
    // convert obj.Name to basketball reference
    obj.Name = translateAthleteName(obj.Name);
    return obj;
  });

  const translatedProjectionsFD = projectionsFD.map((obj) => {
    // convert obj.Name to basketball reference
    obj.Name = translateAthleteName(obj.Name);
    return obj;
  });

  const translatedProjectionsDKFO = projectionsDKFO.map((obj) => {
    // convert obj.Name to basketball reference
    obj.Name = translateAthleteName(obj.Name);
    return obj;
  });

  const translatedProjectionsFDFO = projectionsFDFO.map((obj) => {
    // convert obj.Name to basketball reference
    obj.Name = translateAthleteName(obj.Name);
    return obj;
  });

  console.log(missingPlayerArr);

  // save the changes
  const athletesToCsvDK = new Parser({
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
  }).parse(projectionsDK);
  fs.writeFileSync("NBA DK Projections.csv", athletesToCsvDK);

  const athletesToCsvFD = new Parser({
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
  }).parse(projectionsFD);
  fs.writeFileSync("NBA FD Projections.csv", athletesToCsvFD);
  // "Name","Salary","Position","Matchup","Team","Opponent","Ownership %"
  const athletesToCsvDKFO = new Parser({
    fields: [
      "Name",
      "Salary",
      "Position",
      "Matchup",
      "Team",
      "Opponent",
      "Ownership %",
    ],
  }).parse(projectionsDK);
  fs.writeFileSync("NBA DK Ownership.csv", athletesToCsvDKFO);
  const athletesToCsvFDFO = new Parser({
    fields: [
      "Name",
      "Salary",
      "Position",
      "Matchup",
      "Team",
      "Opponent",
      "Ownership %",
    ],
  }).parse(projectionsDK);
  fs.writeFileSync("NBA FD Ownership.csv", athletesToCsvFDFO);
};
