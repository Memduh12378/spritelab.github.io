const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const GRID = 16;
const PIXEL = 32;

canvas.width = GRID * PIXEL;
canvas.height = GRID * PIXEL;

let drawing = false;
let erasing = false;
let color = "#ff2e2e";

/* GRID */
function drawGrid() {
  ctx.strokeStyle = "#1f1f1f";
  for (let i = 0; i <= GRID; i++) {
    ctx.beginPath();
    ctx.moveTo(i * PIXEL, 0);
    ctx.lineTo(i * PIXEL, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * PIXEL);
    ctx.lineTo(canvas.width, i * PIXEL);
    ctx.stroke();
  }
}

drawGrid();

/* DRAW PIXEL */
function drawPixel(x, y) {
  ctx.fillStyle = erasing ? "#000" : color;
  ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
  drawGrid();
}

/* EVENTS */
canvas.addEventListener("mousedown", e => {
  drawing = true;
  paint(e);
});

canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseleave", () => drawing = false);
canvas.addEventListener("mousemove", paint);

function paint(e) {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / PIXEL);
  const y = Math.floor((e.clientY - rect.top) / PIXEL);

  drawPixel(x, y);
}

/* UI */
document.getElementById("colorPicker").addEventListener("input", e => {
  color = e.target.value;
  erasing = false;
});

document.getElementById("eraser").addEventListener("click", () => {
  erasing = true;
});

document.getElementById("pen").addEventListener("click", () => {
  erasing = false;
});

document.getElementById("clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
});

const spriteNameInput = document.getElementById("spriteName");

spriteNameInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    spriteNameInput.blur();
  }
});
