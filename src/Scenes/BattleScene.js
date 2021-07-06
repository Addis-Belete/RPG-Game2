import 'phaser';
import { Enemy } from './Menu/Enemy';
import { PlayerCharacter } from './Menu/PlayerCharacter';
import { getPlayerScore, updateScoreText } from '../Score/Score';
export default class BattleScene extends Phaser.Scene {
	constructor() {
		super('Battle');
	}
	preload() {


	}


	create() {
		let scoreText = this.add.text(16, 16, `score: ${getPlayerScore()}`, {
			fontSize: '16px',
			fill: '#fff',
		});
		updateScoreText(scoreText);
		this.add.rectangle(410, 300, 400, 350, 0x000000).setAlpha(0.9);
		// change the background to green
		this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");
		this.startBattle();
		// on wake event we call startBattle too
		this.sys.events.on('wake', this.startBattle, this);
	}
	startBattle() {
		// player character - warrior
		let warrior = new PlayerCharacter(this, 250, 50, "player", 1, "Warrior", 100, 20);
		this.add.existing(warrior);
		this.warriorHealthBar = this.makeHealthBar(480, 220, 0x2ecc71);
		this.setHealthBarValue(this.warriorHealthBar, 100);

		// player character - mage
		let mage = new PlayerCharacter(this, 250, 100, "player", 4, "Mage", 80, 8);
		this.add.existing(mage);
		this.mageHealthBar = this.makeHealthBar(480, 270, 0x2ecc71);
		this.setHealthBarValue(this.mageHealthBar, 100);

		let dragonblue = new Enemy(this, 50, 50, "dragonblue", null, "Dragon", 50, 3);
		this.add.existing(dragonblue);
		this.dragonBlueHealthBar = this.makeHealthBar(260, 220, 0x2ecc71);
		this.setHealthBarValue(this.dragonBlueHealthBar, 100);

		let dragonOrange = new Enemy(this, 50, 100, "dragonorrange", null, "Dragon2", 50, 3);
		this.add.existing(dragonOrange);
		this.dragonOrangeHealthBar = this.makeHealthBar(260, 270, 0x2ecc71);
		this.setHealthBarValue(this.dragonOrangeHealthBar, 100);

		// array with heroes
		this.heroes = [warrior, mage];
		// array with enemies
		this.enemies = [dragonblue, dragonOrange];
		// array with both parties, who will attack
		this.units = this.heroes.concat(this.enemies);

		this.index = -1; // currently active unit

		this.scene.run("UIScene");
	}
	nextTurn() {
		// if we have victory or game over
		if (this.checkEndBattle()) {
			this.endBattle();
			return;
		}
		do {
			this.setHealthBarValue(this.warriorHealthBar, warrior.hp);
			this.setHealthBarValue(this.mageHealthBar, mage.hp);
			this.setHealthBarValue(this.dragonBlueHealthBar, dragonBlue.hp);
			this.setHealthBarValue(this.dragonOrangeHealthBar, dragonOrange.hp);
			// currently active unit
			this.index++;
			// if there are no more units, we start again from the first one
			if (this.index >= this.units.length) {
				this.index = 0;
			}
		} while (!this.units[this.index].living);
		// if its player hero
		if (this.units[this.index] instanceof PlayerCharacter) {
			// we need the player to select action and then enemy
			this.events.emit("PlayerSelect", this.index);
		} else { // else if its enemy unit
			// pick random living hero to be attacked
			let r;
			do {
				r = Math.floor(Math.random() * this.heroes.length);
			} while (!this.heroes[r].living)
			// call the enemy's attack function 
			this.units[this.index].attack(this.heroes[r]);
			// add timer for the next turn, so will have smooth gameplay
			this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
		}
	}
	// check for game over or victory
	checkEndBattle() {
		let victory = true;
		// if all enemies are dead we have victory
		for (let i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i].living)
				victory = false;
		}
		let gameOver = true;
		// if all heroes are dead we have game over
		for (let i = 0; i < this.heroes.length; i++) {
			if (this.heroes[i].living)
				gameOver = false;
		}
		return victory || gameOver;
	}
	// when the player have selected the enemy to be attacked
	receivePlayerSelection(action, target) {
		if (action == "attack") {
			this.units[this.index].attack(this.enemies[target]);
		}
		// next turn in 3 seconds
		this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
	}
	endBattle() {
		// clear state, remove sprites
		this.heroes.length = 0;
		this.enemies.length = 0;
		for (let i = 0; i < this.units.length; i++) {
			// link item
			this.units[i].destroy();
		}
		this.units.length = 0;
		// sleep the UI
		this.scene.sleep('UIScene');
		// return to WorldScene and sleep current BattleScene
		this.scene.switch('WorldScene');
	}
	makeHealthBar(x, y, color) {
		// draw the bar
		const bar = this.add.graphics();

		// color the bar
		bar.fillStyle(color, 1);

		// fill the bar with a rectangle
		bar.fillRect(0, 0, 100, 10);

		// position the bar
		bar.x = x;
		bar.y = y;

		// return the bar
		return bar;
	}
	setHealthBarValue(bar, percentage) {
		// scale the bar
		bar.scaleX = percentage / 100;
	},
}