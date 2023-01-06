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
                    x: _this.hitbox.position.x - _this.cameraBox.width / 2,
                    y: _this.hitbox.position.y - _this.hitbox.height / 2 + 10
                },
                height: 80,
                width: canvas.width * 2
            };
            c.fillStyle = "transparent";
            c.fillRect(player.cameraBox.position.x, player.cameraBox.position.y, player.cameraBox.width, player.cameraBox.height);
        };
        _this.shouldCameraMoveLeft = function () {
            var cameraBoxRight = _this.cameraBox.position.x + _this.cameraBox.width;
            if (cameraBoxRight >= canvas.width) {
                prevCamera.position.x = camera.position.x;
                prevCamera.position.y = camera.position.y;
                camera.position.x -= 2;
                colliderBlocks.forEach(function (collider) {
                    collider.position.x +=
                        1 * (camera.position.x - prevCamera.position.x);
                    collider.position.y +=
                        camera.position.y - prevCamera.position.y;
                });
                player2.position.x += camera.position.x - prevCamera.position.x;
            }
        };
        _this.shouldCameraMoveRight = function () {
            var cameraBoxLeft = _this.cameraBox.position.x;
            if (cameraBoxLeft <= 0) {
                prevCamera.position.x = camera.position.x;
                prevCamera.position.y = camera.position.y;
                camera.position.x += 2;
                colliderBlocks.forEach(function (collider) {
                    cameraBoxLeft;
                    collider.position.x +=
                        1 * (camera.position.x - prevCamera.position.x);
                    collider.position.y +=
                        camera.position.y - prevCamera.position.y;
                });
                player2.position.x += camera.position.x - prevCamera.position.x;
            }
        };
        _this.typeOfPlayer = params.typeOfPlayer;
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
        if (player.hitbox.position.x + player.hitbox.width <
            player2.hitbox.position.x &&
            !player2.playerIsDeath) {
            player2.velocity.x = -1;
        }
        else if (player.hitbox.position.x + player.hitbox.width ===
            player2.hitbox.position.x) {
            player.health = 0;
        }
        else {
            player2.velocity.x = 0;
        }
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
        this.draw();
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkVerticalCollisions();
        this.applyGravity();
        this.updateHitbox();
        this.checkVerticalCollisions();
    };
    Player.prototype.applyGravity = function () {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
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
                        _this.position.y = block.position.y - offset - 0.01;
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
                "Sprites/Player/RunLeft.png") {
                this.currentFrame--;
                if (this.currentFrame < 0) {
                    this.currentFrame = 7;
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
                        console.log(this.currentFrame);
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