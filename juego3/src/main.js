// IMPORTAR LA PRIMERA ESCENA
import Firstscene from './scenes/Firstscene.js'
import Gameover from './scenes/Gameover.js';
import Intro from './scenes/Intro.js';
import Final from './scenes/Final.js';
import Winner from './scenes/Winner.js';

const config = {

   
    

 
    pixelArt: true, 

    
    type: Phaser.AUTO, 
    backgroundColor: '#FFFFFF', 
    scale: {
        width: 900, 
        height: 360,
        parent: 'container', 
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },

  
    banner: {
        hidePhaser: true, 
        text: '#000000', 
        background: [
            'red',
            'yellow',
            'red',
            'transparent'
        ]
       
    },
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 300 },
            debug: false
        }
    },

    //ESCENAS DEL JUEGO
    scene: [
        Intro,
        Firstscene,
        Final,
        Gameover,
        Winner
        ]

};


// CREAR LA INSTANCIA DEL JUEGO
const game = new Phaser.Game(config);


