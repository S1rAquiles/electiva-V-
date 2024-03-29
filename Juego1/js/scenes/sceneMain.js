class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
       
    }
    create() {
      
        emitter=new Phaser.Events.EventEmitter();
        controller=new Controller();
        let mediaManager=new MediaManager({scene:this});

        this.shields = 100;
        this.eshields = 100;
        model.playerWon = 1;
        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        this.background = this.add.image(0,0,'background');
        this.background.setOrigin(0,0);

      
        this.ship = this.physics.add.sprite(this.centerX,this.centerY,'ship');
        this.ship.body.collideWorldBounds = 1;
        Align.scaleToGameW(this.ship,.25);

        this.physics.world.setBounds(0,0,this.background.displayWidth, this.background.displayHeight);

        
        this.background.setInteractive();
        
        this.background.on('pointerup', this.backgroundClicked, this);
        this.background.on('pointerdown', this.onDown, this);
       
        this.cameras.main.setBounds(0,0,this.background.displayWidth, this.background.displayHeight);
        this.cameras.main.startFollow(this.ship,1);
     
        this.enemyBulletGroup = this.physics.add.group();
        this.bulletGroup = this.physics.add.group();
        this.rockGroup = this.physics.add.group();
        this.makeRocks();

      
        let frameNames = this.anims.generateFrameNumbers('exp');
        let f2 = frameNames.slice();
        f2.reverse();
        let f3 = f2.concat(frameNames);
        this.anims.create({
            key: 'boom',
            frames: f3,
            frameRate: 46,
            repeat: !1
        });

       
        this.eship = this.physics.add.sprite(this.centerX,0,'eship');
        this.eship.body.collideWorldBounds = 1;
        Align.scaleToGameW(this.eship,.35);

        this.makeInfo();
        this.setColliders();
        let sb=new SoundButtons({
            scene:this
        });

    }
    backgroundClicked() {
        let elapsed = Math.abs(this.downTime - this.getTimer());
      k
        if (elapsed < 300) {

            let targetX = this.background.input.localX * this.background.scaleX;
            let targetY = this.background.input.localY * this.background.scaleY;
            this.targetX = targetX;
            this.targetY = targetY;

            let angle = this.physics.moveTo(this.ship, targetX, targetY, 100);
            angle = this.toDegrees(angle);
            this.ship.angle = angle;

            let distXEnemy = Math.abs(this.ship.x - targetX);
            let distYEnemy = Math.abs(this.ship.y - targetY);

            if (distXEnemy > 30  && distYEnemy > 30) {
           
            let enemyAngle = this.physics.moveTo(this.eship, this.ship.x, this.ship.y, 60);
            enemyAngle = this.toDegrees(enemyAngle);
            this.eship.angle = enemyAngle;

        } }
        else {

           this.makeBullet();
        } 
    }
    makeRocks() {
        if(this.rockGroup.getChildren().length == 0) {
   
        this.rockGroup= this.physics.add.group({
            key: 'rocks',
            frame: [0,1,2],
            frameQuantity: 5,
            bounceX: 1,
            bounceY: 1,
            angularVelocity: 1,
            collideWorldBounds: 1
        });
    
        this.rockGroup.children.iterate(function(child){
        let xx = Math.floor(Math.random() * this.background.displayWidth);
        let yy = Math.floor(Math.random() * this.background.displayHeight);

        child.x = xx;
        child.y = yy;

        Align.scaleToGameW(child,.1);

 
        let vx = Math.floor(Math.random() * 2) - 1;
        let vy = Math.floor(Math.random() * 2) - 1;
        if(vx == 0 && vy == 0){
            vx=1;
            vy=1;
        }
        let speed = Math.floor(Math.random() * 200) + 10;
        child.body.setVelocity(vx*speed, vy*speed);
        }.bind(this));
        this.setRockColliders();
        }
    }
    setColliders() {
    
         this.physics.add.collider(this.bulletGroup,this.eship,this.damageEnemy,null,this);
    
         this.physics.add.collider(this.enemyBulletGroup,this.ship,this.damagePlayer,null,this);
         
    }
    setRockColliders(){

        this.physics.add.collider(this.rockGroup);
   
        this.physics.add.collider(this.bulletGroup,this.rockGroup,this.destroyRock,null,this);
        this.physics.add.collider(this.enemyBulletGroup,this.rockGroup,this.destroyRock,null,this);

        this.physics.add.collider(this.rockGroup,this.ship,this.rockHitPlayer,null,this);
        this.physics.add.collider(this.rockGroup,this.eship,this.rockHitEnemy,null,this);
    }
    getTimer() {
        let date = new Date();
        return date.getTime();
    }
    onDown() {
        this.downTime = this.getTimer();

    }
    toDegrees(angle) {
        return angle * (180 / Math.PI); 
    }
    getDirFromAngle(angle) {
        var rads = angle * Math.PI / 180;
        var tx = Math.cos(rads);
        var ty = Math.sin(rads);
        return {tx,ty}
    }
    makeBullet() {
        let dirObj = this.getDirFromAngle(this.ship.angle);
        console.log(dirObj);
        let bullet = this.physics.add.sprite(this.ship.x,this.ship.y,'bullet');
        this.bulletGroup.add(bullet);
        bullet.angle =  this.ship.angle;
        bullet.body.setVelocity(dirObj.tx * 200, dirObj.ty * 200);
        emitter.emit(G.PLAY_SOUND,"laser");
    }
    fireEnemyBullet() {
        let elapsed = Math.abs(this.lastEnemyBullet - this.getTimer());
        if(elapsed < 500) {
            return;
        }
        this.lastEnemyBullet = this.getTimer();
        emitter.emit(G.PLAY_SOUND,"enemyShoot");

        let enemyBullet = this.physics.add.sprite(this.eship.x,this.eship.y,'ebullet');
        this.enemyBulletGroup.add(enemyBullet);
        let dirEObj = this.getDirFromAngle(this.eship.angle);
        enemyBullet.angle =  this.eship.angle;
        this.physics.moveTo(enemyBullet, this.ship.x, this.ship.y, 100);
        enemyBullet.body.setVelocity(dirEObj.tx * 200, dirEObj.ty * 200);
    }
    destroyRock(bullet,rock) {
        bullet.destroy();
        let explosion = this.add.sprite(rock.x, rock.y, 'exp');
        explosion.play('boom');
        emitter.emit(G.PLAY_SOUND,"explode");
        rock.destroy();
        this.makeRocks();
    }
    damagePlayer(ship,bullet){
        let explosion = this.add.sprite(this.ship.x, this.ship.y, 'exp');
        explosion.play('boom');
        emitter.emit(G.PLAY_SOUND,"explode");
        bullet.destroy();
        this.downPlayer();

    }
    damageEnemy(ship,bullet){
        let explosion = this.add.sprite(bullet.x, bullet.y, 'exp');
        explosion.play('boom');
        emitter.emit(G.PLAY_SOUND,"explode");
        bullet.destroy();

   
        let enemyAngle = this.physics.moveTo(this.eship, this.ship.x, this.ship.y, 100);
        enemyAngle = this.toDegrees(enemyAngle);
        this.eship.angle = enemyAngle;
        this.downEnemy();

    }
    downPlayer() {
        this.shields--;
        this.text1.setText("Shields\n"+this.shields);
        if (this.shields == 0) {
            model.playerWon = !1;
            this.scene.start("SceneOver");
        }
    }
    downEnemy() {
        this.eshields--;
        this.text2.setText("Enemy Shields\n"+this.eshields);
        if (this.eshields == 0) {
            model.playerWon = 1;
            this.scene.start("SceneOver");
        }
    }
    rockHitPlayer(ship, rock){
        let explosion = this.add.sprite(rock.x, rock.y, 'exp');
        explosion.play('boom');
        emitter.emit(G.PLAY_SOUND,"explode");
        rock.destroy();
        this.makeRocks();
        this.downPlayer();
    }
    rockHitEnemy(ship,rock){
        let explosion = this.add.sprite(rock.x, rock.y, 'exp');
        explosion.play('boom');
        emitter.emit(G.PLAY_SOUND,"explode");
        rock.destroy();
        this.makeRocks();
        this.downEnemy();
    }
    makeInfo() {

        this.text1 = this.add.text(0,0,`Shields\n ${this.shields}`,{fontSize:game.config.width/30, align:"center",backgroundColor:"#000000"});
        this.text2 = this.add.text(0,0,`Enemy Shields\n ${this.eshields}`,{fontSize:game.config.width/30,align:"center",backgroundColor:"#000000"});

        this.uiGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });


        this.text1.setOrigin(0.5, 0.5);
        this.text2.setOrigin(0.5, 0.5);

        this.uiGrid.placeAtIndex(2,this.text1);
        this.uiGrid.placeAtIndex(8,this.text2);
        this.text1.setScrollFactor(0);
        this.text2.setScrollFactor(0);

     
        this.icon1 = this.add.image(0,0,"ship");
        this.icon2 = this.add.image(0,0,"eship");
        Align.scaleToGameW(this.icon1, .07);
        Align.scaleToGameW(this.icon2, .09);
        this.uiGrid.placeAtIndex(1,this.icon1);
        this.uiGrid.placeAtIndex(6,this.icon2);
        this.icon1.angle = 270;
        this.icon2.angle = 270;
        this.icon1.setScrollFactor(0);
        this.icon2.setScrollFactor(0);
    }

    update() {
        if (this.ship && this.eship) {
            let distX = Math.abs(this.ship.x - this.targetX);
            let distY = Math.abs(this.ship.y - this.targetY);
            if (distX < 10 && distY < 10) {
                if(this.ship.body) {
                    this.ship.body.setVelocity(0,0);
                }
            }
    
            let distXEnemy = Math.abs(this.ship.x - this.eship.x);
            let distYEnemy = Math.abs(this.ship.y - this.eship.y);
            if (distXEnemy < game.config.width / 5 && distYEnemy < game.config.height / 5) {
               this.fireEnemyBullet();
            }
        }
    }
}