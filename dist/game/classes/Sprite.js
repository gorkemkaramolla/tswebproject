var Sprite = /** @class */ (function () {
    function Sprite(params) {
        var _this = this;
        this.currentFrame = 0;
        this.frameBuffer = 8;
        this.elapsedFrames = 0;
        this.scale = params.scale;
        this.position = params.position;
        this.image = new Image();
        this.image.onload = function () {
            _this.width = (_this.image.width / _this.frameRate) * _this.scale;
            _this.height = _this.image.height * _this.scale;
        };
        this.image.src = params.imageSrc;
        this.frameRate = params.frameRate;
        this.hitbox = {
            position: {
                x: this.position.x + 35,
                y: this.position.y + 26
            },
            width: 14,
            height: 27
        };
    }
    Sprite.prototype.draw = function () {
        var cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };
        if (!this.image)
            return;
        c.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, this.position.x, this.position.y, this.width, this.height);
    };
    Sprite.prototype.update = function () {
        this.draw();
    };
    return Sprite;
}());
//# sourceMappingURL=Sprite.js.map