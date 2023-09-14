import { server } from "./server";

const form = document.querySelector("form");
const input = document.querySelector(".input #url");
const title = document.querySelector("#generate h2");
const content = document.querySelector("#generate p");
const helper = document.querySelector("small");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const videoURL = input.value;

  if (isValidURL(videoURL)) {
    let videoId = sanitizeURL(videoURL);

    title.classList.add("loading");
    content.classList.add("loading");

    const transcription = await server.get(`/summary/${videoId}`);

    title.classList.remove("loading");
    content.classList.remove("loading");

    title.textContent = "Resumo";
    content.textContent = transcription.data.result;
  } else {
    title.classList.remove("loading");
    content.classList.remove("loading");
    title.textContent = null;
    content.textContent = null;
  }
});

function isValidURL(videoURL) {
  if (!videoURL.includes("shorts")) {
    helper.textContent = "Esta URL não é um short, insira um link válido.";
    input.style.outline = "2px solid var(--alert)";
    form.style.paddingBottom = "16px";

    return false;
  } else {
    helper.textContent = null;
    input.style.outline = null;
    form.style.paddingBottom = null;

    return true;
  }
}

function sanitizeURL(videoURL) {
  const [_, params] = videoURL.split("/shorts/");

  if (videoURL.includes("?")) {
    let videoId;
    return (videoId = params.split("?")[0]);
  } else {
    return params;
  }
}
