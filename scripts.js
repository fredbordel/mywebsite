function activateArrows() {
  const square = document.getElementById("monster");

  const rect = square.getBoundingClientRect();
  const xViewport = rect.left;
  const yViewport = rect.top;

  let monsterTranslateUp = 0;
  let monsterTranslateRight = 0;
  let monsterTranslateDown = 0;
  let monsterTranslateLeft = 0;

  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "ArrowUp") {
      monsterTranslateUp -= 10;
      square.style.transform = `translateY(${monsterTranslateUp.toString()}px)`;
    }

    if (key === "ArrowRight") {
      monsterTranslateRight += 10;
      square.style.transform = `translateX(${monsterTranslateRight.toString()}px)`;
    }

    if (key === "ArrowDown") {
      monsterTranslateDown += 10;
      square.style.transform = `translateY(${monsterTranslateDown.toString()}px)`;
    }

    if (key === "ArrowLeft") {
      monsterTranslateLeft -= 10;
      square.style.transform = `translateX(${monsterTranslateLeft.toString()}px)`;
    }
  });
}
