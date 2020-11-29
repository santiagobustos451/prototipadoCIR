var camera;
var anim;
var timer;

class logounraf extends Phaser.Scene {
  constructor() {
    super({ key: "logounraf" });
  }

  create() {
    camera = this.cameras.add(0, 0, 800, 600);
    camera.setBackgroundColor("#ffffff");
    let center_width = this.sys.game.config.width / 2;
    let center_height = this.sys.game.config.height / 2;

    this.anims.create({
      key: "anim_unraf",
      frames: this.anims.generateFrameNumbers("Sp_unraf", {
        start: 0,
        end: 45,
      }),
      frameRate: 20,
    });
    anim = this.add.sprite(center_width, center_height, "Sp_unraf");
    anim.play("anim_unraf");

    timer = this.time.addEvent({
      delay: 3500,
      callback: this.changeScene,
      callbackScope: this,
      loop: false,
    });
  }
  changeScene() {
    this.scene.stop();
    this.scene.switch("mainmenu");
  }
}

export default logounraf;
