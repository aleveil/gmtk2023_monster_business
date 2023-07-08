export class AbstractEntity {
  constructor(game, x, y, width, height) {
    this.game = game;
    this.position = {
      x: x,
      y: y,
    };
    this.scale = {
      width: width,
      height: height,
    };
  }

  update() {}

  draw(ctx) {}

  collides(other) {
    return (
      this.position.x + this.scale.width > other.position.x &&
      this.position.x < other.position.x + other.scale.width &&
      other.position.y + other.scale.height > this.position.y &&
      other.position.y < this.position.y + this.scale.height
    );
  }

	normalize(x, y) {
		const magnitude = Math.sqrt(x*x + y*y);;
		return {x: x/magnitude, y: y/magnitude};
	}
}
