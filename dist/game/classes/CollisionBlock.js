var CollisionBlock = /** @class */ (function () {
    function CollisionBlock(params) {
        this.width = 32;
        this.height = 32;
        this.position = params.position;
        this.groundImage = new Image();
        this.groundImage.src = "../ground.png";
    }
    CollisionBlock.prototype.draw = function () {
        c.drawImage(this.groundImage, this.position.x, this.position.y, this.width, this.height);
        // c.fillStyle = `red`;
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
    CollisionBlock.prototype.update = function () {
        this.draw();
    };
    return CollisionBlock;
}());
//# sourceMappingURL=CollisionBlock.js.map