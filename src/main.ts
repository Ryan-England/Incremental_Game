import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Crochet_Creations";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const score = document.createElement("div");
score.innerText = `Yarn by yard: None`;
app.append(score);

let yarnCounter: number = 0;
let hatCounter: number = 0;
let tableCounter: number = 0;
let dragonCounter: number = 0;
let yarnPerMs: number = 0;
let furtherUpgrades: boolean = true;

const numberFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});
function updateScore() {
  score.innerText = `Yarn by yards: ${numberFormat.format(yarnCounter)}`;
  if (yarnPerMs != 0) {
    score.innerText += `
    Yarn gathered per second: ${numberFormat.format(yarnPerMs * 1000)}`;
  }
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
}

const button = document.createElement("button");
button.textContent = "🧶 Crochet 🧶 Yarn 🧶";
button.addEventListener("click", () => {
  yarnCounter++;
  updateScore();
});
app.append(button);

const hatUpgrade = document.createElement("button");
hatUpgrade.textContent = "Crochet a Hat to keep off the sun";
let hatUpgradePrice: number = 10;
hatUpgrade.addEventListener("click", () => {
  if (yarnCounter >= hatUpgradePrice) {
    yarnCounter -= hatUpgradePrice;
    hatUpgradePrice *= 1.15;
    hatCounter++;
    yarnPerMs += 0.0001;
    hatUpgrade.textContent = `Crochet a Hat (cost: 10 yards): ${hatCounter}`;
  }
});
app.append(hatUpgrade);
hatUpgrade.disabled = true;

const tableUpgrade = document.createElement("button");
tableUpgrade.textContent = "Crochet a table to crochet upon";
tableUpgrade.addEventListener("click", () => {
  if (yarnCounter >= 100) {
    yarnCounter -= 100;
    tableCounter++;
    yarnPerMs += 0.002;
    tableUpgrade.textContent = `Crochet a Table (cost: 100 yards): ${tableCounter}`;
  }
});
app.append(tableUpgrade);
tableUpgrade.disabled = true;

const dragonUpgrade = document.createElement("button");
dragonUpgrade.textContent = "Crochet a cute dragon to fetch more yarn";
dragonUpgrade.addEventListener("click", () => {
  if (yarnCounter >= 1000) {
    yarnCounter -= 1000;
    dragonCounter++;
    yarnPerMs += 0.05;
    dragonUpgrade.textContent = `Crochet a Dragon (cost: 1000 yards): ${dragonCounter}`;
  }
});
app.append(dragonUpgrade);
dragonUpgrade.disabled = true;

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

  if (furtherUpgrades) {
    if (yarnCounter >= 10) {
      hatUpgrade.disabled = false;
    }
    if (yarnCounter >= 100) {
      tableUpgrade.disabled = false;
    }
    if (yarnCounter >= 1000) {
      dragonUpgrade.disabled = false;
      furtherUpgrades = false;
    }
  }

  requestAnimationFrame(step);
}

requestAnimationFrame(step);
