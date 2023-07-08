import { AbstractEntity } from "./AbstractEntity";

export class Worker extends AbstractEntity {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height);
    this.direction = { x: 0, y: 0 };
    this.buildingTarget = null;
    this.speed = 5;
    this.type = "worker";
		this.inventory = null;
  }

	takeItem(building) {
		if (building.outputSlot) {
			this.inventory = building.giveOutput();
		}
	}

	giveItem(building) {
		if (this.inventory) {
			building.takeInput(this.inventory);
		}
	}

  searchForBuilding() {
    const buildings = this.game.currentScene.entities
      .filter((entity) => entity.type === "building");
    return buildings[Math.floor(Math.random() * buildings.length)]
	}

	moveTowards(target) {
		const vector = {
			x: -((this.position.x + this.scale.width / 2) - (target.position.x + target.scale.width / 2)) ,
			y: -((this.position.y + this.scale.height / 2) - (target.position.y + target.scale.height / 2)) ,
		};
		this.direction = this.normalize(vector.x, vector.y);
		this.position.x += this.direction.x * this.speed;
		this.position.y += this.direction.y * this.speed;
		if (Math.sqrt(vector.x * vector.x + vector.y * vector.y) <= 80) {
			this.buildingTarget = null;
		}
	}

  update() {
    if (this.buildingTarget) {
			this.moveTowards(this.buildingTarget);
    }
		else {
			this.buildingTarget = this.searchForBuilding();
		}

		// if (Math.abs(this.direction.x) > Math.abs(this.direction.y)) {
		// 	if (this.direction.x > 0)
		// 		console.log("right");
		// 	else
		// 		console.log("left");
		// }
		// else {
		// 	if (this.direction.y > 0)
		// 		console.log("down");
		// 	else
		// 		console.log("up");
		// }
  }

  draw(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.scale.width,
      this.scale.height
    );
  }
}
