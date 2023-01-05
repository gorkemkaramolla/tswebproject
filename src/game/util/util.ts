const collisionCheck = (block: CollisionBlock, player) => {
    return (
        player.position.y + player.height >= block.position.y &&
        player.position.y + player.height <= block.position.y + block.height &&
        player.position.x <= block.position.x + block.width &&
        player.position.x + player.width >= block.position.x
    );
};

const collisionCheckHorizontal = (block: CollisionBlock, player: Player) => {
    return (
        player.position.x <= block.position.x + block.width &&
        player.position.x + player.width >= block.position.x
    );
};
