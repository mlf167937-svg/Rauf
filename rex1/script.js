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
  const emojis = ["💖","🤍","🌹","✨"];

  setInterval(() => {
    const e = document.createElement("div");
    e.className = "heart";
    e.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    e.style.left = Math.random() * 100 + "vw";
    e.style.fontSize = (12 + Math.random() * 18) + "px";
    e.style.animationDuration = (4 + Math.random() * 4) + "s";

    bg.appendChild(e);
    setTimeout(() => e.remove(), 8000);
  }, 180);
}

async function loadText(file) {
  try {
    const res = await fetch(`/rex1/${file}`);
    return await res.text();
  } catch {
    return "text error...";
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  const photo = document.getElementById("photo");
  const text = document.getElementById("text");
  const box = document.querySelector(".text-box");
  const audio = document.getElementById("bgm");

  audio.volume = 0.6;
  audio.play().catch(()=>{});

  spawnParticles();

  for (let i = 0; i < photos.length; i++) {

    // 🔵 image fade
    photo.style.opacity = 0;
    await sleep(200);

    photo.src = `/rex1/${photos[i]}`;
    photo.style.opacity = 1;

    // 🟣 text load
    const txt = await loadText(texts[i]);

    text.classList.remove("fade");
    text.innerText = txt;

    box.classList.remove("end");

    await sleep(4500);
  }

  // 🟣 ending center text
  const end = await loadText("history5.txt");

  box.classList.add("end");
  text.innerText = end;
}

window.onload = run;
