var mundo;
var boton;
var boton2;
var boton3;
var overlay;
var music;
var musicConfig = {
    loop:true,
    mute:false,
    volume:1
}
var b_mute;
var F_volumenbajo = false;
var F_reseteado = false;

class mainmenu extends Phaser.Scene {
    constructor() {
        super({key: "mainmenu"});
    }

    create(){
        mundo = this;

        this.anims.create({
            key: 'sound_on',
            frames: [ { key: 'sp_b_mute', frame: 0 } ],
            frameRate: 20,
        })
        this.anims.create({
            key: 'sound_off',
            frames: [ { key: 'sp_b_mute', frame: 1 } ],
            frameRate: 20,
        })

        
        b_mute = this.add.sprite(760,760,'sp_b_mute').setScale(0.2).setDepth(10).setInteractive();
        if(mundo.sound.mute){
            b_mute.setFrame(1);
        }

        b_mute.on("pointerup",function(){
            if(!mundo.sound.mute){
                mundo.sound.mute = true;
                b_mute.setFrame(1);

            }
            else{
                mundo.sound.mute = false;
                b_mute.setFrame(0);
            }
        },this)

        music = this.sound.add("bgm_mainmenu");
        music.play(musicConfig);
        music.inicio = true;

        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
        

        this.add.image(center_width,center_height,'bg_mainmenu');
        
        
        boton = this.add.sprite(center_width,center_height+150,'b_jugar').setInteractive();
        boton2 = this.add.sprite(center_width,center_height+250,'b_ayuda').setInteractive();
        boton3 = this.add.sprite(center_width,center_height+350,'b_creditos').setInteractive();
        overlay = this.add.image(center_width,center_height,'creditos').setDepth(-1).setInteractive();

        boton.on('pointerup',function(){
            music.stop();
            F_reseteado = true;
            
            this.scene.restart();
            this.scene.switch('gamescene');
        },this);
        boton2.on('pointerup',function(){
            this.scene.switch('ayuda');
            music.volume = 0.5;
        },this);
        boton3.on('pointerup',function(){
            overlay.setDepth(2);
            music.volume = 0.5;
            F_volumenbajo=true;
        },this);
        overlay.on('pointerup',function(){       
            overlay.setDepth(-1);  
            F_volumenbajo=false; 
        },this);
        if(F_reseteado){
            music.stop();
            F_reseteado = false;
        }
    }
    update(){
        if(!F_volumenbajo){
            music.volume = 1;
        }
        else{
            music.volume = 0.5;
        }
        if(!F_reseteado){
            music.play(musicConfig);
            F_reseteado = true;
        }
        if(mundo.sound.mute){
            b_mute.setFrame(1);
        }
    }
        
}

export default mainmenu;