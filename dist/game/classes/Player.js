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
//Player class controls pretty much everything of a player.
//Properties for keys numberOfJumps velocity at x and y axis ...
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(params) {
        var _this = _super.call(this, {
            position: params.position,
            scale: params.scale,
            imageSrc: params.imageSrc,
            frameRate: params.frameRate
        }) || this;
        _this.level = 0;
        _this.browserFrame = 1;
        _this.keys = {
            d: {
                pressed: false
            },
            a: {
                pressed: false
            },
            space: {
                pressed: false,
                numberOfJumps: 0
            },
            shift: {
                pressed: false,
                numberOfDashes: 0
            }
        };
        _this.playerIsDeath = false;
        _this.deathAnimationPlayed = false;
        _this.updateCameraBox = function () {
            _this.cameraBox = {
                position: {
                    x: _this.hitbox.position.x +
                        _this.hitbox.width / 2 -
                        _this.cameraBox.width / 2,
                    y: _this.hitbox.position.y - _this.hitbox.height / 2
                },
                height: 80,
                width: 200
            };
            c.fillStyle = "transparent";
            c.fillRect(player.cameraBox.position.x, player.cameraBox.position.y, player.cameraBox.width, player.cameraBox.height);
        };
        /*This is the player Movement function to the right side of the screen
        If the player at range of the left and right side of the game level. Plyaer moves freely until
        player reach of the bottom of the screen which for this setup is 512px at x player stops moving
        instead of player platform's(blocks) goes backward or forward at x axis.
        And this is also controls the level end of the game when player reach to the end of the level game ends
        and activates some variable for next level.
        */
        _this.shouldPlatformMoveLeft = function (deltaTime) {
            if (Math.abs(camera.position.x) + player.hitbox.position.x >
                newColliderData[0].length * 32 - 50 &&
                _this.level !== 1) {
                _this.velocity.x = 0;
                if (game.textLevel === 0) {
                    backgroundMusic.pause();
                    nice.play();
                    gameLooping = false;
                    game.textLevel = 1;
                    _this.level = 1;
                    game.level = 1;
                    setTimeout(function () {
                        gameOver = true;
                        c.clearRect(0, 0, canvasWidth, canvas.height);
                        gameLooping = true;
                        gameLoop();
                    }, 4000);
                    return;
                }
                if (game.textLevel === 1) {
                    gameLooping = false;
                    backgroundMusic.pause();
                    nice.play();
                    clap.play();
                    game.textLevel = 2;
                    _this.level = 2;
                    game.level = 2;
                    setTimeout(function () {
                        gameOver = true;
                        c.clearRect(0, 0, canvasWidth, canvas.height);
                        gameLooping = true;
                        mainMenu();
                    }, 4000);
                    return;
                }
                console.log(_this.level);
            }
            if (_this.level === 1 || _this.level === 2)
                return;
            var playerHitboxX = player.hitbox.position.x + player.hitbox.width;
            var canvasWidth = canvas.width;
            // Check if the player's hitbox position is within the boundaries of the map
            if (playerHitboxX < 2048) {
                if (playerHitboxX <= canvasWidth / 2) {
                    // Move the player
                    player.velocity.x = 0.2 * deltaTime;
                }
                else {
                    // Move the camera and collider blocks in the opposite direction of the player's hitbox position
                    // Set the player's velocity to 0 when the player's position is greater than 32
                    var movement_1 = playerHitboxX >= canvasWidth / 2 ? 0.2 : 0;
                    if (Math.abs(camera.position.x) >
                        newColliderData[0].length * 32 - canvasWidth) {
                        player.velocity.x = 0.2 * deltaTime * _this.browserFrame;
                        movement_1 = 0;
                    }
                    camera.position.x -= movement_1 * deltaTime * _this.browserFrame;
                    console.log(_this.browserFrame);
                    colliderBlocks.forEach(function (collider) {
                        collider.position.x -=
                            movement_1 * deltaTime * _this.browserFrame;
                    });
                    // player2.position.x -= movement * deltaTime * this.browserFrame;
                }
            }
        };
        _this.shouldPlatformMoveRight = function (deltaTime) {
            var playerHitboxX = player.hitbox.position.x;
            var canvasWidth = canvas.width;
            // Check if the player's hitbox position is within the boundaries of the map
            var movement = 0;
            player.velocity.x = -0.2 * deltaTime * _this.browserFrame;
            if (playerHitboxX > 0) {
                // Check if the player's hitbox position is within the range where the player can move left
                // Move the camera and collider blocks instead
                if (player.hitbox.position.x <= canvas.width / 2) {
                    player.velocity.x = 0;
                    movement = 0.2;
                    if (camera.position.x > 0) {
                        movement = 0;
                        player.velocity.x = -0.2 * deltaTime * _this.browserFrame;
                    }
                }
            }
            camera.position.x += movement * deltaTime * _this.browserFrame;
            colliderBlocks.forEach(function (collider) {
                collider.position.x += movement * deltaTime * _this.browserFrame;
            });
            // player2.position.x += movement * deltaTime * this.browserFrame;
        };
        _this.typeOfPlayer = params.typeOfPlayer;
        _this.counter = 5;
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
        _this.browserFrame = browserName === "Safari" ? 3.42 : 1;
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
    // enemyAIMovement() {
    //     // check horizontal distance between player and AI
    //     if (
    //         player.hitbox.position.x < player2.hitbox.position.x &&
    //         !player2.playerIsDeath
    //     ) {
    //         player2.velocity.x = -0.2; // move left
    //     } else if (player.hitbox.position.x > player2.hitbox.position.x) {
    //         player2.velocity.x = 0.2; // move right
    //     } else {
    //         player2.velocity.x = 0; // don't move horizontally
    //     }
    //     // check if the player is within a certain distance of the AI on the x-axis
    //     const xDistance = Math.abs(
    //         player.hitbox.position.x - player2.hitbox.position.x
    //     );
    //     // check vertical distance between player and AI
    //     if (player.hitbox.position.y < player2.hitbox.position.y) {
    //         if (player2.numberOfJumps < 1 && player2.velocity.y < 0.5) {
    //             jumpMusic.play();
    //             player2.velocity.y = -4;
    //             player2.numberOfJumps++; // 0 dı 1 oldu zıpladı
    //         }
    //         player2.keys.space.pressed = false; // Ignore further jump inputs
    //     }
    //     // check if the player is within a certain distance of the AI on the y-axis
    //     const yDistance = Math.abs(
    //         player.hitbox.position.y - player2.hitbox.position.y
    //     );
    //     // check for collision between player and AI hitboxes
    // }
    Player.prototype.checkCollision = function (hitbox1, hitbox2) {
        // check if hitboxes overlap
        return (hitbox1.position.x < hitbox2.position.x + hitbox2.width &&
            hitbox1.position.x + hitbox1.width > hitbox2.position.x &&
            hitbox1.position.y < hitbox2.position.y + hitbox2.height &&
            hitbox1.position.y + hitbox1.height > hitbox2.position.y);
    };
    /*
        Update function of Player Class is most vital function it calculates every step of the gameLoop for the player
        When you call this function from an instance of this class it sorts the processes of the other functions related
        to the this class and players.
        Ex: this function apply gravity to the player after gravity applied checks for HorizontalCollisions and again updates
        player's hitbox then we check vertical collisions if player on ground or still falling.
    */
    Player.prototype.update = function (deltaTime) {
        this.updateFrames();
        this.updateHitbox();
        //IMAGE LAYOUT
        c.fillStyle = "transparent";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        //CHARACTER LAYOUT
        c.fillStyle = "transparent";
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        if (this.image.src.split("game/")[1] === "Sprites/Player/DeathLeft.png")
            _super.prototype.draw2.call(this, this.counter);
        else {
            this.draw();
        }
        player.position.x += player.velocity.x;
        this.updateHitbox();
        this.applyGravity(deltaTime);
        this.checkForHorizontalCollisions();
        this.updateHitbox();
        this.checkVerticalCollisions();
    };
    Player.prototype.applyGravity = function (deltaTime) {
        this.velocity.y += gravity * deltaTime;
        this.position.y += this.velocity.y;
    };
    /*Vertical and Horizontal Collision functions we call in update function of this class
      calls this.checkCollision function which is collision detector. Since we have boxes array
      to manipulate and draw ground blocks to the screen it compares player dimensions(Right,Left,Top,Bottom)
      checks the position of them, Ex: if bottom of the player touches top of the boxes which means
      player on top of a box since this called in everyframe we are having a collision so we can keep the behaviour of it.
      */
    Player.prototype.checkForHorizontalCollisions = function () {
        for (var i = 0; i < this.collisionblocks.length; i++) {
            var collisionBlock = this.collisionblocks[i];
            //s
            if (this.checkCollision(collisionBlock, this.hitbox)) {
                if ((this.keys.d.pressed && !this.playerIsDeath) ||
                    (this.velocity.x > 0 && !this.playerIsDeath)) {
                    this.velocity.x = 0;
                    var offset = this.hitbox.position.x -
                        this.position.x +
                        this.hitbox.width;
                    this.position.x = collisionBlock.position.x - offset - 0.1;
                    break;
                }
                if ((this.keys.a.pressed && !this.playerIsDeath) ||
                    (this.velocity.x < 0 && !this.playerIsDeath)) {
                    this.velocity.x = 0;
                    var offset = this.hitbox.position.x - this.position.x;
                    this.position.x =
                        collisionBlock.position.x +
                            collisionBlock.width -
                            offset +
                            0.1;
                    break;
                }
            }
        }
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
                        _this.position.y = block.position.y - offset;
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
    /*
    updateFrames function controls the sprite's update rate on different images(spritesheet)
        we control SpriteClass image feature for the current image given from subclass to
        the Parent class. And calculate proper frames update for animations
    */
    Player.prototype.updateFrames = function () {
        this.elapsedFrames++;
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.image.src.split("game/")[1] ===
                "Sprites/Player/Attack1Left.png" ||
                this.image.src.split("game/")[1] ===
                    "Sprites/Player/Attack3Left.png" ||
                this.image.src.split("game/")[1] ===
                    "Sprites/Player/Attack2Left.png") {
                this.currentFrame--;
                if (this.currentFrame < 0) {
                    this.currentFrame = 3;
                }
                if (this.currentFrame === 0) {
                    this.playerAttack = false;
                }
            }
            else if (this.image.src.split("game/")[1] ===
                "Sprites/Player/RunLeft.png") {
                this.currentFrame--;
                if (this.currentFrame < 0) {
                    this.currentFrame = 7;
                }
            }
            else if (this.image.src.split("game/")[1] ===
                "Sprites/Player/DeathLeft.png") {
                this.counter--;
                if (this.counter === 0) {
                    this.deathAnimationPlayed = true;
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
                        this.currentFrame === this.frameRate) ||
                    (this.image.src.split("game/")[1] ===
                        "Sprites/Enemy/DeathLeft.png" &&
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
    //This is swapping sprites for example player starts gain velocity at x axis game swap player's Idle sprite to the Run sprite
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