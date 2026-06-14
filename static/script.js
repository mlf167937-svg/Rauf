const btn = document.getElementById("klickBtn");
const startScreen = document.getElementById("startScreen");
const bgm = document.getElementById("bgm");
const container = document.getElementById("container");

function delay(ms){
  return new Promise(r=>setTimeout(r,ms));
}

/* typing effect */
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

/* STORY DATA (contoh) */
const DATA = [
  { title:"History 1", img:"", text:"Ini adalah awal cerita kita..." },
  { title:"History 2", img:"history2.jpg", text:"Kita mulai lebih dekat..." },
  { title:"History 3", img:"history3.jpg", text:"Dan semua jadi kenangan..." }
];

/* STORY RUN */
async function runStory(){

  for(let item of DATA){

    const card=document.createElement("div");
    card.style.padding="20px";

    const title=document.createElement("h2");
    title.innerText=item.title;
    card.appendChild(title);

    if(item.img){
      const img=document.createElement("img");
      img.src="static/"+item.img;
      img.style.width="100%";
      img.style.borderRadius="15px";
      card.appendChild(img);
    }

    const text=document.createElement("div");
    card.appendChild(text);

    container.appendChild(card);

    await typeText(text,item.text);
    await delay(3000);
  }
}

/* START BUTTON */
btn.addEventListener("click",async()=>{

  startScreen.style.display="none";

  try{
    bgm.volume=0.5;
    await bgm.play();
  }catch(e){
    console.log("music blocked");
  }

  runStory();
});
