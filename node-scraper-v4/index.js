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
// rename arrTags to something more descriptive
const arrTags = [".is-pct-play-75", ".is-pct-play-50", ".is-pct-play-25"];
let mainArr = [];

function getPctPlay(num) {
  switch (num) {
    case 0:
      return 75;
      break;
    case 1:
      return 50;
      break;
    case 2:
      return 25;
      break;
    default:
      throw "Invalid input at getPctPlay in Index.js";
  }
}

function createHomePlayerObj(
  gameTime,
  translatedAthleteName,
  pctPlay,
  homeTeam,
  awayTeam
) {
  mainArr.push({
    gameTime,
    athleteName: translatedAthleteName,
    team: awayTeam,
    oppTeam: homeTeam,
    pctPlay,
  });
}

function createAwayPlayerObj(
  gameTime,
  translatedAthleteName,
  pctPlay,
  homeTeam,
  awayTeam
) {
  mainArr.push({
    gameTime,
    athleteName: translatedAthleteName,
    team: homeTeam,
    oppTeam: awayTeam,
    pctPlay,
  });
}

let main = async () => {
  await transferFilesV3(); // transfers files from downloads to local repo
  await convertAwesemoProjectionNamesV2(); // modifies files in local repo
  let response = await axios(url);

  const html = response.data;
  const $ = cheerio.load(html);

  // change all .each to .map?
  $(".lineup.is-nba").each((index, element) => {
    const awayTeam = $(element)
      .find(".lineup__team.is-visit > .lineup__abbr")
      .text();
    const homeTeam = $(element)
      .find(".lineup__team.is-home > .lineup__abbr")
      .text();
    const gameTime = $(element).find(".lineup__time").text();
    for (let i = 0; i < arrTags.length; i++) {
      const pctPlay = getPctPlay(i);
      const awayTeamInjuryPlayer = $(element)
        .find(`.lineup__list.is-visit > ${arrTags[i]} > a`) // Away team Injured athlete
        .each(function (el) {
          let athleteName = $(this).attr("title");
          let translatedAthleteName = translateAthleteName(
            athleteName,
            "Rotowire"
          );
          // function createHomePlayerObj()
          createHomePlayerObj(
            gameTime,
            translatedAthleteName,
            awayTeam,
            homeTeam,
            pctPlay
          );
        });
      const homeTeamInjuryPlayer = $(element)
        .find(`.lineup__list.is-home > ${arrTags[i]} > a`) // Home team injured athlete divs?
        .each(function (el) {
          let athleteName = $(this).attr("title");
          let translatedAthleteName = translateAthleteName(
            athleteName,
            "Rotowire"
          );
          createAwayPlayerObj(
            gameTime,
            translatedAthleteName,
            awayTeam,
            homeTeam,
            pctPlay
          );
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
