import Bootloader from "./bootloader.js";
import mainmenu from "./scenes/mainmenu.js";
import gamescene from "./scenes/gamescene.js";
import ayuda from "./scenes/ayuda.js";
import logounraf from "./scenes/logounraf.js";

const config = {
  width: 800,
  height: 800,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "phaser-example",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  parent: "container",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: [Bootloader, logounraf, mainmenu, ayuda, gamescene],
};

new Phaser.Game(config);
