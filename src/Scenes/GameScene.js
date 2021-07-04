import 'phaser';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('Game');
	}

	preload() {
		// load images
		this.load.image('logos', 'assets/logo.png');
		this.load.image('game', 'assets/game_logo.png')
	}

	create() {
		this.add.image(400, 300, 'logos');
	}
};
