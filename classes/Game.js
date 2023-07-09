import { MainScene } from "./scenes/MainScene";
import { MouseHandler } from "./MouseHandler";
import { EndScene } from "./scenes/EndScene";

export class Game {
  items = {
    food: {
      id: 0,
      name: "food",
      src: "/Chicken.png",
    },
    iron: {
      id: 1,
      name: "iron",
      src: "/Iron.png",
    },
    monster: {
      id: 2,
      name: "monster",
      src: "/Egg.png",
    },
    equipment: {
      id: 3,
      name: "equipment",
      src: "/Armor.png",
    },
    warrior: {
      id: 4,
      name: "warrior",
      src: "/Egg.png",
    },
  };

  buildings = {
    farm: {
      id: 0,
      name: "farm",
      inputsNeeded: null,
      inputsQuantityNeeded: null,
      outputItem: this.items.food,
      outputQuantity: 1,
      timeToProduce: 3,
      src: "/farm.png",
    },
    mine: {
      id: 1,
      name: "mine",
      inputsNeeded: null,
      inputsQuantityNeeded: null,
      outputItem: this.items.iron,
      outputQuantity: 1,
      timeToProduce: 2,
      src: "/cave.png",
    },
    hut: {
      id: 2,
      name: "hut",
      inputsNeeded: [this.items.food],
      inputsQuantityNeeded: [3],
      outputItem: this.items.monster,
      outputQuantity: 1,
      timeToProduce: 2,
      src: "/hut.png",
    },
    forge: {
      id: 3,
      name: "forge",
      inputsNeeded: [this.items.iron],
      inputsQuantityNeeded: [3],
      outputItem: this.items.equipment,
      outputQuantity: 1,
      timeToProduce: 4,
      src: "/forge.png",
    },
    barracks: {
      id: 4,
      name: "barracks",
      inputsNeeded: [this.items.equipment, this.items.monster],
      inputsQuantityNeeded: [1, 1],
      outputItem: this.items.warrior,
      outputQuantity: 1,
      timeToProduce: 5,
      src: "/barracks.png",
    },
  };

  scenes = {
    main: new MainScene(this),
		end: new EndScene(this),
  };

  currentScene = this.scenes.main;

  constructor(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.mouse = new MouseHandler(canvas);
    this.frames = 0;

    this.win = false;
		this.gold = 0;
  }

  update(time) {
    this.currentScene.update(time);
    this.frames++;

    if (this.win) {
      this.currentScene = this.scenes.end;
    }
  }

  draw(ctx) {
    this.currentScene.draw(ctx);
  }
}
