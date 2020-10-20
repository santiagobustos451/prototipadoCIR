class Bootloader extends Phaser.Scene {
  constructor() {
    super({ key: "Bootloader" });
  }
  preload() {
    this.load.on("complete", () => {
      this.scene.start("mainmenu");
    });
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Cargando...",
      style: {
        font: "20px Open Sans",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px Open Sans",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px Open Sans",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", function (file) {
      assetText.setText("Cargando asset: " + file.key);
    });

    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    //hacer acá abajo el preload

    this.load.audio("s_ambiente", "./assets/audio/ambience_gameplay.mp3");
    this.load.audio("s_burbujas", "./assets/audio/sfx_burbujas.mp3");
    this.load.audio("s_hit", "./assets/audio/sfx_hit.mp3");
    this.load.audio("s_plancha", "./assets/audio/sfx_plancha.mp3");
    this.load.audio("s_win", "./assets/audio/sfx_win.mp3");
    this.load.audio("s_lose", "./assets/audio/sfx_lose.mp3");
    this.load.audio("s_pedido", "./assets/audio/sfx_pedido.mp3");
    this.load.audio("s_ticket", "./assets/audio/sfx_ticket.mp3");
    this.load.audio("s_basura", "./assets/audio/sfx_basura.mp3");
    this.load.audio("s_fregadero", "./assets/audio/sfx_fregadero.mp3");
    this.load.audio("s_click", "./assets/audio/sfx_click.mp3");
    this.load.audio("bgm_gameplay", "./assets/audio/BGM_gameplay.mp3");
    this.load.audio("bgm_mainmenu", "./assets/audio/BGM_mainmenu.mp3");

    this.load.json("level1", "./assets/json/level1.json");
    this.load.json("level2", "./assets/json/level2.json");
    this.load.json("level3", "./assets/json/level3.json");
    this.load.json("level4", "./assets/json/level4.json");
    this.load.json("level5", "./assets/json/level5.json");
    this.load.json("level6", "./assets/json/level6.json");
    this.load.json("consejosWin", "./assets/json/consejosWin.json");
    this.load.json("consejosLose", "./assets/json/consejosLose.json");

    this.load.spritesheet("Sp_freezer", "./assets/sp_freezer.png", {
      frameWidth: 222,
      frameHeight: 327,
    });
    this.load.spritesheet("Sp_burger", "./assets/sp_burger.png", {
      frameWidth: 48,
      frameHeight: 25,
    });
    this.load.spritesheet("Sp_levelsign", "./assets/sp_levelsign.png", {
      frameWidth: 2000,
      frameHeight: 700,
    });

    this.load.image("11", "./assets/burgerstates/11.png");
    this.load.image("33", "./assets/burgerstates/33.png");

    this.load.image("hb_bowls", "./assets/hb_bowls.png");
    this.load.image("hb_fregadero", "./assets/hb_fregadero.png");
    this.load.image("obj_trash", "./assets/obj_trash.png");

    this.load.image("obj_panarriba", "./assets/obj_panarriba.png");
    this.load.image("obj_panabajo", "./assets/obj_panabajo.png");
    this.load.image("obj_tomate", "./assets/obj_tomate.png");
    this.load.image("obj_lechuga", "./assets/obj_lechuga.png");
    this.load.image("obj_cebolla", "./assets/obj_cebolla.png");

    this.load.image("Sp_fondo", "./assets/fondo.png");
    this.load.image("bg_mainmenu", "./assets/bg_menu.png");
    this.load.image("bg_help", "./assets/bg_help.png");
    this.load.image("bg_gamescene", "./assets/bg_gamescene.png");

    this.load.image("b_jugar", "./assets/b_jugar.png");
    this.load.image("b_ayuda", "./assets/b_ayuda.png");
    this.load.image("b_creditos", "./assets/b_creditos.png");
    this.load.image("b_volver", "./assets/b_volver.png");
    this.load.image("b_basura", "./assets/b_basura.png");
    this.load.image("b_continuar", "./assets/b_continuar.png");
    this.load.image("b_salir", "./assets/b_salir.png");
    this.load.image("b_nivel", "./assets/b_nivel.png");
    this.load.image("b_confirmar", "./assets/b_confirmar.png");
    this.load.image("b_cancelar", "./assets/b_cancelar.png");

    this.load.image("b_niveles", "./assets/b_niveles.png");
    this.load.image("b_siguiente", "./assets/b_siguiente.png");
    this.load.image("b_reintentar", "./assets/b_reintentar.png");

    this.load.image("ticket1", "./assets/ticket_1.png");
    this.load.image("ticket2", "./assets/ticket_2.png");
    this.load.image("ticket3", "./assets/ticket_3.png");
    this.load.image("ticket4", "./assets/ticket_4.png");
    this.load.image("ticket5", "./assets/ticket_5.png");
    this.load.image("ticket6", "./assets/ticket_6.png");

    this.load.image("overlay", "./assets/overlay_gamescene.png");
    this.load.image("creditos", "./assets/overlay_creditos.png");
    this.load.image("overlay_base", "./assets/overlay_generico.png");
    this.load.image("overlay_burgerDone", "./assets/overlay_burgerdone.png");
    this.load.image("overlay_puntaje", "./assets/overlay_puntaje.png");
    this.load.image("overlay_barra", "./assets/sombra_barrafregadero.png");
    this.load.image("overlay_pausa", "./assets/overlay_pausa.png");
    this.load.image("overlay_levelselect", "./assets/overlay_levelselect.png");
    this.load.image("overlay_basura", "./assets/overlay_basura.png");

    this.load.spritesheet("tutLavado", "./assets/tutLavado.png", {
      frameWidth: 480,
      frameHeight: 260,
    });
    this.load.spritesheet("tutArmado", "./assets/tutArmado.png", {
      frameWidth: 480,
      frameHeight: 260,
    });
    this.load.spritesheet("tutCocinado", "./assets/tutCocinado.png", {
      frameWidth: 480,
      frameHeight: 260,
    });
    this.load.spritesheet("tutTexto", "./assets/tutTexto.png", {
      frameWidth: 600,
      frameHeight: 100,
    });
    this.load.image("bg_tutorial", "./assets/bg_tutorial.png");
    this.load.image("b_flechader", "./assets/b_derecha.png");
    this.load.image("b_flechaizq", "./assets/b_izquierda.png");

    this.load.spritesheet("sp_b_mute", "./assets/sp_b_mute.png", {
      frameWidth: 300,
      frameHeight: 300,
    });
    this.load.spritesheet("sp_b_armado", "./assets/sp_b_armado.png", {
      frameWidth: 244,
      frameHeight: 95,
    });
    this.load.spritesheet("sp_b_fregadero", "./assets/sp_b_fregadero.png", {
      frameWidth: 244,
      frameHeight: 95,
    });
    this.load.spritesheet("sp_b_plancha", "./assets/sp_b_plancha.png", {
      frameWidth: 244,
      frameHeight: 95,
    });
    this.load.spritesheet("sp_b_pausa", "./assets/sp_b_pausa.png", {
      frameWidth: 120,
      frameHeight: 120,
    });
    this.load.spritesheet("sp_b_basura", "./assets/sp_b_basura.png", {
      frameWidth: 100,
      frameHeight: 100,
    });
    this.load.spritesheet("sp_b_nivel", "./assets/sp_b_nivel.png", {
      frameWidth: 607,
      frameHeight: 541,
    });
    this.load.spritesheet("sp_manos", "./assets/sp_manos.png", {
      frameWidth: 154,
      frameHeight: 154,
    });
    this.load.spritesheet("sp_barra", "./assets/sp_barrafregadero.png", {
      frameWidth: 450,
      frameHeight: 250,
    });
    this.load.spritesheet("sp_campana", "./assets/sp_campana.png", {
      frameWidth: 100,
      frameHeight: 150,
    });
    this.load.spritesheet("sp_fregadero_hl", "./assets/sp_b_fregadero_hl.png", {
      frameWidth: 245,
      frameHeight: 97,
    });
  }
}

export default Bootloader;
