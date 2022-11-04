const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const ObjectsToCsv = require("objects-to-csv");
const PORT = 3025;
const url = "https://www.rotowire.com/basketball/nba-lineups.php";

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
      const athlete = $(this).text();
      if (i === 0) arr.push({ probabilityToPlay: 75, athlete: athlete });
      if (i === 1) arr.push({ probabilityToPlay: 50, athlete: athlete });
      if (i === 2) arr.push({ probabilityToPlay: 25, athlete: athlete });
    });
  }
  for (let i = 0; i < arr.length; i++) {
    let entry = arr[i];
    if (uniqueIds.length === 0) uniqueIds.push(entry);
    if (isUnique(entry.athlete)) uniqueIds.push(entry);
  }
  console.log(uniqueIds);
});

function isUnique(playerName) {
  for (let j = 0; j < uniqueIds.length; j++) {
    if (uniqueIds[j].athlete === playerName) {
      return false;
    }
  }
  return true;
}
