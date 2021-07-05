
import 'phaser';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('World');
	}

	preload() {

	}

	create() {
		const map = this.make.tilemap({ key: 'map' });
		const tiles = map.addTilesetImage('spritesheet', 'tiles');

		const grass = map.createStaticLayer('Grass', tiles, 0, 0);
		const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
		obstacles.setCollisionByExclusion([-1]);
		this.player = this.physics.add.sprite(50, 100, 'player', 6);
		this.physics.world.bounds.width = map.widthInPixels;
		this.physics.world.bounds.height = map.heightInPixels;
		this.player.setCollideWorldBounds(true);

	}
};