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
            if (game.keys.space.numberOfJumps === 0 ||
                player.velocity.y === 0) {
                // Reset the number of jumps if the player is on the ground
                game.keys.space.numberOfJumps = 0;
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
    if (player.position.x + player.attributes.width > canvas.width) {
        player.position.x = canvas.width - player.attributes.width;
    }
    if (player.position.x < 0) {
        player.position.x = 0;
    }
});
//# sourceMappingURL=KeyEvents.js.map