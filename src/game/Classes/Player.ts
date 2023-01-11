class Player extends Sprite {
    level = 0;
    browserFrame = 1;
    counter: number;
    keys = {
        d: {
            pressed: false,
        },
        a: {
            pressed: false,
        },
        space: {
            pressed: false,
            numberOfJumps: 0,
        },
        shift: {
            pressed: false,
            numberOfDashes: 0,
        },
    };
    position: { x: number; y: number };
    numberOfJumps: number;
    velocity: { x: number; y: number };
    lastDirection: string;
    typeOfPlayer: string;
    playerAttack: boolean;
    health: number;
    playerIsDeath = false;
    deathAnimationPlayed = false;
    animations: {};
    hitbox: {
        position: {
            x: number;
            y: number;
        };
        width: number;
        height: number;
    };
    updateHitBoxValue: {
        width: number;
        height: number;
        additionX: number;
        additionY: number;
    };
    updateHitBox: () => void;
    collisionblocks: CollisionBlock[];
    cameraBox: {
        position: {
            x: number;
            y: number;
        };
        width: number;
        height: number;
    };

    constructor(params: {
        typeOfPlayer: string;
        position: { x: number; y: number };
        colliderBlocks: CollisionBlock[];
        scale: number;
        imageSrc: string;
        frameRate: number;
        animations: {};
        updateHitBoxValue: {
            width: number;
            height: number;
            additionX: number;
            additionY: number;
        };
    }) {
        super({
            position: params.position,
            scale: params.scale,
            imageSrc: params.imageSrc,
            frameRate: params.frameRate,
        });
        this.typeOfPlayer = params.typeOfPlayer;
        this.counter = 5;
        this.health = 100;
        this.playerAttack = false;
        this.updateHitBoxValue = params.updateHitBoxValue;
        this.lastDirection = "right";
        this.collisionblocks = colliderBlocks;
        this.position = params.position;
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.browserFrame = browserName === "Safari" ? 3.42 : 1;
        this.animations = params.animations;
        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;
            this.animations[key].image = image;
        }
        this.cameraBox = {
            position: { x: this.position.x, y: this.position.y },
            height: 80,
            width: 200,
        };
    }
    updateCameraBox = () => {
        this.cameraBox = {
            position: {
                x:
                    this.hitbox.position.x +
                    this.hitbox.width / 2 -
                    this.cameraBox.width / 2,

                y: this.hitbox.position.y - this.hitbox.height / 2,
            },
            height: 80,
            width: 200,
        };
        c.fillStyle = "transparent";
        c.fillRect(
            player.cameraBox.position.x,
            player.cameraBox.position.y,
            player.cameraBox.width,
            player.cameraBox.height
        );
    };

    shouldPlatformMoveLeft = (deltaTime) => {
        if (
            Math.abs(camera.position.x) + player.hitbox.position.x >
                newColliderData[0].length * 32 - 50 &&
            this.level !== 1
        ) {
            this.velocity.x = 0;
            if (game.textLevel === 0) {
                backgroundMusic.pause();

                nice.play();

                gameLooping = false;
                game.textLevel = 1;
                this.level = 1;
                game.level = 1;
                setTimeout(() => {
                    gameOver = true;
                    c.clearRect(0, 0, canvasWidth, canvas.height);
                    gameLooping = true;
                    gameLoop();
                }, 4000);
                return;
            }

            if (game.textLevel === 1) {
                gameLooping = false;
                backgroundMusic.pause();
                nice.play();
                clap.play();

                game.textLevel = 2;
                this.level = 2;
                game.level = 2;
                setTimeout(() => {
                    gameOver = true;
                    c.clearRect(0, 0, canvasWidth, canvas.height);
                    gameLooping = true;
                    mainMenu();
                }, 4000);
                return;
            }
            console.log(this.level);
        }
        if (this.level === 1 || this.level === 2) return;
        const playerHitboxX = player.hitbox.position.x + player.hitbox.width;
        const canvasWidth = canvas.width;
        // Check if the player's hitbox position is within the boundaries of the map
        if (playerHitboxX < 2048) {
            if (playerHitboxX <= canvasWidth / 2) {
                // Move the player
                player.velocity.x = 0.2 * deltaTime;
            } else {
                // Move the camera and collider blocks in the opposite direction of the player's hitbox position
                // Set the player's velocity to 0 when the player's position is greater than 32
                let movement = playerHitboxX >= canvasWidth / 2 ? 0.2 : 0;
                if (
                    Math.abs(camera.position.x) >
                    newColliderData[0].length * 32 - canvasWidth
                ) {
                    player.velocity.x = 0.2 * deltaTime * this.browserFrame;
                    movement = 0;
                }

                camera.position.x -= movement * deltaTime * this.browserFrame;
                console.log(this.browserFrame);
                colliderBlocks.forEach((collider) => {
                    collider.position.x -=
                        movement * deltaTime * this.browserFrame;
                });
                // player2.position.x -= movement * deltaTime * this.browserFrame;
            }
        }
    };

    shouldPlatformMoveRight = (deltaTime) => {
        const playerHitboxX = player.hitbox.position.x;
        const canvasWidth = canvas.width;
        // Check if the player's hitbox position is within the boundaries of the map
        let movement = 0;
        player.velocity.x = -0.2 * deltaTime * this.browserFrame;

        if (playerHitboxX > 0) {
            // Check if the player's hitbox position is within the range where the player can move left
            // Move the camera and collider blocks instead

            if (player.hitbox.position.x <= canvas.width / 2) {
                player.velocity.x = 0;
                movement = 0.2;
                if (camera.position.x > 0) {
                    movement = 0;
                    player.velocity.x = -0.2 * deltaTime * this.browserFrame;
                }
            }
        }
        camera.position.x += movement * deltaTime * this.browserFrame;
        colliderBlocks.forEach((collider) => {
            collider.position.x += movement * deltaTime * this.browserFrame;
        });
        // player2.position.x += movement * deltaTime * this.browserFrame;
    };
    // enemyAIMovement() {
    //     // check horizontal distance between player and AI
    //     if (
    //         player.hitbox.position.x < player2.hitbox.position.x &&
    //         !player2.playerIsDeath
    //     ) {
    //         player2.velocity.x = -0.2; // move left
    //     } else if (player.hitbox.position.x > player2.hitbox.position.x) {
    //         player2.velocity.x = 0.2; // move right
    //     } else {
    //         player2.velocity.x = 0; // don't move horizontally
    //     }

    //     // check if the player is within a certain distance of the AI on the x-axis
    //     const xDistance = Math.abs(
    //         player.hitbox.position.x - player2.hitbox.position.x
    //     );

    //     // check vertical distance between player and AI
    //     if (player.hitbox.position.y < player2.hitbox.position.y) {
    //         if (player2.numberOfJumps < 1 && player2.velocity.y < 0.5) {
    //             jumpMusic.play();
    //             player2.velocity.y = -4;

    //             player2.numberOfJumps++; // 0 dı 1 oldu zıpladı
    //         }
    //         player2.keys.space.pressed = false; // Ignore further jump inputs
    //     }

    //     // check if the player is within a certain distance of the AI on the y-axis
    //     const yDistance = Math.abs(
    //         player.hitbox.position.y - player2.hitbox.position.y
    //     );

    //     // check for collision between player and AI hitboxes
    // }

    checkCollision(hitbox1, hitbox2) {
        // check if hitboxes overlap
        return (
            hitbox1.position.x < hitbox2.position.x + hitbox2.width &&
            hitbox1.position.x + hitbox1.width > hitbox2.position.x &&
            hitbox1.position.y < hitbox2.position.y + hitbox2.height &&
            hitbox1.position.y + hitbox1.height > hitbox2.position.y
        );
    }

    update() {
        this.updateFrames();
        this.updateHitbox();

        //IMAGE LAYOUT
        c.fillStyle = "transparent";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        //CHARACTER LAYOUT
        c.fillStyle = "transparent";
        c.fillRect(
            this.hitbox.position.x,
            this.hitbox.position.y,
            this.hitbox.width,
            this.hitbox.height
        );
        if (this.image.src.split("game/")[1] === "Sprites/Player/DeathLeft.png")
            super.draw2(this.counter);
        else {
            this.draw();
        }
        player.position.x += player.velocity.x;

        this.updateHitbox();

        this.applyGravity();
        this.checkForHorizontalCollisions();
        this.updateHitbox();

        this.checkVerticalCollisions();
    }
    applyGravity() {
        this.velocity.y += gravity;

        this.position.y += this.velocity.y;
    }
    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionblocks.length; i++) {
            const collisionBlock = this.collisionblocks[i];
            //s
            if (this.checkCollision(collisionBlock, this.hitbox)) {
                if (
                    (this.keys.d.pressed && !this.playerIsDeath) ||
                    (this.velocity.x > 0 && !this.playerIsDeath)
                ) {
                    this.velocity.x = 0;

                    const offset =
                        this.hitbox.position.x -
                        this.position.x +
                        this.hitbox.width;

                    this.position.x = collisionBlock.position.x - offset - 0.1;
                    break;
                }

                if (
                    (this.keys.a.pressed && !this.playerIsDeath) ||
                    (this.velocity.x < 0 && !this.playerIsDeath)
                ) {
                    this.velocity.x = 0;

                    const offset = this.hitbox.position.x - this.position.x;

                    this.position.x =
                        collisionBlock.position.x +
                        collisionBlock.width -
                        offset +
                        0.1;

                    break;
                }
            }
        }
    }

    checkVerticalCollisions() {
        this.collisionblocks.map((block) => {
            if (collisionCheck(block, this.hitbox)) {
                this.numberOfJumps = 0;

                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    if (this.velocity.y === 0) {
                        const offset =
                            this.hitbox.position.y -
                            this.position.y +
                            this.hitbox.height;
                        this.position.y = block.position.y - offset;
                        return;
                    }
                }
            }
        });
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + this.updateHitBoxValue.additionX,
                y: this.position.y + this.updateHitBoxValue.additionY,
            },
            width: this.updateHitBoxValue.width,
            height: this.updateHitBoxValue.height,
        };
    }
    updateFrames() {
        this.elapsedFrames++;
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (
                this.image.src.split("game/")[1] ===
                    "Sprites/Player/Attack1Left.png" ||
                this.image.src.split("game/")[1] ===
                    "Sprites/Player/Attack3Left.png" ||
                this.image.src.split("game/")[1] ===
                    "Sprites/Player/Attack2Left.png"
            ) {
                this.currentFrame--;
                if (this.currentFrame < 0) {
                    this.currentFrame = 3;
                }
                if (this.currentFrame === 0) {
                    this.playerAttack = false;
                }
            } else if (
                this.image.src.split("game/")[1] ===
                "Sprites/Player/RunLeft.png"
            ) {
                this.currentFrame--;
                if (this.currentFrame < 0) {
                    this.currentFrame = 7;
                }
            } else if (
                this.image.src.split("game/")[1] ===
                "Sprites/Player/DeathLeft.png"
            ) {
                this.counter--;
                if (this.counter === 0) {
                    this.deathAnimationPlayed = true;
                }
            } else {
                if (
                    this.image.src.split("game/")[1] ===
                        "Sprites/Player/Jump.png" ||
                    this.image.src.split("game/")[1] ===
                        "Sprites/Player/JumpLeft.png" ||
                    this.image.src.split("game/")[1] ===
                        "Sprites/Player/Fall.png" ||
                    this.image.src.split("game/")[1] ===
                        "Sprites/Player/FallLeft.png"
                ) {
                    if (this.currentFrame < 1) {
                        this.currentFrame++;
                    }
                } else {
                    this.currentFrame++;
                }
                if (
                    (this.image.src.split("game/")[1] ===
                        "Sprites/Player/Death.png" &&
                        this.currentFrame === this.frameRate) ||
                    (this.image.src.split("game/")[1] ===
                        "Sprites/Enemy/Death.png" &&
                        this.currentFrame === this.frameRate) ||
                    (this.image.src.split("game/")[1] ===
                        "Sprites/Enemy/DeathLeft.png" &&
                        this.currentFrame === this.frameRate)
                ) {
                    this.deathAnimationPlayed = true;
                }

                if (
                    (this.image.src.split("game/")[1] ===
                        "Sprites/Player/Attack1.png" &&
                        this.currentFrame === this.frameRate) ||
                    (this.image.src.split("game/")[1] ===
                        "Sprites/Player/Attack2.png" &&
                        this.currentFrame === this.frameRate) ||
                    (this.image.src.split("game/")[1] ===
                        "Sprites/Player/Attack3.png" &&
                        this.currentFrame === this.frameRate)
                ) {
                    this.playerAttack = false;
                }

                if (this.currentFrame >= this.frameRate) {
                    this.currentFrame = 0;
                }
            }
        }
    }
    swapSprite(spriteName: string) {
        if (
            this.image === this.animations[spriteName].image ||
            !this.imageLoaded
        ) {
            return;
        }
        this.currentFrame = 0;
        this.image = this.animations[spriteName].image;

        this.frameBuffer = this.animations[spriteName].frameBuffer;
        this.frameRate = this.animations[spriteName].frameRate;
    }
}
