import { BouncingSquare } from "../entities/BouncingSquare";

export class BouncingScene {
  constructor(game) {
    this.game = game;
    this.entities = [
      new BouncingSquare(this.game, 0, 50, 150, 100, "blue", Math.floor(Math.random() * 45) + 5),
      new BouncingSquare(this.game, 0, 100, 100, 100, "red", Math.floor(Math.random() * 45) + 5),
      new BouncingSquare(this.game, 0, 200, 100, 100, "green", Math.floor(Math.random() * 45) + 5),
      new BouncingSquare(this.game, 0, 300, 100, 100, "purple", Math.floor(Math.random() * 45) + 5),
			new BouncingSquare(this.game, 0, 400, 100, 100, "orange",Math.floor(Math.random() * 45) + 5),
      new BouncingSquare(this.game, 0, 500, 100, 100, "cyan", Math.floor(Math.random() * 45) + 5),
      new BouncingSquare(this.game, 0, 600, 100, 100, "black", Math.floor(Math.random() * 45) + 5),
    ];
  }

  update() {
    this.entities.forEach((entity) => {
      entity.update();
    });
  }

  draw(ctx) {
    this.entities.forEach((entity) => {
      entity.draw(ctx);
    });
  }
}
