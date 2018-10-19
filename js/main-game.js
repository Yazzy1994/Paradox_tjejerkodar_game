class MainGameScene extends Phaser.Scene {
    
    constructor() 
    {
        super({key: "MainGameScene"}); 
    }
    
    preload()
    {
        this.load.image('player-ship', 'assets/images/player-ship.png');
        this.load.image('asteroid-medium', 'assets/images/asteroid-medium-01.png');
        this.load.image('space-background', 'assets/images/space.jpg');
        this.load.image('bullet-swarm', 'assets/images/bullet-swarm.png');
        
        this.load.audio('main-music', 'assets/music/maingame.mp3');
        this.load.audio('player-fire-01', 'assets/audio/player_fire_01.mp3');
        this.load.audio('player-fire-02', 'assets/audio/player_fire_02.mp3');
        this.load.audio('player-fire-03', 'assets/audio/player_fire_03.mp3');
     
    }

    create()
    {
        this.cursors = this.input.keyboard.createCursorKeys();            
        this.asteroidGroup = this.add.group();
        this.bulletGroup = this.add.group();
        
        
        this.music = this.sound.add('main-music');
        this.music.volume = 0.3; 
        this.music.loop = true;
        this.music.play();
        
        this.fireSfx = [];
        this.fireSfx.push(this.sound.add('player-fire-01'));
        this.fireSfx.push(this.sound.add('player-fire-02'));
        this.fireSfx.push(this.sound.add('player-fire-03'));
        
        
        this.add.image(0,0, 'space-background');

        this.createPlayerShip();
        this.createAsteroid(); 
        this.createFireBullet();
        
        
        this.asteroidTimer = 3000;
        this.bulletTimer = 0;
        
       
    }

    update(time, delta)
    {
       
        if(this.cursors.left.isDown){
           this.playerShip.setVelocityX(-200);
        }else if (this.cursors.right.isDown){
            this.playerShip.setVelocityX(200);
        }else{
            this.playerShip.setVelocityX(0);
        }
        
        
        this.asteroidTimer -= delta;
        
        if(this.asteroidTimer < 0){
            console.log("Spawn Asteroid");
            this.asteroidTimer = 3000;
               this.createAsteroid();
        }
        
         this.physics.overlap(this.asteroidGroup, this.bulletGroup, this.asteroidBulletCollision, null, this);
        
       
       
         this.updatePlayerBullets();
}
    
    updatePlayerBullets(time, delta){
        
        if(this.cursors.space.isDown){
           console.log("Yak")
          this.createFireBullet(); 
          
       } 
         
        this.bulletTimer -= delta;
        
        let bullets = this.bulletGroup.getChildren();
        
        for(let i = 0; i < bullets.length; i++) {
            let bullet = bullets[i];
            
            if(bullet.y < 0){
                bullet.destroy();
                
            }
        }
    }
    
    
    createPlayerShip()
    {
        let startX = game.config.width / 2;
        let startY = game.config.height - 50;
        
        this.playerShip = this.physics.add.image(startX, startY, 'player-ship');   
        this.playerShip.setImmovable();
        this.playerShip.setCollideWorldBounds(true);
    }
    
    createAsteroid() 
    {
       
        let x = Phaser.Math.RND.between(50, 500);
        let y = 50;
        
        let asteroid = this.physics.add.image(x, y, 'asteroid-medium');
        asteroid.setVelocity(5, 100);
        
        this.asteroidGroup.add(asteroid);
        
    }
    
    createFireBullet() 
    {
      
        let x = this.playerShip.x;
        let y = this.playerShip.y;
        
            
        let bullet  = this.physics.add.image(x, y, 'bullet-swarm'); 
        
        bullet.setVelocity(0, -100);
        
         if(this.bulletTimer < 0) {
            this.bulletTimer = 300;
        }
        
        

        this.bulletGroup.add(bullet);
        
                
     
          var index = Phaser.Math.RND.between(0, this.fireSfx.length - 1);
    this.fireSfx[index].play();
       

    }
    
    asteroidBulletCollision(asteroid, bullet) {
        asteroid.destroy();
        bullet.destroy();
    }

}