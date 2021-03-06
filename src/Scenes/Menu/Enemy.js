/* eslint-disable import/prefer-default-export,
import/no-extraneous-dependencies  */
import Phaser from 'phaser';
import { Unit } from './Unit';

const Enemy = new Phaser.Class({
  Extends: Unit,
  initialize: function Enemy(scene, x, y, texture, frame, type, hp, damage) {
    Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
  },
});
export { Enemy };