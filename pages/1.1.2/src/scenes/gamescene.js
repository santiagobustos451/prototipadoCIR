//importar objetos aquí

//variables aquí

var i;
const burgerstatenames = ['11','12','13','14','15','21','22','23','24','25','31','32','33','34','35','41','42','43','44','45','51','52','53','54','55'];
var botFregadero; //BOTONERA ESTACIONES
var botArmado;
var botPlancha;
var estacion=1;//ESTACION ACTUAL 0 = lavado, 1 = cocina, 2 = armado
var freezer;
var overlayGUI;//overlays
var overlaySombra;
var barraFregadero;
var overlayTicket;
//var overlayTicket2;
var overlayBurgerDone;
var overlayPausa;
var overlayPuntaje;
var b_basura; //BOTONES E INDICADORES GUI
var b_pausa;
var indManos;
var b_continuar; //BOTONES PAUSA Y PUNTAJE
var b_salir;
var b_volver;
var ctndr_burgers = [];
var plato_burgers = [];
var tabla_burgers = [];
var F_burgerCrear = false; //BANDERAS
var F_burgerAgarrada = true;
var F_burgerDone = false;
var F_manoslimpias = true;
var F_contaminado = false;
var F_lavar = false;
var progresoLav = 0;
var cant_burgers = 0;
var celdasX = [205,320,440,205,320,440];//centros de cada celda
var celdasY = [400,400,400,480,480,480];
var limitesCeldasX1 = [140,260,380,140,260,380];//límites de cada celda
var limitesCeldasX2 = [260,380,500,260,380,500];
var limitesCeldasY1 = [360,360,360,440,440,440];
var limitesCeldasY2 = [440,440,440,520,520,520];
var F_celdas = [0,0,0,0,0,0];
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

var ticket1;
var ticket2;
var ticket3;
var ticket4;
var ticket5;
var ticket6;

/*var ticket1;
var ticket1_lista = [3,5,0,1,2,4];//5=hamburguesa 4=pan de arriba
var ticket2;
var ticket2_lista = [3,5,0,5,0,4];//3=pan de abajo 2= lechuga, 1=cebolla, 0=tomate
*/

var tickets = [
    {
        id: 1,
        contenido: [3,5,0,1,2,4]
    },
    {
        id: 2,
        contenido: [3,5,0,5,0,4]
    }
]

var puntajeA=0;//fidelidad
var puntajeB=0;//salubridad
var puntajeC=100;//tiempo
var puntajeTotal = 100;
var puntajeA1=0;//fidelidad
var puntajeB1=0;//salubridad
var puntajeC1=100;//tiempo
var puntajeTotal1 = 100;
var puntajeA2=0;//fidelidad
var puntajeB2=0;//salubridad
var puntajeC2=100;//tiempo
var puntajeTotal2 = 100;
var ticketsleft = 2;


var repeticionesA = 0;
var repeticionesB = 0;

class gamescene extends Phaser.Scene {
    constructor() {
        super({key: "gamescene"});
    }
    
    //create
    create (){

        //centro de la pantalla

        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;

        //hitbox de fregadero

        hb_fregadero = this.add.image(center_width-50,center_height,'hb_fregadero').setDepth(1).setAlpha(0.001).setInteractive();
        hb_fregadero.on('pointerdown',function(){
            F_lavar = true;
        });
        hb_fregadero.on('pointerout',function(){
            F_lavar = false;
        });
        hb_fregadero.on('pointerup',function(){
            F_lavar = false;
        });

        //animación barra lavado de manos

        this.anims.create({
            key: 'anim_barra',
            frames: this.anims.generateFrameNumbers('sp_barra', { start: 0, end: 9}),
            frameRate: 0
        })

        //overlay de hamburguesa hecha y boton de basura

        overlayBurgerDone = this.add.image(center_width,center_height,'overlay_burgerDone').setDepth(-1).setScrollFactor(0);
        b_basura = this.add.image(600,110,'b_basura').setDepth(-1).setScrollFactor(0).setInteractive();
        b_basura.on('pointerup',function(){
            if(F_burgerDone){
                var elimina2=tabla_burgers.length;
                for(var a=0;a<elimina2;a++){
                    tabla_burgers[0].x = 5000;
                    tabla_burgers.splice(0,1);
                    F_burgerDone=false;
                    overlayBurgerDone.setDepth(-1);
                    b_basura.setDepth(-1);
                }
            }
        },this)
        
        //hitboxes de ingredientes, ponen ingrediente en tabla y se chequea contaminación
        
        hb_lechuga = this.add.image(1100+500,350,'hb_bowls').setDepth(1).setInteractive().setAlpha(0.01);        
        hb_cebolla = this.add.image(1100+390,350,'hb_bowls').setDepth(1).setInteractive().setAlpha(0.01); 
        hb_tomate = this.add.image(1100+280,350,'hb_bowls').setDepth(1).setInteractive().setAlpha(0.01);  
        hb_panarriba = this.add.image(1100+500,430,'obj_panarriba').setDepth(1).setInteractive();
        hb_panabajo = this.add.image(1100+500,460,'obj_panabajo').setDepth(2).setInteractive();

        hb_lechuga.on("pointerup",function(){
            if(!F_burgerDone){
            ingrediente = this.add.sprite(627+550+200,455-alturaPilaTabla,'obj_lechuga').setDepth(tabla_burgers.length).setData({ing: 2});//5=hamburguesa 4=pan de arriba 3=pan de abajo 2= lechuga, 1=cebolla, 0=tomate
            alturaPilaTabla+=9;
            tabla_burgers.push(ingrediente);
            if(!F_manoslimpias){
                ingrediente.data.values.contaminado = true;
            }
        }
        },this);
        hb_cebolla.on("pointerup",function(){
            if(!F_burgerDone){
            ingrediente = this.add.sprite(627+550+200,455-alturaPilaTabla,'obj_cebolla').setDepth(tabla_burgers.length).setData({ing: 1});
            alturaPilaTabla+=7;
            tabla_burgers.push(ingrediente);
            if(!F_manoslimpias){
                ingrediente.data.values.contaminado = true;
            }
        }
        },this);
        hb_tomate.on("pointerup",function(){
            if(!F_burgerDone){
            ingrediente = this.add.sprite(627+550+200,455-alturaPilaTabla,'obj_tomate').setDepth(tabla_burgers.length).setData({ing: 0});
            alturaPilaTabla+=7;
            tabla_burgers.push(ingrediente);
            if(!F_manoslimpias){
                ingrediente.data.values.contaminado = true;
            }
        }
        },this);
        hb_panabajo.on("pointerup",function(){
            if(!F_burgerDone){
            ingrediente = this.add.sprite(627+550+200,455-alturaPilaTabla,'obj_panabajo').setDepth(tabla_burgers.length).setData({ing: 3});
            alturaPilaTabla+=10;
            tabla_burgers.push(ingrediente);
            if(!F_manoslimpias){
                ingrediente.data.values.contaminado = true;
            }
        }
        },this);
        hb_panarriba.on("pointerup",function(){
            if(!F_burgerDone){
            ingrediente = this.add.sprite(627+550+200,455-alturaPilaTabla,'obj_panarriba').setDepth(tabla_burgers.length).setData({ing: 4});
            alturaPilaTabla=0;
            tabla_burgers.push(ingrediente);
            if(!F_manoslimpias){
                ingrediente.data.values.contaminado = true;
            }
            //pan de arriba señala que la hamburguesa se termino de armar
            F_burgerDone = true;
            overlayBurgerDone.setDepth(9);
            b_basura.setDepth(10);
        }
        },this);

        //crea todas las animaciones de las hamburguesas, nombres almacenados en burgerstatenames
        for(var a = 0;a<25;a++){
            this.anims.create({
                key: burgerstatenames[a],
                frames: [ { key: 'Sp_burger', frame: a } ],
                frameRate: 20,
            });
        }  
                                
        //no necesario, cambia los valores almacenados de las celdas de la plancha, podria cambiarse en arrays
        for(var i=0;i<celdasX.length;i++){
            celdasX[i]=celdasX[i]+550;
        }
        for(var i=0;i<limitesCeldasX1.length;i++){
            limitesCeldasX1[i]=limitesCeldasX1[i]+550;
        }
        for(var i=0;i<limitesCeldasX2.length;i++){
            limitesCeldasX2[i]=limitesCeldasX2[i]+550;
        }

        //configuración de la cámara
        this.cameras.main.setBounds(0, 0, 1760, 1600);;
        cam = this.cameras.main
        cam.pan(center_width+550,0,0);

      

        //fondo
        var fondo = this.add.sprite(0, 0,'bg_gamescene').setOrigin(0,0);

        //freezer se abre y cierra
        freezer = this.add.sprite(1200,center_height-160,'Sp_freezer').setInteractive();

        this.anims.create({
            key: 'open',
            frames: [ { key: 'Sp_freezer', frame: 1 } ],
            frameRate: 20,
        });
        this.anims.create({
            key: 'closed',
            frames: [ { key: 'Sp_freezer', frame: 0 } ],
            frameRate: 20,
        });

        freezer.on('pointerover', function () {

            if(estacion==1 && !F_burgerDone){
                this.anims.play('open');
            }
           
    
        });
        freezer.on('pointerout', function () {

            this.anims.play('closed');
    
        });

        //freezer crea burgers
        freezer.on('pointerdown',  function(){
            if(estacion==1 && !F_burgerDone){F_burgerCrear = true};
        });
        //puntero arrastra
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });
        this.input.dragDistanceThreshold = 5;

        //overlay GUI

        //overlay y boton pausa
        overlayPausa = this.add.image(center_width,center_width,'overlay_pausa').setDepth(-1).setScrollFactor(0);
        b_continuar = this.add.image(center_width,center_height-30,'b_continuar').setDepth(-1).setScrollFactor(0).setInteractive();
        b_salir = this.add.image(center_width,center_height+80,'b_salir').setDepth(-1).setScrollFactor(0).setInteractive();

        this.anims.create({
            key: 'anim_pausa',
            frames: [ { key: 'sp_b_pausa', frame: 0 } ],
            frameRate: 20,
        })
        this.anims.create({
            key: 'anim_pausa_over',
            frames: [ { key: 'sp_b_pausa', frame: 1 } ],
            frameRate: 20,
        })
        b_pausa = this.add.sprite(700,100,'sp_b_pausa',0).setInteractive().setDepth(3).setScrollFactor(0);

        b_pausa.on('pointerout',function(){
            
            b_pausa.anims.play('anim_pausa');
            
        },this);

        b_pausa.on('pointerover',function(){
            if(!F_burgerDone){
                b_pausa.anims.play('anim_pausa_over');
            }

        },this);
        b_pausa.on('pointerup',function(){
            overlayPausa.setDepth(99);
            b_continuar.setDepth(99);
            b_salir.setDepth(99);
            b_pausa.anims.play('anim_pausa');
            F_burgerDone = true;
        },this);
        b_continuar.on('pointerup',function(){
            overlayPausa.setDepth(-1);
            b_continuar.setDepth(-1);
            b_salir.setDepth(-1);
            F_burgerDone = false;
        },this);
        b_salir.on('pointerup',this.volverMenu,this);
        

        //icono manos
        indManos = this.add.sprite(100,100,'sp_manos',0).setScrollFactor(0).setDepth(3);
        this.anims.create({
            key: 'manos_on',
            frames: [ { key: 'sp_manos', frame: 0 } ],
            frameRate: 20,
        });
        this.anims.create({
            key: 'manos_off',
            frames: [ { key: 'sp_manos', frame: 1 } ],
            frameRate: 20,
        });

        
        overlayGUI = this.add.sprite(center_width,center_height,'overlay').setScrollFactor(0).setDepth(2);
        overlayPuntaje = this.add.image(center_width,center_width,'overlay_puntaje').setDepth(-1).setScrollFactor(0);

        ticket1 = this.add.sprite(280,110,'ticket1').setScrollFactor(0).setDepth(3).setInteractive();
        ticket2 = this.add.sprite(340,110,'ticket2').setScrollFactor(0).setDepth(3).setInteractive();
        
        overlayTicket = this.add.image(center_width,center_width,'overlay_base').setDepth(-1).setScrollFactor(0);
        ticket1.on("pointerup",function(){
            if(F_burgerDone==false){
                overlayTicket.setInteractive().setDepth(9);
            }
            else{//determinación de puntaje
                var cantTabla = tabla_burgers.length;
                var cantTicket = ticket1_lista.length;
                for(var b = 0;b<6;b++){
                    for(var c = 0;c<cantTabla;c++){
                        if(tabla_burgers[c].data.values.ing == b){
                            repeticionesA+=1
                        }
                    }
                    for(var d = 0;d<cantTicket;d++){
                        if(ticket1_lista[d] == b){
                            repeticionesB+=1
                        }
                    }
                    if(repeticionesA==repeticionesB){
                        puntajeA1+=1;
                    }
                    else if(repeticionesA<repeticionesB){
                        if(puntajeA1>0){
                            puntajeA1-=1;
                        }
                    }
                    repeticionesA = 0;
                    repeticionesB = 0;
                }
                for(var c = 0;c<cantTabla;c++){                   
                    if(tabla_burgers[c].data.values.contaminado==true){
                        F_contaminado=true;
                    }
                    if(tabla_burgers[c].data.values.ing==5){
                        if(tabla_burgers[c].data.values.ladoA-3>0){
                            puntajeA1-=(tabla_burgers[c].data.values.ladoA-3)*2;
                        }
                        if(tabla_burgers[c].data.values.ladoB-3>0){
                            puntajeA1-=(tabla_burgers[c].data.values.ladoB-3)*2;
                        }
                    }
                }
                if(!F_contaminado){
                    puntajeB1+=1;
                }
                for(var c = 0;c<cantTabla;c++){
                    
                    if(tabla_burgers[0].data.values.ing==ticket1_lista[c]){
                        puntajeA1+=1;
                    }
                    tabla_burgers[0].x+=5000;
                    tabla_burgers.splice(0,1);
                }
                
                
                F_burgerDone=false;
                overlayBurgerDone.setDepth(-1);
                b_basura.setDepth(-1);
                ticket1.setDepth(-1);
                ticket1.setInteractive(false);
                ticketsleft-=1;
                puntajeA1 = Phaser.Math.CeilTo((puntajeA1/12)*100);
                puntajeB1 = Phaser.Math.CeilTo((puntajeB1)*100);
                if(puntajeB1==0){
                    puntajeTotal1 = Phaser.Math.CeilTo((8*puntajeA1+8*puntajeB1+puntajeC1)/17);
                }
                else{
                    puntajeTotal1 = Phaser.Math.CeilTo((8*puntajeA1+puntajeB1+puntajeC1)/10);
                }
                
                console.log(puntajeA1);
                console.log(puntajeB1);
                console.log(puntajeTotal1);
            }
        },this);
        overlayTicket.on("pointerup",function(){
            overlayTicket.setDepth(-1);
        },this)

        ticket2.on("pointerup",function(){
            if(F_burgerDone==false){
                overlayTicket2.setInteractive().setDepth(9);
            }
            else{//determinación de puntaje
                var cantTabla = tabla_burgers.length;
                var cantTicket = ticket2_lista.length;
                for(var b = 0;b<6;b++){
                    for(var c = 0;c<cantTabla;c++){
                        if(tabla_burgers[c].data.values.ing == b){
                            repeticionesA+=1
                        }
                    }
                    for(var d = 0;d<cantTicket;d++){
                        if(ticket2_lista[d] == b){
                            repeticionesB+=1
                        }
                    }
                    if(repeticionesA==repeticionesB){
                        puntajeA2+=1;
                    }
                    else if(repeticionesA<repeticionesB){
                        if(puntajeA2>0){
                            puntajeA2-=1;
                        }
                    }
                    repeticionesA = 0;
                    repeticionesB = 0;
                }
                for(var c = 0;c<cantTabla;c++){                   
                    if(tabla_burgers[c].data.values.contaminado==true){
                        F_contaminado=true;
                        
                    }
                    if(tabla_burgers[c].data.values.ing==5){
                        if(tabla_burgers[c].data.values.ladoA-3>0){
                            puntajeA2-=(tabla_burgers[c].data.values.ladoA-3);
                        }
                        if(tabla_burgers[c].data.values.ladoB-3>0){
                            puntajeA2-=(tabla_burgers[c].data.values.ladoB-3);
                        }
                    }
                }
                if(!F_contaminado){
                    puntajeB2+=1;
                }
                for(var c = 0;c<cantTabla;c++){
                    
                    if(tabla_burgers[0].data.values.ing==ticket2_lista[c]){
                        puntajeA2+=1;
                    }
                    tabla_burgers[0].x+=5000;
                    tabla_burgers.splice(0,1);
                }
                
                
                F_burgerDone=false;
                overlayBurgerDone.setDepth(-1);
                b_basura.setDepth(-1);
                ticket2.setDepth(-1);
                ticket2.setInteractive(false);
                ticketsleft-=1;
                puntajeA2 = Phaser.Math.CeilTo((puntajeA2/12)*100);
                puntajeB2 = Phaser.Math.CeilTo((puntajeB2)*100);
                if(puntajeB2==0){
                    puntajeTotal2 = Phaser.Math.CeilTo((8*puntajeA2+8*puntajeB2+puntajeC2)/17);
                }
                else{
                    puntajeTotal2 = Phaser.Math.CeilTo((8*puntajeA2+puntajeB2+puntajeC2)/10);
                }
                console.log(puntajeA2);
                console.log(puntajeB2);
                console.log(puntajeTotal2);
            }
        },this);
        overlayTicket.on("pointerup",function(){
            overlayTicket.setDepth(-1);
        },this)
        overlayTicket2.on("pointerup",function(){
            overlayTicket2.setDepth(-1);
        },this)

        botFregadero = this.add.sprite(center_width-250,center_height+250,'sp_b_fregadero').setScrollFactor(0).setInteractive();
        botFregadero.depth = 3;

        this.anims.create({
            key: 'freg',
            frames: [ { key: 'sp_b_fregadero', frame: 0 } ],
            frameRate: 20,
        });
        this.anims.create({
            key: 'freg_active',
            frames: [ { key: 'sp_b_fregadero', frame: 1 } ],
            frameRate: 20,
        });

        botPlancha = this.add.sprite(center_width,center_height+250,'sp_b_plancha').setScrollFactor(0).setInteractive();
        botPlancha.depth = 3;

        this.anims.create({
            key: 'plan',
            frames: [ { key: 'sp_b_plancha', frame: 0 } ],
            frameRate: 20,
        });
        this.anims.create({
            key: 'plan_active',
            frames: [ { key: 'sp_b_plancha', frame: 1 } ],
            frameRate: 20,
        });
        botPlancha.anims.play('plan_active');

        botArmado = this.add.sprite(center_width+250,center_height+250,'sp_b_armado').setScrollFactor(0).setInteractive();
        botArmado.depth = 3;

        this.anims.create({
            key: 'arma',
            frames: [ { key: 'sp_b_armado', frame: 0 } ],
            frameRate: 20,
        });
        this.anims.create({
            key: 'arma_active',
            frames: [ { key: 'sp_b_armado', frame: 1 } ],
            frameRate: 20,
        });

        botFregadero.on('pointerup',function(){
            if(!F_burgerDone){
            botArmado.anims.play('arma');
            botPlancha.anims.play('plan');
            botFregadero.anims.play('freg_active');
            estacion=0;
            cam.pan(center_width,0,150,'Sine.easeInOut');}
        },this)

        botPlancha.on('pointerup',function(){
            if(!F_burgerDone){
            botArmado.anims.play('arma');
            botFregadero.anims.play('freg');
            botPlancha.anims.play('plan_active');
            estacion=1;
            cam.pan(center_width+550,0,150,'Sine.easeInOut');}
        },this)

        botArmado.on('pointerup',function(){
            if(!F_burgerDone){
            botPlancha.anims.play('plan');
            botFregadero.anims.play('freg');
            botArmado.anims.play('arma_active');
            estacion=2;
            cam.pan(center_width+1100,0,150,'Sine.easeInOut');}
        },this)

        overlaySombra = this.add.image(center_width,center_height,'overlay_barra').setAlpha(0).setDepth(1);
        barraFregadero = this.add.sprite(center_width,center_height,'anim_barra',0).setAlpha(0).setDepth(1);
        timer = this.time.addEvent({delay:300, callback: this.prog_lavado, callbackScope: this, loop:true});
    }


    
    update (time, delta){

        //escena de lavado
        barraFregadero.anims.play('anim_barra',progresoLav);
        if(F_lavar && !F_manoslimpias && !F_burgerDone){
            overlaySombra.setAlpha(1);
            barraFregadero.setAlpha(1);
        }
        else{
            overlaySombra.setAlpha(0);
            barraFregadero.setAlpha(0);
            progresoLav = 0;
        }
        if(progresoLav==9){
            F_manoslimpias=true;
            progresoLav = 0;
        }
        if(F_manoslimpias){
            indManos.anims.play('manos_on');
        }
        else{
            indManos.anims.play('manos_off');
        }

        
        //si nivel terminado
        if(ticketsleft==0){
            puntajeA = Phaser.Math.CeilTo((puntajeA1+puntajeA2)/2);
            puntajeB = Phaser.Math.CeilTo((puntajeB1+puntajeB2)/2);
            puntajeTotal = Phaser.Math.CeilTo((puntajeTotal1+puntajeTotal2)/2);
            F_burgerDone=true;
            overlayPuntaje.setDepth(9);
            if(puntajeTotal>70){
                this.add.text(150, 150, '¡Genial!', { font: '24px Raleway',color: '#4a4a4a'}).setDepth(10).setScrollFactor(0); 
            }
            else{
                this.add.text(150, 150, 'Intenta de nuevo...', { font: '24px Raleway',color: '#4a4a4a'}).setDepth(10).setScrollFactor(0);
            }
            
            this.add.text(300,205,puntajeA+'%', { font: '24px Raleway',color: '#4a4a4a'}).setDepth(10).setScrollFactor(0).setOrigin(0);
            this.add.text(300,180,puntajeB+'%', { font: '24px Raleway',color: '#4a4a4a'}).setDepth(10).setScrollFactor(0).setOrigin(0);
            this.add.text(300,230,puntajeC+'%', { font: '24px Raleway',color: '#4a4a4a'}).setDepth(10).setScrollFactor(0).setOrigin(0);
            this.add.text(300,340,puntajeTotal+'%', { font: '24px Raleway',color: '#4a4a4a'}).setDepth(10).setScrollFactor(0).setOrigin(0);
            b_volver = this.add.image(400,600,'b_volver').setScrollFactor(0).setDepth(10).setInteractive();
            b_volver.on('pointerup',this.volverMenu,this);
            ticketsleft=99;
        }

        //cocinado de hamburguesas
        for (var a=0;a<ctndr_burgers.length;a++){

            if(ctndr_burgers[a].data.values.celda!=undefined && ctndr_burgers[a].data.values.agarrada == false && !F_burgerDone){
                ctndr_burgers[a].data.values.cocinado++; 
                if(ctndr_burgers[a].data.values.cocinado % 400 === 0 && ctndr_burgers[a].data.values.ladoB < 5){
                    ctndr_burgers[a].data.values.ladoB++;
                    ctndr_burgers[a].anims.play(String(ctndr_burgers[a].data.values.ladoA).concat(ctndr_burgers[a].data.values.ladoB))
                }
            } 
                                     
            }
        
        //estación de cocina    

        if(estacion==1){
            
            for(var a=0;a<ctndr_burgers.length;a++){
                this.input.setDraggable(ctndr_burgers[a],true)
            }
            //reacciona a la bandera, crea una hamburguesa
            if (F_burgerCrear){
                this.createBurger();
                F_burgerCrear = false;
            }

            for(i=cant_burgers;i>0;i--){
                if (ctndr_burgers[(i-1)] != undefined && !F_burgerAgarrada){ 
                    
                    if (ctndr_burgers[(i-1)].x>=limitesCeldasX1[0] && ctndr_burgers[(i-1)].x<limitesCeldasX2[0] && ctndr_burgers[(i-1)].y>=limitesCeldasY1[0] && ctndr_burgers[(i-1)].y<limitesCeldasY2[0] ){
                        this.situarBurger(i,0)
                    }
                    else if (ctndr_burgers[(i-1)].x>=limitesCeldasX1[1] && ctndr_burgers[(i-1)].x<limitesCeldasX2[1] && ctndr_burgers[(i-1)].y>=limitesCeldasY1[1] && ctndr_burgers[(i-1)].y<limitesCeldasY2[1] ){
                        this.situarBurger(i,1)
                    }
                    else if (ctndr_burgers[(i-1)].x>=limitesCeldasX1[2] && ctndr_burgers[(i-1)].x<limitesCeldasX2[2] && ctndr_burgers[(i-1)].y>=limitesCeldasY1[2] && ctndr_burgers[(i-1)].y<limitesCeldasY2[2] ){
                        this.situarBurger(i,2)
                    }
                    else if (ctndr_burgers[(i-1)].x>=limitesCeldasX1[3] && ctndr_burgers[(i-1)].x<limitesCeldasX2[3] && ctndr_burgers[(i-1)].y>=limitesCeldasY1[3] && ctndr_burgers[(i-1)].y<limitesCeldasY2[3] ){
                        this.situarBurger(i,3)
                    }
                    else if (ctndr_burgers[(i-1)].x>=limitesCeldasX1[4] && ctndr_burgers[(i-1)].x<limitesCeldasX2[4] && ctndr_burgers[(i-1)].y>=limitesCeldasY1[4] && ctndr_burgers[(i-1)].y<limitesCeldasY2[4] ){
                        this.situarBurger(i,4)
                    }
                    else if (ctndr_burgers[(i-1)].x>=limitesCeldasX1[5] && ctndr_burgers[(i-1)].x<limitesCeldasX2[5] && ctndr_burgers[(i-1)].y>=limitesCeldasY1[5] && ctndr_burgers[(i-1)].y<limitesCeldasY2[5] ){
                        this.situarBurger(i,5)
                    }
                    else if (ctndr_burgers[(i-1)].x>=560+550 && ctndr_burgers[(i-1)].x<700+550 && ctndr_burgers[(i-1)].y>=420 && ctndr_burgers[(i-1)].y<500){
                        this.platoBurger(i);
                    }
                    else{  
                        this.deleteBurger(i);
                    }
                }
            }
        }
        else{
            for(var a=0;a<ctndr_burgers.length;a++){
                this.input.setDraggable(ctndr_burgers[a],false)
            }
        }
    if(estacion==2){
        for(var b=0;b<plato_burgers.length;b++){
            if(plato_burgers[b]!=undefined){
                if(plato_burgers[b].data.values.ladoA<3 || plato_burgers[b].data.values.ladoB<3){
                    for(var c=0;c<plato_burgers.length;c++){                       
                    plato_burgers[b].data.values.contaminado=true;                   
                    }
                }    
            }    
        }  
            
        
    }
    else{
        for(var a=0;a<plato_burgers.length;a++){
            this.input.setDraggable(plato_burgers[a],false)
        }
    }
    }

    //Crea una burger
    createBurger(){

        F_manoslimpias = false;
        this.newBurger = this.add.sprite(this.input.mousePointer.x+cam.scrollx,this.input.mousePointer.y,'11')
        this.newBurger.setScale(1.4);
        cant_burgers++;
        ctndr_burgers.push(this.newBurger);
        this.newBurger.setInteractive();
        this.newBurger.setData({ladoA: 1, ladoB: 1, cocinado:0, flip: 0, enplato: false,entabla: false,contaminado: false, ing:5, celda: undefined, agarrada: false});
        this.input.on("pointermove", this.follow, this); //sigue al cursor
        this.input.on("pointerup", this.drop, this);//si se suelta, se vuelve draggeable
        this.input.on("drag", this.drag, this); //al draggear, la burger está agarrada
        this.newBurger.on("pointerup",this.clickBurger,this.newBurger);
        this.newBurger.on("drag",this.dragBurger,this.newBurger);
        F_burgerAgarrada = true;
        
    }

    follow(pointer){
        F_burgerAgarrada = true;
        this.newBurger.x = pointer.x+550;
        this.newBurger.y = pointer.y;
    }
    drop(pointer){ 
        this.input.off("pointermove", this.follow, this);
        F_burgerAgarrada = false;
        
    }

    clickBurger(){
        
        if(this.data.values.enplato == true&&estacion==2){
            
                this.x=this.x+200
                this.y = 455-alturaPilaTabla;
                tabla_burgers.push(this);
                this.depth=tabla_burgers.length;
                alturaPilaTabla+=7;
                this.data.values.enplato = false;
                this.data.values.entabla = true;
                plato_burgers.splice((plato_burgers.length-1),1);
                if(plato_burgers[plato_burgers.length-1]!=undefined){plato_burgers[plato_burgers.length-1].data.values.lastplato = true;}
                alturaPilaPlato-=10;
        }    
        if(!F_burgerAgarrada && this.data.values.enplato == false && this.data.values.entabla == false){
            var b = this.data.values.ladoA;
            this.data.values.ladoA = this.data.values.ladoB;
            this.data.values.ladoB = b;
            this.anims.play(String(this.data.values.ladoA).concat(this.data.values.ladoB));
        }
        this.data.values.agarrada = false;
    }
    dragBurger(){
        this.data.values.agarrada = true;
    }
    drag(){         
        F_burgerAgarrada = true;
    }
    deleteBurger(i){
        if(ctndr_burgers[(i-1)].data.values.celda != undefined){   
            F_celdas[ctndr_burgers[(i-1)].data.values.celda] = 0;
        }
        ctndr_burgers[(i-1)].data.values.celda = undefined;
        ctndr_burgers[(i-1)].x = 5000;
        ctndr_burgers.splice(i-1,1);
        cant_burgers--;
        //console.log(F_celdas);
    }
    platoBurger(i){
        if(ctndr_burgers[(i-1)].data.values.celda != undefined){   
            F_celdas[ctndr_burgers[(i-1)].data.values.celda] = 0;
        }
        ctndr_burgers[(i-1)].data.values.celda = 7;
        ctndr_burgers[(i-1)].x = 627+550;
        ctndr_burgers[(i-1)].y = 455-alturaPilaPlato;
        this.input.setDraggable(ctndr_burgers[(i-1)],false);
        ctndr_burgers[(i-1)].depth=plato_burgers.length;
        ctndr_burgers[(i-1)].data.values.enplato = true;
        if(plato_burgers[plato_burgers.length-1]!=undefined){plato_burgers[plato_burgers.length-1].data.values.lastplato=false;}
        plato_burgers.push(ctndr_burgers[(i-1)]);
        
        
        ctndr_burgers.splice(i-1,1);
        cant_burgers--;
        alturaPilaPlato=alturaPilaPlato+10;
    }
    situarBurger(i,a){
        //si pertenece a la celda
        if(ctndr_burgers[(i-1)].data.values.celda == a){//se sitúa en el centro de la celda
            ctndr_burgers[(i-1)].x = celdasX[a];
            ctndr_burgers[(i-1)].y = celdasY[a];
        }
        //si la celda está vacía
        else if(F_celdas[a]==0){//se sitúa en el centro de la celda
            ctndr_burgers[(i-1)].x = celdasX[a];
            ctndr_burgers[(i-1)].y = celdasY[a];
            if(ctndr_burgers[(i-1)].data.values.celda != a){   
                F_celdas[ctndr_burgers[(i-1)].data.values.celda] = 0;//se vacía la celda anterior
            }
            ctndr_burgers[(i-1)].data.values.celda = a;//burger pertenece a celda actual
            F_celdas[a] = 1;//se llena celda actual
        }
        //si no pertenece ni está vacía
        else {
            if(ctndr_burgers[(i-1)].data.values.celda == undefined){//si no pertenece a otra celda, se elimina
                this.deleteBurger(i);
            }
            else{//si pertenece a otra celda, se regresa a su celda
                ctndr_burgers[(i-1)].x = celdasX[ctndr_burgers[(i-1)].data.values.celda];
                ctndr_burgers[(i-1)].y = celdasY[ctndr_burgers[(i-1)].data.values.celda];
            }
        }       
    }
    situarEnTabla(ing){
        ingrediente = this.add.image(627+550+200,455-alturaPilaTabla,ing)
        alturaPilaTabla+=10;
    }
    prog_lavado(){
        if(progresoLav<9 && F_lavar){
            barraFregadero.anims.nextFrame();
            progresoLav +=1;
        }
    }
    volverMenu(){
        if(F_burgerDone){
            estacion=1;//0 = lavado, 1 = cocina, 2 = armado
            ctndr_burgers = [];
            plato_burgers = [];
            tabla_burgers = [];
            F_burgerCrear = false;
            F_burgerAgarrada = true;
            F_burgerDone = false;
            F_manoslimpias = true;
            F_contaminado = false;
            cant_burgers = 0;
            celdasX = [205,320,440,205,320,440];//centros de cada celda
            celdasY = [400,400,400,480,480,480];
            limitesCeldasX1 = [140,260,380,140,260,380];//límites de cada celda
            limitesCeldasX2 = [260,380,500,260,380,500];
            limitesCeldasY1 = [360,360,360,440,440,440];
            limitesCeldasY2 = [440,440,440,520,520,520];
            F_celdas = [0,0,0,0,0,0];
            alturaPilaPlato = 0;
            alturaPilaTabla = 0;
            ticket1_lista = [3,5,0,1,2,4];
            ticket2_lista = [3,5,0,5,0,4];
            puntajeA=0;//fidelidad
            puntajeB=0;//salubridad
            puntajeC=100;//tiempo
            puntajeTotal = 100;
            puntajeA1=0;//fidelidad
            puntajeB1=0;//salubridad
            puntajeC1=100;//tiempo
            puntajeTotal1 = 100;
            puntajeA2=0;//fidelidad
            puntajeB2=0;//salubridad
            puntajeC2=100;//tiempo
            puntajeTotal2 = 100;
            ticketsleft = 2;
            this.scene.restart();
            this.scene.switch('mainmenu');
        }
    }
}


export default gamescene;


