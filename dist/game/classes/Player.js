var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(params) {
        var _this = _super.call(this, {
            position: params.position,
            scale: params.scale,
            imageSrc: params.imageSrc,
            frameRate: params.frameRate
        }) || this;
        _this.playerIsDeath = false;
        _this.deathAnimationPlayed = false;
        _this.updateCameraBox = function () {
            _this.cameraBox = {
                position: {
                    x: _this.hitbox.position.x +
                        _this.hitbox.width / 2 -
                        _this.cameraBox.width / 2,
                    y: _this.hitbox.position.y - _this.hitbox.height / 2
                },
                height: 80,
                width: 200
            };
            c.fillStyle = "transparent";
            c.fillRect(player.cameraBox.position.x, player.cameraBox.position.y, player.cameraBox.width, player.cameraBox.height);
        };
        _this.shouldPlatformMoveLeft = function () {
            var playerHitboxX = player.hitbox.position.x + player.hitbox.width;
            var canvasWidth = canvas.width;
            // Check if the player's hitbox position is within the boundaries of the map
            if (playerHitboxX > 66 && playerHitboxX < 2048) {
                if (playerHitboxX <= canvasWidth / 2) {
                    // Move the player
                    player.velocity.x = 1;
                }
                else {
                    // Move the camera and collider blocks in the opposite direction of the player's hitbox position
                    // Set the player's velocity to 0 when the player's position is greater than 32
                    var movement_1 = playerHitboxX >= canvasWidth / 2 ? 1 : 0;
                    if (Math.abs(camera.position.x) >
                        newColliderData[0].length * 32 - canvasWidth) {
                        player.velocity.x = 1;
                        movement_1 = 0;
                    }
                    camera.position.x -= movement_1;
                    colliderBlocks.forEach(function (collider) {
                        collider.position.x -= movement_1;
                    });
                    player2.position.x -= movement_1;
                }
            }
        };
        _this.shouldPlatformMoveRight = function () {
            var playerHitboxX = player.hitbox.position.x;
            var canvasWidth = canvas.width;
            // Check if the player's hitbox position is within the boundaries of the map
            var movement = 0;
            player.velocity.x = -1;
            if (playerHitboxX > 0) {
                // Check if the player's hitbox position is within the range where the player can move left
                // Move the camera and collider blocks instead
                if (player.hitbox.position.x <= canvas.width / 2) {
                    player.velocity.x = 0;
                    movement = 1;
                    if (camera.position.x > 0) {
                        movement = 0;
                        player.velocity.x = -1;
                    }
                }
            }
            camera.position.x += movement;
            colliderBlocks.forEach(function (collider) {
                collider.position.x += movement;
            });
            player2.position.x += movement;
        };
        _this.typeOfPlayer = params.typeOfPlayer;
        _this.counter = 5;
        _this.health = 100;
        _this.playerAttack = false;
        _this.updateHitBoxValue = params.updateHitBoxValue;
        _this.lastDirection = "right";
        _this.collisionblocks = colliderBlocks;
        _this.position = params.position;
        _this.velocity = {
            x: 0,
            y: 0
        };
        _this.animations = params.animations;
        for (var key in _this.animations) {
            var image = new Image();
            image.src = _this.animations[key].imageSrc;
            _this.animations[key].image = image;
        }
        _this.cameraBox = {
            position: { x: _this.position.x, y: _this.position.y },
            height: 80,
            width: 200
        };
        return _this;
    }
    Player.prototype.enemyAIMovement = function () {
        // check horizontal distance between player and AI
        if (player.hitbox.position.x < player2.hitbox.position.x &&
            !player2.playerIsDeath) {
            player2.velocity.x = -1.5; // move left
        }
        else if (player.hitbox.position.x > player2.hitbox.position.x) {
            player2.velocity.x = 1.5; // move right
        }
        else {
            player2.velocity.x = 0; // don't move horizontally
        }
        // check vertical distance between player and AI
        if (player.hitbox.position.y < player2.hitbox.position.y) {
            player2.velocity.y = 0; // don't move vertically
            player2.velocity.x = 0;
        }
        // check for collision between player and AI hitboxes
        if (this.checkCollision(player.hitbox, player2.hitbox)) {
            if (player.playerAttack) {
                player2.health = 0; // attack enemy
            }
            else {
                player.health = 0; // player dies
            }
        }
    };
    Player.prototype.checkCollision = function (hitbox1, hitbox2) {
        // check if hitboxes overlap
        return (hitbox1.position.x < hitbox2.position.x + hitbox2.width &&
            hitbox1.position.x + hitbox1.width > hitbox2.position.x &&
            hitbox1.position.y < hitbox2.position.y + hitbox2.height &&
            hitbox1.position.y + hitbox1.height > hitbox2.position.y);
    };
    Player.prototype.update = function () {
        this.updateFrames();
        this.updateHitbox();
        //IMAGE LAYOUT
        c.fillStyle = "transparent";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        //CHARACTER LAYOUT
        c.fillStyle = "transparent";
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        if (this.image.src.split("game/")[1] === "Sprites/Player/DeathLeft.png")
            _super.prototype.draw2.call(this, this.counter);
        else {
            this.draw();
        }
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.applyGravity();
        this.checkForHorizontalCollisions();
        this.updateHitbox();
        this.checkVerticalCollisions();
    };
    Player.prototype.applyGravity = function () {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    };
    Player.prototype.checkForHorizontalCollisions = function () {
        for (var i = 0; i < this.collisionblocks.length; i++) {
            var collisionBlock = this.collisionblocks[i];
            if (this.checkCollision(collisionBlock, this.hitbox)) {
                if (game.keys.d.pressed && !player.playerIsDeath) {
                    this.velocity.x = 0;
                    var offset = this.hitbox.position.x -
                        this.position.x +
                        this.hitbox.width;
                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    console.log(collisionBlock.position.x - offset - 0.01);
                    break;
                }
                if (game.keys.a.pressed && !player.playerIsDeath) {
                    this.velocity.x = 0;
                    var offset = this.hitbox.position.x - this.position.x;
                    this.position.x =
                        collisionBlock.position.x +
                            collisionBlock.width -
                            offset +
                            0.01;
                    console.log(collisionBlock.position.x +
                        collisionBlock.width -
                        offset +
                        0.01);
                    break;
                }
            }
        }
    };
    Player.prototype.checkVerticalCollisions = function () {
        var _this = this;
        this.collisionblocks.map(function (block) {
            if (collisionCheck(block, _this.hitbox)) {
                _this.numberOfJumps = 0;
                if (_this.velocity.y > 0) {
                    _this.velocity.y = 0;
                    if (_this.velocity.y === 0) {
                        var offset = _this.hitbox.position.y -
                            _this.position.y +
                            _this.hitbox.height;
                        _this.position.y = block.position.y - offset;
                        return;
                    }
                }
            }
        });
    };
    Player.prototype.updateHitbox = function () {
        this.hitbox = {
            position: {
                x: this.position.x + this.updateHitBoxValue.additionX,
                y: this.position.y + this.updateHitBoxValue.additionY
            },
            width: this.updateHitBoxValue.width,
            height: this.updateHitBoxValue.height
        };
    };
    Player.prototype.updateFrames = function () {
        this.elapsedFrames++;
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.image.src.split("game/")[1] ===
                "Sprites/Player/Attack1Left.png" ||
                this.image.src.split("game/")[1] ===
                    "Sprites/Player/Attack3Left.png" ||
                this.image.src.split("game/")[1] ===
                    "Sprites/Player/Attack2Left.png") {
                this.currentFrame--;
                if (this.currentFrame < 0) {
                    this.currentFrame = 3;
                }
                if (this.currentFrame === 0) {
                    this.playerAttack = false;
                }
            }
            else if (this.image.src.split("game/")[1] ===
                "Sprites/Player/RunLeft.png") {
                this.currentFrame--;
                if (this.currentFrame < 0) {
                    this.currentFrame = 7;
                }
            }
            else if (this.image.src.split("game/")[1] ===
                "Sprites/Player/DeathLeft.png") {
                this.counter--;
                if (this.counter === 0) {
                    this.deathAnimationPlayed = true;
                }
            }
            else {
                if (this.image.src.split("game/")[1] ===
                    "Sprites/Player/Jump.png" ||
                    this.image.src.split("game/")[1] ===
                        "Sprites/Player/JumpLeft.png" ||
                    this.image.src.split("game/")[1] ===
                        "Sprites/Player/Fall.png" ||
                    this.image.src.split("game/")[1] ===
                        "Sprites/Player/FallLeft.png") {
                    if (this.currentFrame < 1) {
                        this.currentFrame++;
                    }
                }
                else {
                    this.currentFrame++;
                }
                if ((this.image.src.split("game/")[1] ===
                    "Sprites/Player/Death.png" &&
                    this.currentFrame === this.frameRate) ||
                    (this.image.src.split("game/")[1] ===
                        "Sprites/Enemy/Death.png" &&
                        this.currentFrame === this.frameRate) ||
                    (this.image.src.split("game/")[1] ===
                        "Sprites/Enemy/DeathLeft.png" &&
                        this.currentFrame === this.frameRate)) {
                    this.deathAnimationPlayed = true;
                }
                if ((this.image.src.split("game/")[1] ===
                    "Sprites/Player/Attack1.png" &&
                    this.currentFrame === this.frameRate) ||
                    (this.image.src.split("game/")[1] ===
                        "Sprites/Player/Attack2.png" &&
                        this.currentFrame === this.frameRate) ||
                    (this.image.src.split("game/")[1] ===
                        "Sprites/Player/Attack3.png" &&
                        this.currentFrame === this.frameRate)) {
                    this.playerAttack = false;
                }
                if (this.currentFrame >= this.frameRate) {
                    this.currentFrame = 0;
                }
            }
        }
    };
    Player.prototype.swapSprite = function (spriteName) {
        if (this.image === this.animations[spriteName].image ||
            !this.imageLoaded) {
            return;
        }
        this.currentFrame = 0;
        this.image = this.animations[spriteName].image;
        this.frameBuffer = this.animations[spriteName].frameBuffer;
        this.frameRate = this.animations[spriteName].frameRate;
    };
    return Player;
}(Sprite));
//# sourceMappingURL=Player.js.map