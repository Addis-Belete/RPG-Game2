import 'phaser';
import { HeroesMenu, EnemiesMenu, ActionsMenu } from './Menu/HeroesMenu';
import Message from './Message';
export default class UIScene extends Phaser.Scene {
	constructor() {
		super('UIScene');
	}



	create() {
		this.graphics = this.add.graphics();
		this.graphics.lineStyle(1, 0xffffff);
		this.graphics.fillStyle(0x031f4c, 1);
		this.graphics.strokeRect(2, 150, 90, 100);
		this.graphics.fillRect(2, 150, 90, 100);
		this.graphics.strokeRect(95, 150, 90, 100);
		this.graphics.fillRect(95, 150, 90, 100);
		this.graphics.strokeRect(188, 150, 130, 100);
		this.graphics.fillRect(188, 150, 130, 100);
		this.menus = this.add.container();

		this.heroesMenu = new HeroesMenu(195, 153, this);
		this.actionsMenu = new ActionsMenu(100, 153, this);
		this.enemiesMenu = new EnemiesMenu(8, 153, this);

		// the currently selected menu 
		this.currentMenu = this.actionsMenu;

		// add menus to the container
		this.menus.add(this.heroesMenu);
		this.menus.add(this.actionsMenu);
		this.menus.add(this.enemiesMenu);
		this.battleScene = this.scene.get('Battle');

		this.remapHeroes();
		this.remapEnemies();
		this.input.keyboard.on('keydown', this.onKeyInput, this);
		this.index = -1;
		this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);
		this.events.on("SelectEnemies", this.onSelectEnemies, this);
		this.events.on("Enemy", this.onEnemy, this);
		this.battleScene.nextTurn();
		this.message = new Message(this, this.battleScene.events);
		this.add.existing(this.message);
	}
	onEnemy(index) {
		this.heroesMenu.deselect();
		this.actionsMenu.deselect();
		this.enemiesMenu.deselect();
		this.currentMenu = null;
		this.battleScene.receivePlayerSelection('attack', index);

	}
	onSelectEnemies() {
		this.currentMenu = this.enemiesMenu;
		this.enemiesMenu.select(0);
	}
	onPlayerSelect(id) {
		this.heroesMenu.select(id);
		this.actionsMenu.select(0);
		this.currentMenu = this.actionsMenu;
	}
	remapHeroes() {

		const heroes = this.battleScene.heroes;
		this.heroesMenu.remap(heroes);
	}
	remapEnemies() {
		const enemies = this.battleScene.enemies;
		this.enemiesMenu.remap(enemies);
	}
	onKeyInput(event) {
		if (this.currentMenu) {
			if (event.code === "ArrowUp") {
				this.currentMenu.moveSelectionUp();
			} else if (event.code === "ArrowDown") {
				this.currentMenu.moveSelectionDown();
			} else if (event.code === "ArrowRight" || event.code === "Shift") {

			} else if (event.code === "Space" || event.code === "ArrowLeft") {
				this.currentMenu.confirm();
			}
		}
	}
};