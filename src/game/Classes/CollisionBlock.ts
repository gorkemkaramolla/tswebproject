class CollisionBlock {
    position: { x: number; y: number };
    width: number = 32;
    groundImage: HTMLImageElement;
    height: number = 32;
    constructor(params: { position: { x: number; y: number } }) {
        this.position = params.position;
        this.groundImage = new Image();
        this.groundImage.src = "../ground.png";
    }
    draw() {
        c.drawImage(
            this.groundImage,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        // c.fillStyle = `red`;
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
    }
}
