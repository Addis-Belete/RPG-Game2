import Phaser from 'phaser';
import { setPlayerName } from '../Score/Name';

export default class NameInputScene extends Phaser.Scene {
  constructor() {
    super('NameInput');
  }

  preload() {
    this.load.html('form', 'assets/form.html');
  }

  create() {
    this.nameInput = this.add.dom(400, 320).createFromCache('form');
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.message = this.add
      .text(400, 250, 'Input Your Name & Hit ENTER', {
        color: '#FFFFFF',
        fontSize: 30,
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.returnKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );

    this.returnKey.on('down', () => {
      const name = this.nameInput.getChildByName('name').value;
      setPlayerName(name);
      this.scene.start('Boot');
    });
  }
}