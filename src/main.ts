import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let counter: number = 0;

const gameName = "Crochet_Creations";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const score = document.createElement("div");
score.innerText = `Yarn by yard: None`;
app.append(score);

function updateScore() {
  score.innerText = `Yarn by yards: ${counter}`;
}

const button = document.createElement("button");
button.textContent = "🧶 Get 🧶 Yarn 🧶";
button.addEventListener("click", () => {
  counter++;
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
const msPerYarn: number = 100000;
function step(timestamp: DOMHighResTimeStamp) {
  if (startOfFrame === undefined) {
    startOfFrame = timestamp;
  }
  const elapsed = timestamp - startOfFrame;
  startOfFrame = timestamp;

  counter += elapsed / msPerYarn;
  updateScore();
  requestAnimationFrame(step);
}

requestAnimationFrame(step);
