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
const moveFiles = async (k, v) => {
  // k = oldPath
  // v = newPath
  if (!fs.existsSync(k)) {
    console.log(`File Transfer: File ${k} does not exist`);
    return false;
  } else {
    fs.rename(k, v, function () {
      console.log(`File Transfer: Transferred ${k} to ${v}`);
      return true;
    });
  }
};

const confirmFileMove = async (file, id = 0) => {
  if (file == undefined) return false;
  if (id === 1) return true;
  if (fs.existsSync(file)) {
    setTimeout(confirmFileMove(file, 1), 1000);
  } else {
    console.log(`${file} not found. Retrying`);
    setTimeout(confirmFileMove, 1000);
  }
};

// export const transferFiles = async () => {
//   const x = () =>
//     paths.map((path) => {
//       let key = Object.keys(path);
//       let val = path[key];
//       let y = moveFiles(key[0], val);
//     });
//   console.log("File transfer complete");
//   return;
// };

let x = async () => {
  for (let i = 0; i < paths.length; i++) {
    let path = paths[i];
    let key = Object.keys(path);
    let val = path[key];
    let y = moveFiles(key[0], val);
    if (y) {
      let z = confirmFileMove(val);
      console.log(z);
    }
  }
  console.log("File transfer complete");
  return;
};

x();

// transferFiles();

// export const transferFiles = async () => {
//   paths.map((path) => {
//     let key = Object.keys(path);
//     let val = path[key];
//     moveFiles(key[0], val);
//   });
//   console.log("File transfer complete");
//   return;
// };

// export const transferFiles = async () => {
//   const promises = paths.map((path) => {
//     let key = Object.keys(path);
//     let val = path[key];
//     return moveFiles(key[0], val);
//   });
//   let som = await Promise.all(promises);
//   console.log("file transfer complete");
//   return;
// };
