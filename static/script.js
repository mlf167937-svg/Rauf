let cards = [];

window.onload = function(){

  const btn = document.getElementById("klickBtn");
  const startScreen = document.getElementById("startScreen");
  const bgm = document.getElementById("bgm");

  btn.onclick = async function(){

    startScreen.style.display = "none";

    bgm.volume = 0.5;
    bgm.play().catch(()=>{});

    createHearts();
    buildStory();

    await autoPlay();
  };
};

/* 💖 HEARTS */
function createHearts(){
  const bg = document.getElementById("bg");

  setInterval(()=>{
    const h = document.createElement("div");
    h.className="heart";
    h.innerText="💖";

    h.style.left = Math.random()*100 + "vw";

    bg.appendChild(h);

    setTimeout(()=>h.remove(),6000);
  },250);
}

/* ✍️ TYPE */
function typeText(el,text,speed=35){

  return new Promise(resolve=>{

    el.innerHTML="";
    let i=0;

    function run(){
      if(i<text.length){
        el.innerHTML += text[i];
        i++;
        setTimeout(run,speed);
      }else{
        resolve();
      }
    }

    run();
  });
}

/* BUILD */
function buildStory(){

  const container = document.getElementById("container");

  DATA.forEach(item=>{

    const card = document.createElement("div");
    card.className="card";

    const title = document.createElement("h2");
    title.innerText=item.title;

    const img = document.createElement("img");
    img.src="/static/"+item.img;

    const text = document.createElement("div");
    text.className="text";

    text.dataset.value = item.text;

    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(text);

    container.appendChild(card);

    cards.push(card);
  });
}

/* SHOW */
async function show(i){

  cards.forEach(c=>c.classList.remove("active"));

  const card = cards[i];
  card.classList.add("active");

  const textEl = card.querySelector(".text");

  await typeText(textEl, textEl.dataset.value, 30);
}

/* ⏱️ TIMING 4 SLIDE ~ 2 MENIT */
function getDelay(i){

  if(i===0) return 30000; // 30s
  if(i===1) return 35000; // 35s
  if(i===2) return 35000; // 35s
  return 40000;          // 40s
}

async function autoPlay(){

  for(let i=0;i<cards.length;i++){

    await show(i);

    await new Promise(r=>setTimeout(r,getDelay(i)));
  }
}
