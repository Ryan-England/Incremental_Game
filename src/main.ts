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
const yarnExpenseIncrease: number = 1.15;

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
    counter: 0,
  },
  {
    name: `Crochet Sweater`,
    description: `Crochet a sweater to look snazzy`,
    price: 30,
    rateIncrease: 0.0009,
    counter: 0,
  },
  {
    name: "Crochet Table",
    description: `Crochet a table to crochet upon`,
    price: 100,
    rateIncrease: 0.002,
    counter: 0,
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
  },
];

const itemButtons: HTMLButtonElement[] = [];

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
    for (const button of itemButtons) {
      if (item.description == button.textContent && yarnCounter >= item.price) {
        button.disabled = false;
      }
    }
  }
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
      item.price *= yarnExpenseIncrease;
      item.counter++;
      yarnPerMs += item.rateIncrease;
      itemButton.textContent =
        item.name + ` (cost: ${numberFormat.format(item.price)} yards)`;
    }
  });
  app.append(itemButton);
  itemButtons.push(itemButton);
  itemButton.disabled = true;
}

let startOfFrame: DOMHighResTimeStamp;
function animationStep(timestamp: DOMHighResTimeStamp) {
  if (startOfFrame === undefined) {
    startOfFrame = timestamp;
  }
  const elapsed = timestamp - startOfFrame;
  startOfFrame = timestamp;

  yarnCounter += yarnPerMs * elapsed;
  updateScore();

  requestAnimationFrame(animationStep);
}

requestAnimationFrame(animationStep);
