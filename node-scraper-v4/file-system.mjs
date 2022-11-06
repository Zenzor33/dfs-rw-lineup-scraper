import fs from "fs";

const oldPathDK = "/Users/harrogath/Downloads/NBA DK Projections.csv";
const newPathDK =
  "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA DK Projections.csv";

const oldPathFD = "/Users/harrogath/Downloads/NBA FD Projections.csv";
const newPathFD =
  "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA FD Projections.csv";

export const transferFiles = (site) => {
  switch (site) {
    case "dk":
      fs.rename(oldPathDK, newPathDK, function (err) {
        if (err) throw err;
        console.log("Successfully renamed - AKA moved!");
      });
      break;
    case "fd":
      fs.rename(oldPathFD, newPathFD, function (err) {
        if (err) throw err;
        console.log("Successfully renamed - AKA moved!");
      });
      break;
    case "all":
      fs.rename(oldPathDK, newPathDK, function (err) {
        if (err) throw err;
        console.log("Successfully renamed - AKA moved!");
      });

      fs.rename(oldPathFD, newPathFD, function (err) {
        if (err) throw err;
        console.log("Successfully renamed - AKA moved!");
      });
      break;
  }
};
