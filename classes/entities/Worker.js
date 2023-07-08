import { AbstractEntity } from "./AbstractEntity";

export class Worker extends AbstractEntity {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height);
    this.direction = { x: 0, y: 0 };
    this.target = { x: 500, y: 500 };
    this.speed = 5;
    this.sprite = new Image();
    this.sprite.src = "/goblinSprite-Sheet.png";
    this.frameY = 0;
    this.staggerFrame = 5;
  }

  update() {
    console.log(this);
    if (this.target) {
      const vector = {
        x: this.position.x - this.target.x,
        y: this.position.y - this.target.y,
      };
      this.direction = this.normalize(vector.x, vector.y);

      this.position.x -= this.direction.x * this.speed;
      this.position.y -= this.direction.y * this.speed;

      if (Math.sqrt(vector.x * vector.x + vector.y * vector.y) <= 3) {
        this.target = null;
      }
    }
  }

  draw(ctx) {
    let position = Math.floor(this.game.frame / this.staggerFrame) % 4;
    let frameX = 16 * position;
    console.log(frameX);
    ctx.drawImage(
      this.sprite,
      frameX,
      this.frameY * 16,
      16,
      16,
      this.position.x,
      this.position.y,
      128,
      128
    );
  }
}
