import { MainScene } from "./scenes/MainScene";
import { BouncingScene } from "./scenes/BouncingScene";
import { EmptyScene } from "./scenes/EmptyScene";
import { MouseHandler } from "./MouseHandler";

export class Game {
	
	items = {
		food: {
			id: 0,
			name: "food",
			color: "yellow",
		},
		iron: {
			id: 1,
			name: "iron",
			color: "gray",
		},
		monster: {
			id: 2,
			name: "monster",
			color: "darkgreen",
		},
		equipment: {
			id: 3,
			name: "equipment",
			color: "black",
		},
		warrior: {
			id: 4,
			name: "warrior",
			color: "red",
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
			timeToProduce: 5,
			color: "yellow",
		},
		mine: {
			id: 1,
			name: "mine",
			inputsNeeded: null,
			inputsQuantityNeeded: null,
			outputItem: this.items.iron,
			outputQuantity: 1,
			timeToProduce: 5,
			color: "gray",
		},
		hut: {
			id: 2,
			name: "hut",
			inputsNeeded: [this.items.food],
			inputsQuantityNeeded: [5],
			outputItem: this.items.monster,
			outputQuantity: 1,
			timeToProduce: 5,
			color: "brown",
		},
		forge: {
			id: 3,
			name: "forge",
			inputsNeeded: [this.items.iron],
			inputsQuantityNeeded: [5],
			outputItem: this.items.equipment,
			outputQuantity: 1,
			timeToProduce: 5,
			color: "darkgray",
		},
		barracks: {
			id: 4,
			name: "barracks",
			inputsNeeded: [this.items.equipment, this.items.monster],
			inputsQuantityNeeded: [1, 1],
			outputItem: this.items.equipment,
			outputQuantity: 1,
			timeToProduce: 5,
			color: "red",
		},
	};

  scenes = {
    main: new MainScene(this),
    bouncing: new BouncingScene(this),
    empty: new EmptyScene(this),
  };

  currentScene = this.scenes.main;

  constructor(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.mouse = new MouseHandler(canvas);
		this.frames = 0;
  }

  update() {
    this.currentScene.update();
		this.frames++;
  }

  draw(ctx) {
    this.currentScene.draw(ctx);
  }
}
