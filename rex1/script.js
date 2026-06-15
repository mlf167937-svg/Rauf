let cards = [];
let current = 0;

window.onload = function () {

  const btn = document.getElementById("klickBtn");
  const startScreen = document.getElementById("startScreen");
  const bgm = document.getElementById("bgm");

  btn.onclick = async function () {

    startScreen.style.display = "none";

    // music fix
    if (bgm) {
      bgm.volume = 0.5;
      bgm.play().catch(() => {});
    }

    createHearts();

    await buildStory();   // 🔥 sekarang async karena fetch TXT
    await startStory();
  };
};

/* =========================
   💖 HEART ANIMATION
========================= */
function createHearts() {

  const bg = document.getElementById("bg");
  const emojis = ["💖", "🤍", "🌹"];

  setInterval(() => {

    const h = document.createElement("div");
    h.className = "heart";
    h.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (12 + Math.random() * 22) + "px";
    h.style.animationDuration = (4 + Math.random() * 3) + "s";

    bg.appendChild(h);

    setTimeout(() => h.remove(), 7000);

  }, 160);
}

/* =========================
   ✍️ TYPE TEXT
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
   📦 LOAD STORY FROM FILES
========================= */
async function loadText(path) {
  const res = await fetch(path);
  return await res.text();
}

async function buildStory() {

  const container = document.getElementById("container");

  for (let i = 1; i <= 5; i++) {

    const text = await loadText(`/static/history${i}.txt`);

    const card = document.createElement("div");
    card.className = "card";

    // 🔥 image hanya 1–4
    if (i <= 4) {
      const img = document.createElement("img");
      img.src = `/static/history${i}.jpg`;
      card.appendChild(img);
    }

    const textEl = document.createElement("div");
    textEl.className = "text";
    textEl.dataset.value = text;

    // 🔥 last slide (history5) tanpa gambar & center
    if (i === 5) {
      textEl.classList.add("final");
    }

    card.appendChild(textEl);
    container.appendChild(card);

    cards.push(card);
  }
}

/* =========================
   🎬 SLIDE SYSTEM
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
   ⏱️ DELAY SMOOTH
========================= */
function getDelay(text) {
  const base = 2500;
  return Math.min(base + text.length * 18, 8000);
}

/* =========================
   🚀 START STORY
========================= */
async function startStory() {

  for (let i = 0; i < cards.length; i++) {

    await showSlide(i);

    const textEl = cards[i].querySelector(".text");
    const delay = getDelay(textEl.dataset.value || "");

    await new Promise(r => setTimeout(r, delay));
  }
}
