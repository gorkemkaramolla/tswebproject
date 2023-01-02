class CollisionBlock {
  position: { x: number; y: number };
  width: number = 16;
  height: number = 16;
  constructor(params: { position: { x: number; y: number } }) {
    this.position = params.position;
  }
  draw() {
    c.fillStyle = `transparent`;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
  }
}
