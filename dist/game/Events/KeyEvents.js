canvas.addEventListener("keydown", function (e) {
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
            console.log(game.keys.space.numberOfJumps);
            console.log(player.velocity.y);
            if (game.keys.space.numberOfJumps === 0 || player.velocity.y < 0.02) {
                // Reset the number of jumps if the player is on the ground
            }
            break;
        }
        case "Shift": {
            break;
        }
    }
    console.log(player.hitbox.position.x);
    if (player.hitbox.position.x + player.hitbox.width > canvas.width) {
        player.hitbox.position.x = canvas.width - player.hitbox.width;
    }
});
canvas.addEventListener("keyup", function (e) {
    console.log(e.key);
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
    }
});
//# sourceMappingURL=KeyEvents.js.map