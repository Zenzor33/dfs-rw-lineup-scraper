// let arr = [
//   { probabilityToPlay: 75, athlete: "B. Ingram" },
//   { probabilityToPlay: 75, athlete: "H. Jones" },
//   { probabilityToPlay: 75, athlete: "H. Jones" },
//   { probabilityToPlay: 75, athlete: "G. Antetokounmpo" },
//   { probabilityToPlay: 75, athlete: "H. Jones" },
// ];

let arr = [
  { probabilityToPlay: 75, athlete: "J. Duren" },
  { probabilityToPlay: 75, athlete: "H. Jones" },
  { probabilityToPlay: 75, athlete: "B. Ingram" },
  { probabilityToPlay: 75, athlete: "B. Ingram" },
  { probabilityToPlay: 75, athlete: "H. Jones" },
  { probabilityToPlay: 75, athlete: "G. Antetokounmpo" },
  { probabilityToPlay: 75, athlete: "G. Antetokounmpo" },
  { probabilityToPlay: 75, athlete: "D. Ayton" },
  { probabilityToPlay: 75, athlete: "D. Ayton" },
  { probabilityToPlay: 75, athlete: "T. Craig" },
  { probabilityToPlay: 75, athlete: "L. James" },
  { probabilityToPlay: 75, athlete: "L. James" },
  { probabilityToPlay: 50, athlete: "D. Garland" },
  { probabilityToPlay: 50, athlete: "D. Mitchell" },
  { probabilityToPlay: 50, athlete: "D. Garland" },
  { probabilityToPlay: 50, athlete: "D. Mitchell" },
  { probabilityToPlay: 50, athlete: "Raul Neto" },
  { probabilityToPlay: 50, athlete: "B. Adebayo" },
  { probabilityToPlay: 50, athlete: "B. Adebayo" },
  { probabilityToPlay: 50, athlete: "D. Dedmon" },
  { probabilityToPlay: 50, athlete: "A. Nesmith" },
  { probabilityToPlay: 50, athlete: "J. Embiid" },
  { probabilityToPlay: 50, athlete: "J. Embiid" },
  { probabilityToPlay: 50, athlete: "M. Thybulle" },
  { probabilityToPlay: 50, athlete: "F. VanVleet" },
  { probabilityToPlay: 50, athlete: "F. VanVleet" },
  { probabilityToPlay: 50, athlete: "A. Edwards" },
  { probabilityToPlay: 50, athlete: "R. Gobert" },
  { probabilityToPlay: 50, athlete: "A. Edwards" },
  { probabilityToPlay: 50, athlete: "R. Gobert" },
  { probabilityToPlay: 50, athlete: "A. Simons" },
  { probabilityToPlay: 50, athlete: "A. Simons" },
  { probabilityToPlay: 50, athlete: "C. Payne" },
  { probabilityToPlay: 50, athlete: "S. Fontecchio" },
  { probabilityToPlay: 50, athlete: "A. Davis" },
  { probabilityToPlay: 50, athlete: "A. Davis" },
  { probabilityToPlay: 25, athlete: "Coby White" },
  { probabilityToPlay: 25, athlete: "C. Martin" },
  { probabilityToPlay: 25, athlete: "T. Rozier" },
  { probabilityToPlay: 25, athlete: "T. Watford" },
];

let uniqueIds = [];

for (let i = 0; i < arr.length; i++) {
  let entry = arr[i];
  if (uniqueIds.length === 0) uniqueIds.push(entry);
  if (isUnique(entry.athlete)) uniqueIds.push(entry);
}

function isUnique(playerName) {
  for (let j = 0; j < uniqueIds.length; j++) {
    if (uniqueIds[j].athlete === playerName) {
      return false;
    }
  }
  return true;
}

console.log(uniqueIds);
