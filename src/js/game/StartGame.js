import * as states from '../states';

export default class StartGame {
	constructor() {
		const sizes = { w: 980, h: 470 };

		this.game = new Phaser.Game(sizes.w, sizes.h, Phaser.AUTO, 'phaser', null, false, false);

		Object.keys(states).forEach(state => this.game.state.add(state, states[state]));

		this.game.state.start('Boot');
	}
}
