import 'phaser';

export default {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
	height: 600,
	zoom: 2,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	}
};