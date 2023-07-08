import { Building } from "../entities/Building";
import { Button } from "../entities/Button";
import { Worker } from "../entities/Worker";

export class MainScene {
  constructor(game) {
    this.game = game;
    this.entities = [
      new Building(this.game, 20, 100, 100, 100, this.game.buildings.farm),
      new Building(this.game, 500, 200, 100, 100, this.game.buildings.forge),
      new Building(this.game, 1000, 400, 100, 100, this.game.buildings.mine),
      new Building(this.game, 300, 500, 100, 100, this.game.buildings.barracks),
      new Building(this.game, 1000, 100, 100, 100, this.game.buildings.farm),
      new Worker(this.game, 50, 20, 50, 50),
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
