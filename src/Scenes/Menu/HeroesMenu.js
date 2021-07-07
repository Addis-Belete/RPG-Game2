/* eslint-disable import/prefer-default-export */
import Phaser from 'phaser';
import { Menu } from './Menu';

const HeroesMenu = new Phaser.Class({
  Extends: Menu,
  initialize: function HeroesMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
  },
});

const ActionsMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function ActionsMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
    this.addMenuItem('Attack');
  },
  confirm() {
    this.scene.events.emit('SelectedAction');
  },
});
const EnemiesMenu = new Phaser.Class({
  Extends: Menu,
  initialize: function EnemiesMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
  },
  confirm() {
    // do something when the player selects an enemy
    this.scene.events.emit('Enemy', this.menuItemIndex);
  },
});

export { HeroesMenu, EnemiesMenu, ActionsMenu };