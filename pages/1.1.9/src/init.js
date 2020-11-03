import Bootloader from "./bootloader.js";
import mainmenu from "./scenes/mainmenu.js";
import gamescene from "./scenes/gamescene.js";
import ayuda from "./scenes/ayuda.js";

const config = {
  width: 800,
  height: 800,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 800
},
  parent: "container",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: [Bootloader, mainmenu, ayuda, gamescene],
};

new Phaser.Game(config);
