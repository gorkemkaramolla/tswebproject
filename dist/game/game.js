var canvas = (document.querySelector("canvas"));
var c = canvas.getContext("2d");
var collider2D = [];
for (var i = 0; i < colliderData.length; i += 36) {
    collider2D.push(colliderData.slice(i, i + 36));
}
var colliderBlocks = collider2D
    .flatMap(function (row, y) {
    return row.map(function (col, x) {
        if (col !== 0) {
            return new CollisionBlock({
                position: { x: x * 16, y: y * 16 }
            });
        }
    });
})
    .filter(function (block) { return block !== undefined; });
//GROUND DATA NOT COLLIDER
var ground2D = [];
ground2D = colliderData
    .map(function (_, i) { return (i % 36 === 0 ? groundData.slice(i, i + 36) : undefined); })
    .filter(function (arr) { return arr !== undefined; });
var groundBlocks = ground2D
    .flatMap(function (row, y) {
    return row.map(function (col, x) {
        if (col !== 0) {
            return new CollisionBlock({
                position: { x: x * 16, y: y * 16 }
            });
        }
    });
})
    .filter(function (block) { return block !== undefined; });
//EVENTS
//GAME UPDATE LOOP
canvas.focus();
canvas.width = 1024;
canvas.height = 576;
var scaledCanvas = { width: canvas.width / 4, height: canvas.height / 4 };
var gravity = 0.2;
var yAxes = 100;
var game = new GameFeatures();
var player = new Player({ x: 0, y: 0 });
var player2 = new Player({ x: 900, y: 0 });
var backGround = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: "./background.png"
});
function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.save();
    c.scale(4, 4);
    c.translate(0, -backGround.image.height + scaledCanvas.height);
    backGround.update();
    colliderBlocks.forEach(function (collider) {
        collider.update();
    });
    groundBlocks.forEach(function (groundTile) {
        groundTile.update();
    });
    c.restore();
    player.update("blue");
    player2.update("red");
    player.velocity.x = 0;
    if (game.keys.d.pressed)
        player.velocity.x = 1;
    if (game.keys.a.pressed)
        player.velocity.x = -1;
    if (game.keys.space.pressed) {
        if (game.keys.space.numberOfJumps < 2) {
            player.velocity.y = -9; // Jump
            game.keys.space.numberOfJumps++; // 0 dı 1 oldu zıpladı
        }
        game.keys.space.pressed = false; // Ignore further jump inputs
    }
}
gameLoop();
//# sourceMappingURL=game.js.map