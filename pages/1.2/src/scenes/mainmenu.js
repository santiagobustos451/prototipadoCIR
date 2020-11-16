var mundo;
var boton;
var boton2;
var boton3;
var boton4;
var b_pt;
var b_en;
var b_es;
var overlay;
var overlayIdioma;
var music;
var musicConfig = {
  loop: true,
  mute: false,
  volume: 1,
};

var textoEs;
var textoPt;
var textoEn;

var s_muteclick;
var s_click;
var b_mute;
var b_fullscreen;
var F_volumenbajo = false;
var F_reseteado = false;
var F_idiomaCambiado = false;

class mainmenu extends Phaser.Scene {
  constructor() {
    super({ key: "mainmenu" });
  }

  create() {
    mundo = this;
    s_muteclick = this.sound.add("s_click");
    s_click = this.sound.add("s_click");

    b_mute = this.add
      .sprite(770, 30, "sp_b_mute")
      .setScale(0.15)
      .setDepth(10)
      .setInteractive();
    if (mundo.sound.mute) {
      b_mute.setFrame(1);
    }

    b_mute.on(
      "pointerup",
      function () {
        s_muteclick.play();
      },
      this
    );

    s_muteclick.on(
      "complete",
      function () {
        if (!mundo.sound.mute) {
          mundo.sound.mute = true;
          b_mute.setFrame(1);
        } else {
          mundo.sound.mute = false;
          s_click.play();
          b_mute.setFrame(0);
        }
      },
      this
    );

    b_fullscreen = this.add
      .sprite(710, 32, "sp_b_fullscreen")
      .setScale(0.6)
      .setDepth(5)
      .setInteractive()
      .on("pointerup", function () {
        if (mundo.scale.isFullscreen) {
          this.setFrame(0);
          mundo.scale.stopFullscreen();
        } else {
          this.setFrame(1);
          mundo.scale.startFullscreen();
        }
      });

    music = this.sound.add("bgm_mainmenu");
    music.play(musicConfig);
    music.inicio = true;

    let center_width = this.sys.game.config.width / 2;
    let center_height = this.sys.game.config.height / 2;

    this.add.image(center_width, center_height, "bg_mainmenu");

    boton = this.add
      .sprite(center_width, center_height + 100, "sp_b_jugar")
      .setInteractive()
      .setScale(0.7);
    boton2 = this.add
      .sprite(center_width, center_height + 182, "sp_b_ayuda")
      .setInteractive()
      .setScale(0.7);
    boton3 = this.add
      .sprite(center_width - 100, center_height + 255, "sp_b_creditos")
      .setInteractive()
      .setScale(0.8);
    boton4 = this.add
      .sprite(center_width + 100, center_height + 255, "sp_b_idioma")
      .setInteractive()
      .setScale(0.8);
    overlay = this.add
      .image(center_width, center_height, "creditos")
      .setDepth(-1);
    overlayIdioma = this.add
      .image(center_width, center_height, "overlay_base")
      .setDepth(-1);
    b_es = this.add
      .image(center_width, center_height - 100 - 20, "b_es")
      .setDepth(-1);
    b_en = this.add
      .image(center_width, center_height - 20, "b_en")
      .setDepth(-1);
    b_pt = this.add
      .image(center_width, center_height + 100 - 20, "b_pt")
      .setDepth(-1);

    boton.on(
      "pointerup",
      function () {
        s_click.play();
        music.stop();
        F_reseteado = true;

        this.scene.restart();
        this.scene.stop("gamescene");
        this.scene.switch("gamescene");
      },
      this
    );
    boton2.on(
      "pointerup",
      function () {
        s_click.play();
        this.scene.stop("ayuda");
        this.scene.switch("ayuda");
        music.volume = 0.5;
      },
      this
    );
    boton3.on(
      "pointerup",
      function () {
        s_click.play();
        overlay.setDepth(2);
        overlay.setInteractive();
        music.volume = 0.5;
        F_volumenbajo = true;
      },
      this
    );
    boton4.on(
      "pointerup",
      function () {
        s_click.play();
        overlayIdioma
          .setDepth(2)
          .setInteractive()
          .on(
            "pointerup",
            function () {
              this.idiomaWipe();
            },
            this
          );
        music.volume = 0.5;
        F_volumenbajo = true;
        if (localStorage.getItem("idioma") == "espanol") {
          textoEs.setDepth(4);
        } else if (localStorage.getItem("idioma") == "ingles") {
          textoEn.setDepth(4);
        } else if (localStorage.getItem("idioma") == "portugues") {
          textoPt.setDepth(4);
        }
        b_es
          .setDepth(2)
          .setInteractive()
          .on(
            "pointerup",
            function () {
              localStorage.setItem("idioma", "espanol");
              console.log("español");
              this.idiomaWipe();
            },
            this
          );
        b_en
          .setDepth(2)
          .setInteractive()
          .on(
            "pointerup",
            function () {
              localStorage.setItem("idioma", "ingles");
              console.log("inglés");
              this.idiomaWipe();
            },
            this
          );
        b_pt
          .setDepth(2)
          .setInteractive()
          .on(
            "pointerup",
            function () {
              localStorage.setItem("idioma", "portugues");
              console.log("portugues");
              this.idiomaWipe();
            },
            this
          );
      },
      this
    );

    //texto idioma

    textoEs = this.add
      .text(center_width - 110, center_height - 200, "Seleccionar Idioma", {
        fontFamily: "Raleway",
        fontSize: 24,
        color: "#4a4a4a",
      })
      .setDepth(-1);
    textoPt = this.add
      .text(center_width - 110, center_height - 200, "Selecione o idioma", {
        fontFamily: "Raleway",
        fontSize: 24,
        color: "#4a4a4a",
      })
      .setDepth(-1);
    textoEn = this.add
      .text(center_width - 110, center_height - 200, "Choose a language", {
        fontFamily: "Raleway",
        fontSize: 24,
        color: "#4a4a4a",
      })
      .setDepth(-1);

    //

    overlay.on(
      "pointerup",
      function () {
        s_click.play();
        overlay.disableInteractive();
        overlay.setDepth(-1);
        F_volumenbajo = false;
      },
      this
    );
    if (F_reseteado) {
      music.stop();
      F_reseteado = false;
    }

    //seteo idioma al inicio
    if (localStorage.getItem("idioma") == "espanol") {
      boton.setFrame(0);
      boton2.setFrame(0);
      boton3.setFrame(0);
      boton4.setFrame(0);
    } else if (localStorage.getItem("idioma") == "ingles") {
      boton.setFrame(1);
      boton2.setFrame(1);
      boton3.setFrame(1);
      boton4.setFrame(1);
    } else if (localStorage.getItem("idioma") == "portugues") {
      boton.setFrame(2);
      boton2.setFrame(2);
      boton3.setFrame(2);
      boton4.setFrame(2);
    }
  }
  update() {
    if (this.F_idiomaCambiado) {
      if (localStorage.getItem("idioma") == "espanol") {
        boton.setFrame(0);
        boton2.setFrame(0);
        boton3.setFrame(0);
        boton4.setFrame(0);
      } else if (localStorage.getItem("idioma") == "ingles") {
        boton.setFrame(1);
        boton2.setFrame(1);
        boton3.setFrame(1);
        boton4.setFrame(1);
      } else if (localStorage.getItem("idioma") == "portugues") {
        boton.setFrame(2);
        boton2.setFrame(2);
        boton3.setFrame(2);
        boton4.setFrame(2);
      }
      this.F_idiomaCambiado = false;
      console.log(this.F_idiomaCambiado);
    }

    if (mundo.scale.isFullscreen) {
      b_fullscreen.setFrame(1);
    } else {
      b_fullscreen.setFrame(0);
    }

    if (!F_volumenbajo) {
      music.volume = 1;
    } else {
      music.volume = 0.5;
    }
    if (!F_reseteado) {
      b_mute.setFrame(0);
      music.play(musicConfig);
      F_reseteado = true;
    }
    if (mundo.sound.mute) {
      b_mute.setFrame(1);
    }
  }
  mute() {
    mundo.sound.mute = true;
  }
  idiomaWipe() {
    b_pt.removeInteractive().setDepth(-1);
    b_en.removeInteractive().setDepth(-1);
    b_es.removeInteractive().setDepth(-1);
    overlayIdioma.removeInteractive().setDepth(-1);
    textoEs.setDepth(-1);
    textoEn.setDepth(-1);
    textoPt.setDepth(-1);
    this.F_idiomaCambiado = true;
    console.log(this.F_idiomaCambiado);
  }
}

export default mainmenu;
