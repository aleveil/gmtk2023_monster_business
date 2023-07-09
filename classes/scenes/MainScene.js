import { ArmyZone } from "../entities/ArmyZone";
import { Building } from "../entities/Building";
import { Button } from "../entities/Button";
import { CastleTower } from "../entities/CastleTower";
import { Enemy } from "../entities/Enemy";
import { Warrior } from "../entities/Warrior";
import { Worker } from "../entities/Worker";

export class MainScene {
  constructor(game) {
    this.game = game;
    this.entities = [
			new CastleTower(this.game, 320 - 50, 360 - 50, 100, 100),
      new ArmyZone(this.game, 700, 50, 100, 100),
      new Building(this.game, 750, 530, 100, 100, this.game.buildings.farm),
      new Building(this.game, 1100, 550, 100, 100, this.game.buildings.mine),
      new Building(this.game, 780, 280, 100, 100, this.game.buildings.forge),
      new Building(this.game, 1050, 330, 100, 100, this.game.buildings.hut),
      new Building(this.game, 1020, 100, 100, 100, this.game.buildings.barracks),
      new Worker(this.game, Math.random() * 600 + 640, Math.random() * 650, 50, 50),
      new Worker(this.game, Math.random() * 600 + 640, Math.random() * 650, 50, 50),
      new Worker(this.game, Math.random() * 600 + 640, Math.random() * 650, 50, 50),
    ];

		this.ui = [
		];

		this.grassTile = new Image();
		this.grassTile.src = "/tilegrass.png";
		this.stoneTile = new Image();
		this.stoneTile.src = "/Tile.png";

		this.goldSprite = new Image();
		this.goldSprite.src = "/gold.png"
  }

  update(time) {
		this.entities.sort((a, b) => a.position.y - b.position.y);

    this.entities.forEach((entity) => {
      entity.update(time);
    });

		this.ui.forEach((entity) => {
      entity.update(time);
    });
  }

  draw(ctx) {
		for(let x = 0; x < this.game.width; x += 32) {
			for(let y = 0; y < this.game.height; y += 32) {
				ctx.drawImage(x < this.game.width / 2 ? this.grassTile : this.stoneTile, x, y, 32, 32);
			}
		}
    this.entities.forEach((entity) => {
      entity.draw(ctx);
    });
		this.ui.forEach((entity) => {
      entity.draw(ctx);
    });

		ctx.font = "50px sans-serif";
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";

		ctx.fillText(this.game.gold, this.game.width - 150, 50);
		ctx.strokeText(this.game.gold, this.game.width - 150, 50);

		ctx.drawImage(this.goldSprite, this.game.width - 100, 8, 54, 54)


  }
}
