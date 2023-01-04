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
                case "x": {
                    if (!keyIsPressed) {
                        if (attackCount < 3) {
                            if (player.playerAttack === false) attackCount++;
                        } else {
                            attackCount = 1;
                        }

                        player.playerAttack = true;
                        attack.currentTime = 0;
                        attack.play();
                        keyIsPressed = true;
                    }

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
                    e.preventDefault();
                    keyIsPressed = false;

                    break;
                }
            }
        });
    }
}
