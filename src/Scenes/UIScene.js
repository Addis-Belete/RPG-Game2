import 'phaser';
import { HeroesMenu, EnemiesMenu, ActionsMenu } from './Menu/HeroesMenu';
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
	}
	remapHeroes() {

		const heroes = this.battleScene.heroes;
		this.heroesMenu.remap(heroes);
	}
	remapEnemies() {
		const enemies = this.battleScene.enemies;
		this.enemiesMenu.remap(enemies);
	}
};