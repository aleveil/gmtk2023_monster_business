import { AbstractEntity } from "./AbstractEntity";

export class Item extends AbstractEntity {
	constructor(game, x, y, width, height, data) {
		super(game, x, y, width, height);
		this.data = data;
		this.type = "item";
	}

	update() {
		
	}

	draw(ctx) {
		ctx.fillStyle = this.data.color;
		ctx.fillRect(this.position.x, this.position.y, this.scale.width, this.scale.height);
	}
}