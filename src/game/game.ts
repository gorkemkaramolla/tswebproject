const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
  document.querySelector("canvas")
);
const img = new Image();
img.src = "/Users/gorkemkaramolla/Documents/tswebproject/src/character.png";

const c: CanvasRenderingContext2D = canvas.getContext("2d");
//COLLIDER GROUND DATA 36 cols X 27 rows
const mergedArray = [];
for (let i = 0; i < colliderData.length; i++) {
  if (colliderData[i] !== 0) {
    mergedArray.push(colliderData[i]);
  } else if (groundData[i] !== 0) {
    mergedArray.push(groundData[i]);
  } else {
    mergedArray.push(0);
  }
}

let collider2D: number[][] = [];
collider2D = mergedArray
  .map((_, i) => (i % 36 === 0 ? mergedArray.slice(i, i + 36) : undefined))
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

//LOOPIN THROUGH THE 2D ARRAY ON CONDITION IF THERE IS A NON 0 VALUE THAT MEANS THERE IS A GROUND WITH A COLLIDER AND RETURN A NEW BLOCK

//GAME UPDATE LOOP
canvas.focus();
canvas.width = 1024;
canvas.height = 576;
const scaledCanvas = { width: canvas.width / 4, height: canvas.height / 4 };
const gravity: number = 0.05;

let yAxes: number = 100;
const game: GameFeatures = new GameFeatures();
//NEW PLAYER
const player = new Player({
  position: { x: 200, y: 200 },
  colliderBlocks,
  imgSrc: "./Sprites/Player/Idle.png",
  frameRate: 8,
  scale: 0.5,
});

const backGround: Sprite = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./background.png",
  frameRate: 1,
  scale: 1,
});
function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  if (player.hitbox.position.x < 1) {
    player.velocity.x = 0;
    player.position.x = player.position.x - player.hitbox.width;
  }
  if (game.keys.space.pressed) {
    if (game.keys.space.numberOfJumps < 2) {
      player.velocity.y = -1.8; // Jump
      game.keys.space.numberOfJumps++; // 0 dı 1 oldu zıpladı
    }
    game.keys.space.pressed = false; // Ignore further jump inputs
  }
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.scale(4, 4);
  c.translate(0, -backGround.image.height + scaledCanvas.height);
  backGround.update();
  colliderBlocks.forEach((collider) => {
    collider.update();
  });

  player.update();
  player.velocity.x = 0;
  if (game.keys.d.pressed) player.velocity.x = 1;
  if (game.keys.a.pressed) player.velocity.x = -1;
  c.restore();
}

gameLoop();
