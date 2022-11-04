/*
querySelectors:
'.is-pct-play-75 > a'
'.is-pct-play-50 > a'
'.is-pct-play-25 > a'
'.is-pct-play-0 > a' <-- for players out
*/

const arrTags = [
  ".is-pct-play-75 > a",
  ".is-pct-play-50 > a",
  ".is-pct-play-25 > a",
];

let dict = {
  // indicates probability of playing
  P75: "",
  P50: "",
  P25: "",
};

for (let i = 0; i < arrTags.length; i++) {
  const nl2 = document.querySelectorAll(arrTags[i]);
  const elementsList = Array.from(nl2);
  let arr = [];
  elementsList.forEach((node) => arr.push(node.attributes.title.value));
  const uniq = [...new Set(arr)];
  if (i === 0) dict["P75"] = uniq;
  if (i === 1) dict["P50"] = uniq;
  if (i === 2) dict["P25"] = uniq;
}
