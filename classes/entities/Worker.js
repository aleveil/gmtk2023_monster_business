import { AbstractEntity } from "./AbstractEntity";

export class Worker extends AbstractEntity {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height);
    this.direction = { x: 0, y: 0 };
    this.target = { x: 500, y: 500 };
    this.speed = 5;
  }

  update() {
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
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.scale.width,
      this.scale.height
    );
  }
}
