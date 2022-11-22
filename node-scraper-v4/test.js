const arr = [1, 2, 3];

const main = async () => {
  console.log(1);
  await sleep();
  console.log(3);
};

const something = () => {
  const p = new Promise((resolve, reject) => {
    console.log(2);
  });
};

const dor = (arr) => {
  return console.log(arr.map((ele) => ele + 1));
};

async function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 1000);
  });
}

main();
