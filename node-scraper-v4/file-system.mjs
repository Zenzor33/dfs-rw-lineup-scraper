import fs from "fs";

const oldPath = "/Users/harrogath/Downloads/NBA DK Projections.csv";
const newPath =
  "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA DK Projections.csv";

fs.rename(oldPath, newPath, function (err) {
  if (err) throw err;
  console.log("Successfully renamed - AKA moved!");
});

// write a function to move draftkings and fanduel files from the downloads folder to the node-scraper-v4 folder.
