const container = document.getElementById("container");
const bgm = document.getElementById("bgm");

let index = 0;
let cards = [];

function delay(ms){
  return new Promise(r=>setTimeout(r,ms));
}

function typeText(el,text,speed=20){
  return new Promise(resolve=>{
    let i=0;
    el.innerHTML="";

    const interval=setInterval(()=>{
      el.innerHTML+=text[i];
      i++;
      if(i>=text.length){
        clearInterval(interval);
        resolve();
      }
    },speed);
  });
}

/* 💖 SHOW SLIDE */
async function showSlide(i){

  if(i<0 || i>=DATA.length) return;

  index = i;

  cards.forEach(c=>{
    c.classList.remove("active");
  });

  const card = cards[i];
  card.classList.add("active");

  const textEl = card.querySelector(".text");
  const text = card.dataset.text || "";

  if(text && !card.dataset.done){
    card.dataset.done = "true";
    await typeText(textEl,text);
  }
}

/* ⏩ AUTO FLOW */
async function autoPlay(){

  for(let i=0;i<DATA.length;i++){
    await showSlide(i);
    await delay(3500);
  }
}

/* 🎮 NAV BUTTONS */
function createControls(){

  const ctrl = document.createElement("div");
  ctrl.style.position="fixed";
  ctrl.style.bottom="20px";
  ctrl.style.left="50%";
  ctrl.style.transform="translateX(-50%)";
  ctrl.style.display="flex";
  ctrl.style.gap="10px";
  ctrl.style.zIndex="999";

  ctrl.innerHTML=`
    <button id="prev">⬅</button>
    <button id="next">➡</button>
    <button id="pause">⏸</button>
  `;

  document.body.appendChild(ctrl);

  document.getElementById("prev").onclick=()=>showSlide(index-1);
  document.getElementById("next").onclick=()=>showSlide(index+1);

  document.getElementById("pause").onclick=()=>{
    index = index; // stop auto feeling (simple pause lock)
  };
}

/* 🚀 INIT */
async function init(){

  DATA.forEach((item,i)=>{

    const card=document.createElement("div");
    card.className="card";

    card.dataset.text = item.text || "";

    const title=document.createElement("h2");
    title.innerText=item.title;
    card.appendChild(title);

    if(item.img){
      const img=document.createElement("img");
      img.src="/static/"+item.img;
      card.appendChild(img);
    }

    const text=document.createElement("div");
    text.className="text";
    card.appendChild(text);

    container.appendChild(card);
    cards.push(card);
  });

  createControls();

  showSlide(0);
  autoPlay();
}

init();
