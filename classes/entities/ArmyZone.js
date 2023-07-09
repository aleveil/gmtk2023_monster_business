import { AbstractEntity } from "./AbstractEntity";
import { ProgressBar } from "./ProgressBar";

export class ArmyZone extends AbstractEntity {
  anchorOffset = 300;
  spawnAnchors = [
    { x: -this.anchorOffset, y: -this.anchorOffset },
    { x: -this.anchorOffset, y: 0 },
    { x: -this.anchorOffset, y: this.anchorOffset },
    { x: 0, y: -this.anchorOffset },
    { x: 0, y: this.anchorOffset },
    { x: this.anchorOffset, y: -this.anchorOffset },
    { x: this.anchorOffset, y: 0 },
    { x: this.anchorOffset, y: this.anchorOffset },
  ];

  constructor(game, x, y, width, height) {
    super(game, x, y, width, height);

    this.type = "army-zone";
    this.warriors = [];
    this.maxQuantity = 1;

    this.progressBar = new ProgressBar(
      this.game,
      this.position.x + 15,
      this.position.y + this.scale.height + 50,
      100,
      10,
      "yellow"
    );
    this.progressBar.value = this.warriors.length;
    this.progressBar.max = this.maxQuantity;

		this.staggerFrame = 15
		this.frameY = 0;
    this.sprite = new Image();
    this.sprite.src = "/portal.png";
  }

  launchWave() {
    const castle = this.game.currentScene.entities.find(
      (entity) => entity.type === "castle-tower"
    );
    while (this.warriors.length > 0) {
      const [warrior] = this.warriors.pop();
      const rand = Math.floor(Math.random() * this.spawnAnchors.length);
      warrior.position.x = castle.position.x + this.spawnAnchors[rand].x;
      warrior.position.y = castle.position.y + this.spawnAnchors[rand].y;
      warrior.combatMode = true;

      this.game.currentScene.entities.push(warrior);
    }
  }

  addWarrior(warrior) {
    const warriorIndex = this.game.currentScene.entities.findIndex(
      (entities) => entities.id === warrior.id
    );
    this.warriors.push(this.game.currentScene.entities.splice(warriorIndex, 1));
    this.progressBar.value = this.warriors.length;
  }

  update(time) {
    if (this.warriors.length >= this.maxQuantity) this.launchWave();
  }

  draw(ctx) {
    let position = Math.floor(this.game.frames / this.staggerFrame) % 2;
    let frameX = 32 * position;
    ctx.drawImage(
      this.sprite,
      frameX,
      this.frameY * 32,
      32,
      32,
      this.position.x,
      this.position.y,
      128,
      128
    );

    this.progressBar.draw(ctx);
  }
}
