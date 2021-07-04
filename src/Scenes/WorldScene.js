const WorldScene = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

		function WorldScene() {
			Phaser.Scene.call(this, { key: 'WorldScene' });
		},
	preload: function () {

	},
	create: function () {
		const map = this.make.tilemap({ key: 'map' });
		const tiles = map.addTilesetImage('spritesheet', 'tiles');

		const grass = map.createStaticLayer('Grass', tiles, 0, 0);
		const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
		obstacles.setCollisionByExclusion([-1]);
	}
});