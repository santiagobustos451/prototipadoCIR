//importar objetos aquí

//variables aquí

//sonidos
var s_hit;
var s_burbujas;
var s_plancha;
var s_win;
var s_lose;
var s_pedido;
var s_ambiente;
var s_ticket;
var s_basura;
var s_click;
var s_muteclick;
var s_fregadero;
var bgm_gameplay;

var F_reseteado = false;

const burgerstatenames = [
  "11",
  "12",
  "13",
  "14",
  "15",
  "21",
  "22",
  "23",
  "24",
  "25",
  "31",
  "32",
  "33",
  "34",
  "35",
  "41",
  "42",
  "43",
  "44",
  "45",
  "51",
  "52",
  "53",
  "54",
  "55",
];
var botFregadero; //BOTONERA ESTACIONES
var botArmado;
var botPlancha;
var estacion = 1; //ESTACION ACTUAL 0 = lavado, 1 = cocina, 2 = armado
var freezer;
var overlayGUI; //overlays
var overlaySombra;
var barraFregadero;
var overlayTicket;
var dibujoTicket = [];
var textoTicket;
var overlayNiveles;
var overlayBurgerDone;
var overlayPausa;
var overlayPuntaje;
var b_basura; //BOTONES E INDICADORES GUI
var b_pausa;
var b_nivel = [];
var b_niveltexto = [];

var indManos;
var b_continuar; //BOTONES PAUSA Y PUNTAJE
var b_salir;
var b_volver;
var b_siguiente;
var b_niveles;
var b_mute;
var ctndr_burgers = [];
var ctndr_ing = [];
var plato_burgers = [];
var tabla_burgers = [];
var F_burgerCrear = false; //BANDERAS
var F_burgerAgarrada = true;
var F_burgerDone = false;
var F_pausa = false;
var F_selniv = false;
var F_manoslimpias = true;
var F_contaminado = false;
var F_lavar = false;
var F_nivelactual;
var F_nivelactualnum;
var F_generartickets = false;
var F_freir;
var progresoLav = 0;
var cant_burgers = 0;
var celdasX = [205, 320, 440, 205, 320, 440]; //centros de cada celda
var celdasY = [400, 400, 400, 480, 480, 480];
var limitesCeldasX1 = [140, 260, 380, 140, 260, 380]; //límites de cada celda
var limitesCeldasX2 = [260, 380, 500, 260, 380, 500];
var limitesCeldasY1 = [360, 360, 360, 440, 440, 440];
var limitesCeldasY2 = [440, 440, 440, 520, 520, 520];
var F_celdas = [0, 0, 0, 0, 0, 0];
var cam;
var alturaPilaPlato = 0;
var alturaPilaTabla = 0;
var hb_tomate; //HITBOXES (BOTONES INVISIBLES)
var hb_lechuga;
var hb_cebolla;
var hb_panabajo;
var hb_panarriba;
var hb_fregadero;
var ingrediente;
var timer;
var mundo;

var comandera = [];
var comanderaNombres = [
  "ticket1",
  "ticket2",
  "ticket3",
  "ticket4",
  "ticket5",
  "ticket6",
];

var tickets;
var tickets_shuffle = [];
var ticketsleft;
var ticketsjson;

var puntajeA = 0; //fidelidad
var puntajeB = 0; //salubridad
var puntajeC = 100; //tiempo
var puntajeTotal = 100;

var puntajeAfinal = 0; //fidelidad
var puntajeBfinal = 0; //salubridad
var puntajeCfinal = 100; //tiempo
var puntajeTotalfinal = 0;

var nivel;
var elapsedTime;
var levelTimer;

var repeticionesA = 0;
var repeticionesB = 0;
let center_width;
let center_height;

class gamescene extends Phaser.Scene {
  constructor() {
    super({ key: "gamescene" });
  }

  //create
  create() {
    //centro de la pantalla

    mundo = this;
    center_width = this.sys.game.config.width / 2;
    center_height = this.sys.game.config.height / 2;

    //configuración de la cámara
    this.cameras.main.setBounds(0, 0, 1760, 1600);
    cam = this.cameras.main;
    cam.pan(center_width + 550, 0, 0);

    //sonidos

    s_hit = this.sound.add("s_hit", { volume: 10 });
    s_burbujas = this.sound.add("s_burbujas");
    s_plancha = this.sound.add("s_plancha");
    s_win = this.sound.add("s_win");
    s_lose = this.sound.add("s_lose");
    s_pedido = this.sound.add("s_pedido");
    s_ticket = this.sound.add("s_ticket");
    s_basura = this.sound.add("s_basura");
    s_fregadero = this.sound.add("s_fregadero");
    s_click = this.sound.add("s_click");
    s_muteclick = this.sound.add("s_click");

    //boton mute

    b_mute = this.add
      .sprite(760, 760, "sp_b_mute")
      .setScale(0.2)
      .setDepth(100)
      .setInteractive()
      .setScrollFactor(0);

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

    s_ambiente = this.sound.add("s_ambiente");
    bgm_gameplay = this.sound.add("bgm_gameplay");

    //Selección de nivel
    F_selniv = true;
    overlayNiveles = this.add
      .image(400, 400, "overlay_levelselect")
      .setDepth(10)
      .setScrollFactor(0);
    b_niveltexto[0] = this.add
      .text(190, 265 + 50, "1", {
        fontFamily: "Pacifico",
        fontSize: 46,
        color: "#ffffff",
      })
      .setDepth(11)
      .setScrollFactor(0)
      .setShadow(2, 2, "#000000", 2, true, true);
    b_nivel[0] = this.add
      .image(200, 300 + 50, "b_nivel")
      .setInteractive()
      .setDepth(10)
      .setScrollFactor(0)
      .setScale(0.25)
      .setData({ nivel: 1 });
    b_niveltexto[1] = this.add
      .text(390, 265 + 50, "2", {
        fontFamily: "Pacifico",
        fontSize: 46,
        color: "#ffffff",
      })
      .setDepth(11)
      .setScrollFactor(0)
      .setShadow(2, 2, "#000000", 2, true, true);
    b_nivel[1] = this.add
      .image(400, 300 + 50, "b_nivel")
      .setInteractive()
      .setDepth(10)
      .setScrollFactor(0)
      .setScale(0.25)
      .setData({ nivel: 2 });
    b_niveltexto[2] = this.add
      .text(590, 265 + 50, "3", {
        fontFamily: "Pacifico",
        fontSize: 46,
        color: "#ffffff",
      })
      .setDepth(11)
      .setScrollFactor(0)
      .setShadow(2, 2, "#000000", 2, true, true);
    b_nivel[2] = this.add
      .image(600, 300 + 50, "b_nivel")
      .setInteractive()
      .setDepth(10)
      .setScrollFactor(0)
      .setScale(0.25)
      .setData({ nivel: 3 });
    b_niveltexto[3] = this.add
      .text(190, 465 + 50, "4", {
        fontFamily: "Pacifico",
        fontSize: 46,
        color: "#ffffff",
      })
      .setDepth(11)
      .setScrollFactor(0)
      .setShadow(2, 2, "#000000", 2, true, true);
    b_nivel[3] = this.add
      .image(200, 500 + 50, "b_nivel")
      .setInteractive()
      .setDepth(10)
      .setScrollFactor(0)
      .setScale(0.25)
      .setData({ nivel: 4 });
    b_niveltexto[4] = this.add
      .text(390, 465 + 50, "5", {
        fontFamily: "Pacifico",
        fontSize: 46,
        color: "#ffffff",
      })
      .setDepth(11)
      .setScrollFactor(0)
      .setShadow(2, 2, "#000000", 2, true, true);
    b_nivel[4] = this.add
      .image(400, 500 + 50, "b_nivel")
      .setInteractive()
      .setDepth(10)
      .setScrollFactor(0)
      .setScale(0.25)
      .setData({ nivel: 5 });
    b_niveltexto[5] = this.add
      .text(590, 465 + 50, "6", {
        fontFamily: "Pacifico",
        fontSize: 46,
        color: "#ffffff",
      })
      .setDepth(11)
      .setScrollFactor(0)
      .setShadow(2, 2, "#000000", 2, true, true);
    b_nivel[5] = this.add
      .image(600, 500 + 50, "b_nivel")
      .setInteractive()
      .setDepth(10)
      .setScrollFactor(0)
      .setScale(0.25)
      .setData({ nivel: 6 });

    for (var i = 0; i < 6; i++) {
      b_nivel[i].on("pointerup", function () {
        s_click.play();
        F_nivelactualnum = this.data.values.nivel;
        F_nivelactual = "level" + this.data.values.nivel;
        F_generartickets = true;
      });
    }

    //hitbox de fregadero

    hb_fregadero = this.add
      .image(center_width - 50, center_height, "hb_fregadero")
      .setDepth(1)
      .setAlpha(0.001)
      .setInteractive();
    hb_fregadero.on("pointerdown", function () {
      if (!F_manoslimpias) {
        mundo.tweens.add({
          targets: s_fregadero,
          volume: 1,
          duration: 200,
        });
      }
      F_lavar = true;
    });
    hb_fregadero.on("pointerout", function () {
      mundo.tweens.add({
        targets: s_fregadero,
        volume: 0,
        duration: 200,
      });
      F_lavar = false;
    });
    hb_fregadero.on("pointerup", function () {
      mundo.tweens.add({
        targets: s_fregadero,
        volume: 0,
        duration: 200,
      });
      F_lavar = false;
    });

    //animación barra lavado de manos

    this.anims.create({
      key: "anim_barra",
      frames: this.anims.generateFrameNumbers("sp_barra", { start: 0, end: 9 }),
      frameRate: 0,
    });

    //overlay de hamburguesa hecha y boton de basura

    overlayBurgerDone = this.add
      .image(center_width, center_height, "overlay_burgerDone")
      .setDepth(-1)
      .setScrollFactor(0);
    b_basura = this.add
      .image(180, 105, "sp_b_basura")
      .setScale(0.8)
      .setDepth(-1)
      .setScrollFactor(0)
      .disableInteractive();
    b_basura.on("pointerover", function () {
      b_basura.setFrame(1);
    });
    b_basura.on("pointerout", function () {
      b_basura.setFrame(0);
    });
    b_basura.on(
      "pointerup",
      function () {
        if (!F_pausa && !F_selniv /* && tabla_burgers.length > 0*/) {
          if (tabla_burgers.length > 0) {
            s_click.play();
          }

          F_burgerDone = false;
          overlayBurgerDone.setDepth(-1);
          b_basura.disableInteractive();
          b_basura.setDepth(-1);
        }
      },
      this
    );
    var tacho = this.add
      .image(1600, 480, "obj_trash")
      .setDepth(2)
      .setInteractive()
      .setScale(0.6);
    tacho.on(
      "pointerup",
      function () {
        if (!F_pausa && !F_selniv /* && tabla_burgers.length > 0*/) {
          if (tabla_burgers.length > 0) {
            s_basura.play();
          }
          alturaPilaTabla = 0;
          var elimina2 = tabla_burgers.length;
          for (var a = 0; a < elimina2; a++) {
            tabla_burgers[0].x = 5000;
            tabla_burgers.splice(0, 1);
          }
          F_burgerDone = false;
          overlayBurgerDone.setDepth(-1);
          b_basura.disableInteractive();
          b_basura.setDepth(-1);
        }
      },
      this
    );

    //hitbox de campana

    var b_campana = this.add
      .sprite(1600, 200, "sp_campana")
      .setDepth(1)
      .setInteractive()
      .on("pointerdown", function () {
        s_pedido.play();
        this.setFrame(1);
      })
      .on("pointerout", function () {
        this.setFrame(0);
      })
      .on("pointerup", function () {
        F_burgerDone = true;
        overlayBurgerDone.setDepth(10 + alturaPilaPlato + alturaPilaTabla);
        b_basura.setDepth(8);
        b_basura.setInteractive();
        alturaPilaTabla = 0;
        this.setFrame(0);
      });

    //hitboxes de ingredientes, ponen ingrediente en tabla y se chequea contaminación

    hb_lechuga = this.add
      .image(1100 + 360, 333, "hb_bowls")
      .setDepth(1)
      .setInteractive()
      .setAlpha(0.01);
    hb_cebolla = this.add
      .image(1100 + 270, 376, "hb_bowls")
      .setDepth(1)
      .setInteractive()
      .setAlpha(0.01);
    hb_tomate = this.add
      .image(1100 + 270, 285, "hb_bowls")
      .setDepth(1)
      .setInteractive()
      .setAlpha(0.01);
    hb_panarriba = this.add
      .image(1100 + 477, 311, "hb_bowls")
      .setDepth(1)
      .setInteractive()
      .setAlpha(0.01);
    hb_panabajo = this.add
      .image(1100 + 568, 335, "hb_bowls")
      .setDepth(2)
      .setInteractive()
      .setAlpha(0.01);

    /*hb_lechuga.on(
      "pointerup",
      function () {
        if (!F_burgerDone && !F_selniv && !F_pausa) {
          s_hit.play();
          ingrediente = this.add
            .sprite(627 + 550 + 200, 455 - alturaPilaTabla, "obj_lechuga")
            .setDepth(tabla_burgers.length)
            .setData({ ing: 2 }); //5=hamburguesa 4=pan de arriba 3=pan de abajo 2= lechuga, 1=cebolla, 0=tomate
          alturaPilaTabla += 9;
          tabla_burgers.push(ingrediente);
          if (!F_manoslimpias) {
            ingrediente.data.values.contaminado = true;
          }
        }
      },
      this
    );*/
    hb_lechuga.on(
      "pointerdown",
      () => {
        if (!F_burgerDone && !F_selniv && !F_pausa) {
          this.createIng("obj_lechuga", 2);
        }
      },
      mundo
    );
    hb_cebolla.on(
      "pointerdown",
      () => {
        if (!F_burgerDone && !F_selniv && !F_pausa) {
          this.createIng("obj_cebolla", 1);
        }
      },
      mundo
    );
    hb_tomate.on(
      "pointerdown",
      () => {
        if (!F_burgerDone && !F_selniv && !F_pausa) {
          this.createIng("obj_tomate", 0);
        }
      },
      mundo
    );
    hb_panabajo.on(
      "pointerdown",
      () => {
        if (!F_burgerDone && !F_selniv && !F_pausa) {
          this.createIng("obj_panabajo", 3);
        }
      },
      mundo
    );
    hb_panarriba.on(
      "pointerdown",
      () => {
        if (!F_burgerDone && !F_selniv && !F_pausa) {
          this.createIng("obj_panarriba", 4);
        }
      },
      mundo
    );

    /*hb_panarriba.on(
      "pointerup",
      function () {
        if (!F_burgerDone && !F_selniv && !F_pausa) {
          s_hit.play();
          alturaPilaTabla += 9;
          ingrediente = this.add
            .sprite(627 + 550 + 200, 455 - alturaPilaTabla, "obj_panarriba")
            .setDepth(tabla_burgers.length)
            .setData({ ing: 4 });
          alturaPilaTabla = 0;
          tabla_burgers.push(ingrediente);
          if (!F_manoslimpias) {
            ingrediente.data.values.contaminado = true;
          }
          //pan de arriba señala que la hamburguesa se termino de armar
          F_burgerDone = true;
          overlayBurgerDone.setDepth(10 + alturaPilaPlato + alturaPilaTabla);
          b_basura.setDepth(8);
        }
      },
      this
    );*/

    //crea todas las animaciones de las hamburguesas, nombres almacenados en burgerstatenames
    for (var a = 0; a < 25; a++) {
      this.anims.create({
        key: burgerstatenames[a],
        frames: [{ key: "Sp_burger", frame: a }],
        frameRate: 20,
      });
    }

    //no necesario, cambia los valores almacenados de las celdas de la plancha, podria cambiarse en arrays
    for (var i = 0; i < celdasX.length; i++) {
      celdasX[i] = celdasX[i] + 550;
    }
    for (var i = 0; i < limitesCeldasX1.length; i++) {
      limitesCeldasX1[i] = limitesCeldasX1[i] + 550;
    }
    for (var i = 0; i < limitesCeldasX2.length; i++) {
      limitesCeldasX2[i] = limitesCeldasX2[i] + 550;
    }

    //fondo
    var fondo = this.add.sprite(0, 0, "bg_gamescene").setOrigin(0, 0);

    //freezer se abre y cierra
    freezer = this.add
      .sprite(1200, center_height - 160, "Sp_freezer")
      .setInteractive();

    this.anims.create({
      key: "open",
      frames: [{ key: "Sp_freezer", frame: 1 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "closed",
      frames: [{ key: "Sp_freezer", frame: 0 }],
      frameRate: 20,
    });

    freezer.on("pointerover", function () {
      if (estacion == 1 && !F_burgerDone && !F_selniv && !F_pausa) {
        this.anims.play("open");
      }
    });
    freezer.on("pointerout", function () {
      this.anims.play("closed");
    });

    //freezer crea burgers
    freezer.on("pointerdown", function () {
      if (estacion == 1 && !F_burgerDone && !F_selniv && !F_pausa) {
        F_burgerCrear = true;
      }
    });
    //puntero arrastra
    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.dragDistanceThreshold = 5;

    //overlay GUI

    //overlay y boton pausa
    overlayPausa = this.add
      .image(center_width, center_width, "overlay_pausa")
      .setDepth(-1)
      .setScrollFactor(0);
    b_continuar = this.add
      .image(center_width, center_height - 30, "b_continuar")
      .setDepth(-1)
      .setScrollFactor(0)
      .setInteractive();
    b_salir = this.add
      .image(center_width, center_height + 80, "b_salir")
      .setDepth(-1)
      .setScrollFactor(0)
      .setInteractive();

    b_pausa = this.add
      .sprite(700, 100, "sp_b_pausa", 0)
      .setInteractive()
      .setDepth(3)
      .setScrollFactor(0);

    b_pausa.on(
      "pointerout",
      function () {
        b_pausa.setFrame(0);
      },
      this
    );

    b_pausa.on(
      "pointerover",
      function () {
        if (!F_pausa && !F_selniv) {
          b_pausa.setFrame(1);
        }
      },
      this
    );
    b_pausa.on(
      "pointerup",
      function () {
        levelTimer.paused = true;
        bgm_gameplay.volume = bgm_gameplay.volume * 0.5;
        for (var i = 0; i < comandera.length; i++) {
          comandera[i].timer.paused = true;
        }
        s_click.play();
        if (!F_selniv) {
          overlayPausa.setDepth(99);
          b_continuar.setDepth(99).setInteractive();
          b_salir.setDepth(99).setInteractive();
          b_pausa.setFrame(0);
          F_pausa = true;
        }
      },
      this
    );
    b_continuar.on(
      "pointerup",
      function () {
        levelTimer.paused = false;
        bgm_gameplay.volume = bgm_gameplay.volume * 2;
        for (var i = 0; i < comandera.length; i++) {
          comandera[i].timer.paused = false;
        }
        s_click.play();
        overlayPausa.setDepth(-1);
        b_continuar.setDepth(-1).disableInteractive();
        b_salir.setDepth(-1).disableInteractive();
        F_pausa = false;
      },
      this
    );
    b_salir.on(
      "pointerup",
      function () {
        s_click.play();
        if (F_pausa) {
          this.volverMenu();
        }
      },
      this
    );

    //icono manos
    indManos = this.add
      .sprite(90, 100, "sp_manos", 0)
      .setScrollFactor(0)
      .setDepth(3);
    this.anims.create({
      key: "manos_on",
      frames: [{ key: "sp_manos", frame: 0 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "manos_off",
      frames: [{ key: "sp_manos", frame: 1 }],
      frameRate: 20,
    });

    overlayGUI = this.add
      .sprite(center_width, center_height, "overlay")
      .setScrollFactor(0)
      .setDepth(2);
    overlayPuntaje = this.add
      .image(center_width, center_width, "overlay_puntaje")
      .setDepth(-1)
      .setScrollFactor(0);

    botFregadero = this.add
      .sprite(center_width - 250, center_height + 250, "sp_b_fregadero")
      .setScrollFactor(0)
      .setInteractive();
    botFregadero.depth = 3;

    botPlancha = this.add
      .sprite(center_width, center_height + 250, "sp_b_plancha")
      .setScrollFactor(0)
      .setInteractive()
      .setFrame(1);
    botPlancha.depth = 3;

    botArmado = this.add
      .sprite(center_width + 250, center_height + 250, "sp_b_armado")
      .setScrollFactor(0)
      .setInteractive();
    botArmado.depth = 3;

    botFregadero.on(
      "pointerup",
      function () {
        if (!F_burgerDone && !F_selniv && !F_pausa) {
          s_click.play();
          botArmado.setFrame(0);
          botPlancha.setFrame(0);
          botFregadero.setFrame(1);
          estacion = 0;
          cam.pan(center_width, 0, 150, "Sine.easeInOut");
        }
      },
      this
    );

    botPlancha.on(
      "pointerup",
      function () {
        if (!F_burgerDone && !F_selniv && !F_pausa) {
          s_click.play();
          botArmado.setFrame(0);
          botFregadero.setFrame(0);
          botPlancha.setFrame(1);
          estacion = 1;
          cam.pan(center_width + 550, 0, 150, "Sine.easeInOut");
        }
      },
      this
    );

    botArmado.on(
      "pointerup",
      function () {
        if (!F_burgerDone && !F_selniv && !F_pausa) {
          s_click.play();
          botPlancha.setFrame(0);
          botFregadero.setFrame(0);
          botArmado.setFrame(1);
          estacion = 2;
          cam.pan(center_width + 1100, 0, 150, "Sine.easeInOut");
        }
      },
      this
    );

    overlaySombra = this.add
      .image(center_width, center_height, "overlay_barra")
      .setAlpha(0)
      .setDepth(1);
    barraFregadero = this.add
      .sprite(center_width, center_height, "anim_barra", 0)
      .setAlpha(0)
      .setDepth(1);
    timer = this.time.addEvent({
      delay: 300,
      callback: this.prog_lavado,
      callbackScope: this,
      loop: true,
    });

    s_plancha.play({ loop: true, volume: 0.15, mute: true });
    s_fregadero.play({ loop: true, volume: 0 });

    if (F_reseteado) {
      bgm_gameplay.stop();
      F_reseteado = false;
    }

    this.input.on("pointerup", function () {
      console.log([
        mundo.input.mousePointer.worldX,
        mundo.input.mousePointer.worldY,
      ]);
    });
  }
  /*
  .
  .
  .
  .
  .
  .
  .
  .
  .
  .
  .
  .
  .
  .
  .
  .
  .
  .
  .
  .
  .
  */

  update(time, delta) {
    mundo = this;

    if (this.sound.mute) {
      b_mute.setFrame(1);
    }

    if (!F_reseteado) {
      bgm_gameplay.play({ loop: true, volume: 0.125 });
      F_reseteado = true;
    }

    for (var i = 0; i < F_celdas.length; i++) {
      if (F_celdas[i] == 1) {
        F_freir = true;
        break;
      }
      F_freir = false;
    }
    if (F_freir) {
      s_plancha.mute = false;
    } else {
      s_plancha.mute = true;
    }
    // TICKETS
    if (F_generartickets) {
      levelTimer = this.time.addEvent({
        delay: Infinity, // ms
        callback: null,
      });

      for (var b = 0; b < 6; b++) {
        b_nivel[b].removeInteractive().setDepth(-1);
        b_niveltexto[b].setDepth(-1);
        overlayNiveles.setDepth(-1);
      }

      ticketsjson = mundo.cache.json.get(F_nivelactual);
      F_selniv = false;

      bgm_gameplay.volume = 0.25;
      s_ambiente.play({ loop: true, volume: 0.25 });
      var mundo = this;
      overlayTicket = this.add
        .image(400, 400, "overlay_base")
        .setDepth(-1)
        .setScrollFactor(0);
      textoTicket = this.add
        .text(275, 200, "", {
          fontFamily: "Pacifico",
          fontSize: 46,
          color: "#000000",
        })
        .setDepth(11 + alturaPilaPlato + alturaPilaTabla)
        .setScrollFactor(0);
      ticketsleft = ticketsjson.cantTickets;
      tickets = [
        ticketsjson.ticket_1,
        ticketsjson.ticket_2,
        ticketsjson.ticket_3,
        ticketsjson.ticket_4,
        ticketsjson.ticket_5,
        ticketsjson.ticket_6,
      ];
      for (var i = 0; i < tickets.length; i++) {
        if (tickets[i].exists) {
          tickets_shuffle.push(tickets[i]);
        }
      }
      tickets_shuffle.sort(() => Math.random() - 0.5);
      for (var i = 0; i < 6; i++) {
        if (tickets[i].exists == true) {
          comandera[i] = this.add
            .sprite(265 + i * 60, 110, comanderaNombres[i])
            .setScrollFactor(0)
            .setDepth(3)
            .setInteractive();
          comandera[i].id = tickets[i].id;
          comandera[i].content = tickets_shuffle[i].content;
          comandera[i].on("pointerup", function () {
            if (!F_burgerDone && !F_selniv && !F_pausa) {
              //si la hamburguesa no está terminada, se arma el ticket en la pantalla
              s_ticket.play();
              this.setDepth(-1);
              overlayTicket.setInteractive().setDepth(9);
              textoTicket
                .setText(this.id)
                .setDepth(11 + alturaPilaPlato + alturaPilaTabla);
              var separacion = 300 / this.content.length;
              for (var b = 0; b < this.content.length; b++) {
                switch (
                  this.content[b] //5=hamburguesa 4=pan de arriba 3=pan de abajo 2= lechuga, 1=cebolla, 0=tomate
                ) {
                  case 0:
                    dibujoTicket[b] = mundo.add
                      .image(400, 500 - b * separacion, "obj_tomate")
                      .setScrollFactor(0)
                      .setDepth(11 + alturaPilaPlato + alturaPilaTabla);
                    break;
                  case 1:
                    dibujoTicket[b] = mundo.add
                      .image(400, 500 - b * separacion, "obj_cebolla")
                      .setScrollFactor(0)
                      .setDepth(11 + alturaPilaPlato + alturaPilaTabla);
                    break;
                  case 2:
                    dibujoTicket[b] = mundo.add
                      .image(400, 500 - b * separacion, "obj_lechuga")
                      .setScrollFactor(0)
                      .setDepth(11 + alturaPilaPlato + alturaPilaTabla);
                    break;
                  case 3:
                    dibujoTicket[b] = mundo.add
                      .image(400, 500 - b * separacion, "obj_panabajo")
                      .setScrollFactor(0)
                      .setDepth(11 + alturaPilaPlato + alturaPilaTabla);
                    break;
                  case 4:
                    dibujoTicket[b] = mundo.add
                      .image(400, 500 - b * separacion, "obj_panarriba")
                      .setScrollFactor(0)
                      .setDepth(11 + alturaPilaPlato + alturaPilaTabla);
                    break;
                  case 5:
                    dibujoTicket[b] = mundo.add
                      .image(400, 500 - b * separacion, "33")
                      .setScrollFactor(0)
                      .setDepth(11 + alturaPilaPlato + alturaPilaTabla)
                      .setScale(1.3);
                    break;
                }
              }
            } else if (F_burgerDone && !F_selniv && !F_pausa) {
              //si la hamburguesa esta terminada, se inicia la determinación de puntaje

              //s_pedido.play();
              this.removeInteractive();
              this.active = false;
              var cantTabla = tabla_burgers.length;
              var cantTicket = this.content.length;
              console.log(this.content);
              for (var b = 0; b < 6; b++) {
                //FIDELIDAD - compara las repeticiones de cada ingrediente en ticket y en hamburguesa armada
                for (var c = 0; c < cantTabla; c++) {
                  if (tabla_burgers[c].data.values.ing == b) {
                    repeticionesA += 1;
                  }
                }
                for (var d = 0; d < cantTicket; d++) {
                  if (this.content[d] == b) {
                    repeticionesB += 1;
                  }
                }
                if (repeticionesA == repeticionesB) {
                  //si hay igual repeticion que en ticket, se suma puntaje
                  puntajeA += 1;
                } else if (repeticionesA < repeticionesB) {
                  //si hay menos cantidad de cada ingrediente se resta puntaje
                  if (puntajeA > 0) {
                    puntajeA -= 1;
                  }
                }
                repeticionesA = 0;
                repeticionesB = 0;
              }
              //se le da un peso superior a la hamburguesa
              var repeticionesBurgerA = 0;
              var repeticionesBurgerB = 0;
              for (var c = 0; c < cantTabla; c++) {
                if (tabla_burgers[c].data.values.ing == 5) {
                  repeticionesBurgerA += 1;
                  console.log(repeticionesBurgerA);
                }
                if (this.content[c] == 5) {
                  repeticionesBurgerB += 1;
                  console.log(repeticionesBurgerB);
                }
              }
              if (repeticionesBurgerA == repeticionesBurgerB) {
                puntajeA += 5;
              }

              for (var c = 0; c < cantTabla; c++) {
                //chequea contaminación de ingredientes y cocción de las hamburguesas
                if (tabla_burgers[c].data.values.contaminado == true) {
                  F_contaminado = true;
                }
                if (tabla_burgers[c].data.values.ing == 5) {
                  //5 = hamburguesa

                  if (tabla_burgers[c].data.values.ladoA - 3 > 0) {
                    //si se quemo resta puntaje
                    puntajeA -= (tabla_burgers[c].data.values.ladoA - 3) * 2;
                  }
                  if (tabla_burgers[c].data.values.ladoB - 3 > 0) {
                    puntajeA -= (tabla_burgers[c].data.values.ladoB - 3) * 2;
                  }
                }
              }
              if (!F_contaminado) {
                //si no está contaminado, se suma puntaje
                puntajeB += 1;
              }
              for (var c = 0; c < cantTabla; c++) {
                //chequea el orden de los ingredientes, suma puntos de manera acorde, y luego elimina la hamburguesa

                if (tabla_burgers[0].data.values.ing == this.content[c]) {
                  puntajeA += 1;
                }
                tabla_burgers[0].x += 5000;
                tabla_burgers.splice(0, 1);
              }

              F_burgerDone = false;
              overlayBurgerDone.setDepth(-1);
              this.setDepth(-1);
              this.setInteractive(false);
              ticketsleft -= 1;
              if (puntajeA > 0) {
                puntajeA = Phaser.Math.CeilTo(
                  (puntajeA / (11 + this.content.length)) * 100
                );
              } else {
                puntajeA = 0;
              }
              puntajeB = Phaser.Math.CeilTo(puntajeB * 100);
              //si la hamburguesa esta contaminada, el puntaje de salubridad tiene mucho más peso
              if (puntajeB == 0) {
                puntajeTotal = Phaser.Math.CeilTo(
                  (16 * puntajeA + 16 * puntajeB) / 32
                );
              } else {
                puntajeTotal = Phaser.Math.CeilTo(
                  (15 * puntajeA + puntajeB) / 16
                );
              }
              puntajeAfinal += puntajeA;
              puntajeBfinal += puntajeB;
              puntajeTotalfinal += puntajeTotal;

              console.log("Fidelidad:" + puntajeA);
              console.log("Salubridad:" + puntajeB);
              console.log("Total:" + puntajeTotal);

              puntajeA = 0; //fidelidad
              puntajeB = 0; //salubridad
              puntajeTotal = 100;
            }
          });
        }
      }
      for (var i = 0; i < comandera.length; i++) {
        comandera[i].setDepth(-1).disableInteractive();
        comandera[i].active = false;
        comandera[i].timer = this.time.addEvent({
          delay: Phaser.Math.Between(10000, 15000) * i,
          callback: function () {
            s_pedido.play({ volume: 0.25 });
            this.setDepth(3).setInteractive();
            this.active = true;
          },
          callbackScope: comandera[i],
          loop: false,
        });
      }
      console.log(comandera);
      overlayTicket.on(
        "pointerup",
        function () {
          for (var i = 0; i < comandera.length; i++) {
            if (comandera[i].active) {
              comandera[i].setDepth(8);
            }
          }
          overlayTicket.setDepth(-1);
          textoTicket.setDepth(-1);
          for (var i = 0; i < dibujoTicket.length; i++) {
            dibujoTicket[i].destroy();
          }
        },
        this
      );
      var levelsign = this.add
        .sprite(400, 400, "Sp_levelsign")
        .setScale(0.25)
        .setDepth(99)
        .setScrollFactor(0)
        .setAlpha(0);
      levelsign.setFrame(F_nivelactualnum - 1);
      var tween = mundo.tweens.add({
        targets: levelsign,
        alpha: 1,
        duration: 400,
      });
      tween.on("complete", function () {
        var signtimer = mundo.time.addEvent({
          delay: 1200,
          callback: function () {
            mundo.tweens.add({
              targets: levelsign,
              alpha: 0,
              duration: 400,
            });
          },
          callbackScope: comandera[i],
          loop: false,
        });
      });

      F_generartickets = false;
    }

    //escena de lavado
    barraFregadero.anims.play("anim_barra", progresoLav);
    if (F_lavar && !F_manoslimpias && !F_burgerDone && !F_selniv && !F_pausa) {
      overlaySombra.setAlpha(1);
      barraFregadero.setAlpha(1);
    } else {
      overlaySombra.setAlpha(0);
      barraFregadero.setAlpha(0);
      progresoLav = 0;
    }
    if (progresoLav == 9) {
      mundo.tweens.add({
        targets: s_fregadero,
        volume: 0,
        duration: 200,
      });
      s_burbujas.play();
      F_manoslimpias = true;
      progresoLav = 0;
    }
    if (F_manoslimpias) {
      indManos.setFrame(0);
    } else {
      indManos.setFrame(1);
    }

    //nivel terminado
    if (ticketsleft == 0) {
      elapsedTime = levelTimer.getElapsedSeconds();
      console.log(elapsedTime);

      puntajeAfinal = Phaser.Math.CeilTo(
        puntajeAfinal / ticketsjson.cantTickets
      );
      puntajeBfinal = Phaser.Math.CeilTo(
        puntajeBfinal / ticketsjson.cantTickets
      );
      if (elapsedTime / ticketsjson.perfectTime <= 1) {
        puntajeCfinal = 100;
      } else {
        puntajeCfinal = Phaser.Math.CeilTo(
          this.funcionpuntaje(elapsedTime, ticketsjson.perfectTime)
        );
      }
      if (puntajeCfinal < 0) {
        puntajeCfinal = 0;
      }
      puntajeTotalfinal = Phaser.Math.CeilTo(
        ((10 * puntajeTotalfinal) / ticketsjson.cantTickets + puntajeCfinal) /
          11
      );
      F_burgerDone = true;
      overlayPuntaje.setDepth(10 + alturaPilaPlato + alturaPilaTabla);
      if (puntajeTotalfinal > 70) {
        this.add
          .text(460, 150, this.consejos("consejosWin"), {
            font: "16px Raleway",
            color: "#4a4a4a",
            align: "justify",
          })
          .setDepth(10 + alturaPilaPlato + alturaPilaTabla)
          .setScrollFactor(0)
          .setOrigin(0)
          .setWordWrapWidth(210, false);
        this.add
          .text(150, 150, "¡Genial!", {
            font: "24px Raleway",
            color: "#4a4a4a",
          })
          .setDepth(11 + alturaPilaPlato + alturaPilaTabla)
          .setScrollFactor(0);
        s_win.play();
        b_siguiente = this.add
          .image(510, 570, "b_siguiente")
          .setScrollFactor(0)
          .setDepth(11 + alturaPilaPlato + alturaPilaTabla)
          .setInteractive();
        F_nivelactualnum++;
      } else {
        this.add
          .text(460, 150, this.consejos("consejosLose"), {
            font: "16px Raleway",
            color: "#4a4a4a",
            align: "justify",
          })
          .setDepth(11 + alturaPilaPlato + alturaPilaTabla)
          .setScrollFactor(0)
          .setOrigin(0)
          .setWordWrapWidth(210, false);
        this.add
          .text(150, 150, "Intenta de nuevo...", {
            font: "24px Raleway",
            color: "#4a4a4a",
          })
          .setDepth(11 + alturaPilaPlato + alturaPilaTabla)
          .setScrollFactor(0);
        s_lose.play();
        b_siguiente = this.add
          .image(510, 570, "b_reintentar")
          .setScrollFactor(0)
          .setDepth(11 + alturaPilaPlato + alturaPilaTabla)
          .setInteractive();
      }

      this.add
        .text(300, 205, puntajeAfinal + "%", {
          font: "24px Raleway",
          color: "#4a4a4a",
        })
        .setDepth(11 + alturaPilaPlato + alturaPilaTabla)
        .setScrollFactor(0)
        .setOrigin(0);
      this.add
        .text(300, 180, puntajeBfinal + "%", {
          font: "24px Raleway",
          color: "#4a4a4a",
        })
        .setDepth(11 + alturaPilaPlato + alturaPilaTabla)
        .setScrollFactor(0)
        .setOrigin(0);
      this.add
        .text(300, 230, puntajeCfinal + "%", {
          font: "24px Raleway",
          color: "#4a4a4a",
        })
        .setDepth(11 + alturaPilaPlato + alturaPilaTabla)
        .setScrollFactor(0)
        .setOrigin(0);
      this.add
        .text(300, 340, puntajeTotalfinal + "%", {
          font: "24px Raleway",
          color: "#4a4a4a",
        })
        .setDepth(11 + alturaPilaPlato + alturaPilaTabla)
        .setScrollFactor(0)
        .setOrigin(0);
      b_volver = this.add
        .image(400, 570 + 89, "b_volver")
        .setScrollFactor(0)
        .setDepth(11 + alturaPilaPlato + alturaPilaTabla)
        .setInteractive();
      b_volver.on("pointerup", this.volverMenu, this);

      if (F_nivelactualnum > 6 && puntajeTotalfinal > 70) {
        b_siguiente.on("pointerup", this.volverMenu, this);
      } else {
        b_siguiente.on("pointerup", this.changelevel, this);
      }

      b_niveles = this.add
        .image(290, 570, "b_niveles")
        .setScrollFactor(0)
        .setDepth(11 + alturaPilaPlato + alturaPilaTabla)
        .setInteractive();
      b_niveles.on("pointerup", this.levelselect, this);
      ticketsleft = 99;
    }

    //cocinado de hamburguesas
    for (var a = 0; a < ctndr_burgers.length; a++) {
      if (ctndr_burgers[a] != undefined) {
        if (
          ctndr_burgers[a].data.values.celda != undefined &&
          ctndr_burgers[a].data.values.agarrada == false &&
          !F_burgerDone &&
          !F_selniv &&
          !F_pausa
        ) {
          ctndr_burgers[a].data.values.cocinado++;
          if (
            ctndr_burgers[a].data.values.cocinado % 400 === 0 &&
            ctndr_burgers[a].data.values.ladoB < 5
          ) {
            ctndr_burgers[a].data.values.ladoB++;
            ctndr_burgers[a].anims.play(
              String(ctndr_burgers[a].data.values.ladoA).concat(
                ctndr_burgers[a].data.values.ladoB
              )
            );
          }
        }
        //Barra de progreso
        ctndr_burgers[a].data.values.progBarBack
          .clear()
          .fillStyle(0xffffff, 0.5)
          .fillRect(ctndr_burgers[a].x - 30, ctndr_burgers[a].y - 55, 60, 25);
        if (
          ctndr_burgers[a] != undefined &&
          ctndr_burgers[a].data.values.progBar != undefined
        ) {
          ctndr_burgers[a].data.values.progBar.clear();
          if (ctndr_burgers[a].data.values.ladoB < 3) {
            ctndr_burgers[a].data.values.progBar.fillStyle(0xf5e211, 1);
          } else if (ctndr_burgers[a].data.values.ladoB < 4) {
            ctndr_burgers[a].data.values.progBar.fillStyle(0x3fdb0f, 1);
          } else if (ctndr_burgers[a].data.values.ladoB < 5) {
            ctndr_burgers[a].data.values.progBar.fillStyle(0xeb2d21, 1);
          } else {
            ctndr_burgers[a].data.values.progBar.fillStyle(0x4f0806, 1);
          }
          if (ctndr_burgers[a].data.values.cocinado < 1200) {
            ctndr_burgers[a].data.values.progBar.fillRect(
              ctndr_burgers[a].x - 25,
              ctndr_burgers[a].y - 40,
              (ctndr_burgers[a].data.values.cocinado / 1200) * 50,
              5
            );
          } else {
            ctndr_burgers[a].data.values.progBar.fillRect(
              ctndr_burgers[a].x - 25,
              ctndr_burgers[a].y - 40,
              50,
              5
            );
          }
        }
        if (
          ctndr_burgers[a] != undefined &&
          ctndr_burgers[a].data.values.progBarA != undefined
        ) {
          ctndr_burgers[a].data.values.progBarA.clear();
          if (ctndr_burgers[a].data.values.ladoA < 3) {
            ctndr_burgers[a].data.values.progBarA.fillStyle(0xf5e211, 1);
          } else if (ctndr_burgers[a].data.values.ladoA < 4) {
            ctndr_burgers[a].data.values.progBarA.fillStyle(0x3fdb0f, 1);
          } else if (ctndr_burgers[a].data.values.ladoA < 5) {
            ctndr_burgers[a].data.values.progBarA.fillStyle(0xeb2d21, 1);
          } else {
            ctndr_burgers[a].data.values.progBarA.fillStyle(0x4f0806, 1);
          }
          if (ctndr_burgers[a].data.values.cocinadoA < 1200) {
            ctndr_burgers[a].data.values.progBarA.fillRect(
              ctndr_burgers[a].x - 25,
              ctndr_burgers[a].y - 50,
              (ctndr_burgers[a].data.values.cocinadoA / 1200) * 50,
              5
            );
          } else {
            ctndr_burgers[a].data.values.progBarA.fillRect(
              ctndr_burgers[a].x - 25,
              ctndr_burgers[a].y - 50,
              50,
              5
            );
          }
        }
        ctndr_burgers[a].data.values.progBarBack
          .fillStyle(0xffffff, 1)
          .fillRect(ctndr_burgers[a].x + 10, ctndr_burgers[a].y - 55, 2, 25);
      }
    }

    //estación de cocina

    if (estacion == 1) {
      for (var a = 0; a < ctndr_burgers.length; a++) {
        this.input.setDraggable(ctndr_burgers[a], true);
      }
      //reacciona a la bandera, crea una hamburguesa
      if (F_burgerCrear) {
        this.createBurger();
        F_burgerCrear = false;
      }

      for (i = cant_burgers; i > 0; i--) {
        if (ctndr_burgers[i - 1] != undefined && !F_burgerAgarrada) {
          if (
            ctndr_burgers[i - 1].x >= limitesCeldasX1[0] &&
            ctndr_burgers[i - 1].x < limitesCeldasX2[0] &&
            ctndr_burgers[i - 1].y >= limitesCeldasY1[0] &&
            ctndr_burgers[i - 1].y < limitesCeldasY2[0]
          ) {
            this.situarBurger(i, 0);
          } else if (
            ctndr_burgers[i - 1].x >= limitesCeldasX1[1] &&
            ctndr_burgers[i - 1].x < limitesCeldasX2[1] &&
            ctndr_burgers[i - 1].y >= limitesCeldasY1[1] &&
            ctndr_burgers[i - 1].y < limitesCeldasY2[1]
          ) {
            this.situarBurger(i, 1);
          } else if (
            ctndr_burgers[i - 1].x >= limitesCeldasX1[2] &&
            ctndr_burgers[i - 1].x < limitesCeldasX2[2] &&
            ctndr_burgers[i - 1].y >= limitesCeldasY1[2] &&
            ctndr_burgers[i - 1].y < limitesCeldasY2[2]
          ) {
            this.situarBurger(i, 2);
          } else if (
            ctndr_burgers[i - 1].x >= limitesCeldasX1[3] &&
            ctndr_burgers[i - 1].x < limitesCeldasX2[3] &&
            ctndr_burgers[i - 1].y >= limitesCeldasY1[3] &&
            ctndr_burgers[i - 1].y < limitesCeldasY2[3]
          ) {
            this.situarBurger(i, 3);
          } else if (
            ctndr_burgers[i - 1].x >= limitesCeldasX1[4] &&
            ctndr_burgers[i - 1].x < limitesCeldasX2[4] &&
            ctndr_burgers[i - 1].y >= limitesCeldasY1[4] &&
            ctndr_burgers[i - 1].y < limitesCeldasY2[4]
          ) {
            this.situarBurger(i, 4);
          } else if (
            ctndr_burgers[i - 1].x >= limitesCeldasX1[5] &&
            ctndr_burgers[i - 1].x < limitesCeldasX2[5] &&
            ctndr_burgers[i - 1].y >= limitesCeldasY1[5] &&
            ctndr_burgers[i - 1].y < limitesCeldasY2[5]
          ) {
            this.situarBurger(i, 5);
          } else if (
            ctndr_burgers[i - 1].x >= 560 + 550 &&
            ctndr_burgers[i - 1].x < 700 + 550 &&
            ctndr_burgers[i - 1].y >= 350 &&
            ctndr_burgers[i - 1].y < 500
          ) {
            this.platoBurger(i);
          } else {
            this.deleteBurger(i);
          }
        }
      }
    } else {
      for (var a = 0; a < ctndr_burgers.length; a++) {
        this.input.setDraggable(ctndr_burgers[a], false);
      }
    }
    //estación de armado
    if (estacion == 2) {
      for (var b = 0; b < plato_burgers.length; b++) {
        if (!F_burgerAgarrada && plato_burgers[b].data.values.lastplato) {
          if (
            plato_burgers[b].x >= 1300 &&
            plato_burgers[b].x < 1500 &&
            plato_burgers[b].y >= 430 - 7 * alturaPilaTabla &&
            plato_burgers[b].y < 515
          ) {
            this.situarBurgerTabla(b);
          } else {
            plato_burgers[b].x = 627 + 550;
            plato_burgers[b].y = 455 + 10 - alturaPilaPlato;
          }
          if (plato_burgers[b] != undefined) {
            if (
              plato_burgers[b].data.values.ladoA < 3 ||
              plato_burgers[b].data.values.ladoB < 3
            ) {
              for (var c = 0; c < plato_burgers.length; c++) {
                plato_burgers[b].data.values.contaminado = true;
              }
            }
          }
        }
      }
      for (var a = 0; a < plato_burgers.length; a++) {
        if (plato_burgers[a].data.values.lastplato) {
          this.input.setDraggable(plato_burgers[a], true);
        }
      }
      for (var b = 0; b < ctndr_ing.length; b++) {
        if (!F_burgerAgarrada) {
          if (
            ctndr_ing[b].x >= 1300 &&
            ctndr_ing[b].x < 1500 &&
            ctndr_ing[b].y >= 430 - alturaPilaTabla &&
            ctndr_ing[b].y < 515
          ) {
            s_hit.play();
            alturaPilaTabla += 10;
            tabla_burgers.push(ctndr_ing[b]);
            ctndr_ing[b].setDepth(tabla_burgers.length);
            ctndr_ing[b].x = 1380;
            ctndr_ing[b].y = 480 - alturaPilaTabla;
            if (!F_manoslimpias) {
              ctndr_ing[b].data.values.contaminado = true;
            }
            if (ctndr_ing[b].data.values.ing == 9000) {
              F_burgerDone = true;
              overlayBurgerDone.setDepth(
                10 + alturaPilaPlato + alturaPilaTabla
              );
              b_basura.setDepth(8);
              alturaPilaTabla = 0;
            }
            ctndr_ing.splice(b, 1);
          } else {
            ctndr_ing[b].x += 5000;
            ctndr_ing[b].destroy;
          }
        }
      }
    } else {
      for (var a = 0; a < plato_burgers.length; a++) {
        this.input.setDraggable(plato_burgers[a], false);
      }
    }
  }
  /*
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
*/
  //Crea una burger
  createBurger() {
    F_manoslimpias = false;
    this.newBurger = this.add.sprite(
      this.input.mousePointer.x + cam.scrollx,
      this.input.mousePointer.y,
      "11"
    );
    this.newBurger.setScale(1.6);
    cant_burgers++;
    ctndr_burgers.push(this.newBurger);
    this.newBurger.setInteractive();
    this.newBurger.setData({
      progBarBack: undefined,
      progBar: undefined,
      progBarA: undefined,
      ladoA: 1,
      ladoB: 1,
      cocinado: 0,
      cocinadoA: 0,
      flip: 0,
      enplato: false,
      entabla: false,
      contaminado: false,
      ing: 5,
      celda: undefined,
      agarrada: false,
    });
    this.newBurger.data.values.progBarBack = this.add.graphics().setAlpha(0);
    this.newBurger.data.values.progBar = this.add.graphics().setAlpha(0);
    this.newBurger.data.values.progBarA = this.add.graphics().setAlpha(0);
    this.input.on("pointermove", this.follow, this); //sigue al cursor
    this.input.on("pointerup", this.drop, this); //si se suelta, se vuelve draggeable
    this.input.on("drag", this.drag, this); //al draggear, la burger está agarrada
    this.newBurger.on("pointerup", this.clickBurger, this.newBurger);
    this.newBurger.on("drag", this.dragBurger, this.newBurger);
    F_burgerAgarrada = true;
  }
  createIng(ingrediente, ingNum) {
    this.newIng = this.add
      .sprite(
        this.input.mousePointer.x + cam.scrollx,
        this.input.mousePointer.y,
        ingrediente
      )
      .setScale(1.2);
    //this.newIng.setInteractive();
    this.newIng.setData({
      entabla: false,
      contaminado: false,
      ing: ingNum,
    });
    this.newIng.setDepth(999);
    ctndr_ing.push(this.newIng);
    this.input.on("pointermove", this.followIng, this); //sigue al cursor
    this.input.on("pointerup", this.dropIng, this); //si se suelta, se vuelve draggeable
    this.input.on("drag", this.drag, this); //al draggear, la burger está agarrada
    //this.newIng.on("pointerup", this.clickBurger, this.newIng);
    //this.newIng.on("drag", this.dragBurger, this.newIng);
    F_burgerAgarrada = true;
  }

  follow(pointer) {
    F_burgerAgarrada = true;
    this.newBurger.x = pointer.x + 550;
    this.newBurger.y = pointer.y;
  }
  followIng(pointer) {
    this.newIng.x = pointer.x + 950;
    this.newIng.y = pointer.y;
  }
  drop(pointer) {
    this.input.off("pointermove", this.follow, this);
    F_burgerAgarrada = false;
  }
  dropIng(pointer) {
    this.input.off("pointermove", this.followIng, this);
    F_burgerAgarrada = false;
  }

  clickBurger() {
    this.data.values.progBarBack.clear();
    this.data.values.progBar.clear();
    this.data.values.progBarA.clear();

    this.data.values.progBarBack.setAlpha(1);
    this.data.values.progBar.setAlpha(1);
    this.data.values.progBarA.setAlpha(1);
    if (
      !F_burgerAgarrada &&
      this.data.values.enplato == false &&
      this.data.values.entabla == false
    ) {
      var b = this.data.values.ladoA;
      this.data.values.ladoA = this.data.values.ladoB;
      this.data.values.ladoB = b;
      this.anims.play(
        String(this.data.values.ladoA).concat(this.data.values.ladoB)
      );
      var c = this.data.values.cocinadoA;
      this.data.values.cocinadoA = this.data.values.cocinado;
      this.data.values.cocinado = c;
    }
    this.data.values.agarrada = false;
  }
  dragBurger() {
    this.data.values.agarrada = true;
    if (alturaPilaTabla > alturaPilaPlato) {
      this.setDepth(alturaPilaTabla);
    } else {
      this.setDepth(alturaPilaPlato);
    }
    this.data.values.progBarBack.clear();
    this.data.values.progBar.clear();
    this.data.values.progBarA.clear();
    this.data.values.progBarBack.setAlpha(0);
    this.data.values.progBar.setAlpha(0);
    this.data.values.progBarA.setAlpha(0);
  }
  drag() {
    F_burgerAgarrada = true;
  }
  deleteBurger(i) {
    ctndr_burgers[i - 1].data.values.progBarBack.clear();
    ctndr_burgers[i - 1].data.values.progBar.clear();
    ctndr_burgers[i - 1].data.values.progBarA.clear();
    if (ctndr_burgers[i - 1].data.values.celda != undefined) {
      F_celdas[ctndr_burgers[i - 1].data.values.celda] = 0;
    }
    ctndr_burgers[i - 1].data.values.celda = undefined;
    ctndr_burgers[i - 1].x = 5000;
    ctndr_burgers.splice(i - 1, 1);
    cant_burgers--;
  }
  platoBurger(i) {
    ctndr_burgers[i - 1].data.values.progBarBack.clear();
    ctndr_burgers[i - 1].data.values.progBar.clear();
    ctndr_burgers[i - 1].data.values.progBarA.clear();
    if (ctndr_burgers[i - 1].data.values.celda != undefined) {
      //vacía la celda anterior
      F_celdas[ctndr_burgers[i - 1].data.values.celda] = 0;
    }
    ctndr_burgers[i - 1].data.values.celda = 7; //lo pone en celda 7=plato
    ctndr_burgers[i - 1].x = 627 + 550;
    ctndr_burgers[i - 1].y = 455 - alturaPilaPlato;
    //this.input.setDraggable(ctndr_burgers[i - 1], false);
    ctndr_burgers[i - 1].depth = plato_burgers.length; //layering
    ctndr_burgers[i - 1].data.values.enplato = true;
    ctndr_burgers[i - 1].data.values.lastplato = true;
    if (plato_burgers[plato_burgers.length - 1] != undefined) {
      plato_burgers[plato_burgers.length - 1].data.values.lastplato = false; //impide que el jugador acceda a la hamburguesa de abajo
    }
    plato_burgers.push(ctndr_burgers[i - 1]);

    ctndr_burgers.splice(i - 1, 1);
    cant_burgers--;
    alturaPilaPlato = alturaPilaPlato + 10;
  }
  situarBurger(i, a) {
    //si pertenece a la celda
    if (ctndr_burgers[i - 1].data.values.celda == a) {
      //se sitúa en el centro de la celda

      ctndr_burgers[i - 1].x = celdasX[a];
      ctndr_burgers[i - 1].y = celdasY[a];
    }
    //si la celda está vacía
    else if (F_celdas[a] == 0) {
      //se sitúa en el centro de la celda
      ctndr_burgers[i - 1].x = celdasX[a];
      ctndr_burgers[i - 1].y = celdasY[a];
      if (ctndr_burgers[i - 1].data.values.celda != a) {
        F_celdas[ctndr_burgers[i - 1].data.values.celda] = 0; //se vacía la celda anterior
      }
      ctndr_burgers[i - 1].data.values.celda = a; //burger pertenece a celda actual
      F_celdas[a] = 1; //se llena celda actual
    }
    //si no pertenece ni está vacía
    else {
      if (ctndr_burgers[i - 1].data.values.celda == undefined) {
        //si no pertenece a otra celda, se elimina
        this.deleteBurger(i);
      } else {
        //si pertenece a otra celda, se regresa a su celda
        ctndr_burgers[i - 1].x =
          celdasX[ctndr_burgers[i - 1].data.values.celda];
        ctndr_burgers[i - 1].y =
          celdasY[ctndr_burgers[i - 1].data.values.celda];
      }
    }
  }
  situarBurgerTabla(b) {
    if (
      plato_burgers[b].data.values.enplato == true &&
      plato_burgers[b].data.values.lastplato == true &&
      estacion == 2 &&
      !F_burgerDone &&
      !F_burgerAgarrada
    ) {
      alturaPilaTabla += 10;
      mundo.input.setDraggable(plato_burgers[b], false);
      plato_burgers[b].x = 1380;
      plato_burgers[b].y = 480 - alturaPilaTabla;
      tabla_burgers.push(plato_burgers[b]);
      plato_burgers[b].depth = tabla_burgers.length;
      plato_burgers[b].data.values.enplato = false;
      plato_burgers[b].data.values.lastplato = false;
      plato_burgers[b].data.values.entabla = true;
      plato_burgers.splice(plato_burgers.length - 1, 1);
      if (plato_burgers[plato_burgers.length - 1] != undefined) {
        plato_burgers[plato_burgers.length - 1].data.values.lastplato = true;
      }
      alturaPilaPlato -= 10;
      s_hit.play();
    }
  }
  situarEnTabla(ing) {
    ingrediente = this.add.image(627 + 550 + 200, 455 - alturaPilaTabla, ing);
    alturaPilaTabla += 10;
  }
  prog_lavado() {
    if (progresoLav < 9 && F_lavar) {
      barraFregadero.anims.nextFrame();
      progresoLav += 1;
    }
  }
  volverMenu() {
    if (F_burgerDone || F_pausa || F_selniv) {
      s_click.play();
      estacion = 1; //ESTACION ACTUAL 0 = lavado, 1 = cocina, 2 = armado
      tickets_shuffle = [];
      dibujoTicket = [];
      b_nivel = [];
      b_niveltexto = [];
      ctndr_burgers = [];
      plato_burgers = [];
      tabla_burgers = [];
      F_burgerCrear = false; //BANDERAS
      F_burgerAgarrada = true;
      F_burgerDone = false;
      F_pausa = false;
      F_selniv = false;
      F_manoslimpias = true;
      F_contaminado = false;
      F_lavar = false;
      F_generartickets = false;
      celdasX = [205, 320, 440, 205, 320, 440]; //centros de cada celda
      celdasY = [400, 400, 400, 480, 480, 480];
      limitesCeldasX1 = [140, 260, 380, 140, 260, 380]; //límites de cada celda
      limitesCeldasX2 = [260, 380, 500, 260, 380, 500];
      limitesCeldasY1 = [360, 360, 360, 440, 440, 440];
      limitesCeldasY2 = [440, 440, 440, 520, 520, 520];
      F_celdas = [0, 0, 0, 0, 0, 0];
      alturaPilaPlato = 0;
      alturaPilaTabla = 0;
      comandera = [];
      comanderaNombres = [
        "ticket1",
        "ticket2",
        "ticket3",
        "ticket4",
        "ticket5",
        "ticket6",
      ];
      puntajeA = 0; //fidelidad
      puntajeB = 0; //salubridad
      puntajeC = 100; //tiempo
      puntajeTotal = 100;
      puntajeAfinal = 0; //fidelidad
      puntajeBfinal = 0; //salubridad
      puntajeCfinal = 100; //tiempo
      puntajeTotalfinal = 0;
      repeticionesA = 0;
      repeticionesB = 0;

      s_plancha.stop();
      bgm_gameplay.stop();
      s_ambiente.stop();

      this.scene.restart();
      this.scene.switch("mainmenu");

      F_reseteado = true;
    }
  }
  levelselect() {
    if (F_burgerDone || F_pausa || F_selniv) {
      s_click.play();
      estacion = 1; //ESTACION ACTUAL 0 = lavado, 1 = cocina, 2 = armado
      dibujoTicket = [];
      tickets_shuffle = [];
      b_nivel = [];
      b_niveltexto = [];
      ctndr_burgers = [];
      plato_burgers = [];
      tabla_burgers = [];
      F_burgerCrear = false; //BANDERAS
      F_burgerAgarrada = true;
      F_burgerDone = false;
      F_pausa = false;
      F_selniv = false;
      F_manoslimpias = true;
      F_contaminado = false;
      F_lavar = false;
      F_generartickets = false;
      celdasX = [205, 320, 440, 205, 320, 440]; //centros de cada celda
      celdasY = [400, 400, 400, 480, 480, 480];
      limitesCeldasX1 = [140, 260, 380, 140, 260, 380]; //límites de cada celda
      limitesCeldasX2 = [260, 380, 500, 260, 380, 500];
      limitesCeldasY1 = [360, 360, 360, 440, 440, 440];
      limitesCeldasY2 = [440, 440, 440, 520, 520, 520];
      F_celdas = [0, 0, 0, 0, 0, 0];
      alturaPilaPlato = 0;
      alturaPilaTabla = 0;
      comandera = [];
      comanderaNombres = [
        "ticket1",
        "ticket2",
        "ticket3",
        "ticket4",
        "ticket5",
        "ticket6",
      ];
      puntajeA = 0; //fidelidad
      puntajeB = 0; //salubridad
      puntajeC = 100; //tiempo
      puntajeTotal = 100;
      puntajeAfinal = 0; //fidelidad
      puntajeBfinal = 0; //salubridad
      puntajeCfinal = 100; //tiempo
      puntajeTotalfinal = 0;
      repeticionesA = 0;
      repeticionesB = 0;

      s_plancha.stop();
      bgm_gameplay.stop();
      s_ambiente.stop();

      this.scene.restart();

      F_reseteado = true;
    }
  }
  changelevel() {
    this.levelselect();
    F_nivelactual = "level" + F_nivelactualnum;
    F_generartickets = true;
  }
  consejos(condicion) {
    var consejosjson = mundo.cache.json.get(condicion);
    var consejos = [
      consejosjson.con1,
      consejosjson.con2,
      consejosjson.con3,
      consejosjson.con4,
      consejosjson.con5,
    ];
    return consejos[Phaser.Math.Between(0, 4)];
  }
  funcionpuntaje(x, z) {
    return -100 * ((x - z) / (2 * z)) + 100;
  }
}

export default gamescene;
