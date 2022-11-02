/*

*/

const nl2 = document.querySelectorAll(".is-pct-play-50 > a");
const elementsList = Array.from(nl2);
let arr = [];
elementsList.forEach((node) => arr.push(node.attributes.title.value));
const uniq = [...new Set(arr)];

console.log(uniq);
