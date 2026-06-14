let index = 0;
let cards = [];
let typingLock = false;

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

    startStory();
  };
};

/* 💖 HEART BG */
function createHearts(){
  const bg = document.getElementById("bg");

  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.innerText = "💖";
    h.style.left = Math.random()*100 + "vw";
    bg.appendChild(h);

    setTimeout(() => h.remove(), 6000);
  }, 300);
}

/* ✍️ SAFE TYPE (ANTI DOUBLE GLITCH) */
function typeText(el, text, speed = 25) {

  return new Promise(resolve => {

    if (!text) return resolve();

    el.innerHTML = "";

    let i = 0;

    // 🔥 ANTI DOUBLE CALL
    if (el.dataset.typing === "1") return resolve();
    el.dataset.typing = "1";

    function run() {

      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(run, speed);
      } else {
        el.dataset.typing = "0";
        resolve();
      }
    }

    run();
  });
}

/* 🎬 SHOW SLIDE */
async function showSlide(i){

  if (!cards[i]) return;

  cards.forEach(c => c.classList.remove("active"));

  const card = cards[i];
  card.classList.add("active");

  const textEl = card.querySelector(".text");

  const text = card.dataset.text || "";

  textEl.innerHTML = "";

  await typeText(textEl, text, 28);

  index = i;
}

/* ⏳ AUTO */
async function autoPlay(){

  for (let i = 0; i < cards.length; i++) {

    await showSlide(i);

    await delay(i === 0 ? 5000 : 4500);
  }
}

function delay(ms){
  return new Promise(r => setTimeout(r, ms));
}

/* 🚀 BUILD */
function startStory(){

  createHearts();

  document.getElementById("container").innerHTML = "";
  cards = [];

  DATA.forEach(item => {

    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h2");
    title.innerText = item.title;
    card.appendChild(title);

    if (item.img) {
      const img = document.createElement("img");
      img.src = "/static/" + item.img;
      card.appendChild(img);
    }

    const text = document.createElement("div");
    text.className = "text";

    card.appendChild(text);

    card.dataset.text = item.text || "";

    document.getElementById("container").appendChild(card);

    cards.push(card);
  });

  showSlide(0);
  autoPlay();
}
