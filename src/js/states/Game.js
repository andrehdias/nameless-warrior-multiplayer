import Map from '../core/Map';
import Player from '../core/Player';
import GLOBALS from '../core/Globals';

export default class Game extends Phaser.State {
	create() {
    this.game.time.advancedTiming = true;
    this.map = new Map(this.game);
    this.player = new Player(this.game, 50, 50, GLOBALS.SWORDSMAN);
    this.map.renderLastLayer();
	}

  update() {
    this.game.physics.arcade.collide(this.player, this.map.collideLayer);
    this.game.physics.arcade.collide(this.player, this.map.groundLayer);
  }

  render() {
    this.game.debug.text('fps: '+this.game.time.fps || '--', 35, 20, "#fff");
  }
}
