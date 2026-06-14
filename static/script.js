const container = document.getElementById("container");
const bgm = document.getElementById("bgm");

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// typing effect
function typeText(el, text, speed = 20) {
  return new Promise(resolve => {
    let i = 0;
    el.innerHTML = "";

    const interval = setInterval(() => {
      el.innerHTML += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

async function run() {

  // 🎵 play music (auto start)
  bgm.volume = 0.5;
  bgm.play().catch(() => {
    console.log("autoplay blocked");
  });

  for (let i = 0; i < DATA.length; i++) {

    const item = DATA[i];

    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h1");
    title.innerText = item.title;
    card.appendChild(title);

    // image
    if (item.img) {
      const img = document.createElement("img");
      img.src = "/static/" + item.img;
      card.appendChild(img);
    }

    const text = document.createElement("div");
    card.appendChild(text);

    container.appendChild(card);

    // activate slide
    setTimeout(() => card.classList.add("active"), 100);

    // typing
    if (item.text) {
      await typeText(text, item.text);
    }

    // ⏳ delay sebelum slide berikutnya
    await delay(3500);

    // remove previous card (biar kayak slide)
    card.classList.remove("active");
  }
}

run();
