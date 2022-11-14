import fs from "fs";

const oldPathDK = "/Users/harrogath/Downloads/NBA DK Projections.csv";
const newPathDK =
  "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA DK Projections.csv";

const oldPathFD = "/Users/harrogath/Downloads/NBA FD Projections.csv";
const newPathFD =
  "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA FD Projections.csv";

const oldPathDKFO = "/Users/harrogath/Downloads/NBA DK Ownership.csv";
const newPathDKFO =
  "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA DK Ownership.csv";

const oldPathFDFO = "/Users/harrogath/Downloads/NBA FD Ownership.csv";
const newPathFDFO =
  "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA FD Ownership.csv";

export const transferFiles = (site) => {
  switch (site) {
    case "dk":
      fs.rename(oldPathDK, newPathDK, function (err) {
        if (err) throw err;
        console.log("Successfully moved DK Fpts projections");
      });
      fs.rename(oldPathDKFO, newPathDKFO, function (err) {
        if (err) throw err;
        console.log("Successfully moved DK FO projections");
      });
      break;
    case "fd":
      fs.rename(oldPathFD, newPathFD, function (err) {
        if (err) throw err;
        console.log("Successfully moved FD Fpts projections");
      });
      fs.rename(oldPathFDFO, newPathFDFO, function (err) {
        if (err) throw err;
        console.log("Successfully moved FD FO projections");
      });
      break;
    case "all":
      fs.rename(oldPathDK, newPathDK, function (err) {
        if (err) throw err;
        console.log("Successfully moved DK Fpts projections");
      });
      fs.rename(oldPathDKFO, newPathDKFO, function (err) {
        if (err) throw err;
        console.log("Successfully moved DK FO projections");
      });

      fs.rename(oldPathFD, newPathFD, function (err) {
        if (err) throw err;
        console.log("Successfully moved FD Fpts projections");
      });
      fs.rename(oldPathFDFO, newPathFDFO, function (err) {
        if (err) throw err;
        console.log("Successfully moved FD FO projections");
      });
      break;
  }
};
