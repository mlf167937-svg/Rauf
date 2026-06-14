let cards = [];
let current = 0;

window.onload = function () {

  const btn = document.getElementById("klickBtn");
  const startScreen = document.getElementById("startScreen");
  const bgm = document.getElementById("bgm");

  btn.onclick = async function () {

    startScreen.style.display = "none";

    if (bgm) {
      bgm.volume = 0.5;
      bgm.play().catch(() => {});
    }

    createHearts();
    buildStory();

    await startStory();
  };
};

/* =========================
   💖 BACKGROUND LOVE
========================= */
function createHearts() {

  const bg = document.getElementById("bg");
  const emojis = ["💖", "🤍"];

  setInterval(() => {

    const h = document.createElement("div");
    h.className = "heart";
    h.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (12 + Math.random() * 20) + "px";
    h.style.animationDuration = (4 + Math.random() * 3) + "s";

    bg.appendChild(h);

    setTimeout(() => h.remove(), 7000);

  }, 180);
}

/* =========================
   ✍️ HUMAN TYPING (STABIL)
========================= */
function typeText(el, text, speed = 28) {

  return new Promise(resolve => {

    el.innerHTML = "";

    let i = 0;

    function run() {

      if (i < text.length) {

        el.innerHTML += text[i];
        i++;

        setTimeout(run, speed);

      } else {
        resolve();
      }
    }

    run();
  });
}

/* =========================
   🧱 BUILD STORY
========================= */
function buildStory() {

  const container = document.getElementById("container");

  DATA.forEach(item => {

    const card = document.createElement("div");
    card.className = "card";

    // kalau ada image
    if (item.img) {
      const img = document.createElement("img");
      img.src = "/static/" + item.img;
      card.appendChild(img);
    }

    const text = document.createElement("div");
    text.className = "text";
    text.dataset.value = item.text;

    card.appendChild(text);

    container.appendChild(card);

    cards.push(card);
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

  await typeText(textEl, textEl.dataset.value, 26);
}

/* =========================
   ⏱️ SMART DELAY (FIX BORING GAP)
========================= */
function getDelay(text) {

  // ⛔ jangan pakai 14 detik lagi
  const base = 3500; // pause setelah typing
  const readingTime = text.length * 25; // natural reading

  return Math.min(base + readingTime, 9000); 
  // max 9 detik biar tidak kosong lama
}

/* =========================
   🚀 START STORY FLOW
========================= */
async function startStory() {

  for (let i = 0; i < cards.length; i++) {

    const textEl = cards[i].querySelector(".text");

    await showSlide(i);

    const delay = getDelay(textEl.dataset.value || "");

    await new Promise(r => setTimeout(r, delay));
  }

  // optional: loop atau end state
  console.log("story finished");
}
