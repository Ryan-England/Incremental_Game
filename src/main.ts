import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Crochet_Creations";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("h2");
button.innerHTML = "<button>🧶</button>";
app.append(button);
