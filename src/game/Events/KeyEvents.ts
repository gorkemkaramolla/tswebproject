let keyIsPressed = false;

function keyEvents() {
    if (gameLooping) {
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
                case "Shift": {
                    game.keys.shift.pressed = true;
                    player.lastDirection === "right"
                        ? (player.position.x += 50)
                        : (player.position.x -= 50);
                    break;
                }
                case "x": {
                    if (player.playerAttack === false) {
                        console.log("true oldum");
                        player.playerAttack = true;
                        if (attackCount < 3) {
                            attackCount++;
                        } else {
                            attackCount = 1;
                        }
                        player.swapSprite("Attack1");
                        attack.currentTime = 0;
                        attack.play();
                        keyIsPressed = true;
                    }

                    if (
                        player2.hitbox.position.x - 50 <
                        player.hitbox.position.x + player.hitbox.width
                    ) {
                        player2.health -= 100;
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
                    break;
                }
            }
        });
    }
}
