class Sprite {
    position: { x: number; y: number };
    image: HTMLImageElement;
    width: number;
    height: number;
    frameRate?: number;
    imageSrc: string;
    currentFrame: number;
    imageLoaded: boolean;
    frameBuffer: number;
    elapsedFrames: number;
    scale: number;
    hitbox: {};
    constructor(params: {
        position: { x: number; y: number };
        scale: number;
        imageSrc: string;
        frameRate: number;
    }) {
        this.imageLoaded = false;
        this.frameRate = params.frameRate;
        this.imageSrc = params.imageSrc;
        this.currentFrame = 0;
        this.frameBuffer = 24;
        this.elapsedFrames = 0;
        this.scale = params.scale;
        this.position = params.position;
        this.image = new Image();
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale;
            this.height = this.image.height * this.scale;
            this.imageLoaded = true;
        };
        this.image.src = params.imageSrc;
        this.frameRate = params.frameRate;
        this.hitbox = {
            position: {
                x: this.position.x + 100,
                y: this.position.y + 56,
            },
            width: 134,
            height: 135,
        };
    }
    draw() {
        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0,
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
        };
        if (!this.image) return;

        c.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
    update() {
        this.draw();
    }
}
