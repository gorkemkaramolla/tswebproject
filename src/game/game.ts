const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.querySelector("canvas")
);
const c: CanvasRenderingContext2D = canvas.getContext("2d");
//COLLIDER GROUND DATA 36 cols X 27 rows
let collider2D: number[][] = [];
collider2D = colliderData
    .map((_, i) => (i % 36 === 0 ? colliderData.slice(i, i + 36) : undefined))
    .filter((arr) => arr !== undefined);
const colliderBlocks = collider2D
    .flatMap((row, y) =>
        row.map((col, x) => {
            if (col !== 0) {
                return new CollisionBlock({
                    position: { x: x * 16, y: y * 16 },
                });
            }
        })
    )
    .filter((block) => block !== undefined);

//NON COLLIDER GROUND DATA 36 columns X 27 rows
let ground2D: number[][] = [];
ground2D = colliderData
    .map((_, i) => (i % 36 === 0 ? groundData.slice(i, i + 36) : undefined))
    .filter((arr) => arr !== undefined);

//LOOPIN THROUGH THE 2D ARRAY ON CONDITION IF THERE IS A NON 0 VALUE THAT MEANS THERE IS A GROUND WITH A COLLIDER AND RETURN A NEW BLOCK
const groundBlocks = ground2D
    .flatMap((row, y) =>
        row.map((col, x) => {
            if (col !== 0) {
                return new CollisionBlock({
                    position: { x: x * 16, y: y * 16 },
                });
            }
        })
    )
    .filter((block) => block !== undefined);

//GAME UPDATE LOOP
canvas.focus();
canvas.width = 1024;
canvas.height = 576;
const scaledCanvas = { width: canvas.width / 4, height: canvas.height / 4 };
const gravity: number = 0.2;

let yAxes: number = 100;
const game: GameFeatures = new GameFeatures();
const player: Player = new Player({ x: 0, y: 0 });
const player2: Player = new Player({ x: 900, y: 0 });
const backGround: Sprite = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: "./background.png",
});
function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.save();
    c.scale(4, 4);
    c.translate(0, -backGround.image.height + scaledCanvas.height);
    backGround.update();
    colliderBlocks.forEach((collider) => {
        collider.update();
    });
    groundBlocks.forEach((groundTile) => {
        groundTile.update();
    });
    c.restore();

    player.update("blue");
    player2.update("red");
    player.velocity.x = 0;
    if (game.keys.d.pressed) player.velocity.x = 1;
    if (game.keys.a.pressed) player.velocity.x = -1;

    if (game.keys.space.pressed) {
        if (game.keys.space.numberOfJumps < 2) {
            player.velocity.y = -9; // Jump
            game.keys.space.numberOfJumps++; // 0 dı 1 oldu zıpladı
        }
        game.keys.space.pressed = false; // Ignore further jump inputs
    }
}

gameLoop();
