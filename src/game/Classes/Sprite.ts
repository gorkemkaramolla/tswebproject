class Sprite {
    private position: { x: number; y: number };
    image: HTMLImageElement;
    constructor(params: {
        position: { x: number; y: number };
        imageSrc: string;
    }) {
        this.position = params.position;
        this.image = new Image();
        this.image.src = params.imageSrc;
    }
    draw() {
        if (!this.image) return;
        c.drawImage(this.image, this.position.x, this.position.y);
    }
    update() {
        this.draw();
    }
}
