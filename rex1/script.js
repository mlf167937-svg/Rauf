const images = [
  "/rex1/history1.jpg",
  "/rex1/history2.jpg",
  "/rex1/history3.jpg",
  "/rex1/history4.jpg"
];

const container = document.createElement("div");
container.style.textAlign = "center";
document.body.appendChild(container);

let index = 0;

// image element
const img = document.createElement("img");
img.style.width = "250px";
img.style.borderRadius = "15px";
img.style.transition = "0.5s";
container.appendChild(img);

// text element
const text = document.createElement("p");
text.style.color = "white";
text.style.marginTop = "10px";
container.appendChild(text);

// music sync
const audio = new Audio("/rex1/sempurna.mp3");
audio.loop = true;

// start
audio.play().catch(() => {
  console.log("User must interact first");
});

function showNext() {
  if (index < images.length) {
    img.style.opacity = 0;

    setTimeout(() => {
      img.src = images[index];
      text.innerText = "story " + (index + 1);

      img.style.opacity = 1;
      index++;
    }, 500);

    setTimeout(showNext, 3000); // delay antar foto (3 detik)
  } else {
    text.innerText = "the end.";
  }
}

showNext();
