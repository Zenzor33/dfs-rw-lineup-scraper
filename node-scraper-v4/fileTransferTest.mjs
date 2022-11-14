import fs from "fs";

// sorted by oldPath:newPath
const paths = [
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
const testTransfer = (k, v) => {
  fs.rename(k, v, function (err) {
    // k = oldPath
    // v = newPath
    if (!fs.existsSync(k)) {
      console.log(`File ${k} does not exist`);
    } else {
      console.log(`Transferred ${k} to ${v}`);
    }
  });
};

paths.map((path) => {
  let key = Object.keys(path);
  let val = path[key];
  //   console.log(`key: ${key[0]}, val: ${val}`);
  testTransfer(key[0], val);
  return;
});
