import { AbstractEntity } from "./AbstractEntity";
import { ProgressBar } from "./ProgressBar";

export class Enemy extends AbstractEntity {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height);

    this.direction = { x: 0, y: 0 };
    this.speed = 5;
    this.sprite = new Image();
    this.sprite.src = "/human.png";
    this.frameY = 0;
    this.staggerFrame = 10;
    this.type = "enemy";
    this.target = null;
    this.combatMode = false;

    this.maxHealth = 20;
    this.health = this.maxHealth;
		this.isAlive = true;

    this.progressBar = new ProgressBar(
      this.game,
      this.position.x + this.scale.width / 2,
      this.position.y - 15,
      this.scale.width,
      5,
      "red"
    );
    this.progressBar.value = this.health;
    this.progressBar.max = this.maxHealth;

    this.strength = 3;
    this.attackCooldown = 1;
    this.currentTime = 0;
    this.lastTime = 0;

    this.isFighting = false;
  }

  die() {
		this.isAlive = false;
		this.game.gold += Math.floor(Math.random() * 9 + 1)
		const castle = this.game.currentScene.entities.find((entity) => entity.type === "castle-tower");
		castle.onEnemyKilled();
    const index = this.game.currentScene.entities.findIndex(
      (entity) => entity.id === this.id
    );
    this.game.currentScene.entities.splice(index, 1);
  }

  takeDamage(value) {
    this.health -= value;
    this.progressBar.value = this.health;
    if (this.health < 0) {
      this.health = 0;
		if (this.isAlive)
      this.die();
    }
  }

  attack(target) {
		console.log("ATTAK")
    target.takeDamage(this.strength);
  }

  getNearbyEnemies(maxDistance) {
    return this.game.currentScene.entities
      .filter((entity) => entity.type === "warrior")
      .filter((entity) => {
        const vector = {
          x: -(
            this.position.x +
            this.scale.width / 2 -
            (entity.position.x + entity.scale.width / 2)
          ),
          y: -(
            this.position.y +
            this.scale.height / 2 -
            (entity.position.y + entity.scale.height / 2)
          ),
        };
        return (
          Math.sqrt(vector.x * vector.x + vector.y * vector.y) <= maxDistance
        );
      });
  }

  update(time) {
    if (this.isFighting) {
      if (!this.target) this.isFighting = false;
      this.currentTime = time;
      if (this.currentTime - this.lastTime >= this.attackCooldown * 1000) {
        this.lastTime = this.currentTime;
        this.attack(this.target);
      }
      return;
    }
    let enemies = [];
    enemies = this.getNearbyEnemies(300);

    if (enemies.length > 0) {
      this.target = enemies[Math.floor(Math.random * enemies.length)];
			const isFighting = true;
    }

    if (Math.abs(this.direction.x) > Math.abs(this.direction.y)) {
      if (this.direction.x > 0) this.frameY = 3;
      else this.frameY = 2;
    } else {
      if (this.direction.y >= 0) this.frameY = 0;
      else this.frameY = 1;
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

    this.progressBar.position.x = this.position.x;
    this.progressBar.position.y = this.position.y - 10;
    this.progressBar.draw(ctx);
  }
}
