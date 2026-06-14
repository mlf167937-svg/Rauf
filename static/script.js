document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".card");

  cards.forEach((card, i) => {

    // awal state
    card.style.opacity = 0;
    card.style.transform = "translateY(30px)";

    // animasi muncul bertahap
    setTimeout(() => {
      card.style.transition = "0.7s ease";
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, i * 250);

  });

  console.log("🌸 Cheslea Story Loaded");
});