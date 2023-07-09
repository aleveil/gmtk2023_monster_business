import { AbstractEntity } from "./AbstractEntity";

export class ProgressBar extends AbstractEntity {
  constructor(game, x, y, width, height, color) {
    super(game, x, y, width, height);
    this.value = null;
    this.max = null;
		this.color = color;
  }

  update() {

	}

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.scale.width,
      this.scale.height
    );
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      (this.value / this.max) * this.scale.width,
      this.scale.height
    );
  }
}
