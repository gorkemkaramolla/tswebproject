var Player = /** @class */ (function () {
    function Player(position, attributes) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1
        };
        this.attributes = {
            width: (attributes === null || attributes === void 0 ? void 0 : attributes.width) || 50,
            height: (attributes === null || attributes === void 0 ? void 0 : attributes.height) || 75
        };
    }
    Player.prototype.draw = function (color) {
        c.fillStyle = color;
        c.fillRect(this.position.x, this.position.y, this.attributes.width, this.attributes.height);
    };
    Player.prototype.update = function (color) {
        this.draw(color);
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if (this.position.y + this.attributes.height + this.velocity.y <
            canvas.height) {
            this.velocity.y += gravity;
            console.log(this.velocity.y);
        }
        else {
            this.velocity.y = 0;
        }
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map