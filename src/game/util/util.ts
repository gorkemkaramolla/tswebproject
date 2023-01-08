const collisionCheck = (block: CollisionBlock, player) => {
    const playerTop = player.position.y + player.height;
    const blockTop = block.position.y;
    const blockBottom = block.position.y + block.height;
    const playerLeft = player.position.x;
    const playerRight = player.position.x + player.width;
    const blockLeft = block.position.x;
    const blockRight = block.position.x + block.width;
    //Playerin topu büyük eşit blockun topu
    //playerin topu küçük eşit blockun altı
    //playerSolu küçük eşit blockun sağı
    //playerinSağı küçük eşit blockun solu
    return (
        playerTop >= blockTop &&
        playerTop <= blockBottom &&
        playerLeft <= blockRight &&
        playerRight >= blockLeft
    );
};

const collisionCheckHorizontal = (block: CollisionBlock, player) => {
    const playerTop = player.position.y;
    const playerBottom = player.position.y + player.height;
    const blockTop = block.position.y;
    const blockBottom = block.position.y + block.height;
    const playerLeft = player.position.x;
    const playerRight = player.position.x + player.width;
    const blockLeft = block.position.x;
    const blockRight = block.position.x + block.width;
    //Playerin solu küçük eşit blockun solu
    //playerin solu büyük eşit blockun sağı
    //playerin topu küçük eşit blockun altı
    //playerin altı büyük eşit blockun topu
    return (
        playerLeft <= blockLeft &&
        playerRight >= blockRight &&
        playerTop <= blockBottom &&
        playerBottom >= blockTop
    );
};
