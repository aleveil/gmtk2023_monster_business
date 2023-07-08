import { AbstractEntity } from "./AbstractEntity";

export class BouncingSquare extends AbstractEntity {
	constructor(game, x, y, width, height, color, speed) {
		super(game, x, y, width, height);
		this.color = color;
		this.speed = speed;
		this.goRight = true;
	}

	update() {
		if (this.position.x + this.scale.width >= this.game.width)
			this.goRight = false;
		if (this.position.x <= 0)
			this.goRight = true;
		this.position.x += this.goRight ? this.speed : -this.speed;
		this.speed += Math.random() - 0.5;
		if (this.speed <= 0) this.speed = 0;
	}

	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.position.x, this.position.y, this.scale.width, this.scale.height);
		ctx.font = "50px sans-serif";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(Math.floor(this.speed), this.position.x + this.scale.width / 2, this.position.y  + this.scale.height / 2);
	}
}