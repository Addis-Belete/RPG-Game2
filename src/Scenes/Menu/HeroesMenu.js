import { Menu } from "./Menu";
const HeroesMenu = new Phaser.Class({
	Extends: Menu,

	initialize:

		function HeroesMenu(x, y, scene) {
			Menu.call(this, x, y, scene);
		}
});

const ActionsMenu = new Phaser.Class({
	Extends: Menu,

	initialize:

		function ActionsMenu(x, y, scene) {
			Menu.call(this, x, y, scene);
			this.addMenuItem('Attack');
		},
	confirm: function () {
		// do something when the player selects an action
	}

});

const EnemiesMenu = new Phaser.Class({
	Extends: Menu,

	initialize:

		function EnemiesMenu(x, y, scene) {
			Menu.call(this, x, y, scene);
		},
	confirm: function () {
		// do something when the player selects an enemy
	}
});

export { HeroesMenu, EnemiesMenu, ActionsMenu }