import GLOBALS from '../core/Globals';

export default class Boot extends Phaser.State {
	preload() {
    //Player
		this.game.load.spritesheet('SwordsMan', 'img/classes/swordman_walk.png', 32, 32);
		this.game.load.spritesheet('SwordsMan_attack', 'img/classes/swordman_attack.png', 64, 64);
		this.game.load.spritesheet('SwordsMan_sleep', 'img/classes/swordman_sleep.png', 64, 64);
		this.game.load.spritesheet('SwordsMan_dead', 'img/classes/swordman_dead.png', 64, 64);

		this.game.load.spritesheet('Archer', 'img/classes/archer_walk.png', 32, 32);
		this.game.load.spritesheet('Archer_attack', 'img/classes/archer_attack.png', 64, 64);
		this.game.load.spritesheet('Archer_sleep', 'img/classes/archer_sleep.png', 64, 64);
		this.game.load.spritesheet('Archer_dead', 'img/classes/archer_dead.png', 64, 64);

		this.game.load.spritesheet('Mage', 'img/classes/mage_walk.png', 32, 32);
		this.game.load.spritesheet('Mage_sleep', 'img/classes/mage_sleep.png', 64, 64);


    //Maps
    this.game.load.tilemap(GLOBALS.MAPS.FOREST_BOTTOM_LEFT, 'tiles/forest_bottom_left.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('sprites_background_32x32_v3', 'tiles/sprites_background_32x32_v3.png');
	}

	create() {
    this.game.state.start('Game');
	}
}
