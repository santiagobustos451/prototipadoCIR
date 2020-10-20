var boton;
var s_click;
var b_flechaIzq;
var b_flechaDer;
var cam;
var F_cam = 0;

class ayuda extends Phaser.Scene {
  constructor() {
    super({ key: "ayuda" });
  }

  create() {
    let center_width = this.sys.game.config.width / 2;
    let center_height = this.sys.game.config.height / 2;

    this.cameras.main.setBounds(0, 0, 2400, 800);
    cam = this.cameras.main;
    cam.pan(0, 0, 0);

    s_click = this.sound.add("s_click");

    this.anims.create({
      key: "armadotutgif",
      frames: this.anims.generateFrameNumbers("tutArmado", {
        start: 0,
        end: 158,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "cocinadotutgif",
      frames: this.anims.generateFrameNumbers("tutCocinado", {
        start: 0,
        end: 128,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "lavadotutgif",
      frames: this.anims.generateFrameNumbers("tutLavado", {
        start: 0,
        end: 35,
      }),
      frameRate: 10,
      repeat: -1,
    });
    var gif1 = this.add
      .sprite(center_width, center_height - 65)
      .setDepth(99)
      .setScale(1.2)
      .anims.play("cocinadotutgif");
    var gif2 = this.add
      .sprite(center_width + 800, center_height - 65)
      .setDepth(99)
      .setScale(1.2)
      .anims.play("armadotutgif");
    var gif3 = this.add
      .sprite(center_width + 1600, center_height - 65)
      .setDepth(99)
      .setScale(1.2)
      .anims.play("lavadotutgif");
    var text1 = this.add
      .sprite(center_width, center_height + 250, "tutTexto")
      .setFrame(0)
      .setDepth(1001)
      .setScale(1.2);
    var text2 = this.add
      .sprite(center_width + 800, center_height + 250, "tutTexto")
      .setFrame(1)
      .setDepth(1001)
      .setScale(1.2);
    var text3 = this.add
      .sprite(center_width + 1600, center_height + 250, "tutTexto")
      .setFrame(2)
      .setDepth(1001)
      .setScale(1.2);

    this.add
      .image(center_width, center_height, "bg_tutorial")
      .setScrollFactor(0);

    boton = this.add
      .sprite(center_width, 750, "b_volver")
      .setInteractive()
      .setScrollFactor(0)
      .on(
        "pointerup",
        function () {
          cam.pan(0, 0, 0);
          F_cam = 0;
          b_flechaDer.clearTint();
          b_flechaIzq.setTint("0x959595");
          s_click.play();
          console.log("From menu to game");
          this.scene.switch("mainmenu");
        },
        this
      );

    b_flechaDer = this.add
      .image(center_width + 350, center_height - 65, "b_flechader")
      .setScrollFactor(0)
      .setInteractive()
      .setScale(0.1)
      .setDepth(1000)
      .on("pointerup", function () {
        s_click.play();
        if (F_cam == 0) {
          cam.pan(1200, 0, 100);
          F_cam += 1;
          console.log(F_cam);
        } else if (F_cam == 1) {
          cam.pan(2400, 0, 100);
          F_cam += 1;
          console.log(F_cam);
        }
        if (F_cam == 2) {
          this.setTint("0x959595");
        } else {
          this.clearTint();
        }
        b_flechaIzq.clearTint();
      });
    b_flechaIzq = this.add
      .image(center_width - 350, center_height - 65, "b_flechaizq")
      .setTint("0x959595")
      .setScrollFactor(0)
      .setInteractive()
      .setScale(0.1)
      .setDepth(1000)
      .on("pointerup", function () {
        s_click.play();
        if (F_cam == 2) {
          cam.pan(1200, 0, 100);
          F_cam -= 1;
          console.log(F_cam);
        } else if (F_cam == 1) {
          cam.pan(0, 0, 100);
          F_cam -= 1;
          console.log(F_cam);
        }
        if (F_cam == 0) {
          this.setTint("0x959595");
        } else {
          this.clearTint();
        }
        b_flechaDer.clearTint();
      });
  }
}

export default ayuda;
