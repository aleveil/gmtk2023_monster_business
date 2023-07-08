import { Building } from "../entities/Building";
import { Button } from "../entities/Button";
import { Worker } from "../entities/Worker";

export class MainScene {
  constructor(game) {
    this.game = game;
    this.entities = [
      new Worker(this.game, 50, 20, 50, 50),
			new Building(this.game, 500, 200, 100, 100, this.game.buildings.farm)
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
