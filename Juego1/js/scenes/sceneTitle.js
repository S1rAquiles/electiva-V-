class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload()
    {
      this.load.image("button3","images/ui/buttons/2/3.png");
      this.load.image("button5","images/ui/buttons/2/5.png");
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
  

        this.title = this.add.text(0,0,"Space Battle",{
        fontSize: game.config.width / 8, 
        color: "#9556d1",
        fontWeight: "700"
     });
       this.title.setOrigin(0.5,0.5);
       this.alignGrid.placeAtIndex(27,this.title);

        let btnStart=new FlatButton({
            scene:this,
            key:'button3',
            text:'START',
            event:'start_game'
        });
        this.alignGrid.placeAtIndex(60,btnStart);

        let btnAbout=new FlatButton({
            scene:this,
            key:'button5',
            text:'Como jugar?',
            event:'about_game'
        });
        this.alignGrid.placeAtIndex(82,btnAbout);
        emitter.on('start_game',this.startGame,this);
        emitter.on('about_game',this.aboutGame,this);

    }
    startGame()
    {
        this.scene.start('SceneMain');
    }
    aboutGame()
    {
       this.scene.start('SceneAbout');
    }
    update() {}
}