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

const button = document.createElement("button");
button.textContent = "🧶🧶🧶";
button.addEventListener("click", () => {
  counter++;
  score.innerText = `Yarn by yards: ${counter}`;
});
app.append(button);

setInterval(() => {
    counter++;
    score.innerText = `Yarn by yards: ${counter}`;
}, 1000);
