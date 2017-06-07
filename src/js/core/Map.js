import GLOBALS from '../core/Globals';

export default class Map {
  constructor(game, options) {
    this.game = game;
    this.tilemap = this.game.add.tilemap(GLOBALS.MAPS.FOREST_BOTTOM_LEFT);

    const gameWidth = this.tilemap.widthInPixels;
	  const	gameHeight = this.tilemap.heightInPixels;

	  this.game.world.setBounds(0, 0, gameWidth, gameHeight);

    this.tilemap.addTilesetImage('sprites_background_32x32_v3', 'sprites_background_32x32_v3');

    this.groundLayer = this.tilemap.createLayer('Ground');
    this.groundOverlapLayer = this.tilemap.createLayer('Ground_overlap');
    this.collideLayer = this.tilemap.createLayer('Collide');

    this.tilemap.currentLayer = 3;

    this.tilemap.setCollisionBetween(1, 10000, true, this.collideLayer);
  }

  renderLastLayer() {
    this.passLayer = this.tilemap.createLayer('Pass');
    this.groundLayer.resizeWorld();
    this.groundOverlapLayer.resizeWorld();
    this.collideLayer.resizeWorld();
    this.passLayer.resizeWorld();
  }
}
