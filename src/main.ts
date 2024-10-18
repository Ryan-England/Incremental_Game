import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Crochet Creations";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const score = document.createElement("div");
score.innerText = `Yarn by yard: None`;
app.append(score);

let yarnCounter: number = 0;
let yarnPerMs: number = 0;

const numberFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});

interface Item {
  name: string;
  description: string;
  price: number;
  rateIncrease: number;
  counter: number;
}

const availableItems: Item[] = [
  {
    name: `Crochet Hat`,
    description: `Crochet a Hat to keep off the sun`,
    price: 10,
    rateIncrease: 0.0001,
    counter: 0
  },
  {
    name: `Crochet Sweater`,
    description: `Crochet a sweater to look snazzy`,
    price: 30,
    rateIncrease: 0.0009,
    counter: 0
  },
  {
    name: "Crochet Table",
    description: `Crochet a table to crochet upon`,
    price: 100,
    rateIncrease: 0.002,
    counter: 0
  },
  {
    name: "Crochet Dragon",
    description: `Crochet a cute dragon to fetch more yarn`,
    price: 1000,
    rateIncrease: 0.05,
    counter: 0,
  },
  {
    name: "Crochet Friend",
    description: `Crochet a new friend who can do everything you do`,
    price: 10000,
    rateIncrease: 0.4,
    counter: 0,
  }
];

const buttons: HTMLButtonElement[] = [];

function updateScore() {
  score.innerText = `Yarn by yards: ${numberFormat.format(yarnCounter)}`;
  if (yarnPerMs != 0) {
    score.innerText += `
    Yarn gathered per second: ${numberFormat.format(yarnPerMs * 1000)}`;
  }
  for (const item of availableItems) {
    if (item.counter != 0) {
      score.innerText += `
      ${item.name}s crafted: ${item.counter}`;
    }
    for (const button of buttons) {
      if (item.description == button.textContent && yarnCounter >= item.price) {
        button.disabled = false;
      }
    }
  }

  /*
  if (hatCounter != 0) {
    score.innerText += `
    Hats crafted: ${hatCounter}`;
  }
  if (tableCounter != 0) {
    score.innerText += `
    Tables made: ${tableCounter}`;
  }
  if (dragonCounter != 0) {
    score.innerText += `
    Dragons created: ${dragonCounter}`;
  }

  if (yarnCounter >= 10) {
    hatUpgrade.disabled = false;
  }
  if (yarnCounter >= 100) {
    tableUpgrade.disabled = false;
  }
  if (yarnCounter >= 1000) {
    dragonUpgrade.disabled = false;
  }
  */
}

const button = document.createElement("button");
button.textContent = "🧶 Gather 🧶 Yarn 🧶";
button.addEventListener("click", () => {
  yarnCounter++;
  updateScore();
});
app.append(button);

for (const item of availableItems) {
  const itemButton = document.createElement("button");
  itemButton.textContent = item.description;
  itemButton.addEventListener("click", () => {
    if (yarnCounter >= item.price) {
      yarnCounter -= item.price;
      item.price *= 1.15;
      item.counter++;
      yarnPerMs += item.rateIncrease;
      itemButton.textContent =
        item.name + ` (cost: ${numberFormat.format(item.price)} yards)`;
    }
  });
  app.append(itemButton);
  buttons.push(itemButton);
  itemButton.disabled = true;
}

/*
const hatUpgrade = document.createElement("button");
hatUpgrade.textContent = "Crochet a Hat to keep off the sun";
let hatUpgradePrice: number = 10;
hatUpgrade.addEventListener("click", () => {
  if (yarnCounter >= hatUpgradePrice) {
    yarnCounter -= hatUpgradePrice;
    hatUpgradePrice *= 1.15;
    hatCounter++;
    yarnPerMs += 0.0001;
    hatUpgrade.textContent = `Crochet a Hat (cost: ${numberFormat.format(hatUpgradePrice)} yards)`;
  }
});
app.append(hatUpgrade);
hatUpgrade.disabled = true;

const tableUpgrade = document.createElement("button");
tableUpgrade.textContent = "Crochet a table to crochet upon";
let tableUpgradePrice: number = 100;
tableUpgrade.addEventListener("click", () => {
  if (yarnCounter >= tableUpgradePrice) {
    yarnCounter -= tableUpgradePrice;
    tableUpgradePrice *= 1.15;
    tableCounter++;
    yarnPerMs += 0.002;
    tableUpgrade.textContent = `Crochet a Table (cost: ${numberFormat.format(tableUpgradePrice)} yards)`;
  }
});
app.append(tableUpgrade);
tableUpgrade.disabled = true;

const dragonUpgrade = document.createElement("button");
dragonUpgrade.textContent = "Crochet a cute dragon to fetch more yarn";
let dragonUpgradePrice: number = 1000;
dragonUpgrade.addEventListener("click", () => {
  if (yarnCounter >= dragonUpgradePrice) {
    yarnCounter -= dragonUpgradePrice;
    dragonUpgradePrice *= 1.15;
    dragonCounter++;
    yarnPerMs += 0.05;
    dragonUpgrade.textContent = `Crochet a Dragon (cost: ${numberFormat.format(dragonUpgradePrice)} yards)`;
  }
});
app.append(dragonUpgrade);
dragonUpgrade.disabled = true;
*/

/*
setInterval(() => {
  counter++;
  score.innerText = `Yarn by yards: ${counter}`;
}, 1000);
*/

let startOfFrame: DOMHighResTimeStamp;
function step(timestamp: DOMHighResTimeStamp) {
  if (startOfFrame === undefined) {
    startOfFrame = timestamp;
  }
  const elapsed = timestamp - startOfFrame;
  startOfFrame = timestamp;

  yarnCounter += yarnPerMs * elapsed;
  updateScore();

  requestAnimationFrame(step);
}

requestAnimationFrame(step);
