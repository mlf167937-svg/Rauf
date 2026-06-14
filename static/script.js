// 🌸 FLOW CONTROL CINEMATIC STORY

const intro = document.getElementById("intro");
const story = document.getElementById("story");

let delay = (ms) => new Promise(res => setTimeout(res, ms));

// typing effect
function typeText(el, text, speed = 25) {
  let i = 0;
  el.innerHTML = "";

  let interval = setInterval(() => {
    el.innerHTML += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

async function startStory() {

  // 🌸 intro 3 detik
  await delay(3000);

  intro.style.opacity = "0";
  await delay(800);
  intro.style.display = "none";

  story.classList.remove("hidden");

  // 💖 typing per card
  const texts = document.querySelectorAll(".text");

  for (let t of texts) {
    let content = t.getAttribute("data-text");
    await typeText(t, content);
    await delay(2000); // pause sebelum next
  }
}

window.onload = startStory;
