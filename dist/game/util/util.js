var collisionCheck = function (block, player) {
    var playerTop = player.position.y + player.height;
    var blockTop = block.position.y;
    var blockBottom = block.position.y + block.height;
    var playerLeft = player.position.x;
    var playerRight = player.position.x + player.width;
    var blockLeft = block.position.x;
    var blockRight = block.position.x + block.width;
    //Playerin topu büyük eşit blockun topu
    //playerin topu küçük eşit blockun altı
    //playerSolu küçük eşit blockun sağı
    //playerinSağı küçük eşit blockun solu
    return (playerTop >= blockTop &&
        playerTop <= blockBottom &&
        playerLeft <= blockRight &&
        playerRight >= blockLeft);
};
var collisionCheckHorizontal = function (block, player) {
    var playerTop = player.position.y;
    var playerBottom = player.position.y + player.height;
    var blockTop = block.position.y;
    var blockBottom = block.position.y + block.height;
    var playerLeft = player.position.x;
    var playerRight = player.position.x + player.width;
    var blockLeft = block.position.x;
    var blockRight = block.position.x + block.width;
    //Playerin solu küçük eşit blockun solu
    //playerin solu büyük eşit blockun sağı
    //playerin topu küçük eşit blockun altı
    //playerin altı büyük eşit blockun topu
    return (playerLeft <= blockLeft &&
        playerRight >= blockRight &&
        playerTop <= blockBottom &&
        playerBottom >= blockTop);
};
//# sourceMappingURL=util.js.map