class Main {
	preload() {
		this.load.image('player', 'assets/player.png');
		this.load.image('wallV', 'assets/wallVertical.png');
		this.load.image('wallH', 'assets/wallHorizontal.png');
		this.load.image('coin', 'assets/coin.png');
	}
	
	create() {
		console.log("create");
		this.player = this.physics.add.sprite(250, 170, 'player');
		this.player.body.gravity.y = 500;
		this.arrow = this.input.keyboard.createCursorKeys();
		
		this.createWorld();
		this.physics.add.sprite(60, 130, 'coin');
		this.scoreLabel = this.add.text(30, 25, 'score: 0', {
			font: '18px Arial',
			fill: '#fff'
		});
		this.score = 0;
	}
	
	update() {
		if (this.arrow.up.isDown){
			console.log("up");
		}
		if (this.player.body.onFloor()){
			console.log("onFloor");
		} else {
			console.log("not on the floor");
		}
		this.movePlayer();
		this.physics.collide(this.player, this.walls);
		if (this.player.y > 340 || this.player.y < 0) {
			this.playerDie();
		}
		if (this.physics.overlap(this.player, this.coin)){
			this.takeCoin();
		}
	}
	
	movePlayer() {
		if (this.arrow.left.isDown) {
			this.player.body.velocity.x = -200;
		} else if (this.arrow.right.isDown) {
			this.player.body.velocity.x = 200;
		} else {
			this.player.body.velocity.x = 0;
		}
		
		if (this.arrow.up.isDown && this.player.body.onFloor()) {
			this.player.body.velocity.y = -320;
			console.log("jump");
		}
	}
	
	createWorld() {
		this.walls = this.physics.add.staticGroup();
		
		this.walls.create(10, 170, 'wallV');
		this.walls.create(490, 170, 'wallV');
		
		this.walls.create(50, 10, 'wallH');
		this.walls.create(450, 10, 'wallH');
		this.walls.create(50, 330, 'wallH');
		this.walls.create(450, 330, 'wallH');
		
		this.walls.create(0, 170, 'wallH');
		this.walls.create(500, 170, 'wallH');
		this.walls.create(250, 90, 'wallH');
		this.walls.create(250, 250, 'wallH');
		
		
		
	}
	
	playerDie() {
		this.scene.start('main');
	}
	
	takeCoin() {
		this.coin.destroy();
		this.score += 5;
		this.scoreLabel.setText('score: ' + this.score);
	}
	
	
	
	
	
}

let game = new Phaser.Game({
	width: 500, 
	height: 340,
	backgroundColor: '#3498db',
	physics: {
		default: 'arcade'
	},
	parent: 'game'
});

game.scene.add('main', Main);

game.scene.start('main');
