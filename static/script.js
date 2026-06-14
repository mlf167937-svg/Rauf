const container = document.getElementById("container");
const bgm = document.getElementById("bgm");
const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");

function delay(ms){
  return new Promise(r=>setTimeout(r,ms));
}

function typeText(el,text,speed=25){
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

async function runStory(){

  for(let i=0;i<DATA.length;i++){

    const item=DATA[i];

    const card=document.createElement("div");
    card.className="card";

    const title=document.createElement("h2");
    title.innerText=item.title;
    card.appendChild(title);

    if(item.img && item.img.trim()!==""){
      const img=document.createElement("img");
      img.src="/static/"+item.img;
      card.appendChild(img);
    }

    const text=document.createElement("div");
    text.className="text";
    card.appendChild(text);

    container.appendChild(card);

    setTimeout(()=>card.classList.add("active"),100);

    if(item.text && item.text.trim()!==""){
      await typeText(text,item.text);
    }

    await delay(3000);
  }
}

/* 🔥 START BUTTON (FIX MUSIC AUTOPLAY) */
startBtn.addEventListener("click",async()=>{

  startScreen.style.display="none";

  try{
    bgm.volume=0.5;
    await bgm.play();
  }catch(e){
    console.log("music blocked");
  }

  runStory();
});
