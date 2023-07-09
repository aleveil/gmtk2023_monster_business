import { AbstractEntity } from "./AbstractEntity";

export class Worker extends AbstractEntity {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height);

    this.direction = { x: 0, y: 0 };
    this.buildingTarget = null;
    this.speed = 5;
    this.sprite = new Image();
    this.sprite.src = "/goblinSprite-Sheet.png";
		this.itemSprite = new Image();
    this.frameY = 0;
    this.staggerFrame = 10;
    this.type = "worker";
    this.inventory = null;
    this.isInputMode = false;
  }

  takeItem(building) {
    if (building.outputSlot) {
      this.inventory = building.giveOutput();
    }
  }

  giveItem(building) {
    if (this.inventory) {
      building.takeInput(this.inventory);
      this.inventory = null;
    }
  }

  searchForInput() {
    const buildings = this.game.currentScene.entities
      .filter((entity) => entity.type === "building")
      .filter((entity) => {
        if (!entity.data.inputsNeeded) return false;
        return (
          entity.data.inputsNeeded.find(
            (input) => input.id === this.inventory.item.id
          ) && !entity.isMarkedInput
        );
      });
    if (buildings.length > 0) {
      const result = buildings[Math.floor(Math.random() * buildings.length)];
      result.isMarkedInput = true;
      return result;
    }
    return null;
  }

  searchForOutput() {
    const buildings = this.game.currentScene.entities
      .filter((entity) => entity.type === "building")
      .filter(
        (entity) =>
          entity.outputSlot &&
          !entity.isMarkedOutput &&
          entity.outputSlot.item.name != "warrior"
      );
    if (buildings.length > 0) {
      const result = buildings[Math.floor(Math.random() * buildings.length)];
      result.isMarkedOutput = true;
      return result;
    }
    return null;
  }

  moveTowards(target) {
    const vector = {
      x: -(
        this.position.x +
        this.scale.width / 2 -
        (target.position.x + target.scale.width / 2)
      ),
      y: -(
        this.position.y +
        this.scale.height / 2 -
        (target.position.y + target.scale.height / 2)
      ),
    };
    this.direction = this.normalize(vector.x, vector.y);
    this.position.x += this.direction.x * this.speed;
    this.position.y += this.direction.y * this.speed;
    if (Math.sqrt(vector.x * vector.x + vector.y * vector.y) <= 80) {
      if (this.isInputMode) this.giveItem(this.buildingTarget);
      else this.takeItem(this.buildingTarget);
      this.buildingTarget = null;
    }
  }

  update() {
    if (this.buildingTarget) {
      this.moveTowards(this.buildingTarget);
    } else {
      if (this.inventory) {
        this.buildingTarget = this.searchForInput();
        if (this.buildingTarget) this.isInputMode = true;
      } else {
        this.buildingTarget = this.searchForOutput();
        if (this.buildingTarget) this.isInputMode = false;
      }
    }

    if (Math.abs(this.direction.x) > Math.abs(this.direction.y)) {
      if (this.direction.x > 0) this.frameY = 1;
      else this.frameY = 0;
    } else {
      if (this.direction.y >= 0) this.frameY = 3;
      else this.frameY = 2;
    }
  }

  draw(ctx) {
    let position = Math.floor(this.game.frames / this.staggerFrame) % 4;
    let frameX = 16 * position;
    ctx.drawImage(
      this.sprite,
      frameX,
      this.frameY * 16,
      16,
      16,
      this.position.x,
      this.position.y,
      64,
      64
    );

    if (this.inventory) {
			this.itemSprite.src = this.inventory.item.src;
      ctx.drawImage(
        this.itemSprite,
        0,
        0,
        16,
        16,
        this.position.x + this.scale.width / 2 - 30,
        this.position.y - 40,
        64,
        64
      );
    }
  }
}
