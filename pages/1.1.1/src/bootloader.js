class Bootloader extends Phaser.Scene {
    constructor() {
        super({key: "Bootloader"});
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
            text: 'Cargando...',
            style: {
                font: '20px Open Sans',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px Open Sans',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px Open Sans',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Cargando asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
    

    
        //hacer acá abajo el preload
        this.load.spritesheet('Sp_freezer','./assets/sp_freezer.png', {frameWidth: 222, frameHeight: 327});
        this.load.spritesheet('Sp_burger','./assets/sp_burger.png', {frameWidth: 48, frameHeight: 25});

        this.load.image('11','./assets/burgerstates/11.png');
       

        this.load.image('hb_bowls','./assets/hb_bowls.png');
        this.load.image('hb_fregadero','./assets/hb_fregadero.png');
        this.load.image('obj_panarriba','./assets/obj_panarriba.png');
        this.load.image('obj_panabajo','./assets/obj_panabajo.png');
        this.load.image('obj_tomate','./assets/obj_tomate.png');
        this.load.image('obj_lechuga','./assets/obj_lechuga.png');
        this.load.image('obj_cebolla','./assets/obj_cebolla.png');

        this.load.image('Sp_fondo','./assets/fondo.png');
        this.load.image('bg_mainmenu','./assets/bg_menu.png');
        this.load.image('bg_help','./assets/bg_help.png');
        this.load.image('b_jugar','./assets/b_jugar.png');
        this.load.image('b_ayuda','./assets/b_ayuda.png');
        this.load.image('b_creditos','./assets/b_creditos.png');
        this.load.image('b_volver','./assets/b_volver.png');
        this.load.image('b_basura','./assets/b_basura.png');
        this.load.image('b_continuar','./assets/b_continuar.png');
        this.load.image('b_salir','./assets/b_salir.png');

        this.load.image('ticket1','./assets/ticket_1.png');
        this.load.image('ticket2','./assets/ticket_2.png');
        this.load.image('bg_gamescene','./assets/bg_gamescene.png');
        this.load.image('overlay','./assets/overlay_gamescene.png');
        this.load.image('creditos','./assets/overlay_creditos.png');
        this.load.image('overlay_1_1','./assets/overlay_ticket1_nivel1.png');
        this.load.image('overlay_1_2','./assets/overlay_ticket2_nivel1.png');
        this.load.image('overlay_burgerDone','./assets/overlay_burgerdone.png');
        this.load.image('overlay_puntaje','./assets/overlay_puntaje.png');
        this.load.image('overlay_barra','./assets/sombra_barrafregadero.png');
        this.load.image('overlay_pausa','./assets/overlay_pausa.png');
        this.load.spritesheet('sp_b_armado','./assets/sp_b_armado.png',{frameWidth: 224, frameHeight: 75});
        this.load.spritesheet('sp_b_fregadero','./assets/sp_b_fregadero.png',{frameWidth: 224, frameHeight: 75});
        this.load.spritesheet('sp_b_plancha','./assets/sp_b_plancha.png',{frameWidth: 224, frameHeight: 75});
        this.load.spritesheet('sp_b_pausa','./assets/sp_b_pausa.png',{frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('sp_manos','./assets/sp_manos.png',{frameWidth: 134, frameHeight: 134});
        this.load.spritesheet('sp_barra','./assets/sp_barrafregadero.png',{frameWidth: 450, frameHeight: 250});
    }
    
}

export default Bootloader;
