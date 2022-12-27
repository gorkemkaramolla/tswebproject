const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.querySelector("canvas")
);
const c: CanvasRenderingContext2D = canvas.getContext("2d");
const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    space: {
        pressed: false,
        numberOfJumps: 0,
    },
};
canvas.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "d": {
            keys.d.pressed = true;
            break;
        }
        case "a": {
            keys.a.pressed = true;

            break;
        }
        case " ": {
            keys.space.pressed = true;

            if (keys.space.numberOfJumps === 0 || player.velocity.y === 0) {
                // Reset the number of jumps if the player is on the ground
                keys.space.numberOfJumps = 0;
            }
            break;
        }
        case "Shift": {
            break;
        }
    }

    if (player.position.x + player.attributes.width > canvas.width) {
        player.position.x = canvas.width - player.attributes.width;
    }
    if (player.position.x < 0) {
        player.position.x = 0;
    }
});
canvas.addEventListener("keyup", (e) => {
    console.log(e.key);
    switch (e.key) {
        case "d": {
            keys.d.pressed = false;
            break;
        }
        case "a": {
            keys.a.pressed = false;

            break;
        }
        case " ": {
        }
    }

    if (player.position.x + player.attributes.width > canvas.width) {
        player.position.x = canvas.width - player.attributes.width;
    }
    if (player.position.x < 0) {
        player.position.x = 0;
    }
});
canvas.focus();
canvas.width = 1024;
canvas.height = 576;
const gravity: number = 0.2;
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
let yAxes: number = 100;

const player: Player = new Player({ x: 0, y: 0 });
const player2: Player = new Player({ x: 900, y: 0 });

function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update("blue");
    player2.update("red");
    player.velocity.x = 0;
    if (keys.d.pressed) player.velocity.x = 1;
    if (keys.a.pressed) player.velocity.x = -1;

    if (keys.space.pressed) {
        if (keys.space.numberOfJumps < 2) {
            player.velocity.y = -9; // Jump
            keys.space.numberOfJumps++; // 0 dı 1 oldu zıpladı
        }
        keys.space.pressed = false; // Ignore further jump inputs
    }
}

gameLoop();
