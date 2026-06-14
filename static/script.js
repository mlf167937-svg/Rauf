let cards = [];

window.onload = function () {

  const btn = document.getElementById("klickBtn");
  const startScreen = document.getElementById("startScreen");
  const bgm = document.getElementById("bgm");

  btn.onclick = async function () {

    startScreen.style.display = "none";

    bgm.volume = 0.5;
    bgm.play().catch(() => {});

    createHearts();
    buildStory();
    autoPlay();
  };
};

/* 💖 LOVE BACKGROUND */
function createHearts(){

  const bg = document.getElementById("bg");
  const emojis = ["💖","🤍"];

  setInterval(() => {

    const h = document.createElement("div");
    h.className = "heart";
    h.innerText = emojis[Math.floor(Math.random()*2)];

    h.style.left = Math.random()*100 + "vw";
    h.style.fontSize = (12 + Math.random()*20) + "px";
    h.style.animationDuration = (4 + Math.random()*3) + "s";

    bg.appendChild(h);

    setTimeout(()=>h.remove(),7000);

  },200);
}

/* ✍️ HUMAN TYPING (AKU → AKUU STYLE FEEL) */
function typeText(el, text, speed = 35) {

  return new Promise(resolve => {

    el.innerHTML = "";

    let i = 0;

    function run() {

      if (i < text.length) {

        let char = text.charAt(i);

        // 💡 efek “ketik manusia” kecil
        if (char === "," || char === ".") {
          speed = 120;
        } else {
          speed = 30;
        }

        el.innerHTML += char;
        i++;

        setTimeout(run, speed);

      } else {
        resolve();
      }
    }

    run();
  });
}

/* 🧱 BUILD STORY */
function buildStory(){

  const container = document.getElementById("container");

  DATA.forEach(item => {

    const card = document.createElement("div");
    card.className = "card";

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

/* 🎬 SHOW */
async function show(i){

  cards.forEach(c => c.classList.remove("active"));

  const card = cards[i];
  card.classList.add("active");

  const textEl = card.querySelector(".text");

  await typeText(textEl, textEl.dataset.value, 30);
}

/* ⏱️ TIMING PRO (lebih cepat tapi masih readable) */
function getDelay(i){

  if(i === 0) return 16000;
  if(i === 1) return 18000;
  if(i === 2) return 18000;
  if(i === 3) return 20000;

  return 18000; // ending
}

async function autoPlay(){

  for(let i=0;i<cards.length;i++){

    await show(i);

    await new Promise(r => setTimeout(r, getDelay(i)));
  }
}
