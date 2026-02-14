const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const proposalCard = document.getElementById("proposalCard");
const celebration = document.getElementById("celebration");
const buttonsArea = document.getElementById("buttonsArea");

let zoomiesMode = true;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

function randomPositionWithinArea() {
  const areaRect = buttonsArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, areaRect.width - btnRect.width);
  const maxY = Math.max(0, areaRect.height - btnRect.height);

  return {
    x: Math.floor(Math.random() * (maxX + 1)),
    y: Math.floor(Math.random() * (maxY + 1)),
  };
}

function placeNoButton(x, y) {
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "none";
}

function teleportNoButton() {
  if (!zoomiesMode) return;
  const pos = randomPositionWithinArea();
  placeNoButton(pos.x, pos.y);
}

function dodgeFromPointer() {
  if (!zoomiesMode) return;

  const areaRect = buttonsArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  const dx = btnCenterX - mouseX;
  const dy = btnCenterY - mouseY;
  const distance = Math.hypot(dx, dy);

  // If pointer is getting close, the No button runs away immediately.
  if (distance < 180) {
    const runBoost = distance < 110 ? 240 : 140;
    const normX = dx / (distance || 1);
    const normY = dy / (distance || 1);

    const currentLeft = parseFloat(noBtn.style.left || "0");
    const currentTop = parseFloat(noBtn.style.top || "0");

    const maxX = Math.max(0, areaRect.width - btnRect.width);
    const maxY = Math.max(0, areaRect.height - btnRect.height);

    let nextX = currentLeft + normX * runBoost + (Math.random() * 60 - 30);
    let nextY = currentTop + normY * runBoost + (Math.random() * 40 - 20);

    if (nextX < 0 || nextX > maxX || nextY < 0 || nextY > maxY) {
      const pos = randomPositionWithinArea();
      nextX = pos.x;
      nextY = pos.y;
    }

    placeNoButton(Math.max(0, Math.min(maxX, nextX)), Math.max(0, Math.min(maxY, nextY)));
  }
}

function trackPointer(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  dodgeFromPointer();
}

["mouseenter", "mousemove", "touchstart", "mousedown", "pointerdown", "click"].forEach(
  (evt) => {
    noBtn.addEventListener(evt, (event) => {
      event.preventDefault();
      event.stopPropagation();
      teleportNoButton();
    });
  },
);

buttonsArea.addEventListener("mousemove", trackPointer);
window.addEventListener("mousemove", trackPointer);

const noEscapeInterval = setInterval(teleportNoButton, 120);

yesBtn.addEventListener("click", () => {
  zoomiesMode = false;
  clearInterval(noEscapeInterval);
  proposalCard.classList.add("hidden");
  celebration.classList.remove("hidden");
  document.body.style.background =
    "radial-gradient(circle at 20% 20%, #ff8fae 0 25%, transparent 35%), radial-gradient(circle at 80% 10%, #ffc0d1 0 25%, transparent 35%), linear-gradient(160deg, #7d001f, #cc0045)";
});

window.addEventListener("resize", teleportNoButton);
window.addEventListener("load", teleportNoButton);
