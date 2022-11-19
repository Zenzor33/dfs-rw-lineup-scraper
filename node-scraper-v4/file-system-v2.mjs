import fs from "fs";

// sorted by oldPath:newPath
const paths = [
  // {
  //   fileName: "NBA DK Projections",
  //   oldPath: "...",
  //   newPath: "...",
  // },
  {
    "/Users/harrogath/Downloads/NBA DK Projections.csv":
      "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA DK Projections.csv",
  },
  {
    "/Users/harrogath/Downloads/NBA FD Projections.csv":
      "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA FD Projections.csv",
  },
  {
    "/Users/harrogath/Downloads/NBA DK Ownership.csv":
      "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA DK Ownership.csv",
  },
  {
    "/Users/harrogath/Downloads/NBA FD Ownership.csv":
      "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA FD Ownership.csv",
  },
];

// add conditional for if oldPath does not exist
const moveFiles = (k, v) => {
  // k = oldPath
  // v = newPath
  !fs.existsSync(k)
    ? console.log(`File ${k} does not exist`)
    : fs.rename(k, v, function () {
        console.log(`Transferred ${k} to ${v}`);
      });
};

export const transferFiles = async () => {
  paths.map((path) => {
    let key = Object.keys(path);
    let val = path[key];
    moveFiles(key[0], val);
  });
};
