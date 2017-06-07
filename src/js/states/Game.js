import Map from '../core/Map';
import Player from '../core/Player';
import GLOBALS from '../core/Globals';

export default class Game extends Phaser.State {
	create() {
    this.game.time.advancedTiming = true;
    this.game.stage.disableVisibilityChange = true;
    this.map = new Map(this.game);

    this.server = io.connect();

    this.server.emit('newplayer');

    this.bind();
	}

  bind() {
    this.server.on('newplayer',function(data){
      this.player = new Player(this.game, data.x, data.y, GLOBALS.SWORDSMAN);
      this.map.renderLastLayer();
    });
  }

  update() {
    if(this.player) {
      this.game.physics.arcade.collide(this.player, this.map.collideLayer);
      this.game.physics.arcade.collide(this.player, this.map.groundLayer);
    }
  }

  render() {
    this.game.debug.text('fps: '+this.game.time.fps || '--', 35, 20, "#fff");
  }
}
