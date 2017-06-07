import GLOBALS from '../core/Globals';

export default class Character extends Phaser.Sprite {
	constructor(game, x, y, sprite) {
		super(game, x, y, sprite);

    console.log(arguments)

    this.anchor.setTo(0.5, 0.5);

    this.lastDirection = GLOBALS.DIRECTIONS.DOWN;

    this.speed = 200;

    this.frame = 0;
    this.alive = true;

    this.create();
	}

  create() {
    console.log('hey')

		this.game.add.existing(this);
	  this.game.physics.arcade.enable(this);
	  this.body.collideWorldBounds = true;

    this.game.camera.follow(this);

	  this.setupAnimations();
	}

  update() {
    this.handleWalking();
	}

  handleWalking() {
	  let direction;

    if(this.attacking) {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      return;
    }

    const left = this.game.input.keyboard.isDown(Phaser.Keyboard.A);
    const right = this.game.input.keyboard.isDown(Phaser.Keyboard.D);
    const up = this.game.input.keyboard.isDown(Phaser.Keyboard.W);
    const down = this.game.input.keyboard.isDown(Phaser.Keyboard.S);

		if (left) {
	    direction = GLOBALS.DIRECTIONS.LEFT;
	  } else if (right) {
	    direction = GLOBALS.DIRECTIONS.RIGHT;
	  } else if (up) {
	    direction = GLOBALS.DIRECTIONS.UP;
	  } else if (down) {
	    direction = GLOBALS.DIRECTIONS.DOWN;
	  } else {
	    direction = GLOBALS.DIRECTIONS.STOP;
	  }

    if(!this.receivingAttack) {
		  this.walk(direction);
    }
	}

	setupAnimations() {
    this.animations.add('dead', [0, 1, 2], 3, true);
    this.animations.add(GLOBALS.DIRECTIONS.DOWN, [0, 1, 2], 10, false);
    this.animations.add(GLOBALS.DIRECTIONS.RIGHT, [3, 4, 5], 10, false);
    this.animations.add(GLOBALS.DIRECTIONS.UP, [6, 7, 8], 10, false);
    this.animations.add(GLOBALS.DIRECTIONS.LEFT, [9, 10, 11], 10, false);
  }

  walk(direction) {
    switch(direction){
      case GLOBALS.DIRECTIONS.DOWN:
        this.lastFrame = 0;
        this.lastDirection = GLOBALS.DIRECTIONS.DOWN;
        this.body.velocity.y = this.speed;
        this.body.velocity.x = 0;
        break;

      case GLOBALS.DIRECTIONS.RIGHT:
        this.lastFrame = 3;
        this.lastDirection = GLOBALS.DIRECTIONS.RIGHT;
        this.body.velocity.y = 0;
        this.body.velocity.x = this.speed;
        break;

      case GLOBALS.DIRECTIONS.UP:
        this.lastFrame = 6;
        this.lastDirection = GLOBALS.DIRECTIONS.UP;
        this.body.velocity.y = -this.speed;
        this.body.velocity.x = 0;
        break;

      case GLOBALS.DIRECTIONS.LEFT:
        this.lastFrame = 9;
        this.lastDirection = GLOBALS.DIRECTIONS.LEFT;
        this.body.velocity.x = -this.speed;
        this.body.velocity.y = 0;
        break;

      case GLOBALS.DIRECTIONS.STOP:
        if(!this.attacking) {
          this.body.velocity.x = 0;
          this.body.velocity.y = 0;
          this.frame = this.lastFrame;
          this.animations.stop();
        }

        break;
    }

    this.animations.play(direction);
  }
}
