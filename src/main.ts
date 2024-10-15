import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let yarnCounter: number = 0;

const gameName = "Crochet_Creations";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const score = document.createElement("div");
score.innerText = `Yarn by yard: None`;
app.append(score);

const numberFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
});
function updateScore() {
  score.innerText = `Yarn by yards: ${numberFormat.format(yarnCounter)}`;
}

const button = document.createElement("button");
button.textContent = "🧶 Get 🧶 Yarn 🧶";
button.addEventListener("click", () => {
  yarnCounter++;
  updateScore();
});
app.append(button);

/*
setInterval(() => {
  counter++;
  score.innerText = `Yarn by yards: ${counter}`;
}, 1000);
*/

let startOfFrame: DOMHighResTimeStamp;
let YarnPerMs: number = 0;
function step(timestamp: DOMHighResTimeStamp) {
  if (startOfFrame === undefined) {
    startOfFrame = timestamp;
  }
  const elapsed = timestamp - startOfFrame;
  startOfFrame = timestamp;

  yarnCounter += YarnPerMs * elapsed;
  updateScore();
  requestAnimationFrame(step);
}

requestAnimationFrame(step);

let hatCounter = 0;

const hatUpgrade = document.createElement("button");
hatUpgrade.textContent = "Crochet a Hat to keep off the sun (cost: 10 yards)";
hatUpgrade.addEventListener("click", () => {
    if (yarnCounter >= 10) {
        yarnCounter -= 10;
        hatCounter++;
        YarnPerMs += 0.001;
        hatUpgrade.textContent = `Crochet a Hat (cost: 10 yards): ${hatCounter}`;
    }
});
app.append(hatUpgrade);
