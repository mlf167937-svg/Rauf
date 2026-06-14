let index = 0;
let cards = [];

window.onload = function () {

  const btn = document.getElementById("klickBtn");
  const startScreen = document.getElementById("startScreen");
  const bgm = document.getElementById("bgm");

  if (!btn) {
    console.log("BUTTON NOT FOUND");
    return;
  }

  btn.onclick = async function () {

    startScreen.style.display = "none";

    // 🎵 music safe
    if (bgm) {
      bgm.volume = 0.5;
      bgm.play().catch(() => {});
    }

    startStory();
  };
};

/* 💖 HEART BACKGROUND */
function createHearts(){
  const bg = document.getElementById("bg");

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = Math.random()*100 + "vw";
    heart.style.fontSize = (10 + Math.random()*20) + "px";
    bg.appendChild(heart);

    setTimeout(()=>heart.remove(),6000);
  },300);
}

/* STORY */
function startStory(){

  createHearts();

  DATA.forEach((item,i)=>{

    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h2");
    title.innerText = item.title;
    card.appendChild(title);

    if(item.img){
      const img = document.createElement("img");
      img.src = "/static/" + item.img;
      card.appendChild(img);
    }

    const text = document.createElement("p");
    text.innerText = item.text || "";
    card.appendChild(text);

    document.getElementById("container").appendChild(card);

    cards.push(card);
  });

  showSlide(0);
  autoSlide();
}

function showSlide(i){
  cards.forEach(c => c.classList.remove("active"));
  if(cards[i]) cards[i].classList.add("active");
  index = i;
}

function autoSlide(){
  setInterval(()=>{
    index++;
    if(index >= cards.length) index = 0;
    showSlide(index);
  },4000);
}
