class Player extends Sprite {
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
                x: this.hitbox.position.x - this.cameraBox.width / 2,
                y: this.hitbox.position.y - this.hitbox.height / 2 + 10,
            },
            height: 80,
            width: canvas.width * 2,
        };
        c.fillStyle = "rgba(255,30,222,0.2)";
        c.fillRect(
            player.cameraBox.position.x,
            player.cameraBox.position.y,
            player.cameraBox.width,
            player.cameraBox.height
        );
    };
    shouldCameraMoveLeft = () => {
        const cameraBoxRight = this.cameraBox.position.x + this.cameraBox.width;
        if (cameraBoxRight >= canvas.width) {
            prevCamera.position.x = camera.position.x;
            prevCamera.position.y = camera.position.y;

            camera.position.x -= 2;
            colliderBlocks.forEach((collider) => {
                collider.position.x +=
                    1 * (camera.position.x - prevCamera.position.x);
                collider.position.y +=
                    camera.position.y - prevCamera.position.y;
            });
            player2.position.x += camera.position.x - prevCamera.position.x;
        }
    };
    shouldCameraMoveRight = () => {
        const cameraBoxLeft = this.cameraBox.position.x;
        if (cameraBoxLeft <= 0) {
            prevCamera.position.x = camera.position.x;
            prevCamera.position.y = camera.position.y;

            camera.position.x += 2;
            colliderBlocks.forEach((collider) => {
                cameraBoxLeft;

                collider.position.x +=
                    1 * (camera.position.x - prevCamera.position.x);
                collider.position.y +=
                    camera.position.y - prevCamera.position.y;
            });
            player2.position.x += camera.position.x - prevCamera.position.x;
        }
    };
    enemyAIMovement() {
        if (
            player.hitbox.position.x + player.hitbox.width <
                player2.hitbox.position.x &&
            !player2.playerIsDeath
        ) {
            player2.velocity.x = -1;
        } else if (
            player.hitbox.position.x + player.hitbox.width ===
            player2.hitbox.position.x
        ) {
            player.health = 0;
        } else {
            player2.velocity.x = 0;
        }
    }
    update() {
        this.updateFrames();
        this.updateHitbox();

        //IMAGE LAYOUT
        c.fillStyle = "transparent";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        //CHARACTER LAYOUT
        c.fillStyle = "green";
        c.fillRect(
            this.hitbox.position.x,
            this.hitbox.position.y,
            this.hitbox.width,
            this.hitbox.height
        );
        this.draw();

        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkVerticalCollisions();
        this.applyGravity();
        this.updateHitbox();

        this.checkVerticalCollisions();
    }
    applyGravity() {
        this.velocity.y += gravity;

        this.position.y += this.velocity.y;
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
                        this.position.y = block.position.y - offset - 0.01;
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
                "Sprites/Player/RunLeft.png"
            ) {
                this.currentFrame--;
                if (this.currentFrame < 0) {
                    this.currentFrame = 7;
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
                        console.log(this.currentFrame);
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
