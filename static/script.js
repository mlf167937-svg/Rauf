let DATA = window.DATA || [];

let index = 0;
let cards = [];

const container = document.getElementById("container");

window.onload = function () {

  const btn = document.getElementById("klickBtn");
  const startScreen = document.getElementById("startScreen");
  const bgm = document.getElementById("bgm");

  console.log("BTN CHECK:", btn);

  if (!btn) {
    console.error("BUTTON NOT FOUND - cek id='klickBtn'");
    return;
  }

  btn.addEventListener("click", async () => {

    console.log("START CLICK OK");

    startScreen.style.display = "none";

    // 🎵 MUSIC SAFE PLAY
    if (bgm) {
      bgm.volume = 0.5;
      bgm.play().catch(err => {
        console.log("Music blocked by browser:", err);
      });
    }

    startStory();
  });
};

/* =========================
   STORY ENGINE
========================= */

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function typeText(el, text, speed = 20) {
  return new Promise(resolve => {

    if (!text) {
      resolve();
      return;
    }

    let i = 0;
    el.innerHTML = "";

    const interval = setInterval(() => {
      el.innerHTML += text[i];
      i++;

      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

/* SHOW SLIDE */
async function showSlide(i) {

  if (i < 0 || i >= cards.length) return;

  cards.forEach(c => c.classList.remove("active"));

  const card = cards[i];
  card.classList.add("active");

  const textEl = card.querySelector(".text");
  const text = card.dataset.text;

  if (text && !card.dataset.done) {
    card.dataset.done = "1";
    await typeText(textEl, text);
  }

  index = i;
}

/* AUTO PLAY */
async function autoPlay() {

  for (let i = 0; i < cards.length; i++) {
    await showSlide(i);
    await delay(3500);
  }
}

/* BUILD STORY */
function buildStory() {

  if (!DATA || DATA.length === 0) {
    console.error("DATA EMPTY");
    return;
  }

  DATA.forEach(item => {

    const card = document.createElement("div");
    card.className = "card";

    card.dataset.text = item.text || "";

    const title = document.createElement("h2");
    title.innerText = item.title || "";
    card.appendChild(title);

    if (item.img) {
      const img = document.createElement("img");
      img.src = "/static/" + item.img;
      img.onerror = () => {
        img.style.display = "none";
      };
      card.appendChild(img);
    }

    const text = document.createElement("div");
    text.className = "text";
    card.appendChild(text);

    container.appendChild(card);
    cards.push(card);
  });
}

/* START */
async function startStory() {

  buildStory();

  await showSlide(0);

  autoPlay();
}
