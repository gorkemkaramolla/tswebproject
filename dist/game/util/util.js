var collisionCheck = function (block, player) {
    return (player.position.y + player.height >= block.position.y &&
        player.position.y + player.height <= block.position.y + block.height &&
        player.position.x <= block.position.x + block.width &&
        player.position.x + player.width >= block.position.x);
};
var collisionCheckHorizontal = function (block, player) {
    return (player.position.x <= block.position.x + block.width &&
        player.position.x + player.width >= block.position.x);
};
//# sourceMappingURL=util.js.map