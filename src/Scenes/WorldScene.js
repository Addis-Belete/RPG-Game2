
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
		this.cursors = this.input.keyboard.createCursorKeys();
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.startFollow(this.player);
		this.cameras.main.roundPixels = true;

	}
	update(time, delta) {
		this.player.body.setVelocity(0);

		// Horizontal movement
		if (this.cursors.left.isDown) {
			this.player.body.setVelocityX(-80);
		}
		else if (this.cursors.right.isDown) {
			this.player.body.setVelocityX(80);
		}

		// Vertical movement
		if (this.cursors.up.isDown) {
			this.player.body.setVelocityY(-80);
		}
		else if (this.cursors.down.isDown) {
			this.player.body.setVelocityY(80);
		}
	}
};