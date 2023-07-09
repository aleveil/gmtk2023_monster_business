import { ArmyZone } from "../entities/ArmyZone";
import { Building } from "../entities/Building";
import { CastleTower } from "../entities/CastleTower";
import { Enemy } from "../entities/Enemy";
import { Warrior } from "../entities/Warrior";
import { Worker } from "../entities/Worker";

export class EndScene {
  constructor(game) {
    this.game = game;
    this.entities = [
    ];
  }

  update(time) {
		this.entities.sort((a, b) => a.position.y - b.position.y);

    this.entities.forEach((entity) => {
      entity.update(time);
    });
  }

  draw(ctx) {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, this.game.width, this.game.height)

		ctx.font = "50px sans-serif"
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("Congratulations ! You win !", this.game.width / 2, this.game.height / 2);
  }
}
