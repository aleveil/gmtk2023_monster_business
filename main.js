import { Game } from "./classes/Game";

const canvas = document.createElement("canvas");

canvas.width = 1280;
canvas.height = 720;

document.getElementById("app").appendChild(canvas);

const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;
const game = new Game(canvas);

const loop = (time) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  game.update(time);
  game.draw(ctx);
  requestAnimationFrame(loop);
}

loop()
