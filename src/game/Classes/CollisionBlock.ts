class CollisionBlock {
    private position: { x: number; y: number };
    private width: number = 16;
    private height: number = 16;
    constructor(params: { position: { x: number; y: number } }) {
        this.position = params.position;
    }
    draw() {
        c.fillStyle = "rgba(255,0,0,0.5)";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
    }
}
