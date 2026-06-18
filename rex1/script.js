let cards = [];

window.onload = async function () {

  createHearts();

  await buildStory();
  await startStory();

  const bgm = document.getElementById("bgm");
  if (bgm) {
    bgm.volume = 0.5;
    bgm.play().catch(() => {});
  }
};

/* =========================
   💖 LOVE BACKGROUND
========================= */
function createHearts() {

  const bg = document.getElementById("bg");
  const emojis = ["💖", "🤍", "🌹"];

  setInterval(() => {

    const h = document.createElement("div");
    h.className = "heart";
    h.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (14 + Math.random() * 20) + "px";
    h.style.animationDuration = (4 + Math.random() * 3) + "s";

    bg.appendChild(h);

    setTimeout(() => h.remove(), 7000);

  }, 200);
}

/* =========================
   📄 LOAD TXT (FIX IMPORTANT)
========================= */
async function loadText(file) {
  try {
    const res = await fetch("/rex1/" + file);
    return await res.text();
  } catch (e) {
    return "";
  }
}

/* =========================
   🧱 BUILD STORY (FIXED)
========================= */
async function buildStory() {

  const container = document.getElementById("container");

  for (let i = 1; i <= 5; i++) {

    const card = document.createElement("div");
    card.className = "card";

    // 1-4 pakai gambar
    if (i <= 4) {
      const img = document.createElement("img");
      img.src = `/rex1/history${i}.jpg`;
      card.appendChild(img);
    }

    const text = document.createElement("div");
    text.className = "text";

    const txt = await loadText(`history${i}.txt`);
    text.dataset.value = txt;

    card.appendChild(text);
    container.appendChild(card);

    cards.push(card);
  }
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
   🎬 STORY FLOW
========================= */
async function startStory() {

  for (let i = 0; i < cards.length; i++) {

    const card = cards[i];
    const textEl = card.querySelector(".text");

    await typeText(textEl, textEl.dataset.value || "");

    await new Promise(r => setTimeout(r, 2500));
  }
}
