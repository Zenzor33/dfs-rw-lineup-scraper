import axios from "axios";
import cheerio from "cheerio";
import ObjectsToCsv from "objects-to-csv";
import {
  translateAthleteName,
  missingPlayerArr,
} from "./player-dictionary.mjs";
import { convertAwesemoProjectionNamesV2 } from "./convertProjections-v2.js";
import { transferFilesV3 } from "./file-system-v3.mjs";

const url = "https://www.rotowire.com/basketball/nba-lineups.php";
const arrTags = [".is-pct-play-75", ".is-pct-play-50", ".is-pct-play-25"];
let mainArr = [];
let main = async () => {
  await transferFilesV3(); // transfers files from downloads to local repo
  await convertAwesemoProjectionNamesV2(); // modifies files in local repo
  let response = await axios(url);

  const html = response.data;
  const $ = cheerio.load(html);

  // change all .each to .map?
  $(".lineup.is-nba").each((index, element) => {
    // change awayTeam, homeTeam, gameTime to const?
    let awayTeam = $(element)
      .find(".lineup__team.is-visit > .lineup__abbr")
      .text();
    let homeTeam = $(element)
      .find(".lineup__team.is-home > .lineup__abbr")
      .text();
    let gameTime = $(element).find(".lineup__time").text();
    for (let i = 0; i < arrTags.length; i++) {
      let pctPlay = null;
      // use separate function with switch statement-- getPctPlay(i) //
      if (i === 0) pctPlay = 75;
      if (i === 1) pctPlay = 50;
      if (i === 2) pctPlay = 25;
      // // //
      let awayTeamInjuryPlayer = $(element)
        .find(`.lineup__list.is-visit > ${arrTags[i]} > a`)
        .each(function (el) {
          let athleteName = $(this).attr("title");
          let translatedAthleteName = translateAthleteName(
            athleteName,
            "Rotowire"
          );
          mainArr.push({
            gameTime,
            athleteName: translatedAthleteName,
            team: awayTeam,
            oppTeam: homeTeam,
            pctPlay,
          });
        });
      let homeTeamInjuryPlayer = $(element)
        .find(`.lineup__list.is-home > ${arrTags[i]} > a`)
        .each(function (el) {
          let athleteName = $(this).attr("title");
          let translatedAthleteName = translateAthleteName(
            athleteName,
            "Rotowire"
          );
          mainArr.push({
            gameTime,
            athleteName: translatedAthleteName,
            team: homeTeam,
            oppTeam: awayTeam,
            pctPlay,
          });
        });
    }
  });

  console.log(`Player translation required: ${missingPlayerArr}`);

  // Get player data from projections

  // removes duplicates from mainArr
  const uniqueIds = mainArr.reduce((a, entry) => {
    // if athlete in a, skip
    if (!a.find((obj) => obj.athleteName === entry.athleteName)) {
      return [...a, entry];
    } else {
      return [...a];
    }
  }, []);

  // If you use "await", code must be inside an asynchronous function:
  const csv = new ObjectsToCsv(uniqueIds);

  // Save to file:
  await csv.toDisk("qPlayers.csv");

  // Return the CSV file as string:
  await csv.toString();
};
main();
