/*This class represent Collision Blocks layout
a collision block is a single square in game's grid system
position is shows us a coordinate system x and y numbers is the the start point of this block
*/
var CollisionBlock = /** @class */ (function () {
    function CollisionBlock(params) {
        this.width = 32;
        this.height = 32;
        this.imageSrc = params.imageSrc;
        this.position = params.position;
        this.groundImage = new Image();
        this.groundImage.src = "../assets/".concat(this.imageSrc);
        this.width = this.groundImage.width;
        this.height = this.groundImage.height;
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