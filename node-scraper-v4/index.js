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

const arrTags = [".is-pct-play-75", ".is-pct-play-50", ".is-pct-play-25"];
let mainArr = [];

transferFiles("all");

axios(url).then((response) => {
  const html = response.data;
  const $ = cheerio.load(html);

  $(".lineup.is-nba").each((index, element) => {
    // result: {athlete, team, oppTeam, pctPlay}
    let homeTeam = null;
    let awayTeam = null;
    let gameTime = null;
    let awayTeamInjuryPlayer = null;
    let homeTeamInjuryPlayer = null;
    awayTeam = $(element).find(".lineup__team.is-visit > .lineup__abbr").text();
    homeTeam = $(element).find(".lineup__team.is-home > .lineup__abbr").text();
    gameTime = $(element).find(".lineup__time").text();
    for (let i = 0; i < arrTags.length; i++) {
      let pctPlay = null;
      if (i === 0) pctPlay = 75;
      if (i === 1) pctPlay = 50;
      if (i === 2) pctPlay = 25;
      awayTeamInjuryPlayer = $(element)
        .find(`.lineup__list.is-visit > ${arrTags[i]} > a`)
        .each(function (el) {
          let athleteName = $(this).attr("title");
          let translatedAthleteName = translateAthleteName(athleteName);
          mainArr.push({
            gameTime,
            athleteName: translatedAthleteName,
            team: awayTeam,
            oppTeam: homeTeam,
            pctPlay: pctPlay,
          });
        });
      homeTeamInjuryPlayer = $(element)
        .find(`.lineup__list.is-home > ${arrTags[i]} > a`)
        .each(function (el) {
          let athleteName = $(this).attr("title");
          let translatedAthleteName = translateAthleteName(athleteName);
          mainArr.push({
            gameTime,
            athleteName: translatedAthleteName,
            pctPlay,
            team: homeTeam,
            oppTeam: awayTeam,
          });
        });
    }
  });

  console.log(`Playing need translations: ${missingPlayerArr}`);

  // Get player data from projections

  const uniqueIds = mainArr.reduce((a, entry) => {
    // if athlete in a, skip
    if (!a.find((obj) => obj.athleteName === entry.athleteName)) {
      return [...a, entry];
    } else {
      return [...a];
    }
  }, []);

  // If you use "await", code must be inside an asynchronous function:
  (async () => {
    const csv = new ObjectsToCsv(uniqueIds);

    // Save to file:
    await csv.toDisk("qPlayers.csv");

    // Return the CSV file as string:
    await csv.toString();
  })();
});
