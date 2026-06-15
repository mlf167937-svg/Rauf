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

function spawnParticles() {
  const bg = document.getElementById("bg");
  const emojis = ["💖","🤍","🌹"];

  setInterval(() => {
    const e = document.createElement("div");
    e.className = "heart";
    e.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    e.style.left = Math.random() * 100 + "vw";
    e.style.fontSize = (12 + Math.random() * 18) + "px";
    e.style.animationDuration = (4 + Math.random() * 4) + "s";

    bg.appendChild(e);
    setTimeout(() => e.remove(), 8000);
  }, 200);
}

async function loadText(file) {
  const res = await fetch(`/rex1/${file}`);
  return await res.text();
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function showText(el, content) {

  el.classList.remove("show");
  await sleep(200);

  el.innerText = content;

  el.classList.add("show"); // 🔥 ANIMASI MUNCUL
}

async function run() {
  const photo = document.getElementById("photo");
  const text = document.getElementById("text");
  const box = document.querySelector(".text-box");
  const audio = document.getElementById("bgm");

  audio.volume = 0.6;
  audio.play().catch(()=>{});

  spawnParticles();

  // 🔵 SLIDE 1–4 (foto + text)
  for (let i = 0; i < photos.length; i++) {

    photo.style.opacity = 0;
    await sleep(300);

    photo.src = `/rex1/${photos[i]}`;
    photo.style.opacity = 1;

    const txt = await loadText(texts[i]);
    await showText(text, txt);

    await sleep(4500); // ⏱️ delay antar slide FIX
  }

  // 🟣 FINAL TEXT ONLY (NO IMAGE)
  photo.style.display = "none"; // 🔥 HAPUS FOTO

  const endText = await loadText("history5.txt");

  box.classList.add("end");

  await showText(text, endText);
}

window.onload = run;
