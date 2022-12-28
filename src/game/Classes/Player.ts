class Player {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    attributes: { width: number; height: number };
    constructor(
        position: { x: number; y: number },
        attributes?: { width: number; height: number }
    ) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1,
        };

        this.attributes = {
            width: attributes?.width || 50,
            height: attributes?.height || 75,
        };
    }
    draw(color: string) {
        c.fillStyle = color;
        c.fillRect(
            this.position.x,
            this.position.y,
            this.attributes.width,
            this.attributes.height
        );
    }
    update(color: string) {
        this.draw(color);
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if (
            this.position.y + this.attributes.height + this.velocity.y <
            canvas.height
        ) {
            this.velocity.y += gravity;
            console.log(this.velocity.y);
        } else {
            this.velocity.y = 0;
        }
    }
}
