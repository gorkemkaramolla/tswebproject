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
            imageSrc: params.imgSrc,
            frameRate: params.frameRate,
            scale: params.scale
        }) || this;
        _this.collisionblocks = colliderBlocks;
        _this.position = params.position;
        _this.velocity = {
            x: 0,
            y: 0
        };
        _this.animations = _this.animations;
        return _this;
    }
    Player.prototype.update = function () {
        this.updateFrames();
        this.updateHitbox();
        //IMAGE LAYOUT
        c.fillStyle = "rgba(255,255,255,0.3)";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        //CHARACTER LAYOUT
        c.fillStyle = "rgba(25,222,1,0.5)";
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        this.draw();
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkHorizontalCollisions();
        this.applyGravity();
        this.updateHitbox();
        this.checkVerticalCollisions();
    };
    Player.prototype.applyGravity = function () {
        this.position.y += this.velocity.y;
        this.velocity.y += gravity;
    };
    Player.prototype.checkVerticalCollisions = function () {
        var _this = this;
        this.collisionblocks.map(function (block) {
            if (collisionCheck(block, _this.hitbox)) {
                console.log("you hit");
                game.keys.space.numberOfJumps = 0;
                if (_this.velocity.y > 0) {
                    _this.velocity.y = 0;
                    if (_this.velocity.y === 0) {
                        var offset = _this.hitbox.position.y - _this.position.y + _this.hitbox.height;
                        _this.position.y = block.position.y - offset - 0.01;
                        return;
                    }
                }
                if (_this.velocity.y < 0) {
                    _this.velocity.y = 0;
                    if (_this.velocity.y === 0) {
                        var offset = _this.hitbox.position.y - _this.position.y;
                        _this.position.y = block.position.y + offset + 0.01;
                        return;
                    }
                }
            }
        });
    };
    Player.prototype.checkHorizontalCollisions = function () {
        var _this = this;
        this.collisionblocks.map(function (block) {
            if (collisionCheck(block, _this.hitbox)) {
                if (_this.velocity.x > 0) {
                    _this.velocity.x = 0;
                    var offset = _this.hitbox.position.x - _this.position.x + _this.hitbox.width;
                    _this.position.x = block.position.x - offset - 0.01;
                    return;
                }
                console.log(_this.position.y);
                if (_this.velocity.x < 0) {
                    _this.velocity.x = 0;
                    var offset = _this.hitbox.position.x - _this.position.x;
                    _this.position.x = block.position.x + block.width - offset + 0.01;
                    return;
                }
            }
        });
    };
    Player.prototype.updateHitbox = function () {
        this.hitbox.position.x = this.position.x + 35;
        this.hitbox.position.y = this.position.y + 26;
        this.hitbox.width = 14;
        this.hitbox.height = 27;
    };
    Player.prototype.updateFrames = function () {
        this.elapsedFrames++;
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++;
            }
            else {
                this.currentFrame = 0;
            }
        }
    };
    return Player;
}(Sprite));
//# sourceMappingURL=Player.js.map