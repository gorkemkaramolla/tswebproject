var canvas = (document.querySelector("canvas"));
var c = canvas.getContext("2d");
//COLLIDER GROUND DATA 36 cols X 27 rows
var gameLooping = false;
var attackCount = 0;
var init = function () {
    gameLooping = false;
    canvas.focus();
    canvas.width = 1024;
    canvas.height = 576;
    animationFrameID = 0;
    colliderBlocks = newColliderData
        .flatMap(function (row, y) {
        return row.map(function (col, x) {
            if (col !== -1) {
                return new CollisionBlock({
                    position: { x: x * 32, y: y * 32 },
                    imageSrc: images[col]
                });
            }
        });
    })
        .filter(function (block) { return block !== undefined; });
    //NON COLLIDER GROUND DATA 36 columns X 27 rows
    //LOOPIN THROUGH THE 2D ARRAY ON CONDITION IF THERE IS A NON 0 VALUE THAT MEANS THERE IS A GROUND WITH A COLLIDER AND RETURN A NEW BLOCK
    //GAME UPDATE LOOP
    gravity = 0.05;
    yAxes = 100;
    game = new GameFeatures();
    //NEW PLAYER
    player = new Player({
        position: { x: 10, y: canvas.height - 166 },
        colliderBlocks: colliderBlocks,
        scale: 1,
        imageSrc: "./Sprites/Player/Idle.png",
        frameRate: 8,
        animations: {
            Idle: {
                imageSrc: "./Sprites/Player/Idle.png",
                frameRate: 8,
                frameBuffer: 16
            },
            IdleLeft: {
                imageSrc: "./Sprites/Player/IdleLeft.png",
                frameRate: 8,
                frameBuffer: 16
            },
            Run: {
                imageSrc: "./Sprites/Player/Run.png",
                frameRate: 8,
                frameBuffer: 16
            },
            RunLeft: {
                imageSrc: "./Sprites/Player/RunLeft.png",
                frameRate: 8,
                frameBuffer: 16
            },
            Jump: {
                imageSrc: "./Sprites/Player/Jump.png",
                frameRate: 2,
                frameBuffer: 6
            },
            Fall: {
                imageSrc: "./Sprites/Player/Fall.png",
                frameRate: 2,
                frameBuffer: 6
            },
            JumpLeft: {
                imageSrc: "./Sprites/Player/JumpLeft.png",
                frameRate: 2,
                frameBuffer: 6
            },
            FallLeft: {
                imageSrc: "./Sprites/Player/FallLeft.png",
                frameRate: 2,
                frameBuffer: 6
            },
            Attack1: {
                imageSrc: "./Sprites/Player/Attack1.png",
                frameRate: 4,
                frameBuffer: 12
            },
            Attack2: {
                imageSrc: "./Sprites/Player/Attack2.png",
                frameRate: 4,
                frameBuffer: 12
            },
            Attack3: {
                imageSrc: "./Sprites/Player/Attack3.png",
                frameRate: 4,
                frameBuffer: 12
            }
        },
        updateHitBoxValue: {
            width: 24,
            height: 50,
            additionX: 70,
            additionY: 55
        }
    });
    player2 = new Player({
        position: { x: 686, y: canvas.height - 250 },
        colliderBlocks: colliderBlocks,
        scale: 1.5,
        imageSrc: "./Sprites/Enemy/Idle.png",
        frameRate: 8,
        animations: {
            Idle: {
                imageSrc: "./Sprites/Enemy/Idle.png",
                frameRate: 8,
                frameBuffer: 16
            },
            IdleLeft: {
                imageSrc: "./Sprites/Player/IdleLeft.png",
                frameRate: 8,
                frameBuffer: 16
            },
            Run: {
                imageSrc: "./Sprites/Enemy/Run.png",
                frameRate: 8,
                frameBuffer: 16
            },
            RunLeft: {
                imageSrc: "./Sprites/Enemy/RunLeft.png",
                frameRate: 8,
                frameBuffer: 16
            },
            Jump: {
                imageSrc: "./Sprites/Player/Jump.png",
                frameRate: 2,
                frameBuffer: 6
            },
            Fall: {
                imageSrc: "./Sprites/Player/Fall.png",
                frameRate: 2,
                frameBuffer: 6
            },
            JumpLeft: {
                imageSrc: "./Sprites/Player/JumpLeft.png",
                frameRate: 2,
                frameBuffer: 6
            },
            FallLeft: {
                imageSrc: "./Sprites/Player/FallLeft.png",
                frameRate: 2,
                frameBuffer: 6
            },
            Attack1: {
                imageSrc: "./Sprites/Player/Attack1.png",
                frameRate: 4,
                frameBuffer: 16
            },
            Death: {
                imageSrc: "./Sprites/Enemy/Death.png",
                frameRate: 6,
                frameBuffer: 16
            }
        },
        updateHitBoxValue: {
            width: 65,
            height: 75,
            additionX: 80,
            additionY: 68
        }
    });
    currentframes = 0;
    gameOver = false;
};
var animationFrameID = 0;
var colliderBlocks = newColliderData
    .flatMap(function (row, y) {
    return row.map(function (col, x) {
        if (col !== -1) {
            return new CollisionBlock({
                position: { x: x * 32, y: y * 32 },
                imageSrc: images[col]
            });
        }
    });
})
    .filter(function (block) { return block !== undefined; });
//NON COLLIDER GROUND DATA 36 columns X 27 rows
//LOOPIN THROUGH THE 2D ARRAY ON CONDITION IF THERE IS A NON 0 VALUE THAT MEANS THERE IS A GROUND WITH A COLLIDER AND RETURN A NEW BLOCK
//GAME UPDATE LOOP
canvas.focus();
canvas.width = 1024;
canvas.height = 576;
var gravity = 0.05;
var yAxes = 100;
var game = new GameFeatures();
//NEW PLAYER
var player = new Player({
    position: { x: 10, y: canvas.height - 166 },
    colliderBlocks: colliderBlocks,
    scale: 1,
    imageSrc: "./Sprites/Player/Idle.png",
    frameRate: 8,
    animations: {
        Idle: {
            imageSrc: "./Sprites/Player/Idle.png",
            frameRate: 8,
            frameBuffer: 16
        },
        IdleLeft: {
            imageSrc: "./Sprites/Player/IdleLeft.png",
            frameRate: 8,
            frameBuffer: 16
        },
        Run: {
            imageSrc: "./Sprites/Player/Run.png",
            frameRate: 8,
            frameBuffer: 16
        },
        RunLeft: {
            imageSrc: "./Sprites/Player/RunLeft.png",
            frameRate: 8,
            frameBuffer: 16
        },
        Jump: {
            imageSrc: "./Sprites/Player/Jump.png",
            frameRate: 2,
            frameBuffer: 6
        },
        Fall: {
            imageSrc: "./Sprites/Player/Fall.png",
            frameRate: 2,
            frameBuffer: 6
        },
        JumpLeft: {
            imageSrc: "./Sprites/Player/JumpLeft.png",
            frameRate: 2,
            frameBuffer: 6
        },
        FallLeft: {
            imageSrc: "./Sprites/Player/FallLeft.png",
            frameRate: 2,
            frameBuffer: 6
        },
        Attack1: {
            imageSrc: "./Sprites/Player/Attack1.png",
            frameRate: 4,
            frameBuffer: 12
        },
        Attack2: {
            imageSrc: "./Sprites/Player/Attack2.png",
            frameRate: 4,
            frameBuffer: 12
        },
        Attack3: {
            imageSrc: "./Sprites/Player/Attack3.png",
            frameRate: 4,
            frameBuffer: 12
        }
    },
    updateHitBoxValue: { width: 24, height: 50, additionX: 70, additionY: 55 }
});
var player2 = new Player({
    position: { x: 686, y: canvas.height - 250 },
    colliderBlocks: colliderBlocks,
    scale: 1.5,
    imageSrc: "./Sprites/Enemy/Idle.png",
    frameRate: 8,
    animations: {
        Idle: {
            imageSrc: "./Sprites/Enemy/Idle.png",
            frameRate: 8,
            frameBuffer: 16
        },
        IdleLeft: {
            imageSrc: "./Sprites/Player/IdleLeft.png",
            frameRate: 8,
            frameBuffer: 16
        },
        Run: {
            imageSrc: "./Sprites/Enemy/Run.png",
            frameRate: 8,
            frameBuffer: 16
        },
        RunLeft: {
            imageSrc: "./Sprites/Enemy/RunLeft.png",
            frameRate: 8,
            frameBuffer: 16
        },
        Jump: {
            imageSrc: "./Sprites/Player/Jump.png",
            frameRate: 2,
            frameBuffer: 6
        },
        Fall: {
            imageSrc: "./Sprites/Player/Fall.png",
            frameRate: 2,
            frameBuffer: 6
        },
        JumpLeft: {
            imageSrc: "./Sprites/Player/JumpLeft.png",
            frameRate: 2,
            frameBuffer: 6
        },
        FallLeft: {
            imageSrc: "./Sprites/Player/FallLeft.png",
            frameRate: 2,
            frameBuffer: 6
        },
        Attack1: {
            imageSrc: "./Sprites/Player/Attack1.png",
            frameRate: 4,
            frameBuffer: 16
        },
        Death: {
            imageSrc: "./Sprites/Enemy/Death.png",
            frameRate: 6,
            frameBuffer: 16
        }
    },
    updateHitBoxValue: {
        width: 65,
        height: 75,
        additionX: 80,
        additionY: 68
    }
});
var currentframes = 0;
var gameOver = false;
function gameLoop() {
    var deathAnimationPlayed = false;
    var deathAnimationStartTime = 0;
    if (player2.health === 0 && !deathAnimationPlayed) {
        player2.swapSprite("Death");
        deathAnimationPlayed = true;
        deathAnimationStartTime = Date.now();
    }
    else if (deathAnimationPlayed) {
        var elapsedTime = Date.now() - deathAnimationStartTime;
        if (elapsedTime >= 2000) {
            c.clearRect(player2.hitbox.position.x, player2.hitbox.position.y, player2.hitbox.width, player2.hitbox.height);
        }
    }
    else if (player2.velocity.y === 0) {
        player.velocity.x = -1;
        colliderBlocks.map(function (block) {
            player2.swapSprite("RunLeft");
            if (collisionCheck(block, player2.hitbox)) {
                // ...
            }
        });
    }
    if (player.hitbox.position.x < 1) {
        player.velocity.x = 0;
        player.position.x = player.position.x - player.hitbox.width;
    }
    if (game.keys.space.pressed) {
        if (player.numberOfJumps < 1 && player.velocity.y < 0.5) {
            jumpMusic.play();
            player.velocity.y = -4; // Jump
            player.numberOfJumps++; // 0 dı 1 oldu zıpladı
        }
        game.keys.space.pressed = false; // Ignore further jump inputs
    }
    c.fillStyle = "#FC9C54";
    var background = new Image();
    background.src = "../background.png";
    c.drawImage(background, 0, 0, canvas.width, canvas.height);
    c.save();
    colliderBlocks.forEach(function (collider) {
        collider.update();
    });
    player.velocity.x = 0;
    if (game.keys.d.pressed) {
        player.swapSprite("Run");
        player.velocity.x = 1;
        player.lastDirection = "right";
    }
    else if (game.keys.a.pressed) {
        player.swapSprite("RunLeft");
        player.velocity.x = -1;
        player.lastDirection = "left";
    }
    else if (player.velocity.y === 0) {
        if (player.lastDirection === "right")
            player.swapSprite("Idle");
        else
            player.swapSprite("IdleLeft");
    }
    if (player.velocity.y < 0) {
        if (player.lastDirection === "right")
            player.swapSprite("Jump");
        else
            player.swapSprite("JumpLeft");
    }
    else if (player.velocity.y > 0) {
        if (player.lastDirection === "right")
            player.swapSprite("Fall");
        else
            player.swapSprite("FallLeft");
    }
    if (player.playerAttack) {
        console.log(attackCount);
        if (attackCount === 1)
            player.swapSprite("Attack1");
        else if (attackCount === 2)
            player.swapSprite("Attack2");
        else if (attackCount === 3)
            player.swapSprite("Attack3");
        currentframes++;
        if (currentframes == 45) {
            player.playerAttack = false;
            currentframes = 0;
        }
    }
    c.restore();
    player.update();
    player2.update();
    if (player.hitbox.position.y > canvas.height + 300) {
        gameOver = true;
        if (gameOver) {
            backgroundMusic.pause();
            mainMenu();
        }
        player.hitbox.position.y = 0;
        player.velocity.x = 0;
        player.velocity.y = 0;
    }
    gameOver !== true ? window.requestAnimationFrame(gameLoop) : null;
}
function startGame() {
    init();
}
startGame();
mainMenu();
//# sourceMappingURL=game.js.map