var boton;
var boton2;

class ayuda extends Phaser.Scene {
    constructor() {
        super({key: "ayuda"});
    }

    create(){
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;

        this.add.image(center_width,center_height,'bg_help');
        boton = this.add.sprite(680,750,'b_jugar').setInteractive().setAlpha(0.001);
        

        boton.on('pointerup',function(){
            console.log("From menu to game");
            this.scene.switch('mainmenu');
        },this);
        
    }
}

export default ayuda;