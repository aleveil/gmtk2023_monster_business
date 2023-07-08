import { AbstractEntity } from "./AbstractEntity";

export class Button extends AbstractEntity {
  constructor(game, x, y, width, height, text, color, callback) {
    super(game, x, y, width, height);
    this.text = text;
    this.color = color;
    this.callback = callback;
    this.cooldown = 0;
    this.type = "button";
  }

  update() {
    if (this.game.mouse.isClicked && this.cooldown == 0 && this.collides(this.game.mouse)) {
      this.callback();
      this.cooldown = 5;
      this.game.mouse.isClicked = false;
    }
    if (this.cooldown > 0)
      this.cooldown--;
  }

  draw(ctx) {
    ctx.strokeStyle = "black";
    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.scale.width,
      this.scale.height
    );

    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.scale.width,
      this.scale.height
    );

    ctx.font = `${this.scale.width / 5}px sans-serif`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      this.text,
      this.position.x + this.scale.width / 2,
      this.position.y + this.scale.height / 2
    );
  }
}
