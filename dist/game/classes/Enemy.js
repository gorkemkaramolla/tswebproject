var Enemy = /** @class */ (function () {
    function Enemy(params) {
        var _this = this;
        this.collisionblocks = colliderBlocks;
        this.position = params.position;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.width = 240;
        this.height = 240;
        var enemyImage = new Image();
        enemyImage.src = "../game/Sprites/Enemy/NightBorne.gif";
        enemyImage.onload = function () {
            _this.enemyImage = enemyImage;
        };
    }
    Enemy.prototype.update = function () {
        this.draw();
        this.updateHitbox();
        //IMAGE LAYOUT
        c.fillStyle = "transparent";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        //CHARACTER LAYOUT
        c.fillStyle = "transparent";
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkHorizontalCollisions();
        this.applyGravity();
        this.updateHitbox();
        this.checkVerticalCollisions();
    };
    Enemy.prototype.applyGravity = function () {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    };
    Enemy.prototype.checkVerticalCollisions = function () {
        var _this = this;
        this.collisionblocks.map(function (block) {
            if (collisionCheck(block, _this.hitbox)) {
                game.keys.space.numberOfJumps = 0;
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
    Enemy.prototype.checkHorizontalCollisions = function () {
        var _this = this;
        this.collisionblocks.map(function (block) {
            if (collisionCheck(block, _this.hitbox)) {
                if (_this.velocity.x > 0) {
                    _this.velocity.x = 0;
                    var offset = _this.hitbox.position.x -
                        _this.position.x +
                        _this.hitbox.width;
                    _this.position.x = block.position.x - offset - 0.01;
                    return;
                }
                if (_this.velocity.x < 0) {
                    _this.velocity.x = 0;
                    var offset = _this.hitbox.position.x - _this.position.x;
                    _this.position.x =
                        block.position.x + block.width - offset + 0.01;
                    return;
                }
            }
        });
    };
    Enemy.prototype.updateHitbox = function () {
        this.hitbox = {
            position: {
                x: this.position.x + 240,
                y: this.position.y + 240
            },
            width: 240,
            height: 240
        };
    };
    Enemy.prototype.draw = function () {
        if (!this.enemyImage)
            return;
        console.log(this.enemyImage);
        c.drawImage(this.enemyImage, this.position.x, this.position.y);
    };
    return Enemy;
}());
//# sourceMappingURL=Enemy.js.map