let cards = [];
let current = 0;

/* =========================
   INIT
========================= */
window.onload = function () {

  const bgm = document.getElementById("bgm");

  if (bgm) {
    bgm.volume = 0.5;
  }

  createHearts();
  buildStoryFromFiles();
};

/* =========================
   💖 BACKGROUND LOVE
========================= */
function createHearts() {

  const bg = document.getElementById("bg");
  const emojis = ["💖", "🤍", "🌹"];

  setInterval(() => {

    const h = document.createElement("div");
    h.className = "heart";
    h.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (14 + Math.random() * 22) + "px";
    h.style.animationDuration = (4 + Math.random() * 4) + "s";

    bg.appendChild(h);

    setTimeout(() => h.remove(), 8000);

  }, 160);
}

/* =========================
   📥 LOAD TXT FILE
========================= */
async function loadText(file) {
  const res = await fetch("/rex1/" + file);
  return await res.text();
}

/* =========================
   🧱 BUILD STORY FROM FILES
========================= */
async function buildStoryFromFiles() {

  const container = document.getElementById("container");

  const data = [
    "history1",
    "history2",
    "history3",
    "history4",
    "history5"
  ];

  for (let i = 0; i < data.length; i++) {

    const base = data[i];

    const text = await loadText(base + ".txt");

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = "/rex1/" + base + ".jpg";

    const textEl = document.createElement("div");
    textEl.className = "text";
    textEl.dataset.value = text;

    card.appendChild(img);
    card.appendChild(textEl);

    container.appendChild(card);

    cards.push(card);
  }

  startStory();
}

/* =========================
   ✍️ TYPE EFFECT
========================= */
function typeText(el, text, speed = 25) {

  return new Promise(resolve => {

    el.innerHTML = "";

    let i = 0;

    function run() {
      if (i < text.length) {
        el.innerHTML += text[i++];
        setTimeout(run, speed);
      } else {
        resolve();
      }
    }

    run();
  });
}

/* =========================
   🎬 SHOW SLIDE
========================= */
async function showSlide(i) {

  cards.forEach(c => c.classList.remove("active"));

  const card = cards[i];
  if (!card) return;

  card.classList.add("active");

  const textEl = card.querySelector(".text");

  await typeText(textEl, textEl.dataset.value);
}

/* =========================
   🚀 STORY FLOW
========================= */
async function startStory() {

  for (let i = 0; i < cards.length; i++) {

    await showSlide(i);

    await new Promise(r => setTimeout(r, 4000));
  }

  console.log("FINISH 💖");
}
