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

    anim = this.add
      .video(center_width, center_height, "v_unraf")
      .setVolume(0)
      .play(false);

    timer = this.time.addEvent({
      delay: 4000,
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
