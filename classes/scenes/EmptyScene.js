
export class EmptyScene {
  constructor(game) {
    this.game = game;
    this.entities = [];
  }

  update() {
    this.entities.forEach((entity) => {
      entity.update();
    });
  }

  draw(ctx) {
    this.entities.forEach((entity) => {
      entity.draw(ctx);
    });
  }
}
