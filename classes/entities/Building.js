import { AbstractEntity } from "./AbstractEntity";

export class Building extends AbstractEntity {
  constructor(
    game,
    x,
    y,
    width,
    height,
    data
  ) {
    super(game, x, y, width, height);

    this.data = data;
		this.inputSlots = [];
		this.outputSlot = null;
  }

  update() {

	}

  draw(ctx) {
    ctx.fillStyle = this.data.color;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.scale.width,
      this.scale.height
    );
  }
}
