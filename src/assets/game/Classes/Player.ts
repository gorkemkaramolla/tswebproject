class Player extends Sprite {
    position: { x: number; y: number };
    collisionblocks: CollisionBlock[];
    velocity: { x: number; y: number };
    lastDirection: string;
    playerAttack: boolean;
    health: number;
    updateHitBoxValue: {
        width: number;
        height: number;
        additionX: number;
        additionY: number;
    };
    numberOfJumps: number;
    animations: {
        Idle: {
            imageSrc: string;
            frameRate?: number;
            image?: HTMLImageElement;
            frameBuffer?: number;
        };
        IdleLeft: {
            imageSrc: string;
            frameRate?: number;
            frameBuffer: number;
        };
        Run: {
            imageSrc: string;
            frameRate?: number;
            image?: HTMLImageElement;
            frameBuffer?: number;
        };
        RunLeft: {
            imageSrc: string;
            frameRate?: number;
            image?: HTMLImageElement;
            frameBuffer?: number;
        };
        Jump: {
            imageSrc: string;
            frameRate?: number;
            image?: HTMLImageElement;
            frameBuffer?: number;
        };
        Fall: {
            imageSrc: string;
            frameRate?: number;
            frameBuffer: number;
        };
        JumpLeft: {
            imageSrc: string;
            frameRate?: number;
            image?: HTMLImageElement;
            frameBuffer?: number;
        };
        FallLeft: {
            imageSrc: string;
            frameRate?: number;
            frameBuffer: number;
        };
    };
    hitbox: {
        position: {
            x: number;
            y: number;
        };
        width: number;
        height: number;
    };
    updateHitBox: () => void;

    constructor(params: {
        position: { x: number; y: number };
        colliderBlocks: CollisionBlock[];
        scale: number;
        imageSrc: string;
        frameRate: number;
        animations: {
            Idle: {
                imageSrc: string;
                frameRate?: number;
                frameBuffer: number;
            };
            IdleLeft: {
                imageSrc: string;
                frameRate?: number;
                frameBuffer: number;
            };
            Run: {
                imageSrc: string;
                frameRate?: number;
                frameBuffer: number;
            };
            RunLeft: {
                imageSrc: string;
                frameRate?: number;
                frameBuffer: number;
            };
            Jump: {
                imageSrc: string;
                frameRate?: number;
                frameBuffer: number;
            };
            Fall: {
                imageSrc: string;
                frameRate?: number;
                frameBuffer: number;
            };
            JumpLeft: {
                imageSrc: string;
                frameRate?: number;
                frameBuffer: number;
            };
            FallLeft: {
                imageSrc: string;
                frameRate?: number;
                frameBuffer: number;
            };
            Attack1?: {
                imageSrc: string;
                frameRate?: number;
                frameBuffer: number;
            };
            Attack2?: {
                imageSrc: string;
                frameRate?: number;
                frameBuffer: number;
            };
            Attack3?: {
                imageSrc: string;
                frameRate?: number;
                frameBuffer: number;
            };
            Death?: {
                imageSrc: string;
                frameRate?: number;
                frameBuffer: number;
            };
        };
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
        this.draw();

        this.position.x += this.velocity.x;
        this.updateHitbox();

        this.checkHorizontalCollisions();

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
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    if (this.velocity.y === 0) {
                        const offset = this.hitbox.position.y - this.position.y;
                        this.position.y = block.position.y + offset + 0.01;
                        return;
                    }
                }
            }
        });
    }
    checkHorizontalCollisions() {
        this.collisionblocks.map((block) => {
            if (collisionCheck(block, this.hitbox)) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    const offset =
                        this.hitbox.position.x -
                        this.position.x +
                        this.hitbox.width;

                    this.position.x = block.position.x - offset - 0.01;
                    return;
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x;

                    this.position.x =
                        block.position.x + block.width - offset + 0.01;
                    return;
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
