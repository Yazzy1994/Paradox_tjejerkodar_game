// Global variable which can be accessed from anywhere
var lastGameScore = 0;

class GameOverScene extends Phaser.Scene {
    
    constructor() 
    {
        super({ key: 'GameOverScene' });         
    }
    
    preload()
    {
        this.load.image('space-bg', 'assets/images/space.jpg');
    }

    create()
    {
        this.cursors = this.input.keyboard.createCursorKeys();        
        this.add.image(0, 0, 'space-bg');
        
        let centerX = this.game.config.width / 2;
        
        let titleText = this.add.text(centerX, 100, 'GAME OVER', { fontSize: '32px', fill: '#fff' });
        titleText.setOrigin(0.5);       // Center Text

        let scoreLabel = this.add.text(centerX, 300, 'Score', { fontSize: '24px', fill: '#fff' });
        scoreLabel.setOrigin(0.5);       // Center Text

        let scoreText = this.add.text(centerX, 350, lastGameScore, { fontSize: '24px', fill: '#fff' });
        scoreText.setOrigin(0.5);       // Center Text
        
        let clickStartText = this.add.text(centerX, this.game.config.height - 100, 'Click Anywhere / Press Space to Reset', { fontSize: '16px', fill: '#fff' });
        clickStartText.setOrigin(0.5);
        
        this.input.on('pointerdown', function (pointer) {
            this.scene.start("TitleScene");
        }, this);
    }

    update(time, delta)
    {
        if ( this.cursors.space.isDown ) {
            this.scene.start("TitleScene");
        }   
    }
}