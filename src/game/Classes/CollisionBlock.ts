/*This class represent Collision Blocks layout
a collision block is a single square in game's grid system
position is shows us a coordinate system x and y numbers is the the start point of this block
*/
class CollisionBlock {
    position: { x: number; y: number };
    width: number = 32;
    groundImage: HTMLImageElement;
    imageSrc: string;
    height: number = 32;

    constructor(params: {
        position: { x: number; y: number };
        imageSrc: string;
    }) {
        this.imageSrc = params.imageSrc;
        this.position = params.position;
        this.groundImage = new Image();
        this.groundImage.src = `../assets/${this.imageSrc}`;
        this.width = this.groundImage.width;
        this.height = this.groundImage.height;
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
