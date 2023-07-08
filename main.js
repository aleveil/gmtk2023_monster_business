import { Game } from "./classes/Game";

const canvas = document.createElement("canvas");

canvas.width = 1280;
canvas.height = 720;

document.getElementById("app").appendChild(canvas);

const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;
const game = new Game(canvas);







// const playerImage = new Image();
// playerImage.src = "./public/BackGoblin-Sheet.png";
// const spriteWidth = 16 ; 
// const spriteHeight = 16;
// let frameX = 0;
// let frameY = 0;
// let gameFrame = 0;
// const staggerFrame = 10;

// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   let position = Math.floor(gameFrame / staggerFrame) % 4;
//   frameX = spriteWidth * position ;
//   ctx.drawImage(playerImage, frameX , frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, canvas.width, canvas.height);
  
//   gameFrame++;
//   requestAnimationFrame(animate);
// }

// animate();

const loop = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  game.update();
  game.draw(ctx);
  requestAnimationFrame(loop);
}

loop()
