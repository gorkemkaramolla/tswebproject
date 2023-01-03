canvas.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "d": {
            game.keys.d.pressed = true;
            break;
        }
        case "a": {
            game.keys.a.pressed = true;

            break;
        }
        case " ": {
            game.keys.space.pressed = true;
            if (
                game.keys.space.numberOfJumps === 0 ||
                player.velocity.y < 0.02
            ) {
                // Reset the number of jumps if the player is on the ground
            }
            break;
        }
        case "x": {
            player.playerAttack = true;
            if (
                player2.hitbox.position.x - 20 <
                player.hitbox.position.x + player.hitbox.width
            ) {
                player2.health -= 10;
                console.log(player2.health);
            }
            break;
        }
    }

    if (player.hitbox.position.x + player.hitbox.width > canvas.width) {
        player.hitbox.position.x = canvas.width - player.hitbox.width;
    }
});
canvas.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "d": {
            game.keys.d.pressed = false;
            break;
        }
        case "a": {
            game.keys.a.pressed = false;

            break;
        }
        case " ": {
        }
        case "x": {
            player.playerAttack = false;

            break;
        }
    }
});
