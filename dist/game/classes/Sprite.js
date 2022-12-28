var Sprite = /** @class */ (function () {
    function Sprite(params) {
        this.position = params.position;
        this.image = new Image();
        this.image.src = params.imageSrc;
    }
    Sprite.prototype.draw = function () {
        if (!this.image)
            return;
        c.drawImage(this.image, this.position.x, this.position.y);
    };
    Sprite.prototype.update = function () {
        this.draw();
    };
    return Sprite;
}());
//# sourceMappingURL=Sprite.js.map