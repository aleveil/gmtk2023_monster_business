import { AbstractEntity } from "./AbstractEntity";
import { Enemy } from "./Enemy";
import { ProgressBar } from "./ProgressBar";

export class CastleTower extends AbstractEntity {
	anchorOffset = 150;
  enemiesAnchors = [
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

    this.type = "castle-tower";
    this.maxHealth = 500;
    this.health = this.maxHealth;
    this.progressBar = new ProgressBar(
      this.game,
      this.position.x,
      this.position.y - 40,
      this.scale.width,
      15,
      "red"
    );
    this.progressBar.value = this.health;
    this.progressBar.max = this.maxHealth;

		this.lastTime = 0;
    this.currentTime = 0;

		this.canSpawn = true;
		this.sprite = new Image();
		this.sprite.src = "/tower.png"
  }

  takeDamage(value) {
    this.health -= value;
    if (this.health < 0) {
      this.health = 0;
      this.game.win = true;
    }
  }

  spawnEnemies() {
    console.log("spawn");
    this.enemiesAnchors.forEach((anchor) => {
      this.game.currentScene.entities.push(
        new Enemy(
          this.game,
          this.position.x + anchor.x + 20,
          this.position.y + anchor.y + 20,
          50,
          50
        )
      );
    });
  }

	onEnemyKilled() {
		if (this.game.currentScene.entities.filter((entity) => entity.type === "enemy").length === 1) {
			this.canSpawn = true; 
			this.lastTime = this.currentTime;
		}
	}

  update(time) {
		this.currentTime = time;
		if (this.currentTime - this.lastTime >= 10 * 1000 && this.canSpawn) {
			this.lastTime = this.currentTime;
			this.spawnEnemies();
			this.canSpawn = false;
		}
  }

  draw(ctx) {
    ctx.drawImage(
      this.sprite,
      0,
      0,
      32,
      32,
      this.position.x,
      this.position.y,
      128,
      128
    );

    this.progressBar.value = this.health;
    this.progressBar.max = this.maxHealth;
    this.progressBar.draw(ctx);
  }
}
