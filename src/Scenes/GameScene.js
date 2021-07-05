import 'phaser';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('Game');
	}



	create() {
		this.scene.start('World');
	}
};
