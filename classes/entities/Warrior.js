import { AbstractEntity } from "./AbstractEntity";
import { ProgressBar } from "./ProgressBar";

export class Warrior extends AbstractEntity {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height);

    this.direction = { x: 0, y: 0 };
    this.speed = 2.5;
    this.sprite = new Image();
    this.sprite.src = "/goblinSprite-Sheet.png";
    this.frameY = 0;
    this.staggerFrame = 10;
    this.type = "warrior";
    this.target = null;
    this.combatMode = false;

		this.isAlive = true;
    this.maxHealth = 20;
    this.health = this.maxHealth;
		this.progressBar = new ProgressBar(this.game, this.position.x + this.scale.width / 2, this.position.y - 15, this.scale.width, 5, "red");
		this.progressBar.value = this.health;
		this.progressBar.max = this.maxHealth;

    this.strength = 3;
    this.attackCooldown = 1;
		this.currentTime = 0;
		this.lastTime = 0;

    this.isFighting = false;
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
      if (this.target.type === "army-zone") {
        this.target.addWarrior(this);
        this.target = null;
      }
      else if (this.target.type === "enemy" || this.target.type === "castle-tower") {
        this.isFighting = true;
      }
    }
  }

  die() {
		this.isAlive = false;
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
    target.takeDamage(this.strength);
		if(target.type === "castle-tower")
			this.takeDamage(10);
		if (target.health <= 0)
			this.target = null;
  }

  getNearbyEnemies(maxDistance) {
    return this.game.currentScene.entities
      .filter((entity) => entity.type === "enemy")
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

    if (this.combatMode) {
      let enemies = [];
      enemies = this.getNearbyEnemies(250);
      if (enemies.length > 0) {
        this.target = enemies[Math.floor(Math.random() * enemies.length)];
      } else
        this.target = this.game.currentScene.entities.find(
          (entity) => entity.type === "castle-tower"
        );
    } else {
      this.target = this.game.currentScene.entities.find(
        (entity) => entity.type === "army-zone"
      );
    }

    if (this.target) {
      this.moveTowards(this.target);

      if (Math.abs(this.direction.x) > Math.abs(this.direction.y)) {
        if (this.direction.x > 0) this.frameY = 1;
        else this.frameY = 0;
      } else {
        if (this.direction.y >= 0) this.frameY = 3;
        else this.frameY = 2;
      }
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
