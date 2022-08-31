// Set your global var here
let characterList = [];
let currentCardIndex = 0;
let currentPoints = 0;
let score = 0;
let currentTutorialStep = 0;

const $gameWrapper = $("gameWrapper");
const $cardList = $("cardList");
const $score = $("score");
const $startButton = $("startButton");

const raceList = [
  {
    name: "human",
    minHeight: 1.5,
    maxHeight: 2,
    minWeight: 50,
    maxWeight: 90,
    maxAge: 90,
  },
  {
    name: "elf",
    minHeight: 1.9,
    maxHeight: 2.5,
    minWeight: 55,
    maxWeight: 80,
    maxAge: 230,
  },
  {
    name: "dwarf",
    minHeight: 1,
    maxHeight: 1.4,
    minWeight: 60,
    maxWeight: 100,
    maxAge: 80,
  },
  {
    name: "orc",
    minHeight: 1.8,
    maxHeight: 2.2,
    minWeight: 80,
    maxWeight: 120,
    maxAge: 100,
  },
];

const deathCauseList = [
  "starvation",
  "old age",
  "cancer",
  "silly accident",
  "natural disaster",
  "poison",
  "hunger",
  "sword wound",
  "arrow",
  "idleness",
  "disagreeable dragon",
  "fireball spell",
  "lighting bolt spell",
  "necromancy",
  "execution",
  "magic curse",
  "fell from horse",
  "impaled by a unicorn's horn",
];

const firstNameList = {
  human: [
    "Jared",
    "Elvin",
    "Eddie",
    "Wylie",
    "Stanton",
    "Braydon",
    "Jarman",
    "Larry",
    "Brand",
    "Bruce",
  ],
  elf: [
    "Onaandal",
    "Maldro",
    "Aleerdh",
    "Toldel",
    "Llealeath",
    "Maeodel",
    "Fhailth",
    "Ruvalam",
    "Esceri",
    "Vamoder",
  ],
  dwarf: [
    "Elrdut",
    "Kratmit",
    "Dhoghuki",
    "Throstock",
    "Nulumin",
    "Vargrat",
    "Yustrumlir",
    "Nurun",
    "Korroli",
    "Barinmaem",
  ],
  orc: [
    "Xig",
    "Mergigoth",
    "Hegug",
    "Ghazat",
    "Dalthu",
    "Shobob",
    "Gnorth",
    "Pitgurat",
    "Podagog",
    "Jugag",
  ],
};

const lastNameList = {
  human: [
    "Dayton",
    "Woodward",
    "Hall",
    "Sandford",
    "Gordon",
    "Brodie",
    "Dale",
    "Roland",
    "Wallace",
    "Junior",
  ],
  elf: [
    "Escrom",
    "Salnyn",
    "Cohirtlar",
    "Aylomrail",
    "Huarin",
    "Flieion",
    "Arlossae",
    "Conaael",
    "Miiihel",
    "Piravym",
  ],
  dwarf: [
    "Berylguard",
    "Duskview",
    "Leadhelm",
    "Platemantle",
    "Coppershaper",
    "Marbleforge",
    "Trollbelly",
    "Orebuster",
    "Warmgrip",
    "Kegtoe",
  ],
  orc: [
    "Korgulg",
    "Nofhug",
    "Slog",
    "Karrhig",
    "Vagungad",
    "Gudhagh",
    "Zogugh",
    "Zahgigoth",
    "Podagog",
    "Quimghig",
  ],
};
