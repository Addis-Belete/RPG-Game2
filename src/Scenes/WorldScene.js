/* eslint-disable import/no-extraneous-dependencies */
import Phaser from 'phaser';
import { getPlayerScore, updateScoreText } from '../Score/Score';
import Button from '../Objects/Button';

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super('World');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('spritesheet', 'tiles');

    map.createStaticLayer('Grass', tiles, 0, 0);
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);
    this.add.rectangle(20, 10, 1600, 35, 0x000000).setAlpha(1);
    // Display Score
    const scoreText = this.add.text(16, 5, `score: ${getPlayerScore()}`, {
      fontSize: '16px',
      fill: '#fff',
    });
    updateScoreText(scoreText);
    // Exit Game Button
    this.exitGameButton = new Button(
      this,
      740,
      13,
      'blueButton1',
      'blueButton2',
      'Exit',
      'HighScoreScene',
      16,
    );

    this.player = this.physics.add.sprite(70, 50, 'player', 6);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;
    //  animation with key 'left', we don't need left and right as we will
    // use one and flip the sprite
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1,
    });

    // animation with key 'right'
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 6, 0, 12] }),
      frameRate: 10,
      repeat: -1,
    });
    this.physics.add.collider(this.player, obstacles);
    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    for (let i = 0; i < 30; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // parameters are x, y, width, height
      this.spawns.create(x, y, 20, 20);
    }
    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
    this.sys.events.on('wake', this.wake, this);
  }

  update() {
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }
    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }
  }

  onMeetEnemy(player, zone) {
    // we move the zone to some other location
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // shake the world
    this.cameras.main.shake(300);

    this.scene.switch('BattleScene');
  }

  exitBattle() {
    this.scene.sleep('UIScene');
    this.scene.switch('World');
  }

  wake() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  }
}