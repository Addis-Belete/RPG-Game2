import 'phaser';
import { Enemy } from './Menu/Enemy';
import { PlayerCharacter } from './Menu/PlayerCharacter';
export default class BattleScene extends Phaser.Scene {
	constructor() {
		super('Battle');
	}

	receivePlayerSelection(action, target) {
		if (action == "attack") {
			this.units[this.index].attack(this.enemies[target]);
		}
		// next turn in 3 seconds
		this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
	}

	create() {
		// change the background to green
		this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

		// player character - warrior
		const warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
		this.add.existing(warrior);

		// player character - mage
		const mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);
		this.add.existing(mage);

		const dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 3);
		this.add.existing(dragonblue);

		const dragonOrange = new Enemy(this, 50, 100, 'dragonorrange', null, 'Dragon2', 50, 3);
		this.add.existing(dragonOrange);

		// array with heroes
		this.heroes = [warrior, mage];
		// array with enemies
		this.enemies = [dragonblue, dragonOrange];
		// array with both parties, who will attack
		this.units = this.heroes.concat(this.enemies);

		// Run UI Scene at the same time
		this.scene.launch('UIScene');
	}
	nextTurn() {
		this.index++;
		// if there are no more units, we start again from the first one
		if (this.index >= this.units.length) {
			this.index = 0;
		}
		if (this.units[this.index]) {
			// if its player hero
			if (this.units[this.index] instanceof PlayerCharacter) {
				this.events.emit('PlayerSelect', this.index);
			} else { // else if its enemy unit
				// pick random hero
				const r = Math.floor(Math.random() * this.heroes.length);
				// call the enemy's attack function 
				this.units[this.index].attack(this.heroes[r]);

				this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
			}
		}
	}

};