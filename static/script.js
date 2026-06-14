let index = 0;
let cards = [];

window.onload = function () {

  const btn = document.getElementById("klickBtn");
  const startScreen = document.getElementById("startScreen");
  const bgm = document.getElementById("bgm");

  btn.onclick = async function () {

    startScreen.style.opacity = "0";
    setTimeout(() => startScreen.style.display = "none", 600);

    if (bgm) {
      bgm.volume = 0.5;
      bgm.play().catch(() => {});
    }

    startStory();
  };
};

/* 🌸 HEART BACKGROUND (lebih smooth) */
function createHearts(){
  const bg = document.getElementById("bg");

  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.innerText = "💖";

    h.style.left = Math.random()*100 + "vw";
    h.style.fontSize = (12 + Math.random()*18) + "px";
    h.style.animationDuration = (4 + Math.random()*3) + "s";

    bg.appendChild(h);

    setTimeout(() => h.remove(), 7000);
  }, 250);
}

/* ✍️ TEXT ANIMATION PRO */
function typeText(el, text, speed = 35) {
  return new Promise(resolve => {

    el.innerHTML = "";
    let i = 0;

    function typing() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else {
        resolve();
      }
    }

    typing();
  });
}

/* 🎬 SHOW SLIDE */
async function showSlide(i){

  if (!cards[i]) return;

  cards.forEach(c => {
    c.classList.remove("active");
    c.style.transform = "translateX(40px)";
  });

  const card = cards[i];
  card.classList.add("active");

  const textEl = card.querySelector(".text");
  const text = card.dataset.text || "";

  // reset text dulu
  textEl.innerHTML = "";

  // typing effect
  if (text) {
    await typeText(textEl, text, 30);
  }

  index = i;
}

/* ⏳ AUTO FLOW PRO (CUSTOM DELAY PER SLIDE) */
async function autoPlay(){

  for (let i = 0; i < cards.length; i++) {

    await showSlide(i);

    // 🔥 delay lebih cinematic
    await delay(getDelay(i));
  }
}

/* 🎚️ CONTROL KECEPATAN PER SLIDE */
function getDelay(i){

  // slide pertama lebih lama
  if (i === 0) return 5000;

  // slide tengah normal
  if (i === 1) return 4500;

  // slide terakhir lebih slow romantic
  return 6000;
}

/* ⏳ helper delay */
function delay(ms){
  return new Promise(r => setTimeout(r, ms));
}

/* 🚀 BUILD STORY */
function startStory(){

  createHearts();

  DATA.forEach(item => {

    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h2");
    title.innerText = item.title;
    card.appendChild(title);

    if (item.img) {
      const img = document.createElement("img");

      // smooth image load
      img.onload = () => {
        img.style.opacity = "1";
      };

      img.style.opacity = "0";
      img.style.transition = "0.6s";

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
