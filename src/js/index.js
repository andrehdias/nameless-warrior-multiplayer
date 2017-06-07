import StartGame from 'game/StartGame';

class Main {
	constructor() {
    new StartGame();
	}
}

$(document).ready(() => {
	new Main();
})
