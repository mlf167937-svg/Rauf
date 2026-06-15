let cards = [];
let current = 0;

/* =========================
   💖 EMOJI LOVE BACKGROUND
========================= */
function createHearts() {

  const bg = document.getElementById("bg");
  if (!bg) return;

  const emojis = ["💖", "🤍", "🌹"];

  setInterval(() => {

    const el = document.createElement("div");
    el.className = "heart";
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = (14 + Math.random() * 22) + "px";
    el.style.animationDuration = (4 + Math.random() * 4) + "s";

    bg.appendChild(el);

    setTimeout(() => el.remove(), 8000);

  }, 180);
}

/* =========================
   ✍️ TYPE EFFECT
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
   🧱 BUILD STORY (1–5)
========================= */
function buildStory() {

  const container = document.getElementById("container");
  if (!container) return;

  DATA.forEach((item, index) => {

    const card = document.createElement("div");
    card.className = "card";

    // IMAGE
    if (item.img) {
      const img = document.createElement("img");
      img.src = "/rex1/" + item.img;
      card.appendChild(img);
    }

    // TEXT
    const text = document.createElement("div");
    text.className = "text";
    text.dataset.value = item.text;

    card.appendChild(text);
    container.appendChild(card);

    cards.push(card);
  });
}

/* =========================
   🎬 SHOW SCENE
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
   ⏱️ DELAY FEEL REAL STORY
========================= */
function getDelay(text, index) {

  // penutupan lebih lama dikit biar feel emotional
  if (index === 4) {
    return 6000;
  }

  const base = 3000;
  const reading = text.length * 20;

  return Math.min(base + reading, 8500);
}

/* =========================
   🚀 START STORY FLOW
========================= */
async function startStory() {

  for (let i = 0; i < cards.length; i++) {

    await showSlide(i);

    const textEl = cards[i].querySelector(".text");

    const delay = getDelay(textEl.dataset.value || "", i);

    await new Promise(r => setTimeout(r, delay));
  }

  // END SCREEN
  const end = document.getElementById("end");
  if (end) {
    end.style.display = "block";
  }

  console.log("💖 story finished");
}

/* =========================
   INIT
========================= */
window.onload = function () {

  createHearts();
  buildStory();
  startStory();
};
