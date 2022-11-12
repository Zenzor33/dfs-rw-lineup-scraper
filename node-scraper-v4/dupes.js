let arr = [
  {
    athleteName: "Chris Paul",
    team: "PHX",
    oppTeam: "ORL",
    pctPlay: 50,
  },
  {
    athleteName: "Chris Paul",
    team: "PHX",
    oppTeam: "ORL",
    pctPlay: 50,
  },
  {
    athleteName: "Ish Wainright",
    team: "PHX",
    oppTeam: "ORL",
    pctPlay: 50,
  },
  {
    athleteName: "Paolo Banchero",
    team: "PHX",
    oppTeam: "ORL",
    pctPlay: 50,
  },
  {
    athleteName: "Paolo Banchero",
    team: "PHX",
    oppTeam: "ORL",
    pctPlay: 50,
  },
  {
    athleteName: "Kevon Harris",
    team: "PHX",
    oppTeam: "ORL",
    pctPlay: 50,
  },
  {
    athleteName: "Alec Burks",
    team: "DET",
    oppTeam: "NYK",
    pctPlay: 75,
  },
  {
    athleteName: "Quentin Grimes",
    team: "DET",
    oppTeam: "NYK",
    pctPlay: 75,
  },
  {
    athleteName: "Cade Cunningham",
    team: "DET",
    oppTeam: "NYK",
    pctPlay: 50,
  },
  {
    athleteName: "Marvin Bagley",
    team: "DET",
    oppTeam: "NYK",
    pctPlay: 50,
  },
  {
    athleteName: "Cade Cunningham",
    team: "DET",
    oppTeam: "NYK",
    pctPlay: 50,
  },
  {
    athleteName: "HamathleteNameou Diallo",
    team: "DET",
    oppTeam: "NYK",
    pctPlay: 50,
  },
  {
    athleteName: "Donte DiVincenzo",
    team: "CLE",
    oppTeam: "GSW",
    pctPlay: 75,
  },
  {
    athleteName: "Anthony Davis",
    team: "SAC",
    oppTeam: "LAL",
    pctPlay: 75,
  },
  {
    athleteName: "Anthony Davis",
    team: "SAC",
    oppTeam: "LAL",
    pctPlay: 75,
  },
  {
    athleteName: "Lonnie Walker",
    team: "SAC",
    oppTeam: "LAL",
    pctPlay: 50,
  },
  {
    athleteName: "Lonnie Walker",
    team: "SAC",
    oppTeam: "LAL",
    pctPlay: 50,
  },
];

const uniqueIds = arr.reduce((a, entry) => {
  // if athlete in a, skip
  if (!a.find((obj) => obj.athleteName === entry.athleteName)) {
    return [...a, entry];
  } else {
    return [...a];
  }
}, []);

// console.log(filteredArray);
console.log(uniqueIds);
