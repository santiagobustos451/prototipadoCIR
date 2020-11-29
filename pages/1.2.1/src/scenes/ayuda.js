var boton;
var s_click;
var b_flechaIzq;
var b_flechaDer;
var cam;
var F_cam = 0;
var v_lavado;
var v_cocinado;
var v_armado;

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

    v_lavado = this.add
      .video(center_width + 1600, center_height - 45, "v_lavado")
      .play(true)
      .setDepth(99)
      .setScale(0.5);
    v_cocinado = this.add
      .video(center_width, center_height - 45, "v_cocinado")
      .play(true)
      .setDepth(99)
      .setScale(0.5);
    v_armado = this.add
      .video(center_width + 800, center_height - 45, "v_armado")
      .play(true)
      .setDepth(99)
      .setScale(0.5);

    s_click = this.sound.add("s_click");

    if (localStorage.getItem("idioma") == "espanol") {
      var text1 = this.add
        .sprite(center_width, center_height + 150, "tutTexto")
        .setFrame(0)
        .setDepth(1001)
        .setScale(1);
      var text2 = this.add
        .sprite(center_width + 800, center_height + 150, "tutTexto")
        .setFrame(1)
        .setDepth(1001)
        .setScale(1);
      var text3 = this.add
        .sprite(center_width + 1600, center_height + 150, "tutTexto")
        .setFrame(2)
        .setDepth(1001)
        .setScale(1);

      this.add
        .image(center_width, center_height, "bg_tutorial")
        .setScrollFactor(0);

      boton = this.add
        .sprite(center_width, 550, "b_volver")
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
            this.scene.switch("mainmenu");
          },
          this
        );

      //
    } else if (localStorage.getItem("idioma") == "ingles") {
      var text1 = this.add
        .sprite(center_width, center_height + 150, "tutTextoEn")
        .setFrame(0)
        .setDepth(1001)
        .setScale(1);
      var text2 = this.add
        .sprite(center_width + 800, center_height + 150, "tutTextoEn")
        .setFrame(1)
        .setDepth(1001)
        .setScale(1);
      var text3 = this.add
        .sprite(center_width + 1600, center_height + 150, "tutTextoEn")
        .setFrame(2)
        .setDepth(1001)
        .setScale(1);

      this.add
        .image(center_width, center_height, "bg_tutorial")
        .setScrollFactor(0);

      boton = this.add
        .sprite(center_width, 550, "b_volver_en")
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
            this.scene.switch("mainmenu");
          },
          this
        );

      //
    } else if (localStorage.getItem("idioma") == "portugues") {
      var text1 = this.add
        .sprite(center_width, center_height + 150, "tutTextoPt")
        .setFrame(0)
        .setDepth(1001)
        .setScale(1);
      var text2 = this.add
        .sprite(center_width + 800, center_height + 150, "tutTextoPt")
        .setFrame(1)
        .setDepth(1001)
        .setScale(1);
      var text3 = this.add
        .sprite(center_width + 1600, center_height + 150, "tutTextoPt")
        .setFrame(2)
        .setDepth(1001)
        .setScale(1);

      this.add
        .image(center_width, center_height, "bg_tutorial")
        .setScrollFactor(0);

      boton = this.add
        .sprite(center_width, 550, "b_volver_pt")
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
            this.scene.switch("mainmenu");
          },
          this
        );
    }

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
