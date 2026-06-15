let cards = [];
let lyrics = [];

window.onload = function () {

  const btn = document.getElementById("klickBtn");
  const bgm = document.getElementById("bgm");

  btn.onclick = async function () {

    document.getElementById("startScreen").style.display = "none";

    createHearts();

    await loadLyrics();

    buildStory();

    // audio fix autoplay
    document.body.addEventListener("click", () => {
      bgm.volume = 0.5;
      bgm.play().catch(()=>{});
    }, { once:true });

    startStory();
    syncLyrics();
  };
};

/* 💖 LOVE */
function createHearts() {
  const bg = document.getElementById("bg");
  const emo = ["💖","🤍","🌹"];

  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.innerText = emo[Math.random()*emo.length|0];

    h.style.left = Math.random()*100 + "vw";
    h.style.fontSize = (14+Math.random()*25)+"px";
    h.style.animationDuration = (4+Math.random()*3)+"s";

    bg.appendChild(h);
    setTimeout(()=>h.remove(),8000);
  },150);
}

/* 📥 LOAD TXT */
async function loadText(file){
  return await fetch("/rex1/"+file).then(r=>r.text());
}

/* 📥 LOAD LYRICS */
async function loadLyrics(){
  lyrics = await fetch("/rex1/lyrics.json").then(r=>r.json());
  renderLyrics();
}

/* 🎤 RENDER LYRIC */
function renderLyrics(){
  const box = document.getElementById("lyricsBox");
  box.innerHTML = lyrics.map((l,i)=>
    `<span id="lyr${i}">${l.text}</span>`
  ).join(" ");
}

/* 🧱 STORY */
async function buildStory(){

  const container = document.getElementById("container");

  for(let i=1;i<=5;i++){

    const text = await loadText(`history${i}.txt`);

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = "/rex1/history"+i+".jpg";

    const t = document.createElement("div");
    t.className = "text";
    t.dataset.value = text;

    card.appendChild(img);
    card.appendChild(t);

    container.appendChild(card);
    cards.push(card);
  }
}

/* ✍️ TYPE */
function type(el,text,speed=20){
  return new Promise(res=>{
    el.innerHTML="";
    let i=0;
    let x=setInterval(()=>{
      el.innerHTML+=text[i++];
      if(i>=text.length){
        clearInterval(x);
        res();
      }
    },speed);
  });
}

/* 🎬 STORY */
async function startStory(){

  for(let i=0;i<cards.length;i++){

    cards.forEach(c=>c.classList.remove("active"));
    cards[i].classList.add("active");

    const el = cards[i].querySelector(".text");

    await type(el,el.dataset.value);

    await new Promise(r=>setTimeout(r,3500));
  }
}

/* 🎧 LYRIC SYNC */
function syncLyrics(){

  const audio = document.getElementById("bgm");

  audio.ontimeupdate = () => {

    let t = audio.currentTime;

    lyrics.forEach((l,i)=>{

      const el = document.getElementById("lyr"+i);

      if(t >= l.time){
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  };
}
