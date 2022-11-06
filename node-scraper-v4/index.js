// const axios = require("axios");
// const cheerio = require("cheerio");
// const express = require("express");
// const ObjectsToCsv = require("objects-to-csv");
// const path = require("path");
import axios from "axios";
import cheerio from "cheerio";
// import express from "express";
import ObjectsToCsv from "objects-to-csv";
// import path from "path";

import { translateAthleteName } from "./player-dictionary.mjs";

const PORT = 3025;
const url = "https://www.rotowire.com/basketball/nba-lineups.php";

console.log("awefaef");

const arrTags = [
  ".is-pct-play-75 > a",
  ".is-pct-play-50 > a",
  ".is-pct-play-25 > a",
];

// arr = [{probability: 'str', athlete: 'str'}]

let arr = [];
let uniqueIds = [];

axios(url).then((response) => {
  const html = response.data;
  const $ = cheerio.load(html);
  for (let i = 0; i < arrTags.length; i++) {
    $(arrTags[i], html).each(function () {
      const athleteName = $(this).text();
      const translatedAthleteName = translateAthleteName(athleteName);
      if (i === 0) arr.push({ probabilityToPlay: 75, athlete: athleteName });
      if (i === 1) arr.push({ probabilityToPlay: 50, athlete: athleteName });
      if (i === 2) arr.push({ probabilityToPlay: 25, athlete: athleteName });
    });
  }
  for (let i = 0; i < arr.length; i++) {
    let entry = arr[i];
    if (uniqueIds.length === 0) uniqueIds.push(entry);
    if (isUnique(entry.athlete)) uniqueIds.push(entry);
  }
  console.log(uniqueIds);

  // If you use "await", code must be inside an asynchronous function:
  (async () => {
    const csv = new ObjectsToCsv(uniqueIds);

    // Save to file:
    await csv.toDisk("qPlayers.csv");

    // Return the CSV file as string:
    console.log(await csv.toString());
  })();
});

function isUnique(playerName) {
  for (let j = 0; j < uniqueIds.length; j++) {
    if (uniqueIds[j].athlete === playerName) {
      return false;
    }
  }
  return true;
}
