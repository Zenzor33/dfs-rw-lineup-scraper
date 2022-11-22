import fs from "fs";
import { promises as fsPromises } from "fs";

const fileInfo = [
  {
    fileName: "NBA DK Projections",
    oldPath: "/Users/harrogath/Downloads/NBA DK Projections.csv",
    newPath:
      "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA DK Projections.csv",
  },
  {
    fileName: "NBA FD Projections",
    oldPath: "/Users/harrogath/Downloads/NBA FD Projections.csv",
    newPath:
      "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA FD Projections.csv",
  },
  {
    fileName: "NBA DK Ownership",
    oldPath: "/Users/harrogath/Downloads/NBA DK Ownership.csv",
    newPath:
      "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA DK Ownership.csv",
  },
  {
    fileName: "NBA FD Ownership",
    oldPath: "/Users/harrogath/Downloads/NBA FD Ownership.csv",
    newPath:
      "/Users/harrogath/dfs-rw-lineup-scraper/node-scraper-v4/NBA FD Ownership.csv",
  },
];

const moveFile = async (oldPath, newPath, fileName) => {
  if (!fs.existsSync(oldPath)) {
    console.log(`File Transfer: File ${fileName} does not exist`);
    return false;
  } else {
    await fsPromises.rename(oldPath, newPath);
    console.log(`File Transfer: Transferring ${fileName}`);
  }
  return true;
};

const isFileMoved = (path, fileName) => {
  if (fs.existsSync(path)) {
    console.log(
      `File Transfer Verification System: File ${fileName} confirmed moved`
    );
    return true;
  }
  return false;
};

export const transferFilesV3 = async () => {
  for (let i = 0; i < fileInfo.length; i++) {
    let file = fileInfo[i];
    let fileName = file.fileName;
    let oldPath = file.oldPath;
    let newPath = file.newPath;

    // if oldPath exists, move to newPath & console.log
    console.log(`FTS: ${fileName}`);
    let x = await moveFile(oldPath, newPath, fileName);
    console.log(`FTS: done with ${fileName}`);

    // verify file is moved before continuing
    if (x) isFileMoved(newPath, fileName);
  }
};
