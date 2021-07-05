import { Menu } from "./Menu";
const HeroesMenu = new Phaser.Class({
	Extends: Menu,

	initialize:

		function HeroesMenu(x, y, scene) {
			Menu.call(this, x, y, scene);
		}
});

let ActionsMenu = new Phaser.Class({
	Extends: Menu,

	initialize:

		function ActionsMenu(x, y, scene) {
			Menu.call(this, x, y, scene);
			this.addMenuItem("Attack");
		},
	confirm: function () {
		this.scene.events.emit("SelectEnemies");
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
		this.scene.events.emit("Enemy", this.menuItemIndex);
	}
});

export { HeroesMenu, EnemiesMenu, ActionsMenu }