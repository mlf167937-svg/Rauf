const container = document.getElementById("container");

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// typing effect
function typeText(el, text, speed = 25) {
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

async function runStory() {

  for (let i = 0; i < DATA.length; i++) {

    const item = DATA[i];

    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h2");
    title.innerText = item.title;
    card.appendChild(title);

    // image optional (SAFE)
    if (item.img && item.img.trim() !== "") {
      const img = document.createElement("img");
      img.src = "/static/" + item.img;
      card.appendChild(img);
    }

    const textEl = document.createElement("div");
    textEl.className = "text";
    card.appendChild(textEl);

    container.appendChild(card);

    // show animation
    setTimeout(() => card.classList.add("show"), 100);

    // typing only if text exists
    if (item.text && item.text.trim() !== "") {
      await typeText(textEl, item.text);
    }

    await delay(2000); // delay ke history berikutnya
  }
}

runStory();
