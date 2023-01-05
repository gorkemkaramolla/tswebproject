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
        _this.updateCameraBox = function () {
            _this.cameraBox = {
                position: {
                    x: _this.hitbox.position.x - _this.width / 2 - 10,
                    y: _this.hitbox.position.y - _this.hitbox.height / 2 + 10
                },
                height: 80,
                width: 200
            };
            c.fillStyle = "rgba(255,31,255,0.3)";
            c.fillRect(player.cameraBox.position.x, player.cameraBox.position.y, player.cameraBox.width, player.cameraBox.height);
        };
        _this.shouldCameraMoveLeft = function () {
            var cameraBoxRight = _this.cameraBox.position.x + _this.cameraBox.width;
            if (cameraBoxRight >= canvas.width) {
                console.log("touches");
                prevCamera.position.x = camera.position.x;
                prevCamera.position.y = camera.position.y;
                camera.position.x -= _this.velocity.x;
                colliderBlocks.forEach(function (collider) {
                    console.log(camera.position.x + "camera");
                    console.log(prevCamera.position.x + "prevCamera");
                    collider.position.x +=
                        camera.position.x - prevCamera.position.x;
                    collider.position.y +=
                        camera.position.y - prevCamera.position.y;
                });
            }
        };
        _this.shouldCameraMoveRight = function () {
            var cameraBoxRight = _this.cameraBox.position.x + _this.cameraBox.width;
            if (cameraBoxRight >= canvas.width) {
            }
        };
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
    Player.prototype.update = function () {
        this.updateFrames();
        this.updateHitbox();
        //IMAGE LAYOUT
        c.fillStyle = "transparent";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        //CHARACTER LAYOUT
        c.fillStyle = "green";
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        this.draw();
        this.position.x += this.velocity.x;
        this.updateHitbox();
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
                this.currentFrame++;
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
        else {
            this.frameBuffer = this.animations[spriteName].frameBuffer;
            this.frameRate =
                this.animations[spriteName].frameRate || this.frameRate;
            this.image = this.animations[spriteName].image;
        }
    };
    return Player;
}(Sprite));
//# sourceMappingURL=Player.js.map