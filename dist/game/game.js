var canvas = (document.querySelector("canvas"));
var c = canvas.getContext("2d");
//COLLIDER GROUND DATA 36 cols X 27 rows
var gameLooping = false;
var attackCount = 0;
var init = function () {
    currentframes = 0;
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
        position: {
            x: canvas.width / 2 - player.hitbox.width / 2,
            y: canvas.height - 166
        },
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
                frameBuffer: 24
            },
            Fall: {
                imageSrc: "./Sprites/Player/Fall.png",
                frameRate: 2,
                frameBuffer: 24
            },
            JumpLeft: {
                imageSrc: "./Sprites/Player/JumpLeft.png",
                frameRate: 2,
                frameBuffer: 24
            },
            FallLeft: {
                imageSrc: "./Sprites/Player/FallLeft.png",
                frameRate: 2,
                frameBuffer: 24
            },
            Attack1: {
                imageSrc: "./Sprites/Player/Attack1.png",
                frameRate: 4,
                frameBuffer: 16
            },
            Attack2: {
                imageSrc: "./Sprites/Player/Attack2.png",
                frameRate: 4,
                frameBuffer: 16
            },
            Attack3: {
                imageSrc: "./Sprites/Player/Attack3.png",
                frameRate: 4,
                frameBuffer: 16
            },
            Death: {
                imageSrc: "./Sprites/Player/Death.png",
                frameRate: 6,
                frameBuffer: 16
            }
        },
        updateHitBoxValue: {
            width: 24,
            height: 50,
            additionX: 70,
            additionY: 55
        },
        typeOfPlayer: "player"
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
                imageSrc: "./Sprites/Enemy/IdleLeft.png",
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
                imageSrc: "./Sprites/Enemy/Jump.png",
                frameRate: 2,
                frameBuffer: 6
            },
            Fall: {
                imageSrc: "./Sprites/Enemy/Fall.png",
                frameRate: 2,
                frameBuffer: 6
            },
            JumpLeft: {
                imageSrc: "./Sprites/Enemy/JumpLeft.png",
                frameRate: 2,
                frameBuffer: 6
            },
            FallLeft: {
                imageSrc: "./Sprites/Enemy/FallLeft.png",
                frameRate: 2,
                frameBuffer: 6
            },
            Attack1: {
                imageSrc: "./Sprites/Enemy/Attack1.png",
                frameRate: 4,
                frameBuffer: 16
            },
            Death: {
                imageSrc: "./Sprites/Enemy/Death.png",
                frameRate: 6,
                frameBuffer: 24
            }
        },
        updateHitBoxValue: {
            width: 65,
            height: 75,
            additionX: 80,
            additionY: 68
        },
        typeOfPlayer: "enemy"
    });
};
//INIT ENDS
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
var currentframes = 0;
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
            frameBuffer: 24
        },
        Fall: {
            imageSrc: "./Sprites/Player/Fall.png",
            frameRate: 2,
            frameBuffer: 24
        },
        JumpLeft: {
            imageSrc: "./Sprites/Player/JumpLeft.png",
            frameRate: 2,
            frameBuffer: 24
        },
        FallLeft: {
            imageSrc: "./Sprites/Player/FallLeft.png",
            frameRate: 2,
            frameBuffer: 24
        },
        Attack1: {
            imageSrc: "./Sprites/Player/Attack1.png",
            frameRate: 4,
            frameBuffer: 16
        },
        Attack2: {
            imageSrc: "./Sprites/Player/Attack2.png",
            frameRate: 4,
            frameBuffer: 16
        },
        Attack3: {
            imageSrc: "./Sprites/Player/Attack3.png",
            frameRate: 4,
            frameBuffer: 16
        },
        Death: {
            imageSrc: "./Sprites/Player/Death.png",
            frameRate: 6,
            frameBuffer: 16
        }
    },
    updateHitBoxValue: { width: 24, height: 50, additionX: 70, additionY: 55 },
    typeOfPlayer: "player"
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
            frameBuffer: 24
        }
    },
    updateHitBoxValue: {
        width: 65,
        height: 75,
        additionX: 80,
        additionY: 68
    },
    typeOfPlayer: "enemy"
});
var gameOver = false;
var camera = {
    position: {
        x: 0,
        y: 0
    }
};
var prevCamera = {
    position: {
        x: camera.position.x,
        y: camera.position.y
    }
};
var player1DeathAnimationPLayed = false;
function gameLoop() {
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
    c.translate(camera.position.x, camera.position.y);
    player.velocity.x = 0;
    if (game.keys.d.pressed && !player.playerIsDeath) {
        if (!player.playerAttack)
            player.swapSprite("Run");
        player.lastDirection = "right";
        player.shouldCameraMoveLeft();
    }
    else if (game.keys.a.pressed && !player.playerIsDeath) {
        if (!player.playerAttack)
            player.swapSprite("RunLeft");
        player.lastDirection = "left";
        player.shouldCameraMoveRight();
    }
    else if (player.velocity.y === 0 && !player.playerAttack) {
        if (player.lastDirection === "right" &&
            !player.playerIsDeath &&
            !player.playerAttack)
            player.swapSprite("Idle");
        else if (player.lastDirection === "left" &&
            !player.playerIsDeath &&
            !player.playerAttack)
            player.swapSprite("IdleLeft");
    }
    if (player.velocity.y < 0 && !player.playerAttack) {
        if (player.lastDirection === "right" && !player.playerIsDeath) {
            if (!player.playerAttack)
                player.swapSprite("Jump");
        }
        else if (player.lastDirection === "left" && !player.playerIsDeath) {
            if (!player.playerAttack)
                player.swapSprite("JumpLeft");
        }
    }
    else if (player.velocity.y > 0 && !player.playerAttack) {
        if (player.lastDirection === "right" && !player.playerIsDeath)
            player.swapSprite("Fall");
        else if (player.lastDirection === "left" && !player.playerIsDeath) {
            player.swapSprite("FallLeft");
        }
    }
    if (player.playerAttack && !player.playerIsDeath) {
        if (attackCount === 1)
            player.swapSprite("Attack1");
        else if (attackCount === 2)
            player.swapSprite("Attack2");
        else if (attackCount === 3)
            player.swapSprite("Attack3");
    }
    c.restore();
    player2.enemyAIMovement();
    player.update();
    if (player2.deathAnimationPlayed === false) {
        player2.update();
    }
    player.updateCameraBox();
    if (player.hitbox.position.y > canvas.height + 300) {
        gameOver = true;
        player.hitbox.position.y = 0;
        player.velocity.x = 0;
        player.velocity.y = 0;
    }
    //PLAYER1
    if (player.health <= 0) {
        player.playerIsDeath = true;
        player.swapSprite("Death");
        if (player.deathAnimationPlayed)
            gameOver = true;
    }
    //ENEMY
    if (player2.health <= 0) {
        player2.playerIsDeath = true;
        player2.velocity.x = 0;
        player2.swapSprite("Death");
    }
    if (gameOver) {
        backgroundMusic.pause();
        mainMenu();
    }
    gameOver !== true ? window.requestAnimationFrame(gameLoop) : null;
}
function startGame() {
    init();
}
mainMenu();
//# sourceMappingURL=game.js.map