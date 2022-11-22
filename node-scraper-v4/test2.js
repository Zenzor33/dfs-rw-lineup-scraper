const main = async () => {
  console.log(1);
  await wingman();
  console.log(6);
};

main();

async function wingman() {
  console.log(2);
  let x = await galactus();
  //   x.then(() => {
  //     console.log("hello");
  //   });
  console.log(x);
  console.log(5);
}

async function galactus() {
  console.log(3);
  await sleep();
  console.log(4);
  return false;
}

async function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //   console.log(2);
      resolve();
    }, 1000);
  });
}
