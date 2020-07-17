var boton;
var s_click;
var boton2;

class ayuda extends Phaser.Scene {
    constructor() {
        super({key: "ayuda"});
    }

    create(){
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;

        s_click = this.sound.add("s_click");

        this.add.image(center_width,center_height,'bg_help');
        boton = this.add.sprite(680,750,'b_jugar').setInteractive().setAlpha(0.001);
        

        boton.on('pointerup',function(){
            s_click.play();
            console.log("From menu to game");
            this.scene.switch('mainmenu');
        },this);
        
    }
}

export default ayuda;