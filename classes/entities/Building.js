import { AbstractEntity } from "./AbstractEntity";
import { ProgressBar } from "./ProgressBar";
import { Warrior } from "./Warrior";

export class Building extends AbstractEntity {
  constructor(game, x, y, width, height, data) {
    super(game, x, y, width, height);

    this.data = data;
    this.type = "building";
    this.inputSlots = [];
    this.outputSlot = null;

    this.lastTime = 0;
    this.currentTime = 0;
    this.isMarkedOutput = false;
    this.isMarkedInput = false;
		this.sprite = new Image();
		this.sprite.src = this.data.src;

		this.progressBar = new ProgressBar(this.game, this.position.x + 15, this.position.y + this.scale.height + 50, 100, 10, "yellow");
  }

  resetTimer() {
    this.lastTime = this.currentTime;
  }

  takeInput(item) {
    const same = this.inputSlots.findIndex(
      (input) => input.item.id === item.item.id
    );
    if (same >= 0) this.inputSlots[same].quantity += item.quantity;
    else this.inputSlots.push(item);
    this.isMarkedInput = false;
  }

  giveOutput() {
    const item = this.outputSlot;
    this.resetTimer();
    this.outputSlot = null;
    this.isMarkedOutput = false;
    return item;
  }

  checkCraftRequirement() {
    if (this.outputSlot) return false; // no empty output
    if (!this.data.inputsNeeded) return true; // no input needed

    let isValid = true;
    this.data.inputsNeeded.forEach((needed, iNeeded) => {
      const current = this.inputSlots.find(
        (input) => input.item.id === needed.id
      );
      // check id
      if (!current) {
        isValid = false;
        return;
      }
      // check quantity
      if (current.quantity < this.data.inputsQuantityNeeded[iNeeded]) {
        isValid = false;
        return;
      }
    });
    return isValid;
  }

  craft() {
    if (this.data.inputsNeeded) {
      this.data.inputsNeeded.forEach((needed, iNeeded) => {
        const current = this.inputSlots.find(
          (input) => input.item.id === needed.id
        );
        current.quantity -= this.data.inputsQuantityNeeded[iNeeded];
      });
    }
    if (this.data.outputItem.name === "warrior") {
      this.game.currentScene.entities.push(
        new Warrior(this.game, this.position.x, this.position.y, 50, 50)
      );
    } else {
      this.outputSlot = {
        item: this.data.outputItem,
        quantity: this.data.outputQuantity,
      };
    }
  }

  update(time) {
    this.currentTime = time;
    if (this.checkCraftRequirement()) {
      if (this.currentTime - this.lastTime >= this.data.timeToProduce * 1000) {
        this.resetTimer();
        this.craft();
      }
			else {
				this.progressBar.value = this.currentTime - this.lastTime;
				this.progressBar.max = this.data.timeToProduce * 1000;
			}
    }
		else {
			this.resetTimer();
		}
  }

  draw(ctx) {
    // ctx.fillStyle = this.data.color;
    // ctx.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this.scale.width,
    //   this.scale.height
    // );

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

		this.progressBar.draw(ctx)
  }
}
