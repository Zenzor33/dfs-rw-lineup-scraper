import axios from "axios";
import cheerio from "cheerio";
// import express from "express";
import ObjectsToCsv from "objects-to-csv";
// import path from "path";

import {
  translateAthleteName,
  missingPlayerArr,
} from "./player-dictionary.mjs";

import { transferFiles } from "./file-system.mjs";

const PORT = 3025;
const url = "https://www.rotowire.com/basketball/nba-lineups.php";

const arrTags = [
  ".is-pct-play-75 > a",
  ".is-pct-play-50 > a",
  ".is-pct-play-25 > a",
];

const teamTags = ["lineup__team is-visit", "lineup__team is-home"];

// arr = [{probability: 'str', athlete: 'str'}]

let arr = [];
let uniqueIds = [];

// transferFiles("all");

/*
.lineup__box -> .lineup__team.is-visit -> .lineup__abbr // .text()
.lineup__box -> .lineup__team.is-home -> .lineup__abbr // .text()
.lineup__box -> .lineup__list.is-visit -> ".is-pct-play-[i] > a" // .text()
.lineup__box -> .lineup__list.is-home -> ".is-pct-play-[i] > a" // .text()

data structure:
[{
    athlete: athlete,
    probability: probability:
    team: team
},
]

Option 1: Scrape "bottom-up" from player name with injury status. For each player, append athlete and probability to object. Then log whether player is on home team or away team. Find name of that team and insert to object. 

Option 2: 
*/

let playerObjArr = [];
let testArr = [];

axios(url).then((response) => {
  const html = response.data;
  const $ = cheerio.load(html);

  $(".lineup__box").each((index, element) => {
    let homeTeam = null;
    let awayTeam = null;
    let homeTeamAthlete50pct = null;
    awayTeam = $(element).find(".lineup__team.is-visit > .lineup__abbr").text();
    homeTeam = $(element).find(".lineup__team.is-home > .lineup__abbr").text();

    $(element)
      .find(".lineup__list.is-home > .is-pct-play-50 > a")
      .each((ele) => {
        homeTeamAthlete50pct = $(ele).text();
      });

    // homeTeamAthlete50pct = $(element)
    //   .find(".lineup__list.is-home > .is-pct-play-50 > a")
    //   .text();

    // .lineup__list.is-home -> ".is-pct-play-[i] > a" // .text()

    playerObjArr.push({
      awayTeam: awayTeam,
      homeTeam: homeTeam,
      homeTeamAthlete50pct: homeTeamAthlete50pct,
    });
  });

  // console.log(playerObjArr);

  for (let i = 0; i < arr.length; i++) {
    let entry = arr[i];
    if (uniqueIds.length === 0) uniqueIds.push(entry);
    if (isUnique(entry.athlete)) uniqueIds.push(entry);
  }

  // If you use "await", code must be inside an asynchronous function:
  (async () => {
    const csv = new ObjectsToCsv(uniqueIds);

    // Save to file:
    await csv.toDisk("qPlayers.csv");

    // Return the CSV file as string:
    await csv.toString();
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
