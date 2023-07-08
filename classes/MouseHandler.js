export class MouseHandler {
  constructor(canvas) {
    this.isClicked = false;
    this.position = { x: 0, y: 0 };
    this.scale = { width: 0, height: 0 };

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const elementRelativeX = e.clientX - rect.left;
      const elementRelativeY = e.clientY - rect.top;
      this.position.x = (elementRelativeX * canvas.width) / rect.width;
      this.position.y = (elementRelativeY * canvas.height) / rect.height;
    });

    canvas.addEventListener("mousedown", (e) => {
      if (e.button === 0) this.isClicked = true;
    });

    canvas.addEventListener("mouseup", (e) => {
      if (e.button === 0) this.isClicked = false;
    });
  }
}
