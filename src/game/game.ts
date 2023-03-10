/*
    This Script is pretty large script basically controls the game loop.
    A game loop uses window's animation function. RequestAnimationsPerFrame
    When you call it you pass the function parameter as same function. It recursively
    calls itself. The Limit of the game loop and difference of the regular loop. Is pre setted values
    of browsers. Each Browser have a different rendering speed Ex: chrome is 24 per/second
    Safari is 7 per /second.
 */

let browserName = checkUserBrowser();
const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.querySelector("canvas")
);
const c: CanvasRenderingContext2D = canvas.getContext("2d");
//COLLIDER GROUND DATA 36 cols X 27 rows
let gameLooping = false;
let attackCount = 0;
/*
   Init function contains same layout with game. We have this as a start method
   on start we declare variables values player objects and everything we have in the game.
   The reason for using this function when gameLoop stops or we forced it to stop
   all variables are lost and we need to start over the game. For example when player reach to the end of the level
   and goes to the another level. I turn GameOver Flag to the stop gameLoop once transition ends i need 
   to call gameLoop again because level2 will be started. But gameLoop is recursive an once it done the cycle
   it won't remember the features we have so before calling gameLoop we call this Init function. Initially
   sets states of the game before game loop.
 */
const init = () => {
    browserName = checkUserBrowser();
    lastFrameTime = performance.now();
    gameLooping = true;
    c.clearRect(0, 0, canvas.width, canvas.height);

    if (game.level === 2) {
        game.level = 0;
    }
    // player2.playerIsDeath = false;

    currentframes = 0;
    console.log(gameOver);

    camera = {
        position: {
            x: 0,
            y: 0,
        },
    };
    prevCamera = {
        position: {
            x: camera.position.x,
            y: camera.position.y,
        },
    };
    canvas.focus();
    canvas.width = 1024;
    canvas.height = 576;

    animationFrameID = 0;
    if (game.level === 0) {
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
    } else {
        colliderBlocks = level2
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
    }

    //NON COLLIDER GROUND DATA 36 columns X 27 rows

    //LOOPIN THROUGH THE 2D ARRAY ON CONDITION IF THERE IS A NON 0 VALUE THAT MEANS THERE IS A GROUND WITH A COLLIDER AND RETURN A NEW BLOCK

    //GAME UPDATE LOOP

    gravity = 0.05;
    yAxes = 100;
    //NEW PLAYER
    player = new Player({
        position: {
            x: 55 - player.hitbox.width / 2,
            y: canvas.height / 4,
        },
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
                frameBuffer: 24,
            },
            Fall: {
                imageSrc: "./Sprites/Player/Fall.png",
                frameRate: 2,
                frameBuffer: 24,
            },
            JumpLeft: {
                imageSrc: "./Sprites/Player/JumpLeft.png",
                frameRate: 2,
                frameBuffer: 24,
            },
            FallLeft: {
                imageSrc: "./Sprites/Player/FallLeft.png",
                frameRate: 2,
                frameBuffer: 24,
            },
            Attack1: {
                imageSrc: "./Sprites/Player/Attack1.png",
                frameRate: 4,
                frameBuffer: 16,
            },
            Attack1Left: {
                imageSrc: "./Sprites/Player/Attack1Left.png",
                frameRate: 4,
                frameBuffer: 16,
            },
            Attack2: {
                imageSrc: "./Sprites/Player/Attack2.png",
                frameRate: 4,
                frameBuffer: 16,
            },
            Attack2Left: {
                imageSrc: "./Sprites/Player/Attack2Left.png",
                frameRate: 4,
                frameBuffer: 16,
            },
            Attack3: {
                imageSrc: "./Sprites/Player/Attack3.png",
                frameRate: 4,
                frameBuffer: 16,
            },
            Attack3Left: {
                imageSrc: "./Sprites/Player/Attack3Left.png",
                frameRate: 4,
                frameBuffer: 16,
            },
            Death: {
                imageSrc: "./Sprites/Player/Death.png",
                frameRate: 6,
                frameBuffer: 16,
            },
            DeathLeft: {
                imageSrc: "./Sprites/Player/DeathLeft.png",
                frameRate: 6,
                frameBuffer: 16,
            },
        },
        updateHitBoxValue: {
            width: 24,
            height: 50,
            additionX: 70,
            additionY: 55,
        },
        typeOfPlayer: "player",
    });
    // player2 = new Player({
    //     position: {
    //         x: 0,
    //         y: colliderBlocks[0].position.y,
    //     },
    //     colliderBlocks,
    //     scale: 1.5,
    //     imageSrc: "./Sprites/Enemy/Idle.png",
    //     frameRate: 8,

    //     animations: {
    //         Idle: {
    //             imageSrc: "./Sprites/Enemy/Idle.png",
    //             frameRate: 8,
    //             frameBuffer: 16,
    //         },
    //         IdleLeft: {
    //             imageSrc: "./Sprites/Enemy/IdleLeft.png",
    //             frameRate: 8,
    //             frameBuffer: 16,
    //         },
    //         Run: {
    //             imageSrc: "./Sprites/Enemy/Run.png",
    //             frameRate: 8,
    //             frameBuffer: 16,
    //         },
    //         RunLeft: {
    //             imageSrc: "./Sprites/Enemy/RunLeft.png",
    //             frameRate: 8,
    //             frameBuffer: 16,
    //         },
    //         Jump: {
    //             imageSrc: "./Sprites/Enemy/Jump.png",
    //             frameRate: 2,
    //             frameBuffer: 6,
    //         },
    //         Fall: {
    //             imageSrc: "./Sprites/Enemy/Fall.png",
    //             frameRate: 2,
    //             frameBuffer: 6,
    //         },
    //         JumpLeft: {
    //             imageSrc: "./Sprites/Enemy/JumpLeft.png",
    //             frameRate: 2,
    //             frameBuffer: 6,
    //         },
    //         FallLeft: {
    //             imageSrc: "./Sprites/Enemy/FallLeft.png",
    //             frameRate: 2,
    //             frameBuffer: 6,
    //         },
    //         Attack1: {
    //             imageSrc: "./Sprites/Enemy/Attack1.png",
    //             frameRate: 4,
    //             frameBuffer: 16,
    //         },
    //         Death: {
    //             imageSrc: "./Sprites/Enemy/Death.png",
    //             frameRate: 6,
    //             frameBuffer: 24,
    //         },
    //     },
    //     updateHitBoxValue: {
    //         width: 65,
    //         height: 75,
    //         additionX: 80,
    //         additionY: 68,
    //     },
    //     typeOfPlayer: "enemy",
    // });
};
//INIT ENDS
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
console.log(colliderBlocks);
//NON COLLIDER GROUND DATA 36 columns X 27 rows

//LOOPIN THROUGH THE 2D ARRAY ON CONDITION IF THERE IS A NON 0 VALUE THAT MEANS THERE IS A GROUND WITH A COLLIDER AND RETURN A NEW BLOCK

//GAME UPDATE LOOP

canvas.focus();
canvas.width = 1024;
canvas.height = 576;
let currentframes = 0;

let gravity: number = 0.05;
let yAxes: number = 100;
let game: GameFeatures = new GameFeatures();
//NEW PLAYER
let player = new Player({
    position: { x: 0, y: canvas.height - 166 },
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
            frameBuffer: 24,
        },
        Fall: {
            imageSrc: "./Sprites/Player/Fall.png",
            frameRate: 2,
            frameBuffer: 24,
        },
        JumpLeft: {
            imageSrc: "./Sprites/Player/JumpLeft.png",
            frameRate: 2,
            frameBuffer: 24,
        },
        FallLeft: {
            imageSrc: "./Sprites/Player/FallLeft.png",
            frameRate: 2,
            frameBuffer: 24,
        },
        Attack1: {
            imageSrc: "./Sprites/Player/Attack1.png",
            frameRate: 4,
            frameBuffer: 16,
        },
        Attack2: {
            imageSrc: "./Sprites/Player/Attack2.png",
            frameRate: 4,
            frameBuffer: 16,
        },
        Attack3: {
            imageSrc: "./Sprites/Player/Attack3.png",
            frameRate: 4,
            frameBuffer: 16,
        },
        Death: {
            imageSrc: "./Sprites/Player/Death.png",
            frameRate: 6,
            frameBuffer: 16,
        },
        DeathLeft: {
            imageSrc: "./Sprites/Player/DeathLeft.png",
            frameRate: 6,
            frameBuffer: 16,
        },
    },
    updateHitBoxValue: { width: 24, height: 50, additionX: 70, additionY: 55 },
    typeOfPlayer: "player",
});
// let player2 = new Player({
//     position: {
//         x: colliderBlocks[14].position.x,
//         y: colliderBlocks[14].position.y,
//     },
//     colliderBlocks,
//     scale: 1.5,
//     imageSrc: "./Sprites/Enemy/Idle.png",
//     frameRate: 8,

//     animations: {
//         Idle: {
//             imageSrc: "./Sprites/Enemy/Idle.png",
//             frameRate: 8,
//             frameBuffer: 16,
//         },
//         IdleLeft: {
//             imageSrc: "./Sprites/Enemy/IdleLeft.png",
//             frameRate: 8,
//             frameBuffer: 16,
//         },
//         Run: {
//             imageSrc: "./Sprites/Enemy/Run.png",
//             frameRate: 8,
//             frameBuffer: 16,
//         },
//         RunLeft: {
//             imageSrc: "./Sprites/Enemy/RunLeft.png",
//             frameRate: 8,
//             frameBuffer: 16,
//         },
//         Jump: {
//             imageSrc: "./Sprites/Enemy/Jump.png",
//             frameRate: 2,
//             frameBuffer: 6,
//         },
//         Fall: {
//             imageSrc: "./Sprites/Enemy/Fall.png",
//             frameRate: 2,
//             frameBuffer: 6,
//         },
//         JumpLeft: {
//             imageSrc: "./Sprites/Enemy/JumpLeft.png",
//             frameRate: 2,
//             frameBuffer: 6,
//         },
//         FallLeft: {
//             imageSrc: "./Sprites/Enemy/FallLeft.png",
//             frameRate: 2,
//             frameBuffer: 6,
//         },
//         Attack1: {
//             imageSrc: "./Sprites/Enemy/Attack1.png",
//             frameRate: 4,
//             frameBuffer: 16,
//         },
//         Death: {
//             imageSrc: "./Sprites/Enemy/Death.png",
//             frameRate: 6,
//             frameBuffer: 24,
//         },
//     },
//     updateHitBoxValue: {
//         width: 65,
//         height: 75,
//         additionX: 80,
//         additionY: 68,
//     },
//     typeOfPlayer: "enemy",
// });
let gameOver = false;
let camera = {
    position: {
        x: 0,
        y: 0,
    },
};
let prevCamera = {
    position: {
        x: camera.position.x,
        y: camera.position.y,
    },
};

let player1DeathAnimationPLayed = false;
//************************************* GAME LOOP *************************************

/*
    I tried to implement deltaTime Logic to the frames of gameLoop.
    Since all computers and browser's different power of cpu  and frames game works different on every computer
    So i tried to multiply all speed variables calculations with deltaTime value
    For example if your pc takes 60 frames per second your deltaTime value will be 1/60
    Other pc takes 20 frames per second the deltaTime value will be 1/20
    when we multiply them we will get 1. 20*1/20=1
    So our game loop will be independent of the power of the pc the and it will work in same speed in every computer.

    But i did have some issues in here with javascript canvas the game still have conflicts on speed on different computers.
    Currently on my pc it works correctly you may have low frame rate issues when u run the game

    Explanation: We have many instances on the game such as player or game logic. Or we can have multiple players in same time
    Since each class have a function field of itself such as update() functions. Game loop controls each update method
    of each game features. And game logic such as level end or player's positions. 

    So in chrome this function will be called 24 times on a second each time our all update method's of the other classes will be called.
    This update methods includes draw methods. That means we draw everything 24 times in a second. If player moved right on one of them
    so player will be drawn at right position in next frame. This is an oldschool valid animation logic. Since frame rate fast enough the game
    will give us a live logic video game smoothly playable.
*/
let lastFrameTime = performance.now();
const desiredFPS = 60;
const frameDuration = 1000 / 60;
function gameLoop() {
    let currentTime = performance.now();

    const background = new Image();
    background.src = "../background.png";
    c.drawImage(background, 0, 0, canvas.width, canvas.height);
    colliderBlocks.forEach((collider) => {
        collider.update();
    });

    let deltaTime = currentTime - lastFrameTime;
    gravity = 0.0005 * player.browserFrame * deltaTime;
    lastFrameTime = currentTime;

    if (player.hitbox.position.x < 1) {
        player.velocity.x = 0;
        player.position.x -= player.hitbox.width * deltaTime;
    }
    if (player.keys.space.pressed) {
        if (player.numberOfJumps < 1 && player.velocity.y < 0.5) {
            jumpMusic.play();
            player.velocity.y = -0.45 * deltaTime;

            player.numberOfJumps++; // 0 d?? 1 oldu z??plad??
        }
        player.keys.space.pressed = false; // Ignore further jump inputs
    }
    c.fillStyle = "#FC9C54";

    c.save();

    player.velocity.x = 0;

    if (player.playerAttack && !player.playerIsDeath) {
        if (attackCount === 1) {
            if (player.lastDirection === "right") player.swapSprite("Attack1");
            else player.swapSprite("Attack1Left");
        } else if (attackCount === 2) {
            if (player.lastDirection === "right") player.swapSprite("Attack2");
            else player.swapSprite("Attack2Left");
        } else if (attackCount === 3) {
            if (player.lastDirection === "right") player.swapSprite("Attack3");
            else player.swapSprite("Attack3Left");
        }
    }
    if (player.keys.d.pressed && !player.playerIsDeath) {
        player.lastDirection = "right";

        if (!player.playerAttack) player.swapSprite("Run");
        player.shouldPlatformMoveLeft(deltaTime);
    } else if (player.keys.a.pressed && !player.playerIsDeath) {
        player.lastDirection = "left";

        if (!player.playerAttack) player.swapSprite("RunLeft");
        player.shouldPlatformMoveRight(deltaTime);
    } else if (player.velocity.y === 0 && !player.playerAttack) {
        if (
            player.lastDirection === "right" &&
            !player.playerIsDeath &&
            !player.playerAttack
        )
            player.swapSprite("Idle");
        else if (
            player.lastDirection === "left" &&
            !player.playerIsDeath &&
            !player.playerAttack
        )
            player.swapSprite("IdleLeft");
    }

    if (player.velocity.y < 0 && !player.playerAttack) {
        if (player.lastDirection === "right" && !player.playerIsDeath) {
            if (!player.playerAttack) player.swapSprite("Jump");
        } else if (player.lastDirection === "left" && !player.playerIsDeath) {
            if (!player.playerAttack) player.swapSprite("JumpLeft");
        }
    } else if (player.velocity.y > 0 && !player.playerAttack) {
        if (player.lastDirection === "right" && !player.playerIsDeath)
            player.swapSprite("Fall");
        else if (player.lastDirection === "left" && !player.playerIsDeath) {
            player.swapSprite("FallLeft");
        }
    }

    c.restore();

    player.update(deltaTime);
    // player2.enemyAIMovement();

    //PLAYER2 ANIMATIONS

    // if (player2.deathAnimationPlayed === false) {
    //     // player2.update();
    // }

    player.updateCameraBox();

    if (player.hitbox.position.y > canvas.height + 300) {
        backgroundMusic.pause();
        overMp3.play();
        if (player.hitbox.position.y > canvas.height + 1300) {
            gameOver = true;
            player.hitbox.position.y = 0;
            player.velocity.x = 0;
            player.velocity.y = 0;
        }
    }
    if (gameOver) {
        backgroundMusic.pause();

        mainMenu();
    }
    //PLAYER1
    if (player.health <= 0) {
        player.playerIsDeath = true;
        if (player.lastDirection === "right") player.swapSprite("Death");
        else {
            player.swapSprite("DeathLeft");
        }
        if (player.deathAnimationPlayed) {
            gameOver = true;
        }
    }
    //ENEMY
    // if (player2.health <= 0) {
    //     player2.playerIsDeath = true;
    //     player2.velocity.x = 0;

    //     player2.swapSprite("Death");
    // } else {
    //     if (player2.velocity.x < 0) {
    //         player2.lastDirection = "left";
    //         player2.swapSprite("RunLeft");
    //     } else if (player2.velocity.x > 0) {
    //         player2.lastDirection = "right";

    //         player2.swapSprite("Run");
    //     } else {
    //         if (player2.lastDirection === "right") player2.swapSprite("Idle");
    //         else player2.swapSprite("IdleLeft");
    //     }
    // }

    if (game.textLevel === 1 && !gameLooping) {
        var gradient = c.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.5, "whitesmoke");
        gradient.addColorStop(1, "purple");
        c.font = "36px Georgia";
        c.fillStyle = gradient;

        c.fillText("You Won!", 420, 250);

        c.font = "36px Verdana";
        // Create gradient

        // Fill with gradient
        c.fillStyle = gradient;
        c.fillText("Big smile!", 420, 350);
    }
    if (game.textLevel === 2 && !gameLooping) {
        var gradient = c.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.5, "whitesmoke");
        gradient.addColorStop(1, "purple");
        c.font = "36px Georgia";
        c.fillStyle = gradient;

        c.fillText("YOU FINISHED THE GAME!", 420, 250);

        c.font = "36px Verdana";
        // Create gradient

        // Fill with gradient
        c.fillStyle = gradient;
        c.fillText("WOOOOOOOOOOW!", 420, 350);
    }

    gameOver !== true && gameLooping
        ? window.requestAnimationFrame(gameLoop)
        : null;
}

function startGame() {
    init();
}
mainMenu();
function checkUserBrowser() {
    if (
        (navigator.userAgent.indexOf("Opera") ||
            navigator.userAgent.indexOf("OPR")) != -1
    ) {
        return "Opera";
    } else if (navigator.userAgent.indexOf("Edg") != -1) {
        return "Edge";
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
    } else {
        return "unknown";
    }
}
