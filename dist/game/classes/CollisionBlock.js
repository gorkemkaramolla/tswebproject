var CollisionBlock = /** @class */ (function () {
    function CollisionBlock(params) {
        this.width = 16;
        this.height = 16;
        this.position = params.position;
    }
    CollisionBlock.prototype.draw = function () {
        c.fillStyle = "rgba(255,0,0,0.5)";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
    CollisionBlock.prototype.update = function () {
        this.draw();
    };
    return CollisionBlock;
}());
//# sourceMappingURL=CollisionBlock.js.map