const photos = [
  "history1.jpg",
  "history2.jpg",
  "history3.jpg",
  "history4.jpg"
];

const texts = [
  "history1.txt",
  "history2.txt",
  "history3.txt",
  "history4.txt",
  "history5.txt"
];

let i = 0;

/* 💖 hearts background */
function spawnHearts() {
  const bg = document.getElementById("bg");
  const emojis = ["💖", "🤍", "🌹"];

  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (12 + Math.random() * 20) + "px";
    h.style.animationDuration = (4 + Math.random() * 4) + "s";

    bg.appendChild(h);
    setTimeout(() => h.remove(), 8000);
  }, 200);
}

/* 📖 load txt file */
async function loadText(file) {
  try {
    const res = await fetch(`/rex1/${file}`);
    return await res.text();
  } catch {
    return "text tidak ditemukan...";
  }
}

/* 🚀 main story */
async function run() {
  const photoEl = document.getElementById("photo");
  const textEl = document.getElementById("text");
  const audio = document.getElementById("bgm");

  audio.volume = 0.6;

  audio.play().catch(() => {});

  spawnHearts();

  for (let i = 0; i < photos.length; i++) {

    // 🔵 foto
    photoEl.src = `/rex1/${photos[i]}`;

    // 🟣 text dari file
    const txt = await loadText(texts[i]);
    textEl.innerText = txt;

    await new Promise(r => setTimeout(r, 5000));
  }

  // 🟣 ending text
  const endTxt = await loadText("history5.txt");
  textEl.innerText = endTxt;
}

window.onload = run;
