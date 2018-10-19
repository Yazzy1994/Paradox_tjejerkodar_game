class TitleScene extends Phaser.Scene {
    
    constructor() 
    {
        super({ key: 'TitleScene' });         
    }
    
    preload()
    {
        this.load.image('space-bg', 'assets/images/space.jpg');
        this.load.audio('title-music', 'assets/music/titlescreen.mp3');
        
        this.timeToFlashText = 700;
    }

    create()
    {
        this.cursors = this.input.keyboard.createCursorKeys();        
        this.add.image(0, 0, 'space-bg');
        
        this.music = this.sound.add('title-music');
        this.music.volume = 0.3;
        this.music.play();
        
        let centerX = this.game.config.width / 2;
        
        this.titleText = this.add.text(centerX, 100, 'Space Avengers', { fontSize: '32px', fill: '#fff' });
        this.titleText.setOrigin(0.5);       // Center Text
        
        this.clickStartText = this.add.text(centerX, this.game.config.height - 100, 'Click Anywhere or press Space to Start', { fontSize: '16px', fill: '#fff' });
        this.clickStartText.setOrigin(0.5);
        
        this.input.on('pointerdown', function (pointer) {
            this.startGame();
        }, this);
    }

    update(time, delta)
    {
        if (this.cursors.space.isDown) { 
            this.startGame();
        }
        
        this.timeToFlashText -= delta;
        
        if ( this.timeToFlashText < 0 ) {
            this.clickStartText.visible = !this.clickStartText.visible;
            this.timeToFlashText = 700;
        }
    }
        
    startGame()
    {
        this.scene.start("MainGameScene");
        this.music.stop();        
    }
}