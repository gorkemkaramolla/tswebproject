class Player extends Sprite {
  position: { x: number; y: number };
  collisionblocks: CollisionBlock[];
  velocity: { x: number; y: number };
  hitbox: {
    position: {
      x: number;
      y: number;
    };
    width: number;
    height: number;
  };
  constructor(params: {
    position: { x: number; y: number };
    colliderBlocks: CollisionBlock[];
    imgSrc: string;
    frameRate: number;
    scale: number;
  }) {
    super({
      position: params.position,
      imageSrc: params.imgSrc,
      frameRate: params.frameRate,
      scale: params.scale,
    });
    this.collisionblocks = colliderBlocks;
    this.position = params.position;
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  update() {
    this.updateFrames();
    this.updateHitbox();

    //IMAGE LAYOUT
    c.fillStyle = "rgba(255,255,255,0.3)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    //CHARACTER LAYOUT
    c.fillStyle = "rgba(25,222,1,0.5)";
    c.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    );
    this.draw();

    this.position.x += this.velocity.x;
    this.updateHitbox();

    this.checkHorizontalCollisions();

    this.applyGravity();
    this.updateHitbox();

    this.checkVerticalCollisions();
  }
  applyGravity() {
    this.position.y += this.velocity.y;
    this.velocity.y += gravity;
  }
  checkVerticalCollisions() {
    this.collisionblocks.map((block) => {
      if (collisionCheck(block, this.hitbox)) {
        console.log("you hit");
        game.keys.space.numberOfJumps = 0;
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          if (this.velocity.y === 0) {
            const offset =
              this.hitbox.position.y - this.position.y + this.hitbox.height;
            this.position.y = block.position.y - offset - 0.01;
            return;
          }
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          if (this.velocity.y === 0) {
            const offset = this.hitbox.position.y - this.position.y;
            this.position.y = block.position.y + offset + 0.01;
            return;
          }
        }
      }
    });
  }
  checkHorizontalCollisions() {
    this.collisionblocks.map((block) => {
      if (collisionCheck(block, this.hitbox)) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;

          this.position.x = block.position.x - offset - 0.01;
          return;
        }
        console.log(this.position.y);

        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          const offset = this.hitbox.position.x - this.position.x;

          this.position.x = block.position.x + block.width - offset + 0.01;
          return;
        }
      }
    });
  }
  updateHitbox() {
    this.hitbox.position.x = this.position.x + 35;
    this.hitbox.position.y = this.position.y + 26;
    this.hitbox.width = 14;

    this.hitbox.height = 27;
  }
  updateFrames() {
    this.elapsedFrames++;
    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }
}
