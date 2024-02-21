class SceneAbout extends Phaser.Scene {
    constructor() {
        super('SceneAbout');
    }
    preload()
    {
      this.load.image("backButton","images/ui/buttons/backButton.png");
    }
    create() {
        emitter=new Phaser.Events.EventEmitter();
        controller=new Controller();

        this.back = this.add.image(0,0,'back');
        this.back.setOrigin(0,0);
        this.alignGrid=new AlignGrid({
           rows:11,
           cols:11,
           scene:this
        });

        this.aboutTitle = this.add.text(0,0,"Sobre Space Battle",{
        fontSize: game.config.width / 14, 
        color: "#9556d1",
        fontWeight: "700",
        fontFamily: "Anton"
     });
       this.alignGrid.placeAtIndex(11,this.aboutTitle);

        this.description = this.add.text(0,0,"Space battle es un juego de disparos\ndonde tu tarea es destruir el\nbarco enemigo antes que el barco enemigo\nte destruye.\nTen cuidado con los asteroides-\nEllos disminuyen tus escudos tambien!",{
        fontSize: game.config.width / 24, 
        fontWeight: "400",
        fontFamily: "Anton"
     });
       this.alignGrid.placeAtIndex(22,this.description);

       this.controlTitle = this.add.text(0,0,"Controles",{
        fontSize: game.config.width / 14, 
        color: "#9556d1",
        fontWeight: "700",
        fontFamily: "Anton"
     });
       this.alignGrid.placeAtIndex(44,this.controlTitle);

       this.controllers = this.add.text(0,0,"El juego usa orientación en-\ncomputadoras de escritorio.\ndisparar una bala - pulsación larga / nlargo\nhaga click y suelte",{
        fontSize: game.config.width / 24, 
        fontWeight: "700",
        fontFamily: "Anton"
     });
       this.alignGrid.placeAtIndex(55,this.controllers);
       
       let btnBack=new FlatButton({
           scene: this,
           key: 'backButton',
           event: 'title_game'
       });
       this.alignGrid.placeAtIndex(0,btnBack);
       
       emitter.on('title_game', this.titleGame, this);
    }
    titleGame() 
    {
        this.scene.start('SceneTitle');
    }
    update() {}
}