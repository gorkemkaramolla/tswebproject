const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.querySelector("canvas")
);

const c: CanvasRenderingContext2D = canvas.getContext("2d");
//COLLIDER GROUND DATA 36 cols X 27 rows
let gameLooping = false;
let attackCount = 0;
const init = () => {
    gameLooping = false;
    canvas.focus();
    canvas.width = 1024;
    canvas.height = 576;

    animationFrameID = 0;
    colliderBlocks = newColliderData
        .flatMap((row, y) =>
            row.map((col, x) => {
                if (col !== -1) {
                    return new CollisionBlock({
                        position: { x: x * 32, y: y * 32 },
                        imageSrc: images[col],
                    });
                }
            })
        )
        .filter((block) => block !== undefined);
    //NON COLLIDER GROUND DATA 36 columns X 27 rows

    //LOOPIN THROUGH THE 2D ARRAY ON CONDITION IF THERE IS A NON 0 VALUE THAT MEANS THERE IS A GROUND WITH A COLLIDER AND RETURN A NEW BLOCK

    //GAME UPDATE LOOP

    gravity = 0.05;
    yAxes = 100;
    game = new GameFeatures();
    //NEW PLAYER
    player = new Player({
        position: { x: 10, y: canvas.height - 166 },
        colliderBlocks,
        scale: 1,
        imageSrc: "./Sprites/Player/Idle.png",
        frameRate: 8,

        animations: {
            Idle: {
                imageSrc: "./Sprites/Player/Idle.png",
                frameRate: 8,
                frameBuffer: 16,
            },
            IdleLeft: {
                imageSrc: "./Sprites/Player/IdleLeft.png",
                frameRate: 8,
                frameBuffer: 16,
            },
            Run: {
                imageSrc: "./Sprites/Player/Run.png",
                frameRate: 8,
                frameBuffer: 16,
            },
            RunLeft: {
                imageSrc: "./Sprites/Player/RunLeft.png",
                frameRate: 8,
                frameBuffer: 16,
            },
            Jump: {
                imageSrc: "./Sprites/Player/Jump.png",
                frameRate: 2,
                frameBuffer: 6,
            },
            Fall: {
                imageSrc: "./Sprites/Player/Fall.png",
                frameRate: 2,
                frameBuffer: 6,
            },
            JumpLeft: {
                imageSrc: "./Sprites/Player/JumpLeft.png",
                frameRate: 2,
                frameBuffer: 6,
            },
            FallLeft: {
                imageSrc: "./Sprites/Player/FallLeft.png",
                frameRate: 2,
                frameBuffer: 6,
            },
            Attack1: {
                imageSrc: "./Sprites/Player/Attack1.png",
                frameRate: 4,
                frameBuffer: 12,
            },
            Attack2: {
                imageSrc: "./Sprites/Player/Attack2.png",
                frameRate: 4,
                frameBuffer: 12,
            },
            Attack3: {
                imageSrc: "./Sprites/Player/Attack3.png",
                frameRate: 4,
                frameBuffer: 12,
            },
        },
        updateHitBoxValue: {
            width: 24,
            height: 50,
            additionX: 70,
            additionY: 55,
        },
    });
    player2 = new Player({
        position: { x: 686, y: canvas.height - 250 },
        colliderBlocks,
        scale: 1.5,
        imageSrc: "./Sprites/Enemy/Idle.png",
        frameRate: 8,

        animations: {
            Idle: {
                imageSrc: "./Sprites/Enemy/Idle.png",
                frameRate: 8,
                frameBuffer: 16,
            },
            IdleLeft: {
                imageSrc: "./Sprites/Player/IdleLeft.png",
                frameRate: 8,
                frameBuffer: 16,
            },
            Run: {
                imageSrc: "./Sprites/Enemy/Run.png",
                frameRate: 8,
                frameBuffer: 16,
            },
            RunLeft: {
                imageSrc: "./Sprites/Enemy/RunLeft.png",
                frameRate: 8,
                frameBuffer: 16,
            },
            Jump: {
                imageSrc: "./Sprites/Player/Jump.png",
                frameRate: 2,
                frameBuffer: 6,
            },
            Fall: {
                imageSrc: "./Sprites/Player/Fall.png",
                frameRate: 2,
                frameBuffer: 6,
            },
            JumpLeft: {
                imageSrc: "./Sprites/Player/JumpLeft.png",
                frameRate: 2,
                frameBuffer: 6,
            },
            FallLeft: {
                imageSrc: "./Sprites/Player/FallLeft.png",
                frameRate: 2,
                frameBuffer: 6,
            },
            Attack1: {
                imageSrc: "./Sprites/Player/Attack1.png",
                frameRate: 4,
                frameBuffer: 16,
            },
            Death: {
                imageSrc: "./Sprites/Enemy/Death.png",
                frameRate: 6,
                frameBuffer: 16,
            },
        },
        updateHitBoxValue: {
            width: 65,
            height: 75,
            additionX: 80,
            additionY: 68,
        },
    });
    currentframes = 0;
    gameOver = false;
};

let animationFrameID = 0;
let colliderBlocks = newColliderData
    .flatMap((row, y) =>
        row.map((col, x) => {
            if (col !== -1) {
                return new CollisionBlock({
                    position: { x: x * 32, y: y * 32 },
                    imageSrc: images[col],
                });
            }
        })
    )
    .filter((block) => block !== undefined);
//NON COLLIDER GROUND DATA 36 columns X 27 rows

//LOOPIN THROUGH THE 2D ARRAY ON CONDITION IF THERE IS A NON 0 VALUE THAT MEANS THERE IS A GROUND WITH A COLLIDER AND RETURN A NEW BLOCK

//GAME UPDATE LOOP

canvas.focus();
canvas.width = 1024;
canvas.height = 576;

let gravity: number = 0.05;
let yAxes: number = 100;
let game: GameFeatures = new GameFeatures();
//NEW PLAYER
let player = new Player({
    position: { x: 10, y: canvas.height - 166 },
    colliderBlocks,
    scale: 1,
    imageSrc: "./Sprites/Player/Idle.png",
    frameRate: 8,

    animations: {
        Idle: {
            imageSrc: "./Sprites/Player/Idle.png",
            frameRate: 8,
            frameBuffer: 16,
        },
        IdleLeft: {
            imageSrc: "./Sprites/Player/IdleLeft.png",
            frameRate: 8,
            frameBuffer: 16,
        },
        Run: {
            imageSrc: "./Sprites/Player/Run.png",
            frameRate: 8,
            frameBuffer: 16,
        },
        RunLeft: {
            imageSrc: "./Sprites/Player/RunLeft.png",
            frameRate: 8,
            frameBuffer: 16,
        },
        Jump: {
            imageSrc: "./Sprites/Player/Jump.png",
            frameRate: 2,
            frameBuffer: 6,
        },
        Fall: {
            imageSrc: "./Sprites/Player/Fall.png",
            frameRate: 2,
            frameBuffer: 6,
        },
        JumpLeft: {
            imageSrc: "./Sprites/Player/JumpLeft.png",
            frameRate: 2,
            frameBuffer: 6,
        },
        FallLeft: {
            imageSrc: "./Sprites/Player/FallLeft.png",
            frameRate: 2,
            frameBuffer: 6,
        },
        Attack1: {
            imageSrc: "./Sprites/Player/Attack1.png",
            frameRate: 4,
            frameBuffer: 12,
        },
        Attack2: {
            imageSrc: "./Sprites/Player/Attack2.png",
            frameRate: 4,
            frameBuffer: 12,
        },
        Attack3: {
            imageSrc: "./Sprites/Player/Attack3.png",
            frameRate: 4,
            frameBuffer: 12,
        },
    },
    updateHitBoxValue: { width: 24, height: 50, additionX: 70, additionY: 55 },
});
let player2 = new Player({
    position: { x: 686, y: canvas.height - 250 },
    colliderBlocks,
    scale: 1.5,
    imageSrc: "./Sprites/Enemy/Idle.png",
    frameRate: 8,

    animations: {
        Idle: {
            imageSrc: "./Sprites/Enemy/Idle.png",
            frameRate: 8,
            frameBuffer: 16,
        },
        IdleLeft: {
            imageSrc: "./Sprites/Player/IdleLeft.png",
            frameRate: 8,
            frameBuffer: 16,
        },
        Run: {
            imageSrc: "./Sprites/Enemy/Run.png",
            frameRate: 8,
            frameBuffer: 16,
        },
        RunLeft: {
            imageSrc: "./Sprites/Enemy/RunLeft.png",
            frameRate: 8,
            frameBuffer: 16,
        },
        Jump: {
            imageSrc: "./Sprites/Player/Jump.png",
            frameRate: 2,
            frameBuffer: 6,
        },
        Fall: {
            imageSrc: "./Sprites/Player/Fall.png",
            frameRate: 2,
            frameBuffer: 6,
        },
        JumpLeft: {
            imageSrc: "./Sprites/Player/JumpLeft.png",
            frameRate: 2,
            frameBuffer: 6,
        },
        FallLeft: {
            imageSrc: "./Sprites/Player/FallLeft.png",
            frameRate: 2,
            frameBuffer: 6,
        },
        Attack1: {
            imageSrc: "./Sprites/Player/Attack1.png",
            frameRate: 4,
            frameBuffer: 16,
        },
        Death: {
            imageSrc: "./Sprites/Enemy/Death.png",
            frameRate: 6,
            frameBuffer: 16,
        },
    },
    updateHitBoxValue: {
        width: 65,
        height: 75,
        additionX: 80,
        additionY: 68,
    },
});
let currentframes = 0;
let gameOver = false;
const camera = {
    position: {
        x: 0,
        y: 0,
    },
};
const prevCamera = {
    position: {
        x: camera.position.x,
        y: camera.position.y,
    },
};
function gameLoop() {
    let deathAnimationPlayed = false;
    let deathAnimationStartTime = 0;

    if (player2.health === 0 && !deathAnimationPlayed) {
        player2.swapSprite("Death");
        deathAnimationPlayed = true;
        deathAnimationStartTime = Date.now();
    } else if (deathAnimationPlayed) {
        const elapsedTime = Date.now() - deathAnimationStartTime;
        if (elapsedTime >= 2000) {
            c.clearRect(
                player2.hitbox.position.x,
                player2.hitbox.position.y,
                player2.hitbox.width,
                player2.hitbox.height
            );
        }
    } else if (player2.velocity.y === 0) {
        player.velocity.x = -1;

        colliderBlocks.map((block) => {
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
    const background = new Image();
    background.src = "../background.png";
    c.drawImage(background, 0, 0, canvas.width, canvas.height);
    c.save();

    colliderBlocks.forEach((collider) => {
        collider.update();
    });
    c.translate(camera.position.x, camera.position.y);

    player.velocity.x = 0;

    if (game.keys.d.pressed) {
        player.swapSprite("Run");
        player.velocity.x = 1;
        player.lastDirection = "right";
        player.shouldCameraMoveLeft();
    } else if (game.keys.a.pressed) {
        player.swapSprite("RunLeft");
        player.velocity.x = -1;
        player.lastDirection = "left";
    } else if (player.velocity.y === 0) {
        if (player.lastDirection === "right") player.swapSprite("Idle");
        else player.swapSprite("IdleLeft");
    }

    if (player.velocity.y < 0) {
        if (player.lastDirection === "right") player.swapSprite("Jump");
        else player.swapSprite("JumpLeft");
    } else if (player.velocity.y > 0) {
        if (player.lastDirection === "right") player.swapSprite("Fall");
        else player.swapSprite("FallLeft");
    }
    if (player.playerAttack) {
        console.log(attackCount);
        if (attackCount === 1) player.swapSprite("Attack1");
        else if (attackCount === 2) player.swapSprite("Attack2");
        else if (attackCount === 3) player.swapSprite("Attack3");

        currentframes++;
        if (currentframes == 45) {
            player.playerAttack = false;
            currentframes = 0;
        }
    }

    c.restore();

    player.update();
    player2.update();
    player.updateCameraBox();

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
