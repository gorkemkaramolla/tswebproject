class Player extends Sprite {
    position: { x: number; y: number };
    numberOfJumps: number;
    velocity: { x: number; y: number };
    lastDirection: string;
    playerAttack: boolean;
    health: number;
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
                x: this.hitbox.position.x - this.width / 2 - 10,
                y: this.hitbox.position.y - this.hitbox.height / 2 + 10,
            },
            height: 80,
            width: 200,
        };
        c.fillStyle = "rgba(255,31,255,0.3)";
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
            console.log("touches");
            prevCamera.position.x = camera.position.x;
            prevCamera.position.y = camera.position.y;

            camera.position.x -= this.velocity.x;
            colliderBlocks.forEach((collider) => {
                console.log(camera.position.x + "camera");
                console.log(prevCamera.position.x + "prevCamera");

                collider.position.x +=
                    camera.position.x - prevCamera.position.x;
                collider.position.y +=
                    camera.position.y - prevCamera.position.y;
            });
        }
    };
    shouldCameraMoveRight = () => {
        const cameraBoxRight = this.cameraBox.position.x + this.cameraBox.width;
        if (cameraBoxRight >= canvas.width) {
        }
    };

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
                this.currentFrame++;
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
        } else {
            this.frameBuffer = this.animations[spriteName].frameBuffer;
            this.frameRate =
                this.animations[spriteName].frameRate || this.frameRate;
            this.image = this.animations[spriteName].image;
        }
    }
}
