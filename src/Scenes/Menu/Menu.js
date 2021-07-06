import { MenuItem } from "./MenuItem";
const Menu = new Phaser.Class({
	Extends: Phaser.GameObjects.Container,

	initialize:

		function Menu(x, y, scene, heroes) {
			Phaser.GameObjects.Container.call(this, scene, x, y);
			this.menuItems = [];
			this.menuItemIndex = 0;
			this.heroes = heroes;
			this.x = x;
			this.y = y;
			this.selected = false;
		},
	addMenuItem: function (unit) {
		const menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
		this.menuItems.push(menuItem);
		this.add(menuItem);
		return menuItem;
	},
	moveSelectionUp: function () {
		this.menuItems[this.menuItemIndex].deselect();
		do {
			this.menuItemIndex--;
			if (this.menuItemIndex < 0) (this.menuItemIndex = this.menuItems.length - 1);
		}
		while (!this.menuItems[this.menuItemIndex].active);
		this.menuItems[this.menuItemIndex].select();
	},
	moveSelectionDown: function () {
		this.menuItems[this.menuItemIndex].deselect();
		do {
			this.menuItemIndex++;
			if (this.menuItemIndex >= this.menuItems.length)
				this.menuItemIndex = 0;
		}
		while (!this.menuItems[this.menuItemIndex].active);
		this.menuItems[this.menuItemIndex].select();
	},
	// select the menu as a whole and an element with index from it
	select: function (index) {
		if (!index)
			index = 0;
		this.menuItems[this.menuItemIndex].deselect();
		this.menuItemIndex = index;
		while (!this.menuItems[this.menuItemIndex].active) {
			this.menuItemIndex += 1;
			if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
			if (this.menuItemIndex === index) return;
		}
		this.menuItems[this.menuItemIndex].select();
		this.selected = true;
	},
	// deselect this menu
	deselect: function () {
		this.menuItems[this.menuItemIndex].deselect();
		this.menuItemIndex = 0;
		this.selected = false;
	},
	confirm: function () {
		// wen the player confirms his slection, do the action
	},
	clear: function () {
		for (let i = 0; i < this.menuItems.length; i++) {
			this.menuItems[i].destroy();
		}
		this.menuItems.length = 0;
		this.menuItemIndex = 0;
	},
	remap: function (units) {
		this.clear();
		for (let i = 0; i < units.length; i++) {
			const unit = units[i];
			unit.setMenuItem(this.addMenuItem(unit.type));
		}
		this.menuItemIndex = 0;
	}
});
export { Menu }