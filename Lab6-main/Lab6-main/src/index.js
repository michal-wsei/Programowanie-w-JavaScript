import "./styles.css";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const radius = 5;

let x = 25;
let y = 25;

let dx = 2;
let dy = -2;

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0f0f0f";
  ctx.fill();
  ctx.closePath();

  if (x + dx > canvas.width - radius || x + dx < radius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - radius || y + dy < radius) {
    dy = -dy;
  }

  x += dx;
  y += dy;
};

setInterval(draw, 10);
